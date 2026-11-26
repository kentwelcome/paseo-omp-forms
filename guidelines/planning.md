# Planning guidelines

[All guidelines](../README.md)

## Choose the right depth

For a small change, use a brief plan in the issue or conversation. State the outcome, affected work, and verification.

For larger changes, keep a durable plan in the project's existing tracker or planning files. Include dependencies, owners, decisions, and requirement coverage. Use enough detail for another worker to continue without guessing. Do not introduce a new tracker or identifier scheme.

Use the [issue guidelines](issues.md) for requirements, acceptance criteria, blockers, and closure. Link to those requirements instead of copying them into competing records.

## Establish the baseline

Before planning, read relevant [project lessons](../LEARNING.md), repository instructions, implementation, and existing patterns.

Separate:

- Facts, with repository locations or other evidence for current behavior.
- Assumptions that still need evidence, including their effect if wrong.
- Decisions, with the chosen option, reason, and responsible owner.

State the intended outcome and exclusions. Keep proposed solutions separate from requirements. Do not describe planned behavior as implemented behavior.

## Map requirements to work and verification

Connect every acceptance criterion to the work that delivers it and the verification that can establish it. Also trace each work unit and verification check back to its acceptance criterion or necessary prerequisite. Use existing issue links, criterion text, or headings. New identifiers are not required.

Name the observable result for each check. Include relevant error paths and permission boundaries, not only the successful path.

This export example is illustrative:

| Acceptance criterion | Work unit | Planned verification |
| --- | --- | --- |
| The export contains only the selected records. | Apply the selection through the UI, request, and export handler. Include regression tests and selection documentation. | Select a subset. Compare exported record identities with the selection. |
| Only authorized users can export records. | Apply the existing authorization policy in the handler. Include denial tests and permission documentation. | Exercise allowed and denied users at the handler boundary. Denied requests produce no export. |

Record actual results separately from planned checks. A checkbox records status, not evidence. A passing check supports only the behavior that it exercises.

## Define complete work units

For each work unit, name:

- The outcome and covered acceptance criteria.
- The affected files, interfaces, or behavior boundaries.
- The owner, dependencies, and shared contracts.
- The implementation, tests, and documentation required for completion.
- The verification method, expected result, and completion evidence.

Keep tests and documentation with the work that changes their behavior. Do not defer them all to a final cleanup task.

Plan final integration separately from individual work units. Include checks across unit boundaries and the full acceptance criteria. Name the integration owner and required evidence. Unit completion alone does not establish that the combined change works.

## Order work and resolve uncertainty

Identify prerequisites before dependent work starts. Parallel work must have independent boundaries and clear ownership. Use the [development rules](development.md#scope-and-plan) for worker scopes, shared contracts, and the single integration owner for shared files.

Resolve consequential uncertainty before work that depends on it. Gather available evidence first. Record the decision that remains, its owner, and the affected work. If it remains unresolved, mark dependent work as blocked. Continue only independent work under the [issue guidelines](issues.md#readiness-blockers-and-closure).

Use the [ADR process](architecture-decisions.md#use-across-stages) to carry significant technical choices from research into design and implementation. Link applicable records in the plan, identify pending decision owners, and keep dependent work blocked until the required decision is made. Research findings support decisions; they are not acceptance.

## Keep the plan consistent

Before implementation, compare the plan with the requirements and repository evidence:

- Does every acceptance criterion have work and a verification method?
- Does every work unit support a criterion or necessary prerequisite?
- Do checks exercise the claimed behavior and permission boundaries?
- Are dependencies, owners, shared contracts, and integration work consistent?
- Are consequential assumptions resolved before dependent work?

As evidence or decisions change, update the affected work, dependencies, and verification mapping. Keep unresolved criteria visible. If a change alters the agreed scope, obtain authorization before work under the revised scope.

A plan does not grant delivery permission. Apply the [development delivery rules](development.md#delivery-and-handoff) and [review guidelines](review.md) before delivery.
