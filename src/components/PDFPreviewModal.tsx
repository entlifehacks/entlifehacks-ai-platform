import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Download, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { Submission } from '../types/questionnaire';
import { generatePDFBlob, generatePDFReport } from '../utils/pdfGenerator';

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: Submission;
}

export const PDFPreviewModal: React.FC<PDFPreviewModalProps> = ({ isOpen, onClose, submission }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      generatePDF();
    }
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [isOpen]);

  const generatePDF = async () => {
    setIsLoading(true);
    setError(null);
    setPdfUrl(null);
    
    try {
      console.log('Generating PDF with submission:', submission);
      const blob = await generatePDFBlob(submission, submission.recommendations);
      console.log('PDF Blob created:', blob);
      const url = URL.createObjectURL(blob);
      console.log('PDF URL created:', url);
      setPdfUrl(url);
    } catch (err) {
      console.error('PDF generation error:', err);
      setError('Failed to generate PDF. Please try downloading directly.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      generatePDFReport(submission, submission.recommendations);
      setIsLoading(false);
    } catch (error) {
      console.error('Download error:', error);
      setError('Failed to download PDF. Please try again.');
      setIsLoading(false);
    }
  };

  const handleOpenInBrowser = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Your AI Readiness Assessment Report
          </DialogTitle>
        </DialogHeader>
        
        {isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
            <Loader2 className="w-16 h-16 animate-spin text-blue-600 mb-4" />
            <span className="text-lg text-gray-700 font-medium">Generating your comprehensive report...</span>
            <span className="text-sm text-gray-500 mt-2">This may take a few moments</span>
          </div>
        )}
        
        {error && (
          <div className="flex-1 flex flex-col items-center justify-center bg-red-50 rounded-lg p-8">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <p className="text-red-700 text-lg font-medium mb-4">{error}</p>
            <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Try Direct Download
            </Button>
          </div>
        )}
        
        {pdfUrl && !isLoading && !error && (
          <>
            <div className="flex-1 overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100">
              <iframe 
                src={pdfUrl}
                className="w-full h-full" 
                title="PDF Preview"
                type="application/pdf"
                style={{ border: 'none', minHeight: '600px' }}
              />
            </div>
            <div className="flex gap-4 pt-4 border-t bg-white">

              <Button 
                onClick={handleDownload} 
                size="lg"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base py-6 shadow-lg hover:shadow-xl transition-all"
              >
                <Download className="w-5 h-5 mr-2" /> Download PDF Report
              </Button>
              <Button 
                onClick={handleOpenInBrowser} 
                variant="outline" 
                size="lg"
                className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-base py-6 shadow-md hover:shadow-lg transition-all"
              >
                <ExternalLink className="w-5 h-5 mr-2" /> Open in New Tab
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
