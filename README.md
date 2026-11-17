<div align="center">

# RealityForge

### Advanced Project Intelligence & Architectural Simulation System

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Google Antigravity](https://img.shields.io/badge/Compatible-Google%20Antigravity-6366f1.svg)](https://github.com/Rudra12780/RealityForge-Agent)
[![Mode: Dual-Safety](https://img.shields.io/badge/Safety-Mode%20A%20%7C%20Mode%20B-10b981.svg)](https://github.com/Rudra12780/RealityForge-Agent)
[![Agents: 14](https://img.shields.io/badge/Agents-14%20Specialized-8b5cf6.svg)](https://github.com/Rudra12780/RealityForge-Agent)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Rudra12780/RealityForge-Agent)

**RealityForge** is a portable, stack-agnostic software engineering skill and project intelligence system. It explores, understands, simulates competing architectural solutions, and safely builds features with strict human-in-the-loop approval gates.

[Key Features](#-key-features) â€¢
[Quick Start](#-how-to-implement-in-your-project) â€¢
[Agent Roster](#-the-14-specialized-agents) â€¢
[Safety Model](#-dual-mode-safety-guarantee) â€¢
[Website UI](#-website-ui-frontend) â€¢
[Documentation](#-structured-engineering-reports)

---

</div>

## Key Features

- **Universal Stack Discovery:** Automatically introspects repository manifests, compilers, and configs across React, Vue, Angular, Node.js, Python (Django, FastAPI, Flask), Go, Java (Spring), Rust, PHP, SQL/NoSQL databases, and cloud environments without making assumptions.
- **Scenario Simulation Engine:** Benchmarks multiple competing implementation approaches before writing a single line of code. Compares estimated latency, technical debt risk, security impact, and engineering hours.
- **Strict Dual-Mode Safety:**
  - **Mode A (Analysis Mode):** 100% read-only. 0 files created, modified, or deleted.
  - **Mode B (Engineering Mode):** Requires explicit human approval on a concrete file-by-file plan before creating isolated Git branches.
- **14 Purpose-Built Specialized Agents:** Non-overlapping responsibilities that eliminate hallucinations and verify every architectural decision.
- **Persistent Project Memory:** Automatically stores discovered conventions, technology constraints, and past decisions in clean JSON (`memory/project_memory.json`). Zero secrets or passwords stored.
- **Interactive Developer Website:** Full React + Vite + Tailwind CSS documentation portal featuring the Eclipse Elixir dark/light theme, live terminal simulations, and interactive architecture diagrams.

---

## How to Implement in Your Project

You do not need complex server setups, databases, or Docker containers. RealityForge is packaged as a portable Agent Skill folder.

### Step 1: Clone the Repository

Clone this repository into your machine:

```bash
git clone https://github.com/Rudra12780/RealityForge-Agent.git
```

### Step 2: Add to Your Project

Simply copy the `realityforge_ai` folder into the root of any software project you want to analyze:

```text
your-project/
|-- src/                 # Your existing code (untouched)
|-- package.json         # (or requirements.txt, go.mod, pom.xml)
\-- realityforge_ai/     # <-- Paste the folder here
    |-- SKILL.md         # Master skill instructions
    |-- agents/          # 14 specialized agent guidelines
    |-- workflows/       # Execution pipelines
    |-- templates/       # 7 engineering report formats
    \-- memory/          # Project knowledge base
```

### Step 3: Run Project Discovery (Mode A: Read-Only)

Open your project in Google Antigravity (or any Agent-compatible AI assistant) and send this prompt in the chat:

```text
Please load the RealityForge skill from ./realityforge_ai and run the Project Discovery Workflow in Mode A to analyze my codebase.
```

> **Safety Guarantee:** Mode A is strictly read-only. Your existing source files will never be touched.

### Step 4: Simulate Solutions Before Writing Code

Before asking the AI to write complex code, ask RealityForge to simulate 3 different approaches:

```text
Using RealityForge, simulate 3 candidate approaches to add JWT authentication with refresh tokens to our project.
```

RealityForge compares all 3 options and outputs a side-by-side trade-off matrix:
- **Approach 1:** Stateless Redis JWT Cache (Effort: 4h, Risk: Low, Perf: +24%)
- **Approach 2:** DB-Backed Session Revocation (Effort: 6h, Risk: Med, Perf: -4%)
- **Approach 3:** Asymmetric Ed25519 Token Signing (Effort: 5h, Risk: Low, Perf: +38%)

### Step 5: Safe Gated Implementation (Mode B)

Once you pick the approach you like, RealityForge generates an **Implementation Plan** listing every file it wants to touch. It halts and waits for your confirmation:

```text
I approve Approach 3. Proceed with the Implementation Workflow in Mode B on branch realityforge/feat-jwt-auth.
```

Only after you type your approval does RealityForge create the isolated branch, make the changes, run automated tests, and review its work.

---

## The 14 Specialized Agents

RealityForge divides engineering intelligence across 14 specialized agent roles organized into 4 functional tiers:

| Tier | Agent | Role & Mandate | Primary Inputs & Outputs |
| :--- | :--- | :--- | :--- |
| **Project Intelligence** | `project_analyst` | Stack Discovery & Topology mapping | Reads repo tree -> Outputs project overview |
| **Project Intelligence** | `system_architect` | Scalability, boundaries & modular design | Reads architecture -> Outputs structural redesign |
| **Project Intelligence** | `dependency_analyst` | Package graphs, collisions & CVE alerts | Reads manifests -> Outputs dependency DAG |
| **Project Intelligence** | `code_intelligence` | AST parsing & cyclomatic complexity | Reads source AST -> Outputs complexity audit |
| **Simulation & Prediction** | `scenario_simulator` | Multi-path implementation projections | Reads task spec -> Outputs candidate approaches |
| **Simulation & Prediction** | `future_impact` | 2-year technical debt & scaling forecast | Reads proposal -> Outputs debt projections |
| **Simulation & Prediction** | `failure_prediction` | Edge cases, race conditions & memory leaks | Reads diffs -> Outputs crash hazard matrix |
| **Simulation & Prediction** | `performance_simulator` | Simulated latency & throughput profiling | Reads designs -> Outputs benchmark estimates |
| **Engineering & Quality** | `developer` | Gated branch implementation | Reads plan -> Writes code to isolated branch |
| **Engineering & Quality** | `testing` | Automated regression test scaffolding | Reads changes -> Executes test suites |
| **Engineering & Quality** | `security` | OWASP vulnerability scans & secret veto | Reads diffs -> Audits CVEs & secret leaks |
| **Engineering & Quality** | `performance_engineer` | Query optimization & cache strategies | Reads profiles -> Outputs performance tweaks |
| **Engineering & Quality** | `code_reviewer` | Quality checks & human specification alignment | Reads diff -> Issues approval verdict |
| **Decision Intelligence** | `decision_intelligence` | Conflict resolution & defensible recommendations | Reads trade-offs -> Outputs implementation plan |

---

## Dual-Mode Safety Guarantee

| Feature | Mode A -- Analysis Mode | Mode B -- Engineering Mode |
| :--- | :--- | :--- |
| **Primary Goal** | Deep codebase discovery & simulation | Controlled code modification |
| **Files Modified** | **0 files** (strictly read-only) | Only files explicitly listed on whitelist |
| **Git Operations** | None | Isolated feature branch (`realityforge/*`) |
| **Secret Storage** | Zero secrets stored in memory | Never writes credentials, tokens, or keys |
| **Human Approvals** | No write actions performed | **4 mandatory approval checkpoints** |
| **Rollback Command** | Not applicable (no writes) | Built-in 1-click rollback command generated |

### The 4 Non-Bypassable Approval Gates (Mode B):
1. **Gate 1 (Plan Confirmation):** User must explicitly approve the file-by-file delta checklist before any code is modified.
2. **Gate 2 (Test Execution Consent):** User authorizes executing dynamic test scripts in their environment.
3. **Gate 3 (Final Verification Sign-off):** User inspects the final diff, test logs, and Code Reviewer verdict.
4. **Gate 4 (Memory Update Consent):** User authorizes recording new architectural lessons into persistent memory.

---

## Structured Engineering Reports

RealityForge produces 7 standardized Markdown reports based on tested templates in `realityforge_ai/templates/`:

1. **Architecture Report (`architecture_report.md`):** Complete framework audit, directory topology, entry points, and data boundaries.
2. **Dependency Impact Report (`dependency_report.md`):** Direct and transitive package graphs, outdated packages, and license compliance.
3. **Simulation Comparison (`simulation_comparison.md`):** Side-by-side matrix comparing estimated latency, security, and effort.
4. **Risk Assessment Report (`risk_assessment.md`):** Edge-case failure modes, race conditions, and mitigation recommendations.
5. **Performance Analysis Report (`performance_report.md`):** Latency estimations, memory footprints, and cache hit ratios.
6. **Implementation Plan (`implementation_plan.md`):** Granular file whitelist, rollback command, and step-by-step diff outline.
7. **Final Verification Report (`verification_report.md`):** Automated test pass/fail logs, security auditor approval, and reviewer verdict.

---

## Website UI (Frontend)

This repository includes a modern developer documentation website located in the `realityforge_website` directory.

### Tech Stack
- **Framework:** React 18 + Vite + TypeScript
- **Styling:** Tailwind CSS (Eclipse Elixir `#1D1E2C` theme)
- **Icons:** Lucide React
- **Features:** Dark/Light theme switching, interactive terminal simulator, responsive 4-column agent roster, global on-click ripple effects, and realistic typing animations on code blocks.

### How to Run the Website Locally

```bash
# 1. Navigate to the website directory
cd realityforge_website

# 2. Install dependencies (if running for the first time)
npm install

# 3. Start the development server
npm run dev
```

Visit **http://localhost:5173/** in your browser.

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Repository Structure

```text
RealityForge/
|-- README.md                      # This comprehensive guide
|-- realityforge_ai/               # The portable Agent Skill
|   |-- SKILL.md                   # Skill entrypoint & environment spec
|   |-- agents/                    # 14 specialized agent guidelines
|   |   |-- project_analyst.md
|   |   |-- system_architect.md
|   |   |-- dependency_analyst.md
|   |   |-- code_intelligence.md
|   |   |-- scenario_simulator.md
|   |   |-- future_impact.md
|   |   |-- failure_prediction.md
|   |   |-- performance_simulator.md
|   |   |-- developer.md
|   |   |-- testing.md
|   |   |-- security.md
|   |   |-- performance_engineer.md
|   |   |-- code_reviewer.md
|   |   \-- decision_intelligence.md
|   |-- workflows/                 # 5 multi-agent execution workflows
|   |   |-- discovery_workflow.md
|   |   |-- simulation_workflow.md
|   |   |-- decision_workflow.md
|   |   |-- implementation_workflow.md
|   |   \-- learn_workflow.md
|   |-- templates/                 # 7 standardized report templates
|   |-- memory/                    # Persistent project intelligence
|   |   |-- schema.json
|   |   \-- project_memory.json
|   \-- tests/                     # Integrity & verification test suite
|       \-- validate_skill.js
\-- realityforge_website/          # React + Vite frontend developer portal
    |-- src/
    |   |-- components/            # UI components (Terminal, Cards, Navbar, etc.)
    |   |-- pages/Home.tsx         # Interactive home page
    |   \-- index.css              # Custom styles & keyframe animations
    |-- index.html
    \-- package.json
```

---

## Author & Maintainer

- **Creator:** [@Rudra12780](https://github.com/Rudra12780)
- **Repository:** https://github.com/Rudra12780/RealityForge-Agent

## License

This project is licensed under the **MIT License** -- see the LICENSE file for details.
