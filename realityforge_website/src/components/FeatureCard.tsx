import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tag?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, tag }) => {
  return (
    <div className="group relative rounded-2xl border border-slate-200/90 dark:border-[#353750] bg-white dark:bg-[#252637] p-6 sm:p-7 hover:border-indigo-500/50 dark:hover:border-indigo-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-0.5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-[#1D1E2C] border border-indigo-100 dark:border-[#353750] flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform duration-300">
            <Icon className="w-5 h-5" />
          </div>
          {tag && (
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-[#1D1E2C] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#353750]">
              {tag}
            </span>
          )}
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
