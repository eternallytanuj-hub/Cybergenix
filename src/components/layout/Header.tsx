import React, { useState, useEffect, useRef } from 'react';
import { CtaButton } from '../common/CtaButton';
import { MobileMenu } from './MobileMenu';
import { companyInfo } from '../../data/cybergenixData';
import { ArrowUpRight } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        data-header=""
        className={`
          Header fixed top-0 inset-x-0 z-50 transition-all duration-300
          ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/[0.05] py-4' : 'bg-transparent py-6'}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Official Cybergenix Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            aria-label="Cybergenix Security Home"
          >
            <img
              src="/Cybergenix_logo.png"
              alt="Cybergenix Logo"
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display text-lg sm:text-xl font-bold tracking-wider text-white">
              CYBERGENIX
            </span>
          </a>

          {/* Clean Navigation Links - Pure Minimalist KZero Style */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-[0.18em] text-[#f2f2f2]/70"
          >
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#solution" className="hover:text-white transition-colors">
              Solution
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Capabilities
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#leadership" className="hover:text-white transition-colors">
              Team
            </a>
            <a href="#schedule-a-meeting" className="hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href={companyInfo.socialLinks.loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono uppercase tracking-[0.18em] text-[#f2f2f2]/70 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>NIVA Login</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#f85c3a]" />
            </a>

            <CtaButton
              href="#schedule-a-meeting"
              variant="primary"
              size="sm"
            >
              Request a Demo
            </CtaButton>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            data-menu-toggle=""
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded text-white/80 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-4 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-white transition-transform duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-white transition-opacity duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-white transition-transform duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header;
