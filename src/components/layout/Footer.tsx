import React, { useRef } from 'react';
import { companyInfo } from '../../data/cybergenixData';
import { CtaButton } from '../common/CtaButton';
import { AmbientAura } from '../visual/AmbientAura';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="Footer relative border-t border-white/[0.08] bg-cyber-bg text-cyber-text-primary pt-24 md:pt-32 pb-16 px-4 sm:px-6 overflow-hidden select-none"
    >
      {/* Interactive Pointer-Following Dual Ambient Auras (.aura.-warm, .aura.-cool) */}
      <div className="bg absolute inset-0 pointer-events-none" aria-hidden="true">
        <AmbientAura containerRef={footerRef} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Call to Action Banner matching kzero */}
        <div className="mb-20 md:mb-24 pb-16 md:pb-20 border-b border-white/[0.08]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="Caption inline-flex items-center gap-2 mb-3">
                <span className="decoration">/ </span>
                <span>The Sovereign Frontier</span>
              </div>

              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold text-white tracking-tight leading-[1.02]">
                Leave Attackers With{' '}
                <strong className="text-cyber-primary font-inherit">
                  Nothing to Steal.
                </strong>
              </h2>

              <p className="mt-4 text-base sm:text-lg text-cyber-text-secondary font-mono leading-relaxed max-w-2xl">
                {companyInfo.tagline}. {companyInfo.coreMission}. Deploy sovereign AI on zero-knowledge architecture.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-shrink-0">
              <CtaButton
                href="#schedule-a-meeting"
                variant="primary"
                size="lg"
                icon={<Sparkles className="w-4 h-4" />}
              >
                Schedule AI Consultation
              </CtaButton>

              <CtaButton
                href={companyInfo.socialLinks.loginUrl}
                target="_blank"
                variant="transparent"
                size="lg"
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                NIVA Portal Login
              </CtaButton>
            </div>
          </div>
        </div>

        {/* Multi-Column Mega Links & Company Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          {/* Brand Identity & Mission (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#" className="flex items-center gap-3 group" aria-label="Cybergenix Security">
              <img
                src="/Cybergenix_logo.png"
                alt="Cybergenix Security Logo"
                className="w-9 h-9 object-contain group-hover:scale-105 transition-transform"
              />
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold tracking-wider text-white group-hover:text-cyber-primary transition-colors">
                  CYBERGENIX
                </span>
                <span className="text-xs font-mono tracking-widest text-cyber-primary font-semibold">
                  SECURITY
                </span>
              </div>
            </a>

            <p className="text-sm font-mono text-cyber-text-secondary leading-relaxed max-w-md">
              Pioneering the future of autonomous artificial intelligence systems — blending machine
              learning with zero-knowledge cybersecurity architecture.
            </p>

            {/* Social Network Channels */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase text-cyber-text-muted tracking-wider font-bold">
                Connect on Social Channels
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-cyber-text-secondary">
                <a
                  href={companyInfo.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-cyber-primary/40 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <span>Twitter @Cybergenix</span>
                  <ArrowUpRight className="w-3 h-3 text-cyber-primary" />
                </a>

                <a
                  href={companyInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-cyber-primary/40 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-cyber-primary" />
                </a>

                <a
                  href={companyInfo.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-cyber-primary/40 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3 text-cyber-primary" />
                </a>
              </div>
            </div>

            {/* Security Assurance Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-cyber-text-muted">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>FIPS 140-3 &amp; ISO 27001 Cryptographic Enclaves</span>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-4 font-mono text-xs">
            <div className="uppercase text-white font-bold tracking-wider text-sm font-display">
              Solutions
            </div>
            <ul className="space-y-2.5 text-cyber-text-secondary">
              <li>
                <a href="#showcase" className="hover:text-cyber-primary transition-colors block">
                  Autonomous AI Systems
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-cyber-primary transition-colors block">
                  Digital Twin Workflows
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-cyber-primary transition-colors block">
                  System-Level Assistant
                </a>
              </li>
              <li>
                <a href="#revenue-streams" className="hover:text-cyber-primary transition-colors block">
                  AI-Powered Robotics
                </a>
              </li>
              <li>
                <a href="#solution" className="hover:text-cyber-primary transition-colors block">
                  AI Agent Maker
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-cyber-primary transition-colors block">
                  Enterprise SaaS
                </a>
              </li>
            </ul>
          </div>

          {/* Platform Column */}
          <div className="space-y-4 font-mono text-xs">
            <div className="uppercase text-white font-bold tracking-wider text-sm font-display">
              Platform &amp; Tech
            </div>
            <ul className="space-y-2.5 text-cyber-text-secondary">
              <li>
                <a href="#solution" className="hover:text-cyber-primary transition-colors block">
                  NIVA Neural Ecosystem
                </a>
              </li>
              <li>
                <a href="#master-problem" className="hover:text-cyber-primary transition-colors block">
                  Zero-Knowledge Security
                </a>
              </li>
              <li>
                <a href="#the-race" className="hover:text-cyber-primary transition-colors block">
                  The Race (Performance)
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-cyber-primary transition-colors block">
                  Voice &amp; Vision Engine
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyber-primary transition-colors block">
                  Architecture FAQ
                </a>
              </li>
              <li>
                <a href="#partners" className="hover:text-cyber-primary transition-colors block">
                  18 Accredited Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & HQ Details Column */}
          <div className="space-y-4 font-mono text-xs text-cyber-text-secondary">
            <div className="uppercase text-white font-bold tracking-wider text-sm font-display">
              Contact &amp; HQ
            </div>

            {/* Address */}
            <div className="flex items-start gap-2.5 leading-relaxed">
              <MapPin className="w-4 h-4 text-cyber-primary flex-shrink-0 mt-0.5" />
              <span>{companyInfo.hqAddress}</span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-cyber-primary flex-shrink-0" />
              <a
                href={`tel:${companyInfo.phone.replace(/\s+/g, '')}`}
                className="hover:text-white transition-colors"
              >
                {companyInfo.phone}
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-cyber-primary flex-shrink-0" />
              <a
                href={`mailto:${companyInfo.email}`}
                className="hover:text-white transition-colors"
              >
                {companyInfo.email}
              </a>
            </div>

            {/* WhatsApp Link */}
            <div className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <a
                href={companyInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1"
              >
                <span>Direct WhatsApp Chat</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* Direct Login Link */}
            <div className="pt-2">
              <a
                href={companyInfo.socialLinks.loginUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-cyber-primary hover:text-white font-semibold transition-colors"
              >
                <span>NIVA Security Portal Login</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Global Footer Bottom Legal & Copyright Bar */}
        <div className="pt-10 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between text-xs font-mono text-cyber-text-muted gap-6">
          <div className="flex items-center gap-4">
            <span>© 2026 Cybergenix Security Inc. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#faq" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#faq" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#master-problem" className="hover:text-white transition-colors">
              Zero-Knowledge Whitepaper
            </a>
          </div>

          <div className="text-cyber-text-dim">
            Designed for Autonomous Intelligence &amp; Zero-Trust Enterprise Security.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
