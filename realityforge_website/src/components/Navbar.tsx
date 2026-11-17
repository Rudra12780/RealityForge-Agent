import React, { useState } from 'react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { Github, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const githubRepo = 'https://github.com/Rudra12780/RealityForge-Agent';

  // "Get started" placed in front of Features with normal, unhighlighted text type
  const navLinks = [
    { href: '#how-to-implement', label: 'Get started' },
    { href: '#features', label: 'Features' },
    { href: '#architecture', label: 'Architecture' },
    { href: '#agents', label: 'Agents' },
    { href: '#workflows', label: 'Workflows' },
    { href: '#safety', label: 'Safety' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-[#353750]/70 bg-white/90 dark:bg-[#1D1E2C]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Side: Brand Logo + Clean Subtitle */}
        <div className="flex items-center gap-3.5 flex-shrink-0">
          <a href="#" className="flex items-center">
            <Logo size="md" showSubtitle={false} />
          </a>
          <span className="hidden md:inline-block text-xs text-slate-400 dark:text-slate-400 font-sans pl-3 border-l border-slate-200 dark:border-[#353750]">
            Project Intelligence System
          </span>
        </div>

        {/* Right Navigation & Controls: Clean, borderless, matching screenshot 3 aesthetic */}
        <div className="hidden lg:flex items-center gap-8">
          {/* Navigation Links with Proper Spacing */}
          <nav className="flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Controls: Theme Toggle & GitHub (Clean borderless) */}
          <div className="flex items-center gap-5 pl-2">
            <ThemeToggle />

            <a
              href={githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="GitHub: Rudra12780/RealityForge-Agent"
            >
              <Github className="w-4 h-4 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" />
              <span>Rudra12780</span>
            </a>
          </div>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-[#353750] bg-white dark:bg-[#191a27] px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm py-2 px-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href={githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 py-2 px-2 font-mono text-xs"
            >
              <Github className="w-4 h-4" />
              <span>GitHub: Rudra12780/RealityForge-Agent</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
