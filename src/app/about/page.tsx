import type { Metadata } from "next";
import Link from "next/link";
import { achievements, site } from "@/lib/site";
import { ExternalLink, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} — final-year CSE student at IIIT Pune. How I think about building software.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="animate-fade-up py-14 sm:py-20">
        <h1 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">About</h1>
        <div className="prose-doc mt-6">
          <p>
            I&apos;m a final-year Computer Science student at IIIT Pune. My foundation is core CS —
            data structures, algorithms, operating systems, databases — and most of what I build sits
            somewhere between applied machine learning and the infrastructure needed to make it
            trustworthy.
          </p>
          <p>
            Right now I&apos;m learning agentic AI the only way I find durable: by building something
            real with it and paying attention to where it breaks. That project is{" "}
            <Link href="/work/evalforge">EvalForge</Link>, a platform for evaluating autonomous coding
            agents, and building it with coding agents has taught me more about their failure modes
            than any amount of reading would have.
          </p>

          <h2>How I think about building things</h2>
          <p>
            <strong>A number without a source is a rumour.</strong> The reason my repositories
            sometimes say <code>TBD</code> where a flattering figure would fit is that I&apos;d rather
            publish a gap than a guess. On the deepfake project I kept an audit document that gates
            itself on <code>grep -c &quot;TBD&quot;</code> returning zero, precisely so that I
            couldn&apos;t quietly forget. Every headline metric on this site names the artifact that
            backs it.
          </p>
          <p>
            <strong>The interesting part is the decision, not the syntax.</strong> Frameworks turn
            over; the reasoning doesn&apos;t. On <Link href="/work/oncoscan">OncoScan</Link> I trained a
            four-model ensemble that scored highest and shipped a single smaller backbone instead,
            because cold-start latency mattered more than the last point of accuracy for a public
            demo. That trade-off is more of what I know than the model architecture is.
          </p>
          <p>
            <strong>Invariants belong in code, not in documents.</strong> A rule written in an
            architecture doc is a suggestion. The same rule expressed as a lint rule, a boundary test,
            or a build that refuses to start is a guarantee. This became concrete once I was reviewing
            agent-generated diffs at speed: a passing test suite only tells you the assertions you
            wrote still hold, and says nothing about the properties you never encoded.
          </p>
          <p>
            <strong>Failing loudly beats failing plausibly.</strong> OncoScan&apos;s server refuses to
            boot if its model weights are missing, because a medical-adjacent tool silently serving
            random-weight predictions is the worst outcome available. I&apos;d rather be obviously
            broken than confidently wrong.
          </p>

          <h2>Outside the terminal</h2>
          <p>
            I spent three years with SAAZ, the music club at IIIT Pune, ending up as a senior member
            organising campus events — which is where I learned that shipping something on a deadline
            with other people is a different skill from building it well alone. I also solve
            competitive programming problems fairly regularly; it keeps the algorithmic reflexes sharp
            in a way that project work alone doesn&apos;t.
          </p>
        </div>
      </section>

      <Section label="Recognition" title="Achievements & responsibilities">
        <ul className="space-y-5">
          {achievements.map((a) => (
            <li key={a.title}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-sm font-semibold text-text">{a.title}</h3>
                <span className="font-mono text-xs text-faint">{a.period}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted">{a.detail}</p>
              {a.href ? (
                <p className="mt-1.5 text-sm">
                  <ExternalLink href={a.href}>View project</ExternalLink>
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </Section>

      <Section label="Contact" title="Get in touch">
        <p className="max-w-2xl text-base leading-relaxed text-muted">
          I&apos;m looking for 2027 new-grad software engineering roles, particularly where applied ML
          meets real infrastructure. The fastest way to reach me is email.
        </p>
        <p className="mt-4">
          <a
            href={`mailto:${site.email}`}
            className="font-mono text-sm text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
          >
            {site.email}
          </a>
        </p>
      </Section>
    </>
  );
}
