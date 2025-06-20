
export const About = () => {
  return (
    <section id="about" className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-white">🧐 About Me</h2>
      <div className="space-y-6">
        <div className="text-gray-300 leading-relaxed">
          <p>
            I'm <strong className="text-white">Ansh Grover</strong> — a self-driven developer who turns curiosity into code. With over <strong className="text-white">153+ merged PRs</strong> and <strong className="text-white">$1099+ in bounties</strong> earned via <a href="https://algora.io/Anshgrover23" className="text-purple-400 hover:text-purple-300 transition-colors underline">Algora.io</a>, I specialize in full-stack development, testing infrastructure, and developer tooling.
          </p>
        </div>

        <div className="bg-gray-900/50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-white mb-3">🏆 Key Achievements</h4>
          <ul className="text-gray-300 space-y-2">
            <li>• Maintainer-level contributions to <strong className="text-white">TSCircuit</strong> and <strong className="text-white">Mediar-AI</strong></li>
            <li>• Receiving <strong className="text-white">$200+ per month</strong> in GitHub sponsorships</li>
            <li>• Built tools used by thousands of developers</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
