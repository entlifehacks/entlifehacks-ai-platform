import { supabase } from '@/lib/supabase';
import { Submission, Recommendation } from '../types/questionnaire';
import { generateImmediateReportEmail } from './emailTemplates';
import jsPDF from 'jspdf';

export interface QuestionnaireEmailData {
  submission: Submission;
  recommendations: Recommendation[];
  estimatedSavings: number;
  paybackMonths: number;
  threeYearROI: number;
}

// Generate PDF as base64 string for email attachment
const generatePDFBase64 = (submission: Submission, recommendations: Recommendation[]): string => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  // Header
  doc.setFillColor(0, 102, 255);
  doc.rect(0, 0, pageWidth, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('AI Readiness Report', pageWidth / 2, 18, { align: 'center' });
  
  yPos = 45;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(`Company: ${submission.companyName}`, 20, yPos);
  yPos += 7;
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, yPos);
  yPos += 15;

  // ROI Section
  doc.setFillColor(240, 248, 255);
  doc.rect(15, yPos - 5, pageWidth - 30, 35, 'F');
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 102, 255);
  doc.text('Projected ROI', 20, yPos + 5);
  yPos += 15;
  doc.setFontSize(28);
  doc.text(`${submission.roiEstimate}%`, pageWidth / 2, yPos, { align: 'center' });
  yPos += 25;

  // Recommendations
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Recommendations', 20, yPos);
  yPos += 10;

  recommendations.forEach((rec) => {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(rec.title, 20, yPos);
    yPos += 7;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(rec.description, pageWidth - 40);
    doc.text(lines, 20, yPos);
    yPos += lines.length * 5 + 10;
  });

  return doc.output('dataurlstring').split(',')[1];
};

export const sendQuestionnaireResultsEmail = async (
  data: QuestionnaireEmailData
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { submission, recommendations, estimatedSavings, paybackMonths, threeYearROI } = data;

    // Generate PDF as base64
    const pdfBase64 = generatePDFBase64(submission, recommendations);

    // Prepare email HTML
    const emailHtml = generateImmediateReportEmail({
      name: submission.name,
      email: submission.email,
      businessType: submission.businessType,
      estimatedSavings,
      paybackMonths,
      threeYearROI,
      recommendations: recommendations.map(r => r.title)
    });

    // Send email via edge function
    const { data: result, error } = await supabase.functions.invoke('send-email', {
      body: {
        to: submission.email,
        subject: `Your AI Readiness Report - ${submission.businessType} Analysis`,
        html: emailHtml,
        templateType: 'questionnaire-results',
        attachments: [{
          content: pdfBase64,
          filename: `AI-Readiness-Report-${submission.companyName.replace(/\s+/g, '-')}.pdf`,
          type: 'application/pdf',
          disposition: 'attachment'
        }],
        sendAdminCopy: true,
        adminData: {
          userName: submission.name,
          userEmail: submission.email,
          businessType: submission.businessType,
          companyName: submission.companyName,
          estimatedSavings,
          roi: submission.roiEstimate,
          challenges: submission.challenges,
          solutions: submission.aiSolutions,
          budget: submission.budget
        }
      }
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Questionnaire results email sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Failed to send questionnaire email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};
