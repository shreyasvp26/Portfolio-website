import { site } from "@/lib/site";
import { ExternalLink } from "./ui";

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative mt-auto">
      <hr className="grad-rule" />
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div>
            <p className="grad-text text-xl font-semibold tracking-[-0.02em]">
              Open to 2027 new-grad roles
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              Particularly interested in work where applied ML meets real infrastructure. The fastest
              way to reach me is email.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block font-mono text-sm text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
            >
              {site.email}
            </a>
          </div>
          <nav aria-label="Elsewhere" className="flex flex-col gap-2 text-sm">
            <p className="font-mono text-xs tracking-[0.18em] text-faint uppercase">Elsewhere</p>
            <ExternalLink href={site.socials.github}>GitHub</ExternalLink>
            <ExternalLink href={site.socials.linkedin}>LinkedIn</ExternalLink>
            <ExternalLink href={site.socials.leetcode}>LeetCode</ExternalLink>
            <ExternalLink href={site.socials.codechef}>CodeChef</ExternalLink>
          </nav>
        </div>
        <p className="mt-12 font-mono text-xs text-faint">
          © {YEAR} {site.name} · {site.location} · Built with Next.js, deployed on Vercel
        </p>
      </div>
    </footer>
  );
}
