import { Info } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { CtaSection } from "@/components/sections/CtaSection";
import { caseStudies } from "@/content/case-studies";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Case Studies & Portfolio",
  description:
    "See how Groxdigital approaches websites, lead generation, local SEO, AI and automation projects: the challenge, strategy, solution and lessons learned.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Our work, explained properly."
        intro="Each case study walks through the challenge, the strategy, the services used, the solution and what we learned. We only publish results that are verified and approved by the client."
        breadcrumbs={[{ name: "Case Studies", path: "/case-studies" }]}
        primaryCta={{ label: "Start Your Project", href: "/contact" }}
      />
      <section className="pb-16" aria-label="Case studies">
        <div className="container">
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/[0.06] p-4 text-sm text-amber-100">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p>
              <strong>Demo content:</strong> the case studies below are illustrative placeholders that show our approach and format. They
              don&apos;t describe real clients, and no results are claimed. They&apos;ll be replaced with verified client work.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((c, i) => (
              <CaseStudyCard key={c.slug} study={c} delay={i * 70} />
            ))}
          </div>
        </div>
      </section>
      <CtaSection title="Want to be our next success story?" primary={{ label: "Start Your Project", href: "/contact" }} />
    </>
  );
}
