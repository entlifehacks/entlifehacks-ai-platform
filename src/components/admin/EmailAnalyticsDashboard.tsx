import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsData {
  timeSeriesData: any[];
  templatePerformance: any[];
  conversionFunnel: any[];
  segmentData: any[];
}

const COLORS = ['#0066ff', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const EmailAnalyticsDashboard: React.FC = () => {
  const [data, setData] = useState<AnalyticsData>({
    timeSeriesData: [],
    templatePerformance: [],
    conversionFunnel: [],
    segmentData: []
  });
  const [dateRange, setDateRange] = useState('7days');

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    const daysAgo = dateRange === '7days' ? 7 : dateRange === '30days' ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);

    const { data: logs } = await supabase
      .from('email_logs')
      .select('*')
      .gte('sent_at', startDate.toISOString());

    if (logs) {
      processAnalytics(logs);
    }
  };

  const processAnalytics = (logs: any[]) => {
    // Time series data
    const dailyStats = logs.reduce((acc: any, log) => {
      const date = new Date(log.sent_at).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { date, sent: 0, opened: 0, clicked: 0 };
      }
      acc[date].sent++;
      if (log.opened_at) acc[date].opened++;
      if (log.clicked_at) acc[date].clicked++;
      return acc;
    }, {});

    // Template performance
    const templateStats = logs.reduce((acc: any, log) => {
      const type = log.template_type;
      if (!acc[type]) {
        acc[type] = { name: type, sent: 0, opened: 0, clicked: 0 };
      }
      acc[type].sent++;
      if (log.opened_at) acc[type].opened++;
      if (log.clicked_at) acc[type].clicked++;
      return acc;
    }, {});

    const templatePerf = Object.values(templateStats).map((t: any) => ({
      ...t,
      openRate: ((t.opened / t.sent) * 100).toFixed(1),
      clickRate: ((t.clicked / t.sent) * 100).toFixed(1)
    }));

    // Conversion funnel
    const total = logs.length;
    const delivered = logs.filter(l => l.delivered_at).length;
    const opened = logs.filter(l => l.opened_at).length;
    const clicked = logs.filter(l => l.clicked_at).length;

    setData({
      timeSeriesData: Object.values(dailyStats),
      templatePerformance: templatePerf,
      conversionFunnel: [
        { stage: 'Sent', count: total, rate: 100 },
        { stage: 'Delivered', count: delivered, rate: ((delivered/total)*100).toFixed(1) },
        { stage: 'Opened', count: opened, rate: ((opened/total)*100).toFixed(1) },
        { stage: 'Clicked', count: clicked, rate: ((clicked/total)*100).toFixed(1) }
      ],
      segmentData: templatePerf
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Email Analytics</h2>
        <select 
          value={dateRange} 
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sent" stroke="#0066ff" />
                <Line type="monotone" dataKey="opened" stroke="#10b981" />
                <Line type="monotone" dataKey="clicked" stroke="#f59e0b" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Template Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.templatePerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="openRate" fill="#10b981" name="Open Rate %" />
                <Bar dataKey="clickRate" fill="#f59e0b" name="Click Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.conversionFunnel} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="stage" type="category" />
                <Tooltip />
                <Bar dataKey="count" fill="#0066ff">
                  {data.conversionFunnel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.segmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.sent}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="sent"
                >
                  {data.segmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailAnalyticsDashboard;
