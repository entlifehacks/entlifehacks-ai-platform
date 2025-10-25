import React from 'react';
import { X, Download } from 'lucide-react';

interface DocumentViewerProps {
  title: string;
  content: string;
  filename: string;
  onClose: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ title, content, filename, onClose }) => {
  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Convert markdown to simple HTML
  const formatContent = (text: string) => {
    return text
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('# ')) return `<h1 key=${i} class="text-2xl font-bold mt-6 mb-4">${line.slice(2)}</h1>`;
        if (line.startsWith('## ')) return `<h2 key=${i} class="text-xl font-bold mt-5 mb-3">${line.slice(3)}</h2>`;
        if (line.startsWith('### ')) return `<h3 key=${i} class="text-lg font-semibold mt-4 mb-2">${line.slice(4)}</h3>`;
        if (line.startsWith('- ')) return `<li key=${i} class="ml-6 mb-1">${line.slice(2)}</li>`;
        if (line.trim() === '') return `<br key=${i} />`;
        if (line.startsWith('**') && line.endsWith('**')) return `<p key=${i} class="font-bold mb-2">${line.slice(2, -2)}</p>`;
        return `<p key=${i} class="mb-2">${line}</p>`;
      })
      .join('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: formatContent(content) }} />
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
