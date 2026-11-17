import React from 'react';

interface BlinkingCursorProps {
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BlinkingCursor: React.FC<BlinkingCursorProps> = ({
  color = 'bg-indigo-400 dark:bg-indigo-300',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-1.5 h-3.5',
    md: 'w-2 sm:w-2.5 h-[1.15em]',
    lg: 'w-2.5 h-5',
  };

  return (
    <span
      className={`inline-block ${sizeClasses[size]} ml-1 align-middle rounded-[1px] ${color} animate-cursor-blink select-none pointer-events-none shadow-sm ${className}`}
      aria-hidden="true"
    />
  );
};
