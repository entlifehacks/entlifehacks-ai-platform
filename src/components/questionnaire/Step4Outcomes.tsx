import React from 'react';
import { outcomes } from '../../data/questionnaireOptions';

interface Step4Props {
  selected: string[];
  onToggle: (value: string) => void;
}

const Step4Outcomes: React.FC<Step4Props> = ({ selected, onToggle }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">What outcomes do you want to achieve?</h2>
      <p className="text-gray-600 mb-8">Prioritize your top business goals</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {outcomes.map((outcome) => (
          <button
            key={outcome}
            onClick={() => onToggle(outcome)}
            className={`p-6 rounded-lg border-2 text-left transition-all hover:shadow-md ${
              selected.includes(outcome)
                ? 'border-[#00c853] bg-green-50'
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded border-2 mr-4 flex items-center justify-center ${
                selected.includes(outcome) ? 'bg-[#00c853] border-[#00c853]' : 'border-gray-300'
              }`}>
                {selected.includes(outcome) && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                )}
              </div>
              <span className="font-semibold text-gray-900 text-lg">{outcome}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step4Outcomes;
