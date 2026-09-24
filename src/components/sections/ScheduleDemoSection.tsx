import React, { useState } from 'react';
import { CtaButton } from '../common/CtaButton';
import { CheckCircle2, ShieldCheck, Sparkles, Send } from 'lucide-react';

const SECTOR_OPTIONS = [
  'Enterprise SaaS',
  'AI Robotics',
  'Custom AI',
  'Academic / Gov',
  'Other',
];

export const ScheduleDemoSection: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>('Enterprise SaaS');
  const [otherValue, setOtherValue] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    company: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section
      id="schedule-a-meeting"
      data-scheduledemo=""
      data-navbar-inverse=""
      className="ScheduleDemoSection -inverse py-28 md:py-36 px-4 sm:px-6 bg-cyber-inverse-bg text-black transition-colors relative overflow-hidden"
    >
      {/* Subtle background ambient graphic */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(248,92,58,0.12)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-16">
          <div className="Caption -center inline-flex items-center gap-2 mb-3 text-cyber-primary font-bold">
            <span className="decoration">/ </span>
            <span>Schedule an AI Consultation</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold text-black tracking-tight leading-[1.05]">
            Ready to Deploy{' '}
            <strong className="text-cyber-primary font-inherit">
              Autonomous, Secure AI?
            </strong>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-700 font-mono leading-relaxed max-w-2xl mx-auto">
            Connect directly with our AI architects and security engineers. Tailor a zero-knowledge,
            sovereign intelligence architecture to your organizational requirements.
          </p>
        </div>

        {/* Success Feedback Notification Card */}
        {isSubmitted ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-black/10 shadow-2xl text-center max-w-2xl mx-auto animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-black mb-3">
              Consultation Request Received
            </h3>

            <p className="text-sm sm:text-base font-mono text-neutral-600 leading-relaxed mb-6">
              Thank you, <strong className="text-black">{formData.first_name || 'Partner'}</strong>.
              Our solutions team has logged your deployment request for{' '}
              <strong className="text-cyber-primary">{formData.company || selectedSector}</strong>.
              An AI architect will reach out within 24 hours.
            </p>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-mono text-neutral-600 mb-8 max-w-md mx-auto flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Zero-knowledge NDA and security protocol applied.</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  first_name: '',
                  last_name: '',
                  company: '',
                  email: '',
                  phone: '',
                });
                setOtherValue('');
              }}
              className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider bg-black text-white hover:bg-cyber-primary transition-colors"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          /* Multi-field Consultation Booking Form with HTML5 Validation Constraints */
          <form
            onSubmit={handleSubmit}
            noValidate={false}
            className="p-8 sm:p-12 rounded-3xl bg-white border border-black/10 shadow-xl space-y-7 font-mono text-sm"
          >
            {/* Row 1: Name Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-700 font-bold mb-2">
                  First Name <span className="text-cyber-primary">*</span>
                </label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="First name"
                  required
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-black/15 bg-neutral-50/50 text-black placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-cyber-primary focus:ring-2 focus:ring-cyber-primary/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-700 font-bold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-black/15 bg-neutral-50/50 text-black placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-cyber-primary focus:ring-2 focus:ring-cyber-primary/20 transition-all"
                />
              </div>
            </div>

            {/* Row 2: Company */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-700 font-bold mb-2">
                Company / Organization Name <span className="text-cyber-primary">*</span>
              </label>
              <input
                type="text"
                name="company"
                placeholder="Enterprise or organization name"
                required
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 rounded-xl border border-black/15 bg-neutral-50/50 text-black placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-cyber-primary focus:ring-2 focus:ring-cyber-primary/20 transition-all"
              />
            </div>

            {/* Row 3: Deployment Type / Sector Pills */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-700 font-bold mb-2.5">
                Primary Deployment Focus:
              </label>
              <div className="flex flex-wrap gap-2.5">
                {SECTOR_OPTIONS.map((sector) => {
                  const isSelected = selectedSector === sector;
                  return (
                    <button
                      key={sector}
                      type="button"
                      onClick={() => setSelectedSector(sector)}
                      className={`pill px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all select-none border ${
                        isSelected
                          ? 'bg-cyber-primary text-white border-cyber-primary font-bold shadow-glow-primary scale-105'
                          : 'bg-neutral-50 text-neutral-700 border-black/15 hover:border-black/40 hover:bg-neutral-100'
                      }`}
                      aria-pressed={isSelected}
                    >
                      {sector}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic reveal for Other specification */}
              {selectedSector === 'Other' && (
                <div className="mt-3.5 animate-fade-in">
                  <input
                    type="text"
                    name="other"
                    placeholder="Please specify your particular architecture or operational requirements"
                    value={otherValue}
                    onChange={(e) => setOtherValue(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/15 bg-neutral-50 text-black placeholder-neutral-400 focus:outline-none focus:border-cyber-primary focus:ring-2 focus:ring-cyber-primary/20 transition-all"
                  />
                </div>
              )}
            </div>

            {/* Row 4: Email & Phone Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-700 font-bold mb-2">
                  Business Email <span className="text-cyber-primary">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="executive@enterprise.com"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-black/15 bg-neutral-50/50 text-black placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-cyber-primary focus:ring-2 focus:ring-cyber-primary/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-700 font-bold mb-2">
                  Phone Number <span className="text-cyber-primary">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 88603 53427"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-black/15 bg-neutral-50/50 text-black placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-cyber-primary focus:ring-2 focus:ring-cyber-primary/20 transition-all"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-3">
              <CtaButton
                type="submit"
                variant="primary"
                size="lg"
                className="w-full justify-center"
                icon={<Send className="w-4 h-4" />}
              >
                Request AI Consultation
              </CtaButton>
            </div>

            {/* Compliance & Privacy Footer Notice */}
            <div className="flex items-center justify-center gap-2 pt-2 text-center text-xs text-neutral-500 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyber-primary flex-shrink-0" />
              <span>
                Protected by reCAPTCHA and the Cybergenix Zero-Knowledge Security Policy and Terms apply.
              </span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default ScheduleDemoSection;
