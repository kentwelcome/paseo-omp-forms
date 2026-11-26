# Issue guidelines

[All guidelines](../README.md)

## Make work actionable

Use a title that names the problem or desired outcome. Explain who is affected and why the work matters. State the scope, exclusions, known dependencies, and observable acceptance criteria. Keep proposed solutions separate from established requirements.

Use the project's existing tracker or planning files. Do not create a second board, identifier scheme, or workflow merely to use this template. For a small task, a short written brief can be enough.

Use the [planning guidelines](planning.md) to divide requirements into work units and connect them to verification. Keep this issue as the source for its requirements and acceptance criteria.

## Set up issue tracking

During project creation, the agent must ask the user which Linear project to use for issue tracking or whether to create a GitHub Project board. If the user already supplied an explicit choice, use it without asking again. During adoption into an existing project, inspect its tracker first and confirm whether to keep it; do not create a duplicate board or migrate issues without authorization.

- **Linear:** identify the selected existing project by its URL or ID and verify the workspace and applicable team. If the user has not named a project, use available authorized access to identify candidates and ask which one to connect. Do not choose by name alone when ambiguous or create a Linear project implicitly.
- **GitHub Projects:** confirm the destination owner, board name, repository association, visibility, and authorization to create it. Reuse an existing board if the user selects one. After authorized creation, verify the board exists and record its URL or ID.
- Record the chosen tracker and project/board link in the target project's `AGENTS.md` or linked project instructions so later agents use the same issue destination. Keep credentials out of these files.
- If access, a choice, or creation permission is missing, report the unresolved setup and next action. Do not claim the tracker is integrated. Continue only setup work that does not depend on it.

This is project-level issue-tracking setup, independent of the selected agent team. It does not enable automated board monitoring, synchronization, continuous execution, or delivery permissions.

## Feature or improvement

```text
Outcome: what the user can do after the change
Context: current limitation and why it matters
Scope / exclusions: included and deliberately excluded behavior
Acceptance: observable outcomes and how to verify each
Dependencies / decisions: prerequisites, owner, and unresolved choices
```

Write acceptance criteria that measure the intended value, not only implementation steps. "Add an export button" is incomplete if the intended outcome is "export the selected records in the documented format." Name evidence that can disprove completion.

## Bug report

```text
Expected / actual: behavior that differs
Reproduction: minimal safe steps, input, and frequency
Environment: relevant versions, platform, and configuration
Evidence: redacted errors, logs, screenshots, or failing check
Impact: affected users or supported behavior
Workaround: if known, with limitations
```

Treat the reported observation as evidence. Separate confirmed facts from suspected causes and unknowns. Request only missing information needed to act. Do not attach credentials, private transcripts, or customer data. Use sanitized evidence or an authorized restricted channel.

## Readiness, blockers, and closure

Start work when its outcome, boundaries, and acceptance are clear enough to execute. You do not need a full design for every detail. If a decision materially changes scope, cost, risk, or external effects, record the recommended option. Before acting, obtain the required decision.

Keep blocked work visible. State the missing prerequisite, what you tried, who can unblock it, and the next action. Continue related work only if it is independent.

### Progress comments

Lead with the concrete outcome, blocker, or decision; link sanitized durable evidence and related issues or PRs rather than repeating detailed reports. Mention a human only when action is needed and their account identity is confirmed. Omit secrets, raw logs, private transcripts, and temporary local paths. If nothing relevant changed, do not post another update. Publication requires authorization.

### Closure

Close an issue only in one of these cases:

- You have evidence for its acceptance criteria.
- An authorized decision explicitly cancels or supersedes it.

Where available, link the implementation and verification. An associated merged PR does not automatically establish acceptance. Keep unmet criteria open. Move them to a clearly linked issue only with an explicit scope decision.
