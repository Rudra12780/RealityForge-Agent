import React, { useState } from 'react';
import {
  Download,
  FolderPlus,
  MessageSquare,
  ShieldCheck,
  GitBranch,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Github,
  CheckCircle2,
  FileCode,
  Terminal,
  Zap,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { BlinkingCursor } from './BlinkingCursor';

export const EasyImplementationGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copiedClone, setCopiedClone] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const githubRepo = 'https://github.com/Rudra12780/RealityForge-Agent';
  const githubProfile = 'https://github.com/Rudra12780';
  const cloneCmd = 'git clone https://github.com/Rudra12780/RealityForge-Agent.git';

  const copyCloneCmd = () => {
    navigator.clipboard.writeText(cloneCmd);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  const copyPromptText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const steps = [
    {
      num: 1,
      title: '1. Add RealityForge to Your Project Folder',
      subtitle: '30 seconds — No complicated backend or setup needed',
      badge: 'Step 1',
      desc: 'RealityForge is designed as a portable, standalone Agent Skill. You do not need to install complex software or Docker containers. Simply copy the "realityforge_ai" folder directly into the root folder of whatever project you are working on (React, Node, Python, Java, Go, etc.).',
      action: 'Clone with Git or download the repository from GitHub:',
      samplePrompt: null,
    },
    {
      num: 2,
      title: '2. Tell Your AI to Analyze Your Project',
      subtitle: '100% Safe & Strictly Read-Only (Zero code changed)',
      badge: 'Step 2',
      desc: 'Open your project in Google Antigravity (or any Agent Skill enabled editor) and type a simple prompt in the chat. RealityForge immediately scans your files, understands your database, architecture, and libraries, and generates a complete project map.',
      action: 'Click below to copy this example prompt to paste into your AI assistant:',
      samplePrompt: 'Please load the RealityForge skill from ./realityforge_ai and run Project Discovery in Mode A to analyze my codebase.',
    },
    {
      num: 3,
      title: '3. Simulate Any Feature or Bugfix Before Coding',
      subtitle: 'See 3 different solutions and their pros & cons',
      badge: 'Step 3',
      desc: 'Instead of having an AI guess and write messy code right away, ask RealityForge to simulate options. It will compare multiple approaches, estimate performance impact, check for edge-case bugs, and recommend the best engineering approach.',
      action: 'Click below to copy this simulation prompt:',
      samplePrompt: 'Using RealityForge, simulate 3 candidate approaches to add JWT authentication with refresh tokens to our project.',
    },
    {
      num: 4,
      title: '4. Safe Gated Implementation (You Are in Control)',
      subtitle: 'Nothing changes without your explicit "YES"',
      badge: 'Step 4',
      desc: 'Once you choose the approach you like, RealityForge shows you an Implementation Plan listing every exact file it wants to touch. It stops and waits for your confirmation. Only after you approve, it writes the code into a safe, isolated Git branch, runs tests, and reviews its own work.',
      action: 'Click below to copy the approval prompt:',
      samplePrompt: 'I approve Approach 1. Proceed with the Implementation Workflow in Mode B on branch realityforge/feat-jwt-auth.',
    },
  ];

  return (
    <section id="how-to-implement" className="scroll-mt-20">
      <div className="rounded-3xl border border-slate-200 dark:border-[#353750] bg-white dark:bg-[#1D1E2C] p-6 sm:p-10 lg:p-12 shadow-xl shadow-indigo-950/20 relative overflow-hidden">
        {/* Subtle decorative glow with Eclipse Elixir tones */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-[#252637] border border-indigo-200 dark:border-[#353750] text-indigo-600 dark:text-indigo-400 text-xs font-bold font-mono tracking-wide uppercase mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Beginner-Friendly Setup</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How to Implement This Agent in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400">Your Project</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
            Explained in plain, simple words: You don't need to configure complex servers. Think of RealityForge like a senior engineering team packaged inside a single folder. Here is how to add it to your project in 4 simple steps.
          </p>

          {/* Quick GitHub Links Pill */}
          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="text-slate-500 dark:text-slate-400">Official GitHub Repository:</span>
            <a
              href={githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-[#252637] text-white hover:bg-slate-800 dark:hover:bg-[#2E3046] border border-slate-700 dark:border-[#353750] font-mono font-medium transition-colors shadow-sm"
            >
              <Github className="w-3.5 h-3.5 text-indigo-400" />
              <span>Rudra12780/RealityForge-Agent</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* 4 Steps Interactive Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8 relative z-10">
          {steps.map((st) => (
            <button
              key={st.num}
              onClick={() => setActiveStep(st.num)}
              className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all duration-200 relative ${
                activeStep === st.num
                  ? 'border-indigo-500 bg-white dark:bg-[#252637] shadow-md ring-2 ring-indigo-500/20'
                  : 'border-slate-200 dark:border-[#353750] bg-white/70 dark:bg-[#191A27]/80 hover:bg-white dark:hover:bg-[#252637]/80'
              }`}
            >
              <span className={`text-[11px] font-mono font-bold uppercase tracking-wider block ${
                activeStep === st.num ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
              }`}>
                {st.badge}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white block mt-1 line-clamp-2">
                {st.title.replace(/^\d+\.\s*/, '')}
              </span>
            </button>
          ))}
        </div>

        {/* Active Step Detailed Card */}
        {steps.map((st) => {
          if (st.num !== activeStep) return null;
          return (
            <div
              key={st.num}
              className="rounded-2xl border border-slate-200 dark:border-[#353750] bg-white dark:bg-[#252637] p-6 sm:p-8 shadow-sm relative z-10 animate-in fade-in duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-[#353750]/60">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold font-mono">
                      {st.num}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                      {st.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-1 ml-9">
                    {st.subtitle}
                  </p>
                </div>
                <div className="ml-9 md:ml-0 flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20 font-semibold inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Tested & Verified
                  </span>
                </div>
              </div>

              {/* Step Explanation in Simple Words */}
              <div className="py-5 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                <p>{st.desc}</p>
              </div>

              {/* Step 1 Specific: Clone Command and Folder Topology */}
              {st.num === 1 && (
                <div className="space-y-4 pt-2">
                  <div className="p-3 sm:p-4 rounded-xl bg-slate-100 dark:bg-[#151622] border border-slate-200 dark:border-[#353750] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
                    <div className="flex items-start sm:items-center gap-2 min-w-0 text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200">
                      <Terminal className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5 sm:mt-0" />
                      <span className="text-emerald-500 font-bold shrink-0">$</span>
                      <span className="font-semibold break-all sm:break-normal">
                        {cloneCmd}
                        <BlinkingCursor color="bg-emerald-500 dark:bg-emerald-400" size="sm" />
                      </span>
                    </div>
                    <button
                      onClick={copyCloneCmd}
                      type="button"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium font-mono w-full sm:w-auto shrink-0 transition-colors shadow-sm"
                    >
                      {copiedClone ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedClone ? 'Copied' : 'Copy Command'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CodeBlock
                      fileName="Project Directory Structure"
                      language="text"
                      code={`your-project/
├── src/                 # Your app code (untouched)
├── package.json         # (or requirements.txt, go.mod)
└── realityforge_ai/     # <-- Paste folder here
    ├── SKILL.md         # AI skill instructions
    ├── agents/          # 14 specialized agents
    ├── workflows/       # Execution pipelines
    ├── templates/       # 7 report templates
    └── memory/          # Project memory file`}
                      mobileCode={`your-project/
├── src/             # App code
├── package.json     # Config/deps
└── realityforge_ai/ # Paste here
    ├── SKILL.md     # Instructions
    ├── agents/      # 14 agents
    ├── workflows/   # Pipelines
    ├── templates/   # 7 reports
    └── memory/      # Memory`}
                    />

                    <div className="rounded-xl border border-indigo-200 dark:border-[#353750] bg-indigo-50/50 dark:bg-[#151622] p-5 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold text-sm">
                          <HelpCircle className="w-4 h-4 text-indigo-500" />
                          <span>Does it touch or slow down my app?</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          <strong>No!</strong> The <code>realityforge_ai</code> folder contains pure Markdown instructions, agent guidelines, and a clean JSON memory file. It does not install background daemons or run any hidden processes in your production code.
                        </p>
                      </div>

                      <div className="pt-3 border-t border-indigo-200/60 dark:border-[#353750] text-xs font-mono text-slate-600 dark:text-slate-400">
                        Compatible with: React, Node, Python, Django, Go, Java, Rust, PHP, etc.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2, 3, 4: Prompt Previews with Click-to-Copy */}
              {st.samplePrompt && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                      {st.action}
                    </span>
                    {copiedPrompt && (
                      <span className="text-xs text-emerald-400 font-mono font-medium flex items-center gap-1 animate-in fade-in">
                        <Check className="w-3.5 h-3.5" /> Copied to clipboard!
                      </span>
                    )}
                  </div>
                  <div
                    onClick={() => copyPromptText(st.samplePrompt || '')}
                    className="p-3.5 sm:p-4 rounded-xl bg-slate-100 dark:bg-[#151622] text-slate-800 dark:text-slate-100 font-mono text-xs sm:text-sm border border-slate-200 dark:border-[#353750] shadow-sm relative group cursor-pointer hover:border-indigo-500/60 transition-colors"
                    title="Click anywhere to copy prompt"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-3">
                      <div className="flex items-start gap-2 flex-grow min-w-0">
                        <span className="text-emerald-500 dark:text-emerald-400 font-mono font-bold text-sm shrink-0 mt-0.5">&gt;</span>
                        <span className="text-slate-800 dark:text-indigo-100 font-mono text-xs sm:text-sm leading-relaxed break-words">
                          {st.samplePrompt}
                          <BlinkingCursor color="bg-indigo-400 dark:bg-white" />
                        </span>
                      </div>
                      <button
                        type="button"
                        className="px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-[#252637] hover:bg-indigo-100 dark:hover:bg-[#2E3046] text-indigo-600 dark:text-indigo-300 transition-colors w-full sm:w-auto shrink-0 text-xs font-mono flex items-center justify-center gap-1.5 border border-indigo-200/50 dark:border-indigo-500/20"
                      >
                        {copiedPrompt ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedPrompt ? 'Copied' : 'Copy Prompt'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons between steps */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#353750]/60 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">
                  Step {st.num} of 4
                </span>
                <div className="flex items-center gap-2">
                  {st.num > 1 && (
                    <button
                      onClick={() => setActiveStep(st.num - 1)}
                      className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-[#353750] text-xs font-semibold hover:bg-slate-100 dark:hover:bg-[#191A27] transition-colors"
                    >
                      Previous
                    </button>
                  )}
                  {st.num < 4 ? (
                    <button
                      onClick={() => setActiveStep(st.num + 1)}
                      className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Next Step</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <a
                      href={githubRepo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Get the Repo on GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Bottom Banner: GitHub & Author info */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#151622] border border-slate-200 dark:border-[#353750] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-[#252637] text-white flex items-center justify-center flex-shrink-0 border border-slate-700 dark:border-[#353750]">
              <Github className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">
                Open Source Repository & Full Code
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                Maintained by <a href={githubProfile} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-500 hover:underline">Rudra12780</a>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors inline-flex items-center gap-1.5 shadow-sm"
            >
              <Github className="w-3.5 h-3.5" />
              <span>View RealityForge-Agent</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
