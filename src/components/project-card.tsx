import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseStudyMeta } from "@/lib/content";
import type { SideProject } from "@/lib/site";
import { ExternalLink, StatusBadge, Tag } from "./ui";

export function CaseStudyCard({ meta }: { meta: CaseStudyMeta }) {
  return (
    <Link
      href={`/work/${meta.slug}`}
      className="group block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-strong"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold tracking-tight text-text">{meta.title}</h3>
          <p className="mt-0.5 text-sm text-accent">{meta.tagline}</p>
        </div>
        <StatusBadge status={meta.status} />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted">{meta.summary}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {meta.stack.slice(0, 6).map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>

      <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-text">
        Read the case study
        <ArrowRight
          className="size-3.5 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </p>
    </Link>
  );
}

export function SideProjectRow({ project }: { project: SideProject }) {
  return (
    <li className="border-t border-border py-5 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-sm font-semibold text-text">{project.name}</h3>
        <div className="flex gap-4 text-sm">
          <ExternalLink href={project.repo}>Code</ExternalLink>
          {project.demo ? <ExternalLink href={project.demo}>Demo</ExternalLink> : null}
        </div>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{project.blurb}</p>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>
    </li>
  );
}
