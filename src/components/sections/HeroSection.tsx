import React, { useRef, useEffect } from 'react';
import { CtaButton } from '../common/CtaButton';
import { SplitText } from '../common/SplitText';
import { companyInfo } from '../../data/cybergenixData';
import { gsap } from '../../utils/gsapConfig';
import { ArrowUpRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const topBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !topBlockRef.current) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
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
            end: '60% top',
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
      className="HeroSection relative min-h-screen pt-40 md:pt-52 pb-24 md:pb-40 overflow-hidden flex flex-col justify-center items-center bg-black"
    >
      {/* Subtle organic ambient gradient glow behind text */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70rem] h-[40rem] bg-gradient-to-tr from-[#f85c3a]/10 via-[#dc36c3]/5 to-transparent blur-[140px] pointer-events-none rounded-full" />

      {/* Main Top Block: Exact KZero Typography & Layout */}
      <div
        ref={topBlockRef}
        className="top relative z-10 max-w-5xl mx-auto px-6 w-full text-center flex flex-col items-center will-change-transform"
      >
        {/* Caption */}
        <div className="caption mb-6 sm:mb-8 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#f85c3a]">
          <span>/ Autonomous AI Systems</span>
        </div>

        {/* H1 Main Headline matching kzero's exact headline structure */}
        <div className="header max-w-4xl">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[7.6rem] font-medium leading-[1.04] tracking-[-0.03em] text-white">
            <SplitText
              as="span"
              type="chars"
              highlightWords={['engineered', 'secure.']}
              highlightClassName="text-[#f85c3a] font-inherit"
              stagger={0.25}
            >
              Human-first AI, engineered secure.
            </SplitText>
          </h1>
        </div>

        {/* Description Lede */}
        <div className="text mt-8 max-w-2xl">
          <p className="text-base sm:text-lg md:text-xl text-[#f2f2f2]/70 font-mono leading-relaxed uppercase tracking-wider">
            {companyInfo.coreMission}. Self-learning, privacy-preserving, and built on decentralized zero-knowledge architecture.
          </p>
        </div>

        {/* Action Buttons matching KZero's primary & secondary pill CTA styles */}
        <div className="actions mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <CtaButton
            href="#schedule-a-meeting"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          >
            Get a demo
          </CtaButton>
          <CtaButton
            href={companyInfo.socialLinks.loginUrl}
            target="_blank"
            variant="transparent"
            size="lg"
            className="w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <span>NIVA Login</span>
            <ArrowUpRight className="w-4 h-4 ml-1 opacity-70" />
          </CtaButton>
        </div>

        {/* Clean Meta Highlights */}
        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-8 text-xs font-mono uppercase tracking-widest text-[#f2f2f2]/50">
          <span>01 / Self-learning AI</span>
          <span>02 / Digital twin</span>
          <span>03 / System intelligence</span>
          <span>04 / Cybersecurity-first</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
