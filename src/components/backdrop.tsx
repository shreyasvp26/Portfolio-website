/**
 * Fixed decorative layers behind all content: three drifting colour fields,
 * a dot grid that fades out down the page, and a vignette to keep edges dark.
 */
export function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="aurora-blob animate-drift-a"
        style={{
          top: "-18rem",
          left: "-10rem",
          width: "46rem",
          height: "46rem",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.20) 0%, rgba(56,189,248,0.06) 45%, transparent 70%)",
        }}
      />
      <div
        className="aurora-blob animate-drift-b"
        style={{
          top: "-8rem",
          right: "-14rem",
          width: "40rem",
          height: "40rem",
          background:
            "radial-gradient(circle, rgba(167,139,250,0.18) 0%, rgba(167,139,250,0.05) 45%, transparent 70%)",
        }}
      />
      <div
        className="aurora-blob animate-drift-c"
        style={{
          top: "38rem",
          left: "18%",
          width: "38rem",
          height: "38rem",
          background:
            "radial-gradient(circle, rgba(45,212,191,0.13) 0%, rgba(45,212,191,0.04) 45%, transparent 70%)",
        }}
      />

      <div
        className="dot-grid absolute inset-x-0 top-0 h-[70rem] opacity-[0.35]"
        style={{
          maskImage: "linear-gradient(to bottom, black, transparent 75%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 75%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -10%, transparent 40%, rgba(5,5,10,0.65) 100%)",
        }}
      />
    </div>
  );
}
