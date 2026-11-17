import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showSubtitle = false }) => {
  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-2 group select-none">
      {/* Name without "AI" and without logo box as requested */}
      <span className={`font-extrabold ${textSizes[size]} tracking-tight text-slate-900 dark:text-white leading-none`}>
        RealityForge
      </span>
      {showSubtitle && (
        <span className="text-[10px] font-mono text-slate-400 dark:text-[#8E90A6] tracking-wider uppercase ml-1">
          Project Intelligence
        </span>
      )}
    </div>
  );
};
