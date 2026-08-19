import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

/** A headline number plus where it can be independently verified. */
export type Metric = {
  label: string;
  value: string;
  /** Shown as a tooltip so every figure names its own evidence. */
  source?: string;
};

export type CaseStudyMeta = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  role: string;
  period: string;
  stack: string[];
  repo?: string;
  demo?: string;
  /** Overrides the demo button label, e.g. "View on the App Store". */
  demoLabel?: string;
  /** Honest project state, rendered as a badge. */
  status:
    | "Deployed"
    | "In production"
    | "Engine complete"
    | "In progress"
    | "Redeploying"
    | "Archived";
  order: number;
  metrics?: Metric[];
  /** Optional caveat rendered above the body, e.g. unmeasured benchmarks. */
  disclosure?: string;
};

export type WritingMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  draft?: boolean;
};

export type Doc<T> = { meta: T; body: string };

function readCollection(dir: string) {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), "utf8");
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.mdx$/, ""), data, content };
    });
}

export function getCaseStudies(): Doc<CaseStudyMeta>[] {
  return readCollection("work")
    .map(({ slug, data, content }) => ({
      meta: { ...(data as Omit<CaseStudyMeta, "slug">), slug },
      body: content,
    }))
    .sort((a, b) => a.meta.order - b.meta.order);
}

export function getCaseStudy(slug: string): Doc<CaseStudyMeta> | undefined {
  return getCaseStudies().find((d) => d.meta.slug === slug);
}

/** Rough reading time so the estimate never drifts from the actual body. */
function estimateReadingTime(body: string) {
  const words = body.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

export function getWriting(): Doc<WritingMeta>[] {
  return readCollection("writing")
    .map(({ slug, data, content }) => ({
      meta: {
        ...(data as Omit<WritingMeta, "slug" | "readingTime">),
        slug,
        readingTime: estimateReadingTime(content),
      },
      body: content,
    }))
    .filter((d) => !d.meta.draft)
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}

export function getWritingPost(slug: string): Doc<WritingMeta> | undefined {
  return getWriting().find((d) => d.meta.slug === slug);
}
