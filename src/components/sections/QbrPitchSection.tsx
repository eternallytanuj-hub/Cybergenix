import React, { useState } from 'react';
import { revenueStreams } from '../../data/cybergenixData';
import { ChamferCard } from '../common/ChamferCard';
import { CtaButton } from '../common/CtaButton';
import {
  Cpu,
  Bot,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Lock,
} from 'lucide-react';

export const QbrPitchSection: React.FC = () => {
  const [selectedStreamId, setSelectedStreamId] = useState<string>('R1');

  const streamIcons = {
    R1: <Cpu className="w-5 h-5 text-cyber-primary" />,
    R2: <Bot className="w-5 h-5 text-cyber-cyan" />,
    R3: <Layers className="w-5 h-5 text-purple-400" />,
  };

  const streamBadges = {
    R1: 'Cloud & On-Premises SaaS',
    R2: 'Edge Robotics & Physical Hardware',
    R3: 'Bespoke Engineering & Defense',
  };

  const streamRoi = {
    R1: { metric: '3.4x', label: 'Average 90-Day ROI', detail: 'Via habit-learning task automation' },
    R2: { metric: '65%', label: 'Labor Efficiency Boost', detail: 'In logistics & facility automation' },
    R3: { metric: '100%', label: 'Sovereign IP Ownership', detail: 'Zero model weights leave client perimeter' },
  };

  const activeStream = revenueStreams.find((s) => s.id === selectedStreamId) || revenueStreams[0];

  return (
    <section
      id="revenue-streams"
      data-qbrpitch=""
      className="QbrPitchSection relative py-28 md:py-36 border-y border-white/[0.08] bg-cyber-surface-0 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-primary/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ============================================================ */}
          {/* LEFT COPY COLUMN: Context, Enterprise Rationale & Metrics    */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="Caption inline-flex items-center gap-2 mb-3">
                <span className="decoration">/ </span>
                <span>Enterprise Business Model</span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.08]">
                Three flexible revenue models engineered for{' '}
                <strong className="text-cyber-primary font-inherit">
                  enterprise scaling.</strong>
              </h2>

              <p className="mt-5 text-base sm:text-lg text-cyber-text-secondary font-mono leading-relaxed">
                Whether deploying sovereign cloud SaaS for knowledge teams, physical AI robotics for industrial
                logistics, or bespoke fine-tuned models for regulated defense sectors, Cybergenix delivers end-to-end
                operational velocity with verifiable cryptographic security.
              </p>
            </div>

            {/* Enterprise ROI & Trust Metrics */}
            <div className="grid grid-cols-2 gap-4 font-mono">
              <div className="p-4 rounded-xl bg-cyber-surface-1 border border-white/[0.08]">
                <div className="text-xs text-cyber-text-muted uppercase mb-1">Deployment Speed</div>
                <div className="font-display text-2xl font-bold text-white mb-0.5">&lt; 48 Hours</div>
                <div className="text-[1.1rem] text-emerald-400">Containerized stack</div>
              </div>

              <div className="p-4 rounded-xl bg-cyber-surface-1 border border-white/[0.08]">
                <div className="text-xs text-cyber-text-muted uppercase mb-1">Egress Lock-in</div>
                <div className="font-display text-2xl font-bold text-white mb-0.5">0.00%</div>
                <div className="text-[1.1rem] text-cyber-cyan">Open-source cores</div>
              </div>
            </div>

            {/* Enterprise Badges */}
            <div className="space-y-3 pt-4 border-t border-white/[0.08] font-mono text-xs">
              <div className="flex items-center gap-2.5 text-cyber-text-silver">
                <ShieldCheck className="w-4 h-4 text-cyber-primary flex-shrink-0" />
                <span>Multi-seat governance with granular role-based permissions</span>
              </div>
              <div className="flex items-center gap-2.5 text-cyber-text-silver">
                <Lock className="w-4 h-4 text-cyber-primary flex-shrink-0" />
                <span>FIPS 140-3 &amp; ISO 27001 zero-knowledge cryptographic safeguards</span>
              </div>
              <div className="flex items-center gap-2.5 text-cyber-text-silver">
                <Building2 className="w-4 h-4 text-cyber-primary flex-shrink-0" />
                <span>On-site enterprise deployment team &amp; 24/7 dedicated support</span>
              </div>
            </div>

            <div className="pt-2">
              <CtaButton href="#schedule-a-meeting" variant="primary" size="default">
                Request Solution Blueprint
              </CtaButton>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Interactive Revenue Streams Presentation Card  */}
          {/* ============================================================ */}
          <div className="lg:col-span-7">
            <ChamferCard
              chamfer="lg"
              surface="glass"
              glow="orange"
              className="p-8 sm:p-10 border-white/[0.12] shadow-glow-primary"
            >
              {/* Card Header */}
              <div className="border-b border-white/[0.08] pb-6 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-cyber-primary font-bold tracking-widest uppercase">
                    Three Scalable Revenue Streams
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/[0.05] text-[1.1rem] font-mono text-cyber-text-muted border border-white/[0.06]">
                    Enterprise Portfolio
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                  Autonomous Value Architecture
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-mono text-cyber-text-silver italic leading-relaxed">
                  "From software intelligence to physical robotic automation, integrate autonomous AI into your core business."
                </p>
              </div>

              {/* 3 Stream Switcher Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-black/60 border border-white/[0.08] mb-8 font-mono text-xs">
                {revenueStreams.map((stream) => {
                  const isSelected = selectedStreamId === stream.id;
                  return (
                    <button
                      key={stream.id}
                      type="button"
                      onClick={() => setSelectedStreamId(stream.id)}
                      className={`py-3 px-2 sm:px-4 rounded-lg font-medium transition-all text-center flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-cyber-primary text-white shadow-glow-primary font-bold'
                          : 'text-cyber-text-secondary hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <span className="text-[1.1rem]">{stream.id}</span>
                      <span className="truncate">{stream.title.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Stream Detailed Breakdown */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-white/[0.05] border border-white/[0.1]">
                      {streamIcons[activeStream.id as keyof typeof streamIcons]}
                    </div>
                    <div>
                      <div className="text-xs font-mono text-cyber-primary font-bold">
                        STREAM {activeStream.id}
                      </div>
                      <h4 className="font-display text-xl sm:text-2xl font-semibold text-white">
                        {activeStream.title}
                      </h4>
                    </div>
                  </div>

                  <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-cyber-primary/10 border border-cyber-primary/30 text-cyber-primary font-mono text-[1.1rem]">
                    {streamBadges[activeStream.id as keyof typeof streamBadges]}
                  </span>
                </div>

                <p className="text-sm font-mono text-cyber-text-secondary leading-relaxed">
                  {activeStream.description}
                </p>

                {/* Key Deliverables / Highlights */}
                <div className="space-y-3 p-5 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-xs">
                  <div className="text-white font-semibold uppercase tracking-wider text-[1.1rem]">
                    Core Deliverables &amp; Enterprise Capabilities:
                  </div>
                  {activeStream.highlights?.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-cyber-text-silver">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* ROI Metric Highlight */}
                {streamRoi[activeStream.id as keyof typeof streamRoi] && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-cyber-primary/10 to-transparent border border-cyber-primary/20 flex items-center justify-between font-mono">
                    <div>
                      <div className="text-xs text-cyber-text-muted uppercase">
                        {streamRoi[activeStream.id as keyof typeof streamRoi].label}
                      </div>
                      <div className="text-xs text-cyber-text-secondary mt-0.5">
                        {streamRoi[activeStream.id as keyof typeof streamRoi].detail}
                      </div>
                    </div>
                    <div className="font-display text-3xl font-bold text-cyber-primary">
                      {streamRoi[activeStream.id as keyof typeof streamRoi].metric}
                    </div>
                  </div>
                )}

                {/* Action CTA Buttons */}
                <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row gap-4">
                  <CtaButton
                    href="#schedule-a-meeting"
                    variant="primary"
                    size="default"
                    className="flex-1"
                  >
                    Get {activeStream.title} Proposal
                  </CtaButton>
                  <CtaButton
                    href="#pricing"
                    variant="transparent"
                    size="default"
                    className="flex-1"
                  >
                    View Transparent Pricing
                  </CtaButton>
                </div>
              </div>
            </ChamferCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QbrPitchSection;
