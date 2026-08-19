"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowUpRight,
  Code2,
  CornerDownLeft,
  FileText,
  Layers,
  Mail,
  PenLine,
  Search,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./brand-icons";

export const OPEN_PALETTE_EVENT = "open-command-palette";

export type PaletteItem = {
  group: string;
  label: string;
  hint?: string;
  href: string;
  external?: boolean;
  icon?: "work" | "writing" | "resume" | "github" | "linkedin" | "mail" | "code";
  /** Extra searchable terms — taglines, tech, synonyms. Never rendered. */
  keywords?: string[];
};

const ICONS = {
  work: Layers,
  writing: PenLine,
  resume: FileText,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: Mail,
  code: Code2,
} as const;

/**
 * Substring matching rather than cmdk's default subsequence scoring.
 * Subsequence matching is too loose for a list this small: "onco" would
 * otherwise match "Coding agents optimise ... ignore the invariant" on
 * scattered letters. Every whitespace-separated token must appear literally,
 * and earlier matches score higher.
 */
function filterItems(value: string, search: string, keywords?: string[]) {
  const query = search.trim().toLowerCase();
  if (!query) return 1;

  const haystack = [value, ...(keywords ?? [])].join(" ").toLowerCase();
  const tokens = query.split(/\s+/);
  let score = 0;

  for (const token of tokens) {
    const at = haystack.indexOf(token);
    if (at === -1) return 0;
    // Prefix hits rank above mid-word hits.
    score += at === 0 ? 1 : 1 / (1 + at * 0.04);
  }

  return score / tokens.length;
}

function Hint({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-border bg-raised px-1.5 py-0.5 font-mono text-[0.6875rem] text-faint">
      {children}
    </kbd>
  );
}

export function CommandPalette({ items }: { items: PaletteItem[] }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    // Reset so the next open starts clean rather than mid-query.
    setSearch("");
  }, []);

  const select = useCallback(
    (item: PaletteItem) => {
      close();
      if (item.external) {
        window.open(item.href, "_blank", "noreferrer,noopener");
      } else {
        router.push(item.href);
      }
    },
    [close, router],
  );

  const groups = [...new Set(items.map((i) => i.group))];

  return (
    <Command.Dialog
      open={open}
      onOpenChange={(next) => (next ? setOpen(true) : close())}
      label="Site search"
      shouldFilter
      filter={filterItems}
      className="fixed inset-0 z-50"
    >
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={close}
        aria-hidden
      />

      <div className="absolute top-[15vh] left-1/2 flex w-[min(94vw,36rem)] -translate-x-1/2 flex-col overflow-hidden rounded-2xl border border-border-strong bg-surface/95 shadow-2xl backdrop-blur-xl">
        <div
          aria-hidden
          className="h-px shrink-0"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(56,189,248,0.6), rgba(167,139,250,0.5), transparent)",
          }}
        />

        <div className="flex shrink-0 items-center gap-3 border-b border-border px-4">
          <Search className="size-4 shrink-0 text-faint" aria-hidden />
          <Command.Input
            value={search}
            onValueChange={setSearch}
            placeholder="Search case studies, posts, and links…"
            className="w-full bg-transparent py-4 text-sm text-text placeholder:text-faint focus:outline-none focus-visible:outline-none"
          />
          {search ? (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="shrink-0 font-mono text-xs text-faint transition-colors hover:text-muted"
            >
              clear
            </button>
          ) : null}
        </div>

        <Command.List className="max-h-[min(26rem,52vh)] overflow-y-auto overscroll-contain p-2">
          <Command.Empty className="px-3 py-10 text-center text-sm text-faint">
            No matches for{" "}
            <span className="font-mono text-muted">&ldquo;{search}&rdquo;</span>
          </Command.Empty>

          {groups.map((group) => (
            <Command.Group
              key={group}
              heading={group}
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.6875rem] [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-faint [&_[cmdk-group-heading]]:uppercase"
            >
              {items
                .filter((i) => i.group === group)
                .map((item) => {
                  const Icon = item.icon ? ICONS[item.icon] : Layers;
                  return (
                    <Command.Item
                      key={`${item.group}-${item.href}-${item.label}`}
                      value={item.label}
                      keywords={[item.hint ?? "", item.group, ...(item.keywords ?? [])]}
                      onSelect={() => select(item)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-muted data-[selected=true]:bg-raised data-[selected=true]:text-text"
                    >
                      <Icon className="size-4 shrink-0 text-faint" aria-hidden />
                      <span className="truncate">{item.label}</span>
                      {item.hint ? (
                        <span className="ml-auto shrink-0 truncate pl-3 font-mono text-xs text-faint">
                          {item.hint}
                        </span>
                      ) : null}
                      {item.external ? (
                        <ArrowUpRight
                          className={`size-3.5 shrink-0 text-faint ${item.hint ? "" : "ml-auto"}`}
                          aria-hidden
                        />
                      ) : null}
                    </Command.Item>
                  );
                })}
            </Command.Group>
          ))}
        </Command.List>

        <div className="flex shrink-0 items-center gap-4 border-t border-border bg-bg/40 px-4 py-2.5 text-xs text-faint">
          <span className="flex items-center gap-1.5">
            <Hint>↑</Hint>
            <Hint>↓</Hint>
            navigate
          </span>
          <span className="flex items-center gap-1.5">
            <Hint>
              <CornerDownLeft className="size-2.5" aria-hidden />
            </Hint>
            open
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <Hint>esc</Hint>
            close
          </span>
        </div>
      </div>
    </Command.Dialog>
  );
}

export function PaletteTrigger() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-2.5 py-1.5 text-xs text-faint backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-muted"
      aria-label="Open search"
    >
      <Search className="size-3.5" aria-hidden />
      <kbd className="font-mono">⌘K</kbd>
    </button>
  );
}
