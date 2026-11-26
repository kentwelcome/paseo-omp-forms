# OMP Forms

OMP Forms adds a native single-choice card for one named radio group sent by the Oh My Pi `ask` tool. The selected value goes back to the waiting tool, not just to the chat timeline. Unsupported forms are canceled instead of leaving OMP waiting.

Choose **Oh My Pi (Forms)** in a new chat. The plugin does not replace the bundled provider, change existing chats, or support arbitrary HTML forms. See [architecture](architecture.md) for the request lifecycle and version baseline.

## Local development

With Node 22.13 or newer and OMP 19.2.1 available:

```sh
cd plugin
npm ci
npm run typecheck
OMP_FORMS_WIRE=1 npm test -- tests/provider-forms.test.ts tests/provider-permissions.test.ts tests/provider-interrupt.test.ts tests/omp-rpc-protocol.test.ts
```

`OMP_FORMS_WIRE=1` adds a model-free replay through the installed `omp` binary. For an authorized Desktop test, install the local `plugin/` directory by absolute path, start a fresh **Oh My Pi (Forms)** chat, then test selection and dismissal. Do not restart the daemon.

## Development workflow

Start with [AGENTS.md](AGENTS.md), the [architecture](architecture.md), and [project learning](LEARNING.md).

- [Planning](guidelines/planning.md)
- [Development](guidelines/development.md)
- [Architecture decisions](guidelines/architecture-decisions.md)
- [Review](guidelines/review.md)
- [Issues](guidelines/issues.md)
- [Retrospectives](guidelines/retrospectives.md)
- [Agent teams](guidelines/agent-teams.md)
