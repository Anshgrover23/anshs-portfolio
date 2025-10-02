import { BlogPost } from '@/types/blog';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogsDirectory = path.join(process.cwd(), 'blogs');

let cachedBlogPosts: BlogPost[] | null = null;

export function getBlogPosts(): BlogPost[] {
  if (cachedBlogPosts) {
    return cachedBlogPosts;
  }

  try {
    if (!fs.existsSync(blogsDirectory)) {
      console.warn('Blogs directory not found');
      return [];
    }

    const fileNames = fs.readdirSync(blogsDirectory);
    const allPostsData: BlogPost[] = fileNames
      .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx?$/, '');
        const fullPath = path.join(blogsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
          slug,
          title: matterResult.data.title || 'Untitled',
          excerpt: matterResult.data.excerpt || '',
          content: matterResult.content,
          date: matterResult.data.date || new Date().toISOString().split('T')[0],
          readTime: matterResult.data.readTime || '5 min read',
          tags: matterResult.data.tags || [],
          author: matterResult.data.author || 'Ansh Grover',
          coverImage: matterResult.data.coverImage,
        };
      });

    cachedBlogPosts = allPostsData.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return cachedBlogPosts;
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export function getBlogPostSlugs(): string[] {
  const posts = getBlogPosts();
  return posts.map((post) => post.slug);
}
