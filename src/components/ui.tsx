import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

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
    <section id={id} className="border-t border-border py-14 sm:py-20">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="font-mono text-xs tracking-widest text-faint uppercase">{label}</p>
          {title ? (
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-text sm:text-2xl">
              {title}
            </h2>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded border border-border bg-raised px-1.5 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  );
}

const STATUS_TONE: Record<string, string> = {
  Deployed: "border-accent-dim/60 bg-accent/10 text-accent",
  "In production": "border-accent-dim/60 bg-accent/10 text-accent",
  "Engine complete": "border-amber-600/40 bg-amber-500/10 text-amber-400",
  "In progress": "border-amber-600/40 bg-amber-500/10 text-amber-400",
  Archived: "border-border-strong bg-raised text-faint",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 font-mono text-xs whitespace-nowrap ${
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
      className={`group inline-flex items-center gap-1 text-muted transition-colors hover:text-text ${className}`}
    >
      {children}
      <ArrowUpRight
        className="size-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
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
    "inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-text text-bg hover:bg-white"
      : "border border-border-strong text-muted hover:border-faint hover:text-text";
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
    <div className="rounded-lg border border-border bg-surface p-4" title={source}>
      <p className="font-mono text-lg text-text tabular-nums">{value}</p>
      <p className="mt-1 text-xs leading-snug text-faint">{label}</p>
    </div>
  );
}
