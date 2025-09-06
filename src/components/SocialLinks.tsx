import { Home, Github, Mail, Twitter, Linkedin, ExternalLink } from "lucide-react";

export const SocialLinks = () => {
  const links = [
    { icon: Home, href: "#", label: "Home" },
    { icon: Github, href: "https://github.com/Anshgrover23", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/ansh-grover", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/anshgrover23", label: "Twitter" },
    { icon: Mail, href: "mailto:anshgrover23@gmail.com", label: "Email" }
  ];

  return (
    <section className="py-8">
      <div className="flex justify-center gap-6">
        {links.map((link, index) => {
          const Icon = link.icon;
          return (
            <a
              key={index}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={link.label}
              className="group relative p-3 rounded-full bg-gray-900/50 hover:bg-gray-800 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
              
              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {link.label}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
};
