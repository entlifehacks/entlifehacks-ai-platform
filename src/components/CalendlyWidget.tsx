import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { trackCalendlyBooking } from '@/utils/analytics';


interface CalendlyWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  prefillData?: {
    name?: string;
    email?: string;
  };
}

const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({ isOpen, onClose, prefillData }) => {
  useEffect(() => {
    if (isOpen && window.Calendly) {
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/your-calendly-username/30min',
        parentElement: document.getElementById('calendly-embed'),
        prefill: {
          name: prefillData?.name || '',
          email: prefillData?.email || '',
        },
        utm: {
          utmSource: 'ai-consulting-platform',
          utmMedium: 'results-page',
        }
      });

      // Track Calendly events
      const handleCalendlyEvent = (e: any) => {
        if (e.data.event === 'calendly.event_scheduled') {
          trackCalendlyBooking('AI Consultation');
        }
      };
      window.addEventListener('message', handleCalendlyEvent);
      return () => window.removeEventListener('message', handleCalendlyEvent);
    }
  }, [isOpen, prefillData]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-bold text-gray-900">Schedule Your Free Consultation</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X size={24} />
          </button>
        </div>
        <div id="calendly-embed" className="h-[600px] overflow-auto"></div>
      </div>
    </div>
  );
};

export default CalendlyWidget;

declare global {
  interface Window {
    Calendly: any;
  }
}
