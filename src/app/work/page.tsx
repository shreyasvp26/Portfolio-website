import type { Metadata } from "next";
import { getCaseStudies } from "@/lib/content";
import { sideProjects } from "@/lib/site";
import { CaseStudyCard, SideProjectRow } from "@/components/project-card";
import { Reveal } from "@/components/motion";
import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Technical case studies: a payment recovery system with adversarial hardening, a deployed skin-lesion screening tool, and production iOS release ownership.",
};

export default function WorkIndex() {
  const work = getCaseStudies();

  return (
    <>
      <section className="py-16 sm:py-24">
        <h1 className="grad-text text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
          Work
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Three projects written up as case studies — the problem, the architecture, the trade-offs I
          made, and the parts that are still unfinished. Every figure names the artifact that backs
          it.
        </p>
      </section>

      <Section label="Case studies" title="Deep dives">
        <div className="space-y-5">
          {work.map((d, i) => (
            <Reveal key={d.meta.slug} delay={i * 90}>
              <CaseStudyCard meta={d.meta} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section label="Also built" title="Supporting work">
        <Reveal>
          <ul>
            {sideProjects.map((p) => (
              <SideProjectRow key={p.name} project={p} />
            ))}
          </ul>
        </Reveal>
      </Section>
    </>
  );
}
