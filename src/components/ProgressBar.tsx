import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
      <div 
        className="bg-gradient-to-r from-[#0066ff] to-blue-400 h-3 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
      <p className="text-sm text-gray-600 mt-2 text-center">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
};

export default ProgressBar;
