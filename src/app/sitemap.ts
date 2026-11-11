import type { MetadataRoute } from "next";
import { getCaseStudies, getWriting } from "@/lib/content";
import { canonicalUrl } from "@/lib/seo";

const FALLBACK_MODIFIED = new Date("2026-11-11");

export default function sitemap(): MetadataRoute.Sitemap {
  const studies = getCaseStudies();
  const posts = getWriting();

  const work = studies.map((d) => ({
    url: canonicalUrl(`/work/${d.meta.slug}`),
    lastModified: new Date(d.meta.updated ?? d.meta.published ?? FALLBACK_MODIFIED),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const writing = posts.map((d) => ({
    url: canonicalUrl(`/writing/${d.meta.slug}`),
    lastModified: new Date(d.meta.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const latestContentDate = [...work, ...writing].reduce(
    (latest, item) => (item.lastModified > latest ? item.lastModified : latest),
    FALLBACK_MODIFIED,
  );

  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/work", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/writing", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/resume", priority: 0.8, changeFrequency: "monthly" as const },
  ].map(({ path, priority, changeFrequency }) => ({
    url: canonicalUrl(path),
    lastModified: latestContentDate,
    changeFrequency,
    priority,
  }));

  return [...staticRoutes, ...work, ...writing];
}
