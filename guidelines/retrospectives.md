# Retrospective guidelines

[All guidelines](../README.md)

## When and why

Use a retrospective after meaningful delivery, a coordination failure, an incident, or repeated friction. Do not require a ceremony for every small edit. Improve the next comparable task. Do not use the retrospective as a commit summary or to grade individuals.

A delegated cycle or a project-chosen milestone closeout includes its retrospective; see [capture and close delegated cycles](#capture-and-close-delegated-cycles). A milestone or cycle policy does not itself grant permission to commit, publish, merge, or start another run.

## Start with evidence

Record the scope, intended outcome, observed outcome, and relevant evidence links. Separate facts from interpretations. Before comparing measurements, explain surprising results and reconcile conflicting measurements. If evidence is unavailable or inconclusive, say so.

```text
Context: task or period and intended outcome
What worked: observed practice and evidence
What to improve: observed failure/friction, impact, and contributing cause
Next-run actions: concrete change, owner, and when to apply it
Prior commitments: assessment and evidence for each applicable open commitment
Verification: how to tell whether the action helped
Open questions: missing evidence or decisions
```

Prefer one or two specific actions over a long list of generic advice. Tie each action to an observed problem and a way to evaluate improvement. Do not expand product scope or impose a new tool or gate without authorization.

## Capture and close delegated cycles

A delegated cycle is work that a maintainer hands to a lead, such as one issue, an explicit issue set, or a milestone run through the project's adopted process. Its retrospective is part of the delegated work. Do not wait for a separate request.

- **Capture during the cycle.** Record each meaningful finding while its evidence is available: successful practices, mistakes, human corrections, integration surprises, and operational constraints. State the observation and source, impact, confirmed cause or hypothesis, response and how it was checked, when the finding applies, and the next action. Merge repeats. Do not log every command, copy private transcripts, or invent lessons. A worker's claim is not verified evidence.
- **Use the adopted records.** Keep live state in the process's existing execution record or native workflow state. Do not add a second execution ledger. `LEARNING.md` remains the curated lesson index and dated run summary; link the execution record instead of copying worker logs.
- **Close at the agreed boundary.** At the agreed completion boundary, complete the retrospective without another prompt. If the cycle is blocked or interrupted, record an interim outcome and next action; do not call unfinished delivery complete. Keep a small cycle's record brief.
- **Resume without repeating.** On resume, reuse completed analysis and finish only pending learning writes, review, or authorized delivery. Later authorized delivery of the same candidate adds a dated addendum. Preserve earlier assessments.
- **Keep outcomes separate.** Accepted delivery, retrospective completion, and delivery of resulting process changes are separate facts. A merge or completed retrospective does not satisfy unmet acceptance criteria. Do not convert an acceptance gap into a lesson to close the scope.

Automatic capture does not authorize editing governing instructions. Record proposed changes in the retrospective. Changes to authorization, delivery, review, or verification rules always need the owner's explicit approval.

## Carry open commitments forward

Each next-run action is an open commitment until evidence shows it was satisfied or someone explicitly retires it with a reason. Read open commitments across all prior records, not only the latest one. Assess each commitment in every retrospective:

| Assessment | Meaning |
| --- | --- |
| Observed | The action was applied, with evidence. |
| Partial | The action was applied in part; state what is missing. |
| Missed | The action applied but was not followed; state the impact. |
| Not applicable | This cycle did not meet the commitment's applicability condition. |

Carry partial, missed, and not-applicable commitments forward with their source and applicability condition. A newer retrospective, including a brief one for a small task, must not hide them. Following a checkpoint is not evidence that it improved results; record the outcome evidence separately.

## Curate durable learning

A reusable lesson includes an applicability condition, a concrete action, why it helps, and a source:

```text
When: a review relies on evidence from a candidate that later changed
Do: identify the affected checks and review the changed scope again
Because: earlier evidence may no longer describe the delivered candidate
Source: link to the review or retrospective that established the lesson
```

Store reusable lessons in [LEARNING.md](../LEARNING.md). Keep approved policy in the guide that owns the topic. Link to that policy instead of copying its rules into the learning record.

Remove private details. Generalize only as far as the evidence supports. Merge duplicate lessons. If their assumptions no longer hold, retire or revise them.

A retrospective does not authorize policy changes or external actions. Propose substantive policy changes for approval. After approval, update the owning guide and any affected existing documentation. On the next relevant task, verify whether the adopted action helped. If the evidence disagrees, revise the action.

## Update the learning record after every run

Before declaring any retrospective complete, update [LEARNING.md](../LEARNING.md):

1. Read the existing lessons and retrospective records.
2. Add, revise, merge, or retire lessons based on this run's evidence. Preserve unrelated lessons.
3. Add a short run record with the date, scope, evidence reference, and lesson changes.
4. Record this run's next-run actions as open commitments, the assessment of each inherited commitment, and any unresolved decision.
5. If there is no new reusable lesson, record that outcome and its reason. Do not invent a lesson.
6. Verify that the learning record reflects the evidence, limits, and actions from this retrospective.

For each lesson, state when it applies, what to do, why it helps, and its source. Separate proposed policy changes from approved rules.

When adding the first entry, replace the initial empty-state text. Keep previous run records. Use evidence references to local files, issues, or observed scenarios without exposing private transcripts.

If you cannot update LEARNING.md, report the blocker and leave the retrospective incomplete. Include the changed learning path in your handoff. Updating this file does not authorize a commit or publication.
