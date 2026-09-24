import React, { useEffect, useRef } from 'react';
import { identityPillars } from '../../data/cybergenixData';
import { ChamferCard } from '../common/ChamferCard';
import { gsap, ScrollTrigger } from '../../utils/gsapConfig';
import {
  Brain,
  Bot,
  Workflow,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

export const ShowCaseSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const headline2Ref = useRef<HTMLHeadingElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const cardsWrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const pillarIcons = [
    <Brain className="w-8 h-8 text-cyber-primary" key="icon-0" />,
    <Bot className="w-8 h-8 text-cyber-cyan" key="icon-1" />,
    <Workflow className="w-8 h-8 text-purple-400" key="icon-2" />,
    <ShieldCheck className="w-8 h-8 text-emerald-400" key="icon-3" />,
  ];

  useEffect(() => {
    if (!containerRef.current || !stickyRef.current) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Use GSAP matchMedia to only enable pinning on desktop (>=768px)
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      if (prefersReducedMotion) return;

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: stickyRef.current,
        scrub: 1, // Smooth 1-second scrub
      });

      // Master scrubbing timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      // Stage 1: Cube scaling and gentle rotation
      if (cubeRef.current) {
        tl.fromTo(
          cubeRef.current,
          { scale: 0.7, rotateZ: 0, opacity: 0.3 },
          { scale: 1.15, rotateZ: 45, opacity: 0.8, ease: 'none', duration: 1 },
          0
        );
      }

      // Stage 2: Cross-fading Headlines
      if (headline1Ref.current && headline2Ref.current) {
        // Headline 1 starts visible, then fades and shrinks out
        tl.fromTo(
          headline1Ref.current,
          { opacity: 1, y: 0, scale: 1 },
          { opacity: 0, y: -25, scale: 0.95, duration: 0.35, ease: 'power2.in' },
          0.1
        );

        // Headline 2 enters smoothly
        tl.fromTo(
          headline2Ref.current,
          { opacity: 0, y: 25, scale: 1.05 },
          { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' },
          0.38
        );

        // Headline 2 stays visible briefly, then softens as cards take over
        tl.to(
          headline2Ref.current,
          { opacity: 0.25, y: -15, scale: 0.96, duration: 0.2, ease: 'power2.in' },
          0.65
        );
      }

      // Stage 3: 4 Fanned Cards Scrubbing
      // Initially, cards are stacked tightly in center; they then fan out horizontally
      const offsets = [-420, -140, 140, 420];
      const rotations = [-5, -2, 2, 5];

      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        const targetX = offsets[idx];
        const targetRot = rotations[idx];

        tl.fromTo(
          card,
          {
            x: 0,
            y: 120,
            rotation: 0,
            opacity: idx === 0 ? 0.9 : 0.4,
            scale: 0.9,
          },
          {
            x: targetX,
            y: 0,
            rotation: targetRot,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power3.out',
          },
          0.45 + idx * 0.05
        );
      });

      return () => {
        trigger.kill();
        tl.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="showcase"
      data-showcase=""
      className="ShowCaseSection relative w-full md:h-[300vh] bg-black text-cyber-text-primary"
    >
      {/* Sticky Viewport Container (Pins on Desktop, Standard Flow on Mobile) */}
      <div
        ref={stickyRef}
        className="relative w-full min-h-screen md:h-screen flex flex-col justify-between py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden"
      >
        {/* Luminous Rotating Cyber Lattice Graphic */}
        <div
          ref={cubeRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-40 will-change-transform"
          aria-hidden="true"
        >
          <div className="relative w-96 h-96 md:w-[600px] md:h-[600px] rounded-full border border-cyber-primary/20 bg-gradient-to-tr from-cyber-primary/10 via-cyber-indigo/5 to-transparent blur-3xl animate-pulse" />
          <svg
            className="absolute w-80 h-80 md:w-[500px] md:h-[500px] text-cyber-primary/15"
            viewBox="0 0 400 400"
            fill="none"
          >
            <polygon
              points="200,30 360,110 360,290 200,370 40,290 40,110"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
            <polygon
              points="200,70 320,130 320,270 200,330 80,270 80,130"
              stroke="rgba(90, 102, 238, 0.25)"
              strokeWidth="1.5"
            />
            <circle cx="200" cy="200" r="80" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" />
            <circle cx="200" cy="200" r="4" fill="#f85c3a" />
          </svg>
        </div>

        {/* Top Header Block: Stage 1 Cross-fading Headlines */}
        <div className="relative z-10 w-full text-center max-w-4xl mx-auto pt-6">
          <div className="Caption -center inline-flex items-center gap-2 mb-3">
            <span className="decoration">/ </span>
            <span>Core Identity Pillars</span>
          </div>

          <div className="relative h-28 sm:h-32 md:h-36 flex items-center justify-center">
            {/* Headline 1 */}
            <h2
              ref={headline1Ref}
              className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.1] max-w-3xl absolute inset-0 flex items-center justify-center will-change-transform"
            >
              Intelligent systems that learn, adapt, and evolve.{' '}
              <strong className="text-cyber-primary font-inherit">
                Without surrendering your data.
              </strong>
            </h2>

            {/* Headline 2 */}
            <h2
              ref={headline2Ref}
              className="-secondary font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.1] max-w-3xl absolute inset-0 flex items-center justify-center opacity-0 will-change-transform"
            >
              Redefining AI from the inside out with{' '}
              <strong className="text-cyber-cyan font-inherit">
                decentralized intelligence
              </strong>{' '}
              and zero-knowledge privacy.
            </h2>
          </div>
        </div>

        {/* Stage 2: 4 Core Identity Pillars Cards (Fanned 3D on Desktop, Stack on Mobile) */}
        <div
          ref={cardsWrapRef}
          className="relative z-10 w-full my-auto py-8"
        >
          {/* Desktop Relative Center Frame */}
          <div className="hidden md:flex relative items-center justify-center h-[420px] w-full">
            {identityPillars.map((pillar, idx) => (
              <div
                key={pillar.id}
                ref={(el) => (cardRefs.current[idx] = el)}
                className="absolute w-[290px] lg:w-[320px] will-change-transform"
                style={{ zIndex: 10 + idx }}
              >
                <ChamferCard
                  chamfer="md"
                  surface="glass"
                  glow={idx === 0 || idx === 3 ? 'orange' : 'indigo'}
                  className="p-7 h-[390px] flex flex-col justify-between group border-white/[0.12] hover:border-cyber-primary/60"
                >
                  <div>
                    {/* Header badge & icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] group-hover:border-cyber-primary/40 transition-colors">
                        {pillarIcons[idx]}
                      </div>
                      <span className="text-xs font-mono font-bold text-cyber-primary border border-cyber-primary/30 px-2.5 py-1 rounded bg-cyber-primary/10">
                        {pillar.id}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-cyber-text-muted uppercase tracking-wider mb-2">
                      {pillar.badge}
                    </div>

                    <h3 className="font-display text-2xl font-semibold text-white group-hover:text-cyber-primary transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="mt-4 text-sm text-cyber-text-secondary font-mono leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-cyber-text-muted group-hover:text-white transition-colors">
                    <span>Autonomous Enclave</span>
                    <ArrowRight className="w-4 h-4 text-cyber-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </ChamferCard>
              </div>
            ))}
          </div>

          {/* Mobile Fallback: Smooth vertical stack without scroll trap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:hidden">
            {identityPillars.map((pillar, idx) => (
              <ChamferCard
                key={`mobile-${pillar.id}`}
                chamfer="md"
                surface="glass"
                glow="orange"
                className="p-6 group border-white/[0.12]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                    {pillarIcons[idx]}
                  </div>
                  <span className="text-xs font-mono font-bold text-cyber-primary border border-cyber-primary/30 px-2 py-0.5 rounded bg-cyber-primary/10">
                    {pillar.id}
                  </span>
                </div>

                <div className="text-[1.1rem] font-mono text-cyber-text-muted uppercase tracking-wider mb-1">
                  {pillar.badge}
                </div>

                <h3 className="font-display text-xl font-medium text-white mb-2 group-hover:text-cyber-primary transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-sm text-cyber-text-secondary font-mono leading-relaxed">
                  {pillar.description}
                </p>
              </ChamferCard>
            ))}
          </div>
        </div>

        {/* Bottom Summary Text */}
        <div className="relative z-10 w-full text-center max-w-2xl mx-auto pb-4">
          <p className="text-xs sm:text-sm font-mono text-cyber-text-muted">
            Cybergenix unifies four foundational intelligence pillars into a single cohesive ecosystem.
            Eliminate the trade-off between AI capability and enterprise security.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShowCaseSection;
