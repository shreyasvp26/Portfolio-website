import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Backdrop } from "@/components/backdrop";
import { CommandPalette, type PaletteItem } from "@/components/command-palette";
import { getCaseStudies, getWriting } from "@/lib/content";
import { competitive, site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.positioning,
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.positioning,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.positioning,
  },
  robots: { index: true, follow: true },
};

function paletteItems(): PaletteItem[] {
  // Taglines, stacks, and tags become searchable keywords so a query like
  // "app store" or "pytorch" finds the right project.
  const work = getCaseStudies().map((d) => ({
    group: "Case studies",
    label: d.meta.title,
    hint: d.meta.status,
    href: `/work/${d.meta.slug}`,
    icon: "work" as const,
    keywords: [d.meta.tagline, d.meta.role, ...d.meta.stack],
  }));

  const writing = getWriting().map((d) => ({
    group: "Writing",
    label: d.meta.title,
    hint: d.meta.readingTime,
    href: `/writing/${d.meta.slug}`,
    icon: "writing" as const,
    keywords: [d.meta.description, ...d.meta.tags],
  }));

  return [
    { group: "Pages", label: "Home", href: "/", keywords: ["start", "index"] },
    {
      group: "Pages",
      label: "All work",
      href: "/work",
      icon: "work",
      keywords: ["projects", "case studies", "portfolio"],
    },
    {
      group: "Pages",
      label: "Writing",
      href: "/writing",
      icon: "writing",
      keywords: ["blog", "posts", "articles"],
    },
    { group: "Pages", label: "About", href: "/about", keywords: ["bio", "philosophy", "contact"] },
    {
      group: "Pages",
      label: "Résumé",
      href: "/resume",
      icon: "resume",
      keywords: ["resume", "cv", "experience", "education"],
    },
    ...work,
    ...writing,
    {
      group: "Elsewhere",
      label: "GitHub",
      hint: site.handle,
      href: site.socials.github,
      external: true,
      icon: "github",
      keywords: ["code", "repositories", "source"],
    },
    {
      group: "Elsewhere",
      label: "LinkedIn",
      href: site.socials.linkedin,
      external: true,
      icon: "linkedin",
      keywords: ["profile", "network"],
    },
    {
      group: "Elsewhere",
      label: "LeetCode",
      hint: `${competitive.leetcode.rating}`,
      href: site.socials.leetcode,
      external: true,
      icon: "code",
      keywords: ["competitive programming", "dsa", "algorithms", "rating"],
    },
    {
      group: "Elsewhere",
      label: "CodeChef",
      hint: `${competitive.codechef.rating}`,
      href: site.socials.codechef,
      external: true,
      icon: "code",
      keywords: ["competitive programming", "dsa", "contests", "rating"],
    },
    {
      group: "Elsewhere",
      label: "Download résumé (PDF)",
      href: site.resumePath,
      external: true,
      icon: "resume",
      keywords: ["resume", "cv", "pdf", "download"],
    },
    {
      group: "Elsewhere",
      label: "Email me",
      hint: site.email,
      href: `mailto:${site.email}`,
      external: true,
      icon: "mail",
      keywords: ["contact", "hire", "reach out"],
    },
  ];
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} h-full`}>
      <body className="grain flex min-h-full flex-col">
        <Backdrop />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-text focus:px-3 focus:py-2 focus:text-sm focus:text-bg"
        >
          Skip to content
        </a>
        <Nav name={site.name} />
        <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-5 sm:px-8">
          {children}
        </main>
        <Footer />
        <CommandPalette items={paletteItems()} />
      </body>
    </html>
  );
}
