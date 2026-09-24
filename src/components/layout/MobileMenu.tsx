import React, { useEffect } from 'react';
import { CtaButton } from '../common/CtaButton';
import { companyInfo } from '../../data/cybergenixData';
import { X, ArrowUpRight, Shield, ChevronRight } from 'lucide-react';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      data-mobile-menu=""
      className="mobile-menu drawer fixed inset-0 z-[100] md:hidden bg-black/95 backdrop-blur-xl flex flex-col justify-between overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <img
            src="/Cybergenix_logo.png"
            alt="Cybergenix Security Logo"
            className="w-7 h-7 object-contain"
          />
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-lg font-bold tracking-wider text-white">
              CYBERGENIX
            </span>
            <span className="text-[1.0rem] font-mono tracking-widest text-cyber-primary">
              SECURITY
            </span>
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-lg text-cyber-text-secondary hover:text-white hover:bg-white/[0.08] transition-colors"
          aria-label="Close Mobile Navigation"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="px-6 py-6 space-y-6 flex-1">
        {/* Quick Identity Badge */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-cyber-text-muted">
          <Shield className="w-4 h-4 text-cyber-primary flex-shrink-0" />
          <span>Autonomous AI Systems • Zero-Knowledge Enclave</span>
        </div>

        {/* Navigation Categories */}
        <div className="space-y-4 font-mono text-sm">
          {/* Solutions Category */}
          <div className="space-y-2">
            <div className="text-xs uppercase text-cyber-primary font-semibold tracking-wider">
              / Solutions
            </div>
            <div className="pl-3 space-y-2 border-l border-white/[0.08]">
              <a
                href="#showcase"
                onClick={onClose}
                className="flex items-center justify-between py-1 text-cyber-text-secondary hover:text-white transition-colors"
              >
                <span>Autonomous AI Systems</span>
                <ChevronRight className="w-3.5 h-3.5 text-cyber-text-muted" />
              </a>
              <a
                href="#showcase"
                onClick={onClose}
                className="flex items-center justify-between py-1 text-cyber-text-secondary hover:text-white transition-colors"
              >
                <span>Digital Twin Workflows</span>
                <ChevronRight className="w-3.5 h-3.5 text-cyber-text-muted" />
              </a>
              <a
                href="#capabilities"
                onClick={onClose}
                className="flex items-center justify-between py-1 text-cyber-text-secondary hover:text-white transition-colors"
              >
                <span>System-Level Assistant</span>
                <ChevronRight className="w-3.5 h-3.5 text-cyber-text-muted" />
              </a>
              <a
                href="#revenue-streams"
                onClick={onClose}
                className="flex items-center justify-between py-1 text-cyber-text-secondary hover:text-white transition-colors"
              >
                <span>AI Robotics & Automation</span>
                <ChevronRight className="w-3.5 h-3.5 text-cyber-text-muted" />
              </a>
            </div>
          </div>

          {/* Platform Category */}
          <div className="space-y-2">
            <div className="text-xs uppercase text-cyber-primary font-semibold tracking-wider">
              / Platform
            </div>
            <div className="pl-3 space-y-2 border-l border-white/[0.08]">
              <a
                href="#how-it-works"
                onClick={onClose}
                className="flex items-center justify-between py-1 text-cyber-text-secondary hover:text-white transition-colors"
              >
                <span>NIVA Neural Ecosystem</span>
                <ChevronRight className="w-3.5 h-3.5 text-cyber-text-muted" />
              </a>
              <a
                href="#master-problem"
                onClick={onClose}
                className="flex items-center justify-between py-1 text-cyber-text-secondary hover:text-white transition-colors"
              >
                <span>Zero-Knowledge Security</span>
                <ChevronRight className="w-3.5 h-3.5 text-cyber-text-muted" />
              </a>
              <a
                href="#capabilities"
                onClick={onClose}
                className="flex items-center justify-between py-1 text-cyber-text-secondary hover:text-white transition-colors"
              >
                <span>Multilingual Voice & Vision</span>
                <ChevronRight className="w-3.5 h-3.5 text-cyber-text-muted" />
              </a>
            </div>
          </div>

          {/* Partners & Recognition */}
          <div className="space-y-2">
            <div className="text-xs uppercase text-cyber-primary font-semibold tracking-wider">
              / Recognition
            </div>
            <div className="pl-3 space-y-2 border-l border-white/[0.08]">
              <a
                href="#partners"
                onClick={onClose}
                className="flex items-center justify-between py-1 text-cyber-text-secondary hover:text-white transition-colors"
              >
                <span>18 Partner Institutions</span>
                <span className="text-[1.0rem] px-2 py-0.5 rounded bg-cyber-primary/10 text-cyber-primary">
                  Gov & Tech
                </span>
              </a>
              <a
                href="#testimonials"
                onClick={onClose}
                className="flex items-center justify-between py-1 text-cyber-text-secondary hover:text-white transition-colors"
              >
                <span>Client Testimonials</span>
                <ChevronRight className="w-3.5 h-3.5 text-cyber-text-muted" />
              </a>
            </div>
          </div>

          {/* Company & Leadership */}
          <div className="space-y-2">
            <div className="text-xs uppercase text-cyber-primary font-semibold tracking-wider">
              / Company
            </div>
            <div className="pl-3 space-y-2 border-l border-white/[0.08]">
              <a
                href="#who-we-are"
                onClick={onClose}
                className="flex items-center justify-between py-1 text-cyber-text-secondary hover:text-white transition-colors"
              >
                <span>About Cybergenix</span>
                <ChevronRight className="w-3.5 h-3.5 text-cyber-text-muted" />
              </a>
              <a
                href="#leadership"
                onClick={onClose}
                className="flex items-center justify-between py-1 text-cyber-text-secondary hover:text-white transition-colors"
              >
                <span>Leadership Team (DKM & PS)</span>
                <ChevronRight className="w-3.5 h-3.5 text-cyber-text-muted" />
              </a>
              <a
                href="#pricing"
                onClick={onClose}
                className="flex items-center justify-between py-1 text-cyber-text-secondary hover:text-white transition-colors"
              >
                <span>Pricing Plans</span>
                <ChevronRight className="w-3.5 h-3.5 text-cyber-text-muted" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions & Footer Info */}
      <div className="p-6 border-t border-white/[0.08] space-y-3 bg-cyber-surface-1">
        <a
          href={companyInfo.socialLinks.loginUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-12 flex items-center justify-center gap-2 rounded-lg border border-white/20 text-white font-mono text-sm uppercase hover:bg-white/[0.08] transition-colors"
        >
          <span>NIVA Cloud Login</span>
          <ArrowUpRight className="w-4 h-4 text-cyber-primary" />
        </a>

        <CtaButton
          href="#schedule-a-meeting"
          variant="primary"
          size="full"
          onClick={onClose}
        >
          Schedule AI Consultation
        </CtaButton>

        <div className="pt-2 text-[1.1rem] font-mono text-cyber-text-muted text-center">
          {companyInfo.email} • {companyInfo.phone}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
