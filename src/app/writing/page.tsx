import type { Metadata } from "next";
import Link from "next/link";
import { getWriting } from "@/lib/content";
import { Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Technical posts on evaluation methodology, dataset leakage, agentic AI, and benchmarking discipline.",
};

const DATE_FMT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default function WritingIndex() {
  const posts = getWriting();

  return (
    <>
      <section className="animate-fade-up py-14 sm:py-20">
        <h1 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">Writing</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Mostly write-ups of things I initially got wrong — leaky benchmarks, noisy measurements, and
          what happens when you let coding agents near an architectural boundary.
        </p>
      </section>

      <ul className="border-t border-border">
        {posts.map((p) => (
          <li key={p.meta.slug} className="border-b border-border">
            <Link href={`/writing/${p.meta.slug}`} className="group block py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-base font-semibold tracking-tight text-text group-hover:text-accent">
                  {p.meta.title}
                </h2>
                <div className="flex shrink-0 gap-3 font-mono text-xs text-faint">
                  <time dateTime={p.meta.date}>{DATE_FMT.format(new Date(p.meta.date))}</time>
                  <span>{p.meta.readingTime}</span>
                </div>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                {p.meta.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.meta.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
