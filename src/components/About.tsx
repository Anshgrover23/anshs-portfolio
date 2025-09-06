// src/components/About.tsx - Enhanced with SVG icons
import { ExternalLink, Award, DollarSign, Heart, Github } from "lucide-react";

// Custom SVG icons to replace emojis
const UserIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const TrophyIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35L8.73 5.6c-.223.094-.406.231-.614.327-.208.1-.376.221-.563.327-.39.217-.777.304-1.137.55-.122.098-.22.275-.35.375-.13.12-.269.26-.373.408-.104.176-.226.354-.295.547-.1.199-.162.418-.202.635L6.5 10z"/>
    <path d="M17.5 10c.223 0 .437.034.65.065-.069-.232-.14-.468-.254-.68-.114-.308-.292-.575-.469-.844-.148-.291-.409-.488-.601-.737-.201-.242-.475-.403-.692-.604-.213-.21-.492-.315-.714-.463-.232-.133-.434-.28-.65-.35L15.27 5.6c.223.094.406.231.614.327.208.1.376.221.563.327.39.217.777.304 1.137.55.122.098.22.275.35.375.13.12.269.26.373.408.104.176.226.354.295.547.1.199.162.418.202.635L17.5 10z"/>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const StatsCard = ({ 
  icon, 
  title, 
  description, 
  link, 
  linkText 
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
}) => (
  <div className="flex items-start space-x-3 p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors duration-200">
    <div className="flex-shrink-0 mt-1">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-gray-300">
        {description}
        {link && linkText && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 ml-2 text-blue-400 hover:text-blue-300 transition-colors underline"
          >
            {linkText}
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </p>
    </div>
  </div>
);

export const About = () => {
  const achievements = [
    {
      icon: <Github className="w-5 h-5 text-green-400" />,
      title: "Open Source Contributions",
      description: (
        <>
          <strong className="text-white">215+ PRs</strong> merged across open-source projects
        </>
      )
    },
    {
      icon: <Award className="w-5 h-5 text-yellow-400" />,
      title: "Flexile Bounty",
      description: (
        <>
          <strong className="text-white">$6000 bounty</strong> awarded by
        </>
      ),
      link: "https://flexile.com/",
      linkText: "Flexile"
    },
    {
      icon: <DollarSign className="w-5 h-5 text-green-400" />,
      title: "Algora Bounty",
      description: (
        <>
          Earned <strong className="text-white">$1099 bounty</strong> via
        </>
      ),
      link: "https://algora.io/Anshgrover23/profile",
      linkText: "algora.io"
    },
    {
      icon: <Heart className="w-5 h-5 text-red-400" />,
      title: "GitHub Sponsorships",
      description: (
        <>
          Receiving <strong className="text-white">$200+ per month</strong> in sponsorships — fueling my open source work!
        </>
      ),
      link: "https://github.com/sponsors/Anshgrover23",
      linkText: "GitHub Sponsors"
    }
  ];

  return (
    <section id="about" className="mb-16">
      {/* Section Header with SVG Icon */}
      <div className="flex items-center gap-3 mb-8">
        <UserIcon className="w-8 h-8 text-blue-400" />
        <h2 className="text-3xl font-bold text-white">About Me</h2>
      </div>

      <div className="space-y-8">
        {/* Introduction */}
        <div className="text-gray-300 leading-relaxed text-lg">
          <p>
            I'm <strong className="text-white">Ansh Grover</strong> — <strong className="text-white">full-stack developer focusing on TypeScript</strong>, testing infrastructure, and developer experience — currently shipping across React, Rust, and Ruby.
          </p>
        </div>

        {/* Achievements Section */}
        <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800/50">
          <div className="flex items-center gap-3 mb-6">
            <TrophyIcon className="w-6 h-6 text-yellow-400" />
            <h3 className="text-xl font-semibold text-white">Key Achievements</h3>
          </div>
          
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <StatsCard
                key={index}
                icon={achievement.icon}
                title={achievement.title}
                description={achievement.description}
                link={achievement.link}
                linkText={achievement.linkText}
              />
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-8 pt-6 border-t border-gray-700/50">
            <a 
              href="https://github.com/sponsors/Anshgrover23" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Heart className="w-5 h-5" />
              Sponsor me on GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Additional Skills/Interests Section (Optional Enhancement) */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-800/30">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16,18 22,12 16,6"/>
                <polyline points="8,6 2,12 8,18"/>
              </svg>
              Current Focus
            </h4>
            <ul className="text-gray-300 space-y-2">
              <li>• Building developer tools & testing infrastructure</li>
              <li>• Contributing to open-source TypeScript projects</li>
              <li>• Exploring Rust for systems programming</li>
            </ul>
          </div>

          <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-800/30">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
              What I Love
            </h4>
            <ul className="text-gray-300 space-y-2">
              <li>• Solving complex technical challenges</li>
              <li>• Mentoring aspiring developers</li>
              <li>• Building tools that improve DX</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
