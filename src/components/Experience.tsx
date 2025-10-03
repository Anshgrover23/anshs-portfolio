'use client';

import { useState } from 'react';
import { CompanyModal } from './CompanyModal';
import Image from 'next/image';
import contributionsData from '@/data/newPR.json';
import {
  PR,
  Experience as ExpType,
  Contribution,
  CompanyData,
} from '@/types/PR';

export const Experience = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  // Helper function to clean up PR descriptions
  const cleanDescription = (description: string): string => {
    if (!description) return '';

    // Remove HTML img tags
    let cleaned = description.replace(/<img[^>]*>/g, '');

    // Remove markdown image syntax
    cleaned = cleaned.replace(/!\[.*?\]\(.*?\)/g, '');

    // Remove URLs
    cleaned = cleaned.replace(/https?:\/\/[^\s]+/g, '');

    // Remove excessive whitespace and newlines
    cleaned = cleaned.replace(/\r\n|\r|\n/g, ' ');
    cleaned = cleaned.replace(/\s+/g, ' ');

    // Extract meaningful text from common patterns
    const summaryMatch = cleaned.match(/### Summary:\s*([^#]*)/i);
    if (summaryMatch) {
      cleaned = summaryMatch[1].trim();
    }

    // Remove reference patterns like "ref: #123" or "Fixes #123"
    cleaned = cleaned.replace(/\b(ref|fixes?|closes?|resolves?):\s*#\d+/gi, '');

    // Remove AI usage sections
    cleaned = cleaned.replace(/### AI USAGE:.*$/i, '');

    // Clean up bullets and dashes
    cleaned = cleaned.replace(/^[-•]\s*/gm, '');

    // Trim and limit length
    cleaned = cleaned.trim();
    if (cleaned.length > 150) {
      cleaned = cleaned.substring(0, 147) + '...';
    }

    return cleaned || 'Bug fix and improvements';
  };

  // Ensure we have an array of contributions
  const contributions: PR[] = Array.isArray(contributionsData)
    ? contributionsData
    : [];



    // Helper function to calculate total bounties
    const calculateTotalBounties = (
      prs: PR[]
    ): { total: string; count: number } => {
      let totalAmount = 0;
      let count = 0;

      prs.forEach(pr => {
        if (pr.bounty) {
          count++;

          // Handle different bounty formats: $250, $1K, $2.5K, $10k, etc.
          const bountyStr = pr.bounty.replace(/\$/g, '').toLowerCase(); // Remove $ and make lowercase

          if (bountyStr.includes('k')) {
            // Handle K suffix (1k, 2.5k, etc.)
            const numStr = bountyStr.replace('k', '');
            const num = parseFloat(numStr);
            if (!isNaN(num)) {
              totalAmount += num * 1000; // Convert K to thousands
            }
          } else {
            // Handle regular numbers with commas: 1,000, 250, etc.
            const match = bountyStr.match(/([\d,]+(?:\.\d+)?)/);
            if (match) {
              const amount = parseInt(match[1].replace(/,/g, ''));
              if (!isNaN(amount)) {
                totalAmount += amount;
              }
            }
          }
        }
      });

      return {
        total: totalAmount > 0 ? `$${totalAmount.toLocaleString()}` : '$0',
        count,
      };
    };



  // Group contributions by company/org
  const experiences: Record<string, ExpType> = contributions.reduce(
    (acc: Record<string, ExpType>, pr: PR) => {
      const company = pr.org;

      if (!acc[company]) {
        // Create better descriptions based on company
        const getCompanyDescription = (org: string) => {
          switch (org.toLowerCase()) {
            case 'antiwork':
              return 'Contributing to modern workplace solutions and productivity tools';
            case 'tscircuit':
              return 'Building electronic circuit design and simulation tools';
            case 'mediarai':
              return 'Developing AI-powered media and automation solutions';
            default:
              return `Open source contributions to ${org}`;
          }
        };

        acc[company] = {
          company,
          role: 'Open Source Contributor',
          period: '2024 - Present',
          description: getCompanyDescription(company),
          logo: `${company.toLowerCase()}.svg`,
          link: `https://github.com/${company}`,
          totalPRs: 0,
          totalBounties: '$0',
          bountyCount: 0,
          contributions: [],
        };
      }

      acc[company].contributions.push({
        title: pr.title,
        description: cleanDescription(pr.description),
        link: pr.link,
        ...(pr.bounty && { bounty: pr.bounty }),
      });

      acc[company].totalPRs += 1;
      return acc;
    },
    {} as Record<string, ExpType>
  );

  // Calculate bounties for each company
  Object.keys(experiences).forEach(company => {
    const companyPRs = contributions.filter(pr => pr.org === company);
    const bountyInfo = calculateTotalBounties(companyPRs);
    experiences[company].totalBounties = bountyInfo.total;
    experiences[company].bountyCount = bountyInfo.count;
  });

  const experienceArray = Object.values(experiences);

  // Calculate overall stats
  const overallStats = calculateTotalBounties(contributions);
  const totalPRs = contributions.length;

  // If no experiences, show a loading or empty state
  if (experienceArray.length === 0) {
    return (
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-white">
          Cool places I've contributed to
        </h2>
        <div className="p-6 rounded-lg bg-gray-900/50 text-center">
          <p className="text-gray-400">Loading contributions...</p>
        </div>
      </section>
    );
  }

  const companyData: Record<string, CompanyData> = experienceArray.reduce(
    (acc: Record<string, CompanyData>, exp: ExpType) => {
      acc[exp.company] = {
        name: exp.company,
        logo: exp.logo,
        contributions: exp.contributions,
      };
      return acc;
    },
    {} as Record<string, CompanyData>
  );

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">
          Cool places I've contributed to
        </h2>

        {/* Overall Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-900/30 rounded-full">
            <span className="text-blue-400">📊</span>
            <span className="text-white">{totalPRs} PRs</span>
          </div>
          {overallStats.count > 0 && (
            <div className="flex items-center gap-2 px-3 py-1 bg-green-900/30 rounded-full">
              <span className="text-green-400">💰</span>
              <span className="text-white">{overallStats.total} earned</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {experienceArray.map((exp, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 p-6 rounded-lg bg-gray-900/50 hover:bg-gray-900/70 transition-all duration-300 cursor-pointer ${
              exp.company === 'antiwork'
                ? 'border-2 border-purple-500 shadow-[0_0_16px_4px_rgba(168,85,247,0.5)]'
                : ''
            }`}
            onClick={() => setSelectedCompany(exp.company)}
          >
            <div className="text-3xl">
              <Image
                src={`/${exp.logo}`}
                alt={`${exp.company} logo`}
                className="rounded-full object-contain inline-block align-middle"
                height={32}
                width={32}
                onError={e => {
                  // Fallback to a default image or hide if logo fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
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

              <div className="flex flex-wrap items-start gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-semibold text-sm">
                    PRs Merged:
                  </span>
                  <span className="text-white text-sm font-medium">
                    {exp.totalPRs}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-semibold text-sm">
                    Bounties Earned:
                  </span>
                  <span className="text-white text-sm font-medium">
                    {exp.totalBounties}
                  </span>
                  {exp.bountyCount > 0 && (
                    <span className="text-xs bg-yellow-900/30 text-yellow-300 px-2 py-1 rounded-full">
                      {exp.bountyCount} bounty
                      {exp.bountyCount > 1 ? 'ies' : 'y'}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-blue-400 text-sm mt-2">
                Click to view featured contributions →
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedCompany && (
        <CompanyModal
          isOpen={!!selectedCompany}
          onClose={() => setSelectedCompany(null)}
          company={companyData[selectedCompany]}
        />
      )}
    </section>
  );
};
