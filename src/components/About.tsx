import { Button } from './ui/button';

export const About = () => {
  return (
    <section id="about" className="mb-24 font-['Bricolage_Grotesque']">
      <h2 className="text-3xl font-bold mb-8 text-white">🧐 About Me</h2>
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
          <ul className="text-gray-300 space-y-2 mb-6">
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
            <Button  className='bg-white font-semibold text-black hover:bg-gray-200'>
              <a
                href="https://github.com/sponsors/Anshgrover23"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                Sponsor me on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
