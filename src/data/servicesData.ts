export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  benefits: string[];
  process: { step: number; title: string; desc: string }[];
  features: string[];
  caseStudyIds: string[];
}

export const servicesData: Service[] = [
  {
    id: "ai-strategy",
    title: "AI Strategy Development",
    shortDesc: "Transform your business with a comprehensive AI roadmap tailored to your goals.",
    fullDesc: "Our AI Strategy Development service helps you navigate the complex AI landscape with a clear, actionable roadmap. We assess your current capabilities, identify opportunities, and create a phased implementation plan that aligns with your business objectives and delivers measurable ROI.",
    icon: "https://d64gsuwffb70l.cloudfront.net/68f9980b6672a19b1652b6f6_1761236813898_7b3416b6.webp",
    benefits: ["Clear AI roadmap", "Risk mitigation", "Competitive advantage", "ROI optimization"],
    process: [
      { step: 1, title: "Assessment", desc: "Evaluate current state and AI readiness" },
      { step: 2, title: "Strategy", desc: "Develop tailored AI implementation plan" },
      { step: 3, title: "Roadmap", desc: "Create phased execution timeline" },
      { step: 4, title: "Support", desc: "Ongoing guidance and optimization" }
    ],
    features: ["AI Readiness Assessment", "Technology Stack Selection", "Change Management Plan", "ROI Projections"],
    caseStudyIds: ["retail", "healthcare", "finance"]
  },
  {
    id: "data-analysis",
    title: "Data Analysis and Insights",
    shortDesc: "Turn your data into actionable insights with advanced AI analytics.",
    fullDesc: "Unlock the power of your data with our AI-driven analysis services. We help you collect, clean, and analyze data to uncover hidden patterns, predict trends, and make data-driven decisions that drive growth and efficiency.",
    icon: "https://d64gsuwffb70l.cloudfront.net/68f9980b6672a19b1652b6f6_1761236814676_88dc62c5.webp",
    benefits: ["Predictive insights", "Better decisions", "Trend identification", "Cost reduction"],
    process: [
      { step: 1, title: "Data Audit", desc: "Review and assess data sources" },
      { step: 2, title: "Integration", desc: "Connect and consolidate data streams" },
      { step: 3, title: "Analysis", desc: "Apply AI models for insights" },
      { step: 4, title: "Visualization", desc: "Create actionable dashboards" }
    ],
    features: ["Predictive Analytics", "Real-time Dashboards", "Custom Reports", "Data Quality Management"],
    caseStudyIds: ["manufacturing", "finance", "retail"]
  }
];
