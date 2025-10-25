import { Submission } from '../types/questionnaire';

const STORAGE_KEY = 'ai_consulting_submissions';
const ADMIN_KEY = 'ai_consulting_admin_auth';

export const saveSubmission = (submission: Submission): void => {
  const submissions = getSubmissions();
  submissions.push(submission);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
};

export const getSubmissions = (): Submission[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error parsing submissions:', error);
    return [];
  }
};


export const clearSubmissions = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const isAdminAuthenticated = (): boolean => {
  return localStorage.getItem(ADMIN_KEY) === 'authenticated';
};

export const setAdminAuth = (authenticated: boolean): void => {
  if (authenticated) {
    localStorage.setItem(ADMIN_KEY, 'authenticated');
  } else {
    localStorage.removeItem(ADMIN_KEY);
  }
};

export const exportSubmissionsCSV = (): string => {
  const submissions = getSubmissions();
  const headers = 'Date,Company,Email,Business Type,Budget,ROI,Timeframe\n';
  const rows = submissions.map(s => 
    `${new Date(s.timestamp).toLocaleDateString()},${s.companyName},${s.email},${s.businessType},${s.budget},${s.roiEstimate}%,${s.timeframe}`
  ).join('\n');
  return headers + rows;
};
