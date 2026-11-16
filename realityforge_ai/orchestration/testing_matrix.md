# RealityForge AI: Automated Testing & Verification Matrix

This specification governs how the `Testing Agent`, `Code Intelligence Agent`, and `Security Agent` verify target software repositories without modifying project configurations or installing unapproved dependencies.

---

## 1. Automated Project Tool Detection

Before running any test command, the agent inspects the target workspace to discover available tooling. Commands are selected strictly from what is already present in the target environment.

| Language / Framework | Detection Indicator | Syntax Check Command | Type Check Command | Unit Test Command |
| :--- | :--- | :--- | :--- | :--- |
| **Node.js / TypeScript** | `tsconfig.json` | `node --check <file>` | `npx tsc --noEmit` *(or local node_modules)* | `npm test` (if defined in `package.json`) |
| **Node.js / JavaScript** | `package.json` | `node --check <file>` | N/A | `npm test` (if defined in `package.json`) |
| **Python** | `pyproject.toml`, `requirements.txt`, `setup.py` | `python -m py_compile <file>` | `mypy <file>` *(if present)* | `pytest` *(if `pytest.ini` / tests exist)* |
| **Java / JVM** | `pom.xml` / `build.gradle` | Compilation check | `mvn compile` / `gradle classes` | `mvn test` / `gradle test` |
| **Go** | `go.mod` | `go vet ./...` | Built-in compile check | `go test ./...` |
| **Rust** | `Cargo.toml` | `cargo check` | Built-in compile check | `cargo test` |

### Tool Detection Algorithm
1. Check root directory for project manifest files.
2. If `package.json` exists, parse `scripts` object:
   - Check if `"test"` script exists and does **not** equal `"echo \"Error: no test specified\" && exit 1"`.
   - Check for scripts like `"test:unit"`, `"lint"`, `"typecheck"`, `"build"`.
3. If no automated test script exists, **do not invent or install test frameworks**. Record: `Automated test suite: NOT CONFIGURED IN PROJECT`.
4. Fall back to non-invasive verification:
   - Syntax validation via language runtimes (`node --check`, `python -m py_compile`).
   - Static analysis via declared type checkers (`tsc --noEmit`).

---

## 2. Testing Levels & Execution Hierarchy

```
Level 1: Syntax Validation       (node --check, python -m py_compile)
       ↓
Level 2: Type System Integrity   (tsc --noEmit, mypy)
       ↓
Level 3: Static Security Scan    (pattern scanning for secrets & vulnerabilities)
       ↓
Level 4: Project Test Suite      (npm test, pytest - requires Gate 2 approval)
       ↓
Level 5: Regression Check        (compare post-change test matrix against baseline)
```

### Level 1: Syntax Validation
- **Goal:** Verify that modified and newly introduced files parse without syntax errors.
- **Sandboxed Execution:** Must run in sandboxed terminal (`BypassSandbox: false`).
- **Pass Criteria:** Process exits with code 0.

### Level 2: Type Checking
- **Goal:** Verify interface compatibility, parameter contracts, and avoid type regressions.
- **Rule:** Run using existing project configuration without modifying `tsconfig.json`.
- **Pass Criteria:** 0 compile/type errors.

### Level 3: Static Security Verification
- **Goal:** Detect hardcoded secrets, unsafe queries, and unauthenticated endpoints.
- **Methods:**
  - Regular expression patterns for private keys, AWS/Cloud keys, connection strings with passwords.
  - Verification that sensitive files (`.env`, credentials, local DBs) are in `.gitignore`.
  - Check for open CORS configurations and unauthenticated administrative routes.

### Level 4: Project Test Suite Execution
- **Approval Prerequisite:** **Gate 2 Approval Required** if tests execute arbitrary runtime code.
- **Pass Criteria:** All tests pass with exit code 0.
- **Halt Rule:** If any test fails, the agent must **halt immediately**, capture the failure log, and present it to the user. Do not proceed to Code Review or Memory Update.

### Level 5: Regression Verification
- If baseline tests were executed during the Discovery phase, compare output counts:
  $$\text{Failed Tests}_{\text{post}} \le \text{Failed Tests}_{\text{pre}}$$
- Any newly failing test is treated as a regression blocker.

---

## 3. Strict Truthfulness & Evidence Standard

1. **Never Claim Without Execution:**
   - Under no circumstances may an agent state: *"Tests passed successfully"* unless a concrete test command was executed and logged in the session with exit code 0.
   - If tests were not run, the report must state: `Status: NOT EXECUTED - Reason: [No test runner configured | User skipped Gate 2 | Missing runtime]`.
2. **Never Auto-Install Dependencies:**
   - If a test runner (e.g. Jest, Pytest) is missing, the agent **must not** run `npm install` or `pip install`. It must document the missing dependency in the verification report.
3. **Capture Actual Output:**
   - Summaries must cite specific lines, error messages, and metrics extracted from the actual terminal output.
