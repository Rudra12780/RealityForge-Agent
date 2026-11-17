import React, { useEffect, useState } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const ClickEffect: React.FC = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    let rippleCount = 0;

    const handleClick = (e: MouseEvent) => {
      const id = ++rippleCount;
      const x = e.clientX;
      const y = e.clientY;

      setRipples((prev) => [...prev.slice(-15), { id, x, y }]);

      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 700);
    };

    window.addEventListener('pointerdown', handleClick, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none select-none"
          style={{ left: ripple.x, top: ripple.y }}
        >
          {/* Expanding glow wave */}
          <span className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-indigo-500 dark:border-indigo-400 opacity-90 animate-click-ripple shadow-[0_0_12px_rgba(99,102,241,0.6)]" />

          {/* Secondary softer outer halo */}
          <span className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-cyan-400/60 dark:border-cyan-300/80 animate-click-halo" />

          {/* Core center click ping */}
          <span className="absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-500 dark:bg-white animate-click-sparkle" />
        </div>
      ))}
    </div>
  );
};
