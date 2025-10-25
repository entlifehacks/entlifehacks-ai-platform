import React, { useState, useEffect } from 'react';
import { QuestionnaireData } from '../types/questionnaire';
import ProgressBar from './ProgressBar';
import Step1BusinessType from './questionnaire/Step1BusinessType';
import Step2Challenges from './questionnaire/Step2Challenges';
import Step3AISolutions from './questionnaire/Step3AISolutions';
import Step4Outcomes from './questionnaire/Step4Outcomes';
import Step5Budget from './questionnaire/Step5Budget';
import Step6Contact from './questionnaire/Step6Contact';
import { trackQuestionnaireStep, trackQuestionnaireComplete } from '@/utils/analytics';


interface QuestionnaireProps {
  onComplete: (data: QuestionnaireData) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuestionnaireData>({
    businessType: '',
    challenges: [],
    aiSolutions: [],
    outcomes: [],
    budget: 50000,
    timeframe: '6-12 months',
    email: '',
    companyName: '',
    phone: '',
  });


  const totalSteps = 6;

  useEffect(() => {
    trackQuestionnaireStep(step, totalSteps);
  }, [step]);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      trackQuestionnaireComplete(data);
      onComplete(data);
    }
  };


  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    switch(step) {
      case 1: return data.businessType !== '';
      case 2: return data.challenges.length > 0;
      case 3: return data.aiSolutions.length > 0;
      case 4: return data.outcomes.length > 0;
      case 6: return data.email && data.companyName;
      default: return true;
    }
  };

  const toggleArray = (arr: string[], value: string) => {
    return arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <ProgressBar currentStep={step} totalSteps={totalSteps} />
      
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        {step === 1 && <Step1BusinessType selected={data.businessType} onSelect={(v) => setData({...data, businessType: v})} />}
        {step === 2 && <Step2Challenges selected={data.challenges} onToggle={(v) => setData({...data, challenges: toggleArray(data.challenges, v)})} />}
        {step === 3 && <Step3AISolutions selected={data.aiSolutions} onToggle={(v) => setData({...data, aiSolutions: toggleArray(data.aiSolutions, v)})} />}
        {step === 4 && <Step4Outcomes selected={data.outcomes} onToggle={(v) => setData({...data, outcomes: toggleArray(data.outcomes, v)})} />}
        {step === 5 && <Step5Budget value={data.budget} onChange={(v) => setData({...data, budget: v})} />}
        {step === 6 && <Step6Contact timeframe={data.timeframe} email={data.email} companyName={data.companyName} phone={data.phone} onTimeframeChange={(v) => setData({...data, timeframe: v})} onEmailChange={(v) => setData({...data, email: v})} onCompanyChange={(v) => setData({...data, companyName: v})} onPhoneChange={(v) => setData({...data, phone: v})} />}

      </div>

      <div className="flex justify-between">
        <button onClick={handleBack} disabled={step === 1} className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold disabled:opacity-50 hover:bg-gray-50 transition-colors">
          Back
        </button>
        <button onClick={handleNext} disabled={!canProceed()} className="px-8 py-3 bg-[#0066ff] text-white rounded-lg font-semibold disabled:opacity-50 hover:bg-blue-600 transition-colors">
          {step === totalSteps ? 'Get Results' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
