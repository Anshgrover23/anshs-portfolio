import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

interface Contribution {
  title: string;
  description: string;
  bounty?: string;
  link?: string;
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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <span className="text-3xl">{company.logo}</span>
            {company.name} - Featured Contributions
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 max-h-96 overflow-y-auto">
          {company.contributions.map((contribution, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-gray-800/50 border border-gray-700"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-lg font-semibold text-purple-400">
                  {contribution.title}
                </h4>
                {contribution.bounty && (
                  <Badge
                    variant="secondary"
                    className="bg-green-900/50 text-green-300"
                  >
                    {contribution.bounty}
                  </Badge>
                )}
              </div>
              <p className="text-gray-300 mb-3">{contribution.description}</p>
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
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
