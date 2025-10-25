import React from 'react';
import { businessTypes } from '../../data/questionnaireOptions';

interface Step1Props {
  selected: string;
  onSelect: (value: string) => void;
}

const Step1BusinessType: React.FC<Step1Props> = ({ selected, onSelect }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">What's your business type?</h2>
      <p className="text-gray-600 mb-8">Select the industry that best describes your business</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {businessTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className={`p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
              selected === type.id
                ? 'border-[#0066ff] bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="text-4xl mb-3">{type.icon}</div>
            <div className="font-semibold text-gray-900">{type.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step1BusinessType;
