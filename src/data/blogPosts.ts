import { BlogPost } from '@/types/blog';

export const blogPosts: BlogPost[] = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js 15',
    excerpt: 'Learn how to build modern web applications with Next.js 15 and its latest features.',
    content: `
# Getting Started with Next.js 15

Next.js 15 brings exciting new features and improvements to the React framework we all love. In this post, we'll explore some of the key features and how to get started.

## What's New in Next.js 15?

Next.js 15 introduces several improvements:

- **Turbopack**: Faster development builds
- **Improved Server Components**: Better performance and SEO
- **Enhanced Image Optimization**: Automatic image optimization out of the box
- **Better TypeScript Support**: Improved type checking and inference

## Getting Started

To create a new Next.js 15 project, run:

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

This will set up a new Next.js project with all the latest features and best practices.

## Project Structure

A typical Next.js 15 project has the following structure:

\`\`\`
my-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
├── public/
└── package.json
\`\`\`

## Conclusion

Next.js 15 is a powerful framework that makes building React applications a breeze. Give it a try in your next project!
    `,
    date: '2024-10-02',
    readTime: '2 min read',
    tags: ['Next.js', 'React', 'Web Development'],
    author: 'Ansh Grover',
  }
];

export function getBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostSlugs(): string[] {
  return blogPosts.map(post => post.slug);
}
