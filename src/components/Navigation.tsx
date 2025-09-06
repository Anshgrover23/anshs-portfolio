import { useState, useRef, useLayoutEffect } from 'react';
import {
  Home,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Mail,
  Menu,
  X,
} from 'lucide-react';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [highlightStyle, setHighlightStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const navItems = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: User, label: 'About', href: '#about' },
    { icon: Briefcase, label: 'Experience', href: '#experience' },
    { icon: GraduationCap, label: 'Education', href: '#education' },
    { icon: Code, label: 'Skills', href: '#skills' },
    { icon: Mail, label: 'Contact', href: '#contact' },
  ];

  useLayoutEffect(() => {
    if (hoveredIndex !== null && navRefs.current[hoveredIndex]) {
      const el = navRefs.current[hoveredIndex];
      const parent = el?.parentElement;
      if (el && parent) {
        const elRect = el.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();
        setHighlightStyle({
          left: elRect.left - parentRect.left,
          width: elRect.width,
          opacity: 1,
        });
      }
    } else {
      setHighlightStyle({ left: 0, width: 0, opacity: 0 });
    }
  }, [hoveredIndex]);

  return (
    <>
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-gray-900/80 backdrop-blur-md rounded-full px-3 py-1.5 border border-gray-700 relative">
          <div className="hidden md:flex items-center gap-4 relative">
            <div
              className="absolute top-0 h-full bg-white/10 rounded-full transition-all duration-300 ease-out"
              style={{
                left: highlightStyle.left,
                width: highlightStyle.width,
                opacity: highlightStyle.opacity,
                pointerEvents: 'none',
              }}
            />
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.href}
                  ref={el => (navRefs.current[index] = el)}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 relative z-10 px-2 py-1"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </a>
              );
            })}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40">
          <div className="fixed top-0 right-0 h-full w-64 bg-gray-900/95 backdrop-blur-md shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              <div className="flex justify-end p-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 px-6">
                <div className="space-y-4">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={index}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors py-3 border-b border-gray-700/50 last:border-b-0"
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-lg font-medium">
                          {item.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
