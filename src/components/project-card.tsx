import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseStudyMeta } from "@/lib/content";
import type { SideProject } from "@/lib/site";
import { ExternalLink, StatusBadge, Tag } from "./ui";
import { SpotlightCard } from "./motion";

export function CaseStudyCard({ meta, index }: { meta: CaseStudyMeta; index?: number }) {
  return (
    <SpotlightCard>
      <Link href={`/work/${meta.slug}`} className="block p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {index != null ? (
              <span className="font-mono text-xs text-faint">
                {String(index).padStart(2, "0")}
              </span>
            ) : null}
            <h3 className="mt-1 text-xl font-semibold tracking-[-0.015em] text-text transition-colors group-hover:text-white">
              {meta.title}
            </h3>
            <p className="grad-accent-text mt-1 text-sm font-medium">{meta.tagline}</p>
          </div>
          <StatusBadge status={meta.status} />
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{meta.summary}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {meta.stack.slice(0, 6).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>

        <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text">
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            Read the case study
          </span>
          <ArrowRight
            className="size-3.5 text-accent transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden
          />
        </p>
      </Link>
    </SpotlightCard>
  );
}

export function SideProjectRow({ project }: { project: SideProject }) {
  return (
    <li className="group border-t border-border py-5 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-sm font-semibold text-text">{project.name}</h3>
        <div className="flex gap-4 text-sm">
          <ExternalLink href={project.repo}>Code</ExternalLink>
          {project.demo ? <ExternalLink href={project.demo}>Demo</ExternalLink> : null}
        </div>
      </div>
      <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted">{project.blurb}</p>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>
    </li>
  );
}
