import React, { useState, useEffect, useRef } from 'react';
import { CtaButton } from '../common/CtaButton';
import { MobileMenu } from './MobileMenu';
import { companyInfo } from '../../data/cybergenixData';
import {
  ChevronDown,
  ArrowUpRight,
  Shield,
  Cpu,
  Brain,
  Bot,
  Layers,
  Sparkles,
  Lock,
  Eye,
  Award,
  Users,
  GraduationCap,
  Building,
} from 'lucide-react';

export const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInverse, setIsInverse] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Zero-polling dynamic navbar inversion observer
  useEffect(() => {
    const inverseTarget = document.querySelector(
      '[data-navbar-inverse], .ScheduleDemoSection, #schedule-a-meeting'
    );
    if (!inverseTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInverse(true);
          } else {
            setIsInverse(false);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(inverseTarget);
    return () => observer.disconnect();
  }, []);

  // Close dropdown on outside click or ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (id: string) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <header
        ref={headerRef}
        data-header=""
        className={`
          Header fixed top-0 inset-x-0 z-50 transition-all duration-300
          ${isInverse ? '-inverse Header--inverse text-black' : 'text-cyber-text-primary'}
          ${isMobileMenuOpen ? '-open' : ''}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 flex items-center justify-between">
          {/* Brand Lockup: Cybergenix Logo & Wordmark */}
          <a
            href="#"
            className="logo flex items-center gap-3 z-50 group py-1"
            aria-label="Cybergenix Security Home"
          >
            <img
              src="/Cybergenix_logo.png"
              alt="Cybergenix Security Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
              <span className="font-display text-lg sm:text-xl font-bold tracking-wider text-white group-hover:text-cyber-primary transition-colors">
                CYBERGENIX
              </span>
              <span className="text-[0.95rem] font-mono tracking-widest text-cyber-primary font-medium">
                SECURITY
              </span>
            </div>
          </a>

          {/* Desktop Floating Capsule Pill Nav */}
          <nav
            aria-label="Main Navigation"
            className={`
              strip hidden md:flex items-center gap-1 px-4 py-2 rounded-full
              border transition-all duration-300
              ${
                isInverse
                  ? 'bg-black/10 backdrop-blur-md border-black/20 text-black'
                  : 'bg-black/60 backdrop-blur-glass border-white/[0.08] text-cyber-text-secondary shadow-lg shadow-black/40'
              }
            `}
          >
            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('solutions')}
                onMouseEnter={() => setActiveDropdown('solutions')}
                className={`link px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                  activeDropdown === 'solutions'
                    ? 'text-white bg-white/[0.08]'
                    : 'hover:text-white'
                }`}
                aria-expanded={activeDropdown === 'solutions'}
              >
                <span>Solutions</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'solutions' ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* Platform Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('platform')}
                onMouseEnter={() => setActiveDropdown('platform')}
                className={`link px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                  activeDropdown === 'platform'
                    ? 'text-white bg-white/[0.08]'
                    : 'hover:text-white'
                }`}
                aria-expanded={activeDropdown === 'platform'}
              >
                <span>Platform</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'platform' ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* Partners Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('partners')}
                onMouseEnter={() => setActiveDropdown('partners')}
                className={`link px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                  activeDropdown === 'partners'
                    ? 'text-white bg-white/[0.08]'
                    : 'hover:text-white'
                }`}
                aria-expanded={activeDropdown === 'partners'}
              >
                <span>Partners</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'partners' ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* Company Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('company')}
                onMouseEnter={() => setActiveDropdown('company')}
                className={`link px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                  activeDropdown === 'company'
                    ? 'text-white bg-white/[0.08]'
                    : 'hover:text-white'
                }`}
                aria-expanded={activeDropdown === 'company'}
              >
                <span>Company</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'company' ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* Contact Direct Link */}
            <a
              href="#schedule-a-meeting"
              className="link px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider hover:text-white transition-colors"
            >
              Contact
            </a>

            {/* Language Switcher Badge */}
            <div className="langs ml-2 pl-2 border-l border-white/[0.12] flex items-center gap-1 text-[1.0rem] font-mono">
              <span className="lang -active text-cyber-primary font-bold">EN</span>
              <span className="text-white/20">/</span>
              <span className="lang text-cyber-text-dim hover:text-white transition-colors cursor-pointer">
                IN
              </span>
            </div>
          </nav>

          {/* Right Actions: NIVA Login & Primary CTA */}
          <div className="actions hidden md:flex items-center gap-4">
            <a
              href={companyInfo.socialLinks.loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono uppercase tracking-wider text-cyber-text-secondary hover:text-white transition-colors px-2 py-1 flex items-center gap-1"
            >
              <span>NIVA Login</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyber-primary" />
            </a>

            <CtaButton
              href="#schedule-a-meeting"
              variant="primary"
              size="sm"
              icon={<Sparkles className="w-3.5 h-3.5" />}
            >
              Get started free
            </CtaButton>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            data-menu-toggle=""
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="toggle hamburger md:hidden p-2 rounded-lg text-cyber-text-secondary hover:text-white bg-white/[0.05] border border-white/[0.1] transition-colors focus:outline-none focus:ring-2 focus:ring-cyber-primary"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Toggle Menu</span>
            <div className="w-5 h-4 flex flex-col justify-between">
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

        {/* Desktop Mega Dropdown Panels */}
        {activeDropdown && (
          <div
            ref={dropdownRef}
            onMouseLeave={() => setActiveDropdown(null)}
            className="hidden md:block absolute top-full left-0 right-0 max-w-6xl mx-auto px-6 pt-3 animate-fade-in"
          >
            <div className="p-8 rounded-2xl bg-cyber-surface-1/95 backdrop-blur-heavy border border-white/[0.12] shadow-2xl shadow-black/80">
              {/* Solutions Panel */}
              {activeDropdown === 'solutions' && (
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2 grid grid-cols-2 gap-4">
                    <a
                      href="#showcase"
                      onClick={() => setActiveDropdown(null)}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyber-primary/40 hover:bg-white/[0.05] transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Brain className="w-5 h-5 text-cyber-primary" />
                        <span className="font-display text-base font-semibold text-white group-hover:text-cyber-primary transition-colors">
                          Autonomous AI Systems
                        </span>
                      </div>
                      <p className="text-xs text-cyber-text-secondary font-mono leading-relaxed">
                        Intelligent systems that learn, adapt, and evolve without constant human intervention.
                      </p>
                    </a>

                    <a
                      href="#showcase"
                      onClick={() => setActiveDropdown(null)}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyber-cyan/40 hover:bg-white/[0.05] transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Bot className="w-5 h-5 text-cyber-cyan" />
                        <span className="font-display text-base font-semibold text-white group-hover:text-cyber-cyan transition-colors">
                          Digital Twin Workflows
                        </span>
                      </div>
                      <p className="text-xs text-cyber-text-secondary font-mono leading-relaxed">
                        AI representative that attends meetings, synthesizes discussions, and acts on your behalf.
                      </p>
                    </a>

                    <a
                      href="#capabilities"
                      onClick={() => setActiveDropdown(null)}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-400/40 hover:bg-white/[0.05] transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Layers className="w-5 h-5 text-purple-400" />
                        <span className="font-display text-base font-semibold text-white group-hover:text-purple-400 transition-colors">
                          System-Level Assistant
                        </span>
                      </div>
                      <p className="text-xs text-cyber-text-secondary font-mono leading-relaxed">
                        Controls applications, files, and workflows via natural voice and context commands.
                      </p>
                    </a>

                    <a
                      href="#revenue-streams"
                      onClick={() => setActiveDropdown(null)}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-400/40 hover:bg-white/[0.05] transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Cpu className="w-5 h-5 text-emerald-400" />
                        <span className="font-display text-base font-semibold text-white group-hover:text-emerald-400 transition-colors">
                          AI Robotics & Automation
                        </span>
                      </div>
                      <p className="text-xs text-cyber-text-secondary font-mono leading-relaxed">
                        Hardware edge appliance combining computer vision with sub-millisecond robotic control.
                      </p>
                    </a>
                  </div>

                  {/* Highlights Column */}
                  <div className="p-6 rounded-xl bg-gradient-to-br from-cyber-primary/10 to-transparent border border-cyber-primary/20 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono uppercase text-cyber-primary tracking-wider mb-2">
                        / Core Architecture
                      </div>
                      <h4 className="font-display text-lg font-semibold text-white mb-2">
                        Zero-Knowledge Enclave
                      </h4>
                      <p className="text-xs text-cyber-text-secondary font-mono leading-relaxed">
                        Every Cybergenix model runs within cryptographically isolated enclaves. Data never touches third-party clouds.
                      </p>
                    </div>
                    <a
                      href="#schedule-a-meeting"
                      onClick={() => setActiveDropdown(null)}
                      className="inline-flex items-center gap-2 text-xs font-mono text-cyber-primary hover:text-white transition-colors mt-4"
                    >
                      <span>Explore enterprise blueprints</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}

              {/* Platform Panel */}
              {activeDropdown === 'platform' && (
                <div className="grid grid-cols-4 gap-4">
                  <a
                    href="#how-it-works"
                    onClick={() => setActiveDropdown(null)}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyber-primary/40 hover:bg-white/[0.05] transition-all"
                  >
                    <Cpu className="w-5 h-5 text-cyber-primary mb-3" />
                    <div className="font-display text-sm font-semibold text-white mb-1">
                      NIVA Neural Core
                    </div>
                    <p className="text-xs text-cyber-text-secondary font-mono">
                      Open-source foundation models with sovereign reasoning.
                    </p>
                  </a>

                  <a
                    href="#master-problem"
                    onClick={() => setActiveDropdown(null)}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyber-primary/40 hover:bg-white/[0.05] transition-all"
                  >
                    <Lock className="w-5 h-5 text-cyber-green mb-3" />
                    <div className="font-display text-sm font-semibold text-white mb-1">
                      Zero-Knowledge Layer
                    </div>
                    <p className="text-xs text-cyber-text-secondary font-mono">
                      End-to-end encrypted proofs with zero cloud telemetry.
                    </p>
                  </a>

                  <a
                    href="#capabilities"
                    onClick={() => setActiveDropdown(null)}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyber-primary/40 hover:bg-white/[0.05] transition-all"
                  >
                    <Eye className="w-5 h-5 text-cyber-cyan mb-3" />
                    <div className="font-display text-sm font-semibold text-white mb-1">
                      Voice & Vision Perception
                    </div>
                    <p className="text-xs text-cyber-text-secondary font-mono">
                      Multilingual contextual speech and spatial visual analysis.
                    </p>
                  </a>

                  <a
                    href="#capabilities"
                    onClick={() => setActiveDropdown(null)}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyber-primary/40 hover:bg-white/[0.05] transition-all"
                  >
                    <Sparkles className="w-5 h-5 text-purple-400 mb-3" />
                    <div className="font-display text-sm font-semibold text-white mb-1">
                      AI Agent Maker
                    </div>
                    <p className="text-xs text-cyber-text-secondary font-mono">
                      Low-code / no-code builder to deploy custom autonomous agents.
                    </p>
                  </a>
                </div>
              )}

              {/* Partners Panel */}
              {activeDropdown === 'partners' && (
                <div className="grid grid-cols-4 gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyber-primary tracking-wider mb-3">
                      <Building className="w-4 h-4" />
                      <span>Government & State</span>
                    </div>
                    <ul className="space-y-2 text-xs font-mono text-cyber-text-secondary">
                      <li>• Ministry of Skill Development</li>
                      <li>• DPIIT — Startup India</li>
                      <li>• Startup India Initiative</li>
                      <li>• Government of Uttar Pradesh</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyber-cyan tracking-wider mb-3">
                      <GraduationCap className="w-4 h-4" />
                      <span>Incubators & Academic</span>
                    </div>
                    <ul className="space-y-2 text-xs font-mono text-cyber-text-secondary">
                      <li>• IIT Ropar — TIH (AWaDH)</li>
                      <li>• Galgotias University</li>
                      <li>• GIC RISE</li>
                      <li>• Manav Rachna</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono uppercase text-purple-400 tracking-wider mb-3">
                      <Sparkles className="w-4 h-4" />
                      <span>Tech Giants</span>
                    </div>
                    <ul className="space-y-2 text-xs font-mono text-cyber-text-secondary">
                      <li>• NVIDIA Inception Program</li>
                      <li>• Microsoft for Startups</li>
                      <li>• Amazon Web Services (AWS)</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 tracking-wider mb-3">
                      <Shield className="w-4 h-4" />
                      <span>Cyber Defense</span>
                    </div>
                    <ul className="space-y-2 text-xs font-mono text-cyber-text-secondary">
                      <li>• EC-Council</li>
                      <li>• CTFtime</li>
                      <li>• Noida BSides</li>
                      <li>• Hackers Meetup & CyGenix CTF</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Company Panel */}
              {activeDropdown === 'company' && (
                <div className="grid grid-cols-3 gap-6">
                  <a
                    href="#who-we-are"
                    onClick={() => setActiveDropdown(null)}
                    className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyber-primary/40 hover:bg-white/[0.05] transition-all"
                  >
                    <Shield className="w-6 h-6 text-cyber-primary mb-3" />
                    <div className="font-display text-base font-semibold text-white mb-1">
                      Who We Are
                    </div>
                    <p className="text-xs text-cyber-text-secondary font-mono leading-relaxed">
                      Redefining AI from the inside out — where autonomous capability meets absolute security.
                    </p>
                  </a>

                  <a
                    href="#leadership"
                    onClick={() => setActiveDropdown(null)}
                    className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyber-primary/40 hover:bg-white/[0.05] transition-all"
                  >
                    <Users className="w-6 h-6 text-cyber-cyan mb-3" />
                    <div className="font-display text-base font-semibold text-white mb-1">
                      Leadership Team
                    </div>
                    <p className="text-xs text-cyber-text-secondary font-mono leading-relaxed">
                      Divyansh Kumar Mishra (Founder & CEO) and Prakhar Singh (Co-Founder & COO).
                    </p>
                  </a>

                  <a
                    href="#partners"
                    onClick={() => setActiveDropdown(null)}
                    className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyber-primary/40 hover:bg-white/[0.05] transition-all"
                  >
                    <Award className="w-6 h-6 text-purple-400 mb-3" />
                    <div className="font-display text-base font-semibold text-white mb-1">
                      Recognition & Trust
                    </div>
                    <p className="text-xs text-cyber-text-secondary font-mono leading-relaxed">
                      Accredited by 18 prestigious institutions across government, academia, and global tech.
                    </p>
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
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
