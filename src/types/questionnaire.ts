export interface QuestionnaireData {
  businessType: string;
  challenges: string[];
  aiSolutions: string[];
  outcomes: string[];
  budget: number;
  timeframe: string;
  email: string;
  phone: string;
  companyName: string;
}


export interface Submission extends QuestionnaireData {
  id: string;
  timestamp: Date;
  roiEstimate: number;
  recommendations: Recommendation[];
}

export interface Recommendation {
  title: string;
  description: string;
  roi: number;
  timeToValue: string;
  implementation: string;
  caseStudy: string;
}

export interface AnalyticsData {
  totalSubmissions: number;
  avgBudget: number;
  topIndustries: { name: string; count: number }[];
  conversionRate: number;
  submissionsByDate: { date: string; count: number }[];
}
