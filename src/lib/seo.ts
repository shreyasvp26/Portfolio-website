import type { Metadata } from "next";
import type { CaseStudyMeta, WritingMeta } from "./content";
import { site, skills } from "./site";

export const PERSON_ID = `${site.url}/#person`;
export const WEBSITE_ID = `${site.url}/#website`;

export function canonicalUrl(path: string): string {
  if (!path || path === "/") return site.url;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export type PageMetadataInput = {
  title?: string;
  absoluteTitle?: string;
  description: string;
  path: string;
  type?: "website" | "profile" | "article";
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  ogImage?: string;
};

export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
  type = "website",
  keywords,
  publishedTime,
  modifiedTime,
  authors,
  tags,
  ogImage,
}: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ?? (title ? `${title} · ${site.name}` : `${site.name} — ${site.role}`);
  const canonical = path === "/" ? "/" : path;
  const imageUrl = ogImage ?? "/opengraph-image";

  return {
    ...(absoluteTitle
      ? { title: { absolute: absoluteTitle } }
      : title
        ? { title }
        : {}),
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical,
      types: {
        "text/plain": "/llms.txt",
      },
    },
    openGraph: {
      type,
      siteName: site.name,
      locale: "en_US",
      title: fullTitle,
      description,
      url: canonical,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(type === "article"
        ? {
            ...(publishedTime ? { publishedTime } : {}),
            ...(modifiedTime ? { modifiedTime } : {}),
            ...(authors?.length ? { authors } : {}),
            ...(tags?.length ? { tags } : {}),
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}

export function siteJsonLd() {
  const allSkills = skills.flatMap((group) => group.items);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: site.name,
        alternateName: site.handle,
        url: site.url,
        email: site.email,
        jobTitle: "Software Engineer & Computer Science Student",
        description: site.positioning,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Indian Institute of Information Technology, Pune",
          alternateName: "IIIT Pune",
        },
        worksFor: {
          "@type": "Organization",
          name: "Shreepad Seva Mandal",
        },
        knowsAbout: Array.from(new Set([...site.interests, ...allSkills])),
        sameAs: [
          site.socials.github,
          site.socials.linkedin,
          site.socials.leetcode,
          site.socials.codechef,
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: site.url,
        name: `${site.name} — ${site.role}`,
        description: site.positioning,
        inLanguage: "en",
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
      },
    ],
  };
}

function breadcrumbList(id: string, items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#webpage`,
        url: site.url,
        name: `${site.name} — ${site.role}`,
        description: site.positioning,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
        about: { "@id": PERSON_ID },
      },
    ],
  };
}

export function aboutJsonLd(description: string) {
  const url = canonicalUrl("/about");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${url}#webpage`,
        url,
        name: `About · ${site.name}`,
        description,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      breadcrumbList(`${url}#breadcrumb`, [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    ],
  };
}

export function resumeJsonLd(description: string) {
  const url = canonicalUrl("/resume");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#webpage`,
        url,
        name: `Résumé · ${site.name}`,
        description,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      breadcrumbList(`${url}#breadcrumb`, [
        { name: "Home", path: "/" },
        { name: "Résumé", path: "/resume" },
      ]),
    ],
  };
}

export function workIndexJsonLd(description: string, studies: CaseStudyMeta[]) {
  const url = canonicalUrl("/work");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: `Work · ${site.name}`,
        description,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": PERSON_ID },
        mainEntity: { "@id": `${url}#list` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#list`,
        itemListElement: studies.map((study, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: study.title,
          url: canonicalUrl(`/work/${study.slug}`),
        })),
      },
      breadcrumbList(`${url}#breadcrumb`, [
        { name: "Home", path: "/" },
        { name: "Work", path: "/work" },
      ]),
    ],
  };
}

export function caseStudyJsonLd(meta: CaseStudyMeta) {
  const url = canonicalUrl(`/work/${meta.slug}`);
  const softwareId = `${url}#software`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${url}#article`,
        headline: `${meta.title} — ${meta.tagline}`,
        name: meta.title,
        description: meta.summary,
        url,
        mainEntityOfPage: url,
        image: canonicalUrl(`/work/${meta.slug}/opengraph-image`),
        inLanguage: "en",
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
        keywords: meta.stack.join(", "),
        ...(meta.published ? { datePublished: meta.published } : {}),
        ...(meta.updated ? { dateModified: meta.updated } : {}),
        about: { "@id": softwareId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": softwareId,
        name: meta.title,
        description: meta.summary,
        url: meta.demo ?? meta.repo ?? url,
        applicationCategory: meta.applicationCategory ?? "DeveloperApplication",
        operatingSystem: meta.operatingSystem ?? "Cross-platform",
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        author: { "@id": PERSON_ID },
        keywords: meta.stack.join(", "),
        ...(meta.repo ? { sameAs: meta.repo } : {}),
      },
      breadcrumbList(`${url}#breadcrumb`, [
        { name: "Home", path: "/" },
        { name: "Work", path: "/work" },
        { name: meta.title, path: `/work/${meta.slug}` },
      ]),
    ],
  };
}

export function writingIndexJsonLd(description: string, posts: WritingMeta[]) {
  const url = canonicalUrl("/writing");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: `Writing · ${site.name}`,
        description,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": PERSON_ID },
        mainEntity: { "@id": `${url}#list` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#list`,
        itemListElement: posts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: post.title,
          url: canonicalUrl(`/writing/${post.slug}`),
        })),
      },
      breadcrumbList(`${url}#breadcrumb`, [
        { name: "Home", path: "/" },
        { name: "Writing", path: "/writing" },
      ]),
    ],
  };
}

export function writingPostJsonLd(meta: WritingMeta) {
  const url = canonicalUrl(`/writing/${meta.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: meta.title,
        description: meta.description,
        datePublished: meta.date,
        dateModified: meta.date,
        url,
        mainEntityOfPage: url,
        image: canonicalUrl(`/writing/${meta.slug}/opengraph-image`),
        inLanguage: "en",
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
        keywords: meta.tags.join(", "),
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      breadcrumbList(`${url}#breadcrumb`, [
        { name: "Home", path: "/" },
        { name: "Writing", path: "/writing" },
        { name: meta.title, path: `/writing/${meta.slug}` },
      ]),
    ],
  };
}
