"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PaletteTrigger } from "./command-palette";
import { ScrollProgress } from "./motion";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Résumé" },
];

export function Nav({ name }: { name: string }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-5xl items-center gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-mono text-sm font-medium tracking-tight text-text"
        >
          <span
            className="size-2 rounded-full bg-gradient-to-br from-accent-3 via-accent to-accent-2 transition-transform duration-300 group-hover:scale-125"
            aria-hidden
          />
          {name}
        </Link>

        <ul className="ml-auto flex items-center gap-0.5 sm:gap-1">
          {LINKS.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                    active ? "text-text" : "text-faint hover:text-muted"
                  }`}
                >
                  {label}
                  {active ? (
                    <span
                      aria-hidden
                      className="absolute inset-x-2 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden sm:block">
          <PaletteTrigger />
        </div>
      </nav>
      <ScrollProgress />
    </header>
  );
}
