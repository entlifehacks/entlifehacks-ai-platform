import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface EmailTemplate {
  type: 'immediate' | 'day3' | 'day7';
  subject: string;
  delayDays: number;
}

const EmailTemplateEditor: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    { type: 'immediate', subject: 'Your AI Readiness Report', delayDays: 0 },
    { type: 'day3', subject: 'AI Implementation Insights', delayDays: 3 },
    { type: 'day7', subject: 'Ready to Transform Your Business?', delayDays: 7 }
  ]);

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('emailTemplates', JSON.stringify(templates));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateTemplate = (index: number, field: keyof EmailTemplate, value: any) => {
    const updated = [...templates];
    updated[index] = { ...updated[index], [field]: value };
    setTemplates(updated);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Campaign Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {templates.map((template, index) => (
            <div key={template.type} className="border-b pb-6 last:border-b-0">
              <h3 className="font-semibold text-lg mb-4">
                {template.type === 'immediate' ? '📧 Immediate Report' : 
                 template.type === 'day3' ? '💡 Day 3 Follow-up' : '🚀 Day 7 Consultation'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Subject Line</label>
                  <Input 
                    value={template.subject}
                    onChange={(e) => updateTemplate(index, 'subject', e.target.value)}
                    placeholder="Email subject"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Send After (Days)</label>
                  <Input 
                    type="number"
                    value={template.delayDays}
                    onChange={(e) => updateTemplate(index, 'delayDays', parseInt(e.target.value))}
                    disabled={template.type === 'immediate'}
                    min="0"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button onClick={handleSave} className="w-full">
            {saved ? '✓ Saved!' : 'Save Settings'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailTemplateEditor;
