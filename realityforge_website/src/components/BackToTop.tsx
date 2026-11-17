import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      {/* Tooltip that pops up on hover above the icon showing "Top" */}
      <div
        role="tooltip"
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center pointer-events-none transition-all duration-150 animate-in fade-in zoom-in-95"
      >
        <span className="px-2 py-0.5 text-[11px] font-semibold font-mono rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg whitespace-nowrap">
          Top
        </span>
        <span className="w-1.5 h-1.5 -mt-0.5 rotate-45 bg-slate-900 dark:bg-white" />
      </div>

      {/* Box outline button (square box with rounded corners, no circle, white arrow/text) */}
      <button
        onClick={scrollToTop}
        type="button"
        aria-label="Back to top"
        title="Top"
        className="w-10 h-10 rounded-lg border border-slate-300 dark:border-[#353750] bg-white dark:bg-[#1D1E2C] hover:bg-slate-50 dark:hover:bg-[#252637] hover:border-slate-400 dark:hover:border-slate-400 text-slate-800 dark:text-white shadow-md transition-all duration-150 flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-slate-400"
      >
        <ArrowUp className="w-4 h-4 text-slate-800 dark:text-white stroke-[2.2]" />
      </button>
    </div>
  );
};
