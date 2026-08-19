import type { MetadataRoute } from "next";
import { getCaseStudies, getWriting } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/writing", "/about", "/resume"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: new Date(),
    priority: p === "" ? 1 : 0.8,
  }));

  const work = getCaseStudies().map((d) => ({
    url: `${site.url}/work/${d.meta.slug}`,
    lastModified: new Date(),
    priority: 0.9,
  }));

  const writing = getWriting().map((d) => ({
    url: `${site.url}/writing/${d.meta.slug}`,
    lastModified: new Date(d.meta.date),
    priority: 0.7,
  }));

  return [...staticRoutes, ...work, ...writing];
}
