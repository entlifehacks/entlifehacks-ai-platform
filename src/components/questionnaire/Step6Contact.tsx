import React from 'react';
import { timeframes } from '../../data/questionnaireOptions';

interface Step6Props {
  timeframe: string;
  email: string;
  phone: string;
  companyName: string;
  onTimeframeChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
}


const Step6Contact: React.FC<Step6Props> = ({ 
  timeframe, email, phone, companyName, 
  onTimeframeChange, onEmailChange, onPhoneChange, onCompanyChange 
}) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Implementation timeline & contact</h2>
      <p className="text-gray-600 mb-8">When would you like to start and how can we reach you?</p>
      
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Preferred Timeframe
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => onTimeframeChange(tf)}
                className={`p-4 rounded-lg border-2 font-semibold transition-all ${
                  timeframe === tf
                    ? 'border-[#0066ff] bg-blue-50 text-[#0066ff]'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => onCompanyChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#0066ff] focus:outline-none"
            placeholder="Your Company Inc."
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#0066ff] focus:outline-none"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#0066ff] focus:outline-none"
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>
    </div>
  );
};

export default Step6Contact;
