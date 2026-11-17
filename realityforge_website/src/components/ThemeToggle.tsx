import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    try {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    } catch (e) {}
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', nextTheme);
    } catch (e) {}
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle color theme"
      className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors focus:outline-none"
      title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-slate-400 hover:text-amber-400 transition-colors" />
      ) : (
        <Moon className="w-4 h-4 text-slate-600 hover:text-slate-900 transition-colors" />
      )}
    </button>
  );
};
