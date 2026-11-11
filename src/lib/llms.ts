import { getCaseStudies, getWriting } from "./content";
import {
  achievements,
  competitive,
  education,
  experience,
  sideProjects,
  site,
  skills,
} from "./site";

const TEMPORAL_MEMORY_ENGINE = {
  name: "Temporal Memory Engine",
  subtitle: "Bitemporal Episodic & Semantic Memory System for LLM Agents",
  repo: "https://github.com/shreyasvp26/Temporal-Memory-Engine",
  summary:
    "Bitemporal AI memory engine governed by a pure Python hexagonal domain core, a 10-state conflict reconciliation machine (S1–S10), and a 5-lane hybrid retrieval fusion orchestrator (Vector HNSW, BM25 full-text, 2-hop graph CTE, temporal proximity, and verbatim turns) with exponential temporal decay and point-in-time replay.",
  stack: [
    "Python 3.12",
    "FastAPI",
    "PostgreSQL 16",
    "pgvector",
    "AsyncPG",
    "Hexagonal Architecture",
    "pytest",
    "mypy",
    "ruff",
    "Docker",
  ],
  highlights: [
    "Tracks independent Valid Time (valid_from/valid_to) and System Time (recorded_at/invalidated_at) axes so updates never silently destroy historical state.",
    "4-phase out-of-transaction ingestion pipeline (Ingest Gate -> Postgres Transactional Outbox -> LLM/Entity extraction with zero DB locks -> Pure S1–S10 Conflict Resolver -> Atomic UnitOfWork commit).",
    "Multi-tenant Row-Level Security (RLS) in PostgreSQL and 9 architectural invariants verified by 450+ hermetic unit tests, Hypothesis property tests, and PostgreSQL integration tests.",
    "Evaluated on LongMemEval Stratified-30: 96.7% overall accuracy and a +62% relative Token F1 improvement on knowledge-update queries over vector-only retrieval.",
  ],
} as const;

function stripAttributes(raw: string, attr: string): string {
  const regex = new RegExp(`${attr}="([\\s\\S]*?)"`, "m");
  const match = raw.match(regex);
  return match ? match[1].trim() : "";
}

/** Converts custom MDX JSX components into plain Markdown for LLM consumption. */
export function mdxToPlainMarkdown(source: string): string {
  return source
    .replace(/<Diagram\b[\s\S]*?\/>/g, (tag) => {
      const name = stripAttributes(tag, "name");
      const caption = stripAttributes(tag, "caption");
      return caption ? `> **Architecture Diagram (${name}):** ${caption}` : "";
    })
    .replace(/<Decision\b[\s\S]*?\/>/g, (tag) => {
      const choice = stripAttributes(tag, "choice");
      const because = stripAttributes(tag, "because");
      const cost = stripAttributes(tag, "cost");
      return [
        `- **Decision:** ${choice}`,
        because ? `  - **Because:** ${because}` : "",
        cost ? `  - **Cost / Trade-off:** ${cost}` : "",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .replace(/<Callout\b([^>]*)>([\s\S]*?)<\/Callout>/g, (_full, attrs: string, inner: string) => {
      const title = stripAttributes(attrs, "title");
      const tone = stripAttributes(attrs, "tone") || "note";
      const body = inner
        .trim()
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n");
      return title ? `> **${title} (${tone}):**\n${body}` : body;
    })
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function buildLlmsTxt(): string {
  const studies = getCaseStudies();
  const posts = getWriting();

  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.positioning} Interested in ${site.interests.join(", ")}. Expected B.Tech graduation: May 2027.`,
    "",
    `Canonical website: ${site.url}`,
    `Full single-file LLM context: ${site.url}/llms-full.txt`,
    "",
    "## Profile & Education",
    "",
    `- **Name:** ${site.name} (\`@${site.handle}\`)`,
    `- **Location:** ${site.location}`,
    `- **Email:** ${site.email}`,
    `- **Interests:** ${site.interests.join(", ")}`,
    ...education.map(
      (e) => `- **${e.institution}** (${e.period}): ${e.qualification} (${e.detail})`,
    ),
    "",
    "## Experience",
    "",
    ...experience.flatMap((job) => [
      `- **${job.title}, ${job.company}** (${job.period} · ${job.location})`,
      ...job.points.map((pt) => `  - ${pt}`),
    ]),
    "",
    "## Featured Projects",
    "",
    ...studies.map((study) => {
      const displayTitle =
        study.meta.slug === "oncoscan"
          ? `${study.meta.title} (Skin Cancer Detection via Deep Transfer Learning)`
          : study.meta.title;
      const parts = [
        `[${displayTitle} — ${study.meta.tagline}](${site.url}/work/${study.meta.slug}): ${study.meta.summary}`,
        `Stack: ${study.meta.stack.join(", ")}.`,
        study.meta.repo ? `GitHub: ${study.meta.repo}.` : "",
        study.meta.demo ? `Live / Store link: ${study.meta.demo}.` : "",
      ].filter(Boolean);
      return `- ${parts.join(" ")}`;
    }),
    `- [${TEMPORAL_MEMORY_ENGINE.name} — ${TEMPORAL_MEMORY_ENGINE.subtitle}](${TEMPORAL_MEMORY_ENGINE.repo}): ${TEMPORAL_MEMORY_ENGINE.summary} Stack: ${TEMPORAL_MEMORY_ENGINE.stack.join(", ")}. (Hosted as a public GitHub repository; not yet published as a standalone /work case study on this site.)`,
    "",
    "## Supporting Projects",
    "",
    ...sideProjects.map(
      (p) =>
        `- [${p.name}](${p.repo}): ${p.blurb} Stack: ${p.stack.join(", ")}.${p.demo ? ` Demo: ${p.demo}` : ""}`,
    ),
    "",
    "## Technical Skills",
    "",
    ...skills.map((group) => `- **${group.label}:** ${group.items.join(", ")}`),
    `- **Competitive Programming:** LeetCode ${competitive.leetcode.rating}, CodeChef ${competitive.codechef.rating} (${competitive.problems} problems across ${competitive.contests} rated contests)`,
    "",
    "## Achievements & Leadership",
    "",
    ...achievements.map(
      (a) =>
        `- **${a.title}** (${a.period}): ${a.detail}${a.href ? ` (${a.href})` : ""}`,
    ),
    "",
    "## Technical Writing",
    "",
    ...posts.map(
      (post) =>
        `- [${post.meta.title}](${site.url}/writing/${post.meta.slug}) (${post.meta.date}, ${post.meta.readingTime}): ${post.meta.description}`,
    ),
    "",
    "## Site Pages & Important Links",
    "",
    `- [Home](${site.url}): Portfolio overview, selected case studies, writing, live GitHub & competitive signals, experience, and toolkit`,
    `- [Work](${site.url}/work): Deep-dive technical case studies and supporting engineering projects`,
    `- [Writing](${site.url}/writing): Technical essays on agentic AI invariants, dataset leakage, and benchmarking`,
    `- [About & Contact](${site.url}/about): Engineering philosophy, achievements, and contact details`,
    `- [Résumé](${site.url}/resume): Full structured résumé and downloadable PDF`,
    `- [Résumé PDF](${site.url}${site.resumePath}): Direct PDF resume download`,
    `- [GitHub](${site.socials.github}): Public source code repositories`,
    `- [LinkedIn](${site.socials.linkedin}): Professional profile`,
    `- [LeetCode](${site.socials.leetcode}): Algorithm problem-solving profile`,
    `- [CodeChef](${site.socials.codechef}): Competitive programming profile`,
    `- [Sitemap](${site.url}/sitemap.xml): XML sitemap of all indexable routes`,
    `- [Full LLM Context](${site.url}/llms-full.txt): Complete plain-text portfolio, case studies, and writing`,
  ];

  return `${lines.join("\n")}\n`;
}

export function buildLlmsFullTxt(): string {
  const studies = getCaseStudies();
  const posts = getWriting();

  const header = [
    `# ${site.name} — Full Portfolio & Technical Documentation`,
    "",
    `> ${site.positioning}`,
    "",
    `- Canonical URL: ${site.url}`,
    `- Email: ${site.email}`,
    `- Location: ${site.location}`,
    `- GitHub: ${site.socials.github}`,
    `- LinkedIn: ${site.socials.linkedin}`,
    `- Résumé PDF: ${site.url}${site.resumePath}`,
    "",
    "## Education",
    "",
    ...education.map(
      (e) => `- **${e.institution}** (${e.period}) — ${e.qualification} (${e.detail})`,
    ),
    "",
    "## Experience",
    "",
    ...experience.flatMap((job) => [
      `### ${job.title} · ${job.company}`,
      `- Period: ${job.period}`,
      `- Location: ${job.location}`,
      ...job.points.map((pt) => `- ${pt}`),
      "",
    ]),
    "## Technical Skills & Competitive Programming",
    "",
    ...skills.map((group) => `- **${group.label}:** ${group.items.join(", ")}`),
    `- **Competitive Programming:** LeetCode rating ${competitive.leetcode.rating}, CodeChef rating ${competitive.codechef.rating}, ${competitive.problems} problems solved across ${competitive.contests} rated contests.`,
    "",
    "## Achievements",
    "",
    ...achievements.map(
      (a) => `- **${a.title}** (${a.period}): ${a.detail}${a.href ? ` — ${a.href}` : ""}`,
    ),
    "",
  ];

  const caseStudySections = [
    "## Case Studies (Hosted on Portfolio)",
    "",
    ...studies.flatMap((study) => [
      `### ${study.meta.title} — ${study.meta.tagline}`,
      `- URL: ${site.url}/work/${study.meta.slug}`,
      `- Status: ${study.meta.status}`,
      `- Role: ${study.meta.role}`,
      `- Period: ${study.meta.period}`,
      `- Stack: ${study.meta.stack.join(", ")}`,
      ...(study.meta.repo ? [`- GitHub: ${study.meta.repo}`] : []),
      ...(study.meta.demo ? [`- Live / Store Link: ${study.meta.demo}`] : []),
      ...(study.meta.metrics?.length
        ? [
            "- Verified Metrics:",
            ...study.meta.metrics.map(
              (m) => `  - ${m.value}: ${m.label}${m.source ? ` (Source: ${m.source})` : ""}`,
            ),
          ]
        : []),
      ...(study.meta.disclosure ? [`- Disclosure: ${study.meta.disclosure}`] : []),
      "",
      study.meta.summary,
      "",
      mdxToPlainMarkdown(study.body),
      "",
    ]),
    `### ${TEMPORAL_MEMORY_ENGINE.name} — ${TEMPORAL_MEMORY_ENGINE.subtitle}`,
    `- GitHub: ${TEMPORAL_MEMORY_ENGINE.repo}`,
    `- Stack: ${TEMPORAL_MEMORY_ENGINE.stack.join(", ")}`,
    `- Note: Hosted on GitHub; summary included here from repository documentation.`,
    "",
    TEMPORAL_MEMORY_ENGINE.summary,
    "",
    ...TEMPORAL_MEMORY_ENGINE.highlights.map((h) => `- ${h}`),
    "",
  ];

  const supportingSections = [
    "## Supporting Projects",
    "",
    ...sideProjects.map(
      (p) =>
        `- **${p.name}** (${p.repo}): ${p.blurb} Stack: ${p.stack.join(", ")}.${p.demo ? ` Demo: ${p.demo}` : ""}`,
    ),
    "",
  ];

  const writingSections = [
    "## Technical Writing",
    "",
    ...posts.flatMap((post) => [
      `### ${post.meta.title}`,
      `- URL: ${site.url}/writing/${post.meta.slug}`,
      `- Published: ${post.meta.date}`,
      `- Reading Time: ${post.meta.readingTime}`,
      `- Tags: ${post.meta.tags.join(", ")}`,
      "",
      post.meta.description,
      "",
      mdxToPlainMarkdown(post.body),
      "",
    ]),
  ];

  return `${[...header, ...caseStudySections, ...supportingSections, ...writingSections].join("\n")}\n`;
}
