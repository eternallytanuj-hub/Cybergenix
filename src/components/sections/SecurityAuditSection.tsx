import React, { useState, useEffect } from 'react';
import { capabilities } from '../../data/cybergenixData';
import { ChamferCard } from '../common/ChamferCard';
import { CtaButton } from '../common/CtaButton';
import {
  ShieldCheck,
  Cpu,
  GitBranch,
  HeartHandshake,
  Layers,
  Lock,
  CheckCircle2,
  Activity,
  Terminal,
  Zap,
  KeyRound,
} from 'lucide-react';

export const SecurityAuditSection: React.FC = () => {
  // Active Tab state: '0' = System Capabilities & Intelligence, '1' = Security Architecture & ZK Enclave
  const [activeTab, setActiveTab] = useState<'0' | '1'>('0');
  const [selectedCapId, setSelectedCapId] = useState<string>('01');
  const [gaugeScore, setGaugeScore] = useState<number>(0);

  // Animated gauge score effect on load
  useEffect(() => {
    const targetScore = 98;
    const duration = 1200;
    const startTime = performance.now();

    const animateGauge = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing curve (ease-out cubic)
      const eased = 1 - Math.pow(1 - progress, 3);
      setGaugeScore(Math.floor(eased * targetScore));

      if (progress < 1) {
        requestAnimationFrame(animateGauge);
      }
    };

    const animId = requestAnimationFrame(animateGauge);
    return () => cancelAnimationFrame(animId);
  }, [activeTab]);

  // Capability icons helper
  const getCapIcon = (id: string) => {
    switch (id) {
      case '01':
        return <Cpu className="w-5 h-5 text-cyber-primary" />;
      case '02':
        return <GitBranch className="w-5 h-5 text-cyber-cyan" />;
      case '03':
        return <Activity className="w-5 h-5 text-purple-400" />;
      case '04':
        return <HeartHandshake className="w-5 h-5 text-pink-400" />;
      case '05':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case '06':
        return <Layers className="w-5 h-5 text-amber-400" />;
      default:
        return <Zap className="w-5 h-5 text-cyber-primary" />;
    }
  };

  // SVG Radial Gauge geometry calculations
  const radius = 72;
  const circumference = 2 * Math.PI * radius; // ~452.39
  const strokeDashoffset = circumference - (circumference * gaugeScore) / 100;

  // Selected capability details
  const selectedCapability =
    capabilities.find((c) => c.id === selectedCapId) || capabilities[0];

  return (
    <section
      id="capabilities"
      data-securityaudit=""
      className="SecurityAuditSection relative py-28 md:py-36 border-y border-white/[0.08] bg-cyber-surface-0 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background ambient radial gradients */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(248,92,58,0.08)_0%,rgba(90,102,238,0.04)_50%,transparent_75%)] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mb-12 md:mb-16">
          <div className="Caption inline-flex items-center gap-2 mb-3">
            <span className="decoration">/ </span>
            <span>Enterprise Capabilities &amp; Security Architecture</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.05]">
            Deep system intelligence and{' '}
            <strong className="text-cyber-primary font-inherit">
              military-grade encryption.
            </strong>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-cyber-text-secondary font-mono leading-relaxed max-w-3xl">
            Control applications, files, and multi-app workflows via voice and proactive context with native operating
            system hooks, backed by verifiable zero-knowledge privacy proofs.
          </p>
        </div>

        {/* Tab Switcher Controls (satisfies T3-01 contracts) */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <button
            type="button"
            data-aud-btn="0"
            role="tab"
            aria-pressed={activeTab === '0'}
            onClick={() => setActiveTab('0')}
            className={`px-6 py-3 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
              activeTab === '0'
                ? 'bg-cyber-primary text-white shadow-glow-primary font-bold border border-cyber-primary'
                : 'bg-white/[0.04] text-cyber-text-secondary hover:text-white border border-white/[0.08] hover:border-white/20'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>System Capabilities &amp; Intelligence</span>
          </button>

          <button
            type="button"
            data-aud-btn="1"
            role="tab"
            aria-pressed={activeTab === '1'}
            onClick={() => setActiveTab('1')}
            className={`px-6 py-3 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
              activeTab === '1'
                ? 'bg-cyber-primary text-white shadow-glow-primary font-bold border border-cyber-primary'
                : 'bg-white/[0.04] text-cyber-text-secondary hover:text-white border border-white/[0.08] hover:border-white/20'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Security Architecture &amp; Zero-Knowledge Enclave</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 ml-auto text-xs font-mono text-cyber-text-muted">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Operational Telemetry: Active</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PANEL 0: System Capabilities & Intelligence                  */}
        {/* ============================================================ */}
        <div
          data-aud-panel="0"
          style={{ display: activeTab === '0' ? 'block' : 'none' }}
          className="space-y-10"
        >
          {/* Top Radial Score Gauge & Intelligence Overview Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 rounded-2xl bg-cyber-surface-1 border border-white/[0.12] backdrop-blur-card">
            {/* SVG Radial Score Gauge Container */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-white/[0.08]">
              <div className="relative w-52 h-52 flex items-center justify-center">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 200 200"
                  aria-label={`System Autonomy Score: ${gaugeScore} out of 100`}
                >
                  <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f85c3a" />
                      <stop offset="50%" stopColor="#5a66ee" />
                      <stop offset="100%" stopColor="#3ddc84" />
                    </linearGradient>
                    <filter id="gauge-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Background Track Circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="12"
                  />

                  {/* Animated Progress Circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke="url(#gaugeGradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    filter="url(#gauge-glow)"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>

                {/* Score Number in Center of Gauge */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-mono">
                  <div className="font-display text-5xl font-bold text-white tracking-tight leading-none">
                    {gaugeScore}
                  </div>
                  <div className="text-xs uppercase text-cyber-primary font-bold tracking-widest mt-1">
                    / 100 INDEX
                  </div>
                  <div className="text-[1.0rem] text-cyber-text-muted uppercase tracking-wider mt-0.5">
                    Grade A+ Verified
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="font-display text-sm font-semibold text-white">
                  Autonomous System Intelligence Score
                </span>
                <p className="text-xs font-mono text-cyber-text-muted max-w-xs mt-1">
                  Composite score across OS execution latency, model reasoning precision, and habit adaptation.
                </p>
              </div>
            </div>

            {/* Right Column: 4 Real-time Metrics & Architecture Pillars */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4 font-mono">
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                <div className="text-[1.1rem] text-cyber-text-muted uppercase mb-1">
                  Task Execution Latency
                </div>
                <div className="font-display text-2xl font-bold text-white mb-1">
                  &lt; 250ms
                </div>
                <div className="text-xs text-emerald-400">Direct OS native call</div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                <div className="text-[1.1rem] text-cyber-text-muted uppercase mb-1">
                  Habit Adaptation Rate
                </div>
                <div className="font-display text-2xl font-bold text-white mb-1">
                  99.4%
                </div>
                <div className="text-xs text-cyber-cyan">Decentralized embeddings</div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                <div className="text-[1.1rem] text-cyber-text-muted uppercase mb-1">
                  Digital Twin Time Saved
                </div>
                <div className="font-display text-2xl font-bold text-white mb-1">
                  18+ hrs/wk
                </div>
                <div className="text-xs text-purple-400">Autonomous meeting action</div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                <div className="text-[1.1rem] text-cyber-text-muted uppercase mb-1">
                  Emotion Precision
                </div>
                <div className="font-display text-2xl font-bold text-white mb-1">
                  96.8%
                </div>
                <div className="text-xs text-pink-400">Acoustic &amp; context cues</div>
              </div>
            </div>
          </div>

          {/* Grid of System Intelligence Capabilities: 01, 02, 03, 04 */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-white">
                  System Intelligence Features
                </h3>
                <p className="text-xs font-mono text-cyber-text-secondary mt-1">
                  Select any capability below to inspect deep OS architecture specs.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {capabilities.slice(0, 4).map((cap) => {
                const isSelected = selectedCapId === cap.id;
                return (
                  <div
                    key={cap.id}
                    onClick={() => setSelectedCapId(cap.id)}
                    className="cursor-pointer"
                  >
                    <ChamferCard
                      chamfer="md"
                      surface={isSelected ? 'surface-2' : 'glass'}
                      glow={isSelected ? 'orange' : false}
                      className={`p-6 h-full flex flex-col justify-between transition-all duration-300 ${
                        isSelected
                          ? 'border-cyber-primary shadow-glow-primary scale-[1.02]'
                          : 'border-white/[0.08] hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-mono text-xs font-bold text-cyber-primary tracking-wider">
                            CAPABILITY {cap.id}
                          </span>
                          <div className="p-2 rounded-lg bg-white/[0.04]">
                            {getCapIcon(cap.id)}
                          </div>
                        </div>

                        <h4 className="font-display text-lg font-semibold text-white mb-2">
                          {cap.title}
                        </h4>

                        <p className="text-xs font-mono text-cyber-text-secondary leading-relaxed mb-4">
                          {cap.description}
                        </p>

                        <div className="space-y-1.5 pt-3 border-t border-white/[0.06] mb-4">
                          {cap.details?.map((detail, dIdx) => (
                            <div
                              key={dIdx}
                              className="text-[1.1rem] font-mono text-cyber-text-muted flex items-center gap-1.5"
                            >
                              <span className="w-1 h-1 rounded-full bg-cyber-primary flex-shrink-0" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-cyber-primary">
                        <span>{cap.metrics?.label}</span>
                        <span className="font-bold text-white">{cap.metrics?.value}</span>
                      </div>
                    </ChamferCard>
                  </div>
                );
              })}
            </div>

            {/* Selected Capability Deep-Dive Console */}
            <div className="mt-8 p-6 rounded-xl bg-black/60 border border-white/[0.08] font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-3 mb-4 text-xs">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyber-primary" />
                  <span className="text-white font-bold">
                    Active Inspection: Capability {selectedCapability.id} — {selectedCapability.title}
                  </span>
                </div>
                <span className="text-cyber-primary text-[1.1rem]">
                  Benchmark: {selectedCapability.metrics?.label} = {selectedCapability.metrics?.value}
                </span>
              </div>
              <p className="text-xs text-cyber-text-secondary leading-relaxed mb-4">
                {selectedCapability.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedCapability.details?.map((detail, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] text-[1.1rem] text-cyber-text-silver flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PANEL 1: Security Architecture & Zero-Knowledge Enclave      */}
        {/* ============================================================ */}
        <div
          data-aud-panel="1"
          style={{ display: activeTab === '1' ? 'block' : 'none' }}
          className="space-y-10"
        >
          {/* Top Security Enclave Posture Banner */}
          <div className="p-8 rounded-2xl bg-cyber-surface-1 border border-white/[0.12] backdrop-blur-card">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-3">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Zero-Knowledge Security Layer</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                  Cryptographically Isolated Neural Enclave
                </h3>
                <p className="text-sm font-mono text-cyber-text-secondary mt-1 max-w-2xl leading-relaxed">
                  Cybergenix executes models in cryptographically isolated enclaves. Data never leaves user control,
                  eliminating central cloud attack surfaces and compliance vulnerabilities.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                <div className="px-4 py-3 rounded-xl bg-black/50 border border-emerald-500/30 text-emerald-400 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-bold text-white">AES-256-GCM + Kyber</div>
                    <div className="text-[1.0rem] text-emerald-400/80">Post-Quantum Cryptography</div>
                  </div>
                </div>

                <div className="px-4 py-3 rounded-xl bg-black/50 border border-cyber-primary/30 text-cyber-primary flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-cyber-primary" />
                  <div>
                    <div className="font-bold text-white">Client-Side Keys</div>
                    <div className="text-[1.0rem] text-cyber-primary/80">Zero Third-Party Custody</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Core Security Metric Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/[0.08] font-mono">
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                <div className="text-xs text-cyber-text-muted uppercase mb-1">
                  Data Exposure Liability
                </div>
                <div className="font-display text-3xl font-bold text-emerald-400">
                  0.00%
                </div>
                <div className="text-xs text-cyber-text-muted mt-1">Zero cloud persistence</div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                <div className="text-xs text-cyber-text-muted uppercase mb-1">
                  Proof Verification Time
                </div>
                <div className="font-display text-3xl font-bold text-cyber-cyan">
                  12ms
                </div>
                <div className="text-xs text-cyber-text-muted mt-1">zk-SNARKs on client host</div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                <div className="text-xs text-cyber-text-muted uppercase mb-1">
                  Standards Compliance
                </div>
                <div className="font-display text-3xl font-bold text-cyber-primary">
                  FIPS 140-3
                </div>
                <div className="text-xs text-cyber-text-muted mt-1">ISO 27001 &amp; SOC2 Type II</div>
              </div>
            </div>
          </div>

          {/* Capabilities 05 & 06 (Secure Infrastructure & Deep Integration) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.slice(4, 6).map((cap) => (
              <ChamferCard
                key={cap.id}
                chamfer="lg"
                surface="glass"
                glow="orange"
                className="p-8 border-white/[0.12]"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-cyber-primary tracking-wider">
                    CAPABILITY {cap.id} • {cap.metrics?.label}: {cap.metrics?.value}
                  </span>
                  <div className="p-2.5 rounded-lg bg-white/[0.04]">
                    {getCapIcon(cap.id)}
                  </div>
                </div>

                <h4 className="font-display text-2xl font-semibold text-white mb-2">
                  {cap.title}
                </h4>

                <p className="text-sm font-mono text-cyber-text-secondary leading-relaxed mb-6">
                  {cap.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-white/[0.08]">
                  {cap.details?.map((detail, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-center gap-2 text-xs font-mono text-cyber-text-silver"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </ChamferCard>
            ))}
          </div>

          {/* Enterprise Multi-Tenant vs Sovereign ZK Enclave Audit Matrix Table */}
          <div className="rounded-2xl border border-white/[0.12] bg-cyber-surface-1 overflow-hidden font-mono">
            <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
              <div>
                <h4 className="font-display text-lg font-semibold text-white">
                  Security Posture Audit Matrix
                </h4>
                <p className="text-xs text-cyber-text-muted mt-0.5">
                  Direct architectural comparison: Cybergenix Sovereign ZK Enclave vs Centralized Cloud AI.
                </p>
              </div>
              <span className="px-3 py-1 rounded bg-white/[0.04] text-xs text-cyber-primary border border-white/[0.08]">
                8-Vector Verification
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-black/40 text-cyber-text-muted uppercase tracking-wider">
                    <th className="py-3.5 px-6">Security Vector</th>
                    <th className="py-3.5 px-6">Cybergenix NIVA Enclave</th>
                    <th className="py-3.5 px-6">Centralized Cloud LLMs</th>
                    <th className="py-3.5 px-6 text-right">Audit Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-cyber-text-secondary">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">
                      Memory Enclave Isolation
                    </td>
                    <td className="py-4 px-6 text-emerald-400">
                      Sovereign on-device enclave (Zero cloud egress)
                    </td>
                    <td className="py-4 px-6 text-red-400">
                      Shared multi-tenant cloud container
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                        PASSED
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">
                      Query &amp; Document Retention
                    </td>
                    <td className="py-4 px-6 text-emerald-400">
                      0 Byte persistence • Ephemeral zero-knowledge proofs
                    </td>
                    <td className="py-4 px-6 text-red-400">
                      Central model retraining &amp; prompt log retention
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                        PASSED
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">
                      Cryptographic Key Custody
                    </td>
                    <td className="py-4 px-6 text-emerald-400">
                      100% Client-side HSM / Secure Enclave storage
                    </td>
                    <td className="py-4 px-6 text-red-400">
                      Cloud vendor master key authority
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                        PASSED
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">
                      Air-Gapped Deployment
                    </td>
                    <td className="py-4 px-6 text-emerald-400">
                      Supported for defense &amp; critical facilities
                    </td>
                    <td className="py-4 px-6 text-red-400">
                      Impossible; hard requirement on public WAN
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                        PASSED
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">
                      Regulatory Compliance
                    </td>
                    <td className="py-4 px-6 text-emerald-400">
                      FIPS 140-3, ISO 27001, SOC 2 Type II, GDPR Article 25
                    </td>
                    <td className="py-4 px-6 text-amber-400">
                      Variable cross-border compliance risk
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                        COMPLIANT
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-black/40 border border-white/[0.08]">
          <div className="font-mono">
            <div className="text-white font-semibold text-sm">
              Schedule an Enterprise Architecture Review
            </div>
            <div className="text-xs text-cyber-text-muted mt-0.5">
              Receive a customized threat modeling dossier and zero-knowledge deployment blueprint.
            </div>
          </div>
          <CtaButton href="#schedule-a-meeting" variant="primary" size="default">
            Request Architecture Briefing
          </CtaButton>
        </div>
      </div>
    </section>
  );
};

export default SecurityAuditSection;
