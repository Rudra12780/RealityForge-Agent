---
name: Learn Workflow
description: Persists approved decisions, architectural insights, and verified changes into Project Memory with user consent.
---

# Learn Workflow (Gated Memory Update)

The Learn Workflow updates RealityForge AI's persistent memory (`memory/project_memory.json`) after a completed analysis or engineering cycle.

## Workflow Sequence
1. **Decision Review:** Confirm that the user granted Gate 4 approval to record session intelligence.
2. **Memory Validation:** Validate proposed payload against `memory/schema.json`.
3. **Structured Persistence:**
   - Update `project_architecture` with verified stack and topology.
   - Append new verified findings to `previous_analysis_findings`.
   - If in Engineering Mode, record `approved_changes`, `test_results`, and `commit_sha`.
   - Record `previous_engineering_decisions` with chosen approach and rationale.
4. **Memory Clean-up:** Prune deprecated or superseded temporary entries while maintaining historical audit records.

## Strict Safety Rule
* **User Approval Required (Gate 4):** Project memory is never updated silently. The user must review and approve the memory update diff.
* **Zero Project Modification:** This workflow writes only to `memory/project_memory.json` inside the RealityForge skill folder. It never touches target project files.
