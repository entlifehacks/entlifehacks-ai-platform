import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  published: boolean;
  created_at: string;
}

export const BlogPanel: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '', slug: '', excerpt: '', content: '', author: '', category: '', published: false
  });

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (data) setPosts(data);
  };

  const handleSave = async () => {
    if (editing) {
      await supabase.from('blog_posts').update(formData).eq('id', editing);
    } else {
      await supabase.from('blog_posts').insert(formData);
    }
    setEditing(null);
    setFormData({ title: '', slug: '', excerpt: '', content: '', author: '', category: '', published: false });
    fetchPosts();
  };

  const handleEdit = (post: BlogPost) => {
    setEditing(post.id);
    setFormData(post);
  };

  const handleDelete = async (id: string) => {
    await supabase.from('blog_posts').delete().eq('id', id);
    fetchPosts();
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">{editing ? 'Edit' : 'Create'} Blog Post</h3>
        <div className="space-y-4">
          <Input placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          <Input placeholder="Slug" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
          <Textarea placeholder="Excerpt" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} />
          <Textarea placeholder="Content (HTML)" rows={10} value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
          <Input placeholder="Author" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
          <Input placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
          <div className="flex items-center gap-2">
            <Switch checked={formData.published} onCheckedChange={(checked) => setFormData({ ...formData, published: checked })} />
            <span>Published</span>
          </div>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </Card>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-4">
            <h4 className="font-bold">{post.title}</h4>
            <p className="text-sm text-gray-600">{post.excerpt}</p>
            <div className="flex gap-2 mt-2">
              <Button size="sm" onClick={() => handleEdit(post)}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
