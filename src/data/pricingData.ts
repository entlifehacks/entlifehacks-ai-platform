export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

export const pricingTiers: Record<string, PricingTier[]> = {
  "ai-strategy": [
    { 
      name: "Starter", 
      price: "$500", 
      period: "starting from", 
      description: "Perfect for small businesses", 
      features: ["AI Readiness Assessment", "Basic Strategy Document", "30-day Email Support", "Technology Recommendations"], 
      cta: "Contact for Pricing" 
    },
    { 
      name: "Professional", 
      price: "Custom", 
      period: "contact us", 
      description: "For growing companies", 
      features: ["Comprehensive AI Audit", "Detailed Implementation Roadmap", "90-day Support", "Change Management Plan", "ROI Projections"], 
      popular: true, 
      cta: "Contact for Pricing" 
    },
    { 
      name: "Enterprise", 
      price: "Custom", 
      period: "contact us", 
      description: "For large organizations", 
      features: ["Full AI Transformation Strategy", "Executive Workshops", "12-month Support", "Dedicated AI Consultant", "Ongoing Optimization"], 
      cta: "Contact for Pricing" 
    }
  ],
  "data-analysis": [
    { 
      name: "Basic", 
      price: "Custom", 
      period: "contact us", 
      description: "Essential analytics", 
      features: ["Up to 3 Data Sources", "Standard Dashboards", "Monthly Reports", "Email Support"], 
      cta: "Contact for Pricing" 
    },
    { 
      name: "Advanced", 
      price: "Custom", 
      period: "contact us", 
      description: "Advanced insights", 
      features: ["Unlimited Data Sources", "Custom Dashboards", "Real-time Analytics", "Predictive Models", "Priority Support"], 
      popular: true, 
      cta: "Contact for Pricing" 
    },
    { 
      name: "Enterprise", 
      price: "Custom", 
      period: "contact us", 
      description: "Full analytics suite", 
      features: ["Everything in Advanced", "Dedicated Data Scientist", "Custom AI Models", "White-label Reports", "24/7 Support"], 
      cta: "Contact for Pricing" 
    }
  ]
};
