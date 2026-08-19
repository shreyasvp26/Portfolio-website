import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { getCaseStudies, getWriting } from "@/lib/content";
import { education, experience, sideProjects, site, skills } from "@/lib/site";
import { CaseStudyCard, SideProjectRow } from "@/components/project-card";
import { CompetitivePanel, GithubPanel } from "@/components/signals";
import { ButtonLink, ExternalLink, Section } from "@/components/ui";

export default function Home() {
  const work = getCaseStudies();
  const posts = getWriting().slice(0, 3);

  return (
    <>
      {/* Hero — name, precise positioning, primary CTA, all above the fold. */}
      <section className="animate-fade-up py-16 sm:py-24">
        <p className="font-mono text-xs tracking-widest text-accent uppercase">
          {site.location} · Available for 2027 new-grad roles
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          {site.name}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {site.positioning}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <ButtonLink href={`/work/${work[0]?.meta.slug ?? ""}`} variant="primary">
            Read a case study
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
          <ButtonLink href={site.resumePath} external>
            <Download className="size-4" aria-hidden />
            Résumé
          </ButtonLink>
          <ButtonLink href={`mailto:${site.email}`} external>
            <Mail className="size-4" aria-hidden />
            Email
          </ButtonLink>
        </div>
      </section>

      <Section
        id="work"
        label="Selected work"
        title="Three projects, written up properly"
        action={
          <Link
            href="/work"
            className="text-sm text-muted underline decoration-border-strong underline-offset-4 hover:text-text hover:decoration-accent"
          >
            All work
          </Link>
        }
      >
        <div className="space-y-4">
          {work.map((d) => (
            <CaseStudyCard key={d.meta.slug} meta={d.meta} />
          ))}
        </div>
      </Section>

      <Section
        label="Writing"
        title="Notes on things I got wrong first"
        action={
          <Link
            href="/writing"
            className="text-sm text-muted underline decoration-border-strong underline-offset-4 hover:text-text hover:decoration-accent"
          >
            All posts
          </Link>
        }
      >
        <ul className="divide-y divide-border">
          {posts.map((p) => (
            <li key={p.meta.slug} className="py-4 first:pt-0 last:pb-0">
              <Link href={`/writing/${p.meta.slug}`} className="group block">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-sm font-semibold text-text group-hover:text-accent">
                    {p.meta.title}
                  </h3>
                  <span className="font-mono text-xs text-faint">{p.meta.readingTime}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted">{p.meta.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section label="Signals" title="Verifiable, not self-reported">
        <div className="grid gap-4 sm:grid-cols-2">
          <GithubPanel />
          <CompetitivePanel />
        </div>
      </Section>

      <Section label="Also built" title="Supporting work">
        <ul>
          {sideProjects.map((p) => (
            <SideProjectRow key={p.name} project={p} />
          ))}
        </ul>
      </Section>

      <Section
        label="Experience"
        title="Where I've worked"
        action={
          <ExternalLink href={site.resumePath} className="text-sm">
            Full résumé (PDF)
          </ExternalLink>
        }
      >
        <ul className="space-y-7">
          {experience.map((job) => (
            <li key={`${job.company}-${job.period}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-sm font-semibold text-text">
                  {job.title} · <span className="font-normal text-muted">{job.company}</span>
                </h3>
                <span className="font-mono text-xs text-faint">{job.period}</span>
              </div>
              <p className="mt-0.5 text-xs text-faint">{job.location}</p>
              <ul className="mt-2 space-y-1.5">
                {job.points.map((pt) => (
                  <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-border-strong" aria-hidden />
                    {pt}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="mt-10 border-t border-border pt-7">
          <h3 className="font-mono text-xs tracking-widest text-faint uppercase">Education</h3>
          <ul className="mt-4 space-y-4">
            {education.map((e) => (
              <li key={e.institution}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="text-sm font-medium text-text">{e.institution}</p>
                  <span className="font-mono text-xs text-faint">{e.period}</span>
                </div>
                <p className="text-sm text-muted">
                  {e.qualification} · {e.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section label="Toolkit" title="What I reach for">
        <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group.label}>
              <dt className="font-mono text-xs tracking-wider text-faint uppercase">
                {group.label}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted">
                {group.items.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-7 text-sm text-faint">
          Deliberately listed without proficiency percentages — the case studies are the evidence.
        </p>
      </Section>
    </>
  );
}
