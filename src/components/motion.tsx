"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

const HIDDEN = ["opacity-0", "translate-y-5"];

/**
 * Fades and lifts its children into view once, the first time they're scrolled
 * to. Visibility is toggled on the DOM node rather than through state, so no
 * re-render is needed and the browser can keep the work on the compositor.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.remove(...HIDDEN);

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          io.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`translate-y-5 opacity-0 transition-[opacity,transform] duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Card surface with a cursor-following highlight. The pointer position is
 * written to CSS variables so the glow is painted by the compositor.
 */
export function SpotlightCard({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-surface/70 backdrop-blur-sm transition-colors duration-300 hover:border-border-strong ${className}`}
      style={style}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 0%), rgba(56,189,248,0.10), transparent 70%)",
        }}
      />
      {/* Gradient hairline along the top edge, brightening on hover. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(56,189,248,0.55), rgba(167,139,250,0.45), transparent)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/** Thin gradient bar at the top of the viewport tracking scroll depth. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-px origin-left"
      style={{
        transform: "scaleX(0)",
        background:
          "linear-gradient(to right, var(--color-accent-3), var(--color-accent), var(--color-accent-2))",
      }}
    />
  );
}
