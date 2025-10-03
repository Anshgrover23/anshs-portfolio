export interface PR {
  org: string;
  repo: string;
  title: string;
  description: string;
  link: string;
  mergedAt: string;
  createdAt: string;
  author: string;
  number: number;
  bounty?: string; 
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  logo: string;
  link: string;
  totalPRs: number;
  totalBounties: string;
  bountyCount: number;
  contributions: Contribution[];
}

export interface Contribution {
  title: string;
  description: string;
  link: string;
  bounty?: string;
}

export interface CompanyData {
  name: string;
  logo: string;
  contributions: Contribution[];
}
