import React, { useState } from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import { documentationContent } from '../../data/documentationContent';

interface Document {
  title: string;
  filename: string;
  description: string;
  category: 'Setup' | 'Guide' | 'Process';
}

const documents: Document[] = [
  {
    title: 'Admin Dashboard Guide',
    filename: 'ADMIN_ACCESS_GUIDE.md',
    description: 'How to access and use the admin panel - written in simple English',
    category: 'Guide'
  },
  {
    title: 'What Happens When Forms Are Submitted',
    filename: 'COMPLETE_PROCESS_FLOW.md',
    description: 'Easy-to-understand explanation of the customer journey and automated emails',
    category: 'Process'
  },
  {
    title: 'Email Setup Instructions',
    filename: 'README_EMAIL_SETUP.md',
    description: 'Step-by-step guide to set up SendGrid emails - no technical knowledge needed',
    category: 'Setup'
  }
];

const DocumentationPanel: React.FC = () => {
  const [viewingDoc, setViewingDoc] = useState<{ title: string; content: string; filename: string } | null>(null);
  const categories = ['Guide', 'Process', 'Setup'] as const;

  const handleViewDoc = (filename: string, title: string) => {
    const content = documentationContent[filename];
    if (content) {
      setViewingDoc({ title, content, filename });
    }
  };

  const handleDownloadDoc = (filename: string) => {
    const content = documentationContent[filename];
    if (content) {
      const blob = new Blob([content], { type: 'text/markdown' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-900 text-sm">
            <strong>📖 Simple Guides for Non-Technical Users</strong><br />
            Click "Read Guide" to view in easy-to-read format, or "Download" to save for offline reading.
          </p>
        </div>

        {categories.map(category => {
          const categoryDocs = documents.filter(doc => doc.category === category);
          if (categoryDocs.length === 0) return null;

          return (
            <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0066ff]" />
                {category} Documentation
              </h3>
              <div className="space-y-3">
                {categoryDocs.map(doc => (
                  <div key={doc.filename} className="border border-gray-200 rounded-lg p-4 hover:border-[#0066ff] transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{doc.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDoc(doc.filename, doc.title)}
                          className="flex items-center gap-2 px-4 py-2 bg-[#0066ff] text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors whitespace-nowrap"
                        >
                          <Eye className="w-4 h-4" />
                          Read Guide
                        </button>
                        <button
                          onClick={() => handleDownloadDoc(doc.filename)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors whitespace-nowrap"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {viewingDoc && (
        <DocumentViewer
          title={viewingDoc.title}
          content={viewingDoc.content}
          filename={viewingDoc.filename}
          onClose={() => setViewingDoc(null)}
          onDownload={() => handleDownloadDoc(viewingDoc.filename)}
        />
      )}
    </>
  );
};

interface DocumentViewerProps {
  title: string;
  content: string;
  filename: string;
  onClose: () => void;
  onDownload: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ title, content, onClose, onDownload }) => {
  const formatContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold mt-6 mb-4 text-gray-900">{line.slice(2)}</h1>;
      if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-5 mb-3 text-gray-800">{line.slice(3)}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-semibold mt-4 mb-2 text-gray-700">{line.slice(4)}</h3>;
      if (line.startsWith('- ')) return <li key={i} className="ml-6 mb-1 list-disc">{line.slice(2)}</li>;
      if (line.match(/^\d+\. /)) return <li key={i} className="ml-6 mb-1 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
      if (line.trim() === '') return <div key={i} className="h-2" />;
      if (line.includes('**') && line.match(/\*\*(.*?)\*\*/)) {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return <p key={i} className="mb-2">{parts.map((part, j) => 
          part.startsWith('**') && part.endsWith('**') ? 
            <strong key={j}>{part.slice(2, -2)}</strong> : part
        )}</p>;
      }
      return <p key={i} className="mb-2 text-gray-700">{line}</p>;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-white">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <div className="flex gap-2">
            <button
              onClick={onDownload}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              Close
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            {formatContent(content)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPanel;
