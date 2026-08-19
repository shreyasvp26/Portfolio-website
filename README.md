# shreyas-portfolio

Personal site and technical case-study collection for Shreyas Patil.

Built as a static site: every page is prerendered at build time, and the only
dynamic data is a GitHub activity snapshot revalidated daily.

## Stack

| Concern         | Choice                                             |
| --------------- | -------------------------------------------------- |
| Framework       | Next.js 16 (App Router, Turbopack)                 |
| Language        | TypeScript                                         |
| Styling         | Tailwind CSS v4 (`@theme` tokens in `globals.css`) |
| Content         | MDX via `next-mdx-remote/rsc` + `gray-matter`       |
| Code highlights | `rehype-pretty-code` (Shiki)                        |
| Fonts           | Geist Sans / Geist Mono                             |
| Icons           | `lucide-react`, plus local brand marks              |
| Hosting         | Vercel                                              |

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build; fails on type errors
npx eslint .
```

### Optional environment

| Variable       | Purpose                                                                     |
| -------------- | --------------------------------------------------------------------------- |
| `GITHUB_TOKEN` | Lifts the 60 req/hr anonymous GitHub API limit during builds. Not required. |

If the GitHub API is unreachable or rate-limited, `getGithubSnapshot()` returns
a non-live snapshot and the UI says so rather than showing stale numbers.

## Layout

```
src/
  app/                 Routes (home, work, writing, about, resume, sitemap, robots)
  components/          UI primitives, MDX components, SVG architecture diagrams
  content/
    work/*.mdx         Case studies — frontmatter typed as CaseStudyMeta
    writing/*.mdx      Posts — frontmatter typed as WritingMeta
  lib/
    site.ts            Profile, experience, skills, side projects
    content.ts         Filesystem MDX loader
    github.ts          Build-time GitHub snapshot
public/
  Shreyas_Patil_Resume.pdf
```

## Adding a case study

Create `src/content/work/<slug>.mdx`. Frontmatter must satisfy `CaseStudyMeta`
in `src/lib/content.ts`; the route, sitemap entry, and ⌘K palette entry are all
derived from it, so no registration step is needed.

The body has access to three custom components:

- `<Diagram name="..." caption="..." />` — renders a diagram registered in
  `components/diagrams.tsx`. Add new ones to the `DIAGRAMS` map; `DiagramName`
  is derived from its keys, so an unknown name is a type error.
- `<Decision choice="..." because="..." cost="..." />` — a decision record.
- `<Callout tone="info | warn | insight" title="...">` — an aside.

## Content conventions

These are deliberate and worth preserving:

- **Every headline metric carries a `source`** naming the artifact that backs it.
  The `MetricStat` component surfaces it as a tooltip. If a number can't name its
  evidence, it doesn't go on the site.
- **No skill proficiency bars.** The case studies are the evidence.
- **`status` is honest**, including `In progress` and `Engine complete`.
- **`disclosure`** exists for caveats that belong above the fold rather than
  buried — unmeasured benchmarks, AI-assisted authorship, medical disclaimers.
# Portfolio-website
