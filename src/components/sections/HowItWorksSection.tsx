import React, { useState } from 'react';
import { solutionModules } from '../../data/cybergenixData';
import { ChamferCard } from '../common/ChamferCard';
import {
  Cpu,
  GitBranch,
  Eye,
  HeartHandshake,
  Layers,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<number>(1);

  // Icon mapping for the 6 NIVA solution modules
  const getModuleIcon = (id: number) => {
    switch (id) {
      case 1:
        return <Cpu className="w-5 h-5 text-cyber-primary" />;
      case 2:
        return <GitBranch className="w-5 h-5 text-cyber-cyan" />;
      case 3:
        return <Eye className="w-5 h-5 text-purple-400" />;
      case 4:
        return <HeartHandshake className="w-5 h-5 text-pink-400" />;
      case 5:
        return <Layers className="w-5 h-5 text-amber-400" />;
      case 6:
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyber-primary" />;
    }
  };

  // 3-Step architecture grouping the 6 modules
  const steps = [
    {
      stepNum: '01',
      title: 'Core LLM & Multilingual Perception',
      subtitle: 'Modules 1 & 3: Foundation Reasoning + Voice/Vision',
      description:
        'Open-source foundation models power intelligent reasoning, complemented by real-time multilingual speech-to-text, visual understanding, and context extraction across desktop and embedded robotics.',
      modules: [solutionModules[0], solutionModules[2]],
      highlight: 'Sovereign Foundation Models',
    },
    {
      stepNum: '02',
      title: 'Self-Learning Engine & Domain Modules',
      subtitle: 'Modules 2 & 4: Continuous Learning + Emotional Intelligence',
      description:
        'Decentralized continuous learning engine that adapts to user habits and organizational workflows without retraining host models, enriched with emotion-detection and mental wellness intelligence.',
      modules: [solutionModules[1], solutionModules[3]],
      highlight: 'Habit-Based Adaptation (99.4%)',
    },
    {
      stepNum: '03',
      title: 'Zero-Knowledge Security & AI Agent Maker',
      subtitle: 'Modules 5 & 6: Low-Code Studio + Cryptographic Enclaves',
      description:
        'End-to-end encrypted, zero-knowledge architecture ensuring absolute data sovereignty, paired with an intuitive low-code / no-code builder to deploy custom autonomous domain agents in minutes.',
      modules: [solutionModules[4], solutionModules[5]],
      highlight: 'FIPS 140-3 Cryptographic Isolation',
    },
  ];

  return (
    <section
      id="how-it-works"
      data-howitworks=""
      className="HowItWorksSection relative py-28 md:py-36 border-y border-white/[0.08] bg-cyber-surface-0 px-4 sm:px-6 overflow-hidden"
    >
      {/* Cosmic Singularity / Black Hole Visual Motif Backdrop */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-30 overflow-hidden"
        aria-hidden="true"
      >
        {/* Core singularity radial glowing aura */}
        <div className="relative w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full bg-[radial-gradient(circle,rgba(248,92,58,0.25)_0%,rgba(90,102,238,0.15)_40%,transparent_70%)] blur-3xl animate-pulse" />

        {/* Orbiting cosmic event horizon rings */}
        <svg
          className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] text-white/10"
          viewBox="0 0 900 900"
          fill="none"
        >
          <ellipse
            cx="450"
            cy="450"
            rx="400"
            ry="180"
            stroke="rgba(248, 92, 58, 0.2)"
            strokeWidth="1.5"
            strokeDasharray="8 8"
            transform="rotate(-25 450 450)"
          />
          <ellipse
            cx="450"
            cy="450"
            rx="320"
            ry="130"
            stroke="rgba(90, 102, 238, 0.25)"
            strokeWidth="1.2"
            transform="rotate(15 450 450)"
          />
          <ellipse
            cx="450"
            cy="450"
            rx="220"
            ry="90"
            stroke="rgba(0, 240, 255, 0.2)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            transform="rotate(-10 450 450)"
          />
          {/* Gravitational center singularity */}
          <circle cx="450" cy="450" r="40" fill="#000000" stroke="#f85c3a" strokeWidth="2" />
          <circle cx="450" cy="450" r="12" fill="#f85c3a" className="animate-ping" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mb-16 md:mb-20">
          <div className="Caption inline-flex items-center gap-2 mb-3">
            <span className="decoration">/ </span>
            <span>The Solution — NIVA / CyGenix AI</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.05]">
            A revolutionary neural ecosystem designed to{' '}
            <strong className="text-cyber-primary font-inherit">
              transcend traditional AI.
            </strong>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-cyber-text-secondary font-mono leading-relaxed max-w-3xl">
            NIVA is an integrated multi-tier AI architecture merging open-source reasoning models with decentralized
            continuous learning, voice-vision perception, and zero-knowledge privacy.
          </p>
        </div>

        {/* 3-Step Architecture Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, idx) => (
            <article key={step.stepNum} className="step relative">
              <ChamferCard
                chamfer="lg"
                surface="glass"
                glow={idx === 2 ? 'orange' : idx === 0 ? 'indigo' : false}
                className="p-8 h-full flex flex-col justify-between group border-white/[0.12] hover:border-cyber-primary/60 transition-all duration-300"
              >
                <div>
                  {/* Step Header with Chamfered Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="step__num w-10 h-10 clip-chamfer-sm bg-cyber-primary text-white flex items-center justify-center font-mono font-bold text-sm shadow-glow-primary">
                      {step.stepNum}
                    </span>
                    <span className="text-[1.0rem] font-mono text-cyber-primary uppercase tracking-wider border border-cyber-primary/30 px-2 py-0.5 rounded bg-cyber-primary/10">
                      {step.highlight}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-semibold text-white mb-2 group-hover:text-cyber-primary transition-colors">
                    {step.title}
                  </h3>

                  <div className="text-xs font-mono text-cyber-text-muted mb-4">
                    {step.subtitle}
                  </div>

                  <p className="text-sm font-mono text-cyber-text-secondary leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Nested module tags */}
                  <div className="space-y-2 pt-4 border-t border-white/[0.08]">
                    {step.modules.map((mod) => (
                      <div
                        key={`step-mod-${mod.id}`}
                        className="flex items-center gap-2.5 p-2 rounded-lg bg-black/40 border border-white/[0.06] text-xs font-mono"
                      >
                        {getModuleIcon(mod.id)}
                        <span className="font-medium text-white">{mod.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-cyber-text-muted group-hover:text-white transition-colors">
                  <span>Architecture Phase {step.stepNum}</span>
                  <ArrowRight className="w-4 h-4 text-cyber-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </ChamferCard>
            </article>
          ))}
        </div>

        {/* Complete 6-Component NIVA Interactive Matrix */}
        <div className="mt-16 pt-12 border-t border-white/[0.08]">
          <div className="text-center mb-10">
            <div className="Caption -center inline-flex items-center gap-2 mb-2">
              <span className="decoration">/ </span>
              <span>All 6 Foundation Modules</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white">
              The Six Neural Pillars of NIVA
            </h3>
            <p className="mt-2 text-xs sm:text-sm font-mono text-cyber-text-secondary">
              Click any module to inspect sovereign specifications and architectural role.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutionModules.map((mod) => {
              const isSelected = selectedModule === mod.id;
              return (
                <div
                  key={mod.id}
                  onClick={() => setSelectedModule(mod.id)}
                  className="cursor-pointer"
                >
                  <ChamferCard
                    chamfer="md"
                    surface={isSelected ? 'surface-2' : 'glass'}
                    glow={isSelected ? 'orange' : false}
                    className={`p-7 transition-all duration-300 ${
                      isSelected
                        ? 'border-cyber-primary shadow-glow-primary scale-[1.02]'
                        : 'border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center font-mono font-bold text-xs text-cyber-primary">
                          0{mod.id}
                        </span>
                        <div className="p-2 rounded-lg bg-white/[0.04]">
                          {getModuleIcon(mod.id)}
                        </div>
                      </div>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-full bg-cyber-primary/20 border border-cyber-primary/40 text-cyber-primary text-[1.0rem] font-mono">
                          ACTIVE SPEC
                        </span>
                      )}
                    </div>

                    <h4 className="font-display text-xl font-semibold text-white mb-2">
                      {mod.title}
                    </h4>

                    <p className="text-sm text-cyber-text-secondary font-mono leading-relaxed mb-4">
                      {mod.description}
                    </p>

                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-cyber-text-muted">
                      <span>Status: Verifiable</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  </ChamferCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
