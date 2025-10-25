import React from 'react';

const Stats: React.FC = () => {
  const stats = [
    { value: '500+', label: 'Businesses Transformed' },
    { value: '250%', label: 'Average ROI' },
    { value: '95%', label: 'Client Satisfaction' },
    { value: '3 Months', label: 'Avg. Time to Value' },
  ];

  return (
    <div className="bg-gradient-to-r from-[#0066ff] to-blue-600 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center text-white">
              <div className="text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-blue-100 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
