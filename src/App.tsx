import React, { useEffect } from 'react';
import { initSmoothScroll, destroySmoothScroll } from './utils/lenis';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { ShowCaseSection } from './components/sections/ShowCaseSection';
import { LogoReel } from './components/visual/LogoReel';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { MasterProblemSection } from './components/sections/MasterProblemSection';
import { WhatChangedSection } from './components/sections/WhatChangedSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { SaferFasterSection } from './components/sections/SaferFasterSection';
import { SecurityAuditSection } from './components/sections/SecurityAuditSection';
import { QbrPitchSection } from './components/sections/QbrPitchSection';
import { BenefitsSection } from './components/sections/BenefitsSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { LeadershipSection } from './components/sections/LeadershipSection';
import { FaqSection } from './components/sections/FaqSection';
import { ScheduleDemoSection } from './components/sections/ScheduleDemoSection';

export const App: React.FC = () => {
  useEffect(() => {
    initSmoothScroll();
    return () => {
      destroySmoothScroll();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-cyber-text-primary selection:bg-cyber-primary selection:text-white">
      {/* Global Fixed Capsule Navigation Header */}
      <Header />

      {/* Main Content Area - 15 Sections in Precise Specification Order */}
      <main id="main-content" className="relative z-10">
        {/* Section 1: Hero Section (SplitText Stagger Reveal, Neural Canvas, Dual CTAs) */}
        <HeroSection />

        {/* Section 2: ShowCase Section (300vh Scroll Pinned 4 Core Identity Pillars) */}
        <ShowCaseSection />

        {/* Section 3: LogoReel Section (18 Accredited Partner & Institution Marquee) */}
        <LogoReel />

        {/* Section 4: Features Section (Horizontal Pinned Track - 4 Problem Items) */}
        <FeaturesSection />

        {/* Section 5: MasterProblem Section (Credential Exfiltration Terminal Simulation) */}
        <MasterProblemSection />

        {/* Section 6: WhatChanged Section (Who We Are - 4 Architectural Shifts) */}
        <WhatChangedSection />

        {/* Section 7: HowItWorks Section (NIVA Neural Ecosystem - 3 Workflow Steps) */}
        <HowItWorksSection />

        {/* Section 8: SaferFaster Section (16.5s Synchronized Race: Legacy Chatbot vs NIVA) */}
        <SaferFasterSection />

        {/* Section 9: SecurityAudit Section (Enterprise Multi-Tab Capabilities Dashboard) */}
        <SecurityAuditSection />

        {/* Section 10: QbrPitch Section (Enterprise Revenue Models & Capabilities) */}
        <QbrPitchSection />

        {/* Section 11: Benefits Section (Transparent 3-Tier Pricing & Feature Matrix) */}
        <BenefitsSection />

        {/* Section 12: Testimonials Section (6 Authentic Frosted Glassmorphism Quotes) */}
        <TestimonialsSection />

        {/* Section 13: Leadership Section (Executive Leadership: DKM & PS) */}
        <LeadershipSection />

        {/* Section 14: FaqSection (Semantic Exclusive <details name="faq"> with Rotating Plus/Minus) */}
        <FaqSection />

        {/* Section 15: ScheduleDemoSection (Inverted Light Theme, Sector Pills & Validation) */}
        <ScheduleDemoSection />
      </main>

      {/* Global Footer with Pointer-Following Dual Ambient Glowing Auras */}
      <Footer />
    </div>
  );
};

export default App;
