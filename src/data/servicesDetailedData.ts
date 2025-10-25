import { Service } from './servicesData';

export const servicesDetailed: Service[] = [
  {
    id: "automation",
    title: "Business Process Automation",
    shortDesc: "Automate repetitive tasks and streamline operations with intelligent AI solutions.",
    fullDesc: "Our Business Process Automation service leverages AI to eliminate manual work, reduce errors, and accelerate operations. From document processing to workflow automation, we help you achieve more with less effort.",
    icon: "https://d64gsuwffb70l.cloudfront.net/68f9980b6672a19b1652b6f6_1761236815391_b671394d.webp",
    benefits: ["80% time savings", "Error reduction", "Cost efficiency", "Scalability"],
    process: [
      { step: 1, title: "Process Mapping", desc: "Identify automation opportunities" },
      { step: 2, title: "Design", desc: "Create automation workflows" },
      { step: 3, title: "Implementation", desc: "Deploy AI-powered solutions" },
      { step: 4, title: "Optimization", desc: "Continuous improvement" }
    ],
    features: ["RPA Integration", "Document AI", "Workflow Automation", "API Integrations"],
    caseStudyIds: ["healthcare", "manufacturing", "professional"]
  },
  {
    id: "sales-funnels",
    title: "Sales Funnels",
    shortDesc: "Optimize your customer journey with AI-powered sales funnel strategies.",
    fullDesc: "Design and implement high-converting sales funnels powered by AI. We analyze customer behavior, optimize touchpoints, and automate follow-ups to maximize conversions and revenue.",
    icon: "https://d64gsuwffb70l.cloudfront.net/68f9980b6672a19b1652b6f6_1761236816432_4bf666cf.webp",
    benefits: ["Higher conversion", "Lead nurturing", "Revenue growth", "Customer insights"],
    process: [
      { step: 1, title: "Analysis", desc: "Map current customer journey" },
      { step: 2, title: "Optimization", desc: "Identify conversion bottlenecks" },
      { step: 3, title: "Automation", desc: "Implement AI-driven nurturing" },
      { step: 4, title: "Testing", desc: "A/B test and refine" }
    ],
    features: ["Funnel Analytics", "Lead Scoring", "Automated Follow-ups", "Conversion Optimization"],
    caseStudyIds: ["retail", "technology", "education"]
  }
];
