import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { defaultCaseStudies } from '@/data/defaultCaseStudies';

interface CaseStudy {
  id: string;
  client_name: string | null;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
}

export function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(defaultCaseStudies);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      setCaseStudies(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <section id="case-studies" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">Loading case studies...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="case-studies" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Example Case Studies</h2>

        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Results from businesses after AI implementation
        </p>

        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <Card key={study.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">
                    {study.client_name || 'Anonymous Client'}
                  </CardTitle>
                  <Badge variant="secondary">{study.industry}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-500 mb-1">Challenge</h4>
                  <p className="text-sm">{study.challenge}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-500 mb-1">Solution</h4>
                  <p className="text-sm">{study.solution}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-500 mb-1">Results</h4>
                  <p className="text-sm font-medium text-green-600">{study.results}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
