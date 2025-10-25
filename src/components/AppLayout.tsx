import React, { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import Questionnaire from './Questionnaire';
import Results from './Results';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './admin/AdminLogin';
import Features from './Features';
import Footer from './Footer';
import { CookieConsent } from './CookieConsent';
import { CaseStudies } from './CaseStudies';
import { ContactForm } from './ContactForm';
import { PDFPreviewModal } from './PDFPreviewModal';
import { ServicesList } from './ServicesList';
import About from './About';




import { QuestionnaireData, Submission } from '../types/questionnaire';
import { calculateROI, generateRecommendations } from '../utils/roiCalculator';
import { saveSubmission } from '../utils/storage';
import { SendGridEmailService } from '../utils/sendgridService';
import { EmailTemplateData } from '../utils/emailTemplates';
import { isAdminAuthenticated, setAdminAuth } from '../utils/storage';


type View = 'home' | 'questionnaire' | 'results' | 'admin';

const AppLayout: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [isAdminAuth, setIsAdminAuth] = useState(isAdminAuthenticated());
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);

  const handleStartAssessment = () => setView('questionnaire');

  const handleQuestionnaireComplete = async (data: QuestionnaireData) => {
    const roi = calculateROI(data);
    const recommendations = generateRecommendations(data);
    const newSubmission: Submission = {
      ...data, id: Date.now().toString(), timestamp: new Date(), roiEstimate: roi, recommendations,
    };
    saveSubmission(newSubmission);
    setSubmission(newSubmission);
    
    // Send email with results
    try {
      const { sendQuestionnaireResultsEmail } = await import('../utils/questionnaireEmailService');
      await sendQuestionnaireResultsEmail({
        submission: newSubmission,
        recommendations,
        estimatedSavings: roi.estimatedSavings || 0,
        paybackMonths: roi.paybackMonths || 0,
        threeYearROI: roi.threeYearROI || 0
      });
    } catch (error) {
      console.error('Email send failed:', error);
    }
    
    setView('results');
  };


  const handleDownloadReport = () => {
    setIsPDFModalOpen(true);
  };





  const handleAdminLogin = () => { setAdminAuth(true); setIsAdminAuth(true); };

  if (window.location.pathname === '/admin') {
    return isAdminAuth ? <AdminDashboard /> : <AdminLogin onLogin={handleAdminLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CookieConsent />
      {view === 'home' && (<><Header onNavigateHome={handleStartAssessment} /><Hero onStartAssessment={handleStartAssessment} /><About /><ServicesList /><Features /><CaseStudies /><div id="contact" className="py-16 px-4 bg-white"><ContactForm /></div><Footer /></>)}






      {view === 'questionnaire' && (<><Header onNavigateHome={() => setView('home')} showNavigation={false} /><Questionnaire onComplete={handleQuestionnaireComplete} /><Footer /></>)}
      {view === 'results' && submission && (
        <>
          <Header onNavigateHome={() => setView('home')} showNavigation={false} />
          <div className="py-16">
            <Results 
              roi={submission.roiEstimate} 
              recommendations={submission.recommendations} 
              onDownloadReport={handleDownloadReport} 
              userEmail={submission.email} 
              userName={submission.companyName} 
            />
          </div>
          <Footer />
          <PDFPreviewModal 
            isOpen={isPDFModalOpen} 
            onClose={() => setIsPDFModalOpen(false)} 
            submission={submission} 
          />
        </>
      )}
    </div>
  );

};

export default AppLayout;
