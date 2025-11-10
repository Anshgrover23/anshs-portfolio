'use client';

import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import {
  BarChart3,
  Beer,
  Database,
  Drama,
  FlaskConical,
  Laptop,
  Link,
  MonitorSmartphone,
  Package,
  Palette,
  RefreshCw,
  Route,
  ServerCog,
  Shield,
  Ship,
  Workflow,
  Zap,
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
          name: 'React.js',
          icon: { type: 'svg', src: '/svg-icons/reactjs.svg' },
        },
        {
          name: 'Next.js',
          icon: { type: 'svg', src: '/svg-icons/nextjs.svg' },
        },
        {
          name: 'TypeScript',
          icon: { type: 'svg', src: '/svg-icons/typescript.svg' },
        },
        { name: 'TailwindCSS', icon: { type: 'lucide', icon: Palette } },
        { name: 'Vite', icon: { type: 'lucide', icon: Zap } },
        { name: 'JavaScript', icon: { type: 'lucide', icon: Laptop } },
      ],
    },
    {
      title: 'Backend Development',
      icon: ServerCog,
      skills: [
        { name: 'Node.js', icon: { type: 'lucide', icon: Package } },
        { name: 'Express.js', icon: { type: 'lucide', icon: Route } },
        { name: 'Rust', icon: { type: 'svg', src: '/svg-icons/rust.svg' } },
        { name: 'Ruby', icon: { type: 'svg', src: '/svg-icons/ruby.svg' } },
        { name: 'PostgreSQL', icon: { type: 'lucide', icon: Database } },
        { name: 'REST APIs', icon: { type: 'lucide', icon: Link } },
        { name: 'JWT Auth', icon: { type: 'lucide', icon: Shield } },
      ],
    },
    {
      title: 'Testing & DevOps',
      icon: FlaskConical,
      skills: [
        { name: 'Playwright', icon: { type: 'lucide', icon: Drama } },
        { name: 'E2E Testing', icon: { type: 'lucide', icon: RefreshCw } },
        { name: 'Docker', icon: { type: 'lucide', icon: Ship } },
        { name: 'GitHub Actions', icon: { type: 'lucide', icon: Workflow } },
        { name: 'Homebrew', icon: { type: 'lucide', icon: Beer } },
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
                        className={`${skill.name === 'Next.js' && 'invert'} ${skill.name === 'Rust' && 'w-4'}`}
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
