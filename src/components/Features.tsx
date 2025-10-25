import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      icon: '🎯',
      title: 'Personalized Recommendations',
      description: 'Get AI solutions tailored specifically to your business needs and industry challenges'
    },
    {
      icon: '📊',
      title: 'ROI Projections',
      description: 'See detailed return on investment estimates based on real implementation data'
    },
    {
      icon: '⚡',
      title: 'Fast Implementation',
      description: 'Quick deployment timelines with proven methodologies and best practices'
    },
    {
      icon: '🔒',
      title: 'Secure & Compliant',
      description: 'Enterprise-grade security with GDPR and industry compliance standards'
    },
    {
      icon: '💡',
      title: 'Expert Guidance',
      description: 'Access to AI specialists and consultants throughout your journey'
    },
    {
      icon: '📈',
      title: 'Proven Results',
      description: 'Track record of successful implementations across multiple industries'
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Help Your Business</h2>
          <p className="text-xl text-gray-600">Comprehensive AI consulting from assessment to implementation</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 rounded-xl border-2 border-gray-200 hover:border-[#0066ff] hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
