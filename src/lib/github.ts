import { site } from "./site";

const API = "https://api.github.com";

export type GithubSnapshot = {
  publicRepos: number;
  followers: number;
  topLanguages: { name: string; count: number }[];
  recent: { repo: string; type: string; when: string; url: string }[];
  /** False when the API was unreachable or rate-limited, so the UI can stay honest. */
  live: boolean;
};

const FALLBACK: GithubSnapshot = {
  publicRepos: 0,
  followers: 0,
  topLanguages: [],
  recent: [],
  live: false,
};

function headers(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  // Optional: lifts the 60 req/hr anonymous limit during builds.
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

const EVENT_LABEL: Record<string, string> = {
  PushEvent: "pushed to",
  CreateEvent: "created",
  PullRequestEvent: "opened a PR in",
  IssuesEvent: "filed an issue in",
  WatchEvent: "starred",
  ReleaseEvent: "released",
  DeleteEvent: "cleaned up",
};

function relative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} ${months === 1 ? "month" : "months"} ago`;
  const years = Math.floor(months / 12);
  return `${years} ${years === 1 ? "year" : "years"} ago`;
}

/**
 * Pulled at build time and refreshed daily. Any failure degrades to a
 * non-live snapshot rather than breaking the build.
 */
export async function getGithubSnapshot(): Promise<GithubSnapshot> {
  const opts = { headers: headers(), next: { revalidate: 86_400 } } as const;

  try {
    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(`${API}/users/${site.handle}`, opts),
      fetch(`${API}/users/${site.handle}/repos?per_page=100&sort=pushed`, opts),
      fetch(`${API}/users/${site.handle}/events/public?per_page=30`, opts),
    ]);

    if (!userRes.ok || !reposRes.ok) return FALLBACK;

    const user = (await userRes.json()) as { public_repos: number; followers: number };
    const repos = (await reposRes.json()) as {
      name: string;
      fork: boolean;
      language: string | null;
    }[];

    const counts = new Map<string, number>();
    for (const r of repos) {
      if (r.fork || !r.language) continue;
      counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
    }

    const topLanguages = [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const recent: GithubSnapshot["recent"] = [];
    if (eventsRes.ok) {
      const events = (await eventsRes.json()) as {
        type: string;
        created_at: string;
        repo: { name: string };
      }[];
      const seen = new Set<string>();
      for (const e of events) {
        const label = EVENT_LABEL[e.type];
        if (!label) continue;
        const key = `${e.type}:${e.repo.name}`;
        if (seen.has(key)) continue;
        seen.add(key);
        recent.push({
          repo: e.repo.name.split("/")[1] ?? e.repo.name,
          type: label,
          when: relative(e.created_at),
          url: `https://github.com/${e.repo.name}`,
        });
        if (recent.length === 5) break;
      }
    }

    return {
      publicRepos: user.public_repos,
      followers: user.followers,
      topLanguages,
      recent,
      live: true,
    };
  } catch {
    return FALLBACK;
  }
}
