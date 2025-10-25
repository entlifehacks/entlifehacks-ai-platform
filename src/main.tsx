import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initGA } from './utils/analytics';

// Initialize Google Analytics if consent is given
const consent = localStorage.getItem('cookie_consent');
if (consent === 'accepted') {
  initGA();
} else {
  // Initialize with consent mode
  if (window.gtag) {
    window.gtag('consent', 'default', {
      analytics_storage: 'denied'
    });
  }
}

createRoot(document.getElementById("root")!).render(<App />);
