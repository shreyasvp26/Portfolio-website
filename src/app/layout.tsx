import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CommandPalette, type PaletteItem } from "@/components/command-palette";
import { getCaseStudies, getWriting } from "@/lib/content";
import { site } from "@/lib/site";

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
  const work = getCaseStudies().map((d) => ({
    group: "Case studies",
    label: d.meta.title,
    hint: d.meta.status,
    href: `/work/${d.meta.slug}`,
    icon: "work" as const,
  }));

  const writing = getWriting().map((d) => ({
    group: "Writing",
    label: d.meta.title,
    hint: d.meta.readingTime,
    href: `/writing/${d.meta.slug}`,
    icon: "writing" as const,
  }));

  return [
    { group: "Pages", label: "Home", href: "/" },
    { group: "Pages", label: "All work", href: "/work", icon: "work" },
    { group: "Pages", label: "Writing", href: "/writing", icon: "writing" },
    { group: "Pages", label: "About", href: "/about" },
    { group: "Pages", label: "Résumé", href: "/resume", icon: "resume" },
    ...work,
    ...writing,
    {
      group: "Elsewhere",
      label: "GitHub",
      hint: site.handle,
      href: site.socials.github,
      external: true,
      icon: "github",
    },
    {
      group: "Elsewhere",
      label: "LinkedIn",
      href: site.socials.linkedin,
      external: true,
      icon: "linkedin",
    },
    {
      group: "Elsewhere",
      label: "Email me",
      hint: site.email,
      href: `mailto:${site.email}`,
      external: true,
      icon: "mail",
    },
  ];
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-text focus:px-3 focus:py-2 focus:text-sm focus:text-bg"
        >
          Skip to content
        </a>
        <Nav name={site.name} />
        <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-5 sm:px-6">
          {children}
        </main>
        <Footer />
        <CommandPalette items={paletteItems()} />
      </body>
    </html>
  );
}
