'use client';

import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import {
  BarChart3,
  Database,
  FlaskConical,
  Link,
  MonitorSmartphone,
  RefreshCw,
  Route,
  ServerCog,
  Shield,
  type LucideIcon,
} from 'lucide-react';

type SkillIcon =
  | { type: 'svg'; src: string }
  | { type: 'lucide'; icon: LucideIcon };

type Skill = {
  name: string;
  icon: SkillIcon;
};

type SkillCategory = {
  title: string;
  icon: LucideIcon;
  skills: Skill[];
};

export const Skills = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend Development',
      icon: MonitorSmartphone,
      skills: [
        {
          name: 'Next.js',
          icon: {
            type: 'svg',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
          },
        },
        {
          name: 'JavaScript',
          icon: {
            type: 'svg',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
          },
        },
        {
          name: 'React.js',
          icon: {
            type: 'svg',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
          },
        },
        {
          name: 'TailwindCSS',
          icon: {
            type: 'svg',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
          },
        },
      ],
    },
    {
      title: 'Backend Development',
      icon: ServerCog,
      skills: [
        {
          name: 'TypeScript',
          icon: {
            type: 'svg',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
          },
        },
        {
          name: 'Ruby',
          icon: {
            type: 'svg',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg',
          },
        },
        {
          name: 'Rust',
          icon: {
            type: 'svg',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg',
          },
        },
        {
          name: 'Node.js',
          icon: {
            type: 'svg',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
          },
        },
        { name: 'Express.js', icon: { type: 'lucide', icon: Route } },
        {
          name: 'tRPC',
          icon: {
            type: 'svg',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trpc/trpc-original.svg',
          },
        },
        { name: 'Zod', icon: { type: 'lucide', icon: Shield } },
        { name: 'REST APIs', icon: { type: 'lucide', icon: Link } },
        {
          name: 'GraphQL API',
          icon: {
            type: 'svg',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg',
          },
        },
      ],
    },
    {
      title: 'Databases & ORMs',
      icon: Database,
      skills: [
        {
          name: 'PostgreSQL',
          icon: {
            type: 'svg',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
          },
        },
        {
          name: 'MongoDB',
          icon: {
            type: 'svg',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
          },
        },
        { name: 'Drizzle ORM', icon: { type: 'lucide', icon: Database } },
        {
          name: 'Prisma ORM',
          icon: {
            type: 'svg',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg',
          },
        },
      ],
    },
    {
      title: 'Testing & DevOps',
      icon: FlaskConical,
      skills: [
        {
          name: 'Playwright',
          icon: {
            type: 'svg',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg',
          },
        },
        { name: 'E2E Testing', icon: { type: 'lucide', icon: RefreshCw } },
        {
          name: 'Docker',
          icon: {
            type: 'svg',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
          },
        },
        {
          name: 'GitHub Actions',
          icon: {
            type: 'svg',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg',
          },
        },
        {
          name: 'Homebrew',
          icon: {
            type: 'svg',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/homebrew/homebrew-original.svg',
          },
        },
      ],
    },
  ];

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
        <BarChart3 className="h-8 w-8 text-accent" />
        My Stack
      </h2>
      <div className="space-y-8">
        {skillCategories.map((category, index) => {
          const CategoryIcon = category.icon;

          return (
            <div key={index} className="p-6 rounded-lg bg-gray-900/50">
              <h3 className="text-xl font-semibold mb-4 text-purple-400 flex items-center gap-2">
                <CategoryIcon className="h-5 w-5" />
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <Badge
                    key={skillIndex}
                    variant="secondary"
                    className="bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    {skill.icon.type === 'svg' ? (
                      <Image
                        src={skill.icon.src}
                        alt={`${skill.name}-svg`}
                        width={20}
                        height={20}
                        className={`${skill.name === 'Next.js' ? 'invert' : ''}`}
                      />
                    ) : (
                      <skill.icon.icon className="h-4 w-4" />
                    )}

                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
