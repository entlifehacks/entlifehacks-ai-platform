import React from 'react';
import { aiSolutions } from '../../data/questionnaireOptions';

interface Step3Props {
  selected: string[];
  onToggle: (value: string) => void;
}

const Step3AISolutions: React.FC<Step3Props> = ({ selected, onToggle }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Which AI solutions interest you?</h2>
      <p className="text-gray-600 mb-8">Select all technologies you'd like to explore</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {aiSolutions.map((solution) => (
          <button
            key={solution}
            onClick={() => onToggle(solution)}
            className={`p-5 rounded-lg border-2 text-left transition-all hover:shadow-md ${
              selected.includes(solution)
                ? 'border-[#0066ff] bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                selected.includes(solution) ? 'bg-[#0066ff] border-[#0066ff]' : 'border-gray-300'
              }`}>
                {selected.includes(solution) && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                )}
              </div>
              <span className="font-semibold text-gray-900">{solution}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step3AISolutions;
