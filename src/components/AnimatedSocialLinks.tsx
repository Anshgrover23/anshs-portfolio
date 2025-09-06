import { Github, Mail, ExternalLink } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { useState } from 'react';

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
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-gray-900/80 backdrop-blur-md rounded-full px-6 py-3 border border-gray-700 animate-slide-in relative">
        <div
          className="absolute top-1/2 h-14 w-14 bg-white/10 rounded-full transition-all duration-500 ease-out"
          style={{
            left: hoveredIndex !== null ? `${hoveredIndex * 52 + 14}px` : '0px',
            transform: 'translateY(-50%)',
            opacity: hoveredIndex !== null ? 1 : 0,
          }}
        />
        <div className="flex items-center gap-4 relative z-10">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className={`p-2 rounded-full bg-gray-800/50 ${link.color} transition-all duration-300 hover:scale-110 group relative z-20`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
