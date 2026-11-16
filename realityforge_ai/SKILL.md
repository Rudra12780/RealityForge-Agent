---
name: realityforge-ai
description: Advanced multi-agent project intelligence and software engineering skill for comprehensive codebase discovery, architecture analysis, simulation, gated implementation, automated testing, and verification.
---

# RealityForge AI: Software Engineering System

RealityForge AI is an extensible multi-agent software engineering skill that orchestrates specialized agent roles to provide end-to-end project intelligence, architectural analysis, and verified, approval-gated code modifications.

```
DISCOVER → UNDERSTAND → ANALYZE → SIMULATE → DECIDE → [APPROVAL GATE 1] → IMPLEMENT → [GATE 2] → TEST → REVIEW → [GATE 3] → [GATE 4: LEARN]
```

---

## 1. Skill Structure

```
realityforge_ai/
├─ SKILL.md                          # Main skill entry point
├─ orchestration/                    # Orchestration protocols & safety
│   ├─ contracts.md                  # Agent I/O contracts & handoff rules
│   ├─ testing_matrix.md             # Automated test discovery & execution matrix
│   └─ safety_and_rollback.md        # Approval gates, scope lock & rollback protocol
├─ agents/                           # Specialized agent instruction cards
│   ├─ project_analyst.md            # Topology, entry points & stack mapping
│   ├─ dependency_analyst.md         # Package manifests & dependency graph
│   ├─ code_intelligence.md          # Static analysis, types & complexity hotspots
│   ├─ system_architect.md           # Architecture analysis & candidate designs
│   ├─ scenario_simulator.md         # Multi-approach outcome simulation
│   ├─ future_impact.md              # Long-term scalability & debt forecasting
│   ├─ failure_prediction.md         # Edge cases, race conditions & failure modes
│   ├─ performance_simulator.md      # Heuristic latency & throughput estimation
│   ├─ performance_engineer.md       # Micro-optimizations & profiling guidance
│   ├─ security.md                   # Static vulnerability & secret scan (veto power)
│   ├─ decision_intelligence.md      # Conflict resolution & implementation planning
│   ├─ developer.md                  # Gated, whitelisted code implementation
│   ├─ testing.md                    # Syntax, type & test execution
│   └─ code_reviewer.md              # Independent scope & quality review
├─ workflows/                        # Orchestrated procedural workflows
│   ├─ discovery_workflow.md         # Read-only stack & architecture discovery
│   ├─ simulation_workflow.md        # Alternative approaches simulation
│   ├─ decision_workflow.md          # Conflict resolution & plan authoring
│   ├─ implementation_workflow.md    # Gated Engineering Mode execution
│   └─ learn_workflow.md             # Gated memory update & persistence
├─ templates/                        # Report & artifact templates
│   ├─ architecture_report.md
│   ├─ dependency_report.md
│   ├─ simulation_comparison.md
│   ├─ risk_assessment.md
│   ├─ performance_report.md
│   ├─ security_review.md
│   ├─ implementation_plan.md
│   └─ verification_report.md
├─ memory/                           # Persistent project intelligence
│   ├─ schema.json                   # JSON schema for project memory
│   └─ project_memory.json           # Project intelligence repository
├─ reporting/                        # Automatic PDF reporting subsystem
│   ├─ pdf_generator.js              # Native Chrome/Edge headless PDF engine
│   └─ generate_workflow_pdf.js      # Workflow-to-PDF mapper
├─ reports/                          # Permanent PDF reports archive (append-only)
│   └─ README.md                     # Reports directory documentation
└─ tests/                            # Validation test suite
    ├─ README.md                     # Validation guide
    └─ validate_skill.js             # Automated skill integrity verification script
```

---

## 2. Supported Execution Modes

RealityForge AI operates under two distinct operational modes:

### Mode A: Analysis Mode (Strictly Read-Only)
* **Goal:** Deep discovery, code intelligence, architectural analysis, security assessment, and simulation.
* **Guarantees:**
  * Zero modifications to target source code.
  * Zero package installations or dependency mutations.
  * Zero silent writes to internal skill memory.
  * All findings delivered directly in chat or structured markdown reports.

### Mode B: Engineering Mode (Gated Code Modification)
* **Goal:** High-confidence code implementation, automated testing, and verification.
* **Non-Bypassable Gates:**
  1. **Gate 1 (Plan Approval):** User reviews exact File Whitelist, proposed diff, and rollback command before any code is modified.
  2. **Gate 2 (Test Execution Consent):** User authorizes running dynamic project test scripts.
  3. **Gate 3 (Final Verification Approval):** User inspects post-implementation diff, test results, and Code Review verdict.
  4. **Gate 4 (Memory Update Approval):** User approves recording architectural decisions into persistent memory.

---

## 3. Supported Antigravity Orchestration Mechanisms

RealityForge AI runs within the native Google Antigravity environment via:

1. **Direct In-Session Role Execution (Default):**
   * The assistant reads the sequential agent cards (`agents/*.md`) and executes each step within the current conversational context, honoring contracts and handoffs.
2. **Dynamic Workflow Script (`run_workflow`):**
   * Python workflow scripts coordinating `pipeline` and `parallel` execution of agent roles.
3. **Subagent Delegation (`invoke_subagent`):**
   * Spawning dedicated subagents for deep research or isolated tasks.

> [!NOTE]
> Unsupported commands (e.g. `agy run-workflow ... --mode A` or `agy test`) are deprecated. All interactions are driven through standard Antigravity instructions.

---

## 4. Conflict Resolution & Precedence

When agents produce conflicting findings or suggestions, the **Decision Intelligence Agent** resolves them via strict precedence:
1. **Security & Safety Overrides All:** Security findings with *Critical* severity veto any implementation approach.
2. **Correctness & Testability Overrides Performance:** Verifiable solutions take precedence over unverified performance claims.
3. **Explicit User Constraints Override Agent Heuristics:** User directives are absolute.
4. **Blast Radius Minimization:** When solutions tie, the approach touching fewer files is chosen.

---

## 5. Automated Testing & Verification Standard

RealityForge AI adheres to the **Truthfulness Standard**:
* **Never claim a test passed unless it was actually executed and exited with code 0.**
* If no test runner is configured, report: `Unit Tests: NOT CONFIGURED IN PROJECT`.
* Do not automatically install packages or modify project configurations to make tests run.
* Consult [testing_matrix.md](orchestration/testing_matrix.md) for supported syntax checks, type checkers, and test runners.
