---
name: Project Discovery Workflow
description: Orchestrates the read-only discovery phase (Discovery → Understand → Architecture Analysis).
---

# Project Discovery Workflow (Analysis Mode – Read-Only)

This workflow maps project structure, dependencies, code quality, and architecture without modifying any project files.

## Workflow Sequence
1. **Project Analyst** ([agents/project_analyst.md](../agents/project_analyst.md))
   - Scans repository tree, identifies languages, entry points, and directory structure.
   - Outputs: *Project Overview*.
2. **Dependency Analyst** ([agents/dependency_analyst.md](../agents/dependency_analyst.md))
   - Inspects manifests (`package.json`, `requirements.txt`, etc.) and maps module dependencies.
   - Outputs: *Dependency Graph*.
3. **Code Intelligence Agent** ([agents/code_intelligence.md](../agents/code_intelligence.md))
   - Executes non-destructive syntax checks and static type analysis.
   - Identifies complexity hotspots, anti-patterns, and API surface.
   - Outputs: *Code Intelligence Report*.
4. **System Architect** ([agents/system_architect.md](../agents/system_architect.md))
   - Consolidates previous findings, identifies architectural bottlenecks, and formulates candidate redesign options.
   - Outputs: *Architecture Analysis*.

## Read-Only Guarantee
* **No File Writes:** Source code and project configurations are never modified.
* **No Memory Mutation:** Analysis findings are delivered directly in chat or as a structured report artifact. Persistent memory updates require explicit user approval.
* **Automatic PDF Generation:** Automatically compiles an A4 Discovery & Architecture Report PDF in `reports/` upon completion without mutating target project files.

## Invocation in Antigravity
* **Direct In-Session Execution (Standard):**
  Instruct Antigravity in chat:
  ```text
  Run RealityForge AI Discovery Workflow on this workspace in Analysis Mode.
  ```
  The assistant reads the sequential agent cards and executes each step within the session.
* **Python Workflow Engine (`run_workflow`):**
  Can be orchestrated via Antigravity's `run_workflow` tool using Python workflow primitives (`pipeline`, `parallel`).
