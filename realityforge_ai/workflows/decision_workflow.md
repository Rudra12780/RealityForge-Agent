---
name: Decision Workflow
description: Orchestrates decision synthesis, conflict resolution, and implementation plan generation.
---

# Decision Workflow (Analysis Mode – Read-Only)

This workflow runs when simulation outputs are available, resolving conflicts and formulating the formal Implementation Plan for user approval.

## Workflow Sequence
1. Verify completion of simulation and discovery reports.
2. **Decision Intelligence Agent** ([agents/decision_intelligence.md](../agents/decision_intelligence.md))
   - Executes the **Conflict Resolution Protocol**:
     1. Security & Safety overrides all.
     2. Correctness & Testability overrides Performance.
     3. Explicit user constraints override agent heuristics.
     4. Blast radius minimization breaks ties.
   - Authors the formal **Implementation Plan** adhering to `templates/implementation_plan.md`.
   - Defines the exact File Whitelist, testing strategy, and rollback baseline.
3. Present **Approval Gate 1** to the user.

## Constraints
* Strictly read-only. Source code is never touched during this workflow.
