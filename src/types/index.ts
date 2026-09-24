/**
 * Cybergenix Security Data Types
 * Authoritative contracts matching ORIGINAL_REQUEST.md & PROJECT.md
 */

export interface CompanySocialLinks {
  twitter: string;
  linkedin: string;
  instagram: string;
  loginUrl: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  coreMission: string;
  hqAddress: string;
  phone: string;
  email: string;
  whatsappUrl: string;
  socialLinks: CompanySocialLinks;
}

export interface IdentityPillar {
  id: string; // "01", "02", "03", "04"
  title: string;
  description: string;
  badge: string;
}

export interface WhoTheyArePillar {
  id: string; // "/01", "/02", "/03", "/04"
  title: string;
  description: string;
  category: string;
}

export interface ProblemItem {
  id: string; // "01", "02", "03", "04"
  title: string;
  description: string;
}

export interface SolutionModule {
  id: number; // 1 to 6
  title: string;
  description: string;
  iconName?: string;
}

export interface CapabilityItem {
  id: string; // "01" to "06"
  title: string;
  description: string;
  details?: string[];
  metrics?: {
    label: string;
    value: string;
  };
}

export type PartnerCategory = 'government' | 'academic' | 'tech' | 'cyber' | 'other';

export interface PartnerInstitution {
  id: string;
  name: string;
  category: PartnerCategory;
  categoryLabel: string;
}

export interface Testimonial {
  id: string;
  role: string;
  clientType: string;
  quote: string;
}

export interface RevenueStream {
  id: string; // "R1", "R2", "R3"
  title: string;
  description: string;
  highlights?: string[];
}

export interface PricingTier {
  id: string; // "saas", "robot-saas", "enterprise"
  name: string;
  price: string;
  priceDetail?: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
  targetAudience: string;
}

export interface Leader {
  initials: string;
  name: string;
  title: string;
  bio: string;
  linkedinUrl?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
  dropdownId?: 'solutions' | 'platform' | 'partners' | 'company';
  badge?: string;
}
