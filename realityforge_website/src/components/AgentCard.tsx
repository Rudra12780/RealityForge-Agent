import React from 'react';
import { Bot, Sparkles, Zap, Scale } from 'lucide-react';

export interface AgentData {
  id: string;
  name: string;
  role: string;
  tier: 'intelligence' | 'simulation' | 'engineering' | 'decision';
  description: string;
  reads: string;
  writes: string;
}

const tierConfig = {
  intelligence: {
    label: 'Intelligence',
    fullLabel: 'Project Intelligence',
    color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
    icon: Bot,
  },
  simulation: {
    label: 'Simulation',
    fullLabel: 'Simulation & Prediction',
    color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    icon: Sparkles,
  },
  engineering: {
    label: 'Engineering',
    fullLabel: 'Engineering & Quality',
    color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    icon: Zap,
  },
  decision: {
    label: 'Decision',
    fullLabel: 'Decision Intelligence',
    color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
    icon: Scale,
  },
};

export const AgentCard: React.FC<{ agent: AgentData }> = ({ agent }) => {
  const tier = tierConfig[agent.tier];
  const TierIcon = tier.icon;

  return (
    <div className="rounded-xl border border-slate-200/90 dark:border-[#353750] bg-white dark:bg-[#252637] p-3.5 sm:p-4 hover:border-indigo-400 dark:hover:border-indigo-500/60 hover:shadow-md transition-all duration-200 shadow-sm flex flex-col justify-between h-full group">
      <div>
        {/* Top meta row: Compact Badge + Identifier */}
        <div className="flex items-center justify-between gap-1.5 mb-2">
          <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${tier.color}`}>
            <TierIcon className="w-2.5 h-2.5 shrink-0" />
            <span>{tier.label}</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400 dark:text-[#8E90A6] truncate max-w-[120px]" title={`agent::${agent.id}`}>
            ::{agent.id}
          </span>
        </div>

        {/* Name and Role */}
        <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {agent.name}
        </h4>
        <p className="text-[11px] font-medium text-indigo-600/90 dark:text-indigo-400/90 mb-1.5 mt-0.5">
          {agent.role}
        </p>

        {/* Compact Description (2-line clamp keeps all cards strictly uniform in height) */}
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug line-clamp-2 mb-3" title={agent.description}>
          {agent.description}
        </p>
      </div>

      {/* Compact Inputs / Outputs Footer */}
      <div className="pt-2 border-t border-slate-100 dark:border-[#353750]/60 space-y-1 text-[10px]">
        <div className="flex items-center justify-between gap-1.5 text-slate-500 dark:text-slate-400">
          <span className="font-mono text-slate-400 dark:text-[#8E90A6] shrink-0 font-medium">In:</span>
          <span className="truncate text-right text-slate-700 dark:text-slate-300 font-sans" title={agent.reads}>
            {agent.reads}
          </span>
        </div>
        <div className="flex items-center justify-between gap-1.5 text-slate-500 dark:text-slate-400">
          <span className="font-mono text-slate-400 dark:text-[#8E90A6] shrink-0 font-medium">Out:</span>
          <span className="truncate text-right text-slate-700 dark:text-slate-300 font-sans" title={agent.writes}>
            {agent.writes}
          </span>
        </div>
      </div>
    </div>
  );
};
