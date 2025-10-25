import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  author_image: string;
  featured_image: string;
  category: string;
  tags: string[];
  created_at: string;
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();
    
    if (data) {
      setPost(data);
      await supabase.from('blog_posts').update({ views: (data.views || 0) + 1 }).eq('id', data.id);
    }
    setLoading(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!post) return <div className="min-h-screen flex items-center justify-center">Post not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigateHome={() => window.location.href = '/'} />
      
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <Badge className="mb-4">{post.category}</Badge>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 mb-8">
          {post.author_image && (
            <img src={post.author_image} alt={post.author} className="w-12 h-12 rounded-full" />
          )}
          <div>
            <p className="font-semibold">{post.author}</p>
            <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
          </div>
        </div>

        {post.featured_image && (
          <img src={post.featured_image} alt={post.title} className="w-full h-96 object-cover rounded-lg mb-8" />
        )}

        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        )}
      </article>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
