import { QuestionnaireData, Recommendation } from '../types/questionnaire';

export const calculateROI = (data: QuestionnaireData): number => {
  let baseROI = 100;
  
  // Business type impact (20-80 points)
  const businessMultipliers: Record<string, number> = {
    'E-commerce': 75,
    'SaaS': 85,
    'Healthcare': 65,
    'Finance': 80,
    'Manufacturing': 60,
    'Retail': 70,
    'Professional Services': 55,
    'Education': 50,
    'Other': 45
  };
  baseROI += businessMultipliers[data.businessType] || 50;
  
  // Challenge complexity (10-60 points)
  const challengeWeights: Record<string, number> = {
    'High operational costs': 15,
    'Slow decision making': 12,
    'Poor customer experience': 18,
    'Data silos': 14,
    'Manual processes': 20,
    'Scaling difficulties': 16
  };
  data.challenges.forEach(challenge => {
    baseROI += challengeWeights[challenge] || 10;
  });
  
  // AI solution sophistication (15-75 points)
  const solutionWeights: Record<string, number> = {
    'Chatbots & Virtual Assistants': 22,
    'Predictive Analytics': 28,
    'Process Automation': 25,
    'Computer Vision': 30,
    'Natural Language Processing': 26,
    'Recommendation Systems': 24
  };
  data.aiSolutions.forEach(solution => {
    baseROI += solutionWeights[solution] || 18;
  });
  
  // Desired outcomes (8-40 points)
  const outcomeWeights: Record<string, number> = {
    'Reduce costs': 12,
    'Increase revenue': 15,
    'Improve efficiency': 10,
    'Better customer satisfaction': 13,
    'Competitive advantage': 14,
    'Data-driven decisions': 11
  };
  data.outcomes.forEach(outcome => {
    baseROI += outcomeWeights[outcome] || 8;
  });
  
  // Budget multiplier (1.0x - 1.8x)
  let budgetMultiplier = 1.0;
  if (data.budget >= 250000) budgetMultiplier = 1.8;
  else if (data.budget >= 100000) budgetMultiplier = 1.5;
  else if (data.budget >= 50000) budgetMultiplier = 1.3;
  else if (data.budget >= 25000) budgetMultiplier = 1.15;
  
  baseROI *= budgetMultiplier;
  
  // Timeframe adjustment
  if (data.timeframe === 'Immediate (< 3 months)') baseROI *= 0.85;
  else if (data.timeframe === '3-6 months') baseROI *= 1.1;
  else if (data.timeframe === '6-12 months') baseROI *= 1.25;
  else if (data.timeframe === '12+ months') baseROI *= 1.4;
  
  return Math.round(Math.min(Math.max(baseROI, 120), 480));
};

export const generateRecommendations = (data: QuestionnaireData): Recommendation[] => {
  const recs: Recommendation[] = [];
  
  if (data.aiSolutions.includes('Chatbots & Virtual Assistants')) {
    recs.push({
      title: 'AI-Powered Customer Service',
      description: 'Deploy intelligent chatbots to handle 70% of customer inquiries automatically',
      roi: 280,
      timeToValue: '2-3 months',
      implementation: 'Cloud-based deployment with existing CRM integration',
      caseStudy: 'Similar company reduced support costs by 65% in 6 months'
    });
  }
  
  if (data.aiSolutions.includes('Predictive Analytics')) {
    recs.push({
      title: 'Predictive Business Intelligence',
      description: 'Forecast trends and optimize decisions with ML-powered analytics',
      roi: 320,
      timeToValue: '3-4 months',
      implementation: 'Data pipeline setup with custom ML models',
      caseStudy: 'Clients see 40% improvement in forecasting accuracy'
    });
  }
  
  if (data.aiSolutions.includes('Process Automation')) {
    recs.push({
      title: 'Intelligent Process Automation',
      description: 'Automate repetitive tasks and workflows with AI-driven RPA',
      roi: 250,
      timeToValue: '1-2 months',
      implementation: 'Low-code platform with pre-built templates',
      caseStudy: 'Average time savings of 20 hours per employee per week'
    });
  }
  
  return recs.slice(0, 3);
};
