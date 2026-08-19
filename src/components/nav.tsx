"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PaletteTrigger } from "./command-palette";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Résumé" },
];

export function Nav({ name }: { name: string }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-3xl items-center gap-4 px-5 sm:px-6">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight text-text transition-opacity hover:opacity-70"
        >
          {name}
        </Link>
        <ul className="ml-auto flex items-center gap-1 sm:gap-2">
          {LINKS.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-md px-2 py-1.5 text-sm transition-colors ${
                    active ? "text-text" : "text-faint hover:text-muted"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="hidden sm:block">
          <PaletteTrigger />
        </div>
      </nav>
    </header>
  );
}
