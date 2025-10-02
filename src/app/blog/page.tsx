import Link from 'next/link';
import { getBlogPosts } from '@/data/blogPosts';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { AnimatedSocialLinks } from '@/components/AnimatedSocialLinks';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <div className="max-w-6xl mx-auto px-6 py-8 pt-24">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-gray-400 text-lg">
            Thoughts, tutorials, and insights on web development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-300 overflow-hidden hover:transform hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>

                <p className="text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
                  <span>Read more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
      <AnimatedSocialLinks />
    </div>
  );
}
