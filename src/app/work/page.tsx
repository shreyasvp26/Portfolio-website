import type { Metadata } from "next";
import { getCaseStudies } from "@/lib/content";
import { sideProjects } from "@/lib/site";
import { CaseStudyCard, SideProjectRow } from "@/components/project-card";
import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Technical case studies: an evaluation platform for coding agents, a deployed skin-lesion screening tool, and production iOS release ownership.",
};

export default function WorkIndex() {
  const work = getCaseStudies();

  return (
    <>
      <section className="animate-fade-up py-14 sm:py-20">
        <h1 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">Work</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Three projects written up as case studies — the problem, the architecture, the trade-offs I
          made, and the parts that are still unfinished. Every figure names the artifact that backs
          it.
        </p>
      </section>

      <Section label="Case studies" title="Deep dives">
        <div className="space-y-4">
          {work.map((d) => (
            <CaseStudyCard key={d.meta.slug} meta={d.meta} />
          ))}
        </div>
      </Section>

      <Section label="Also built" title="Supporting work">
        <ul>
          {sideProjects.map((p) => (
            <SideProjectRow key={p.name} project={p} />
          ))}
        </ul>
      </Section>
    </>
  );
}
