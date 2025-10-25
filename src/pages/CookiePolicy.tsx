import { useEffect } from 'react';

export default function CookiePolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Cookie Policy</h1>
        <p className="text-slate-600 mb-8">Last Updated: October 23, 2025</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. What Are Cookies</h2>
            <p className="text-slate-700 leading-relaxed">
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. How We Use Cookies</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Huma Farman LLC uses cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Essential website functionality and security</li>
              <li>Remembering your preferences and settings</li>
              <li>Analyzing website traffic and user behavior</li>
              <li>Improving our services and user experience</li>
              <li>Measuring the effectiveness of our marketing campaigns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Types of Cookies We Use</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-slate-800 mb-3">Essential Cookies</h3>
                <p className="text-slate-700 leading-relaxed">
                  These cookies are necessary for the website to function properly. They enable basic functions like page navigation, secure access, and form submissions. The website cannot function properly without these cookies.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-slate-800 mb-3">Analytics Cookies</h3>
                <p className="text-slate-700 leading-relaxed">
                  We use analytics cookies (such as Google Analytics) to understand how visitors interact with our website. This helps us improve our content and user experience. These cookies collect information anonymously and report website trends.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-slate-800 mb-3">Functionality Cookies</h3>
                <p className="text-slate-700 leading-relaxed">
                  These cookies allow our website to remember choices you make (such as your preferences) and provide enhanced, personalized features. They may also be used to provide services you have requested.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-slate-800 mb-3">Marketing Cookies</h3>
                <p className="text-slate-700 leading-relaxed">
                  These cookies track your online activity to help us deliver more relevant advertising and measure the effectiveness of our marketing campaigns. They may be set by us or by third-party advertising partners.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Third-Party Cookies</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We use third-party services that may set cookies on your device, including:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li><strong>Google Analytics:</strong> For website analytics and performance tracking</li>
              <li><strong>Calendly:</strong> For appointment scheduling functionality</li>
              <li><strong>Email Service Providers:</strong> For tracking email campaign engagement</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              These third parties have their own privacy policies and cookie policies, which we encourage you to review.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Managing Cookies</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              You have the right to decide whether to accept or reject cookies. You can manage your cookie preferences through:
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">Cookie Consent Banner</h3>
                <p className="text-slate-700 leading-relaxed">
                  When you first visit our website, you can choose which types of cookies to accept through our cookie consent banner.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">Browser Settings</h3>
                <p className="text-slate-700 leading-relaxed">
                  Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or delete certain cookies. Please note that if you disable cookies, some features of our website may not function properly.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Browser-Specific Instructions</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              To manage cookies in your specific browser:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Cookie Duration</h2>
            <p className="text-slate-700 leading-relaxed">
              Cookies may be session cookies (deleted when you close your browser) or persistent cookies (remain on your device for a set period or until you delete them). The duration varies depending on the cookie's purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Updates to This Policy</h2>
            <p className="text-slate-700 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Contact Us</h2>
            <p className="text-slate-700 leading-relaxed">
              If you have questions about our use of cookies, please contact us at:
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
