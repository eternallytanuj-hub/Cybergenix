import React from 'react';
import { leadership } from '../../data/cybergenixData';
import { ChamferCard } from '../common/ChamferCard';
import { ArrowUpRight, ShieldCheck, Cpu } from 'lucide-react';

export const LeadershipSection: React.FC = () => {
  return (
    <section
      id="leadership"
      data-leadership=""
      className="LeadershipSection relative py-28 md:py-36 border-y border-white/[0.08] bg-cyber-surface-0 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle,rgba(248,92,58,0.06)_0%,rgba(90,102,238,0.03)_50%,transparent_75%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mb-16 md:mb-20">
          <div className="Caption inline-flex items-center gap-2 mb-3">
            <span className="decoration">/ </span>
            <span>Executive Leadership &amp; Founders</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.05]">
            Pioneering the intersection of{' '}
            <strong className="text-cyber-primary font-inherit">
              artificial intelligence and cyber defense.
            </strong>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-cyber-text-secondary font-mono leading-relaxed max-w-3xl">
            Founded by security architects and machine learning engineers dedicated to building sovereign,
            zero-knowledge autonomous intelligence for the modern enterprise.
          </p>
        </div>

        {/* Executive Leadership Grid (DKM & PS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {leadership.map((leader) => {
            const isFounder = leader.initials === 'DKM';
            return (
              <ChamferCard
                key={leader.initials}
                chamfer="lg"
                surface="glass"
                glow={isFounder ? 'orange' : 'indigo'}
                className="p-8 sm:p-10 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                <div>
                  {/* Top Badge & Status Row */}
                  <div className="flex items-center justify-between mb-8">
                    {/* Initials Emblem Monogram */}
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 rounded-2xl border flex items-center justify-center font-display text-2xl font-bold transition-all duration-300 group-hover:scale-105 ${
                          isFounder
                            ? 'bg-cyber-primary/15 border-cyber-primary/40 text-cyber-primary shadow-glow-primary'
                            : 'bg-cyber-indigo/15 border-cyber-indigo/40 text-cyber-indigo shadow-glow-indigo'
                        }`}
                      >
                        {leader.initials}
                      </div>
                      <div>
                        <div className="font-display text-2xl font-bold text-white tracking-tight group-hover:text-cyber-primary transition-colors">
                          {leader.name}
                        </div>
                        <div className="text-xs font-mono text-cyber-primary font-semibold tracking-wider uppercase mt-0.5">
                          {leader.title}
                        </div>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-cyber-text-muted">
                      {isFounder ? (
                        <Cpu className="w-5 h-5 text-cyber-primary" />
                      ) : (
                        <ShieldCheck className="w-5 h-5 text-cyber-indigo" />
                      )}
                    </div>
                  </div>

                  {/* Bio Content */}
                  <p className="text-sm sm:text-base font-mono text-cyber-text-silver leading-relaxed mb-8">
                    {leader.bio}
                  </p>
                </div>

                {/* Card Bottom: Role tags & LinkedIn Connection */}
                <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[1.0rem] font-mono px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.08] text-cyber-text-muted uppercase">
                      {isFounder ? 'AI Innovation' : 'Global Operations'}
                    </span>
                    <span className="text-[1.0rem] font-mono px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.08] text-cyber-text-muted uppercase">
                      Executive Board
                    </span>
                  </div>

                  <a
                    href={leader.linkedinUrl || 'https://linkedin.com/company/cybergenix-security'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-cyber-text-muted hover:text-white transition-colors group/link"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyber-primary transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </ChamferCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
