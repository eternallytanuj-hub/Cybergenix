import React from 'react';
import { pricingTiers } from '../../data/cybergenixData';
import { CtaButton } from '../common/CtaButton';

export const BenefitsSection: React.FC = () => {
  return (
    <section
      id="pricing"
      data-benefits=""
      className="BenefitsSection relative py-28 md:py-36 px-6 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="max-w-4xl mb-20">
        <div className="caption mb-4 text-xs font-mono uppercase tracking-[0.25em] text-[#f85c3a]">
          <span>/ Transparent Pricing</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-medium text-white tracking-[-0.03em] leading-[1.08]">
          Predictable investment built for <br />
          <span className="text-[#f85c3a]">
            rapid organizational deployment.
          </span>
        </h2>

        <p className="mt-6 text-base sm:text-lg text-[#f2f2f2]/70 font-mono uppercase tracking-wider leading-relaxed max-w-3xl">
          Choose the tier tailored to your organizational scale. All plans feature end-to-end zero-knowledge encryption and dedicated support.
        </p>
      </div>

      {/* Clean 3-Tier Minimalist Columns matching KZero */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8 border-t border-white/[0.08]">
        {pricingTiers.map((tier) => (
          <div key={tier.id} className="flex flex-col justify-between space-y-8">
            <div>
              <div className="text-xs font-mono text-[#f85c3a] uppercase tracking-widest mb-3">
                {tier.popular ? '★ Most Popular' : 'Deployment Tier'}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-white mb-2">
                {tier.name}
              </h3>
              <div className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight my-4">
                {tier.price}
              </div>
              <p className="text-xs sm:text-sm font-mono text-[#f2f2f2]/60 uppercase tracking-wide leading-relaxed mb-6">
                {tier.targetAudience}
              </p>

              {/* Clean feature list without bulky SVG icons */}
              <ul className="space-y-3 pt-6 border-t border-white/[0.06] text-xs font-mono uppercase tracking-wide text-[#f2f2f2]/80">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#f85c3a]">—</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-white/[0.08]">
              <CtaButton
                href="#schedule-a-meeting"
                variant={tier.popular ? 'primary' : 'transparent'}
                size="full"
              >
                {tier.ctaText}
              </CtaButton>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
