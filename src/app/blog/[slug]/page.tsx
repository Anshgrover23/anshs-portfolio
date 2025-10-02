import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPost } from '@/data/blogPosts';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { AnimatedSocialLinks } from '@/components/AnimatedSocialLinks';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { Newsletter } from '@/components/Newsletter';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <div className="max-w-4xl mx-auto px-6 py-8 pt-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Blog</span>
        </Link>

        <article className="bg-gray-900/30 backdrop-blur-sm rounded-lg border border-gray-800 p-8 md:p-12">
          <header className="mb-8 pb-8 border-b border-gray-800">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="prose prose-invert max-w-none">
            <MarkdownRenderer content={post.content} />
          </div>
        </article>

        <div className="mt-12">
          <Newsletter />
        </div>
      </div>
      <AnimatedSocialLinks />
    </div>
  );
}
