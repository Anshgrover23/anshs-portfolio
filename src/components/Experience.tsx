'use client';
import { useState } from 'react';
import { CompanyModal } from './CompanyModal';
import Image from 'next/image';

export const Experience = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const experiences = [
    {
      company: 'antiwork',
      role: 'Open Source Contributor',
      period: '2025 - Present',
      headline: 'Build multiple major features and shipped them perfectly.',
      logo: 'antiwork.svg',
      link: 'https://github.com/antiwork/helper',
      totalPRs: '55+',
      totalBounties: '$40,000 (Flexile)',
      contributions: [
        {
          title:
            'Designed and shipped Flexile equity management experiences end-to-end',
          description:
            'Designed and shipped Equity Management features in Flexile — including Cap Tables, Option Pools, and Lawyer Management UI — while migrating company updates and related modules from tRPC to a Rails API for improved consistency and backend performance.',
          badge: '$15k total bounties earned',
          pullRequests: [
            {
              title: '#691 · feat: Manage lawyers via UI',
              link: 'https://github.com/antiwork/flexile/pull/691',
            },
            {
              title: '#1031 · feat: cap table UI',
              link: 'https://github.com/antiwork/flexile/pull/1031',
            },
            {
              title: '#1128 · feat: create option pools via UI',
              link: 'https://github.com/antiwork/flexile/pull/1128',
            },
            {
              title:
                '#1210 · refactor(cap_table): make cap_table a singular resource',
              link: 'https://github.com/antiwork/flexile/pull/1210',
            },
            {
              title:
                '#1093 · feat(equity-settings): require company name before enabling equity',
              link: 'https://github.com/antiwork/flexile/pull/1093',
            },
            {
              title:
                '#1030 · Refactor InviteLawyer service to improve user invitation logic',
              link: 'https://github.com/antiwork/flexile/pull/1030',
            },
            {
              title: '#913 · Remove expenses feature flag and related check',
              link: 'https://github.com/antiwork/flexile/pull/913',
            },
            {
              title:
                '#907 · Remove QuickBooks feature flag checks from backend and frontend',
              link: 'https://github.com/antiwork/flexile/pull/907',
            },
            {
              title: '#673 · feat: add equity management feature in settings',
              link: 'https://github.com/antiwork/flexile/pull/673',
            },
            {
              title:
                '#660 · refactor: consolidate equity flags into equity_enabled',
              link: 'https://github.com/antiwork/flexile/pull/660',
            },
            {
              title: '#641 · remove use of companyUpdatesEnabled flag',
              link: 'https://github.com/antiwork/flexile/pull/641',
            },
          ],
        },
        {
          title: 'Enabled automated CI and hardened end-to-end test coverage',
          description:
            'Enabled automated CI runs for contributor pull requests and expanded Playwright coverage across Helper, eliminating fragile page objects and strengthening accessibility selectors for more reliable contributions.',
          badge: '7.5k$ total bounties earned',
          pullRequests: [
            {
              title:
                '#1019 · Enable CI to run automatically on contributor pull requests',
              link: 'https://github.com/antiwork/helper/pull/1019',
            },
            {
              title:
                '#902 · fix(e2e): mock FIRECRAWL_API_KEY in CI & improve accessibility selectors',
              link: 'https://github.com/antiwork/helper/pull/902',
            },
            {
              title:
                '#900 · fix: E2E tests and remove page object from newMessageWithsavedRepliesPage',
              link: 'https://github.com/antiwork/helper/pull/900',
            },
            {
              title: '#895 · Remove widget page object usage',
              link: 'https://github.com/antiwork/helper/pull/895',
            },
            {
              title: '#873 · remove base page object usage',
              link: 'https://github.com/antiwork/helper/pull/873',
            },
            {
              title: '#872 · remove login page object usage',
              link: 'https://github.com/antiwork/helper/pull/872',
            },
            {
              title: '#854 · tests: add E2E tests for customer settings page',
              link: 'https://github.com/antiwork/helper/pull/854',
            },
            {
              title:
                '#851 · Refactor Conversations E2E Tests: Inline Locators and Remove Page Object',
              link: 'https://github.com/antiwork/helper/pull/851',
            },
          ],
        },
        {
          title:
            'Removed legacy encrypted-field logic by migrating to plaintext storage',
          description:
            'Simplified Helper setup and data handling by replacing encrypted-field workflow with plaintext columns, a safe conversion job, and follow-up cleanup across schema and app logic.',
          badge: '5k$ bountied issue',
          pullRequests: [
            {
              title:
                '#865 · Refactor: replace encrypted fields with plaintext columns in database schema',
              link: 'https://github.com/antiwork/helper/pull/865',
            },
            {
              title:
                '#912 · Remove encrypted fields from database schema and related logic',
              link: 'https://github.com/antiwork/helper/pull/912',
            },
            {
              title:
                '#839 · refactor: add plaintext columns for encrypted fields in database schema',
              link: 'https://github.com/antiwork/helper/pull/839',
            },
            {
              title:
                '#858 · feat: add migration job for encrypted to plaintext data conversion',
              link: 'https://github.com/antiwork/helper/pull/858',
            },
          ],
        },
        {
          title: 'Refactored Helper into a single-tenant mailbox platform',
          description:
            'Refactored Helper from a multi-tenant to single-tenant architecture and simplified mailbox logic to improve maintainability and deployment simplicity.',
          badge: '2.5k$ bountied issue',
          pullRequests: [
            {
              title:
                '#703 · Remove mailbox switcher dropdown and mailboxes.list procedure',
              link: 'https://github.com/antiwork/helper/pull/703',
            },
            {
              title:
                '#704 · refactor: replace getMailboxById/getMailboxBySlug with getMailbox',
              link: 'https://github.com/antiwork/helper/pull/704',
            },
            {
              title: '#706 · refactor: rename mailboxId to unused_mailboxId',
              link: 'https://github.com/antiwork/helper/pull/706',
            },
            {
              title:
                '#733 · fix: remove flexile and helper fixtures & fix nesting structure',
              link: 'https://github.com/antiwork/helper/pull/733',
            },
            {
              title:
                '#721 · Remove mailboxSlug from all frontend routes, components, and widget code for single-tenant migration',
              link: 'https://github.com/antiwork/helper/pull/721',
            },
          ],
        },
        {
          title: 'Added GitHub authentication to Gumboard',
          description:
            'Implemented OAuth-based GitHub authentication in Gumboard with end-to-end tests and documentation updates, showcasing ability to ship secure, scalable login flows.',
          badge: '1k$ total bounty',
          pullRequests: [
            {
              title: '#125 · Add GitHub auth',
              link: 'https://github.com/antiwork/gumboard/pull/125',
            },
          ],
        },
        {
          title:
            'Moved company update workflows from tRPC to the Rails API surface',
          description:
            'Migrated frontend company updates database calls onto the Rails API to standardize data access patterns and unlock backend performance improvements.',
          badge: '$500 total bounty',
          pullRequests: [
            {
              title:
                '#1207 · feat(company_updates): migrate frontend db calls to Rails API',
              link: 'https://github.com/antiwork/flexile/pull/1207',
            },
          ],
        },
      ],
    },
    {
      company: 'TSCircuit',
      role: 'Open Source Contributor/Maintainer',
      period: '2024 - Present',
      description:
        'Contributing to circuit design tools and testing infrastructure',
      logo: 'tscircuit.svg',
      link: 'https://tscircuit.com/',
      totalPRs: '100+',
      totalBounties: '$809+',
      contributions: [
        {
          title: 'Issue Roulette Game',
          description:
            'Built a full frontend using React & TypeScript that randomly assigns GitHub issues to contributors.',
          bounty: '$40 bounty',
          link: 'https://issue-roulette-red.vercel.app/',
        },
        {
          title: 'Contribution Tracker',
          description:
            'Designed and implemented the frontend for tracking contributor activities.',
          link: 'https://contributions.tscircuit.com/',
        },
        {
          title: 'Maintenance Tracker',
          description:
            'Boosted flaky test coverage from 5% to 95%+ using Playwright.',
          bounty: '$20+ bounty',
          link: 'https://maintenance.tscircuit.com/',
        },
        {
          title: 'Fake Reddit',
          description:
            'Set up initial fake-backend endpoints and architecture.',
          bounty: '$25+ bounty',
          link: 'https://github.com/tscircuit/fake-reddit/pull/3',
        },
      ],
    },
    {
      company: 'Mediar-AI',
      role: 'Open Source Contributor',
      period: '2024 - Present',
      description:
        'Built dev tools, automation scripts, and published Screenpipe to Homebrew.',
      logo: 'mediar-ai.svg',
      link: 'https://www.mediar.ai/',
      totalPRs: '20+',
      totalBounties: '$250+',
      contributions: [
        {
          title: 'Highlight Element Debugging Tool',
          description:
            'Created a visual bounding box feature for Terminator to help devs debug AI workflows.',
          bounty: '$100 bounty',
          link: 'https://github.com/mediar-ai/terminator/pull/41',
        },
        {
          title: 'Gmail Automation Tool',
          description:
            'Implements a script to automate Gmail operations like sending mail.',
          bounty: '$100 bounty',
          link: 'https://github.com/mediar-ai/terminator/pull/38',
        },
        {
          title: 'VLC Media Player Automation',
          description:
            'Add VLC media player automation example script with support for YouTube streams and local video playback.',
          link: 'https://github.com/mediar-ai/terminator/pull/35',
        },
        {
          title: 'Homebrew Release for Screenpipe',
          description:
            'Published the Screenpipe tool to Homebrew with CI/CD integration.',
          bounty: '$50 bounty',
          link: 'https://github.com/mediar-ai/screenpipe/pull/623',
        },
      ],
    },
    {
      company: 'Algora.io',
      role: 'Bounty Hunter',
      period: '2024 - Present',
      description: 'Earned $1099+ in bounties by solving github issues.',
      logo: 'algora.svg',
      link: 'https://algora.io/Anshgrover23',
      totalPRs: '33+',
      totalBounties: '$1099+',
      contributions: [
        {
          title: 'Multiple Bounty Completions',
          description:
            'Successfully completed various development challenges across different organizations, earning significant bounties for quality contributions.',
          bounty: '$1099+ total earned',
          link: 'https://algora.io/Anshgrover23',
        },
      ],
    },
  ];

  const companyData = {
    antiwork: {
      name: 'antiwork',
      logo: '🛠️',
      contributions: experiences[0].contributions,
    },
    TSCircuit: {
      name: 'TSCircuit',
      logo: '🔌',
      contributions: experiences[1].contributions,
    },
    'Mediar-AI': {
      name: 'Mediar-AI',
      logo: '🤖',
      contributions: experiences[2].contributions,
    },
    'Algora.io': {
      name: 'Algora.io',
      logo: '💰',
      contributions: experiences[3].contributions,
    },
  };

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-white">
        Cool places I've contributed to
      </h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 p-6 rounded-lg bg-gray-900/50 hover:bg-gray-900/70 transition-all duration-300 cursor-pointer relative ${exp.company === 'antiwork' ? 'border-2 border-purple-500 shadow-[0_0_16px_4px_rgba(168,85,247,0.5)]' : ''}`}
            onClick={() => setSelectedCompany(exp.company)}
          >
            <div className="text-3xl">
              {typeof exp.logo === 'string' && exp.logo.endsWith('.svg') ? (
                <Image
                  src={`/${exp.logo}`}
                  alt={`${exp.company} logo`}
                  className="rounded-full object-contain inline-block align-middle"
                  height={32}
                  width={32}
                />
              ) : (
                exp.logo
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <a
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-semibold text-white hover:text-purple-400 transition-colors"
                  onClick={e => e.stopPropagation()}
                >
                  {exp.company}
                </a>
                <span className="text-gray-400 text-sm">{exp.period}</span>
              </div>
              <p className="text-purple-400 mb-2">{exp.role}</p>
              <p className="text-gray-300 text-sm mb-3">{exp.description}</p>
              {exp.headline && (
                <p className="text-white text-sm font-semibold mb-4">
                  {exp.headline}
                </p>
              )}
              <div className="flex flex-col items-start gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-semibold text-sm sm:text-sm">
                    PRs Merged:
                  </span>
                  <span className="text-white text-sm sm:text-sm font-medium">
                    {exp.totalPRs}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-semibold text-sm sm:text-sm">
                    Bounties Earned:
                  </span>
                  <span className="text-white text-sm sm:text-sm font-medium">
                    {exp.totalBounties}
                  </span>
                </div>
              </div>
              <p className="text-blue-400 text-sm mt-2">
                Click to view featured contributions →
              </p>
              {/* Language badges bottom right (responsive) */}
              {exp.company === 'antiwork' && (
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0 md:absolute md:right-6 md:bottom-4 md:flex-row items-center md:items-end justify-start">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-blue-400/30 shadow-lg text-blue-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-blue-700/30">
                    <Image
                      src="/svg-icons/typescript.svg"
                      alt="typescript-svg"
                      width={15}
                      height={15}
                    />
                    TypeScript
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-zinc-400/30 shadow-lg text-zinc-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-zinc-700/30">
                    <Image
                      src="/svg-icons/nextjs.svg"
                      alt="nextjs-svg"
                      width={15}
                      height={15}
                      className="invert"
                    />
                    Next.js
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-rose-400/30 shadow-lg text-rose-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-rose-700/30">
                    <Image
                      src="/svg-icons/ruby.svg"
                      alt="ruby-svg"
                      width={15}
                      height={15}
                    />
                    Ruby
                  </span>
                </div>
              )}
              {exp.company === 'TSCircuit' && (
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0 md:absolute md:right-6 md:bottom-4 md:flex-row items-center md:items-end justify-start">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-blue-400/30 shadow-lg text-blue-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-blue-700/30">
                    <Image
                      src="/svg-icons/typescript.svg"
                      alt="typescript-svg"
                      width={15}
                      height={15}
                    />
                    TypeScript
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-cyan-400/30 shadow-lg text-cyan-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-cyan-700/30">
                    <Image
                      src="/svg-icons/reactjs.svg"
                      alt="reactjs-svg"
                      width={15}
                      height={15}
                    />
                    React.js
                  </span>
                </div>
              )}
              {exp.company === 'Mediar-AI' && (
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0 md:absolute md:right-6 md:bottom-4 md:flex-row items-center md:items-end justify-start">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-orange-400/30 shadow-lg text-orange-200 text-xs font-semibold transition-transform transform hover:scale-105 hover:bg-orange-700/30">
                    <Image
                      src="/svg-icons/rust.svg"
                      alt="rust-svg"
                      width={15}
                      height={15}
                    />
                    Rust
                  </span>
                </div>
              )}
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
