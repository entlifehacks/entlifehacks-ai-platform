import { QuestionnaireData, Recommendation } from '../types/questionnaire';

export const sendImmediateReport = async (email: string, data: QuestionnaireData, recs: Recommendation[]) => {
  console.log('Sending immediate report to:', email);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, message: 'Report sent successfully' };
};

export const scheduleFollowUpEmails = async (email: string, companyName: string) => {
  console.log('Scheduling follow-up emails for:', email);
  
  // Day 3 follow-up
  setTimeout(() => {
    console.log('Day 3 follow-up sent to:', email);
  }, 3 * 24 * 60 * 60 * 1000);
  
  // Day 7 follow-up
  setTimeout(() => {
    console.log('Day 7 consultation reminder sent to:', email);
  }, 7 * 24 * 60 * 60 * 1000);
  
  return { success: true };
};

export const generatePDFReport = (data: QuestionnaireData, recs: Recommendation[]): string => {
  // In production, this would generate actual PDF
  return `data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iag==`;
};
