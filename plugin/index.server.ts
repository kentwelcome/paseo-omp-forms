import type { PluginServerContext } from "@getpaseo/plugin/server";
import { createOmpProvider } from "./server/provider/registration";
import { withOmpSessionPurpose } from "./server/provider/session-purpose";

export default function contribute(server: PluginServerContext) {
  const removeSessionHook = server.before("agent.session_open", ({ request }) => {
    if (request.provider === "omp-forms") return withOmpSessionPurpose(request);
  });
  const provider = createOmpProvider();
  server.registerProvider({
    ...provider,
    id: "omp-forms",
    label: "Oh My Pi (Forms)",
    description: "Oh My Pi with native single-choice form questions",
    connect: (request) => provider.connect({
      ...request,
      // This fork ships the provider, not the upstream timeline renderers.
      capabilities: request.capabilities.filter((capability) => capability !== "timeline.plugin"),
    }),
  });
  return removeSessionHook;
}
