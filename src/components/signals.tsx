import { getGithubSnapshot } from "@/lib/github";
import { competitive, site } from "@/lib/site";
import { ExternalLink } from "./ui";

/** Live GitHub snapshot, refreshed daily at the edge. */
export async function GithubPanel() {
  const gh = await getGithubSnapshot();

  return (
    <div className="rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur-sm">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-mono text-xs tracking-widest text-faint uppercase">
          GitHub activity
        </h3>
        <ExternalLink href={site.socials.github} className="text-xs">
          @{site.handle}
        </ExternalLink>
      </div>

      {gh.live ? (
        <>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <p className="text-muted">
              <span className="font-mono text-text tabular-nums">{gh.publicRepos}</span> public
              repositories
            </p>
            {gh.topLanguages.length > 0 ? (
              <p className="text-muted">
                Most used:{" "}
                <span className="text-text">
                  {gh.topLanguages
                    .slice(0, 3)
                    .map((l) => l.name)
                    .join(", ")}
                </span>
              </p>
            ) : null}
          </div>

          {gh.recent.length > 0 ? (
            <ul className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
              {gh.recent.map((e) => (
                <li key={`${e.type}-${e.repo}`} className="flex flex-wrap gap-x-1.5 text-muted">
                  <span>{e.type}</span>
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-mono text-text underline decoration-border-strong underline-offset-2 hover:decoration-accent"
                  >
                    {e.repo}
                  </a>
                  <span className="text-faint">· {e.when}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </>
      ) : (
        <p className="mt-4 text-sm text-faint">
          Live activity is temporarily unavailable — the profile is on{" "}
          <a
            href={site.socials.github}
            target="_blank"
            rel="noreferrer noopener"
            className="text-accent underline underline-offset-2"
          >
            GitHub
          </a>
          .
        </p>
      )}
    </div>
  );
}

export function CompetitivePanel() {
  const rows = [
    { label: competitive.leetcode.label, value: competitive.leetcode.rating, href: site.socials.leetcode },
    { label: competitive.codechef.label, value: competitive.codechef.rating, href: site.socials.codechef },
  ];

  return (
    <div className="rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur-sm">
      <h3 className="font-mono text-xs tracking-widest text-faint uppercase">
        Competitive programming
      </h3>
      <dl className="mt-4 space-y-2.5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-baseline justify-between gap-3 text-sm">
            <dt>
              <ExternalLink href={r.href}>{r.label}</ExternalLink>
            </dt>
            <dd className="font-mono text-text tabular-nums">{r.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 border-t border-border pt-4 text-sm text-muted">
        <span className="font-mono text-text">{competitive.problems}</span> problems solved across{" "}
        <span className="font-mono text-text">{competitive.contests}</span> rated contests.
      </p>
    </div>
  );
}
