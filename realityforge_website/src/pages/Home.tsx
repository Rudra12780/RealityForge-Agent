import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  Database,
  Terminal,
  Compass,
  FileCode2,
  FileCheck,
  CheckCircle,
  AlertTriangle,
  Github,
  Lock,
  Workflow,
  Search,
  Scale,
  Zap,
  BarChart3,
  Bot,
  ExternalLink,
  ChevronRight,
  Code2,
  Eye,
  GitBranch,
  ShieldAlert,
  Server
} from 'lucide-react';
import { TerminalPanel } from '../components/TerminalPanel';
import { FeatureCard } from '../components/FeatureCard';
import { AgentCard, AgentData } from '../components/AgentCard';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';
import { WorkflowStepper } from '../components/WorkflowStepper';
import { Accordion, AccordionItem } from '../components/Accordion';
import { CodeBlock } from '../components/CodeBlock';
import { EasyImplementationGuide } from '../components/EasyImplementationGuide';
import { BlinkingCursor } from '../components/BlinkingCursor';

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const [agentFilter, setAgentFilter] = useState<'all' | 'intelligence' | 'simulation' | 'engineering' | 'decision'>('all');
  const [selectedReport, setSelectedReport] = useState<number | null>(null);

  // 14 Specialized Agents Data
  const agents: AgentData[] = [
    {
      id: 'project_analyst',
      name: t('agents_section.agent_pa_name'),
      role: t('agents_section.agent_pa_role'),
      tier: 'intelligence',
      description: t('agents_section.agent_pa_desc'),
      reads: 'Repository file tree, manifests, configs',
      writes: 'Project Overview in project_memory.json',
    },
    {
      id: 'system_architect',
      name: t('agents_section.agent_sa_name'),
      role: t('agents_section.agent_sa_role'),
      tier: 'intelligence',
      description: t('agents_section.agent_sa_desc'),
      reads: 'Project Overview & module topology',
      writes: 'Architecture Analysis & redesign options',
    },
    {
      id: 'dependency_analyst',
      name: t('agents_section.agent_da_name'),
      role: t('agents_section.agent_da_role'),
      tier: 'intelligence',
      description: t('agents_section.agent_da_desc'),
      reads: 'package.json, pom.xml, requirements.txt',
      writes: 'Dependency DAG & version collision audits',
    },
    {
      id: 'code_intelligence',
      name: t('agents_section.agent_ci_name'),
      role: t('agents_section.agent_ci_role'),
      tier: 'intelligence',
      description: t('agents_section.agent_ci_desc'),
      reads: 'Source ASTs, function interfaces',
      writes: 'Cyclomatic complexity & hotspot alerts',
    },
    {
      id: 'scenario_simulator',
      name: t('agents_section.agent_ss_name'),
      role: t('agents_section.agent_ss_role'),
      tier: 'simulation',
      description: t('agents_section.agent_ss_desc'),
      reads: 'Requested change + architectural baseline',
      writes: 'Candidate approaches & trade-off metrics',
    },
    {
      id: 'future_impact',
      name: t('agents_section.agent_fi_name'),
      role: t('agents_section.agent_fi_role'),
      tier: 'simulation',
      description: t('agents_section.agent_fi_desc'),
      reads: 'Candidate implementations & traffic forecasts',
      writes: '2-year tech debt & scaling projections',
    },
    {
      id: 'failure_prediction',
      name: t('agents_section.agent_fp_name'),
      role: t('agents_section.agent_fp_role'),
      tier: 'simulation',
      description: t('agents_section.agent_fp_desc'),
      reads: 'Static analysis graphs + error patterns',
      writes: 'Race conditions & null-pointer warnings',
    },
    {
      id: 'performance_simulator',
      name: t('agents_section.agent_ps_name'),
      role: t('agents_section.agent_ps_role'),
      tier: 'simulation',
      description: t('agents_section.agent_ps_desc'),
      reads: 'Algorithmic complexity & I/O access patterns',
      writes: 'Latency estimations & CPU/memory models',
    },
    {
      id: 'decision_intelligence',
      name: t('agents_section.agent_di_name'),
      role: t('agents_section.agent_di_role'),
      tier: 'decision',
      description: t('agents_section.agent_di_desc'),
      reads: 'Reports from all simulation & risk agents',
      writes: 'Implementation Plan & rationale verdict',
    },
    {
      id: 'developer',
      name: t('agents_section.agent_dev_name'),
      role: t('agents_section.agent_dev_role'),
      tier: 'engineering',
      description: t('agents_section.agent_dev_desc'),
      reads: 'Approved Implementation Plan',
      writes: 'Isolated Git branch with targeted commits',
    },
    {
      id: 'testing',
      name: t('agents_section.agent_test_name'),
      role: t('agents_section.agent_test_role'),
      tier: 'engineering',
      description: t('agents_section.agent_test_desc'),
      reads: 'Modified files & existing test suite',
      writes: 'Test Execution Report & coverage metrics',
    },
    {
      id: 'security',
      name: t('agents_section.agent_sec_name'),
      role: t('agents_section.agent_sec_role'),
      tier: 'engineering',
      description: t('agents_section.agent_sec_desc'),
      reads: 'Diff files, imports, third-party libraries',
      writes: 'OWASP vulnerability & secret audit report',
    },
    {
      id: 'performance_engineer',
      name: t('agents_section.agent_pe_name'),
      role: t('agents_section.agent_pe_role'),
      tier: 'engineering',
      description: t('agents_section.agent_pe_desc'),
      reads: 'Test execution metrics & profiler traces',
      writes: 'Actionable micro-optimizations & caching',
    },
    {
      id: 'code_reviewer',
      name: t('agents_section.agent_cr_name'),
      role: t('agents_section.agent_cr_role'),
      tier: 'engineering',
      description: t('agents_section.agent_cr_desc'),
      reads: 'Diff vs Implementation Plan specifications',
      writes: 'Final code review verdict & sign-off',
    },
  ];

  const filteredAgents =
    agentFilter === 'all' ? agents : agents.filter((a) => a.tier === agentFilter);

  // 9 Lifecycle phases
  const phases = [
    { num: '01', key: 'step_discover', icon: Search },
    { num: '02', key: 'step_understand', icon: Compass },
    { num: '03', key: 'step_analyze', icon: BarChart3 },
    { num: '04', key: 'step_simulate', icon: Sparkles },
    { num: '05', key: 'step_evaluate', icon: ShieldCheck },
    { num: '06', key: 'step_decide', icon: Scale },
    { num: '07', key: 'step_implement', icon: GitBranch },
    { num: '08', key: 'step_verify', icon: FileCheck },
    { num: '09', key: 'step_learn', icon: Database },
  ];

  // 7 Reports data
  const reports = [
    {
      id: 'architecture_report',
      title: t('reports.r1_title'),
      desc: t('reports.r1_desc'),
      agent: 'System Architect',
      file: 'templates/architecture_report.md',
    },
    {
      id: 'dependency_report',
      title: t('reports.r2_title'),
      desc: t('reports.r2_desc'),
      agent: 'Dependency Analyst',
      file: 'templates/dependency_report.md',
    },
    {
      id: 'simulation_comparison',
      title: t('reports.r3_title'),
      desc: t('reports.r3_desc'),
      agent: 'Scenario Simulator',
      file: 'templates/simulation_comparison.md',
    },
    {
      id: 'risk_assessment',
      title: t('reports.r4_title'),
      desc: t('reports.r4_desc'),
      agent: 'Failure Prediction & Security',
      file: 'templates/risk_assessment.md',
    },
    {
      id: 'performance_report',
      title: t('reports.r5_title'),
      desc: t('reports.r5_desc'),
      agent: 'Performance Simulator',
      file: 'templates/performance_report.md',
    },
    {
      id: 'implementation_plan',
      title: t('reports.r6_title'),
      desc: t('reports.r6_desc'),
      agent: 'Decision Intelligence',
      file: 'templates/implementation_plan.md',
    },
    {
      id: 'verification_report',
      title: t('reports.r7_title'),
      desc: t('reports.r7_desc'),
      agent: 'Testing & Code Reviewer',
      file: 'templates/verification_report.md',
    },
  ];

  // FAQ Items
  const faqItems: AccordionItem[] = [
    { id: 'faq-1', question: t('faq.q1'), answer: t('faq.a1') },
    { id: 'faq-2', question: t('faq.q2'), answer: t('faq.a2') },
    { id: 'faq-3', question: t('faq.q3'), answer: t('faq.a3') },
    { id: 'faq-4', question: t('faq.q4'), answer: t('faq.a4') },
    { id: 'faq-5', question: t('faq.q5'), answer: t('faq.a5') },
  ];

  // Universal Stacks
  const techStacks = [
    { name: 'React', category: 'Frontend' },
    { name: 'Vue / Nuxt', category: 'Frontend' },
    { name: 'Angular', category: 'Frontend' },
    { name: 'Node.js / Express', category: 'Backend' },
    { name: 'Python / Django', category: 'Backend' },
    { name: 'FastAPI / Flask', category: 'Backend' },
    { name: 'Java / Spring', category: 'Backend' },
    { name: 'Go (Golang)', category: 'Systems' },
    { name: 'Rust', category: 'Systems' },
    { name: 'PostgreSQL / MySQL', category: 'Database' },
    { name: 'MongoDB / Redis', category: 'Database' },
    { name: 'Docker / K8s', category: 'DevOps' },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping inline-block" />
              <span>{t('hero.tag')}</span>
              <span className="text-slate-300 dark:text-[#353750]">|</span>
              <span className="text-slate-600 dark:text-slate-300 font-semibold">{t('nav.badge')}</span>
            </div>

            {/* Editorial Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.08]">
              {t('hero.title_part1')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400">
                {t('hero.title_part2')}
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>

            {/* Quick Stats Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 sm:pt-6 max-w-3xl mx-auto text-left">
              {[
                { label: t('hero.stat_agents'), sub: 'Collaborative Team', icon: Bot },
                { label: t('hero.stat_phases'), sub: 'Lifecycle Pipeline', icon: Workflow },
                { label: t('hero.stat_mode'), sub: 'Gated Verification', icon: ShieldCheck },
                { label: t('hero.stat_stack'), sub: 'Any Framework / Language', icon: Server },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200/80 dark:border-[#353750] bg-white/70 dark:bg-[#252637] p-3.5 sm:p-4 backdrop-blur-sm shadow-sm"
                >
                  <stat.icon className="w-4 h-4 text-indigo-500 mb-1" />
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-mono">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Embedded Terminal Simulation Panel */}
          <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
            <TerminalPanel />
          </div>
        </div>
      </section>

      {/* 2. HOW TO IMPLEMENT IN YOUR PROJECT (BEGINNER-FRIENDLY PLAIN ENGLISH GUIDE) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EasyImplementationGuide />
      </div>

      {/* 3. ABOUT & THE 9-PHASE LIFECYCLE */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900/50">
            {t('about.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            {t('about.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            {t('about.description')}
          </p>
        </div>

        {/* 9-Phase Directed Flow */}
        <div className="rounded-3xl border border-slate-200 dark:border-[#353750] bg-white dark:bg-[#252637] p-6 sm:p-10 shadow-sm">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-[#353750]/70">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {t('about.cycle_title')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                DISCOVER → UNDERSTAND → ANALYZE → SIMULATE → EVALUATE → DECIDE → IMPLEMENT → VERIFY → LEARN
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Deterministic
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {phases.map((p) => {
              const PhaseIcon = p.icon;
              return (
                <div
                  key={p.num}
                  className="rounded-2xl border border-slate-200/90 dark:border-[#353750] bg-slate-50/50 dark:bg-[#1D1E2C] p-5 hover:border-indigo-500/40 transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      PHASE {p.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-[#252637] flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                      <PhaseIcon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                    {t(`about.${p.key}`)}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t(`about.${p.key}_desc`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CORE FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900/50">
            {t('features.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            {t('features.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            {t('features.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Compass}
            title={t('features.f1_title')}
            description={t('features.f1_desc')}
            tag="Universal Stack"
          />
          <FeatureCard
            icon={Sparkles}
            title={t('features.f2_title')}
            description={t('features.f2_desc')}
            tag="Simulation Engine"
          />
          <FeatureCard
            icon={ShieldCheck}
            title={t('features.f3_title')}
            description={t('features.f3_desc')}
            tag="Dual-Mode Gate"
          />
          <FeatureCard
            icon={Database}
            title={t('features.f4_title')}
            description={t('features.f4_desc')}
            tag="Project Memory"
          />
          <FeatureCard
            icon={Lock}
            title={t('features.f5_title')}
            description={t('features.f5_desc')}
            tag="Zero-Destruction"
          />
          <FeatureCard
            icon={FileCheck}
            title={t('features.f6_title')}
            description={t('features.f6_desc')}
            tag="Regression Suite"
          />
        </div>
      </section>

      {/* 4. MULTI-AGENT ARCHITECTURE DIAGRAM */}
      <section id="architecture" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900/50">
            {t('architecture.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            {t('architecture.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            {t('architecture.description')}
          </p>
        </div>

        <ArchitectureDiagram />
      </section>

      {/* 5. INDIVIDUAL AI AGENTS ROSTER (ALL 14 AGENTS) */}
      <section id="agents" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900/50">
              {t('agents_section.tag')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
              {t('agents_section.title')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">
              {t('agents_section.description')}
            </p>
          </div>

          {/* Filter Pills with Counts */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-[#151622] border border-slate-200 dark:border-[#353750]">
            {[
              { id: 'all', label: 'All Agents', count: 14 },
              { id: 'intelligence', label: 'Intelligence', count: 4 },
              { id: 'simulation', label: 'Simulation', count: 4 },
              { id: 'engineering', label: 'Engineering', count: 5 },
              { id: 'decision', label: 'Decision', count: 1 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setAgentFilter(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  agentFilter === tab.id
                    ? 'bg-white dark:bg-[#252637] text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-[#353750]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-slate-200/60 dark:bg-[#1D1E2C] text-slate-500 dark:text-slate-400">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>

      {/* 6. WORKFLOW ARCHITECTURE & PIPELINES */}
      <section id="workflows" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900/50">
            {t('workflows.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            {t('workflows.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            {t('workflows.description')}
          </p>
        </div>

        <WorkflowStepper />
      </section>

      {/* 7. HOW REALITYFORGE WORKS */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900/50">
            {t('how_it_works.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            {t('how_it_works.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            {t('how_it_works.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 4 How it works cards */}
          {[
            {
              step: '1',
              title: t('how_it_works.step1_title'),
              desc: t('how_it_works.step1_desc'),
              badge: 'Mode A: Read-Only',
            },
            {
              step: '2',
              title: t('how_it_works.step2_title'),
              desc: t('how_it_works.step2_desc'),
              badge: 'Simulated Trade-offs',
            },
            {
              step: '3',
              title: t('how_it_works.step3_title'),
              desc: t('how_it_works.step3_desc'),
              badge: 'Human Authorization Gate',
            },
            {
              step: '4',
              title: t('how_it_works.step4_title'),
              desc: t('how_it_works.step4_desc'),
              badge: 'Isolated Branch & Regressions',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl border border-slate-200 dark:border-[#353750] bg-white dark:bg-[#252637] p-6 flex flex-col justify-between hover:border-indigo-500/40 transition-all shadow-sm"
            >
              <div>
                <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono mb-3 block">
                  0{item.step}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>
              <span className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-[#1D1E2C] text-slate-600 dark:text-slate-300 inline-block self-start border border-slate-200 dark:border-[#353750]">
                {item.badge}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. INSTALLATION & SETUP */}
      <section id="install" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 dark:border-[#353750] bg-white dark:bg-[#1D1E2C] text-slate-900 dark:text-slate-100 p-6 sm:p-12 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-[#252637] px-3 py-1 rounded-full border border-indigo-200 dark:border-[#353750]">
                {t('install.tag')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                {t('install.title')}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('install.description')}
              </p>

              <div className="space-y-3 pt-2">
                {[
                  t('install.step1'),
                  t('install.step2'),
                  t('install.step3'),
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <CodeBlock
                fileName="Directory Structure"
                language="tree"
                code={`c:/Users/ADMIN/Desktop/RealityForge/realityforge_ai/
├── SKILL.md                  # Main Skill Entrypoint
├── agents/                   # 14 Specialized Agent Instructions
│   ├── project_analyst.md
│   ├── system_architect.md
│   ├── dependency_analyst.md
│   ├── code_intelligence.md
│   ├── scenario_simulator.md
│   ├── future_impact.md
│   ├── failure_prediction.md
│   ├── performance_simulator.md
│   ├── developer.md
│   ├── testing.md
│   ├── security.md
│   ├── performance_engineer.md
│   ├── code_reviewer.md
│   └── decision_intelligence.md
├── workflows/                # Orchestrated Pipelines
│   ├── discovery_workflow.md
│   ├── simulation_workflow.md
│   ├── decision_workflow.md
│   ├── implementation_workflow.md
│   └── learn_workflow.md
├── templates/                # 7 Engineering Reports
│   ├── architecture_report.md
│   ├── dependency_report.md
│   ├── simulation_comparison.md
│   ├── risk_assessment.md
│   ├── performance_report.md
│   ├── implementation_plan.md
│   └── verification_report.md
└── memory/
    └── project_memory.json   # Persistent Knowledge Base`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. USAGE EXAMPLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900/50">
            Interactive Examples
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            Practical Execution Commands
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3">
            Copy and run these commands directly within your development workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Mode A: Discovery & Architecture Scan
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Performs non-invasive stack discovery, parses dependencies, and builds project memory. Zero code changes.
            </p>
            <CodeBlock
              fileName="run_discovery.sh"
              language="bash"
              code={`# 1. Trigger Discovery Workflow in Analysis Mode
realityforge discover \\
  --target ./my-app \\
  --mode A \\
  --report architecture_report.md

# 2. Check generated persistent memory
cat ./realityforge_ai/memory/project_memory.json`}
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Mode B: Gated Implementation Workflow
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Simulates candidate approaches, creates human approval checkpoint, and implements on isolated branch.
            </p>
            <CodeBlock
              fileName="run_engineering.sh"
              language="bash"
              code={`# 1. Simulate and generate Implementation Plan
realityforge simulate \\
  --change "Refactor session store to Redis" \\
  --scenarios 3

# 2. Implement approved plan with gated confirmation
realityforge implement \\
  --plan ./realityforge_ai/templates/implementation_plan.md \\
  --confirm-approval`}
            />
          </div>
        </div>
      </section>

      {/* 10. TECHNOLOGY STACK COMPATIBILITY */}
      <section id="stack" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 dark:border-[#353750] bg-white dark:bg-[#252637] p-8 sm:p-12 shadow-sm text-center">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-[#1D1E2C] px-3 py-1 rounded-full border border-indigo-200 dark:border-[#353750]">
            Universal Ecosystem
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-3">
            Zero-Assumption Stack Discovery
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-2 mb-8 leading-relaxed">
            RealityForge never guesses or forces a tech stack. It introspects repository manifests, compilers, and configs dynamically across modern technologies.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {techStacks.map((st, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-[#353750] bg-slate-50/60 dark:bg-[#1D1E2C] text-left hover:border-indigo-500/50 transition-colors shadow-sm"
              >
                <span className="text-[10px] font-mono text-indigo-500 dark:text-indigo-400 block font-medium">
                  {st.category}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 block mt-0.5">
                  {st.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. SAFETY & APPROVAL GATES */}
      <section id="safety" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-900/50">
            {t('safety.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            {t('safety.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            {t('safety.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mode A: Analysis Mode */}
          <div className="rounded-2xl border border-emerald-500/30 dark:border-[#353750] bg-emerald-50/20 dark:bg-[#252637] p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  {t('safety.mode_a_badge')}
                </span>
                <Eye className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {t('safety.mode_a_title')}
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{t('safety.mode_a_p1')}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{t('safety.mode_a_p2')}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{t('safety.mode_a_p3')}</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-500/20 dark:border-[#353750] text-xs font-mono text-emerald-700 dark:text-emerald-400">
              Invoked via: <code className="inline-flex items-center">realityforge discover --mode A <BlinkingCursor color="bg-emerald-500 dark:bg-emerald-400" size="sm" /></code>
            </div>
          </div>

          {/* Mode B: Engineering Mode */}
          <div className="rounded-2xl border border-amber-500/30 dark:border-[#353750] bg-amber-50/20 dark:bg-[#252637] p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  {t('safety.mode_b_badge')}
                </span>
                <Lock className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {t('safety.mode_b_title')}
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>{t('safety.mode_b_p1')}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>{t('safety.mode_b_p2')}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>{t('safety.mode_b_p3')}</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-amber-500/20 dark:border-[#353750] text-xs font-mono text-amber-700 dark:text-amber-400">
              Invoked via: <code className="inline-flex items-center">realityforge implement --mode B --gated <BlinkingCursor color="bg-amber-500 dark:bg-amber-400" size="sm" /></code>
            </div>
          </div>
        </div>
      </section>

      {/* 12. 7 PDF REPORTING SYSTEM */}
      <section id="reports" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900/50">
            {t('reports.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            {t('reports.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            {t('reports.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reports.map((rep, idx) => (
            <div
              key={rep.id}
              className="rounded-2xl border border-slate-200 dark:border-[#353750] bg-white dark:bg-[#252637] p-6 flex flex-col justify-between hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-[#1D1E2C] text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-[#353750]">
                    REPORT 0{idx + 1}
                  </span>
                  <span className="text-xs font-mono text-slate-400 dark:text-[#8E90A6]">
                    {rep.agent}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {rep.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {rep.desc}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-[#353750]/60 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-[#8E90A6]">
                <span className="truncate max-w-[190px]">{rep.file}</span>
                <span className="text-indigo-500 font-semibold">Standard</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 13. FAQ SECTION */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-[#252637] px-3 py-1 rounded-full border border-indigo-200 dark:border-[#353750]">
            {t('faq.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            {t('faq.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
            {t('faq.description')}
          </p>
        </div>

        <Accordion items={faqItems} />
      </section>

      {/* 14. GITHUB CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 dark:border-[#353750] bg-gradient-to-r from-indigo-500/5 via-blue-500/5 to-indigo-500/5 dark:from-[#252637] dark:via-[#1D1E2C] dark:to-[#252637] p-8 sm:p-12 text-center relative overflow-hidden shadow-sm">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/25">
              <Github className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Open Source Multi-Agent Skill
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              RealityForge is maintained by <a href="https://github.com/Rudra12780" target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-500 hover:underline">@Rudra12780</a>. Designed for Google Antigravity and compatible agent environments. Clone the skill repo, drop it in your workspace, and transform how your AI reasons about software architecture.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://github.com/Rudra12780/RealityForge-Agent"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-[#1D1E2C] text-white dark:text-white border border-slate-700 dark:border-[#353750] font-bold text-xs sm:text-sm hover:bg-slate-800 dark:hover:bg-[#2F3146] transition-all inline-flex items-center gap-2 font-mono shadow-sm"
              >
                <Github className="w-4 h-4 text-indigo-400" />
                <span>Rudra12780/RealityForge-Agent</span>
              </a>
              <a
                href="https://github.com/Rudra12780"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl border border-slate-300 dark:border-[#353750] bg-white/70 dark:bg-[#252637] text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-[#2E3046] transition-colors inline-flex items-center gap-1.5"
              >
                <span>View Author Profile</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
