import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "./motion";

export function Section({
  id,
  label,
  title,
  action,
  children,
}: {
  id?: string;
  label: string;
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="py-14 sm:py-20">
      <hr className="grad-rule mb-10" />
      <Reveal>
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="grad-accent-text font-mono text-xs font-medium tracking-[0.18em] uppercase">
              {label}
            </p>
            {title ? (
              <h2 className="grad-text mt-2.5 text-2xl font-semibold tracking-[-0.02em] sm:text-[1.75rem]">
                {title}
              </h2>
            ) : null}
          </div>
          {action}
        </div>
      </Reveal>
      {children}
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-border bg-raised/80 px-1.5 py-0.5 font-mono text-xs text-muted transition-colors group-hover:border-border-strong">
      {children}
    </span>
  );
}

const STATUS_TONE: Record<string, string> = {
  Deployed: "border-accent-3/40 bg-accent-3/10 text-accent-3",
  "In production": "border-accent-3/40 bg-accent-3/10 text-accent-3",
  "Engine complete": "border-accent/40 bg-accent/10 text-accent",
  "In progress": "border-accent-2/40 bg-accent-2/10 text-accent-2",
  Redeploying: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  Archived: "border-border-strong bg-raised text-faint",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 font-mono text-xs whitespace-nowrap ${
        STATUS_TONE[status] ?? STATUS_TONE.Archived
      }`}
    >
      {status}
    </span>
  );
}

export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`group/l inline-flex items-center gap-1 text-muted transition-colors hover:text-accent ${className}`}
    >
      {children}
      <ArrowUpRight
        className="size-3.5 transition-transform group-hover/l:-translate-y-px group-hover/l:translate-x-px"
        aria-hidden
      />
    </a>
  );
}

export function ButtonLink({
  href,
  variant = "secondary",
  external,
  children,
}: {
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
  children: ReactNode;
}) {
  const base =
    "group/b relative inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-accent-3 via-accent to-accent-2 text-[#05050a] shadow-[0_6px_28px_-10px] shadow-accent/60 hover:shadow-[0_10px_36px_-10px] hover:shadow-accent/70"
      : "border border-border-strong bg-surface/50 text-muted backdrop-blur-sm hover:border-accent/50 hover:text-text";
  const cls = `${base} ${styles}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** A headline figure that carries its own provenance. */
export function MetricStat({
  label,
  value,
  source,
}: {
  label: string;
  value: string;
  source?: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-border bg-surface/60 p-4 backdrop-blur-sm"
      title={source}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(56,189,248,0.5), transparent)",
        }}
      />
      <p className="grad-accent-text font-mono text-xl font-medium tabular-nums">{value}</p>
      <p className="mt-1.5 text-xs leading-snug text-faint">{label}</p>
    </div>
  );
}
