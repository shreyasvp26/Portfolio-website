"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, FileText, Layers, Mail, PenLine, Search } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./brand-icons";

export const OPEN_PALETTE_EVENT = "open-command-palette";

export type PaletteItem = {
  group: string;
  label: string;
  hint?: string;
  href: string;
  external?: boolean;
  icon?: "work" | "writing" | "resume" | "github" | "linkedin" | "mail";
};

const ICONS = {
  work: Layers,
  writing: PenLine,
  resume: FileText,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: Mail,
} as const;

export function CommandPalette({ items }: { items: PaletteItem[] }) {
  const [open, setOpen] = useState(false);
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

  const select = useCallback(
    (item: PaletteItem) => {
      setOpen(false);
      if (item.external) {
        window.open(item.href, "_blank", "noreferrer,noopener");
      } else {
        router.push(item.href);
      }
    },
    [router],
  );

  const groups = [...new Set(items.map((i) => i.group))];

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Site navigation"
      className="fixed inset-0 z-50"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <div className="absolute top-[18vh] left-1/2 w-[min(92vw,34rem)] -translate-x-1/2 overflow-hidden rounded-xl border border-border-strong bg-surface shadow-2xl">
        <div className="flex items-center gap-2.5 border-b border-border px-4">
          <Search className="size-4 shrink-0 text-faint" aria-hidden />
          <Command.Input
            placeholder="Jump to a case study, post, or link…"
            className="w-full bg-transparent py-3.5 text-sm text-text placeholder:text-faint focus:outline-none"
          />
        </div>
        <Command.List className="max-h-[min(24rem,50vh)] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-8 text-center text-sm text-faint">
            Nothing matches that.
          </Command.Empty>
          {groups.map((group) => (
            <Command.Group
              key={group}
              heading={group}
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-faint [&_[cmdk-group-heading]]:uppercase"
            >
              {items
                .filter((i) => i.group === group)
                .map((item) => {
                  const Icon = item.icon ? ICONS[item.icon] : Layers;
                  return (
                    <Command.Item
                      key={`${item.group}-${item.href}-${item.label}`}
                      value={`${item.label} ${item.hint ?? ""}`}
                      onSelect={() => select(item)}
                      className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm text-muted data-[selected=true]:bg-raised data-[selected=true]:text-text"
                    >
                      <Icon className="size-4 shrink-0 text-faint" aria-hidden />
                      <span className="truncate">{item.label}</span>
                      {item.hint ? (
                        <span className="ml-auto truncate pl-3 text-xs text-faint">
                          {item.hint}
                        </span>
                      ) : null}
                      {item.external ? (
                        <ArrowUpRight className="size-3.5 shrink-0 text-faint" aria-hidden />
                      ) : null}
                    </Command.Item>
                  );
                })}
            </Command.Group>
          ))}
        </Command.List>
      </div>
    </Command.Dialog>
  );
}

export function PaletteTrigger() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
      className="inline-flex items-center gap-2 rounded-md border border-border px-2 py-1.5 text-xs text-faint transition-colors hover:border-border-strong hover:text-muted"
      aria-label="Open command palette"
    >
      <Search className="size-3.5" aria-hidden />
      <kbd className="font-mono">⌘K</kbd>
    </button>
  );
}
