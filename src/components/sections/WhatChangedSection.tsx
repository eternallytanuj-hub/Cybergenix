import React from 'react';

export const WhatChangedSection: React.FC = () => {
  return (
    <section
      id="about"
      data-whatchanged=""
      className="WhatChangedSection relative py-28 md:py-36 px-6 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="max-w-4xl mb-20">
        <div className="caption mb-4 text-xs font-mono uppercase tracking-[0.25em] text-[#f85c3a]">
          <span>/ Who We Are</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-medium text-white tracking-[-0.03em] leading-[1.08]">
          Redefining AI, from the inside out —{' '}
          <span className="text-[#f85c3a]">
            where intelligence meets absolute security.
          </span>
        </h2>

        <p className="mt-6 text-base sm:text-lg text-[#f2f2f2]/70 font-mono uppercase tracking-wider leading-relaxed max-w-3xl">
          Pioneering the future of autonomous AI systems — blending machine learning with cybersecurity.
          Self-learning, privacy-preserving, and built on decentralized zero-knowledge architecture.
        </p>
      </div>

      {/* Clean 2-Column Minimalist Layout matching kzero */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 pt-8 border-t border-white/[0.08]">
        {/* Column 1 */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#f85c3a] mb-3">
              01 & 03 / Autonomous Systems & Research
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-medium text-white mb-4">
              Self-Evolving Cognitive Architecture
            </h3>
            <p className="text-sm font-mono text-[#f2f2f2]/70 leading-relaxed uppercase tracking-wide">
              Intelligent systems that learn, adapt, and evolve without constant human intervention.
              Powered by cutting-edge machine learning and deep-learning research incubated with premier institutions including IIT Ropar, Galgotias, and NVIDIA Inception Program.
            </p>
          </div>
          <div className="pt-6 border-t border-white/[0.05] flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#f2f2f2]/50">
            <span>Autonomy Level 4</span>
            <span>Decentralized Foundation Models</span>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#f85c3a] mb-3">
              02 & 04 / Secure Architecture & Industry Scalability
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-medium text-white mb-4">
              Universal Zero-Knowledge Sovereignty
            </h3>
            <p className="text-sm font-mono text-[#f2f2f2]/70 leading-relaxed uppercase tracking-wide">
              Privacy-first foundation with decentralized infrastructure where data never leaves user control.
              Engineered to transform operational efficiency across healthcare, defense, manufacturing, banking, and government sectors with zero lock-in.
            </p>
          </div>
          <div className="pt-6 border-t border-white/[0.05] flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#f2f2f2]/50">
            <span>Zero-Knowledge Proofs</span>
            <span>100% Data Sovereignty</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatChangedSection;
