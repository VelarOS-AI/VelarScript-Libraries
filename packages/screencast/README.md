# @velarscript-labs/screencast

An independently versioned adapter that draws an encoded frame stream onto one
canvas element the application already rendered. It is the rendering half of a
screencast and nothing else: it does not open a session, acknowledge a frame,
transport bytes, or map an input event.

```velar
import {Bytes} from "velar/binary"

import {FrameFormat, ScreencastSurface, attach} from "@velarscript-labs/screencast"

component Workspace:
    let screen: CanvasElement? = null
    let surface: ScreencastSurface? = null

    @mounted:
        const element = screen
        if element != null: surface = attach(element)

    @cleanup:
        const live = surface
        if live != null: live.release()

    def draw(frame: Bytes, width: number, height: number):
        const live = surface
        if live != null: live.submitFrame(frame, {width, height, format: FrameFormat.jpeg})

    return <canvas ref={screen} style:width={640px} style:height={360px} />
```

A surface is an owned handle. In a scope that ends, own it with `using`; a
component holds it across its lifetime instead and releases it in `@cleanup:`,
because a component body is not an owning scope.

`examples/screencast` in this repository is the whole chain as a runnable
application — a canvas, a fake frame source that builds its PNGs byte by byte,
and a control for every part of the contract below. Run it with
`npm run dev --workspace velarscript-screencast-example`.

## Keep-latest decoding

`submitFrame` never queues. One frame at a time is handed to
`createImageBitmap`, and **at most one further frame waits behind it**: a frame
that arrives while another is already waiting replaces it and is never decoded.
A producer faster than the decoder therefore costs a fixed amount of memory and
always shows the newest picture it managed to decode, rather than falling
further and further behind a backlog.

`stats()` is where that becomes visible. `dropped` counts frames replaced before
their decode started — the discipline working, not a failure — and `failed`
counts frames that reached the decoder and produced nothing drawable. A
producer watching `dropped` climb is a producer sending more frames than this
display can use.

## Geometry

The adapter owns the canvas's backing store. It sizes it to the element's
content box times the pixel ratio, and draws each frame proportionally
letterboxed inside it, centred, with transparent bars.

`geometry()` answers `{contentBounds, scale, pixelRatio}`, measured from the
element's *current* content box rather than from the last draw, so a layout
change is visible before the next frame arrives. `contentBounds` is the
destination rectangle in backing-store pixels and `scale` is backing-store
pixels per frame pixel, which is what an application needs to send a pointer
back the other way:

```velar
type FramePoint:
    x: number
    y: number

def framePoint(surface: ScreencastSurface, x: number, y: number) -> FramePoint:
    const geometry = surface.geometry()
    const bounds = geometry.contentBounds
    return {
        x: (x * geometry.pixelRatio - bounds.x) / geometry.scale,
        y: (y * geometry.pixelRatio - bounds.y) / geometry.scale,
    }
```

`x` and `y` there are CSS pixels measured from the canvas's content box. Before
the first frame is drawn `scale` is `0` and the bounds are empty.

The canvas element must carry no padding and no border, because the content box
is what the adapter sizes the backing store from. A `devicePixelRatio` change
is picked up on the next draw; `pixelRatio` in the options pins the backing
store instead of following the host.

## The error stream

`watchErrors()` reads a bounded pull stream of the frames that could not be
drawn — a decoder that refused the bytes, or an image whose real size disagrees
with the metadata the frame declared. Every call returns a view of the same
queue, and one pull may be active at a time.

A failure is never fatal: the frames after it are decoded and drawn whether or
not anybody is reading. If nobody is, the queue keeps its newest
`errorCapacity` records and the next record delivered says how many were
discarded before it. Releasing the surface answers a parked reader, lets the
already-queued records drain, and then answers `null` forever.

```velar
async def report(surface: ScreencastSurface):
    const stream = surface.watchErrors()
    let failure = await stream.next()
    while failure != null:
        print(f"frame {failure.sequence}: {failure.reason} (+{failure.dropped} discarded)")
        failure = await stream.next()
```

## Bounds

| Bound | Value |
| --- | --- |
| Encoded frame | 1 byte through 16 MiB |
| Frame edge | 1 through 16384 pixels |
| Frames waiting to be decoded | 1 |
| Decoded images held | 1, for redrawing across a resize |
| `errorCapacity` | 1 through 1024, default 32 |
| `pixelRatio` | 0.25 through 8, default the host's `devicePixelRatio` |
| Active pulls on the error stream | 1 |

## Release

Releasing stops decoding, discards the frame that was waiting, closes the
decoded image, stops observing the element, clears the canvas, and detaches
from it. It is safe to release twice, `using` releases for you, and a
`submitFrame` after release fails rather than being ignored. `geometry()` on a
released surface reports an empty box, and `stats()` keeps answering with the
final counts.

## Host requirements

A browser document with `HTMLCanvasElement`, a 2D rendering context,
`createImageBitmap`, `Blob`, and `ResizeObserver`. The adapter reads every
operation it uses from the platform prototype when it loads, so a later
instance or prototype override cannot redirect a draw. Attaching to anything
that is not a canvas element, or on a host without those capabilities, fails at
`attach` rather than at the first frame.

Encoded frames are decoded by the browser's own image decoders. The formats are
`jpeg` and `png`, which is what a Chrome DevTools Protocol screencast emits.
