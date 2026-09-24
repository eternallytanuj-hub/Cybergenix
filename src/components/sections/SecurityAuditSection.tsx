import React, { useState } from 'react';
import { capabilities } from '../../data/cybergenixData';

export const SecurityAuditSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'capabilities' | 'security'>('capabilities');

  return (
    <section
      id="features"
      data-securityaudit=""
      className="SecurityAuditSection relative py-28 md:py-36 px-6 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="max-w-4xl mb-16">
        <div className="caption mb-4 text-xs font-mono uppercase tracking-[0.25em] text-[#f85c3a]">
          <span>/ Enterprise Capabilities</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-medium text-white tracking-[-0.03em] leading-[1.08]">
          Deep system intelligence and <br />
          <span className="text-[#f85c3a]">
            zero-knowledge cryptographic security.
          </span>
        </h2>

        <p className="mt-6 text-base sm:text-lg text-[#f2f2f2]/70 font-mono uppercase tracking-wider leading-relaxed max-w-3xl">
          Control applications, files, and multi-app workflows via voice and proactive context with native operating system hooks.
        </p>
      </div>

      {/* Clean Pill Tab Switcher */}
      <div className="flex items-center gap-4 mb-16 border-b border-white/[0.08] pb-6">
        <button
          type="button"
          onClick={() => setActiveTab('capabilities')}
          className={`text-xs font-mono uppercase tracking-[0.16em] transition-colors ${
            activeTab === 'capabilities'
              ? 'text-[#f85c3a] border-b-2 border-[#f85c3a] pb-2'
              : 'text-[#f2f2f2]/50 hover:text-white pb-2'
          }`}
        >
          01 / Powerful Features
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={`text-xs font-mono uppercase tracking-[0.16em] transition-colors ${
            activeTab === 'security'
              ? 'text-[#f85c3a] border-b-2 border-[#f85c3a] pb-2'
              : 'text-[#f2f2f2]/50 hover:text-white pb-2'
          }`}
        >
          02 / Zero-Knowledge Architecture
        </button>
      </div>

      {/* Grid of Capabilities without chamfers or shadows */}
      {activeTab === 'capabilities' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {capabilities.map((cap) => (
            <div key={cap.id} className="flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs font-mono text-[#f85c3a] uppercase tracking-widest mb-3">
                  Capability {cap.id}
                </div>
                <h3 className="font-display text-2xl font-medium text-white mb-2">
                  {cap.title}
                </h3>
                <p className="text-sm font-mono text-[#f2f2f2]/70 uppercase leading-relaxed tracking-wide mb-4">
                  {cap.description}
                </p>
                <div className="space-y-1.5 text-xs font-mono uppercase tracking-wider text-[#f2f2f2]/50">
                  {cap.details?.map((detail, idx) => (
                    <div key={idx}>— {detail}</div>
                  ))}
                </div>
              </div>
              <div className="w-8 h-[1px] bg-white/20 mt-4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#f85c3a] uppercase tracking-widest">
              Security Vector 01
            </div>
            <h3 className="font-display text-xl font-medium text-white">
              Client Enclave Isolation
            </h3>
            <p className="text-xs sm:text-sm font-mono text-[#f2f2f2]/70 uppercase leading-relaxed tracking-wide">
              Models run in cryptographically isolated local memory. Prompts and weights never touch third-party cloud servers.
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-mono text-[#f85c3a] uppercase tracking-widest">
              Security Vector 02
            </div>
            <h3 className="font-display text-xl font-medium text-white">
              Zero-Knowledge Verification
            </h3>
            <p className="text-xs sm:text-sm font-mono text-[#f2f2f2]/70 uppercase leading-relaxed tracking-wide">
              zk-SNARKs mathematical proofs guarantee data validity and authentication without revealing secrets or plaintext inputs.
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-mono text-[#f85c3a] uppercase tracking-widest">
              Security Vector 03
            </div>
            <h3 className="font-display text-xl font-medium text-white">
              Regulatory Standards
            </h3>
            <p className="text-xs sm:text-sm font-mono text-[#f2f2f2]/70 uppercase leading-relaxed tracking-wide">
              Engineered to comply with FIPS 140-3, ISO 27001, SOC 2 Type II, and strict data sovereignty directives globally.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default SecurityAuditSection;
