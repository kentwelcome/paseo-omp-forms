# Architecture

## Current state

This is a documentation-only checkout. Bundled Paseo 0.17.4 did not register OMP 19.2.1's `form` request as a question the user could answer. No fork, parser, transport changes, or acceptance tests exist yet.

## Proposed boundaries

The fork starts from the community provider matching 5.8.1. The handoff proposes plugin ID `paseo-omp-forms` and provider ID `omp-forms`; availability is unverified. The bundled and original community provider remain separate.

1. OMP emits an `extension_ui_request` with method `form`, HTML, and a request ID.
2. The fork validates a single named radio group without executing HTML. Each display label maps to its original machine value.
3. The provider publishes a native Paseo single-choice question, owns the pending request, and retains the original field name, mapping, and request ID.
4. Selection responds according to the version-matched OMP form contract. Dismissal, interruption, or unsupported input terminates the request without submitting an answer; stale UI must not affect a later request.

The first acceptance boundary is deterministic request replay. The second is an authorized fresh chat explicitly using the new provider. A visible card alone does not verify completion.

See the [ADR guide](guidelines/architecture-decisions.md) for recording accepted decisions separately from proposals.
