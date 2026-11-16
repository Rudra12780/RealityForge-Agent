---
name: Simulation Workflow
description: Orchestrates scenario simulation, future impact analysis, failure prediction, and performance estimation.
---

# Simulation Workflow (Analysis Mode – Read-Only)

This workflow evaluates alternative implementation approaches through multi-dimensional simulation before making any code modifications.

## Workflow Sequence
1. **Scenario Simulator** ([agents/scenario_simulator.md](../agents/scenario_simulator.md))
   - Generates candidate implementation approaches based on the System Architect's proposals.
   - Outputs: *Simulation Comparison Report*.
2. **Future Impact Analyst** ([agents/future_impact.md](../agents/future_impact.md))
   - Evaluates long-term maintainability, tech-debt accumulation, and scalability.
   - Outputs: *Future Impact Report*.
3. **Failure Prediction Agent** ([agents/failure_prediction.md](../agents/failure_prediction.md))
   - Identifies potential failure modes, race conditions, edge cases, and backward incompatibility.
   - Outputs: *Failure Prediction Report*.
4. **Performance Simulator** ([agents/performance_simulator.md](../agents/performance_simulator.md))
   - Estimates latency, throughput, memory overhead, and resource scaling.
   - Outputs: *Performance Simulation Report*.
5. **Decision Intelligence Agent** ([agents/decision_intelligence.md](../agents/decision_intelligence.md))
   - Applies the Conflict Resolution Protocol to synthesize simulation findings.
   - Outputs: *Decision Report* and draft *Implementation Plan*.

## Execution Mode
* Strictly read-only. No source files or configurations are modified.
* Operates via in-session role loading or Antigravity Python workflow orchestration.
