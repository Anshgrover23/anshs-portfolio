'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface PullRequestLink {
  title: string;
  link: string;
}

interface Contribution {
  title: string;
  description: string;
  bounty?: string;
  badge?: string;
  link?: string;
  pullRequests?: PullRequestLink[];
}

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: {
    name: string;
    logo: string;
    contributions: Contribution[];
  };
}

export const CompanyModal = ({
  isOpen,
  onClose,
  company,
}: CompanyModalProps) => {
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>(
    {}
  );

  const toggleCard = (index: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <span className="text-3xl">{company.logo}</span>
            {company.name} - Featured Contributions
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 max-h-96 overflow-y-auto pr-1">
          {company.contributions.map((contribution, index) => {
            const hasPullRequests = contribution.pullRequests?.length;
            const isExpanded = !!expandedCards[index];

            return (
              <div
                key={index}
                className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 space-y-3"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <h4 className="text-lg font-semibold text-purple-400 sm:max-w-[70%]">
                    {contribution.title}
                  </h4>
                  {(contribution.badge || contribution.bounty) && (
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      {contribution.badge && (
                        <Badge className="bg-purple-600/20 text-purple-200 border border-purple-400/30">
                          {contribution.badge}
                        </Badge>
                      )}
                      {contribution.bounty && (
                        <Badge
                          variant="secondary"
                          className="bg-green-900/50 text-green-300"
                        >
                          {contribution.bounty}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                <p className="text-gray-300">{contribution.description}</p>

                {contribution.link && (
                  <a
                    href={contribution.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Contribution
                  </a>
                )}

                {hasPullRequests && (
                  <div className="rounded-md bg-gray-900/60 border border-gray-700 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleCard(index)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-200 hover:bg-gray-800/80 transition-colors"
                    >
                      <span>
                        Linked PRs ({contribution.pullRequests?.length ?? 0})
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <ul className="space-y-2 px-4 py-3 bg-gray-900/80 border-t border-gray-800">
                        {contribution.pullRequests?.map((pr, prIndex) => (
                          <li
                            key={prIndex}
                            className="flex items-start gap-2 text-sm text-gray-300"
                          >
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                            <a
                              href={pr.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-purple-300 transition-colors"
                            >
                              {pr.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
