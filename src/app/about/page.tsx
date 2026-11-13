import type { Metadata } from "next";
import Link from "next/link";
import { aboutJsonLd, pageMetadata } from "@/lib/seo";
import { achievements, site } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { ExternalLink, Section } from "@/components/ui";

const ABOUT_DESCRIPTION = `${site.name} — final-year Computer Science student at IIIT Pune. How I think about building applied ML and distributed-systems software, achievements, and contact details.`;

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: ABOUT_DESCRIPTION,
  path: "/about",
  type: "profile",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutJsonLd(ABOUT_DESCRIPTION)} />
      <section className="py-16 sm:py-24">
        <h1 className="grad-text text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
          About
        </h1>
        <div className="prose-doc mt-8">
          <p>
            I&apos;m studying Computer Science at IIIT Pune, where I expect to graduate in 2027. I enjoy
            the point where a good idea has to meet the details that make software dependable: data,
            failure cases, latency, and the people who will use it. That has led me to work across
            backend systems, applied machine learning, and mobile apps.
          </p>
          <p>
            One project I keep coming back to is{" "}
            <Link href="/work/recoveryos">RecoveryOS</Link>, a payment recovery system that treats
            failed payments as decisions with economic and safety constraints, rather than retries
            without context. Working through duplicate webhooks, concurrent requests, and unclear
            failure states has been a practical way to learn how distributed systems behave when
            things go wrong.
          </p>

          <h2>How I think about building things</h2>
          <p>
            <strong>I want the numbers to be checkable.</strong> When I share a result, I try to point
            to the code, tests, or evaluation behind it. A metric without that context doesn&apos;t tell
            you much about what the system can actually do.
          </p>
          <p>
            <strong>Constraints shape the engineering.</strong> On <Link href="/work/oncoscan">OncoScan</Link>,
            I explored both an ensemble and a smaller deployable model. Thinking about inference cost,
            response time, and how a demo behaves on a real server made the deployment choices as
            interesting as the model itself.
          </p>
          <p>
            <strong>Important rules should be exercised.</strong> For me, a design decision becomes
            more useful when it is backed by a test or a guard in the code. I use that approach to
            catch cases like duplicate events and invalid inputs before they turn into plausible but
            incorrect results.
          </p>
          <p>
            I also care about clear failure. If a service is missing something essential, it should
            make that visible instead of quietly returning an answer people could mistake for a good
            one.
          </p>

          <h2>Outside the terminal</h2>
          <p>
            Away from projects, I was part of SAAZ, IIIT Pune&apos;s music club, and helped organise campus
            events. I also enjoy competitive programming; it gives me a different kind of practice in
            reasoning through a problem under constraints.
          </p>
        </div>
      </section>

      <Section id="achievements" label="Recognition" title="Achievements & responsibilities">
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
                  <ExternalLink href={a.href} ariaLabel={`View project for ${a.title}`}>
                    View project
                  </ExternalLink>
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="contact" label="Contact" title="Get in touch">
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
