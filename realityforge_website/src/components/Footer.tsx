import React from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from './Logo';
import { Github, ArrowUpRight, ShieldCheck, Heart, User } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  const githubRepo = 'https://github.com/Rudra12780/RealityForge-Agent';
  const githubProfile = 'https://github.com/Rudra12780';

  return (
    <footer className="border-t border-slate-200 dark:border-[#353750]/80 bg-slate-100/60 dark:bg-[#151622] text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 sm:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              {t('footer.brand_desc')}
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero-Destruction Safety Architecture Guaranteed</span>
            </div>
            {/* Author Credit */}
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <User className="w-3.5 h-3.5 text-blue-500" />
              <span>Developed by</span>
              <a
                href={githubProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-900 dark:text-white hover:text-blue-500 transition-colors inline-flex items-center gap-1 font-mono"
              >
                @Rudra12780
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Column: Implementation & Quick links */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 mb-3 uppercase tracking-wider text-[11px] font-mono">
              Get Started
            </h4>
            <ul className="space-y-2">
              <li><a href="#how-to-implement" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-blue-600 dark:text-blue-400">Add to Your Project (Guide)</a></li>
              <li><a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Capabilities</a></li>
              <li><a href="#agents" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">14 AI Agents</a></li>
              <li><a href="#workflows" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">4 Workflows</a></li>
              <li><a href="#reports" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">7 Generated Reports</a></li>
            </ul>
          </div>

          {/* Column: Architecture */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 mb-3 uppercase tracking-wider text-[11px] font-mono">
              {t('footer.col_architecture')}
            </h4>
            <ul className="space-y-2">
              <li><a href="#architecture" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">4-Tier DAG Engine</a></li>
              <li><a href="#safety" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Mode A vs Mode B Safety</a></li>
              <li><a href="#how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">9-Phase Simulation Cycle</a></li>
              <li><a href="#stack" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Universal Framework Stacks</a></li>
              <li><a href="#faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Technical FAQ</a></li>
            </ul>
          </div>

          {/* Column: GitHub & Repositories */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 mb-3 uppercase tracking-wider text-[11px] font-mono">
              Open Source
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-mono font-medium"
                >
                  <Github className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                  <span>RealityForge-Agent</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href={githubProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-mono"
                >
                  <span>github.com/Rudra12780</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li className="pt-1 text-[11px] text-slate-500 font-mono">
                License: MIT Open Source
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} RealityForge. Created by <a href={githubProfile} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-400">Rudra12780</a>. {t('footer.rights')}</p>
          <div className="flex items-center gap-4">
            <span className="font-mono">GitHub: Rudra12780/RealityForge-Agent</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
