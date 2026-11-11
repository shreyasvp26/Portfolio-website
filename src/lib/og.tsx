import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "./site";

const fontsDir = join(process.cwd(), "node_modules", "geist", "dist", "fonts");

const geistRegularPromise = readFile(join(fontsDir, "geist-sans", "Geist-Regular.ttf"));
const geistSemiBoldPromise = readFile(join(fontsDir, "geist-sans", "Geist-SemiBold.ttf"));
const geistMonoPromise = readFile(join(fontsDir, "geist-mono", "GeistMono-Regular.ttf"));

export const OG_SIZE = { width: 1200, height: 630 };

export async function renderOgCard({
  eyebrow,
  title,
  subtitle,
  tags,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  tags?: string[];
}) {
  const [geistRegular, geistSemiBold, geistMono] = await Promise.all([
    geistRegularPromise,
    geistSemiBoldPromise,
    geistMonoPromise,
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#05050a",
          backgroundImage:
            "radial-gradient(circle at 12% 15%, rgba(56,189,248,0.18), transparent 45%), radial-gradient(circle at 88% 85%, rgba(167,139,250,0.16), transparent 45%)",
          color: "#edeef2",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #2dd4bf, #38bdf8, #a78bfa)",
              }}
            />
            <span
              style={{
                fontFamily: "GeistMono",
                fontSize: "18px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#38bdf8",
              }}
            >
              {eyebrow}
            </span>
          </div>
          <span
            style={{
              fontFamily: "GeistMono",
              fontSize: "18px",
              color: "#6e7583",
            }}
          >
            {site.url.replace("https://", "")}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "1000px" }}>
          <div
            style={{
              fontSize: title.length > 42 ? "50px" : "64px",
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "24px",
              lineHeight: 1.45,
              color: "#a1a7b5",
            }}
          >
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {(tags ?? []).slice(0, 5).map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "GeistMono",
                  fontSize: "16px",
                  color: "#edeef2",
                  backgroundColor: "#12141c",
                  border: "1px solid #2b3040",
                  borderRadius: "8px",
                  padding: "6px 14px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span
            style={{
              fontFamily: "GeistMono",
              fontSize: "18px",
              color: "#a1a7b5",
            }}
          >
            {site.name} · IIIT Pune
          </span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Geist", data: geistRegular, style: "normal", weight: 400 },
        { name: "Geist", data: geistSemiBold, style: "normal", weight: 600 },
        { name: "GeistMono", data: geistMono, style: "normal", weight: 400 },
      ],
    },
  );
}
