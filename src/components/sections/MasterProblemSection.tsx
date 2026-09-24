import React from 'react';

export const MasterProblemSection: React.FC = () => {
  const problems = [
    {
      num: '01',
      title: 'Shallow Understanding',
      desc: 'Current AI lacks deep contextual awareness and meaningful comprehension across continuous workflows.',
    },
    {
      num: '02',
      title: 'Text-Only Interaction',
      desc: 'Limited interfaces create impersonal, disconnected experiences separated from actual desktop and operational systems.',
    },
    {
      num: '03',
      title: 'Emotional Disconnect',
      desc: 'No empathy, perception, or emotional intelligence in everyday human–AI interaction and decision support.',
    },
    {
      num: '04',
      title: 'Critical Security Risks',
      desc: 'Centralized AI systems harvest prompts and expose enterprise crown jewels to public leaks and cloud vulnerabilities.',
    },
  ];

  return (
    <section
      id="problem"
      data-masterproblem=""
      className="MasterProblemSection relative py-28 md:py-36 px-6 max-w-7xl mx-auto"
    >
      <div className="max-w-4xl mb-20">
        <div className="caption mb-4 text-xs font-mono uppercase tracking-[0.25em] text-[#f85c3a]">
          <span>/ The Problem</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-medium text-white tracking-[-0.03em] leading-[1.08]">
          Current AI is broken. <br />
          <span className="text-[#f85c3a]">
            Centralized models compromise security.
          </span>
        </h2>

        <p className="mt-6 text-base sm:text-lg text-[#f2f2f2]/70 font-mono uppercase tracking-wider leading-relaxed max-w-2xl">
          We identify four critical failures across today's artificial intelligence landscape that leave enterprises and users exposed.
        </p>
      </div>

      {/* Clean Minimalist Problem Grid matching KZero */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-white/[0.08]">
        {problems.map((prob) => (
          <div key={prob.num} className="flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs font-mono text-[#f85c3a] uppercase tracking-widest mb-3">
                {prob.num} / Vulnerability
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-medium text-white mb-2">
                {prob.title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-[#f2f2f2]/70 uppercase leading-relaxed tracking-wide">
                {prob.desc}
              </p>
            </div>
            <div className="w-8 h-[1px] bg-white/20 mt-4" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MasterProblemSection;
