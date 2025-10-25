import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail } from 'lucide-react';

const Careers: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Join Our Team
            </h1>
            <p className="text-xl text-gray-600">
              Help us transform small businesses through AI innovation
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              We're Looking For Talented Professionals
            </h2>
            
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed mb-6">
                If you are an <span className="font-semibold text-[#0EA5E9]">innovative data analyst</span>, 
                an <span className="font-semibold text-[#0EA5E9]">enthusiastic and modern digital marketer</span>, 
                or a <span className="font-semibold text-[#0EA5E9]">passionate sales representative</span> with 
                in-depth knowledge of AI technology, we want to hear from you!
              </p>
            </div>

            <div className="bg-gradient-to-r from-[#0EA5E9]/10 to-[#8B5CF6]/10 rounded-xl p-8 text-center">
              <Mail className="w-12 h-12 text-[#0EA5E9] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Apply Now
              </h3>
              <p className="text-gray-700 mb-4">
                Send us an email with your resume at:
              </p>
              <a 
                href="mailto:huma@entlifehacks.com" 
                className="inline-block text-2xl font-bold text-[#0EA5E9] hover:text-[#0284C7] transition-colors"
              >
                huma@entlifehacks.com
              </a>
              <p className="text-gray-600 mt-4">
                One of us will reach out to you shortly.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
