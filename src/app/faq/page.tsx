import { PageHero } from "@/components/ui/PageHero";
import { FaqList } from "@/components/sections/Faq";
import { CtaSection } from "@/components/sections/CtaSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqCategories } from "@/content/faqs";
import { buildMetadata, faqSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about working with Groxdigital: services, pricing, ad spend, results, AI and automation, ownership and data.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        intro="Straight answers about how we work, what to expect and how we handle pricing, results and data. Service-specific questions are answered on each service page."
        breadcrumbs={[{ name: "FAQ", path: "/faq" }]}
      />
      <div className="container space-y-14 pb-10">
        {faqCategories.map((cat, i) => (
          <section key={cat.title} className="grid gap-6 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16" aria-labelledby={`faq-cat-${i}`}>
            <h2 id={`faq-cat-${i}`} className="reveal text-2xl font-semibold">
              {cat.title}
            </h2>
            <div className="reveal">
              <FaqList faqs={cat.faqs} />
            </div>
          </section>
        ))}
      </div>
      <JsonLd data={faqSchema(faqCategories.flatMap((c) => c.faqs))} />
      <CtaSection
        title="Still have a question?"
        intro="Ask us directly. We're happy to talk through your situation, with no obligation."
        primary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
