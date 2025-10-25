import React from 'react';

const About: React.FC = () => {
  return (
    <div id="about" className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">

      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg">
            We are a dedicated team of AI experts with extensive backgrounds in data science and analytics, 
            headquartered in <span className="font-semibold text-gray-900">New York</span>. Our mission was 
            born from a simple yet powerful observation: small businesses need legitimate AI solutions the most, 
            yet often struggle to access them while managing tight budgets and operational overhead.
          </p>
          
          <p className="text-lg">
            <span className="font-semibold text-gray-900">Data is the cornerstone of the AI revolution.</span> With 
            our team bringing over 15 years of combined experience in technology and entrepreneurship, we possess 
            the unique ability to connect the dots between your business challenges and cutting-edge AI solutions. 
            We don't just implement technology—we craft tailored strategies that drive real, measurable results.
          </p>
          
          <p className="text-lg">
            Beyond implementation, our company is committed to <span className="font-semibold text-gray-900">educating 
            and empowering small business owners</span> to embrace technological advancement. We believe that understanding 
            AI is just as important as using it. Through our consultative approach, we ensure you're equipped to leverage 
            these tools to their fullest potential, transforming challenges into competitive advantages.
          </p>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-xl font-semibold text-blue-600">
              Let's build your AI-powered future together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
