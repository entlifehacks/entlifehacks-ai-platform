import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface ScheduledEmail {
  id: string;
  recipient_email: string;
  template_type: string;
  scheduled_for: string;
  status: string;
  retry_count: number;
  last_error?: string;
  sent_at?: string;
}

const ScheduledEmailsPanel: React.FC = () => {
  const [stats, setStats] = useState({ pending: 0, sent: 0, failed: 0 });
  const [emails, setEmails] = useState<ScheduledEmail[]>([]);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Get stats
    const { data: allEmails } = await supabase
      .from('scheduled_emails')
      .select('status');

    if (allEmails) {
      setStats({
        pending: allEmails.filter(e => e.status === 'pending').length,
        sent: allEmails.filter(e => e.status === 'sent').length,
        failed: allEmails.filter(e => e.status === 'failed').length
      });
    }

    // Get recent emails
    const { data: recentEmails } = await supabase
      .from('scheduled_emails')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (recentEmails) {
      setEmails(recentEmails);
    }
  };

  const triggerProcessing = async () => {
    setProcessing(true);
    setMessage('');

    try {
      const { data, error } = await supabase.functions.invoke('process-scheduled-emails');

      if (error) throw error;

      setMessage(`✅ Processed ${data.results.processed} emails. Sent: ${data.results.sent}, Failed: ${data.results.failed}`);
      loadData();
    } catch (error) {
      setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pending Emails</div>
        </Card>
        <Card className="p-6">
          <div className="text-3xl font-bold text-green-600">{stats.sent}</div>
          <div className="text-sm text-gray-600">Sent Emails</div>
        </Card>
        <Card className="p-6">
          <div className="text-3xl font-bold text-red-600">{stats.failed}</div>
          <div className="text-sm text-gray-600">Failed Emails</div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Manual Processing</h3>
        <p className="text-sm text-gray-600 mb-4">
          Trigger email processing manually. The automated cron job runs hourly.
        </p>
        <Button onClick={triggerProcessing} disabled={processing}>
          {processing ? 'Processing...' : 'Process Pending Emails Now'}
        </Button>
        {message && <div className="mt-4 text-sm">{message}</div>}
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Scheduled Emails</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">Type</th>
                <th className="text-left py-2">Scheduled</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Retries</th>
              </tr>
            </thead>
            <tbody>
              {emails.map(email => (
                <tr key={email.id} className="border-b">
                  <td className="py-2">{email.recipient_email}</td>
                  <td className="py-2">{email.template_type}</td>
                  <td className="py-2">{new Date(email.scheduled_for).toLocaleString()}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      email.status === 'sent' ? 'bg-green-100 text-green-800' :
                      email.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {email.status}
                    </span>
                  </td>
                  <td className="py-2">{email.retry_count || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ScheduledEmailsPanel;
