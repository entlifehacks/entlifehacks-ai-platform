import React, { useState, useEffect } from 'react';
import { getSubmissions, exportSubmissionsCSV, setAdminAuth } from '../utils/storage';
import { Submission } from '../types/questionnaire';
import AnalyticsCard from './admin/AnalyticsCard';
import SubmissionsTable from './admin/SubmissionsTable';
import EmailStatsPanel from './admin/EmailStatsPanel';
import EmailTemplateEditor from './admin/EmailTemplateEditor';
import ScheduledEmailsPanel from './admin/ScheduledEmailsPanel';
import EmailAnalyticsDashboard from './admin/EmailAnalyticsDashboard';
import ABTestingPanel from './admin/ABTestingPanel';
import { CaseStudiesPanel } from './admin/CaseStudiesPanel';
import { ContactSubmissionsTable } from './admin/ContactSubmissionsTable';
import { BlogPanel } from './admin/BlogPanel';
import DocumentationPanel from './admin/DocumentationPanel';





const AdminDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [activeTab, setActiveTab] = useState<'submissions' | 'emails' | 'templates' | 'scheduled' | 'analytics' | 'abtesting' | 'casestudies' | 'contact' | 'blog' | 'docs'>('submissions');








  useEffect(() => {
    setSubmissions(getSubmissions());
  }, []);

  const handleExport = () => {
    const csv = exportSubmissionsCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'submissions.csv';
    a.click();
  };

  const handleLogout = () => {
    setAdminAuth(false);
    window.location.reload();
  };

  const avgBudget = submissions.length > 0 
    ? submissions.reduce((sum, s) => sum + s.budget, 0) / submissions.length 
    : 0;

  const avgROI = submissions.length > 0
    ? submissions.reduce((sum, s) => sum + s.roiEstimate, 0) / submissions.length
    : 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/68f9969a6672a19b16528a96_1761193305393_121a01f9.png" 
              alt="ECLH AI Consulting Logo" 
              className="h-12 w-auto"
            />
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>

          <button onClick={handleLogout} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            Logout
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnalyticsCard title="Total Submissions" value={submissions.length} icon="📊" color="blue" />
          <AnalyticsCard title="Avg Budget" value={`$${(avgBudget/1000).toFixed(0)}K`} icon="💰" color="green" />
          <AnalyticsCard title="Avg ROI" value={`${avgROI.toFixed(0)}%`} icon="📈" color="purple" />
          <AnalyticsCard title="Conversion Rate" value="68%" icon="🎯" color="orange" trend="+12%" />
        </div>

        <div className="mb-6">
          <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('submissions')}
              className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'submissions' ? 'text-[#0066ff] border-b-2 border-[#0066ff]' : 'text-gray-600'}`}
            >
              Submissions
            </button>
            <button 
              onClick={() => setActiveTab('emails')}
              className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'emails' ? 'text-[#0066ff] border-b-2 border-[#0066ff]' : 'text-gray-600'}`}
            >
              Email Tracking
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'analytics' ? 'text-[#0066ff] border-b-2 border-[#0066ff]' : 'text-gray-600'}`}
            >
              Analytics
            </button>
            <button 
              onClick={() => setActiveTab('abtesting')}
              className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'abtesting' ? 'text-[#0066ff] border-b-2 border-[#0066ff]' : 'text-gray-600'}`}
            >
              A/B Testing
            </button>
            <button 
              onClick={() => setActiveTab('templates')}
              className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'templates' ? 'text-[#0066ff] border-b-2 border-[#0066ff]' : 'text-gray-600'}`}
            >
              Email Settings
            </button>
            <button 
              onClick={() => setActiveTab('scheduled')}
              className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'scheduled' ? 'text-[#0066ff] border-b-2 border-[#0066ff]' : 'text-gray-600'}`}
            >
              Scheduled Emails
            </button>
            <button 
              onClick={() => setActiveTab('casestudies')}
              className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'casestudies' ? 'text-[#0066ff] border-b-2 border-[#0066ff]' : 'text-gray-600'}`}
            >
              Case Studies
            </button>
            <button 
              onClick={() => setActiveTab('contact')}
              className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'contact' ? 'text-[#0066ff] border-b-2 border-[#0066ff]' : 'text-gray-600'}`}
            >
              Contact Inquiries
            </button>
            <button 
              onClick={() => setActiveTab('blog')}
              className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'blog' ? 'text-[#0066ff] border-b-2 border-[#0066ff]' : 'text-gray-600'}`}
            >
              Blog Posts
            </button>
            <button 
              onClick={() => setActiveTab('docs')}
              className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'docs' ? 'text-[#0066ff] border-b-2 border-[#0066ff]' : 'text-gray-600'}`}
            >
              📚 Documentation
            </button>


          </div>

        </div>

        {activeTab === 'submissions' && (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Recent Submissions</h2>
              <button onClick={handleExport} className="px-4 py-2 bg-[#0066ff] text-white rounded-lg text-sm font-semibold hover:bg-blue-600">
                Export CSV
              </button>
            </div>
            <SubmissionsTable submissions={submissions} />
          </>
        )}


        {activeTab === 'emails' && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Email Delivery & Tracking</h2>
            </div>
            <EmailStatsPanel />
          </>
        )}

        {activeTab === 'analytics' && (
          <EmailAnalyticsDashboard />
        )}

        {activeTab === 'abtesting' && (
          <ABTestingPanel />
        )}

        {activeTab === 'templates' && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Email Campaign Configuration</h2>
            </div>
            <EmailTemplateEditor />
          </>
        )}

        {activeTab === 'scheduled' && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Scheduled Email Processing</h2>
            </div>
            <ScheduledEmailsPanel />
          </>
        )}

        {activeTab === 'casestudies' && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Manage Case Studies</h2>
              <p className="text-gray-600 mt-1">Add example case studies with client permission</p>

            </div>
            <CaseStudiesPanel />
          </>
        )}

        {activeTab === 'contact' && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Contact Form Inquiries</h2>
              <p className="text-gray-600 mt-1">View and manage contact form submissions</p>
            </div>
            <ContactSubmissionsTable />
          </>
        )}

        {activeTab === 'blog' && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Manage Blog Posts</h2>
              <p className="text-gray-600 mt-1">Create and manage blog content</p>
            </div>
            <BlogPanel />
          </>
        )}

        {activeTab === 'docs' && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Documentation & Guides</h2>
              <p className="text-gray-600 mt-1">Access all setup guides, process documentation, and reference materials</p>
            </div>
            <DocumentationPanel />
          </>
        )}


      </div>
    </div>

  );
};

export default AdminDashboard;
