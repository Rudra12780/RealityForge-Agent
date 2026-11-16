# RealityForge AI: Validation Test Suite

This directory contains the automated and scenario-based validation tests for RealityForge AI.

## Verification Checklist

1. **Agent Inventory & Contracts:** Every agent in `agents/` has YAML frontmatter, input/output contracts, and documented handoff targets.
2. **Workflow Consistency:** Every workflow in `workflows/` maps to valid agent cards and specifies clear sequential execution steps.
3. **Template Integrity:** Every template in `templates/` exists and contains valid template placeholders.
4. **Safety & Approval Gates:** Non-bypassable gates (Gate 1 through Gate 4) are formally codified.
5. **Mode Isolation:** Analysis Mode is strictly read-only; Engineering Mode requires pre-modification snapshots, scope locks, and rollback guarantees.
6. **Command Grounding:** No unsupported fictitious CLI commands (e.g. `agy run-workflow`, `agy test`) are referenced.

## Running the Automated Validation Test

Execute the verification script using Node.js:

```bash
node tests/validate_skill.js
```
