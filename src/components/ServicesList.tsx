import React from 'react';
import { CheckCircle } from 'lucide-react';

const services = [
  {
    title: 'AI Strategy Development',
    description: 'Custom AI roadmaps aligned with your business goals and objectives'
  },
  {
    title: 'Data Analysis and Insights',
    description: 'Transform raw data into actionable business intelligence'
  },
  {
    title: 'Business Process Automation',
    description: 'Streamline operations and reduce manual workload with intelligent automation'
  },
  {
    title: 'Sales Funnels',
    description: 'Optimize conversion rates with AI-powered sales funnel design and automation'
  },
  {
    title: 'Customer Relationship Management',
    description: 'Enhance customer experiences with intelligent CRM solutions',
    funNote: 'Yes!! We create AI agents and Chatbots 🤖'
  },

  {
    title: 'AI Digital Marketing',
    description: 'Data-driven marketing strategies powered by artificial intelligence'
  }
];

export const ServicesList: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Our Services
        </h2>
        <div className="space-y-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="flex gap-4 p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
                {service.funNote && (
                  <p className="text-blue-600 font-medium mt-2 italic">
                    {service.funNote}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

