import React, { useState } from 'react';
import { Recommendation } from '../types/questionnaire';
import CalendlyWidget from './CalendlyWidget';

interface ResultsProps {
  roi: number;
  recommendations: Recommendation[];
  onDownloadReport: () => void;
  userEmail?: string;
  userName?: string;
}

const Results: React.FC<ResultsProps> = ({ roi, recommendations, onDownloadReport, userEmail, userName }) => {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Personalized AI Projections</h2>

        <p className="text-xl text-gray-600">Based on your responses, here's what you can expect</p>
      </div>

      <div className="bg-gradient-to-br from-[#0066ff] to-blue-600 text-white rounded-2xl p-8 mb-12 shadow-xl">
        <div className="text-center">
          <div className="text-6xl font-bold mb-2">{roi}%</div>
          <div className="text-xl">Projected ROI in First Year</div>
          <p className="mt-4 text-blue-100">Based on similar implementations in your industry</p>
        </div>
      </div>

      <div className="grid gap-6 mb-12">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{rec.title}</h3>
            <p className="text-gray-700 mb-4">{rec.description}</p>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="font-semibold text-[#00c853]">ROI: {rec.roi}%</div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="font-semibold text-[#0066ff]">Timeline: {rec.timeToValue}</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="font-semibold text-purple-600">{rec.implementation}</div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">📊 {rec.caseStudy}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-12 rounded-r-lg">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold text-amber-900 mb-2">Important Note</h4>
            <p className="text-amber-800 text-sm leading-relaxed">
              These are approximate projections and each business and use case complexity can determine the actual results. It's always good to start with one problem area, resolve and move to the next.
            </p>
          </div>
        </div>
      </div>


      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={onDownloadReport} 
          className="bg-white border-2 border-[#0066ff] text-[#0066ff] px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Full Report (PDF)
        </button>

        <button 
          onClick={() => setIsCalendlyOpen(true)} 
          className="bg-[#0066ff] text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Book Free 30-Min Consultation
        </button>
      </div>

      <CalendlyWidget 
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        prefillData={{
          name: userName,
          email: userEmail
        }}
      />
    </div>
  );
};


export default Results;
