// The half of the contract the entry re-exports. It exists so the entry has a
// relative import to write without an extension.

import { z } from "zod";

export const SidecarPingSchema = z.strictObject({
  sessionId: z.string(),
  attempt: z.number(),
});
