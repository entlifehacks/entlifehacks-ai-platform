import { supabase } from '@/lib/supabase';
import { 
  generateImmediateReportEmail, 
  generateDay3FollowUpEmail, 
  generateDay7ConsultationEmail,
  EmailTemplateData 
} from './emailTemplates';

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  timestamp: string;
}

export class SendGridEmailService {
  private static async sendEmail(
    to: string,
    subject: string,
    htmlContent: string,
    templateType: string,
    metadata?: any
  ): Promise<EmailResult> {
    try {
      // Call Supabase Edge Function
      const { data: result, error } = await supabase.functions.invoke('send-email', {
        body: {
          to,
          subject,
          html: htmlContent,
          templateType
        }
      });

      if (error) throw error;


      // Log to database
      await supabase.from('email_logs').insert({
        recipient_email: to,
        recipient_name: metadata?.name,
        subject,
        template_type: templateType,
        message_id: result.messageId,
        status: result.success ? 'sent' : 'failed',
        error_message: result.error,
        metadata: metadata
      });

      return {
        success: result.success,
        messageId: result.messageId,
        error: result.error,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Email send error:', error);
      
      // Log failed attempt
      await supabase.from('email_logs').insert({
        recipient_email: to,
        subject,
        template_type: templateType,
        status: 'failed',
        error_message: error instanceof Error ? error.message : 'Unknown error',
        metadata: metadata
      });

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  static async sendImmediateReport(data: EmailTemplateData): Promise<EmailResult> {
    const subject = `Your AI Readiness Report - ${data.businessType || 'Business'} Analysis`;
    const html = generateImmediateReportEmail(data);
    return this.sendEmail(data.email, subject, html, 'immediate', data);
  }

  static async sendDay3FollowUp(data: EmailTemplateData): Promise<EmailResult> {
    const subject = `AI Implementation Insights for ${data.businessType || 'Your Business'}`;
    const html = generateDay3FollowUpEmail(data);
    return this.sendEmail(data.email, subject, html, 'day3', data);
  }

  static async sendDay7Consultation(data: EmailTemplateData): Promise<EmailResult> {
    const subject = `Ready to Transform Your Business? Special Offer Inside`;
    const html = generateDay7ConsultationEmail(data);
    return this.sendEmail(data.email, subject, html, 'day7', data);
  }

  static async scheduleEmail(
    recipientEmail: string,
    recipientName: string,
    templateType: 'day3' | 'day7',
    scheduledFor: Date,
    data: EmailTemplateData
  ): Promise<void> {
    const subject = templateType === 'day3' 
      ? `AI Implementation Insights for ${data.businessType || 'Your Business'}`
      : `Ready to Transform Your Business? Special Offer Inside`;

    await supabase.from('scheduled_emails').insert({
      recipient_email: recipientEmail,
      recipient_name: recipientName,
      subject,
      template_type: templateType,
      scheduled_for: scheduledFor.toISOString(),
      data: data as any,
      status: 'pending'
    });
  }

  static async processScheduledEmails(): Promise<void> {
    const now = new Date().toISOString();
    
    const { data: emails, error } = await supabase
      .from('scheduled_emails')
      .select('*')
      .eq('status', 'pending')
      .lte('scheduled_for', now)
      .limit(50);

    if (error || !emails) {
      console.error('Error fetching scheduled emails:', error);
      return;
    }

    for (const email of emails) {
      try {
        const emailData = email.data as EmailTemplateData;
        
        let result: EmailResult;
        if (email.template_type === 'day3') {
          result = await this.sendDay3FollowUp(emailData);
        } else if (email.template_type === 'day7') {
          result = await this.sendDay7Consultation(emailData);
        } else {
          continue;
        }

        // Update scheduled email status
        await supabase
          .from('scheduled_emails')
          .update({
            status: result.success ? 'sent' : 'failed',
            sent_at: new Date().toISOString()
          })
          .eq('id', email.id);
      } catch (error) {
        console.error(`Error processing email ${email.id}:`, error);
      }
    }
  }

  static async getEmailStats(recipientEmail: string) {
    const { data, error } = await supabase
      .from('email_logs')
      .select('*')
      .eq('recipient_email', recipientEmail)
      .order('sent_at', { ascending: false });

    if (error) {
      console.error('Error fetching email stats:', error);
      return null;
    }

    return {
      total: data.length,
      sent: data.filter(e => e.status === 'sent').length,
      failed: data.filter(e => e.status === 'failed').length,
      delivered: data.filter(e => e.delivered_at).length,
      opened: data.filter(e => e.opened_at).length,
      clicked: data.filter(e => e.clicked_at).length,
      emails: data
    };
  }
}