import React, { useEffect, useRef } from 'react';
import { problemItems } from '../../data/cybergenixData';
import { ChamferCard } from '../common/ChamferCard';
import { gsap } from '../../utils/gsapConfig';
import {
  AlertTriangle,
  Brain,
  MessageSquareOff,
  HeartCrack,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || !trackWrapperRef.current) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Use GSAP matchMedia to only activate horizontal scroll pinning on desktop (>=768px)
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      if (prefersReducedMotion) return;

      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollDist = () => {
        // Distance needed to scroll all cards into view
        return Math.max(0, track.scrollWidth - window.innerWidth + 120);
      };

      const anim = gsap.to(track, {
        x: () => -getScrollDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollDist()}`,
          pin: true,
          scrub: 1, // 1-second smoothed scrub for cinematic glide
          invalidateOnRefresh: true,
        },
      });

      return () => {
        anim.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  // Visual card representations
  const renderCardGraphic = (id: string) => {
    switch (id) {
      case '01':
        return (
          <div className="mt-6 p-4 rounded-xl bg-black/60 border border-white/[0.08] font-mono text-xs">
            <div className="flex items-center justify-between text-cyber-text-muted mb-3 pb-2 border-b border-white/[0.06]">
              <span className="flex items-center gap-1.5 text-cyber-primary">
                <Brain className="w-3.5 h-3.5" />
                Token Window Context Loss
              </span>
              <span className="text-red-400">-78% Retention</span>
            </div>
            {/* Context loss graphic */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[1.1rem]">
                <span className="text-white">Initial Prompt Context</span>
                <span className="text-emerald-400">100%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                <div className="w-full h-full bg-emerald-400" />
              </div>
              <div className="flex items-center justify-between text-[1.1rem] pt-1">
                <span className="text-cyber-text-muted">Enterprise Workflow Step 4</span>
                <span className="text-cyber-caution">42%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                <div className="w-[42%] h-full bg-cyber-caution" />
              </div>
              <div className="flex items-center justify-between text-[1.1rem] pt-1">
                <span className="text-red-400">Cross-App Execution Horizon</span>
                <span className="text-red-400">12%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                <div className="w-[12%] h-full bg-red-500" />
              </div>
            </div>
          </div>
        );

      case '02':
        return (
          <div className="mt-6 p-4 rounded-xl bg-black/60 border border-white/[0.08] font-mono text-xs">
            <div className="flex items-center justify-between text-cyber-text-muted mb-3 pb-2 border-b border-white/[0.06]">
              <span className="flex items-center gap-1.5 text-cyber-cyan">
                <MessageSquareOff className="w-3.5 h-3.5" />
                Interface Friction Bottleneck
              </span>
              <span className="text-cyber-caution">Text-Only</span>
            </div>
            <div className="space-y-2 text-cyber-text-secondary text-[1.1rem]">
              <div className="flex items-center gap-2 text-red-400">
                <span>✕</span>
                <span>No real-time voice perception</span>
              </div>
              <div className="flex items-center gap-2 text-red-400">
                <span>✕</span>
                <span>Zero visual screen comprehension</span>
              </div>
              <div className="flex items-center gap-2 text-cyber-text-muted">
                <span>→</span>
                <span>14+ min spent crafting manual prompt engineering</span>
              </div>
            </div>
          </div>
        );

      case '03':
        return (
          <div className="mt-6 p-4 rounded-xl bg-black/60 border border-white/[0.08] font-mono text-xs">
            <div className="flex items-center justify-between text-cyber-text-muted mb-3 pb-2 border-b border-white/[0.06]">
              <span className="flex items-center gap-1.5 text-purple-400">
                <HeartCrack className="w-3.5 h-3.5" />
                Emotional Resonance
              </span>
              <span className="text-red-400 font-bold">FLATLINE</span>
            </div>
            {/* SVG Wave graphic */}
            <div className="h-14 flex items-center justify-center">
              <svg className="w-full h-10 text-red-500/80" viewBox="0 0 200 40">
                <path
                  d="M0,20 L40,20 L50,8 L60,32 L70,18 L80,20 L200,20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-[1.0rem] text-center text-cyber-text-dim mt-1">
              Sterile, repetitive scripted replies with 0 empathy
            </p>
          </div>
        );

      case '04':
        return (
          <div className="mt-6 p-4 rounded-xl bg-black/60 border border-red-500/30 font-mono text-xs">
            <div className="flex items-center justify-between text-cyber-threat mb-3 pb-2 border-b border-red-500/20">
              <span className="flex items-center gap-1.5 font-bold">
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                Centralized Leak Vulnerability
              </span>
              <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 text-[1.0rem]">
                CRITICAL
              </span>
            </div>
            <div className="space-y-2 text-[1.1rem]">
              <div className="flex justify-between text-cyber-text-muted">
                <span>External Cloud Exfiltration:</span>
                <span className="text-red-400">High Risk</span>
              </div>
              <div className="flex justify-between text-cyber-text-muted">
                <span>Model Training Data Harvest:</span>
                <span className="text-red-400">Unencrypted</span>
              </div>
              <div className="flex justify-between text-cyber-text-muted">
                <span>Third-Party Subprocessors:</span>
                <span className="text-red-400">12+ Vendors</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="features"
      data-features=""
      className="FeaturesSection relative w-full bg-black py-20 md:py-0 overflow-hidden"
    >
      {/* Background ambient grid overlay */}
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-20" />

      {/* Desktop Pinned Horizontal Container (or standard responsive block on mobile) */}
      <div
        ref={trackWrapperRef}
        className="w-full md:h-screen md:flex md:flex-col md:justify-center overflow-hidden px-4 sm:px-6 max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <div className="max-w-4xl mb-12 md:mb-16">
          <div className="Caption inline-flex items-center gap-2 mb-3">
            <span className="decoration">/ </span>
            <span>The Problem</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.05]">
            Current AI is broken.{' '}
            <strong className="text-cyber-primary font-inherit">
              Traditional models expose critical vulnerabilities.
            </strong>
          </h2>
          <p className="lede mt-4 text-base sm:text-lg text-cyber-text-secondary font-mono leading-relaxed max-w-3xl">
            Centralized cloud AI architectures sacrifice proprietary enterprise data while trapping users in
            shallow, disconnected text-only interfaces.
          </p>
        </div>

        {/* Desktop: Pinned Horizontal Scrolling Track; Mobile: Vertical Stack with zero overflow */}
        <div className="relative w-full">
          {/* Track container */}
          <div
            ref={trackRef}
            data-track=""
            className="hidden md:flex flex-nowrap gap-8 will-change-transform pb-8"
          >
            {problemItems.map((item, idx) => (
              <article
                key={item.id}
                className="item w-[380px] lg:w-[440px] flex-shrink-0"
              >
                <ChamferCard
                  chamfer="md"
                  surface="glass"
                  glow={idx === 3 ? 'orange' : idx === 1 ? 'indigo' : false}
                  className="p-8 h-[460px] flex flex-col justify-between group border-white/[0.12] hover:border-cyber-primary/60 transition-all duration-300"
                >
                  <div>
                    {/* Top indicator & ID */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-mono font-bold text-cyber-primary border border-cyber-primary/30 px-3 py-1 rounded bg-cyber-primary/10">
                        {item.id}
                      </span>
                      <AlertTriangle
                        className={`w-4 h-4 ${
                          idx === 3 ? 'text-red-400' : 'text-cyber-caution'
                        }`}
                      />
                    </div>

                    <h3 className="metal font-display text-2xl font-semibold text-white mb-3 group-hover:text-cyber-primary transition-colors">
                      {item.id}. {item.title}
                    </h3>

                    <p className="text-sm text-cyber-text-secondary font-mono leading-relaxed">
                      {item.description}
                    </p>

                    {/* Dynamic graphic inside card */}
                    {renderCardGraphic(item.id)}
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-cyber-text-muted group-hover:text-white transition-colors">
                    <span>Legacy AI Flaw</span>
                    <ArrowRight className="w-4 h-4 text-cyber-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </ChamferCard>
              </article>
            ))}
          </div>

          {/* Mobile Fallback: Clean vertical stack with zero horizontal overflow */}
          <div className="grid grid-cols-1 gap-6 md:hidden">
            {problemItems.map((item, idx) => (
              <article key={`mob-${item.id}`} className="item w-full">
                <ChamferCard
                  chamfer="md"
                  surface="glass"
                  glow={idx === 3 ? 'orange' : false}
                  className="p-6 border-white/[0.12]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-cyber-primary border border-cyber-primary/30 px-2.5 py-1 rounded bg-cyber-primary/10">
                      {item.id}
                    </span>
                    <AlertTriangle
                      className={`w-4 h-4 ${
                        idx === 3 ? 'text-red-400' : 'text-cyber-caution'
                      }`}
                    />
                  </div>

                  <h3 className="metal font-display text-xl font-semibold text-white mb-2">
                    {item.id}. {item.title}
                  </h3>

                  <p className="text-sm text-cyber-text-secondary font-mono leading-relaxed">
                    {item.description}
                  </p>

                  {renderCardGraphic(item.id)}
                </ChamferCard>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
