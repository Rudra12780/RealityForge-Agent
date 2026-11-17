import React, { useState } from 'react';
import { Bot, Sparkles, Scale, Zap, ShieldCheck, Database, Lock } from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>('decision');

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-[#353750] bg-white dark:bg-[#1D1E2C] p-4 sm:p-8 shadow-sm">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-[#252637] px-3 py-1 rounded-full border border-indigo-200 dark:border-[#353750]">
          Orchestration DAG
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-2">
          End-to-End Pipeline & Security Gates
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Click on any tier below to inspect its data contract and isolation level.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 relative">
        {/* Tier 1: Intelligence */}
        <div
          onClick={() => setSelectedNode('intel')}
          className={`cursor-pointer rounded-xl border p-4 sm:p-5 transition-all ${
            selectedNode === 'intel'
              ? 'border-indigo-500 bg-indigo-50/50 dark:bg-[#252637] shadow-md ring-2 ring-indigo-500/20'
              : 'border-slate-200 dark:border-[#353750] bg-white dark:bg-[#252637]/70 hover:border-slate-400 dark:hover:border-indigo-500/50'
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-500">
              <Bot className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] font-mono text-slate-400 dark:text-[#8E90A6] block uppercase">Phase 1 & 2</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Project Intelligence</h4>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Discovers stack, packages, AST topologies, and interfaces.
          </p>
          <div className="space-y-1 text-[11px] font-mono">
            <div className="px-2 py-1 rounded bg-slate-100 dark:bg-[#1D1E2C] text-slate-700 dark:text-slate-300">
              Project Analyst
            </div>
            <div className="px-2 py-1 rounded bg-slate-100 dark:bg-[#1D1E2C] text-slate-700 dark:text-slate-300">
              Dependency Analyst
            </div>
            <div className="px-2 py-1 rounded bg-slate-100 dark:bg-[#1D1E2C] text-slate-700 dark:text-slate-300">
              Code Intelligence Agent
            </div>
            <div className="px-2 py-1 rounded bg-slate-100 dark:bg-[#1D1E2C] text-slate-700 dark:text-slate-300">
              System Architect
            </div>
          </div>
          <span className="mt-3 block text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
            ● Strictly Read-Only
          </span>
        </div>

        {/* Tier 2: Simulation */}
        <div
          onClick={() => setSelectedNode('sim')}
          className={`cursor-pointer rounded-xl border p-4 sm:p-5 transition-all ${
            selectedNode === 'sim'
              ? 'border-cyan-500 bg-cyan-50/50 dark:bg-[#252637] shadow-md ring-2 ring-cyan-500/20'
              : 'border-slate-200 dark:border-[#353750] bg-white dark:bg-[#252637]/70 hover:border-slate-400 dark:hover:border-cyan-500/50'
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-500">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] font-mono text-slate-400 dark:text-[#8E90A6] block uppercase">Phase 3 & 4</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Scenario Simulation</h4>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Projects alternate paths, failure scenarios, and latency profiles.
          </p>
          <div className="space-y-1 text-[11px] font-mono">
            <div className="px-2 py-1 rounded bg-slate-100 dark:bg-[#1D1E2C] text-slate-700 dark:text-slate-300">
              Scenario Simulator
            </div>
            <div className="px-2 py-1 rounded bg-slate-100 dark:bg-[#1D1E2C] text-slate-700 dark:text-slate-300">
              Future Impact Analyst
            </div>
            <div className="px-2 py-1 rounded bg-slate-100 dark:bg-[#1D1E2C] text-slate-700 dark:text-slate-300">
              Failure Prediction
            </div>
            <div className="px-2 py-1 rounded bg-slate-100 dark:bg-[#1D1E2C] text-slate-700 dark:text-slate-300">
              Performance Simulator
            </div>
          </div>
          <span className="mt-3 block text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
            ● Parallel Evaluation
          </span>
        </div>

        {/* Tier 3: Decision & Gated Checkpoint */}
        <div
          onClick={() => setSelectedNode('decision')}
          className={`cursor-pointer rounded-xl border p-4 sm:p-5 transition-all ${
            selectedNode === 'decision'
              ? 'border-purple-500 bg-purple-50/50 dark:bg-[#252637] shadow-md ring-2 ring-purple-500/20'
              : 'border-slate-200 dark:border-[#353750] bg-white dark:bg-[#252637]/70 hover:border-slate-400 dark:hover:border-purple-500/50'
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1.5 rounded-lg bg-purple-500/15 text-purple-500">
              <Scale className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] font-mono text-slate-400 dark:text-[#8E90A6] block uppercase">Phase 5 & Gate</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Decision & Approval</h4>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Arbitrates findings, formats plan, and halts for user sign-off.
          </p>
          <div className="space-y-1 text-[11px] font-mono">
            <div className="px-2 py-1 rounded bg-purple-100 dark:bg-[#1D1E2C] text-purple-700 dark:text-purple-300 font-semibold border border-purple-300/40 dark:border-purple-500/30">
              Decision Intelligence
            </div>
            <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-sans text-xs flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Human Approval Gate</span>
            </div>
          </div>
          <span className="mt-3 block text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
            ● Mandatory User Authorization
          </span>
        </div>

        {/* Tier 4: Engineering & Quality */}
        <div
          onClick={() => setSelectedNode('eng')}
          className={`cursor-pointer rounded-xl border p-4 sm:p-5 transition-all ${
            selectedNode === 'eng'
              ? 'border-emerald-500 bg-emerald-50/50 dark:bg-[#252637] shadow-md ring-2 ring-emerald-500/20'
              : 'border-slate-200 dark:border-[#353750] bg-white dark:bg-[#252637]/70 hover:border-slate-400 dark:hover:border-emerald-500/50'
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-500">
              <Zap className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] font-mono text-slate-400 dark:text-[#8E90A6] block uppercase">Phase 6, 7 & 8</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Engineering & Test</h4>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Implements in isolated Git branches and verifies regression suites.
          </p>
          <div className="space-y-1 text-[11px] font-mono">
            <div className="px-2 py-1 rounded bg-slate-100 dark:bg-[#1D1E2C] text-slate-700 dark:text-slate-300">
              Developer Agent
            </div>
            <div className="px-2 py-1 rounded bg-slate-100 dark:bg-[#1D1E2C] text-slate-700 dark:text-slate-300">
              Testing & Security Agents
            </div>
            <div className="px-2 py-1 rounded bg-slate-100 dark:bg-[#1D1E2C] text-slate-700 dark:text-slate-300">
              Performance Engineer
            </div>
            <div className="px-2 py-1 rounded bg-slate-100 dark:bg-[#1D1E2C] text-slate-700 dark:text-slate-300">
              Code Reviewer
            </div>
          </div>
          <span className="mt-3 block text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
            ● Isolated Git Branching
          </span>
        </div>
      </div>

      {/* Dynamic Details Drawer */}
      <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-[#151622] border border-slate-200 dark:border-[#353750] text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <span>
            <strong>Persistent Project Memory:</strong> <code className="font-mono text-xs text-indigo-600 dark:text-indigo-400">memory/project_memory.json</code> stores architectural topology, historical decisions, and constraints across sessions.
          </span>
        </div>
        <span className="text-xs font-mono text-slate-400 dark:text-[#8E90A6] flex-shrink-0">
          Zero Credentials Stored
        </span>
      </div>
    </div>
  );
};
