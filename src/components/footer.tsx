import { site } from "@/lib/site";
import { ExternalLink } from "./ui";

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <p className="text-sm font-medium text-text">Open to 2027 new-grad roles</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-1 inline-block font-mono text-sm text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
            >
              {site.email}
            </a>
          </div>
          <nav aria-label="Elsewhere" className="flex flex-col gap-1.5 text-sm">
            <ExternalLink href={site.socials.github}>GitHub</ExternalLink>
            <ExternalLink href={site.socials.linkedin}>LinkedIn</ExternalLink>
            <ExternalLink href={site.socials.leetcode}>LeetCode</ExternalLink>
            <ExternalLink href={site.socials.codechef}>CodeChef</ExternalLink>
          </nav>
        </div>
        <p className="mt-10 font-mono text-xs text-faint">
          © {YEAR} {site.name} · {site.location} · Built with Next.js, deployed on Vercel
        </p>
      </div>
    </footer>
  );
}
