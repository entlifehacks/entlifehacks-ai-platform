import jsPDF from 'jspdf';
import { Submission, Recommendation } from '../types/questionnaire';

export const generatePDFBlob = async (submission: Submission, recommendations: Recommendation[]): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = createPDFDocument(submission, recommendations);
      const blob = doc.output('blob', { type: 'application/pdf' });
      resolve(blob);
    } catch (error) {
      console.error('PDF Blob generation error:', error);
      reject(error);
    }
  });
};

export const generatePDFReport = (submission: Submission, recommendations: Recommendation[]): void => {
  try {
    const doc = createPDFDocument(submission, recommendations);
    const fileName = `ELH-AI-Assessment-${submission.companyName.replace(/\s+/g, '-')}-${Date.now()}.pdf`;
    
    // Create blob with proper MIME type
    const blob = doc.output('blob', { type: 'application/pdf' });
    
    // Create download link with proper attributes for Edge compatibility
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.type = 'application/pdf';
    link.rel = 'noopener noreferrer';
    
    // Append to body, click, and cleanup
    document.body.appendChild(link);
    link.click();
    
    // Cleanup after a short delay
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

const createPDFDocument = (submission: Submission, recommendations: Recommendation[]): jsPDF => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  let yPos = 20;

  const checkPageBreak = (requiredSpace: number = 20) => {
    if (yPos + requiredSpace > pageHeight - 30) {
      doc.addPage();
      yPos = 20;
      return true;
    }
    return false;
  };

  const addText = (text: string, x: number, y: number, options: any = {}) => {
    const fontSize = options.fontSize || 10;
    const maxWidth = options.maxWidth || pageWidth - 40;
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', options.bold ? 'bold' : 'normal');
    
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach((line: string, index: number) => {
      if (y + (index * fontSize * 0.5) > pageHeight - 30) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, x, y + (index * fontSize * 0.5));
    });
    
    return y + (lines.length * fontSize * 0.5) + 5;
  };

  // Header
  doc.setFillColor(30, 58, 138);
  doc.rect(0, 0, pageWidth, 35, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('AI Readiness Assessment Report', pageWidth / 2, 15, { align: 'center' });
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('ELH AI Consulting Services', pageWidth / 2, 25, { align: 'center' });

  yPos = 45;
  doc.setTextColor(0, 0, 0);

  // Company Information
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`Company: ${submission.companyName}`, margin, yPos);
  yPos += 7;
  doc.setFont('helvetica', 'normal');
  doc.text(`Industry: ${submission.businessType}`, margin, yPos);
  yPos += 7;
  doc.text(`Date: ${new Date(submission.timestamp).toLocaleDateString()}`, margin, yPos);
  yPos += 15;

  // Executive Summary Section
  checkPageBreak(40);
  doc.setFillColor(30, 58, 138);
  doc.rect(margin, yPos, maxWidth, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Executive Summary', margin + 5, yPos + 7);
  yPos += 15;
  doc.setTextColor(0, 0, 0);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  yPos = addText(
    `Based on our comprehensive analysis of ${submission.companyName}'s operations, we have identified significant opportunities for AI transformation. This assessment projects a first-year ROI of ${submission.roiEstimate}%, positioning your organization for substantial competitive advantages.`,
    margin, yPos, { maxWidth }
  );
  yPos += 5;

  // ROI Highlight Box
  checkPageBreak(30);
  doc.setFillColor(240, 249, 255);
  doc.rect(margin, yPos, maxWidth, 25, 'F');
  doc.setDrawColor(30, 58, 138);
  doc.setLineWidth(0.5);
  doc.rect(margin, yPos, maxWidth, 25);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 58, 138);
  doc.text('Projected First-Year ROI', pageWidth / 2, yPos + 10, { align: 'center' });
  doc.setFontSize(28);
  doc.text(`${submission.roiEstimate}%`, pageWidth / 2, yPos + 21, { align: 'center' });
  yPos += 32;
  doc.setTextColor(0, 0, 0);

  // Current Challenges
  checkPageBreak(40);
  doc.setFillColor(59, 130, 246);
  doc.rect(margin, yPos, maxWidth, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Current State Analysis', margin + 5, yPos + 7);
  yPos += 15;
  doc.setTextColor(0, 0, 0);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Key Challenges Identified:', margin, yPos);
  yPos += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

  if (submission.challenges && submission.challenges.length > 0) {
    submission.challenges.forEach((challenge: string) => {
      checkPageBreak(15);
      yPos = addText(`• ${challenge}`, margin + 5, yPos, { maxWidth: maxWidth - 5 });
    });
  }
  yPos += 5;

  // Strategic Recommendations
  checkPageBreak(40);
  doc.setFillColor(30, 58, 138);
  doc.rect(margin, yPos, maxWidth, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Strategic AI Recommendations', margin + 5, yPos + 7);
  yPos += 15;
  doc.setTextColor(0, 0, 0);

  if (recommendations && recommendations.length > 0) {
    recommendations.forEach((rec, idx) => {
      checkPageBreak(60);

      // Recommendation Title
      doc.setFillColor(249, 250, 251);
      doc.rect(margin, yPos, maxWidth, 8, 'F');
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 58, 138);
      doc.text(`${idx + 1}. ${rec.title}`, margin + 3, yPos + 6);
      yPos += 12;
      doc.setTextColor(0, 0, 0);

      // Description
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Solution Overview:', margin, yPos);
      yPos += 6;
      doc.setFont('helvetica', 'normal');
      yPos = addText(rec.description, margin, yPos, { maxWidth });
      yPos += 3;

      // Justification
      checkPageBreak(20);
      doc.setFont('helvetica', 'bold');
      doc.text('Business Justification:', margin, yPos);
      yPos += 6;
      doc.setFont('helvetica', 'normal');
      yPos = addText(
        `Expected ROI of ${rec.roi}% based on industry benchmarks. ${rec.caseStudy}`,
        margin, yPos, { maxWidth }
      );
      yPos += 3;

      // Implementation
      checkPageBreak(20);
      doc.setFont('helvetica', 'bold');
      doc.text('Implementation Approach:', margin, yPos);
      yPos += 6;
      doc.setFont('helvetica', 'normal');
      yPos = addText(
        `${rec.implementation} Timeline: ${rec.timeToValue} to measurable results.`,
        margin, yPos, { maxWidth }
      );
      yPos += 8;
    });
  }

  // Technology Stack
  checkPageBreak(50);
  doc.setFillColor(16, 185, 129);
  doc.rect(margin, yPos, maxWidth, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Technology Stack & Approach', margin + 5, yPos + 7);
  yPos += 15;
  doc.setTextColor(0, 0, 0);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  yPos = addText('• Cloud Infrastructure: Scalable deployment with 99.9% uptime SLA', margin, yPos, { maxWidth });
  yPos = addText('• Machine Learning: Custom models trained on your data', margin, yPos, { maxWidth });
  yPos = addText('• Integration: Seamless connection with existing systems', margin, yPos, { maxWidth });
  yPos = addText('• Security: Enterprise-grade encryption and compliance', margin, yPos, { maxWidth });
  yPos += 5;

  // Investment Overview section removed as per user request

  // Next Steps
  checkPageBreak(40);
  doc.setFillColor(30, 58, 138);
  doc.rect(margin, yPos, maxWidth, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Next Steps', margin + 5, yPos + 7);
  yPos += 15;
  doc.setTextColor(0, 0, 0);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  yPos = addText('1. Schedule detailed consultation to discuss requirements', margin, yPos, { maxWidth });
  yPos = addText('2. Conduct technical assessment of current infrastructure', margin, yPos, { maxWidth });
  yPos = addText('3. Develop project roadmap with milestones', margin, yPos, { maxWidth });
  yPos = addText('4. Begin phased implementation with quick wins', margin, yPos, { maxWidth });

  // Footer on every page
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFillColor(30, 58, 138);
    doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text('ELH AI Consulting Services | Transform Your Business with AI', pageWidth / 2, pageHeight - 10, { align: 'center' });
    doc.setFontSize(8);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - 20, pageHeight - 10, { align: 'right' });
  }

  return doc;
};
