import { ArrowRight, Download, Mail } from "lucide-react";
import { site } from "@/lib/site";
import { ButtonLink } from "./ui";
import { Reveal } from "./motion";

const FACTS = [
  { k: "Focus", v: "Applied ML · Agentic AI" },
  { k: "Foundation", v: "Core CS · DSA" },
  { k: "Currently", v: "iOS lead, shipped app" },
  { k: "Graduating", v: "May 2027" },
];

export function Hero({ primaryHref }: { primaryHref: string }) {
  return (
    <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-24">
      <Reveal>
        <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 px-3 py-1.5 backdrop-blur-sm">
          <span
            className="animate-pulse-dot size-1.5 rounded-full bg-accent-3"
            aria-hidden
          />
          <span className="font-mono text-xs tracking-widest uppercase">
            <span className="sheen-text">Open to 2027 new-grad roles</span>
          </span>
        </p>
      </Reveal>

      <Reveal delay={80}>
        <h1 className="grad-text mt-7 text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.03em]">
          {site.name}
        </h1>
      </Reveal>

      <Reveal delay={150}>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          Final-year B.Tech CSE at{" "}
          <span className="text-text">IIIT Pune</span>. I build applied ML systems on a core-CS
          foundation, and I&apos;m going deep on{" "}
          <span className="grad-accent-text font-medium">agentic AI</span> by building evaluation
          infrastructure for coding agents.
        </p>
      </Reveal>

      <Reveal delay={220}>
        <div className="mt-9 flex flex-wrap items-center gap-2.5">
          <ButtonLink href={primaryHref} variant="primary">
            Read a case study
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
          <ButtonLink href={site.resumePath} external>
            <Download className="size-4" aria-hidden />
            Résumé
          </ButtonLink>
          <ButtonLink href={`mailto:${site.email}`} external>
            <Mail className="size-4" aria-hidden />
            Email
          </ButtonLink>
        </div>
      </Reveal>

      <Reveal delay={300}>
        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border/60 sm:grid-cols-4">
          {FACTS.map((f) => (
            <div key={f.k} className="bg-surface/70 px-4 py-3.5 backdrop-blur-sm">
              <dt className="font-mono text-[0.6875rem] tracking-widest text-faint uppercase">
                {f.k}
              </dt>
              <dd className="mt-1 text-sm text-text">{f.v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
