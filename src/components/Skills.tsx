import { Badge } from '@/components/ui/badge';

export const Skills = () => {
  const skillCategories = [
    {
      title: '🛠️ Frontend Development',
      skills: [
        { name: 'React.js', icon: '/svg-icons/reactjs.svg' },
        { name: 'Next.js', icon: '/svg-icons/nextjs.svg' },
        { name: 'TypeScript', icon: '/svg-icons/typescript.svg' },
        { name: 'TailwindCSS', icon: '🎨' },
        { name: 'Vite', icon: '⚡' },
        { name: 'JavaScript', icon: '💻' },
      ],
    },
    {
      title: '🔧 Backend Development',
      skills: [
        { name: 'Node.js', icon: '📦' },
        { name: 'Express.js', icon: '🚂' },
        { name: 'Rust', icon: '/svg-icons/rust.svg' },
        { name: 'Ruby', icon: '/svg-icons/ruby.svg' },
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'REST APIs', icon: '🔄' },
        { name: 'JWT Auth', icon: '🔐' },
      ],
    },
    {
      title: '🧪 Testing & DevOps',
      skills: [
        { name: 'Playwright', icon: '🎭' },
        { name: 'E2E Testing', icon: '🔄' },
        { name: 'Docker', icon: '🐳' },
        { name: 'GitHub Actions', icon: '⚡' },
        { name: 'Homebrew', icon: '🍺' },
      ],
    },
  ];

  return (
    <section id="skills" className="mb-24 font-['Bricolage_Grotesque']">
      <h2 className="text-3xl font-bold mb-8 text-white">📊 My Stack</h2>
      <div className="space-y-8">
        {skillCategories.map((category, index) => (
          <div key={index} className="p-6 rounded-lg bg-gray-900/50">
            <h3 className="text-lg font-semibold mb-4 text-purple-400">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <Badge
                  key={skillIndex}
                  variant="secondary"
                  className="bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  {/* conditionally showing icon and emoji */}
                  {skill.icon.endsWith('.svg') ? (
                    <img src={skill.icon} alt={`${skill.name}-svg`} width="15" className={`${skill.name === 'Next.js' && 'invert'} ${skill.name === 'Rust' && 'w-4'}`}/>
                  ) : (
                    <span>{skill.icon}</span>
                  )}

                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
