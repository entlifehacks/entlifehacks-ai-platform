import React from 'react';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  color?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-[#0066ff]',
    green: 'bg-green-50 text-[#00c853]',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        {trend && (
          <span className="text-sm font-semibold text-green-600">{trend}</span>
        )}
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{title}</div>
    </div>
  );
};

export default AnalyticsCard;
