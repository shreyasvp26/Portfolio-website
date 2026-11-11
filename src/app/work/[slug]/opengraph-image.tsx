import { getCaseStudies, getCaseStudy } from "@/lib/content";
import { renderOgCard } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `Case Study · ${site.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getCaseStudies().map((d) => ({ slug: d.meta.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getCaseStudy(slug);
  if (!doc) {
    return renderOgCard({
      eyebrow: "Case Study",
      title: site.name,
      subtitle: site.positioning,
    });
  }

  return renderOgCard({
    eyebrow: `Case Study · ${doc.meta.status}`,
    title: doc.meta.title,
    subtitle: `${doc.meta.tagline} — ${doc.meta.summary}`,
    tags: doc.meta.stack,
  });
}

