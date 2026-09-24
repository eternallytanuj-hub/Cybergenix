import React from 'react';
import { faqs } from '../../data/cybergenixData';

export const FaqSection: React.FC = () => {
  const handleSummaryClick = (targetIndex: number) => {
    // Cross-browser guarantee for exclusive accordion behavior
    const allDetails = document.querySelectorAll('.FaqSection details[name="faq"]');
    allDetails.forEach((d, idx) => {
      if (idx !== targetIndex) {
        d.removeAttribute('open');
      }
    });
  };

  return (
    <section
      id="faq"
      data-faq=""
      className="FaqSection -bg relative py-28 md:py-36 px-4 sm:px-6 overflow-hidden"
    >
      {/* Ambient purple/indigo glow behind the FAQ accordion (per kzero spec) */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[450px] bg-[radial-gradient(75%_55%_at_50%_0%,rgba(96,40,110,0.32),transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="Caption -center inline-flex items-center gap-2 mb-3">
            <span className="decoration">/ </span>
            <span>Common Inquiries &amp; Architecture</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.05]">
            Frequently Asked{' '}
            <strong className="text-cyber-primary font-inherit">Questions</strong>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-cyber-text-secondary font-mono leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about our sovereign AI architecture, zero-knowledge security,
            operating system integration, and rapid enterprise deployment.
          </p>
        </div>

        {/* Semantic Exclusive <details name="faq"> Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={faq.id || idx}
              name="faq"
              className="group rounded-2xl border border-white/[0.08] bg-cyber-surface-1/90 backdrop-blur-card p-6 sm:p-8 transition-all duration-300 open:border-cyber-primary/40 open:bg-cyber-surface-2/95 open:shadow-glow-primary"
            >
              <summary
                onClick={() => handleSummaryClick(idx)}
                className="flex items-center justify-between cursor-pointer font-display text-lg sm:text-xl font-semibold text-white list-none select-none group-hover:text-cyber-primary transition-colors focus:outline-none"
              >
                <span className="pr-4 leading-snug">{faq.question}</span>

                {/* Rotating SVG Plus-to-Minus Indicator */}
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-cyber-primary group-open:bg-cyber-primary/10 group-open:border-cyber-primary/30 transition-colors">
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-open:rotate-90"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    {/* Horizontal bar: stays to form the minus '-' */}
                    <line x1="5" y1="12" x2="19" y2="12" />
                    {/* Vertical bar: collapses on open, turning '+' into '-' */}
                    <line
                      x1="12"
                      y1="5"
                      x2="12"
                      y2="19"
                      className="transition-all duration-200 group-open:opacity-0 group-open:scale-0 origin-center"
                    />
                  </svg>
                </span>
              </summary>

              <div className="mt-5 text-sm sm:text-base font-mono text-cyber-text-silver leading-relaxed pt-5 border-t border-white/[0.08]">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
