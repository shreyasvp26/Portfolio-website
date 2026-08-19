import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="font-mono text-xs tracking-widest text-accent uppercase">404</p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-text">
        That page doesn&apos;t exist
      </h1>
      <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
        A portfolio with a broken link is a portfolio that hasn&apos;t been treated like a product —
        so if you followed one from somewhere on this site, I&apos;d genuinely like to know.
      </p>
      <div className="mt-7 flex gap-2.5">
        <ButtonLink href="/" variant="primary">
          Home
        </ButtonLink>
        <ButtonLink href="/work">Case studies</ButtonLink>
      </div>
    </div>
  );
}
