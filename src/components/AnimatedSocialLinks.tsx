'use client';
import { Github, Mail, ExternalLink, FileText, Linkedin } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const AnimatedSocialLinks = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const links = [
    {
      icon: Github,
      href: 'https://github.com/Anshgrover23',
      label: 'GitHub',
      color: 'hover:bg-gray-700',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/anshgrover23/',
      label: 'LinkedIn',
      color: 'hover:bg-sky-900',
    },
    {
      icon: FaXTwitter,
      href: 'https://twitter.com/Anshgrover23',
      label: 'Twitter',
      color: 'hover:bg-blue-900',
    },
    {
      icon: Mail,
      href: 'mailto:ag5989670@gmail.com',
      label: 'Email',
      color: 'hover:bg-green-600',
    },
    {
      icon: ExternalLink,
      href: 'https://algora.io/Anshgrover23',
      label: 'Algora Profile',
      color: 'hover:bg-purple-600',
    },
    {
      icon: FileText,
      href: '/ansh-resume.pdf',
      label: 'Resume',
      color: 'hover:bg-green-700',
    },
  ];

  return (
    <TooltipProvider delayDuration={100}>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-gray-900/80 backdrop-blur-md rounded-full px-6 py-3 border border-gray-700 relative">
          <div className="flex items-center gap-4 relative z-10">
            {links.map((link, index) => {
              const Icon = link.icon as any;
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={link.label === 'Resume' ? '' : undefined}
                      aria-label={link.label}
                      className={`p-2 rounded-full bg-gray-800/50 ${link.color} transition-all duration-300 hover:scale-110 group relative z-20`}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    align="center"
                    className="px-2 py-1 text-xs"
                  >
                    {link.label}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
