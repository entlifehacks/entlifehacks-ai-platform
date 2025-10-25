import { useEffect } from 'react';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
        <p className="text-slate-600 mb-8">Last Updated: October 23, 2025</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Introduction</h2>
            <p className="text-slate-700 leading-relaxed">
              Huma Farman LLC ("we," "our," or "us") operating as Entrepreneur Life Hacks is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-medium text-slate-800 mb-3">Personal Information</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Name, email address, phone number, and company information</li>
              <li>Business details and consultation requests</li>
              <li>Communication preferences and feedback</li>
              <li>Payment and billing information for services</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-medium text-slate-800 mb-3">Automatically Collected Information</h3>
            <p className="text-slate-700 leading-relaxed">
              When you access our website, we automatically collect certain information, including IP address, browser type, device information, pages visited, and usage patterns through cookies and analytics tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Provide, maintain, and improve our AI consulting services</li>
              <li>Process transactions and send related information</li>
              <li>Respond to inquiries and provide customer support</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Comply with legal obligations and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Information Sharing</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We do not sell your personal information. We may share information with:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Service providers who assist in our operations (e.g., payment processors, email services)</li>
              <li>Professional advisors and legal authorities when required by law</li>
              <li>Business partners with your explicit consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Data Security</h2>
            <p className="text-slate-700 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Your Rights</h2>
            <p className="text-slate-700 leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Access and receive a copy of your personal data</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to processing of your personal data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Cookies and Tracking</h2>
            <p className="text-slate-700 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience. See our Cookie Policy for detailed information about the cookies we use and how to manage them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Third-Party Services</h2>
            <p className="text-slate-700 leading-relaxed">
              Our website may contain links to third-party services (e.g., Calendly for scheduling). These services have their own privacy policies, and we are not responsible for their practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Children's Privacy</h2>
            <p className="text-slate-700 leading-relaxed">
              Our services are not directed to individuals under 18. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. Changes to This Policy</h2>
            <p className="text-slate-700 leading-relaxed">
              We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on this page with an updated effective date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">11. Contact Us</h2>
            <p className="text-slate-700 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-slate-100 p-4 rounded-lg mt-4">
              <p className="text-slate-900 font-medium">Huma Farman LLC</p>
              <p className="text-slate-700">New City, NY 10956</p>
              <p className="text-slate-700">Email: huma@entlifehacks.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
