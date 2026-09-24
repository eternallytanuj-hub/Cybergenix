import React from 'react';
import { pricingTiers } from '../../data/cybergenixData';
import { ChamferCard } from '../common/ChamferCard';
import { CtaButton } from '../common/CtaButton';
import {
  Sparkles,
  Bot,
  ShieldCheck,
} from 'lucide-react';

interface FeatureComparisonRow {
  name: string;
  category: string;
  plan1: boolean | string;
  plan2: boolean | string;
  plan3: boolean | string;
  tooltip?: string;
}

const COMPARISON_ROWS: FeatureComparisonRow[] = [
  {
    name: 'System-Level AI Assistant (OS-Level)',
    category: 'Core Intelligence',
    plan1: true,
    plan2: true,
    plan3: true,
  },
  {
    name: 'Voice & Context-Based OS Commands',
    category: 'Core Intelligence',
    plan1: true,
    plan2: true,
    plan3: true,
  },
  {
    name: 'Customized AI Avatar Persona',
    category: 'Personalization',
    plan1: true,
    plan2: true,
    plan3: 'Advanced Custom',
  },
  {
    name: 'Customized Voice & Personality Logic',
    category: 'Personalization',
    plan1: true,
    plan2: true,
    plan3: 'Bespoke Logic',
  },
  {
    name: 'Centralized Secure Data Handling',
    category: 'Security & Enclave',
    plan1: true,
    plan2: true,
    plan3: true,
  },
  {
    name: 'Zero-Knowledge Cryptographic Enclave',
    category: 'Security & Enclave',
    plan1: 'Standard ZK',
    plan2: 'Standard ZK',
    plan3: 'Advanced ZK + Air-Gapped',
  },
  {
    name: 'Physical AI Robot Hardware Appliance',
    category: 'Hardware & Edge',
    plan1: false,
    plan2: 'Included (1-Time)',
    plan3: 'Fleet Option',
  },
  {
    name: 'Autonomous Digital Twin Meeting Agent',
    category: 'Autonomy',
    plan1: 'Basic',
    plan2: true,
    plan3: 'Enterprise Multi-Twin',
  },
  {
    name: 'Domain-Specific Custom AI Agents',
    category: 'Autonomy',
    plan1: false,
    plan2: 'Up to 3 Agents',
    plan3: 'Unlimited Custom Agents',
  },
  {
    name: 'Enterprise Integrations (ERP, CRM, SIEM)',
    category: 'Connectivity',
    plan1: 'Standard APIs',
    plan2: '200+ Connectors',
    plan3: 'Full Custom ERP/SIEM',
  },
  {
    name: 'On-Site & Remote Deployment Support',
    category: 'Support & SLAs',
    plan1: 'Remote Only',
    plan2: 'On-site & Remote',
    plan3: 'Dedicated On-Site Team',
  },
  {
    name: 'Free Maintenance & SaaS Updates',
    category: 'Support & SLAs',
    plan1: '3 Months',
    plan2: '3 Mo. Maint. + 2 Yrs SaaS',
    plan3: 'Custom Long-Term SLA',
  },
  {
    name: 'Dedicated Technical Team & 24/7 SLA',
    category: 'Support & SLAs',
    plan1: 'Business Hours',
    plan2: '24/7 Technical Support',
    plan3: 'Dedicated Engineering Pod',
  },
];

export const BenefitsSection: React.FC = () => {
  return (
    <section
      id="pricing"
      data-benefits=""
      className="BenefitsSection relative py-28 md:py-36 border-y border-white/[0.08] bg-cyber-surface-0 px-4 sm:px-6 overflow-hidden"
    >
      {/* SVG Definitions for Glowing Gradient Checkmark (#tick) */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="tickGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f85c3a" />
            <stop offset="60%" stopColor="#ff7454" />
            <stop offset="100%" stopColor="#5a66ee" />
          </linearGradient>
        </defs>
      </svg>

      {/* Background ambient radial glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(248,92,58,0.06)_0%,rgba(90,102,238,0.03)_50%,transparent_75%)] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mb-16 md:mb-20">
          <div className="Caption inline-flex items-center gap-2 mb-3">
            <span className="decoration">/ </span>
            <span>Transparent Investment &amp; Deployment Plans</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.05]">
            Predictable, transparent pricing built for{' '}
            <strong className="text-cyber-primary font-inherit">
              rapid deployment.
            </strong>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-cyber-text-secondary font-mono leading-relaxed max-w-3xl">
            Choose the tier tailored to your organizational scale. From high-velocity cloud SaaS to physical robotics
            and bespoke air-gapped enterprise architectures, all plans feature zero-knowledge encryption.
          </p>
        </div>

        {/* 3 Tiered Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {pricingTiers.map((tier) => {
            const isPopular = tier.popular === true;
            return (
              <ChamferCard
                key={tier.id}
                chamfer="lg"
                surface={isPopular ? 'glass' : 'surface-1'}
                glow={isPopular ? 'orange' : false}
                className={`p-8 sm:p-10 flex flex-col justify-between relative transition-all duration-300 ${
                  isPopular
                    ? 'border-cyber-primary shadow-glow-primary scale-[1.02] bg-cyber-surface-1/90'
                    : 'border-white/[0.08] hover:border-white/20'
                }`}
              >
                {/* Popular Banner */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyber-primary text-white text-[1.0rem] font-mono font-bold uppercase tracking-widest shadow-glow-primary flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-cyber-primary uppercase tracking-wider font-semibold">
                      {tier.priceDetail || 'Deployment Tier'}
                    </span>
                    {isPopular && (
                      <span className="p-1.5 rounded-lg bg-cyber-primary/10 text-cyber-primary">
                        <Bot className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-2">
                    {tier.name}
                  </h3>

                  <div className="mb-4">
                    <div className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                      {tier.price}
                    </div>
                    <div className="text-xs font-mono text-cyber-text-muted mt-1">
                      {tier.targetAudience}
                    </div>
                  </div>

                  <p className="text-xs font-mono text-cyber-text-secondary leading-relaxed mb-6 pt-3 border-t border-white/[0.08]">
                    {tier.id === 'saas' &&
                      'Complete autonomous software stack for modern teams seeking direct OS automation and custom avatars.'}
                    {tier.id === 'robot-saas' &&
                      'Combines software autonomy with an intelligent physical AI robot appliance for spatial and facility operations.'}
                    {tier.id === 'enterprise' &&
                      'Dedicated ML engineering pod, proprietary model fine-tuning, and zero-compromise air-gapped deployment.'}
                  </p>

                  {/* Feature Checklist with Gradient Checkmarks */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-mono font-semibold uppercase text-cyber-text-muted tracking-wider">
                      Included Capabilities:
                    </div>
                    {tier.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs font-mono text-cyber-text-silver">
                        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="url(#tickGradient)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/[0.08]">
                  <CtaButton
                    href="#schedule-a-meeting"
                    variant={isPopular ? 'primary' : 'transparent'}
                    size="full"
                  >
                    {tier.ctaText}
                  </CtaButton>
                </div>
              </ChamferCard>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* Full Feature Comparison Matrix Table (kzero channel matrix)  */}
        {/* ============================================================ */}
        <div className="rounded-2xl border border-white/[0.12] bg-cyber-surface-1 overflow-hidden backdrop-blur-card">
          <div className="p-8 border-b border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="Caption inline-flex items-center gap-2 mb-1">
                <span className="decoration">/ </span>
                <span>Specification Breakdown</span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-white">
                Complete Feature &amp; Capability Matrix
              </h3>
              <p className="text-xs font-mono text-cyber-text-muted mt-1">
                Direct side-by-side comparison across all three deployment tiers.
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] text-cyber-text-secondary">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero-Knowledge SLA on All Tiers</span>
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] bg-black/60 text-cyber-text-muted uppercase tracking-wider">
                  <th className="py-4 px-6 w-2/5">Capability / Specification</th>
                  <th className="py-4 px-6 w-1/5 text-center">
                    <div>SaaS Plan</div>
                    <div className="text-white font-bold text-sm mt-0.5">₹50,000</div>
                  </th>
                  <th className="py-4 px-6 w-1/5 text-center bg-cyber-primary/[0.06] border-x border-cyber-primary/20">
                    <div className="text-cyber-primary font-bold">Robot + SaaS</div>
                    <div className="text-white font-bold text-sm mt-0.5">₹1,50,000</div>
                  </th>
                  <th className="py-4 px-6 w-1/5 text-center">
                    <div>Custom Enterprise</div>
                    <div className="text-white font-bold text-sm mt-0.5">On Request</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-cyber-text-secondary">
                {COMPARISON_ROWS.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-medium text-white">{row.name}</div>
                      <div className="text-[1.0rem] text-cyber-text-muted">{row.category}</div>
                    </td>

                    {/* Plan 1 */}
                    <td className="py-4 px-6 text-center">
                      {row.plan1 === true ? (
                        <svg className="w-4 h-4 mx-auto" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="url(#tickGradient)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : row.plan1 === false ? (
                        <span className="w-4 h-0.5 bg-white/20 inline-block" />
                      ) : (
                        <span className="text-white font-medium">{row.plan1}</span>
                      )}
                    </td>

                    {/* Plan 2 (Highlighted column) */}
                    <td className="py-4 px-6 text-center bg-cyber-primary/[0.04] border-x border-cyber-primary/20">
                      {row.plan2 === true ? (
                        <svg className="w-4 h-4 mx-auto" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="url(#tickGradient)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : row.plan2 === false ? (
                        <span className="w-4 h-0.5 bg-white/20 inline-block" />
                      ) : (
                        <span className="text-cyber-primary font-semibold">{row.plan2}</span>
                      )}
                    </td>

                    {/* Plan 3 */}
                    <td className="py-4 px-6 text-center">
                      {row.plan3 === true ? (
                        <svg className="w-4 h-4 mx-auto" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="url(#tickGradient)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : row.plan3 === false ? (
                        <span className="w-4 h-0.5 bg-white/20 inline-block" />
                      ) : (
                        <span className="text-white font-medium">{row.plan3}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Matrix Bottom Action Strip */}
          <div className="p-6 border-t border-white/[0.08] bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="text-cyber-text-muted">
              Need custom volume licensing or physical robot proof-of-concept?
            </div>
            <CtaButton href="#schedule-a-meeting" variant="primary" size="sm">
              Schedule Custom Evaluation
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
