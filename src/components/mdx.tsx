import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { ReactNode } from "react";
import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import { DIAGRAMS, type DiagramName } from "./diagrams";

const TONES = {
  info: { icon: Info, cls: "border-accent-dim/50 bg-accent/[0.06]", iconCls: "text-accent" },
  warn: {
    icon: AlertTriangle,
    cls: "border-amber-600/40 bg-amber-500/[0.06]",
    iconCls: "text-amber-400",
  },
  insight: {
    icon: Lightbulb,
    cls: "border-border-strong bg-raised",
    iconCls: "text-muted",
  },
} as const;

function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: keyof typeof TONES;
  title?: string;
  children: ReactNode;
}) {
  const { icon: Icon, cls, iconCls } = TONES[tone];
  return (
    <aside className={`my-6 flex gap-3 rounded-lg border p-4 ${cls}`}>
      <Icon className={`mt-0.5 size-4 shrink-0 ${iconCls}`} aria-hidden />
      <div className="min-w-0 text-sm">
        {title ? <p className="mb-1 font-medium text-text">{title}</p> : null}
        <div className="[&>*+*]:mt-2 [&_p]:text-muted">{children}</div>
      </div>
    </aside>
  );
}

/** Renders a named architecture diagram with a caption. */
function Diagram({ name, caption }: { name: DiagramName; caption: string }) {
  const Svg = DIAGRAMS[name];
  if (!Svg) return null;
  return (
    <figure className="my-8">
      <div className="overflow-x-auto rounded-lg border border-border bg-surface p-4 sm:p-6">
        <Svg />
      </div>
      <figcaption className="mt-2.5 text-xs leading-relaxed text-faint">{caption}</figcaption>
    </figure>
  );
}

/** Two-column decision record: what was chosen, and what it cost. */
function Decision({
  choice,
  because,
  cost,
}: {
  choice: string;
  because: string;
  cost: string;
}) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border">
      <div className="border-b border-border bg-surface px-4 py-2.5">
        <p className="font-mono text-xs tracking-wider text-faint uppercase">Decision</p>
        <p className="mt-0.5 text-sm font-medium text-text">{choice}</p>
      </div>
      <dl className="divide-y divide-border text-sm sm:divide-y-0">
        <div className="px-4 py-3">
          <dt className="font-mono text-xs tracking-wider text-faint uppercase">Because</dt>
          <dd className="mt-1 text-muted">{because}</dd>
        </div>
        <div className="border-t border-border px-4 py-3">
          <dt className="font-mono text-xs tracking-wider text-faint uppercase">What it cost</dt>
          <dd className="mt-1 text-muted">{cost}</dd>
        </div>
      </dl>
    </div>
  );
}

const components = { Callout, Diagram, Decision };

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose-doc">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
              [
                rehypePrettyCode,
                { theme: "github-dark-default", keepBackground: false },
              ],
            ],
          },
        }}
      />
    </div>
  );
}
