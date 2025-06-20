
import { useState } from "react";
import { CompanyModal } from "./CompanyModal";

export const Experience = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const experiences = [
    {
      company: "TSCircuit",
      role: "Open Source Contributor",
      period: "2024 - Present",
      description: "Contributing to circuit design tools and testing infrastructure",
      logo: "🔌",
      link: "https://tscircuit.com/",
      totalPRs: "100+",
      totalBounties: "$809+",
      contributions: [
        {
          title: "Issue Roulette Game",
          description: "Built a full frontend using React & TypeScript that randomly assigns GitHub issues to contributors.",
          bounty: "$40 bounty",
          link: "https://issue-roulette-red.vercel.app/"
        },
        {
          title: "Contribution Tracker",
          description: "Designed and implemented the frontend for tracking contributor activities.",
          link: "https://contributions.tscircuit.com/"
        },
        {
          title: "Maintenance Tracker",
          description: "Boosted flaky test coverage from 5% to 95%+ using Playwright.",
          bounty: "$20+ bounty",
          link: "https://maintenance.tscircuit.com/"
        },
        {
          title: "Fake Reddit",
          description: "Set up initial fake-backend endpoints and architecture.",
          bounty: "$25+ bounty",
          link: "https://github.com/tscircuit/fake-reddit/pull/3"
        }
      ]
    },
    {
      company: "Mediar-AI",
      role: "Open Source Contributor", 
      period: "2024 - Present",
      description: "Building AI-powered media processing tools",
      logo: "🤖",
      link: "https://www.mediar.ai/",
      totalPRs: "20+",
      totalBounties: "$250+",
      contributions: [
        {
          title: "Highlight Element Debugging Tool",
          description: "Created a visual bounding box feature for Terminator to help devs debug AI workflows.",
          bounty: "$100 bounty",
          link: "https://github.com/mediar-ai/terminator/pull/41"
        },
        {
          title: "Gmail Automation Tool",
          description: "Implements a script to automate Gmail operations like sending mail.",
          bounty: "$100 bounty",
          link: "https://github.com/mediar-ai/terminator/pull/38"
        },
        {
          title: "VLC Media Player Automation",
          description: "Add VLC media player automation example script with support for YouTube streams and local video playback.",
          link: "https://github.com/mediar-ai/terminator/pull/35"
        },
        {
          title: "Homebrew Release for Screenpipe",
          description: "Published the Screenpipe tool to Homebrew with CI/CD integration.",
          bounty: "$50 bounty",
          link: "https://github.com/mediar-ai/screenpipe/pull/623"
        }
      ]
    },
    {
      company: "Algora.io",
      role: "Bounty Hunter",
      period: "2024 - Present", 
      description: "Earned $1099+ in bounties by solving development challenges",
      logo: "💰",
      link: "https://algora.io/Anshgrover23",
      totalPRs: "33+",
      totalBounties: "$1099+",
      contributions: [
        {
          title: "Multiple Bounty Completions",
          description: "Successfully completed various development challenges across different organizations, earning significant bounties for quality contributions.",
          bounty: "$1099+ total earned",
          link: "https://algora.io/Anshgrover23"
        }
      ]
    }
  ];

  const companyData = {
    "TSCircuit": {
      name: "TSCircuit",
      logo: "🔌",
      contributions: experiences[0].contributions
    },
    "Mediar-AI": {
      name: "Mediar-AI", 
      logo: "🤖",
      contributions: experiences[1].contributions
    },
    "Algora.io": {
      name: "Algora.io",
      logo: "💰", 
      contributions: experiences[2].contributions
    }
  };

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-white">Cool places I worked at</h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className="flex items-start gap-4 p-6 rounded-lg bg-gray-900/50 hover:bg-gray-900/70 transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedCompany(exp.company)}
          >
            <div className="text-3xl">{exp.logo}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <a 
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-semibold text-white hover:text-purple-400 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {exp.company}
                </a>
                <span className="text-gray-400 text-sm">{exp.period}</span>
              </div>
              <p className="text-purple-400 mb-2">{exp.role}</p>
              <p className="text-gray-300 text-sm mb-3">{exp.description}</p>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-semibold">PRs Merged:</span>
                  <span className="text-white">{exp.totalPRs}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-semibold">Bounties Earned:</span>
                  <span className="text-white">{exp.totalBounties}</span>
                </div>
              </div>
              <p className="text-blue-400 text-sm mt-2">Click to view featured contributions →</p>
            </div>
          </div>
        ))}
      </div>

      {selectedCompany && (
        <CompanyModal
          isOpen={!!selectedCompany}
          onClose={() => setSelectedCompany(null)}
          company={companyData[selectedCompany as keyof typeof companyData]}
        />
      )}
    </section>
  );
};
