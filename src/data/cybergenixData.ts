import {
  CompanyInfo,
  IdentityPillar,
  WhoTheyArePillar,
  ProblemItem,
  SolutionModule,
  CapabilityItem,
  PartnerInstitution,
  Testimonial,
  RevenueStream,
  PricingTier,
  Leader,
  FaqItem,
} from '../types';

export const companyInfo: CompanyInfo = {
  name: 'Cybergenix Security',
  tagline: 'Human-first AI, engineered secure',
  coreMission: 'Pioneering the future of autonomous AI systems — blending machine learning with cybersecurity',
  hqAddress: 'Lower Ground Floor, A-56/1, near G.D. Goenka School, A Block, Sector 50, Noida, Uttar Pradesh 201303, India',
  phone: '+91 88603 53427',
  email: 'info@cybergenixsecurity.com',
  whatsappUrl: 'https://wa.me/918860353427',
  socialLinks: {
    twitter: 'https://twitter.com/Cybergenix',
    linkedin: 'https://linkedin.com/company/cybergenix-security',
    instagram: 'https://instagram.com/cybergenixsecurity',
    loginUrl: 'https://niva.cybergenixsecurity.com',
  },
};

export const identityPillars: IdentityPillar[] = [
  {
    id: '01',
    title: 'Self-learning AI',
    description: 'Intelligent systems that learn, adapt, and evolve without constant human intervention.',
    badge: 'Neural Engine',
  },
  {
    id: '02',
    title: 'Digital twin',
    description: 'AI representative that can attend meetings, make decisions, and act on your behalf.',
    badge: 'Autonomous Persona',
  },
  {
    id: '03',
    title: 'System intelligence',
    description: 'Controls apps, files, and workflows via voice and context with full OS integration.',
    badge: 'OS-Level Control',
  },
  {
    id: '04',
    title: 'Cybersecurity-first',
    description: 'Enterprise-grade security with end-to-end encryption and zero-knowledge proofs — data never leaves user control.',
    badge: 'Zero-Knowledge',
  },
];

export const whoTheyArePillars: WhoTheyArePillar[] = [
  {
    id: '/01',
    title: 'Autonomous AI Systems',
    description: 'Intelligent systems that learn, adapt, and evolve without constant human intervention.',
    category: 'Autonomous Operations',
  },
  {
    id: '/02',
    title: 'Secure Architecture',
    description: 'Privacy-first AI with decentralized infrastructure — data never leaves user control.',
    category: 'Zero-Knowledge Security',
  },
  {
    id: '/03',
    title: 'Research-driven',
    description: 'Cutting-edge ML and deep-learning research powering next-gen solutions.',
    category: 'Applied Intelligence',
  },
  {
    id: '/04',
    title: 'Industry-agnostic',
    description: 'Scalable AI designed to transform efficiency across any sector or domain.',
    category: 'Universal Deployment',
  },
];

export const problemItems: ProblemItem[] = [
  {
    id: '01',
    title: 'Shallow Understanding',
    description: 'AI lacks deep contextual awareness and meaningful comprehension across complex enterprise operations.',
  },
  {
    id: '02',
    title: 'Text-only Interaction',
    description: 'Limited interfaces create impersonal, disconnected experiences without multimodal voice, vision, or spatial empathy.',
  },
  {
    id: '03',
    title: 'Emotional Disconnect',
    description: 'No empathy or emotional intelligence in human–AI interaction, resulting in sterile and robotic collaboration.',
  },
  {
    id: '04',
    title: 'Security Risks',
    description: 'Centralized cloud AI architectures expose proprietary user data to third-party harvesting, model leaks, and compliance vulnerabilities.',
  },
];

export const solutionModules: SolutionModule[] = [
  {
    id: 1,
    title: 'Core LLM',
    description: 'Open-source foundation models powering intelligent reasoning and sovereign execution.',
    iconName: 'Cpu',
  },
  {
    id: 2,
    title: 'Self-learning Engine',
    description: 'Decentralized, privacy-preserving continuous learning adapting to individual user habits.',
    iconName: 'GitBranch',
  },
  {
    id: 3,
    title: 'Voice & Vision',
    description: 'Multilingual speech-to-text with contextual understanding and real-time visual perception.',
    iconName: 'Eye',
  },
  {
    id: 4,
    title: 'Domain Modules',
    description: 'Emotion detection, mental wellness intelligence, and context-aware domain logic.',
    iconName: 'HeartHandshake',
  },
  {
    id: 5,
    title: 'AI Agent Maker',
    description: 'Low-code / no-code AI agent creation platform for rapid cross-functional deployment.',
    iconName: 'Layers',
  },
  {
    id: 6,
    title: 'Security Layer',
    description: 'End-to-end encrypted, zero-knowledge architecture ensuring total data sovereignty.',
    iconName: 'ShieldCheck',
  },
];

export const capabilities: CapabilityItem[] = [
  {
    id: '01',
    title: 'System-level Assistant',
    description: 'Controls apps, files, and workflows via voice and context; full OS integration.',
    details: [
      'Native desktop application & file system hooks',
      'Context-aware proactive workflow automation',
      'Multimodal voice execution across operating system tasks',
    ],
    metrics: { label: 'Task Execution Speed', value: '< 250ms' },
  },
  {
    id: '02',
    title: 'Adaptive Learning',
    description: 'Learns from habits and preferences, gets smarter with every interaction.',
    details: [
      'Decentralized personal embedding updates',
      'Zero model retraining overhead on host hardware',
      'Dynamic behavior tuning tailored to individual operator style',
    ],
    metrics: { label: 'Adaptation Accuracy', value: '99.4%' },
  },
  {
    id: '03',
    title: 'Digital Twin',
    description: 'AI representative that can attend meetings, make decisions, and act on your behalf.',
    details: [
      'Autonomous calendar & meeting attendance',
      'Executive voice synthesis & photorealistic avatar',
      'Verifiable decision logs with audit trail',
    ],
    metrics: { label: 'Time Saved per Week', value: '18+ hrs' },
  },
  {
    id: '04',
    title: 'Emotion-aware',
    description: 'Detects emotional cues and responds with empathy and contextual understanding.',
    details: [
      'Acoustic pitch and cadence sentiment analysis',
      'Micro-expression and visual cue recognition',
      'Adaptive conversational tone modulation',
    ],
    metrics: { label: 'Sentiment Precision', value: '96.8%' },
  },
  {
    id: '05',
    title: 'Secure Infrastructure',
    description: 'Enterprise-grade security with end-to-end encryption and zero-knowledge proofs.',
    details: [
      'Client-side cryptographic key generation',
      'Zero-knowledge proof validation without raw data transmission',
      'FIPS 140-3 and ISO 27001 aligned infrastructure',
    ],
    metrics: { label: 'Data Exposure Risk', value: '0.00%' },
  },
  {
    id: '06',
    title: 'Deep Integration',
    description: 'Seamlessly connects across platforms, devices, and third-party applications.',
    details: [
      'Universal REST, GraphQL & WebSocket SDKs',
      'Over 200+ enterprise connectors (ERP, CRM, DevOps)',
      'Cross-platform support: Windows, macOS, Linux, and embedded robotics',
    ],
    metrics: { label: 'Native Connectors', value: '200+' },
  },
];

export const partners: PartnerInstitution[] = [
  // Government / Startup Bodies
  {
    id: 'p01',
    name: 'Ministry of Skill Development & Entrepreneurship',
    category: 'government',
    categoryLabel: 'Government / Startup Body',
  },
  {
    id: 'p02',
    name: 'DPIIT — Startup India',
    category: 'government',
    categoryLabel: 'Government / Startup Body',
  },
  {
    id: 'p03',
    name: 'Startup India Initiative',
    category: 'government',
    categoryLabel: 'Government / Startup Body',
  },
  {
    id: 'p04',
    name: 'Government of Uttar Pradesh',
    category: 'government',
    categoryLabel: 'Government / Startup Body',
  },
  // Academic / Incubators
  {
    id: 'p05',
    name: 'Galgotias University',
    category: 'academic',
    categoryLabel: 'Academic / Incubator',
  },
  {
    id: 'p06',
    name: 'GIC RISE',
    category: 'academic',
    categoryLabel: 'Academic / Incubator',
  },
  {
    id: 'p07',
    name: 'IIT Ropar — TIH (AWaDH)',
    category: 'academic',
    categoryLabel: 'Academic / Incubator',
  },
  {
    id: 'p08',
    name: 'Eureka Zonal Program',
    category: 'academic',
    categoryLabel: 'Academic / Incubator',
  },
  {
    id: 'p09',
    name: 'Manav Rachna',
    category: 'academic',
    categoryLabel: 'Academic / Incubator',
  },
  // Tech Giants / Programs
  {
    id: 'p10',
    name: 'NVIDIA Inception Program',
    category: 'tech',
    categoryLabel: 'Tech Giant / Global Program',
  },
  {
    id: 'p11',
    name: 'Microsoft for Startups',
    category: 'tech',
    categoryLabel: 'Tech Giant / Global Program',
  },
  {
    id: 'p12',
    name: 'AWS',
    category: 'tech',
    categoryLabel: 'Tech Giant / Cloud Infrastructure',
  },
  // Cybersecurity / Community
  {
    id: 'p13',
    name: 'EC-Council',
    category: 'cyber',
    categoryLabel: 'Cybersecurity Certification',
  },
  {
    id: 'p14',
    name: 'CTFtime',
    category: 'cyber',
    categoryLabel: 'Cybersecurity Community',
  },
  {
    id: 'p15',
    name: 'Noida BSides',
    category: 'cyber',
    categoryLabel: 'Cybersecurity Conference',
  },
  {
    id: 'p16',
    name: 'Hackers Meetup',
    category: 'cyber',
    categoryLabel: 'Security Community',
  },
  {
    id: 'p17',
    name: 'CyGenix CTF',
    category: 'cyber',
    categoryLabel: 'Cyber Defense Competition',
  },
  // Other
  {
    id: 'p18',
    name: 'SetMyCart',
    category: 'other',
    categoryLabel: 'E-Commerce Enterprise Partner',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    role: 'Operations Lead',
    clientType: 'SaaS Startup',
    quote: 'NIVA adapts and reduced repetitive internal tasks via habit-based learning.',
  },
  {
    id: 't2',
    role: 'HR Manager',
    clientType: 'Enterprise Client',
    quote: 'Digital avatar interface made onboarding non-technical staff easy.',
  },
  {
    id: 't3',
    role: 'Cybersecurity Consultant',
    clientType: 'Independent Security Advisory',
    quote: 'Privacy-first — no blind data harvesting, no black-box behavior.',
  },
  {
    id: 't4',
    role: 'Tech Lead',
    clientType: 'AI Startup',
    quote: 'Feels like a system-level assistant, not just a chatbot.',
  },
  {
    id: 't5',
    role: 'Product Manager',
    clientType: 'Enterprise Solutions',
    quote: 'AI Agent Maker saved weeks of development time.',
  },
  {
    id: 't6',
    role: 'Early Beta User',
    clientType: 'Consumer Tech',
    quote: 'Emotion-aware responses felt natural instead of scripted.',
  },
];

export const revenueStreams: RevenueStream[] = [
  {
    id: 'R1',
    title: 'SaaS Subscriptions',
    description: 'Enterprise and consumer AI on flexible subscription tiers with multi-seat governance and continuous neural upgrades.',
    highlights: [
      'Multi-tenant and dedicated VPC deployment options',
      'Continuous neural foundation model upgrades',
      'Granular role-based security and privacy policies',
    ],
  },
  {
    id: 'R2',
    title: 'AI-powered Robotics',
    description: 'Intelligent automation for manufacturing and logistics combining computer vision, edge AI, and spatial robotics.',
    highlights: [
      'Physical edge appliance with hardware security modules',
      'Sub-millisecond robotic motor coordination',
      'Zero-latency local neural processing without cloud dependency',
    ],
  },
  {
    id: 'R3',
    title: 'Custom AI Solutions',
    description: 'Bespoke AI development tailored to specific industry needs, proprietary model training, and on-premises deployment.',
    highlights: [
      'Domain-adapted fine-tuning on client sovereign data',
      'Air-gapped deployment for defense and financial sectors',
      'Dedicated machine learning research and engineering team',
    ],
  },
];

export const pricingTiers: PricingTier[] = [
  {
    id: 'saas',
    name: 'SaaS Plan',
    price: '₹50,000',
    priceDetail: 'Best for businesses and teams',
    targetAudience: 'Growing enterprises & security teams',
    popular: false,
    ctaText: 'Get Started with SaaS',
    features: [
      'Customized AI Avatar',
      'Customized Voice Personality',
      'Centralized Secure Data Handling',
      'System-Level AI Assistant',
      'Voice & Context-Based Commands',
      'Instant Support',
      'Free Maintenance (3 months)',
    ],
  },
  {
    id: 'robot-saas',
    name: 'Robot + SaaS',
    price: '₹1,50,000',
    priceDetail: 'Most Popular Choice',
    targetAudience: 'High-growth operations & physical facilities',
    popular: true,
    ctaText: 'Deploy Robot + SaaS',
    features: [
      'Everything in SaaS Plan',
      'Physical AI Robot Hardware',
      'One-Time Hardware Purchase',
      '24/7 Technical Support',
      'On-site & Remote Integration',
      'Free Maintenance (3 months)',
      '2 Years SaaS Updates Included',
    ],
  },
  {
    id: 'enterprise',
    name: 'Custom Enterprise',
    price: 'On Request',
    priceDetail: 'Tailored Architecture',
    targetAudience: 'Global enterprises, defense & institutions',
    popular: false,
    ctaText: 'Request Custom Proposal',
    features: [
      'Fully Customized AI Models',
      'Domain-Specific AI Agents',
      'Advanced Security & Privacy Controls',
      'Enterprise Integrations (ERP, CRM, SIEM)',
      'Long-Term SaaS Updates & SLAs',
      'Dedicated Technical Team',
      'Custom Avatar, Voice & Behavior Logic',
    ],
  },
];

export const leadership: Leader[] = [
  {
    initials: 'DKM',
    name: 'Divyansh Kumar Mishra',
    title: 'Founder, CEO',
    bio: 'Visionary leader driving AI innovation and strategic growth, pioneering decentralized zero-knowledge neural systems.',
    linkedinUrl: 'https://linkedin.com/company/cybergenix-security',
  },
  {
    initials: 'PS',
    name: 'Prakhar Singh',
    title: 'Co-Founder, COO',
    bio: 'Operations leader streamlining business processes and driving growth across enterprise scaling and product execution.',
    linkedinUrl: 'https://linkedin.com/company/cybergenix-security',
  },
];

export const faqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How does Cybergenix ensure zero-knowledge data privacy?',
    answer: 'Our architecture operates on end-to-end encryption and decentralized zero-knowledge cryptography. Data is processed locally or in cryptographically isolated enclaves. User prompts, enterprise documents, and model weights never leave user control, ensuring absolute privacy from third parties and even from us.',
  },
  {
    id: 'faq-2',
    question: 'What makes NIVA different from traditional LLM chatbots?',
    answer: 'Unlike text-in/text-out chatbots, NIVA is a system-level assistant with deep operating system integration. It controls applications, automates file workflows, acts as your digital twin in meetings, and detects emotional cues with adaptive empathy.',
  },
  {
    id: 'faq-3',
    question: 'How does the physical AI Robot integrate with the software?',
    answer: 'The physical AI Robot connects directly with the NIVA neural engine, bridging digital workflow automation with physical spatial operations for logistics, industrial robotics, and executive workplace assistance.',
  },
  {
    id: 'faq-4',
    question: 'Can non-technical teams use the AI Agent Maker?',
    answer: 'Yes. The AI Agent Maker features an intuitive low-code / no-code interface allowing teams to design, test, and deploy customized domain-specific agents without writing a single line of backend code.',
  },
  {
    id: 'faq-5',
    question: 'How quickly can an enterprise deploy Cybergenix solutions?',
    answer: 'Our cloud and local software modules can be deployed within hours via standard containerized stacks. Enterprise integrations and physical robot deployments include on-site setup and 24/7 technical assistance.',
  },
];
