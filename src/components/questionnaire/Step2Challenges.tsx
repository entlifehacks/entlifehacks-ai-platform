import React from 'react';
import { challenges } from '../../data/questionnaireOptions';

interface Step2Props {
  selected: string[];
  onToggle: (value: string) => void;
}

const Step2Challenges: React.FC<Step2Props> = ({ selected, onToggle }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">What challenges are you facing?</h2>
      <p className="text-gray-600 mb-8">Select all that apply (minimum 1)</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {challenges.map((challenge) => (
          <button
            key={challenge}
            onClick={() => onToggle(challenge)}
            className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
              selected.includes(challenge)
                ? 'border-[#0066ff] bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                selected.includes(challenge) ? 'bg-[#0066ff] border-[#0066ff]' : 'border-gray-300'
              }`}>
                {selected.includes(challenge) && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                )}
              </div>
              <span className="text-sm font-medium text-gray-900">{challenge}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step2Challenges;
