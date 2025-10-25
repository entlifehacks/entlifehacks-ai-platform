import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "The AI solutions transformed our customer service. We reduced response times by 70% and customer satisfaction increased dramatically.",
      author: "Sarah Johnson",
      role: "CEO, TechRetail Inc.",
      company: "E-commerce"
    },
    {
      quote: "ROI exceeded our expectations. The predictive analytics helped us optimize inventory and save over $2M in the first year.",
      author: "Michael Chen",
      role: "COO, GlobalMart",
      company: "Retail"
    },
    {
      quote: "Implementation was smooth and the team was incredibly supportive. We saw results within 2 months of deployment.",
      author: "Emily Rodriguez",
      role: "CTO, FinanceFlow",
      company: "Finance"
    },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600">Real results from real businesses</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl text-[#0066ff] mb-4">"</div>
              <p className="text-gray-700 mb-6 italic">{testimonial.quote}</p>
              <div className="border-t pt-4">
                <div className="font-bold text-gray-900">{testimonial.author}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
                <div className="text-sm text-[#0066ff] mt-1">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
