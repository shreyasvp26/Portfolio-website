import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const ALLOWED_BOTS = [
  // OpenAI
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  // Anthropic
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google
  "Googlebot",
  "Google-Extended",
  // Other legitimate search crawlers
  "Bingbot",
  "Applebot",
  "DuckDuckBot",
];

const DISALLOW_PRIVATE = ["/api/", "/admin/", "/private/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...ALLOWED_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW_PRIVATE,
      })),
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW_PRIVATE,
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
