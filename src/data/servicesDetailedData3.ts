import { PricingTier } from './pricingData';

export const additionalPricing: Record<string, PricingTier[]> = {
  "automation": [
    { name: "Starter", price: "Custom", period: "contact us", description: "Automate key processes", features: ["Up to 5 Workflows", "Standard Integrations", "Email Support", "Monthly Optimization"], cta: "Contact for Pricing" },
    { name: "Growth", price: "Custom", period: "contact us", description: "Scale automation", features: ["Unlimited Workflows", "Custom Integrations", "Document AI", "Priority Support", "Weekly Reviews"], popular: true, cta: "Contact for Pricing" },
    { name: "Enterprise", price: "Custom", period: "contact us", description: "Full automation suite", features: ["Everything in Growth", "Dedicated Automation Engineer", "24/7 Support", "Custom AI Models", "SLA Guarantee"], cta: "Contact for Pricing" }
  ],
  "sales-funnels": [
    { name: "Basic", price: "Custom", period: "contact us", description: "Optimize your funnel", features: ["Funnel Analysis", "Basic Automation", "A/B Testing", "Email Support"], cta: "Contact for Pricing" },
    { name: "Pro", price: "Custom", period: "contact us", description: "Advanced optimization", features: ["Multi-channel Funnels", "AI Lead Scoring", "Advanced Automation", "Conversion Optimization", "Priority Support"], popular: true, cta: "Contact for Pricing" },
    { name: "Enterprise", price: "Custom", period: "contact us", description: "Complete funnel solution", features: ["Everything in Pro", "Dedicated Strategist", "Custom AI Models", "White-label Solutions", "24/7 Support"], cta: "Contact for Pricing" }
  ],
  "crm": [
    { name: "Starter", price: "Custom", period: "contact us", description: "Essential CRM", features: ["Up to 1,000 Contacts", "Basic AI Features", "Standard Integrations", "Email Support"], cta: "Contact for Pricing" },
    { name: "Professional", price: "Custom", period: "contact us", description: "Advanced CRM", features: ["Unlimited Contacts", "Predictive Lead Scoring", "Custom Integrations", "AI Insights", "Priority Support"], popular: true, cta: "Contact for Pricing" },
    { name: "Enterprise", price: "Custom", period: "contact us", description: "Enterprise CRM", features: ["Everything in Professional", "Dedicated Account Manager", "Custom AI Models", "White-label Options", "24/7 Support"], cta: "Contact for Pricing" }
  ],
  "digital-marketing": [
    { name: "Starter", price: "Custom", period: "contact us", description: "AI marketing basics", features: ["AI Content Generation", "2 Channels", "Basic Analytics", "Email Support"], cta: "Contact for Pricing" },
    { name: "Growth", price: "Custom", period: "contact us", description: "Scale your marketing", features: ["Unlimited Content", "All Channels", "Advanced Analytics", "Ad Optimization", "Priority Support"], popular: true, cta: "Contact for Pricing" },
    { name: "Enterprise", price: "Custom", period: "contact us", description: "Full marketing suite", features: ["Everything in Growth", "Dedicated Marketing Manager", "Custom AI Models", "White-label Reports", "24/7 Support"], cta: "Contact for Pricing" }
  ]
};
