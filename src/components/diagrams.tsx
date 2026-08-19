import type { ReactNode } from "react";

const C = {
  stroke: "#2b2f36",
  fill: "#14161a",
  text: "#e9eaec",
  sub: "#9aa0a8",
  accent: "#38bdf8",
  accentFill: "rgba(56,189,248,0.07)",
};

function Defs() {
  return (
    <defs>
      <marker id="arw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill={C.sub} />
      </marker>
    </defs>
  );
}

function Frame({ viewBox, children }: { viewBox: string; children: ReactNode }) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      className="h-auto w-full min-w-[560px]"
      fontFamily="var(--font-geist-mono), ui-monospace, monospace"
    >
      <Defs />
      {children}
    </svg>
  );
}

function Box({
  x,
  y,
  w,
  h = 46,
  title,
  sub,
  accent = false,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  title: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={7}
        fill={accent ? C.accentFill : C.fill}
        stroke={accent ? C.accent : C.stroke}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 4}
        textAnchor="middle"
        fontSize="12"
        fill={accent ? C.accent : C.text}
      >
        {title}
      </text>
      {sub ? (
        <text x={x + w / 2} y={y + h / 2 + 13} textAnchor="middle" fontSize="10.5" fill={C.sub}>
          {sub}
        </text>
      ) : null}
    </g>
  );
}

function Arrow({
  d,
  label,
  labelX,
  labelY,
  dashed = false,
}: {
  d: string;
  label?: string;
  labelX?: number;
  labelY?: number;
  dashed?: boolean;
}) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={C.sub}
        strokeWidth="1.2"
        strokeDasharray={dashed ? "4 3" : undefined}
        markerEnd="url(#arw)"
      />
      {label && labelX != null && labelY != null ? (
        <text x={labelX} y={labelY} textAnchor="middle" fontSize="10" fill={C.sub}>
          {label}
        </text>
      ) : null}
    </g>
  );
}

function EvalForgeLayers() {
  return (
    <Frame viewBox="0 0 660 348">
      <title>EvalForge layered architecture</title>
      <Box x={20} y={16} w={296} title="apps/web" sub="Next.js — renderer over the API" />
      <Box x={344} y={16} w={296} title="apps/api" sub="FastAPI control plane" />
      <Arrow d="M 316 39 L 340 39" />
      <Box x={20} y={104} w={620} title="application" sub="use cases · unit of work · ports (auth, queue, events)" />
      <Arrow d="M 492 62 L 492 100" />
      <Box
        x={20}
        y={192}
        w={620}
        title="domain"
        sub="aggregates · invariants · domain events — zero outbound imports"
        accent
      />
      <Arrow d="M 330 150 L 330 188" />
      <Box x={20} y={282} w={620} title="infrastructure" sub="Postgres · queue · event bus · composition root" />
      <Arrow d="M 140 280 L 140 152" dashed label="implements ports" labelX={218} labelY={222} />
    </Frame>
  );
}

function EvalForgeRun() {
  return (
    <Frame viewBox="0 0 660 320">
      <title>EvalForge evaluation run lifecycle</title>
      <Box x={20} y={16} w={186} title="Eval case" sub="versioned + pinned" />
      <Box x={236} y={16} w={166} title="Queue" sub="durable job" />
      <Box x={432} y={16} w={208} title="Execution worker" sub="lifecycle + events" />
      <Arrow d="M 206 39 L 232 39" />
      <Arrow d="M 402 39 L 428 39" />

      <Box x={432} y={110} w={208} h={52} title="Docker sandbox" sub="agent adapter, no network" accent />
      <Arrow d="M 536 62 L 536 106" />

      <Box x={236} y={110} w={166} h={52} title="Artifacts" sub="diff · logs · trace" />
      <Arrow d="M 428 136 L 406 136" />

      <Box x={20} y={214} w={296} title="Objective graders" sub="tests, build, static checks" />
      <Box x={344} y={214} w={296} title="Rubric judge" sub="frontier model + rubric" />
      <Arrow d="M 300 166 L 220 210" />
      <Arrow d="M 340 166 L 460 210" />

      <Box x={190} y={278} w={280} h={34} title="Domain score — comparable across runs" accent />
      <Arrow d="M 168 260 L 260 274" />
      <Arrow d="M 492 260 L 400 274" />
    </Frame>
  );
}

function OncoScan() {
  return (
    <Frame viewBox="0 0 660 300">
      <title>OncoScan inference path</title>
      <Box x={20} y={16} w={280} title="React SPA" sub="Vercel · image + age/sex form" />
      <Box x={360} y={16} w={280} title="FastAPI POST /predict" sub="size + type validation" />
      <Arrow d="M 300 39 L 356 39" label="multipart" labelX={328} labelY={30} />

      <Box x={20} y={110} w={280} h={52} title="EfficientNet-B0" sub="dermoscopy image → 1280-d" accent />
      <Box x={360} y={110} w={280} h={52} title="Metadata MLP" sub="age, sex → 512 → 128-d" />
      <Arrow d="M 470 62 L 300 106" />
      <Arrow d="M 510 62 L 510 106" />

      <Box x={130} y={196} w={400} title="Fusion classifier" sub="concat 1408-d → single sigmoid logit" />
      <Arrow d="M 200 164 L 280 192" />
      <Arrow d="M 460 164 L 380 192" />

      <Box x={130} y={262} w={400} h={34} title="Threshold → benign / malignant + screening disclaimer" />
      <Arrow d="M 330 242 L 330 258" />
    </Frame>
  );
}

function SsmRelease() {
  return (
    <Frame viewBox="0 0 660 240">
      <title>iOS release pipeline</title>
      <Box x={20} y={20} w={190} title="Merged change" sub="iOS + Android parity" />
      <Box x={240} y={20} w={190} title="Archive & upload" sub="App Store Connect" />
      <Box x={460} y={20} w={180} title="TestFlight" sub="internal → external" />
      <Arrow d="M 210 43 L 236 43" />
      <Arrow d="M 430 43 L 456 43" />

      <Box x={460} y={120} w={180} title="App Store review" sub="metadata + privacy" />
      <Arrow d="M 550 66 L 550 116" />

      <Box x={240} y={120} w={190} title="Phased release" sub="crash + auth monitoring" accent />
      <Arrow d="M 456 143 L 434 143" />

      <Box x={20} y={120} w={190} title="Hotfix loop" sub="expedited review if needed" />
      <Arrow d="M 236 143 L 214 143" />
      <Arrow d="M 115 118 L 115 66 L 240 66" dashed label="regression found" labelX={175} labelY={58} />
    </Frame>
  );
}

export const DIAGRAMS = {
  "evalforge-layers": EvalForgeLayers,
  "evalforge-run": EvalForgeRun,
  oncoscan: OncoScan,
  "ssm-release": SsmRelease,
} as const;

export type DiagramName = keyof typeof DIAGRAMS;
