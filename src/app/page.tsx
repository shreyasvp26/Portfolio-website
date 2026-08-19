import Link from "next/link";
import { getCaseStudies, getWriting } from "@/lib/content";
import { education, experience, sideProjects, site, skills } from "@/lib/site";
import { CaseStudyCard, SideProjectRow } from "@/components/project-card";
import { CompetitivePanel, GithubPanel } from "@/components/signals";
import { Hero } from "@/components/hero";
import { Reveal, SpotlightCard } from "@/components/motion";
import { ExternalLink, Section } from "@/components/ui";

function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-muted underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
    >
      {children}
    </Link>
  );
}

export default function Home() {
  const work = getCaseStudies();
  const posts = getWriting().slice(0, 3);

  return (
    <>
      <Hero primaryHref={`/work/${work[0]?.meta.slug ?? ""}`} />

      <Section
        id="work"
        label="Selected work"
        title="Three projects, written up properly"
        action={<MoreLink href="/work">All work</MoreLink>}
      >
        <div className="space-y-5">
          {work.map((d, i) => (
            <Reveal key={d.meta.slug} delay={i * 90}>
              <CaseStudyCard meta={d.meta} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        label="Writing"
        title="Notes on things I got wrong first"
        action={<MoreLink href="/writing">All posts</MoreLink>}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.meta.slug} delay={i * 90}>
              <SpotlightCard className="h-full">
                <Link href={`/writing/${p.meta.slug}`} className="flex h-full flex-col p-5">
                  <span className="font-mono text-xs text-faint">{p.meta.readingTime}</span>
                  <h3 className="mt-2.5 text-base leading-snug font-semibold text-text transition-colors group-hover:text-white">
                    {p.meta.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.meta.description}</p>
                  <span className="mt-auto pt-4 font-mono text-xs text-accent">Read →</span>
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section label="Signals" title="Verifiable, not self-reported">
        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <GithubPanel />
          </Reveal>
          <Reveal delay={90}>
            <CompetitivePanel />
          </Reveal>
        </div>
      </Section>

      <Section label="Also built" title="Supporting work">
        <Reveal>
          <ul>
            {sideProjects.map((p) => (
              <SideProjectRow key={p.name} project={p} />
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section
        label="Experience"
        title="Where I've worked"
        action={<ExternalLink href={site.resumePath}>Full résumé (PDF)</ExternalLink>}
      >
        <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr]">
          <Reveal>
            <ul className="space-y-8">
              {experience.map((job) => (
                <li key={`${job.company}-${job.period}`} className="relative pl-5">
                  <span
                    aria-hidden
                    className="absolute top-1.5 left-0 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-accent/60 via-border to-transparent"
                  />
                  <span
                    aria-hidden
                    className={`absolute top-1.5 -left-[3px] size-[7px] rounded-full ${
                      job.current
                        ? "animate-pulse-dot bg-accent-3"
                        : "bg-border-strong"
                    }`}
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="text-sm font-semibold text-text">
                      {job.title} · <span className="font-normal text-muted">{job.company}</span>
                    </h3>
                    <span className="font-mono text-xs text-faint">{job.period}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-faint">{job.location}</p>
                  <ul className="mt-2.5 space-y-2">
                    {job.points.map((pt) => (
                      <li key={pt} className="text-sm leading-relaxed text-muted">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-xl border border-border bg-surface/50 p-5 backdrop-blur-sm">
              <h3 className="font-mono text-xs tracking-[0.18em] text-faint uppercase">Education</h3>
              <ul className="mt-4 space-y-5">
                {education.map((e) => (
                  <li key={e.institution}>
                    <p className="text-sm font-semibold text-text">{e.institution}</p>
                    <p className="mt-0.5 font-mono text-xs text-faint">{e.period}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {e.qualification} · {e.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section label="Toolkit" title="What I reach for">
        <Reveal>
          <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group) => (
              <div key={group.label}>
                <dt className="grad-accent-text font-mono text-xs tracking-[0.15em] uppercase">
                  {group.label}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">
                  {group.items.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-sm text-faint">
            Deliberately listed without proficiency percentages — the case studies are the evidence.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
