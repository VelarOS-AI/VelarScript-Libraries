// A second entry that re-uses the first one's schema objects. If the loader
// bundled the two entries separately, these would be copies, and the channel
// table — which matches a runtime schema to a generated declaration by object
// identity — would stop recognizing them.

import { SidecarPingSchema, SidecarPongSchema } from "./index";

export const SidecarChannels = {
  "sidecar:ping": { request: SidecarPingSchema, response: SidecarPongSchema },
};
