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
  bounty?: string;
}

interface CacheData {
  lastFetched: string;
  prs: PR[];
}

const CACHE_FILE = path.join(process.cwd(), 'src/data/prCache.json');
const CACHE_DURATION =  24 * 60 * 60 * 1000;

function loadCache(): CacheData | null {
  try {
    if (!fs.existsSync(CACHE_FILE)) return null;
    const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
    return cache;
  } catch {
    return null;
  }
}
function saveCache(data: PR[]): void {
  const cacheData: CacheData = {
    lastFetched: new Date().toISOString(),
    prs: data,
  };
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2), 'utf-8');
}
function isCacheValid(cache: CacheData): boolean {
  const lastFetched = new Date(cache.lastFetched).getTime();
  const now = Date.now();
  return now - lastFetched < CACHE_DURATION;
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

  const bountyFromPR = extractBountyFromText([pr.body || '']);
  if (bountyFromPR) {
    console.log(`💰 Found bounty in PR body: ${bountyFromPR}`);
    return bountyFromPR;
  }

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
    await new Promise(r => setTimeout(r, 80));
  }

  console.log(`❌ No bounty found for PR #${pr.number}`);
  return undefined;
}

async function fetchMergedPRsForRepo(
  org: string,
  repo: string,
  since?: string
): Promise<PR[]> {
  const results: PR[] = [];
  let page = 1;

  while (true) {
    const url = `https://api.github.com/repos/${org}/${repo}/pulls`;
    const params: {
      state: string;
      per_page: number;
      page: number;
      sort: string;
      direction: string;
      since?: string;
    } = {
      state: 'closed',
      per_page: 100,
      page,
      sort: 'updated',
      direction: 'desc',
    };

    // Only fetch PRs updated since last cache
    if (since) {
      params.since = since;
    }

    const { data } = await axios.get<GitHubPR[]>(url, {
      headers: getHeaders(),
      params,
    });

    if (!Array.isArray(data) || data.length === 0) break;

    const mergedByUser = data.filter(
      pr => pr.merged_at && pr.user.login === YOUR_USERNAME
    );

    // If using since parameter and no new PRs from this user, stop fetching this repo
    if (since && mergedByUser.length === 0) {
      console.log(`⏭️ No new PRs since ${since}, skipping remaining pages`);
      break;
    }

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
            bounty,
          });
        } else {
          console.log(`⏭️ Skipping PR without bounty: ${pr.title}`);
        }
        await new Promise(r => setTimeout(r, 80));
      }

    page += 1;
    // Pace page requests
    await new Promise(r => setTimeout(r, 120));
  }

  return results;
}

async function fetchYourPRs(): Promise<PR[]> {
  // Check cache first
  const cache = loadCache();

  if (cache && isCacheValid(cache)) {
    console.log(
      `📋 Using cached data from ${new Date(cache.lastFetched).toLocaleString()}`
    );
    console.log(`🎯 Found ${cache.prs.length} cached PRs with bounties`);
    return cache.prs;
  }

  console.log(
    `🔄 Cache ${cache ? 'expired' : 'not found'}, fetching fresh data...`
  );

  const all: PR[] = [];
  const since = cache?.lastFetched; // Only fetch PRs updated since last cache

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
        const fetchType = since ? ' (incremental)' : ' (full)';
        console.log(`🔍 ${org}/${repo}${fetchType}`);

        const prs = await fetchMergedPRsForRepo(org, repo, since);
        console.log(
          `✅ Found ${prs.length} new merged PRs by ${YOUR_USERNAME} in ${repo}`
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

   let finalData = all;
   if (cache && since) {
     console.log(
       `🔄 Merging ${all.length} new PRs with ${cache.prs.length} cached PRs`
     );

     // Remove duplicates and merge
     const existingPRs = cache.prs.filter(
       cachedPR =>
         !all.some(
           newPR =>
             newPR.org === cachedPR.org &&
             newPR.repo === cachedPR.repo &&
             newPR.number === cachedPR.number
         )
     );
     finalData = [...existingPRs, ...all];
   }
finalData.sort(
  (a, b) => new Date(b.mergedAt).getTime() - new Date(a.mergedAt).getTime()
);

// Save to cache
saveCache(finalData);
console.log(`💾 Cached ${finalData.length} total PRs`);

return finalData;
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
