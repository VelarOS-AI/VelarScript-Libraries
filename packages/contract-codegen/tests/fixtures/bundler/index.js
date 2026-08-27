// A contract package as TypeScript compiles it under `moduleResolution:
// "bundler"`: the emitted relative specifier carries no extension, which only a
// bundler completes. Bare Node ESM answers ERR_MODULE_NOT_FOUND on the line
// below, and the file it names is sitting right there.

import { z } from "zod";

export * from "./channels";

export const SidecarPongSchema = z.strictObject({
  sessionId: z.string(),
  ok: z.boolean(),
});
