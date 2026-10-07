import { Plus } from "lucide-react";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqSchema } from "@/lib/seo";

export type FaqItem = { q: string; a: string };

type Props = {
  faqs: FaqItem[];
  title?: string;
  intro?: string;
  /** Emit FAQPage schema. Only one FAQPage block should be emitted per page. */
  schema?: boolean;
  showHeader?: boolean;
};

export function FaqList({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="divide-y divide-white/[0.07] rounded-2xl border border-white/[0.07] bg-ink-900/60">
      {faqs.map((f) => (
        <details key={f.q} className="group px-5 sm:px-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left font-medium text-white">
            <span>{f.q}</span>
            <Plus
              className="mt-0.5 h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <p className="-mt-1 pb-5 pr-8 leading-relaxed text-slate-400">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Faq({ faqs, title = "Frequently asked questions", intro, schema = true, showHeader = true }: Props) {
  return (
    <section className="section" aria-labelledby="faq-heading">
      <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {showHeader && <SectionHeader id="faq-heading" eyebrow="FAQ" title={title} intro={intro} align="left" />}
        <div className="reveal">
          <FaqList faqs={faqs} />
        </div>
      </div>
      {schema && <JsonLd data={faqSchema(faqs)} />}
    </section>
  );
}
