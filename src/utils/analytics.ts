// Google Analytics 4 tracking utilities

declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

// Initialize GA4
export const initGA = () => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer?.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
    cookie_flags: 'SameSite=None;Secure'
  });
};

// Track page views
export const trackPageView = (url: string, title: string) => {
  if (!window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: url,
    page_title: title
  });
};

// Track custom events
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (!window.gtag) return;
  window.gtag('event', eventName, params);
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location
  });
};

// Track form submissions
export const trackFormSubmit = (formName: string, success: boolean) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success
  });
};

// Track questionnaire progress
export const trackQuestionnaireStep = (step: number, totalSteps: number) => {
  trackEvent('questionnaire_progress', {
    step: step,
    total_steps: totalSteps,
    progress_percentage: Math.round((step / totalSteps) * 100)
  });
};

// Track questionnaire completion
export const trackQuestionnaireComplete = (data: any) => {
  trackEvent('questionnaire_complete', {
    business_type: data.businessType,
    budget: data.budget,
    value: 'lead_generated'
  });
};

// Track Calendly booking
export const trackCalendlyBooking = (eventType: string) => {
  trackEvent('calendly_booking', {
    event_type: eventType,
    value: 'consultation_booked'
  });
};

// Track CTA clicks
export const trackCTAClick = (ctaName: string, ctaLocation: string) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation
  });
};
