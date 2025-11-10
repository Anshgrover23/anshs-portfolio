import { CalendarDays } from 'lucide-react';

type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

type ContributionCalendar = {
  totalContributions: number;
  weeks: ContributionWeek[];
};

type ContributionResult =
  | {
      calendar: ContributionCalendar;
      totalDays: number;
      username: string;
      from: string;
      to: string;
    }
  | {
      error: string;
    };

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';
const DEFAULT_USERNAME = 'Anshgrover23';

const contributionsQuery = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              color
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

async function fetchContributions(): Promise<ContributionResult> {
  const githubToken = process.env.GRAPHQL_TOKEN;
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || DEFAULT_USERNAME;

  if (!githubToken) {
    return {
      error:
        'Missing GitHub API token. Set GRAPHQL_TOKEN in your environment to enable the activity graph.',
    };
  }

  const to = new Date();
  const from = new Date();
  from.setFullYear(to.getFullYear() - 1);

  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${githubToken}`,
    },
    body: JSON.stringify({
      query: contributionsQuery,
      variables: {
        login: username,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
    next: { revalidate: 60 * 60 * 6 },
  });

  if (!response.ok) {
    return {
      error: `Failed to fetch contributions from GitHub (status ${response.status}).`,
    };
  }

  const payload = await response.json();

  if (payload.errors) {
    return {
      error: payload.errors
        .map(
          (item: { message?: string }) =>
            item?.message ?? 'Unknown GitHub API error'
        )
        .join(', '),
    };
  }

  const calendar: ContributionCalendar | undefined =
    payload?.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar) {
    return {
      error: 'GitHub response did not contain contribution data.',
    };
  }

  const totalDays = calendar.weeks.reduce(
    (acc, week) => acc + week.contributionDays.length,
    0
  );

  return {
    calendar,
    totalDays,
    username,
    from: from.toISOString(),
    to: to.toISOString(),
  };
}

function formatDateRange(fromISO: string, toISO: string) {
  const fromDate = new Date(fromISO);
  const toDate = new Date(toISO);

  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const sameYear = fromDate.getFullYear() === toDate.getFullYear();

  return sameYear
    ? `${formatter.format(fromDate)} - ${formatter.format(toDate)}`
    : `${formatter.format(fromDate)}, ${fromDate.getFullYear()} - ${formatter.format(toDate)}, ${toDate.getFullYear()}`;
}

export async function GitHubActivity() {
  const result = await fetchContributions();

  if ('error' in result) {
    return (
      <section className="mb-16 rounded-xl border border-white/10 bg-gray-950/80 p-8 text-gray-300">
        <div className="flex items-center gap-3 text-white">
          <CalendarDays className="h-7 w-7 text-accent" />
          <h3 className="text-2xl font-semibold">GitHub Activity</h3>
        </div>
        <p className="mt-4 text-sm text-gray-400">{result.error}</p>
      </section>
    );
  }

  const { calendar, totalDays, username, from, to } = result;
  const weeks = calendar.weeks;
  const dateRangeLabel = formatDateRange(from, to);

  return (
    <section className="mb-16 rounded-xl border border-white/10 bg-gray-950/80 p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-7 w-7 text-accent" />
          <div>
            <h3 className="text-2xl font-semibold text-white">
              GitHub Activity
            </h3>
            <p className="text-sm text-gray-400">
              {calendar.totalContributions.toLocaleString()} contributions in
              the last year · {dateRangeLabel}
            </p>
          </div>
        </div>
        <div className="rounded-full border border-white/10 px-4 py-1 text-xs uppercase tracking-wider text-gray-400">
          @{username}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${weeks.length}, minmax(10px, 1fr))`,
            gridTemplateRows: 'repeat(7, 12px)',
          }}
        >
          {weeks.map((week, weekIndex) =>
            week.contributionDays.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${day.date}`}
                className="rounded-[2px]"
                style={{
                  backgroundColor: day.color || 'rgba(255,255,255,0.08)',
                  gridColumn: weekIndex + 1,
                  gridRow: dayIndex + 1,
                }}
                title={`${day.contributionCount} contributions on ${new Date(
                  day.date
                ).toLocaleDateString()}`}
              />
            ))
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span>Less</span>
          <div className="flex items-center gap-1">
            {buildLegend(calendar.weeks)}
          </div>
          <span>More</span>
        </div>
        <p className="text-xs uppercase tracking-widest text-gray-500">
          {Math.round(
            (calendar.totalContributions / Math.max(totalDays, 1)) * 100
          ) / 100}{' '}
          avg/day
        </p>
      </div>
    </section>
  );
}

function buildLegend(weeks: ContributionWeek[]) {
  const legendColors = selectLegendColors(weeks);

  return legendColors.map((color, index) => (
    <span
      key={`${color}-${index}`}
      className="h-3 w-3 rounded-[2px]"
      style={{
        backgroundColor: color,
      }}
    />
  ));
}

function selectLegendColors(weeks: ContributionWeek[]) {
  const colorToContribution = new Map<string, number>();

  weeks.forEach(week => {
    week.contributionDays.forEach(day => {
      if (!day.color) return;

      const existing = colorToContribution.get(day.color);
      if (existing === undefined || day.contributionCount > existing) {
        colorToContribution.set(day.color, day.contributionCount);
      }
    });
  });

  const sorted = Array.from(colorToContribution.entries())
    .sort((a, b) => a[1] - b[1])
    .map(([color]) => color);

  if (sorted.length >= 5) {
    return sorted.slice(0, 5);
  }

  const fallback = [
    'rgba(255,255,255,0.08)',
    'rgba(39,55,77,0.4)',
    'rgba(51,153,102,0.6)',
    'rgba(64,192,128,0.75)',
    'rgba(72,232,152,0.9)',
  ];

  if (sorted.length === 0) {
    return fallback;
  }

  return [...sorted, ...fallback].slice(0, 5);
}
