# Review guidelines

[All guidelines](../README.md)

## Review inputs

Identify the candidate revision or stable diff, requested outcome, acceptance criteria, and changed files. Include relevant untracked files. Identify applicable repository policies and available verification evidence. If the candidate changes during review, identify what you must review again.

For material changes, use a reviewer independent of the implementation. Select reviewers for relevant expertise. Use the consuming project's policy to select tools and reviewer counts. Do not substitute an automated tool's silence for a completed review.

## What to review

- Check correctness, supported behavior, security/privacy boundaries, state ownership, error paths, compatibility obligations, and maintainability in the changed scope.
- Trace effects through affected callers and contracts. For instructions, check prerequisites, permissions, stop conditions, and contradictory or duplicated rules.
- Compare claims with actual evidence. Read passing results rather than reflexively repeating them. If evidence is missing, stale, contradictory, or does not exercise the claimed boundary, run a focused check.
- Apply the [ADR review rules](architecture-decisions.md#review) when technical decisions are affected. Check the candidate against applicable accepted records, decision authority/evidence, and any authorized replacement; do not treat implementation or passing checks as acceptance.
- Keep the candidate stable. Unless explicitly assigned otherwise, report findings without editing the implementation during review.

## Actionable findings

For each blocking finding, give a specific location, violated requirement or supported invariant, reachable trigger, observable impact, and evidence. Classify severity by impact and likelihood, not personal preference.

```text
Finding: short description and severity
Location: path and line or symbol
Basis: acceptance criterion, contract, or repository rule
Trigger and evidence: input/state and observed failure or code path
Impact: affected user-visible behavior
Remedy: smallest sufficient correction
```

Separate demonstrated defects from questions, optional suggestions, and unproven risks. Do not require new abstractions, dependencies, permanent checks, or extra supported behavior merely because they can be useful. Escalate a real scope or policy decision to the owner.

## Disposition and completion

For each finding, record its disposition:

- Fixed, with evidence.
- Not applicable, with reasoning.
- Explicitly accepted risk, with the responsible person's approval.

Keep deferred findings visible with an owner and next action. Do not silently resolve them.

After fixes, verify the affected behavior. Review the updated scope against the final candidate. Reply to review threads. Resolve only findings whose disposition has supporting evidence. Explain out-of-scope requests and leave them open for the owner to decide.

State the candidate, verdict, blocking findings, verification performed or supplied, and remaining gaps in your final review. If a reviewer times out, is unavailable, or a required check is missing, report the review as incomplete or blocked. Do not report approval. For a waiver, record who authorized which exception. Do not present a waiver as a clean review. Review approval does not authorize merge, release, deployment, or publication.

When a PR review is to be published, use an actual human-readable PR comment or submitted review identifying the reviewed candidate; a PR body or private report alone is not the published review. Confirm publication and retain its link. If publication is unauthorized or fails, report the gap without claiming it was posted.
