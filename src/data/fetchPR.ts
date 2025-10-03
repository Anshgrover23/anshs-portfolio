import 'dotenv/config';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const YOUR_USERNAME = 'Anshgrover23';

// Map organizations to their repositories
const TARGET_ORGS: Record<string, string[]> = {
  antiwork: ['gumboard','flexile','helper'],
  tscircuit: [
    'core',
    '3d-viewer',
    'sparkfun-boards',
    'props',
    'circuit-json',
    'cli',
    'tscircuit.com',
    'schematic-corpus',
    'tscircuit-autorouter',
    'parts-engine',
    'easyeda-converter',
    'contribution-tracker',
    'docs',
    'jlcsearch',
    'template-api-fake',
    'circuit-json-to-svg',
    'status',
    'file-server',
    'maintenance-tracker',
    'circuit-to-svg',
    'footprinter',
    'eval',
    'bun-match-svg',
    'issue-roulette',
    'graphics-debug',
    'eval-legacy',
    'kicad-converter',
    'autorouting.com',
    'docs-old',
    'tscircuit',
    'circuit-json-to-react',
    'schematic-symbols',
    'dsn-viewer',
    'fake-reddit',
  ],
  'mediar-ai': ['terminator', 'screenpipe'],
};

interface GitHubPR {
  title: string;
  body: string | null;
  html_url: string;
  merged_at: string | null;
  created_at: string;
  state: 'open' | 'closed';
  user: { login: string };
  number: number;
}

interface GitHubIssue {
  title: string;
  body: string | null;
  labels: Array<{ name: string }>;
}

interface PR {
  org: string;
  repo: string;
  title: string;
  description: string;
  link: string;
  mergedAt: string;
  createdAt: string;
  author: string;
  number: number;
  bounty?: string; // "$6000"
}

function getHeaders() {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
  };
  if (GITHUB_TOKEN) headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  return headers;
}

// Extract issue refs like "closes #123", "fixes owner/repo#456", or plain "#789"
function parseIssueRefs(
  text: string | null,
  fallbackOrg: string,
  fallbackRepo: string
) {
  if (!text) return [] as Array<{ org: string; repo: string; number: number }>;
  const refs: Array<{ org: string; repo: string; number: number }> = [];

  // Matches optional owner/repo then #number, optionally preceded by closes/fixes/resolves
  const re =
    /(?:(?:close|closes|closed|fix|fixes|fixed|resolve|resolves|resolved)\s+)?(?:(?:([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+))\s*)?#(\d+)/gim;

  for (const m of text.matchAll(re)) {
    const owner = (m[1] || fallbackOrg).trim();
    const repo = (m[2] || fallbackRepo).trim();
    const num = Number(m[3]);
    if (owner && repo && Number.isFinite(num))
      refs.push({ org: owner, repo, number: num });
  }
  return refs;
}

// Extract bounty from labels - just return the label as-is
function extractBountyFromText(
  texts: string[],
  labels: string[] = []
): string | undefined {
  // 1. Look for labels that start with $ and contain numbers (antiwork style)
  for (const label of labels) {
    if (/^\$[\d.,kK]+$/.test(label.trim())) {
      return label.trim();
    }
  }

  // 2. Look for rewarded bounty labels (tscircuit style)
  for (const label of labels) {
    if (label.includes('💰 Rewarded') || label.includes('Rewarded')) {
      return label.trim();
    }
  }

  return undefined;
}

async function fetchIssue(
  org: string,
  repo: string,
  number: number
): Promise<GitHubIssue | null> {
  try {
    const { data } = await axios.get<GitHubIssue>(
      `https://api.github.com/repos/${org}/${repo}/issues/${number}`,
      { headers: getHeaders() }
    );
    return data;
  } catch {
    return null;
  }
}

async function detectBounty(
  org: string,
  repo: string,
  pr: GitHubPR
): Promise<string | undefined> {
  console.log(`🔍 Checking bounty for PR #${pr.number}: ${pr.title}`);

  // 1) From PR body
  const bountyFromPR = extractBountyFromText([pr.body || '']);
  if (bountyFromPR) {
    console.log(`💰 Found bounty in PR body: ${bountyFromPR}`);
    return bountyFromPR;
  }

  // 2) From linked issue(s)
  const refs = parseIssueRefs(pr.body, org, repo);
  console.log(`🔗 Found ${refs.length} issue references:`, refs);

  for (const ref of refs) {
    console.log(
      `📋 Fetching issue #${ref.number} from ${ref.org}/${ref.repo}...`
    );
    const issue = await fetchIssue(ref.org, ref.repo, ref.number);

    if (issue) {
      console.log(`✅ Issue found: ${issue.title}`);
      console.log(`🏷️ Labels:`, issue.labels?.map(l => l.name) || []);

      const bounty = extractBountyFromText(
        [issue.title || '', issue.body || ''],
        issue.labels?.map(l => l.name) || []
      );

      if (bounty) {
        console.log(`💰 Found bounty in issue: ${bounty}`);
        return bounty;
      } else {
        console.log(`❌ No bounty found in issue #${ref.number}`);
      }
    } else {
      console.log(`❌ Could not fetch issue #${ref.number}`);
    }

    // Small delay to be nice to the API
    await new Promise(r => setTimeout(r, 80));
  }

  console.log(`❌ No bounty found for PR #${pr.number}`);
  return undefined;
}

async function fetchMergedPRsForRepo(org: string, repo: string): Promise<PR[]> {
  const results: PR[] = [];
  let page = 1;

  while (true) {
    const url = `https://api.github.com/repos/${org}/${repo}/pulls`;
    const { data } = await axios.get<GitHubPR[]>(url, {
      headers: getHeaders(),
      params: {
        state: 'closed',
        per_page: 100,
        page,
        sort: 'updated',
        direction: 'desc',
      },
    });

    if (!Array.isArray(data) || data.length === 0) break;

    const mergedByUser = data.filter(
      pr => pr.merged_at && pr.user.login === YOUR_USERNAME
    );

    for (const pr of mergedByUser) {
      const bounty = await detectBounty(org, repo, pr);

      if (bounty) {
        console.log(`💰 Adding PR with bounty: ${pr.title} (${bounty})`);
        results.push({
          org,
          repo,
          title: pr.title,
          description: pr.body || '',
          link: pr.html_url,
          mergedAt: pr.merged_at as string,
          createdAt: pr.created_at,
          author: pr.user.login,
          number: pr.number,
          bounty, // This is the key - only include bounty field when it exists
        });
      } else {
        console.log(`⏭️ Skipping PR without bounty: ${pr.title}`);
      }

      // Pace issue lookups
      await new Promise(r => setTimeout(r, 80));
    }

    page += 1;
    // Pace page requests
    await new Promise(r => setTimeout(r, 120));
  }

  return results;
}

async function fetchYourPRs(): Promise<PR[]> {
  const all: PR[] = [];

  console.log(`🎯 Fetching merged PRs for ${YOUR_USERNAME}`);
  if (!GITHUB_TOKEN) {
    console.log(
      'ℹ️ No GITHUB_TOKEN set. Using unauthenticated requests (rate limit: 60/hr).'
    );
  }

  for (const org of Object.keys(TARGET_ORGS)) {
    const repos = TARGET_ORGS[org];
    console.log(`\n🌐 Organization: ${org} (${repos.join(', ')})`);

    for (const repo of repos) {
      try {
        console.log(`🔍 ${org}/${repo}`);
        const prs = await fetchMergedPRsForRepo(org, repo);
        console.log(
          `✅ Found ${prs.length} merged PRs by ${YOUR_USERNAME} in ${repo}`
        );
        all.push(...prs);
      } catch (e: unknown) {
        let status = '';
        if (axios.isAxiosError(e)) {
          status = e.response?.status ? ` (${e.response.status})` : '';
        }
        console.error(`❌ Failed ${org}/${repo}${status}`);
      }
    }
  }

  all.sort(
    (a, b) => new Date(b.mergedAt).getTime() - new Date(a.mergedAt).getTime()
  );
  return all;
}

async function savePRs() {
  console.log('🚀 Starting search (merged PRs + bounty detection)...');
  const data = await fetchYourPRs();

  const filePath = path.join(process.cwd(), 'src/data/newPR.json');
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`\n✅ Saved ${data.length} merged PRs to newPR.json`);
}

export { savePRs, fetchYourPRs };

if (
  import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1]?.includes('fetchPR.ts') ||
  process.argv[1]?.includes('fetchPR.js')
) {
  savePRs().catch(console.error);
}
