import React, { useRef, useEffect, useState } from 'react';
import { CtaButton } from '../common/CtaButton';
import { SplitText } from '../common/SplitText';
import { NeuralCanvas } from '../visual/NeuralCanvas';
import { companyInfo } from '../../data/cybergenixData';
import { gsap } from '../../utils/gsapConfig';
import {
  ArrowUpRight,
  Shield,
  Activity,
  Cpu,
  Lock,
  Terminal as TerminalIcon,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const topBlockRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'terminal' | 'telemetry'>('terminal');

  // Hero scrubbed fade-out on scroll towards showcase
  useEffect(() => {
    if (!sectionRef.current || !topBlockRef.current) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Fade out top block as user scrolls down towards the demo / showcase
      gsap.fromTo(
        topBlockRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -40,
          ease: 'power1.in',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'center top',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-section="hero"
      className="HeroSection relative min-h-screen pt-32 md:pt-40 pb-20 md:pb-32 overflow-hidden flex flex-col justify-between"
    >
      {/* Background Interactive Neural Canvas Ribbon */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
        <NeuralCanvas nodeCount={38} ribbonCount={3} />
        {/* Subtle radial vignette gradient to blend bottom into next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black pointer-events-none" />
      </div>

      {/* Top Block: Typography, Tagline & CTAs */}
      <div
        ref={topBlockRef}
        className="top relative z-10 max-w-7xl mx-auto px-6 w-full text-center md:text-left will-change-transform"
      >
        {/* Caption Badge */}
        <div className="Caption inline-flex items-center gap-2 mb-4">
          <span className="decoration">/ </span>
          <span>Autonomous Systems</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 ml-3 px-2.5 py-0.5 text-[1.1rem] font-mono tracking-widest text-cyber-primary border border-cyber-primary/30 rounded-full bg-cyber-primary/10">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-primary animate-pulse" />
            NIVA CORE v3.4
          </span>
        </div>

        {/* H1 Main Headline with SplitText stagger reveal */}
        <div className="header mt-2 max-w-5xl">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.0] tracking-tight text-white text-balance">
            <SplitText
              as="span"
              type="chars"
              highlightWords={['engineered', 'secure.']}
              highlightClassName="text-cyber-primary font-inherit"
              stagger={0.35}
            >
              Human-first AI, engineered secure.
            </SplitText>
          </h1>
        </div>

        {/* Description Lede */}
        <div className="text mt-8 max-w-2xl">
          <p className="text-base sm:text-lg md:text-xl text-cyber-text-secondary font-mono leading-relaxed">
            {companyInfo.coreMission}. Self-learning, privacy-preserving, and built on
            decentralized zero-knowledge architecture.
          </p>
        </div>

        {/* Dual CTA Actions */}
        <div className="actions mt-10 flex flex-wrap items-center gap-4 justify-center md:justify-start">
          <CtaButton
            href="#showcase"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
            icon={<Sparkles className="w-4 h-4" />}
          >
            Explore NIVA
          </CtaButton>
          <CtaButton
            href={companyInfo.socialLinks.loginUrl}
            target="_blank"
            variant="transparent"
            size="lg"
            className="w-full sm:w-auto"
            icon={<ArrowUpRight className="w-4 h-4" />}
          >
            NIVA Login
          </CtaButton>
        </div>

        {/* Quick Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center gap-6 justify-center md:justify-start text-xs font-mono text-cyber-text-muted">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyber-primary" />
            <span>Zero-Knowledge Proofs</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyber-cyan" />
            <span>Decentralized Foundation Models</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyber-green" />
            <span>100% Data Sovereignty</span>
          </div>
        </div>
      </div>

      {/* Bottom Block: Interactive NIVA Interface Simulation Frame (FlowDemo) */}
      <div
        ref={demoRef}
        className="demo relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full mt-16 md:mt-24"
      >
        <div className="FlowDemo relative rounded-2xl border border-white/[0.12] bg-cyber-surface-1/90 backdrop-blur-heavy shadow-2xl overflow-hidden">
          {/* Window Chrome Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/[0.08] bg-black/50">
            {/* Mac-style Window Controls */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-3 text-xs font-mono text-cyber-text-muted hidden sm:inline-block">
                niva://autonomous-enclave/agent-01
              </span>
            </div>

            {/* Status Pills */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                type="button"
                onClick={() => setActiveTab('terminal')}
                className={`text-xs font-mono px-3 py-1 rounded transition-colors ${
                  activeTab === 'terminal'
                    ? 'bg-cyber-primary/20 text-cyber-primary border border-cyber-primary/40'
                    : 'text-cyber-text-muted hover:text-white'
                }`}
              >
                Workflow Execution
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('telemetry')}
                className={`text-xs font-mono px-3 py-1 rounded transition-colors ${
                  activeTab === 'telemetry'
                    ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40'
                    : 'text-cyber-text-muted hover:text-white'
                }`}
              >
                Telemetry Matrix
              </button>
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[1.1rem] font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>ONLINE</span>
              </div>
            </div>
          </div>

          {/* Window Interior Content */}
          <div className="p-4 sm:p-8 bg-gradient-to-b from-cyber-surface-1 to-black/80">
            {activeTab === 'terminal' ? (
              <div className="space-y-4 font-mono text-xs sm:text-sm">
                {/* Simulated Command Execution Prompt */}
                <div className="flex items-start gap-3 text-cyber-text-muted">
                  <TerminalIcon className="w-4 h-4 text-cyber-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-cyber-primary">operator@cybergenix:~$</span>{' '}
                    <span className="text-white font-medium">
                      niva --run "Synthesize digital twin & run zero-knowledge endpoint audit"
                    </span>
                  </div>
                </div>

                {/* Simulated Real-Time Execution Logs */}
                <div className="pl-7 space-y-2 border-l border-white/[0.08] text-cyber-text-secondary">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>[OK] Sovereign enclave isolated on host hardware (FIPS 140-3 verified)</span>
                  </div>
                  <div className="flex items-center gap-2 text-cyber-cyan">
                    <Activity className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>[SYNC] 18 Decentralized institutional nodes interconnected</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-400">
                    <Layers className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>[TWIN] Digital avatar representation synthesized with habit-based tuning</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <Shield className="w-3.5 h-3.5 flex-shrink-0 text-cyber-primary" />
                    <span>
                      [REPORT] 0 bytes leaked to third-party clouds. 100% Zero-Knowledge cryptographic privacy.
                    </span>
                  </div>
                </div>

                {/* Interactive Simulated Command Output Bar */}
                <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs text-cyber-text-muted">
                    <span>Model: Sovereign-L40</span>
                    <span>•</span>
                    <span>Latency: 28ms</span>
                    <span>•</span>
                    <span className="text-cyber-primary">Autonomy: Level 4</span>
                  </div>
                  <a
                    href="#showcase"
                    className="inline-flex items-center gap-1.5 text-xs text-cyber-primary hover:text-white transition-colors"
                  >
                    <span>View Architecture Pillars</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              /* Telemetry Metrics Grid */
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
                <div className="p-4 rounded-xl bg-cyber-surface-2 border border-white/[0.06]">
                  <div className="text-xs text-cyber-text-muted mb-1">DATA SOVEREIGNTY</div>
                  <div className="text-2xl font-bold font-display text-white">100%</div>
                  <div className="text-[1.0rem] text-emerald-400 mt-1">Zero Cloud Upload</div>
                </div>
                <div className="p-4 rounded-xl bg-cyber-surface-2 border border-white/[0.06]">
                  <div className="text-xs text-cyber-text-muted mb-1">EXECUTION SPEED</div>
                  <div className="text-2xl font-bold font-display text-cyber-primary">&lt; 250ms</div>
                  <div className="text-[1.0rem] text-cyber-text-secondary mt-1">OS-Level Control</div>
                </div>
                <div className="p-4 rounded-xl bg-cyber-surface-2 border border-white/[0.06]">
                  <div className="text-xs text-cyber-text-muted mb-1">PARTNER NODES</div>
                  <div className="text-2xl font-bold font-display text-cyber-cyan">18 / 18</div>
                  <div className="text-[1.0rem] text-cyber-text-secondary mt-1">Government & Tech</div>
                </div>
                <div className="p-4 rounded-xl bg-cyber-surface-2 border border-white/[0.06]">
                  <div className="text-xs text-cyber-text-muted mb-1">ADAPTATION RATE</div>
                  <div className="text-2xl font-bold font-display text-purple-400">99.4%</div>
                  <div className="text-[1.0rem] text-cyber-text-secondary mt-1">Habit Precision</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
