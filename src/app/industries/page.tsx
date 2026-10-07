import { PageHero } from "@/components/ui/PageHero";
import { IndustryGrid } from "@/components/sections/IndustryGrid";
import { CtaSection } from "@/components/sections/CtaSection";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Industries We Serve",
  description:
    "Groxdigital works with e-commerce, real estate, healthcare, clinics, education, finance, immigration consultants, restaurants, hospitality, retail, startups, B2B companies and more.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Growth systems adapted to your industry."
        intro="The fundamentals of growth are similar everywhere, but how customers search, compare and decide is not. We tailor websites, campaigns and automation to the way your market works."
        breadcrumbs={[{ name: "Industries", path: "/industries" }]}
        primaryCta={{ label: "Discuss Your Business", href: "/contact" }}
      />
      <section className="pb-12" aria-label="Industries">
        <div className="container">
          <IndustryGrid detailed />
          <p className="reveal mt-10 text-center text-slate-400">
            Don&apos;t see your industry? Let&apos;s discuss your requirements. The principles carry across most businesses.
          </p>
        </div>
      </section>
      <CtaSection title="Let's talk about your market." primary={{ label: "Discuss Your Business", href: "/contact" }} />
    </>
  );
}
