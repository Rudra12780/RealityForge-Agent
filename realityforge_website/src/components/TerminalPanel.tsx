import React, { useState } from 'react';
import { Copy, Check, Play, ShieldAlert, Cpu, Sparkles } from 'lucide-react';
import { BlinkingCursor } from './BlinkingCursor';

interface TerminalTab {
  id: string;
  name: string;
  mode: string;
  command: string;
  output: string;
}

const tabs: TerminalTab[] = [
  {
    id: 'discovery',
    name: '1. Discovery Pipeline',
    mode: 'Mode A: Read-Only',
    command: 'realityforge discover --target ./repo --depth full',
    output: `[Project Analyst] Scanning repository topology...
✓ Detected: React 18 + Node.js (Express) + TypeScript + PostgreSQL
✓ Identified: 84 source modules, 12 public REST endpoints
[Dependency Analyst] Evaluating 46 direct & 312 transitive dependencies...
✓ No critical vulnerabilities detected. 2 minor version upgrades suggested.
[Code Intelligence] Cyclomatic complexity scan:
✓ Average module complexity: 4.2 (Healthy)
[System Architect] Generated Architecture Map -> memory/project_memory.json
Status: Completed in 840ms. Read-only verified: 0 files modified.`,
  },
  {
    id: 'simulation',
    name: '2. Scenario Simulation',
    mode: 'Mode A: Read-Only',
    command: 'realityforge simulate --task "migrate-auth-to-jwt" --scenarios 3',
    output: `[Scenario Simulator] Synthesizing 3 candidate implementations:
  ├── Approach 1: Stateless Redis JWT Cache (Effort: 4h, Risk: Low, Perf: +24%)
  ├── Approach 2: DB-Backed Session Revocation Table (Effort: 6h, Risk: Med, Perf: -4%)
  └── Approach 3: Asymmetric Ed25519 Token Signing (Effort: 5h, Risk: Low, Perf: +38%)
[Performance Simulator] Simulated request latency under 10k RPS load:
  ├── Approach 1: ~18ms p99 latency
  └── Approach 3: ~12ms p99 latency (Optimal)
[Failure Prediction] Anticipating edge cases:
  ⚠ Warning: Clock drift on decentralized nodes requires 30s leeway window.
[Decision Intelligence] Recommendation: Approach 3 (Asymmetric Ed25519)
Verdict: Selected approach yields highest throughput with minimal technical debt.`,
  },
  {
    id: 'engineering',
    name: '3. Gated Engineering',
    mode: 'Mode B: Gated Execution',
    command: 'realityforge implement --plan memory/implementation_plan.md',
    output: `[Safety Checkpoint] ⚠ HUMAN-IN-THE-LOOP AUTHORIZATION REQUIRED ⚠
Proposed Changes:
  + src/auth/token_engine.ts (New: Ed25519 signer)
  ~ src/middleware/auth.ts (Modified: Validate bearer token)
  + tests/auth/token_engine.test.ts (New: 14 regression tests)
Target Branch: realityforge/feat-ed25519-auth-20261117

Waiting for user authorization: [A]pprove / [R]eject / [M]odify plan?
> User approved: 'A'
[Developer Agent] Committing isolated changes to branch realityforge/feat-ed25519-auth-20261117...
[Testing Agent] Executing automated test suite:
  ✓ 14/14 auth regression tests PASSED (Coverage: 98.4%)
[Security Agent] Static OWASP scan passed. 0 secret leaks detected.
[Code Reviewer] Verification verdict: APPROVED. Zero destruction verified.`,
  },
];

export const TerminalPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
  const [copied, setCopied] = useState(false);

  const current = tabs.find((t) => t.id === activeTab) || tabs[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-[#353750] bg-[#151622] text-slate-100 shadow-2xl overflow-hidden font-mono">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#12131D] border-b border-[#2C2E42] gap-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs text-slate-400 font-sans font-medium ml-2 hidden sm:inline">
            RealityForge Terminal Interface
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-[#1D1E2C] p-0.5 rounded-lg border border-[#353750]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 text-xs rounded-md font-sans transition-all ${tab.id === activeTab
                ? 'bg-indigo-600 text-white shadow-sm font-medium'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#252637]'
                }`}
            >
              {tab.name.split('.')[1].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Command prompt bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#191A29] border-b border-[#2C2E42] text-xs">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-emerald-400 font-bold">$</span>
          <span className="text-blue-300 font-semibold">{current.command}</span>
          <BlinkingCursor color="bg-emerald-400" size="sm" />
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-sans font-medium ${current.mode.includes('Read-Only')
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}
          >
            {current.mode}
          </span>
          <button
            onClick={handleCopy}
            type="button"
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Copy command"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="p-4 sm:p-5 text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto min-h-[220px]">
        <pre className="whitespace-pre-wrap font-mono">
          {current.output}
          <BlinkingCursor color="bg-indigo-400 dark:bg-cyan-300" />
        </pre>
      </div>

      {/* Footer Status */}
      <div className="px-4 py-2 bg-[#12131D] border-t border-[#2C2E42] flex items-center justify-between text-[11px] text-slate-400 font-sans">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Antigravity Engine Active
        </span>
        <span className="hidden sm:inline">Universal Stack Analysis Engine</span>
      </div>
    </div>
  );
};
