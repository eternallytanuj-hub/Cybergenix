import React from 'react';
import { ChamferCard } from '../common/ChamferCard';
import {
  Cpu,
  ShieldCheck,
  Microscope,
  Globe2,
  ArrowRight,
} from 'lucide-react';

export const WhatChangedSection: React.FC = () => {
  return (
    <section
      id="who-we-are"
      data-whatchanged=""
      className="WhatChangedSection relative py-28 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background ambient glowing accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-cyber-primary/10 via-cyber-indigo/10 to-transparent blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-4xl mb-16 relative z-10">
        <div className="Caption inline-flex items-center gap-2 mb-3">
          <span className="decoration">/ </span>
          <span>Who We Are</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.05]">
          Redefining AI, from the inside out —{' '}
          <strong className="text-cyber-primary font-inherit">
            where intelligence meets absolute security.
          </strong>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-cyber-text-secondary font-mono leading-relaxed max-w-3xl">
          Pioneering the future of autonomous AI systems — blending machine learning with cybersecurity.
          Self-learning, privacy-preserving, and built on decentralized zero-knowledge architecture.
        </p>
      </div>

      {/* Dual Chamfered Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {/* Card 1: /01 Autonomous Systems & /03 Research-Driven */}
        <article className="card">
          <ChamferCard
            chamfer="lg"
            surface="glass"
            glow="orange"
            className="p-8 sm:p-10 h-full flex flex-col justify-between group border-white/[0.12] hover:border-cyber-primary/60 transition-all duration-500"
          >
            <div>
              {/* Pillar Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-xs font-mono font-bold text-cyber-primary border border-cyber-primary/40 px-3 py-1 rounded bg-cyber-primary/10 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  /01 Autonomous AI Systems
                </span>
                <span className="text-xs font-mono font-bold text-purple-400 border border-purple-400/30 px-3 py-1 rounded bg-purple-400/10 flex items-center gap-1.5">
                  <Microscope className="w-3.5 h-3.5" />
                  /03 Research-Driven
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-4 group-hover:text-cyber-primary transition-colors">
                Self-Evolving Cognitive Architecture
              </h3>

              <div className="space-y-4 font-mono text-sm text-cyber-text-secondary leading-relaxed">
                <p>
                  <strong className="text-white font-medium">Autonomous Execution:</strong> Intelligent systems that learn,
                  adapt, and evolve without constant human intervention. From OS-level assistant automation to physical robotics,
                  NIVA executes complex workflows end-to-end.
                </p>
                <p>
                  <strong className="text-white font-medium">Applied ML Research:</strong> Powered by cutting-edge machine learning
                  and deep-learning research incubated with premier institutions like IIT Ropar, Galgotias, and the NVIDIA Inception Program.
                </p>
              </div>

              {/* Technical Specifications Matrix */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06]">
                  <div className="text-cyber-text-muted mb-1">AUTONOMY TIER</div>
                  <div className="text-base font-bold font-display text-white">Level 4 Agentic</div>
                  <div className="text-[1.0rem] text-cyber-primary mt-0.5">Continuous Self-Tuning</div>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06]">
                  <div className="text-cyber-text-muted mb-1">RESEARCH VALIDATION</div>
                  <div className="text-base font-bold font-display text-purple-400">Tier-1 Incubators</div>
                  <div className="text-[1.0rem] text-cyber-text-secondary mt-0.5">AWaDH • GIC RISE</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-cyber-text-muted group-hover:text-white transition-colors">
              <span>Next-Gen Machine Intelligence</span>
              <ArrowRight className="w-4 h-4 text-cyber-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </ChamferCard>
        </article>

        {/* Card 2: /02 Secure Architecture & /04 Industry-Agnostic */}
        <article className="card">
          <ChamferCard
            chamfer="lg"
            surface="glass"
            glow="indigo"
            className="p-8 sm:p-10 h-full flex flex-col justify-between group border-white/[0.12] hover:border-cyber-cyan/60 transition-all duration-500"
          >
            <div>
              {/* Pillar Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-xs font-mono font-bold text-cyber-cyan border border-cyber-cyan/40 px-3 py-1 rounded bg-cyber-cyan/10 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  /02 Secure Architecture
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 border border-emerald-400/30 px-3 py-1 rounded bg-emerald-400/10 flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5" />
                  /04 Industry-Agnostic
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-4 group-hover:text-cyber-cyan transition-colors">
                Universal Zero-Knowledge Sovereignty
              </h3>

              <div className="space-y-4 font-mono text-sm text-cyber-text-secondary leading-relaxed">
                <p>
                  <strong className="text-white font-medium">Privacy-First Foundation:</strong> Decentralized infrastructure
                  where data never leaves user control. Enforces client-side cryptographic key generation, verifiable zero-knowledge proofs,
                  and air-gapped container isolation.
                </p>
                <p>
                  <strong className="text-white font-medium">Cross-Sector Scalability:</strong> Engineered to transform operational
                  efficiency across healthcare, defense, manufacturing, banking, and government sectors with zero lock-in.
                </p>
              </div>

              {/* Technical Specifications Matrix */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06]">
                  <div className="text-cyber-text-muted mb-1">DATA SOVEREIGNTY</div>
                  <div className="text-base font-bold font-display text-emerald-400">100% On-Prem / Local</div>
                  <div className="text-[1.0rem] text-cyber-text-secondary mt-0.5">Zero Cloud Telemetry</div>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06]">
                  <div className="text-cyber-text-muted mb-1">ENTERPRISE ADOPTION</div>
                  <div className="text-base font-bold font-display text-cyber-cyan">Universal API</div>
                  <div className="text-[1.0rem] text-cyber-text-secondary mt-0.5">200+ Integrations</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-cyber-text-muted group-hover:text-white transition-colors">
              <span>Enterprise Sovereignty Stack</span>
              <ArrowRight className="w-4 h-4 text-cyber-cyan group-hover:translate-x-1 transition-transform" />
            </div>
          </ChamferCard>
        </article>
      </div>
    </section>
  );
};

export default WhatChangedSection;
