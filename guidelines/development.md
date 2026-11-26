# Development guidelines

[All guidelines](../README.md)

## Scope and plan

- Start with the user-visible outcome, observable acceptance criteria, and explicit exclusions. For a small change, write a short plan in the issue or conversation.
- Use the [planning guidelines](planning.md) for work units, dependencies, requirement coverage, and verification plans.
- Before editing, read the relevant implementation, repository instructions, and existing patterns. Distinguish current behavior from proposals.
- Choose the smallest complete change. Ask about consequential ambiguity. Do not ask for facts already available in the repository.
- Divide work only at independent boundaries. Give each worker a scope, shared contract, and acceptance criteria. Assign one integration owner for shared files. Parallel activity does not permit conflicting edits.

## Architecture and code patterns

- Document real entry points and data flow: input → validation → transformation → side effect/output. Name external dependencies and the owner of each mutable or persistent state.
- Where useful, keep domain computation separate from transport, persistence, and presentation. Inject external I/O at boundaries so you can exercise behavior without live services. Avoid abstraction without an actual need.
- Before side effects, validate untrusted inputs. Preserve distinctions such as unavailable, invalid, empty, and failed. Do not turn an error into a success-shaped default.
- Make async ownership explicit. Bound external work. Where supported, propagate cancellation. Release owned resources on success, error, and cancellation. Before consequential actions, validate potentially stale state again. Do not add retries without a defined retry policy and safe side effects.
- Use the project's naming, formatting, and error conventions. Prefer local state and explicit dependencies to hidden mutable globals. Avoid unnecessary allocation and copying on performance-sensitive paths.
- When changing a contract, migrate all affected callers. After migration, remove obsolete code. Add a compatibility layer only for a documented compatibility requirement.
- Follow the [ADR process](architecture-decisions.md) for significant technical choices, including those discovered during implementation. Read applicable accepted decisions before dependent work; surface conflicts and propose replacements rather than silently departing from them. Decision acceptance is not implementation evidence or delivery permission.

### Maintain architecture.md

- Create or update `architecture.md` at the project root during project creation or template adoption. Keep it as the current architecture overview, based on repository evidence, not an unimplemented design.
- Describe the system's purpose, entry points, major components and boundaries, data flow, external dependencies, and state ownership. Link to relevant code and detailed design documents. For an empty project, state what exists and label proposed architecture and unresolved decisions separately.
- Link applicable ADRs for decision rationale under the [document ownership rules](architecture-decisions.md#adoption-and-document-ownership). Keep accepted but unimplemented decisions distinct from the current system; do not duplicate the decision log here.
- Preserve existing architecture documentation. Reuse its verified content or link to detailed sections from `architecture.md`; do not create competing overviews or discard project decisions.
- The agent making an architecture-affecting change must update `architecture.md` in the same change, before declaring the work complete. This includes changes to components, interfaces, data flow, dependencies, state ownership, or deployment structure. Remove obsolete descriptions and check affected diagrams and links against the implementation.
- Before delivery, check whether the change affects the architecture overview. If it does not, leave the file unchanged; do not add a ceremonial update. Link to `architecture.md` from the project's README and `AGENTS.md`, keeping their architecture summaries short.

## Instructions and documentation

Treat agent instructions as behavior. Name the actor, scope, prerequisites, allowed effects, required output, and stop conditions. Put prerequisites before actions. Link to shared rules instead of copying them into several files.

Keep examples public-safe. Distinguish illustrative commands from verified project commands. When behavior or policy changes, update related documentation and any affected existing translations. Do not create translations unless the project requires them. Do not claim that a documented policy is automatically enforced.

## Runtime and tooling

Use the consuming project's declared runtime, package manager, lockfile, and supported versions. Verify commands from manifests or scripts. Do not infer them from another repository. Update lockfiles through the package manager, not by hand. Before adding dependencies, workflow systems, or permanent enforcement mechanisms, obtain a justified project decision.

## Verification and QA

- Select checks from the changed behavior and acceptance criteria. Exercise the actual changed CLI, API, UI, or workflow boundary. Compilation and unit tests do not establish every integration claim.
- For bugs, use the reported failure as evidence. When practical, add a failing-before/passing-after regression test. Do not repeat costly or destructive failures merely to verify a report.
- Test consumer-visible behavior, boundaries, errors, state transitions, and cleanup. Prefer deterministic, isolated tests with temporary resources, explicit fixtures, and controlled external dependencies. Avoid tests that only match source text or echo mocks.
- Keep routine CI deterministic and credential-free. Keep paid/model-backed checks opt-in and separate from routine PR gates. Before execution, obtain explicit approval of purpose, cost, and scope. Obtain applicable authorization for real service access and outward-facing effects.
- Use realistic, authorized cases for live evaluations. Use synthetic fixtures for isolated tests, not as substitutes for missing real-world evidence. Preserve inconclusive results rather than manufacturing a difference.
- Report each command or scenario, result, and limitation. Do not report skipped or blocked checks as passes. Treat coverage percentages and reviewer counts as project decisions, not universal defaults.

For service or agent-tool scenarios, preflight the actual caller-facing endpoint and complete inputs before authorized costly work. Check caller decisions separately from transport success when interpretation is part of the outcome. Keep independent checks independent, and preserve inconclusive results.

Distinguish a completed command or trial from termination of its controller and owned resources. On success, failure, or cancellation, confirm authorized cleanup and process termination separately; report uncertain cleanup rather than claiming completion.

For documentation-only changes, verify rendering, local links, examples, and factual claims. If the project maintains translations, also verify their meaning. These checks establish document quality, not agent compliance.

## Delivery and handoff

Preserve unrelated work and secrets. A request to edit does not authorize other actions:

- Commit, push, open a PR, or merge.
- Release, deploy, publish, or delete data.

Obtain explicit, action-specific authorization. Do not infer authorization from a passing review. When authorized to commit, use focused commits with DCO sign-off (`git commit -s`).

Before delivery, obtain independent review for material changes under the project's review policy. Do not invent a mandatory reviewer count. Update affected contracts and docs. Remove temporary verification artifacts. Leave unresolved work visible.

Keep your handoff short:

```text
Outcome: what changed and which acceptance criteria are satisfied
Changes: relevant files and contract changes
Evidence: commands/scenarios, results, and candidate revision
Limits: unverified behavior, blockers, and outstanding decisions
Next action: concrete action and required owner/authorization
```
