import { getWriting, getWritingPost } from "@/lib/content";
import { renderOgCard } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `Writing · ${site.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getWriting().map((d) => ({ slug: d.meta.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getWritingPost(slug);
  if (!doc) {
    return renderOgCard({
      eyebrow: "Technical Writing",
      title: site.name,
      subtitle: site.positioning,
    });
  }

  return renderOgCard({
    eyebrow: `Writing · ${doc.meta.date} · ${doc.meta.readingTime}`,
    title: doc.meta.title,
    subtitle: doc.meta.description,
    tags: doc.meta.tags,
  });
}

