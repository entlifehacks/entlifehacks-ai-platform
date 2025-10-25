import React from 'react';
import { trackCTAClick } from '@/utils/analytics';

interface HeroProps {
  onStartAssessment: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartAssessment }) => {
  return (
    <div className="relative bg-gradient-to-br from-[#1a2332] via-[#0f1824] to-[#1a2332] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://d64gsuwffb70l.cloudfront.net/68f9980b6672a19b1652b6f6_1761187897277_bd83b528.webp" 
          alt="AI Network"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Empower Your Business with Artificial Intelligence
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Discover personalized AI solutions tailored to your business. Try our free assessment tool to get a quick ROI estimate and roadmap.
          </p>

          <button
            onClick={() => {
              trackCTAClick('Generate Your Free Report', 'Hero Section');
              onStartAssessment();
            }}
            className="bg-[#0066ff] hover:bg-blue-600 text-white px-12 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Generate Your Free Report
          </button>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-lg font-medium text-white">No credit card required</p>
            <span className="text-gray-300">•</span>
            <p className="text-lg text-gray-300">5 minutes to complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
