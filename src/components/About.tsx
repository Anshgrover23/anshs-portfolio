"use client"

const skills = [
  { icon: '●', color: 'text-blue-400', name: 'JavaScript' },
  { icon: '■', color: 'text-blue-500', name: 'TypeScript' },
  { icon: '◆', color: 'text-indigo-400', name: 'React.js' },
  { icon: '▲', color: 'text-sky-400', name: 'Next.js' },
  { icon: '●', color: 'text-pink-400', name: 'Express.js' },
  { icon: '■', color: 'text-cyan-300', name: 'PostgreSQL' },
  { icon: '●', color: 'text-green-400', name: 'MongoDB' },
  { icon: '■', color: 'text-orange-400', name: 'Prisma' },
  { icon: '●', color: 'text-blue-300', name: 'REST APIs' },
  { icon: '■', color: 'text-red-400', name: 'UI/UX' },
];

export const About = () => {
  return (
    <section id="about" className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-white">🧐 About Me</h2>
      <div className="overflow-hidden py-2 mb-8" role="region" aria-label="Technical skills">
        <div className="flex animate-marquee whitespace-nowrap space-x-8 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          {[...skills, ...skills].map((skill, index) => (
            <div key={`${skill.name}-${index}`} className="flex items-center space-x-2">
              <span className={skill.color}>{skill.icon}</span>
              <span className="text-gray-200 font-medium">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="text-gray-300 leading-relaxed">
          <p>
            I'm <strong className="text-white">Ansh Grover</strong> —{' '}
            <strong className="text-white">
              full-stack developer focusing on TypeScript
            </strong>
            , testing infrastructure, and developer experience — currently
            shipping across React, Rust, and Ruby.
          </p>
        </div>

        <div className="bg-gray-900/50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-white mb-3">
            🏆 Key Achievements
          </h4>
          <ul className="text-gray-300 space-y-2">
            <li>
              • <strong className="text-white">215+ PRs</strong> merged across
              open-source projects{' '}
            </li>
            <li>
              • <strong className="text-white">$6000 bounty</strong> awarded by{' '}
              <a
                href="https://flexile.com/"
                className="underline hover:text-accent transition-colors"
              >
                Flexile
              </a>{' '}
              for major contributions to{' '}
              <strong className="text-white">antiwork</strong>
            </li>
            <li>
              • Earned <strong className="text-white">$1099 bounty</strong> via{' '}
              <a
                href="https://algora.io/Anshgrover23/profile"
                className="underline hover:text-accent transition-colors"
              >
                algora.io
              </a>{' '}
              for contributions to{' '}
              <strong className="text-white">open-source</strong>
            </li>
            <li>
              •{' '}
              <span className="text-accent font-bold">
                Receiving{' '}
                <strong className="text-white">$200+ per month</strong> in{' '}
                <a
                  href="https://github.com/sponsors/Anshgrover23"
                  className="underline hover:text-accent transition-colors"
                >
                  GitHub Sponsorships
                </a>
              </span>{' '}
              — fueling my open source work!
            </li>
          </ul>
          <div className="mt-4">
            <a
              href="https://github.com/sponsors/Anshgrover23"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground font-semibold px-4 py-2 rounded transition-colors shadow-lg"
            >
              Sponsor me on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
