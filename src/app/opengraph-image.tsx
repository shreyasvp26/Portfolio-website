import { renderOgCard } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return renderOgCard({
    eyebrow: "Software Engineer · IIIT Pune '27",
    title: site.name,
    subtitle: site.positioning,
    tags: ["Applied ML", "Backend Systems", "Python", "TypeScript", "FastAPI", "PyTorch"],
  });
}

