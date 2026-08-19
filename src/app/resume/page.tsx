import type { Metadata } from "next";
import { Download } from "lucide-react";
import {
  achievements,
  competitive,
  education,
  experience,
  site,
  sideProjects,
  skills,
} from "@/lib/site";
import { getCaseStudies } from "@/lib/content";
import { ButtonLink, ExternalLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${site.name} — B.Tech CSE, IIIT Pune.`,
};

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="py-8">
      <hr className="grad-rule mb-7" />
      <h2 className="grad-accent-text font-mono text-xs tracking-[0.18em] uppercase">{label}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  const work = getCaseStudies();

  return (
    <div className="py-12 sm:py-16">
      <header className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="grad-text text-[clamp(2rem,5vw,3rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
            {site.name}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{site.positioning}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <a href={`mailto:${site.email}`} className="font-mono text-accent hover:underline">
              {site.email}
            </a>
            <ExternalLink href={site.socials.github}>GitHub</ExternalLink>
            <ExternalLink href={site.socials.linkedin}>LinkedIn</ExternalLink>
          </div>
        </div>
        <ButtonLink href={site.resumePath} variant="primary" external>
          <Download className="size-4" aria-hidden />
          Download PDF
        </ButtonLink>
      </header>

      <div className="mt-10">
        <Block label="Education">
          <ul className="space-y-4">
            {education.map((e) => (
              <li key={e.institution}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="text-sm font-semibold text-text">{e.institution}</p>
                  <span className="font-mono text-xs text-faint">{e.period}</span>
                </div>
                <p className="text-sm text-muted">
                  {e.qualification} · {e.detail}
                </p>
              </li>
            ))}
          </ul>
        </Block>

        <Block label="Experience">
          <ul className="space-y-6">
            {experience.map((job) => (
              <li key={`${job.company}-${job.period}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="text-sm font-semibold text-text">
                    {job.title} · <span className="font-normal text-muted">{job.company}</span>
                  </p>
                  <span className="font-mono text-xs text-faint">{job.period}</span>
                </div>
                <p className="mt-0.5 text-xs text-faint">{job.location}</p>
                <ul className="mt-2 space-y-1.5">
                  {job.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                      <span
                        className="mt-2 size-1 shrink-0 rounded-full bg-border-strong"
                        aria-hidden
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Block>

        <Block label="Projects">
          <ul className="space-y-5">
            {work.map((d) => (
              <li key={d.meta.slug}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="text-sm font-semibold text-text">{d.meta.title}</p>
                  <a
                    href={`/work/${d.meta.slug}`}
                    className="font-mono text-xs text-accent hover:underline"
                  >
                    case study →
                  </a>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted">{d.meta.summary}</p>
                <p className="mt-1.5 font-mono text-xs text-faint">{d.meta.stack.join(" · ")}</p>
              </li>
            ))}
            {sideProjects.slice(0, 2).map((p) => (
              <li key={p.name}>
                <p className="text-sm font-semibold text-text">{p.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{p.blurb}</p>
                <p className="mt-1.5 font-mono text-xs text-faint">{p.stack.join(" · ")}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block label="Technical skills">
          <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {skills.map((g) => (
              <div key={g.label}>
                <dt className="font-mono text-xs tracking-wider text-faint uppercase">{g.label}</dt>
                <dd className="mt-1 text-sm text-muted">{g.items.join(" · ")}</dd>
              </div>
            ))}
            <div>
              <dt className="font-mono text-xs tracking-wider text-faint uppercase">
                Competitive programming
              </dt>
              <dd className="mt-1 text-sm text-muted">
                LeetCode {competitive.leetcode.rating} · CodeChef {competitive.codechef.rating} ·{" "}
                {competitive.problems} problems · {competitive.contests} contests
              </dd>
            </div>
          </dl>
        </Block>

        <Block label="Achievements & responsibilities">
          <ul className="space-y-3.5">
            {achievements.map((a) => (
              <li key={a.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="text-sm font-medium text-text">{a.title}</p>
                  <span className="font-mono text-xs text-faint">{a.period}</span>
                </div>
                <p className="text-sm leading-relaxed text-muted">{a.detail}</p>
              </li>
            ))}
          </ul>
        </Block>
      </div>
    </div>
  );
}
