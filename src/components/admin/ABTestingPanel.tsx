import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ABTest {
  id: string;
  name: string;
  template_type: string;
  variant_a_subject: string;
  variant_b_subject: string;
  variant_a_sent: number;
  variant_b_sent: number;
  variant_a_opened: number;
  variant_b_opened: number;
  variant_a_clicked: number;
  variant_b_clicked: number;
  status: string;
  created_at: string;
}

const ABTestingPanel: React.FC = () => {
  const [tests, setTests] = useState<ABTest[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    template_type: 'immediate',
    variant_a_subject: '',
    variant_b_subject: ''
  });

  useEffect(() => {
    fetchABTests();
  }, []);

  const fetchABTests = async () => {
    const { data } = await supabase
      .from('ab_tests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setTests(data);
  };

  const createABTest = async () => {
    const { error } = await supabase
      .from('ab_tests')
      .insert([{
        ...formData,
        variant_a_sent: 0,
        variant_b_sent: 0,
        variant_a_opened: 0,
        variant_b_opened: 0,
        variant_a_clicked: 0,
        variant_b_clicked: 0,
        status: 'active'
      }]);

    if (!error) {
      setShowCreate(false);
      setFormData({ name: '', template_type: 'immediate', variant_a_subject: '', variant_b_subject: '' });
      fetchABTests();
    }
  };

  const calculateWinner = (test: ABTest) => {
    const aRate = test.variant_a_sent > 0 ? (test.variant_a_opened / test.variant_a_sent) * 100 : 0;
    const bRate = test.variant_b_sent > 0 ? (test.variant_b_opened / test.variant_b_sent) * 100 : 0;
    
    if (aRate > bRate) return 'A';
    if (bRate > aRate) return 'B';
    return 'Tie';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">A/B Testing</h2>
        <Button onClick={() => setShowCreate(!showCreate)}>
          {showCreate ? 'Cancel' : 'Create New Test'}
        </Button>
      </div>

      {showCreate && (
        <Card>
          <CardHeader>
            <CardTitle>Create A/B Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Test Name</label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., Day 3 Subject Line Test"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Template Type</label>
              <select 
                value={formData.template_type}
                onChange={(e) => setFormData({...formData, template_type: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="immediate">Immediate Report</option>
                <option value="day3">Day 3 Follow-up</option>
                <option value="day7">Day 7 Consultation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Variant A Subject</label>
              <Input 
                value={formData.variant_a_subject}
                onChange={(e) => setFormData({...formData, variant_a_subject: e.target.value})}
                placeholder="Subject line for variant A"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Variant B Subject</label>
              <Input 
                value={formData.variant_b_subject}
                onChange={(e) => setFormData({...formData, variant_b_subject: e.target.value})}
                placeholder="Subject line for variant B"
              />
            </div>
            <Button onClick={createABTest} className="w-full">Create Test</Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {tests.map((test) => {
          const winner = calculateWinner(test);
          const aOpenRate = test.variant_a_sent > 0 ? ((test.variant_a_opened / test.variant_a_sent) * 100).toFixed(1) : '0';
          const bOpenRate = test.variant_b_sent > 0 ? ((test.variant_b_opened / test.variant_b_sent) * 100).toFixed(1) : '0';
          const aClickRate = test.variant_a_sent > 0 ? ((test.variant_a_clicked / test.variant_a_sent) * 100).toFixed(1) : '0';
          const bClickRate = test.variant_b_sent > 0 ? ((test.variant_b_clicked / test.variant_b_sent) * 100).toFixed(1) : '0';

          return (
            <Card key={test.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{test.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {test.template_type} • {test.status}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded text-sm font-semibold ${
                    winner === 'A' ? 'bg-green-100 text-green-800' : 
                    winner === 'B' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    Winner: {winner}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Variant A</h4>
                    <p className="text-sm text-gray-600 mb-4">{test.variant_a_subject}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Sent:</span>
                        <span className="font-semibold">{test.variant_a_sent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Open Rate:</span>
                        <span className="font-semibold text-green-600">{aOpenRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Click Rate:</span>
                        <span className="font-semibold text-blue-600">{aClickRate}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Variant B</h4>
                    <p className="text-sm text-gray-600 mb-4">{test.variant_b_subject}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Sent:</span>
                        <span className="font-semibold">{test.variant_b_sent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Open Rate:</span>
                        <span className="font-semibold text-green-600">{bOpenRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Click Rate:</span>
                        <span className="font-semibold text-blue-600">{bClickRate}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ABTestingPanel;
