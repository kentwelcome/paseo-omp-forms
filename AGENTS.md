# Repository guidelines

OMP Forms is a separate server-side Paseo provider for one named OMP radio group. Source, manifests, and tests live under `plugin/`. [README.md](README.md) documents setup and checks and indexes the workflow guides; read relevant [lessons](LEARNING.md) before planning.

## Architecture and implementation

See [architecture.md](architecture.md) for the request and response flow and [ADR guidance](guidelines/architecture-decisions.md) for decision ownership. Record accepted decisions under `docs/adr/` when one qualifies. The provider derives from the community provider 5.8.1 and uses the OMP 19.2.1 form contract. Parse HTML as data only; maintain request identity through selection and cleanup. Do not change the bundled provider, migrate chats, or address bash output rendering.

## Verification and authority

For docs, render Markdown and verify relative links. Once implementation exists, start with model-free frame replay and verify selection, dismissal, interruption, and unsupported input. A fresh Paseo chat on the new provider is separate live evidence; get authorization for installation and paid runs, and do not restart the active daemon to test. Require independent review for material changes before delivery. Each commit, push, PR, merge, release, publication, or external tracker write needs separate authorization.

## Coordination

No agent team or delegation entry is configured. Use the private [OMP Forms GitHub Project](https://github.com/users/kentwelcome/projects/5) for issue tracking in [kentwelcome/paseo-omp-forms](https://github.com/kentwelcome/paseo-omp-forms).

## Template source

Local guidance is based on [agent-workflow-template 0.3.0 at `d2c12b1bf45670900aa036a15b1cbc490f7f045a`](https://github.com/kentwelcome/agent-workflow-template/tree/d2c12b1bf45670900aa036a15b1cbc490f7f045a). The project entry points and architecture are project-specific; the team guide covers no-team use only. Template maintenance files, example research, team runbooks, and prior learning history were not imported.

When asked to contribute workflow improvements upstream, read the contribution guide from the recorded template source. Prepare a reusable diff and PR description for review. Do not publish without authorization.
