import React from 'react';
import { solutionModules } from '../../data/cybergenixData';

export const HowItWorksSection: React.FC = () => {
  return (
    <section
      id="solution"
      data-howitworks=""
      className="HowItWorksSection relative py-28 md:py-36 px-6 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="max-w-4xl mb-20">
        <div className="caption mb-4 text-xs font-mono uppercase tracking-[0.25em] text-[#f85c3a]">
          <span>/ The Solution — NIVA Architecture</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-medium text-white tracking-[-0.03em] leading-[1.08]">
          A revolutionary neural ecosystem <br />
          <span className="text-[#f85c3a]">
            designed to transcend traditional AI.
          </span>
        </h2>

        <p className="mt-6 text-base sm:text-lg text-[#f2f2f2]/70 font-mono uppercase tracking-wider leading-relaxed max-w-3xl">
          NIVA merges open-source reasoning models with decentralized continuous learning, voice-vision perception, and zero-knowledge privacy.
        </p>
      </div>

      {/* 6 Clean Columns / Grid with zero artificial boxes or chamfers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pt-8 border-t border-white/[0.08]">
        {solutionModules.map((mod) => (
          <div key={mod.id} className="flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs font-mono text-[#f85c3a] uppercase tracking-widest mb-3">
                Layer 0{mod.id} / System Component
              </div>
              <h3 className="font-display text-2xl font-medium text-white mb-2">
                {mod.title}
              </h3>
              <p className="text-sm font-mono text-[#f2f2f2]/70 uppercase leading-relaxed tracking-wide">
                {mod.description}
              </p>
            </div>
            <div className="w-8 h-[1px] bg-white/20 mt-4" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
