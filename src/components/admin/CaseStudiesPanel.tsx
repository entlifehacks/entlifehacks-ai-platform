import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface CaseStudy {
  id: string;
  client_name: string | null;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  is_published: boolean;
}

export function CaseStudiesPanel() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    client_name: '',
    industry: '',
    challenge: '',
    solution: '',
    results: '',
    is_published: false,
  });

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    const { data } = await supabase
      .from('case_studies')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setCaseStudies(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editing) {
      const { error } = await supabase
        .from('case_studies')
        .update(formData)
        .eq('id', editing);
      
      if (!error) {
        toast.success('Case study updated!');
        resetForm();
        fetchCaseStudies();
      }
    } else {
      const { error } = await supabase
        .from('case_studies')
        .insert([formData]);
      
      if (!error) {
        toast.success('Case study added!');
        resetForm();
        fetchCaseStudies();
      }
    }
  };

  const handleEdit = (study: CaseStudy) => {
    setEditing(study.id);
    setFormData({
      client_name: study.client_name || '',
      industry: study.industry,
      challenge: study.challenge,
      solution: study.solution,
      results: study.results,
      is_published: study.is_published,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this case study?')) {
      await supabase.from('case_studies').delete().eq('id', id);
      toast.success('Deleted!');
      fetchCaseStudies();
    }
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({
      client_name: '',
      industry: '',
      challenge: '',
      solution: '',
      results: '',
      is_published: false,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editing ? 'Edit' : 'Add'} Case Study</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Client Name (Optional - leave blank for anonymous)</Label>
              <Input
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                placeholder="Acme Corp or leave blank"
              />
            </div>
            <div>
              <Label>Industry *</Label>
              <Input
                required
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="E-commerce, Healthcare, etc."
              />
            </div>
            <div>
              <Label>Challenge *</Label>
              <Textarea
                required
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                placeholder="What problem did they face?"
              />
            </div>
            <div>
              <Label>Solution Implemented *</Label>
              <Textarea
                required
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                placeholder="What AI solution did you provide?"
              />
            </div>
            <div>
              <Label>Measurable Results *</Label>
              <Textarea
                required
                value={formData.results}
                onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                placeholder="30% increase in efficiency, $50K saved annually, etc."
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.is_published}
                onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
              />
              <Label>Publish on website</Label>
            </div>
            <div className="flex gap-2">
              <Button type="submit">{editing ? 'Update' : 'Add'} Case Study</Button>
              {editing && <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Existing Case Studies</h3>
        {caseStudies.map((study) => (
          <Card key={study.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    {study.client_name || 'Anonymous Client'}
                  </CardTitle>
                  <Badge variant="secondary" className="mt-1">{study.industry}</Badge>
                </div>
                <div className="flex gap-2">
                  {study.is_published && <Badge variant="default">Published</Badge>}
                  <Button size="sm" variant="outline" onClick={() => handleEdit(study)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(study.id)}>Delete</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p><strong>Challenge:</strong> {study.challenge}</p>
              <p><strong>Solution:</strong> {study.solution}</p>
              <p><strong>Results:</strong> {study.results}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
