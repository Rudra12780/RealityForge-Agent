# RealityForge AI: Safety, Approval Gates & Rollback Protocol

This document outlines the strict safety boundaries, failure handling mechanisms, and automated rollback protocols enforced by RealityForge AI during software engineering tasks.

---

## 1. Non-Bypassable Safety Gates

RealityForge AI operates under a **Zero Unapproved Modification** policy. The following gates cannot be skipped or auto-approved by any subagent or automated workflow:

```
[Discovery / Analysis] 
        ↓
[Simulation & Decision]
        ↓
====== Gate 1 (Plan Approval): User Approves Exact File Whitelist & Changes ======
        ↓
[Developer Implements Changes strictly to Whitelisted Files]
        ↓
====== Gate 2 (Test Execution Consent): User Approves Dynamic Test Execution ======
        ↓
[Testing & Security Scan Executed]
        ↓
  * Did any test fail? *
       ├── YES ──> [HALT IMMEDIATELY & REPORT ERROR]
       └── NO  ──> [Code Reviewer Assessment]
                        ↓
====== Gate 3 (Verification Verdict Approval): User Approves Verification & Merge ======
        ↓
====== Gate 4 (Memory Persistence Approval): User Approves Memory Persistence ======
```

### Gate Rules:
1. **Never Touch Files Before Gate 1:** In Analysis Mode, all tools operate in read-only capacity. No file writes, branch creations, or package modifications are allowed.
2. **Strict Scope Lock:** If the approved implementation plan specifies editing `[backend/server.js]`, the Developer Agent is strictly forbidden from editing `[package.json]` or any other file.
3. **If Tests Fail, Stop:** If any test fails, do not attempt to "fix it blindly" without reporting to the user. Present the failure log, explain the cause, and await user direction.
4. **No Silent Git Operations:** Never execute `git push`, `git merge main`, or deploy to cloud environments. All changes remain confined to a local feature branch (`realityforge/<timestamp>`).

---

## 2. Verified Rollback Protocol

Before applying any source code modifications in Engineering Mode, the system must establish a verified rollback point.

### Step 1: Pre-Modification Snapshot (Mandatory)
Execute one of the following version-control checkpoints before editing any file:
* **Option A: Dedicated Feature Branch (Preferred)**
  ```bash
  git checkout -b realityforge/<feature-name>-<timestamp>
  ```
* **Option B: Working Directory Stash / Commit Baseline**
  ```bash
  git stash create "realityforge-pre-modification-snapshot"
  ```
* **Option C: Non-VCS Workspace File Backup**
  If the repository is not managed by Git, create exact copies of target files in a temporary backup directory:
  `.realityforge_backup/<relative-path>`

### Step 2: Immediate Rollback Trigger
If any of the following occur:
- A syntax or type error cannot be resolved cleanly within scope;
- The test suite fails and regression occurs;
- The user rejects the implementation at **Gate 3**;
- An unhandled error or permission denial aborts the run;

The agent must immediately execute rollback:
```bash
# If using git feature branch:
git reset --hard HEAD
git checkout <original-branch>

# If files were modified in place:
git checkout -- <modified-files>
```
And verify the working directory is clean:
```bash
git status
```

---

## 3. Handling Permission Denials & Unsupported Capabilities

1. **Permission Check Denial:**
   - If a sandbox permission check or user permission check fails (e.g. `user denied permission for read_file` or `run_command outside sandbox`), **do not retry**, do not rephrase, and do not attempt to bypass via alternate scripts.
   - Immediately report the limitation to the user, state which step could not be completed, and continue with the remaining non-restricted tasks.
2. **Unsupported Commands Protection:**
   - Do not invoke fictitious Antigravity CLI commands like `agy run-workflow ...` or `agy test`.
   - Use documented Antigravity tool primitives (`read_file`, `write_file`, `edit_file`, `run_command`, `invoke_subagent`, `run_workflow`).
