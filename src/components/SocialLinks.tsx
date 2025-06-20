
import { Home, Github, Linkedin, Mail, X } from "lucide-react";

export const SocialLinks = () => {
  const links = [
    { icon: Home, href: "#", label: "Home" },
    { icon: Github, href: "https://github.com/Anshgrover23", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/anshgrover23", label: "LinkedIn" },
    { icon: Mail, href: "mailto:anshgrover23@gmail.com", label: "Email" },
    { icon: X, href: "https://twitter.com/anshgrover23", label: "Twitter" }
  ];

  return (
    <section>
      <div className="flex justify-center gap-6 py-8">
        {links.map((link, index) => {
          const Icon = link.icon;
          return (
            <a
              key={index}
              href={link.href}
              aria-label={link.label}
              className="p-3 rounded-full bg-gray-900/50 hover:bg-gray-800 transition-all duration-300 hover:scale-110"
            >
              <Icon className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
            </a>
          );
        })}
      </div>
    </section>
  );
};
