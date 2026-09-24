import React from 'react';
import { testimonials } from '../../data/cybergenixData';
import { ChamferCard } from '../common/ChamferCard';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="testimonials"
      data-testimonials=""
      className="TestimonialsSection relative py-28 md:py-36 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background ambient glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(248,92,58,0.05)_0%,rgba(90,102,238,0.03)_50%,transparent_75%)] blur-3xl"
        aria-hidden="true"
      />

      {/* Header Container */}
      <div className="max-w-4xl mb-16 md:mb-20 relative z-10">
        <div className="Caption inline-flex items-center gap-2 mb-3">
          <span className="decoration">/ </span>
          <span>Verified Client Impact &amp; Social Proof</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.05]">
          Validated by leaders across{' '}
          <strong className="text-cyber-primary font-inherit">
            SaaS, enterprise, and cybersecurity.
          </strong>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-cyber-text-secondary font-mono leading-relaxed max-w-3xl">
          Real feedback from engineering leads, security consultants, and enterprise product managers
          deploying Cybergenix NIVA across their production environments.
        </p>
      </div>

      {/* 6 Authentic Testimonials in Frosted Glassmorphism Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10">
        {testimonials.map((t, idx) => (
          <ChamferCard
            key={t.id || idx}
            chamfer="md"
            surface="glass"
            glow={idx % 2 === 0 ? 'orange' : 'indigo'}
            className="p-8 sm:p-9 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
          >
            {/* Top row with quote mark and client badge */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-cyber-primary group-hover:scale-110 transition-transform">
                  <Quote className="w-4 h-4" />
                </div>
                <span className="text-[1.0rem] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-cyber-text-muted">
                  Quote {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Quote Body */}
              <blockquote className="text-sm sm:text-base font-mono text-cyber-text-silver leading-relaxed italic mb-8">
                "{t.quote}"
              </blockquote>
            </div>

            {/* Author Attribution Footer */}
            <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between">
              <div>
                <div className="font-display text-base font-semibold text-white tracking-wide group-hover:text-cyber-primary transition-colors">
                  {t.role}
                </div>
                <div className="text-xs font-mono text-cyber-primary font-medium mt-0.5">
                  {t.clientType}
                </div>
              </div>

              <div className="w-2 h-2 rounded-full bg-cyber-primary/40 group-hover:bg-cyber-primary group-hover:shadow-glow-primary transition-all" />
            </div>
          </ChamferCard>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
