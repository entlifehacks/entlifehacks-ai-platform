import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Cookie } from 'lucide-react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setShowBanner(false);
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setShowBanner(false);
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }
  };

  if (!showBanner) return null;

  return (

    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom max-w-sm">
      <Card className="p-4 shadow-lg border border-blue-200 bg-white/95 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <Cookie className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1.5 text-gray-800">Cookie Consent</h3>
            <p className="text-xs text-gray-600 mb-3 leading-relaxed">
              We use cookies to enhance your experience. Read our{' '}
              <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>.

            </p>
            <div className="flex gap-2">
              <Button onClick={handleAccept} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1">
                Accept
              </Button>
              <Button onClick={handleDecline} variant="outline" size="sm" className="text-xs px-3 py-1">
                Decline
              </Button>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleDecline} className="flex-shrink-0 h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>

  );
}
