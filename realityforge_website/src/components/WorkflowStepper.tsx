import React, { useState } from 'react';
import { CodeBlock } from './CodeBlock';

interface WorkflowStep {
  id: string;
  title: string;
  mode: 'A' | 'B';
  modeLabel: string;
  badgeColor: string;
  description: string;
  agentsInvolved: string[];
  outputArtifact: string;
  codeSnippet: string;
}

const workflows: WorkflowStep[] = [
  {
    id: 'discovery',
    title: 'Project Discovery Workflow',
    mode: 'A',
    modeLabel: 'Mode A — Strictly Read-Only',
    badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    description: 'Sequentially executes Project Analyst, Dependency Analyst, Code Intelligence Agent, and System Architect. Scans file trees, dependencies, and ASTs to build a baseline topology without modifying a single byte.',
    agentsInvolved: ['Project Analyst', 'Dependency Analyst', 'Code Intelligence', 'System Architect'],
    outputArtifact: 'Architecture Report (templates/architecture_report.md) & Dependency Graph',
    codeSnippet: `# Discovery Phase (Analysis Mode - Zero File Writes)
realityforge discover \\
  --target ./my-project \\
  --mode A \\
  --output ./realityforge_ai/memory/project_memory.json`,
  },
  {
    id: 'simulation',
    title: 'Scenario Simulation Workflow',
    mode: 'A',
    modeLabel: 'Mode A — Strictly Read-Only',
    badgeColor: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    description: 'Simulates multiple candidate implementation approaches before modifying code. Evaluates performance, future maintenance burden, failure modes, and OWASP security exposure to produce comparative trade-off rankings.',
    agentsInvolved: ['Scenario Simulator', 'Future Impact Analyst', 'Failure Prediction', 'Performance Simulator', 'Decision Intelligence'],
    outputArtifact: 'Simulation Comparison Report & Risk Assessment Report',
    codeSnippet: `# Simulation Phase (Explores 3 Alternative Paths)
realityforge simulate \\
  --feature "Add Webhook Delivery with Retry Engine" \\
  --candidates 3 \\
  --evaluate "performance,security,maintenance"`,
  },
  {
    id: 'implementation',
    title: 'Implementation Workflow',
    mode: 'B',
    modeLabel: 'Mode B — Human-in-the-Loop Gated',
    badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
    description: 'Halts completely at the user approval gate. Once authorized, Developer Agent creates an isolated Git branch, generates code, prompts the Testing Agent to run regression suites, passes through Security Agent, and is reviewed by Code Reviewer.',
    agentsInvolved: ['Developer Agent', 'Testing Agent', 'Security Agent', 'Performance Engineer', 'Code Reviewer'],
    outputArtifact: 'Implementation Plan & Final Verification Report',
    codeSnippet: `# Implementation Phase (Requires Explicit User Confirmation)
realityforge implement \\
  --plan ./realityforge_ai/memory/implementation_plan.md \\
  --branch "realityforge/feat-webhooks-2026" \\
  --require-approval mandatory`,
  },
  {
    id: 'learning',
    title: 'Memory & Learning Workflow',
    mode: 'A',
    modeLabel: 'Mode A — Project Memory Sync',
    badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
    description: 'Ingests verified decisions, benchmark results, and architectural patterns into persistent project memory for continuous knowledge retention across development sessions.',
    agentsInvolved: ['Decision Intelligence', 'Project Analyst'],
    outputArtifact: 'Persisted Knowledge Base in memory/project_memory.json',
    codeSnippet: `# Learning & Memory Sync Phase
realityforge learn \\
  --cycle-id "cycle-20261117" \\
  --archive-decisions true \\
  --scrub-sensitive-keys true`,
  },
];

export const WorkflowStepper: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(workflows[0].id);
  const current = workflows.find((w) => w.id === activeTab) || workflows[0];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-[#353750] bg-white dark:bg-[#252637] p-5 sm:p-8 shadow-sm">
      {/* Workflow Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {workflows.map((wf) => (
          <button
            key={wf.id}
            onClick={() => setActiveTab(wf.id)}
            className={`p-3 sm:p-4 rounded-xl text-left border transition-all ${
              wf.id === activeTab
                ? 'border-indigo-500 bg-indigo-50/70 dark:bg-[#1D1E2C] shadow-sm ring-2 ring-indigo-500/20'
                : 'border-slate-200 dark:border-[#353750] hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-[#1D1E2C]/50'
            }`}
          >
            <span className="text-[10px] font-mono block text-slate-400 uppercase">
              Workflow {workflows.indexOf(wf) + 1}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white block mt-0.5 truncate">
              {wf.title.split(' ')[0]} {wf.title.split(' ')[1]}
            </span>
          </button>
        ))}
      </div>

      {/* Selected Workflow Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${current.badgeColor}`}>
              {current.modeLabel}
            </span>
            <span className="text-xs font-mono text-slate-400 dark:text-[#8E90A6]">
              Target: workflows/{current.id}_workflow.md
            </span>
          </div>

          <h4 className="text-xl font-bold text-slate-900 dark:text-white">
            {current.title}
          </h4>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {current.description}
          </p>

          <div className="pt-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 block mb-2">
              Collaborating Agents:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {current.agentsInvolved.map((agent) => (
                <span
                  key={agent}
                  className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#1D1E2C] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#353750]"
                >
                  {agent}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#151622] border border-slate-200 dark:border-[#353750] text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">
              Generated Reports & Artifacts:
            </span>
            <span className="text-slate-600 dark:text-slate-400 font-mono">
              {current.outputArtifact}
            </span>
          </div>
        </div>

        <div className="lg:col-span-5">
          <CodeBlock code={current.codeSnippet} language="bash" fileName={`${current.id}_workflow.sh`} />
        </div>
      </div>
    </div>
  );
};
