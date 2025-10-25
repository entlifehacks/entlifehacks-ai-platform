import React from 'react';

interface Step5Props {
  value: number;
  onChange: (value: number) => void;
}

const Step5Budget: React.FC<Step5Props> = ({ value, onChange }) => {
  const formatBudget = (val: number) => {
    if (val >= 500000) return '$500K+';
    return `$${(val / 1000).toFixed(0)}K`;
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">What's your investment budget?</h2>
      <p className="text-gray-600 mb-8">Select your approximate budget range for AI implementation</p>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl mb-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-[#0066ff] mb-2">
              {formatBudget(value)}
            </div>
            <div className="text-lg text-gray-600">Annual AI Investment Budget</div>
          </div>
        </div>
        
        <input
          type="range"
          min="2000"
          max="500000"
          step="2000"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>$2K</span>
          <span>$500K+</span>
        </div>
      </div>
    </div>
  );
};

export default Step5Budget;
