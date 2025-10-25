import { useEffect } from 'react';

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
        <p className="text-slate-600 mb-8">Last Updated: October 23, 2025</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-slate-700 leading-relaxed">
              By accessing or using the services provided by Huma Farman LLC, operating as Entrepreneur Life Hacks ("Company," "we," "our," or "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Services Description</h2>
            <p className="text-slate-700 leading-relaxed">
              We provide AI consulting services, including but not limited to AI strategy development, implementation support, training, and ongoing optimization. Services are provided on a project basis or through ongoing consulting arrangements as agreed upon in writing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. User Obligations</h2>
            <p className="text-slate-700 leading-relaxed mb-4">You agree to:</p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Use our services only for lawful purposes</li>
              <li>Not interfere with or disrupt our services</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Payment Terms</h2>
            <p className="text-slate-700 leading-relaxed">
              Payment terms are established in individual service agreements. Unless otherwise specified, payment is due upon completion of services or according to the payment schedule outlined in your agreement. Late payments may incur interest charges and may result in suspension of services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Intellectual Property</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              All content, materials, and intellectual property provided by us remain our property unless explicitly transferred in writing. Upon full payment, you receive a license to use deliverables as specified in your service agreement.
            </p>
            <p className="text-slate-700 leading-relaxed">
              You retain ownership of your proprietary information and grant us a limited license to use it solely for providing services to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Confidentiality</h2>
            <p className="text-slate-700 leading-relaxed">
              Both parties agree to maintain the confidentiality of proprietary information shared during the course of our engagement. This obligation survives termination of services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-slate-700 leading-relaxed">
              To the maximum extent permitted by law, Huma Farman LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities. Our total liability shall not exceed the amount paid by you for services in the six months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Warranties and Disclaimers</h2>
            <p className="text-slate-700 leading-relaxed">
              We provide services using reasonable skill and care. However, services are provided "as is" without warranties of any kind, express or implied. We do not guarantee specific results or outcomes from AI implementations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Termination</h2>
            <p className="text-slate-700 leading-relaxed">
              Either party may terminate services with written notice as specified in the service agreement. Upon termination, you must pay for all services rendered up to the termination date. Certain provisions, including confidentiality and intellectual property terms, survive termination.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. Indemnification</h2>
            <p className="text-slate-700 leading-relaxed">
              You agree to indemnify and hold harmless Huma Farman LLC from any claims, damages, or expenses arising from your use of our services, violation of these terms, or infringement of any third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">11. Dispute Resolution</h2>
            <p className="text-slate-700 leading-relaxed">
              Any disputes arising from these terms or our services shall be resolved through good faith negotiations. If negotiations fail, disputes shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, conducted in New York.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">12. Governing Law</h2>
            <p className="text-slate-700 leading-relaxed">
              These Terms of Service are governed by the laws of the State of New York, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">13. Changes to Terms</h2>
            <p className="text-slate-700 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of our services constitutes acceptance of modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">14. Contact Information</h2>
            <p className="text-slate-700 leading-relaxed">
              For questions regarding these Terms of Service, contact us at:
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
