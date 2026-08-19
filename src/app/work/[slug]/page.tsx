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

        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
          {meta.title}
        </h1>
        <p className="mt-1.5 text-base text-accent">{meta.tagline}</p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">{meta.summary}</p>

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
                className="inline-flex items-center gap-2 rounded-md border border-border-strong px-3 py-1.5 text-sm text-muted transition-colors hover:border-faint hover:text-text"
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
                className="inline-flex items-center gap-2 rounded-md bg-text px-3 py-1.5 text-sm font-medium text-bg transition-colors hover:bg-white"
              >
                <ExternalIcon className="size-4" aria-hidden />
                Live demo
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
          <aside className="mt-8 rounded-lg border border-border-strong bg-raised p-4">
            <p className="font-mono text-xs tracking-widest text-faint uppercase">Disclosure</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{meta.disclosure}</p>
          </aside>
        ) : null}
      </header>

      <hr className="my-10 border-border" />

      <Mdx source={doc.body} />
    </article>
  );
}
