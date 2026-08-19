import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink as ExternalIcon } from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import { getCaseStudies, getCaseStudy } from "@/lib/content";
import { Mdx } from "@/components/mdx";
import { MetricStat, StatusBadge, Tag } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCaseStudies().map((d) => ({ slug: d.meta.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getCaseStudy(slug);
  if (!doc) return {};
  return {
    title: `${doc.meta.title} — ${doc.meta.tagline}`,
    description: doc.meta.summary,
    openGraph: { title: doc.meta.title, description: doc.meta.summary, type: "article" },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const doc = getCaseStudy(slug);
  if (!doc) notFound();

  const { meta } = doc;

  return (
    <article className="py-12 sm:py-16">
      <Link
        href="/work"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-faint transition-colors hover:text-muted"
      >
        <ArrowLeft className="size-3.5" aria-hidden />
        All work
      </Link>

      <header className="mt-7">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={meta.status} />
          <span className="font-mono text-xs text-faint">{meta.period}</span>
          <span className="font-mono text-xs text-faint">· {meta.role}</span>
        </div>

        <h1 className="grad-text mt-5 text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
          {meta.title}
        </h1>
        <p className="grad-accent-text mt-2 text-lg font-medium">{meta.tagline}</p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">{meta.summary}</p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {meta.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>

        {(meta.repo || meta.demo) && (
          <div className="mt-6 flex flex-wrap gap-2.5">
            {meta.repo ? (
              <a
                href={meta.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-lg border border-border-strong bg-surface/50 px-4 py-2 text-sm text-muted backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-text"
              >
                <GithubIcon className="size-4" />
                Source
              </a>
            ) : null}
            {meta.demo ? (
              <a
                href={meta.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent-3 via-accent to-accent-2 px-4 py-2 text-sm font-medium text-[#05050a] shadow-[0_6px_28px_-10px] shadow-accent/60 transition-shadow hover:shadow-[0_10px_36px_-10px] hover:shadow-accent/70"
              >
                <ExternalIcon className="size-4" aria-hidden />
                {meta.demoLabel ?? "Live demo"}
              </a>
            ) : null}
          </div>
        )}

        {meta.metrics?.length ? (
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {meta.metrics.map((m) => (
              <MetricStat key={m.label} {...m} />
            ))}
          </div>
        ) : null}

        {meta.disclosure ? (
          <aside className="grad-border mt-8 max-w-3xl rounded-xl p-5">
            <p className="grad-accent-text font-mono text-xs tracking-[0.18em] uppercase">
              Disclosure
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{meta.disclosure}</p>
          </aside>
        ) : null}
      </header>

      <hr className="grad-rule my-12" />

      <Mdx source={doc.body} />
    </article>
  );
}
