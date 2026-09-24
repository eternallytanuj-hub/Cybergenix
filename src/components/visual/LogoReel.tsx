import React from 'react';
import { partners } from '../../data/cybergenixData';
import { PartnerCategory } from '../../types';
import {
  GraduationCap,
  Building2,
  Cpu,
  Terminal,
  Globe,
} from 'lucide-react';

export const LogoReel: React.FC = () => {
  // Category icon mapping
  const getCategoryIcon = (category: PartnerCategory) => {
    switch (category) {
      case 'government':
        return <Building2 className="w-3.5 h-3.5 text-cyber-primary" />;
      case 'academic':
        return <GraduationCap className="w-3.5 h-3.5 text-cyber-cyan" />;
      case 'tech':
        return <Cpu className="w-3.5 h-3.5 text-purple-400" />;
      case 'cyber':
        return <Terminal className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  // Category badge accent styling
  const getCategoryBadgeClass = (category: PartnerCategory) => {
    switch (category) {
      case 'government':
        return 'text-cyber-primary border-cyber-primary/30 bg-cyber-primary/10';
      case 'academic':
        return 'text-cyber-cyan border-cyber-cyan/30 bg-cyber-cyan/10';
      case 'tech':
        return 'text-purple-400 border-purple-400/30 bg-purple-400/10';
      case 'cyber':
        return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10';
      default:
        return 'text-amber-400 border-amber-400/30 bg-amber-400/10';
    }
  };

  // Split partners into two tracks for visual richness
  const row1 = partners.slice(0, 9);
  const row2 = partners.slice(9, 18);

  return (
    <section
      id="partners"
      data-logoreel=""
      className="LogoReelSection py-20 md:py-28 border-y border-white/[0.08] bg-cyber-surface-1 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(248,92,58,0.15),transparent_70%)]" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-10">
        <div className="Caption -center inline-flex items-center gap-2 mb-3">
          <span className="decoration">/ </span>
          <span>Institutional Recognition &amp; Partners</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight metal max-w-4xl mx-auto leading-tight">
          Recognized by 18 Leading Institutions, Governments &amp; Tech Giants
        </h2>
        <p className="mt-4 text-xs sm:text-sm font-mono text-cyber-text-secondary max-w-2xl mx-auto">
          Backed by India's premier governmental bodies, Tier-1 academic incubators, and global cyber defense communities.
        </p>
      </div>

      {/* Edge gradient fade masks for smooth infinite appearance */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-20"
        aria-hidden="true"
      />

      {/* Marquee Track 1 (Left to Right / Fast) */}
      <div className="relative w-full overflow-hidden flex whitespace-nowrap mb-5">
        <div className="flex gap-6 items-center animate-marquee will-change-transform py-2 hover:[animation-play-state:paused]">
          {[...row1, ...row1, ...row1].map((partner, i) => (
            <div
              key={`row1-${partner.id}-${i}`}
              className="group flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.025] hover:bg-white/[0.06] border border-white/[0.08] hover:border-cyber-primary/40 transition-all duration-300 flex-shrink-0 cursor-default shadow-sm"
              aria-hidden={i >= row1.length ? 'true' : undefined}
            >
              <div className="p-1.5 rounded-full bg-white/[0.04] group-hover:scale-110 transition-transform">
                {getCategoryIcon(partner.category)}
              </div>
              <span className="font-display text-sm font-medium text-white group-hover:text-cyber-primary transition-colors">
                {partner.name}
              </span>
              <span
                className={`text-[1.0rem] font-mono px-2 py-0.5 rounded border uppercase tracking-wider ${getCategoryBadgeClass(
                  partner.category
                )}`}
              >
                {partner.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Track 2 (Right to Left or Offset Loop) */}
      <div className="relative w-full overflow-hidden flex whitespace-nowrap">
        <div
          className="flex gap-6 items-center will-change-transform py-2 hover:[animation-play-state:paused]"
          style={{
            animation: 'reel 45s linear infinite reverse',
          }}
        >
          {[...row2, ...row2, ...row2].map((partner, i) => (
            <div
              key={`row2-${partner.id}-${i}`}
              className="group flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.025] hover:bg-white/[0.06] border border-white/[0.08] hover:border-cyber-cyan/40 transition-all duration-300 flex-shrink-0 cursor-default shadow-sm"
              aria-hidden={i >= row2.length ? 'true' : undefined}
            >
              <div className="p-1.5 rounded-full bg-white/[0.04] group-hover:scale-110 transition-transform">
                {getCategoryIcon(partner.category)}
              </div>
              <span className="font-display text-sm font-medium text-white group-hover:text-cyber-cyan transition-colors">
                {partner.name}
              </span>
              <span
                className={`text-[1.0rem] font-mono px-2 py-0.5 rounded border uppercase tracking-wider ${getCategoryBadgeClass(
                  partner.category
                )}`}
              >
                {partner.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Ledger Footer */}
      <div className="max-w-5xl mx-auto px-6 mt-10 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-cyber-text-muted">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyber-primary" />
          <span>Government &amp; Startup India (4)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyber-cyan" />
          <span>Academic &amp; Incubators (5)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400" />
          <span>Tech Giants &amp; Programs (3)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Cybersecurity &amp; Communities (5)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>Enterprise Partners (1)</span>
        </div>
      </div>
    </section>
  );
};

export default LogoReel;
