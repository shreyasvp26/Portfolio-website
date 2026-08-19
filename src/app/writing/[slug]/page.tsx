import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getWriting, getWritingPost } from "@/lib/content";
import { Mdx } from "@/components/mdx";
import { Tag } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

const DATE_FMT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function generateStaticParams() {
  return getWriting().map((d) => ({ slug: d.meta.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getWritingPost(slug);
  if (!doc) return {};
  return {
    title: doc.meta.title,
    description: doc.meta.description,
    openGraph: {
      title: doc.meta.title,
      description: doc.meta.description,
      type: "article",
      publishedTime: doc.meta.date,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const doc = getWritingPost(slug);
  if (!doc) notFound();

  return (
    <article className="py-12 sm:py-16">
      <Link
        href="/writing"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-faint transition-colors hover:text-muted"
      >
        <ArrowLeft className="size-3.5" aria-hidden />
        All writing
      </Link>

      <header className="mt-7">
        <div className="flex flex-wrap gap-3 font-mono text-xs text-faint">
          <time dateTime={doc.meta.date}>{DATE_FMT.format(new Date(doc.meta.date))}</time>
          <span>· {doc.meta.readingTime}</span>
        </div>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
          {doc.meta.title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          {doc.meta.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {doc.meta.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </header>

      <hr className="my-10 border-border" />

      <Mdx source={doc.body} />
    </article>
  );
}
