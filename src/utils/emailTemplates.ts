export interface EmailTemplateData {
  name: string;
  email: string;
  businessType?: string;
  estimatedSavings?: number;
  paybackMonths?: number;
  threeYearROI?: number;
  recommendations?: string[];
  selectedSolutions?: string[];
  resultsUrl?: string;
}

const baseStyle = `
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #1a2332 0%, #0066ff 100%); color: white; padding: 30px; text-align: center; }
    .content { background: #f9f9f9; padding: 30px; }
    .button { display: inline-block; background: #0066ff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; background: #e9e9e9; }
    .roi-box { background: white; padding: 20px; margin: 15px 0; border-left: 4px solid #00c853; border-radius: 5px; }
    .highlight { color: #0066ff; font-weight: bold; font-size: 18px; }
    h1 { margin: 0; }
    h2 { color: #1a2332; }
    h3 { color: #0066ff; }
    ul, ol { padding-left: 20px; }
    li { margin: 10px 0; }
  </style>
`;


export function generateImmediateReportEmail(data: EmailTemplateData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>${baseStyle}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 Your AI Readiness Report</h1>
        </div>
        <div class="content">
          <h2>Hello ${data.name},</h2>
          <p>Thank you for completing our AI readiness assessment! Based on your responses, we've prepared a personalized analysis for your ${data.businessType || 'business'}.</p>
          
          <div class="roi-box">
            <h3>💰 Your Potential ROI</h3>
            <p class="highlight">Estimated Annual Savings: $${data.estimatedSavings?.toLocaleString() || '0'}</p>
            <p><strong>Payback Period:</strong> ${data.paybackMonths || 0} months</p>
            <p><strong>3-Year ROI:</strong> ${data.threeYearROI || 0}%</p>
          </div>

          <h3>✨ Recommended Solutions:</h3>
          <ul>
            ${data.recommendations?.map(rec => `<li>${rec}</li>`).join('') || '<li>Custom AI solutions tailored to your needs</li>'}
          </ul>

          <p>We've identified key opportunities to transform your business with AI solutions tailored to your specific needs and challenges.</p>
          
          <center>
            <a href="${data.resultsUrl || 'https://aiconsulting.com/results'}" class="button">📊 View Full Report</a>
          </center>

          <p style="margin-top: 30px;">Our team will follow up with additional insights and next steps over the coming week.</p>
        </div>
        <div class="footer">
          <p><strong>ELH AI Consulting Services</strong></p>
          <p>Transforming Businesses with Intelligent Automation</p>
          <p style="margin-top: 15px; font-size: 11px;">© 2024 ELH AI Consulting Services. All rights reserved.</p>
        </div>

      </div>
    </body>
    </html>
  `;
}

export function generateDay3FollowUpEmail(data: EmailTemplateData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>${baseStyle}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💡 AI Implementation Insights</h1>
        </div>
        <div class="content">
          <h2>Hi ${data.name},</h2>
          <p>We hope you've had a chance to review your AI readiness report. Today, we're sharing valuable insights specific to ${data.businessType || 'your industry'} businesses.</p>
          
          <h3>🎯 Success Stories in Your Industry</h3>
          <p>Companies like yours have achieved remarkable results:</p>
          <ul>
            <li><strong>40% reduction</strong> in operational costs through intelligent process automation</li>
            <li><strong>3x faster</strong> decision-making with AI-powered analytics and insights</li>
            <li><strong>60% improvement</strong> in customer satisfaction scores</li>
            <li><strong>85% time savings</strong> on repetitive tasks and data processing</li>
          </ul>

          <div class="roi-box">
            <h3>📊 Your Personalized Roadmap</h3>
            <p>Based on your interest in <strong>${data.selectedSolutions?.join(', ') || 'AI solutions'}</strong>, here's what we recommend:</p>
            <ol>
              <li>Schedule a free 30-minute strategy call with our AI specialists</li>
              <li>Review industry-specific case studies and success metrics</li>
              <li>Explore our proven implementation roadmap and timeline</li>
              <li>Discuss your custom AI architecture and integration plan</li>
            </ol>
          </div>

          <center>
            <a href="https://calendly.com/aiconsulting" class="button">📅 Book Your Strategy Call</a>
          </center>
          
          <p style="margin-top: 30px;">Have questions? Simply reply to this email - our team is here to help guide your AI transformation journey!</p>
        </div>
        <div class="footer">
          <p><strong>ELH AI Consulting Services</strong></p>
          <p>Transforming Businesses with Intelligent Automation</p>
          <p style="margin-top: 15px; font-size: 11px;">© 2024 ELH AI Consulting Services. All rights reserved.</p>
        </div>

      </div>
    </body>
    </html>
  `;
}

export function generateDay7ConsultationEmail(data: EmailTemplateData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>${baseStyle}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 Ready to Get Started?</h1>
        </div>
        <div class="content">
          <h2>Hello ${data.name},</h2>
          <p>It's been a week since your AI readiness assessment. We wanted to follow up and see if you're ready to take the next step toward transforming your business.</p>
          
          <div class="roi-box">
            <h3>⏰ Limited-Time Opportunity</h3>
            <p><strong>Book a consultation this week and receive:</strong></p>
            <ul>
              <li>✅ Free AI implementation roadmap (valued at $2,500)</li>
              <li>✅ Priority onboarding for Q1 2026</li>
              <li>✅ 15% discount on your first project</li>
              <li>✅ Complimentary 3-month support package</li>
            </ul>
          </div>

          <h3>📋 What to Expect in Your Consultation:</h3>
          <ul>
            <li><strong>Deep-dive analysis</strong> of your specific business challenges</li>
            <li><strong>Custom AI solution architecture</strong> designed for your needs</li>
            <li><strong>Detailed ROI projections</strong> with realistic timelines</li>
            <li><strong>Live Q&A session</strong> with our senior AI specialists</li>
            <li><strong>Implementation plan</strong> with clear milestones and deliverables</li>
          </ul>

          <center>
            <a href="https://calendly.com/aiconsulting" class="button">🎯 Schedule Your Consultation</a>
          </center>
          
          <p style="margin-top: 30px;"><strong>Still have questions?</strong> Reply to this email or call us at <strong>(555) 123-4567</strong>. We're available Monday-Friday, 9am-6pm EST.</p>
          
          <p style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin-top: 20px;"><em><strong>P.S.</strong> - Your estimated annual savings of <strong>$${data.estimatedSavings?.toLocaleString() || '0'}</strong> is waiting to be unlocked. Don't let this opportunity pass!</em></p>
        </div>
        <div class="footer">
          <p><strong>ELH AI Consulting Services</strong></p>
          <p>Transforming Businesses with Intelligent Automation</p>
          <p style="margin-top: 15px; font-size: 11px;">© 2024 ELH AI Consulting Services. All rights reserved.</p>
          <p style="margin-top: 15px;">
            <a href="#" style="color: #666; margin: 0 10px;">Unsubscribe</a> | 
            <a href="#" style="color: #666; margin: 0 10px;">Update Preferences</a>
          </p>
        </div>

      </div>
    </body>
    </html>
  `;
}