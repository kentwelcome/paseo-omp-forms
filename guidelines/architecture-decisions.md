# Architecture decision records

[All guidelines](../README.md)

Use architecture decision records (ADRs) to preserve significant technical choices and their reasoning during research, design, and implementation. This guide applies with no agent team or with either selected team. It requires no generator, service, CI check, or new workflow stage.

## When to write an ADR

Create an ADR when all three apply:

- Changing the choice later has a meaningful cost.
- A future reader needs context to understand why it was chosen.
- There are genuine alternatives with different costs or risks.

Examples include system boundaries, data ownership, persistence, external contracts, deployment, security boundaries, and dependencies with substantial lock-in. Record deliberate exclusions when they explain the choice. Routine refactors, formatting, and easily reversed implementation details belong in the issue, plan, or review, not separate ADRs.

Read existing decisions before proposing a new one. Reuse the project's ADR location, format, IDs, and decision authority. If none exists, use `docs/adr/NNNN-short-decision-title.md`, starting at `0001`. Create the directory and an index at `docs/adr/README.md` only when the first qualifying decision needs a record. The index lists each record's ID, title/link, status, and decision date; use Pending before a decision. Allocate the next unused ID after checking existing records, including parallel work; never reuse or renumber a recorded ID.

Keep one decision per record. A few paragraphs are usually enough. Adapt the example below to an existing project convention rather than creating a competing log.

## Use across stages

### Research

Keep source findings, experiments, and unresolved questions in the project's existing research location or tracker. Cite primary sources and distinguish documented capability, inspected source, exercised behavior, and unknowns. Keep secrets and private transcripts out of reusable records.

When research reveals a qualifying choice, create a Proposed ADR with the requirement, viable alternatives, recommendation, supporting evidence links, and smallest outstanding checks. Research recommendations and successful experiments are not acceptance. Research without a qualifying choice needs no ADR.

### Design and decision

The proposing agent updates the Proposed record as options become clearer. State the chosen boundary, tradeoff, consequences, unresolved risks, and affected requirements. Link the ADR from the design or plan instead of copying its reasoning.

Use the project's existing decision authority. Unless the project explicitly delegates that choice, the maintainer decides. Identify the decision-maker and record the decision date and a durable approval reference or a faithful, minimal approval statement before marking Accepted. Do not infer acceptance from silence, conditional discussion, a recommendation, passing checks, or a commit. Use Rejected when the authorized decision-maker declines a proposal.

If a required choice remains unresolved, block work that depends on it; continue independent work. An authorized exploratory spike may gather evidence without treating the proposal as accepted or making the production choice implicitly.

### Implementation

Before dependent implementation, read the relevant accepted ADRs alongside the current requirements, plan, and architecture. Link applicable records from the issue or implementation report. Acceptance records a choice, not proof that it has been built or permission to install, spend, commit, push, deploy, or publish.

If implementation reveals a new qualifying tradeoff, propose an ADR at that point. If evidence contradicts an accepted decision, surface the conflict and obtain the required decision before departing from it. Do not silently rewrite a decision to match the code.

Update affected requirements and design documents when a decision changes them. Keep `architecture.md` accurate about the implemented system under the [architecture maintenance rules](development.md#maintain-architecturemd). Label accepted but unimplemented choices separately and link their ADRs; do not present them as current behavior.

Record actual implementation checks and gaps in the existing issue, report, or verification artifact and link them from the ADR when useful. Keep the ADR status about the decision, not implementation progress. Do not turn the index into a task board.

### Review

Apply the [review guidelines](review.md). Check the candidate against applicable accepted decisions, verify decision provenance, and distinguish approval from implementation evidence. A deliberate departure needs an authorized replacement decision, not a retrospective claim of acceptance. Check affected links, index/status agreement, and documentation consistency. Report unresolved conflicts rather than choosing a document silently.

## Lifecycle and history

Use existing project statuses where defined. Otherwise use:

- **Proposed:** under consideration; may be revised in place.
- **Accepted:** chosen by the authorized decision-maker, with decision evidence.
- **Rejected:** considered and explicitly declined; retained with the reason.
- **Superseded:** replaced by a later accepted ADR.
- **Deprecated:** retired by an authorized decision without a replacement.

Preserve the original decision and rationale of accepted records. Metadata/status changes and dated evidence or correction addenda are allowed; do not silently rewrite history. For a changed decision, create a new Proposed ADR referencing the old one. Only after acceptance, mark the old record Superseded and link both directions. For retirement without replacement, record who authorized it, when, and why before marking Deprecated. Update the index in the same change. Keep rejected, deprecated, and superseded records discoverable.

When documenting an older decision, distinguish the date it was recorded from the date it was decided. Cite available evidence; do not invent historical approval. If acceptance cannot be established, label that uncertainty and seek the required decision rather than marking it Accepted.

## Record format

Use this starting point only when the project has no existing format. Replace the illustrative fields with actual project facts; leave undecided metadata visibly Pending.

```markdown
# NNNN: Short decision title

- Status: Proposed
- Recorded: YYYY-MM-DD
- Decision date: Pending
- Decision-maker: Pending
- Decision evidence: Pending

## Context

Requirement, constraints, and why this choice matters. Link research and requirements.

## Decision

One proposed choice and its boundaries. State what is excluded where relevant.

## Alternatives

Viable options and the decisive tradeoff.

## Consequences

Benefits, costs, risks, and remaining checks. Separate expectations from observed evidence.

## References

Research, requirements, related ADRs, and implementation evidence when available.
```

## Adoption and document ownership

During adoption, preserve existing ADRs, indexes, statuses, IDs, evidence, and approval rules. Link this guide and the actual decision-log location from the project's `AGENTS.md`; if no records exist yet, state the intended location without creating an empty log. Do not copy another project's decisions or fabricate a decision history for an empty project.

Keep each source of truth distinct:

- Research holds findings and uncertainty.
- ADRs hold technical choices, rationale, decision authority, and history.
- `architecture.md` describes the current system, with proposals clearly separated.
- Issues, plans, and team-native reports hold work and implementation evidence.
- `LEARNING.md` holds reusable lessons and retrospective records.

Link between them rather than maintaining duplicate decision logs. Existing project policies still own review and delivery permissions. An ADR adds no standing authorization and does not replace a team's native gate or acceptance record.
