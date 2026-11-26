# Architecture

## Current state

Bundled Paseo 0.17.4 did not register OMP 19.2.1's `form` request as a question the user could answer. The local plugin under `plugin/` registers `omp-forms` separately from both bundled `omp` and the community provider’s `omp-plugin`.

## Provider boundaries

The server-side provider is derived from [community OMP provider 5.8.1](https://github.com/omercnet/paseo-plugins/tree/daddcfc1fa3a46a9789d0d5131b1b8df29c26c22/paseo-omp). The fork includes its provider dependency closure and [MIT license](plugin/LICENSE), not its client panels or profile registrations.

1. OMP emits an `extension_ui_request` with method `form`, HTML, and a request ID.
2. `radio-form.ts` validates a single named radio group with distinct values. It treats HTML as data and rejects unsupported controls and forms that exceed the card budget.
3. `session-permissions.ts` publishes a native Paseo single-choice question. The session owns its request ID and maps displayed choices back to the original field and value.
4. `omp-rpc-protocol.ts` encodes the response as `{ data: { [field]: value } }` with the original request ID. Dismissal, interruption, or unsupported input cancels without submitting an answer; stale cards cannot affect later requests.

The first acceptance boundary is deterministic request replay. The second is an authorized fresh chat explicitly using the new provider. A visible card alone does not verify completion.

See the [ADR guide](guidelines/architecture-decisions.md) for recording accepted decisions separately from proposals.
