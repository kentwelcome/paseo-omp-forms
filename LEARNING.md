# Project learning

## Reusable lessons

- For Desktop question checks, verify both the waiting tool’s result and pending-permission state after the UI action. An accessibility action can report success even when the card is still pending. Use real-wire replay to separate protocol handling from UI automation. [Issue #1 evidence](docs/1-retro.md)

## Retrospective record

- 2026-11-26: [Issue #1 cycle](docs/1-retro.md). Local candidate reviewed; focused replay and Desktop selection/dismissal passed. Next-run commitment: require tool-result and pending-state evidence for each Desktop question action. No prior commitments to assess.
