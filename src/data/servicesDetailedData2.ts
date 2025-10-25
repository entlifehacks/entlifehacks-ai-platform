import { Service } from './servicesData';

export const servicesDetailed2: Service[] = [
  {
    id: "crm",
    title: "Customer Relationship Management",
    shortDesc: "Enhance customer relationships with AI-powered CRM solutions.",
    fullDesc: "Transform how you manage customer relationships with AI-enhanced CRM systems. We help you track interactions, predict customer needs, and deliver personalized experiences that build loyalty and drive growth.",
    icon: "https://d64gsuwffb70l.cloudfront.net/68f9980b6672a19b1652b6f6_1761236817216_591cd257.webp",
    benefits: ["Customer retention", "Personalization", "Sales efficiency", "Lifetime value growth"],
    process: [
      { step: 1, title: "Setup", desc: "Configure CRM platform" },
      { step: 2, title: "Integration", desc: "Connect data sources" },
      { step: 3, title: "AI Enhancement", desc: "Add predictive features" },
      { step: 4, title: "Training", desc: "Team onboarding and support" }
    ],
    features: ["360° Customer View", "Predictive Lead Scoring", "Automated Outreach", "Customer Segmentation"],
    caseStudyIds: ["retail", "professional", "hospitality"]
  },
  {
    id: "digital-marketing",
    title: "AI Digital Marketing",
    shortDesc: "Supercharge your marketing with AI-driven campaigns and insights.",
    fullDesc: "Leverage AI to create, optimize, and scale your digital marketing efforts. From content generation to ad optimization, we help you reach the right audience with the right message at the right time.",
    icon: "https://d64gsuwffb70l.cloudfront.net/68f9980b6672a19b1652b6f6_1761236818436_5eed8fa9.webp",
    benefits: ["ROI improvement", "Audience targeting", "Content at scale", "Campaign optimization"],
    process: [
      { step: 1, title: "Audit", desc: "Review current marketing efforts" },
      { step: 2, title: "Strategy", desc: "Develop AI-enhanced plan" },
      { step: 3, title: "Execution", desc: "Launch optimized campaigns" },
      { step: 4, title: "Analysis", desc: "Monitor and optimize performance" }
    ],
    features: ["AI Content Generation", "Predictive Analytics", "Ad Optimization", "Social Media Automation"],
    caseStudyIds: ["technology", "education", "hospitality"]
  }
];
