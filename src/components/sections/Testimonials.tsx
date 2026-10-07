import { Quote } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { testimonials } from "@/content/testimonials";

/** Renders nothing until real testimonials are added in src/content/testimonials.ts. */
export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section className="section" aria-labelledby="testimonials-heading">
      <div className="container">
        <SectionHeader id="testimonials-heading" eyebrow="Client feedback" title="What our clients say" />
        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name} className="card reveal flex flex-col p-6">
              <Quote className="h-6 w-6 text-brand-blue" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 leading-relaxed text-slate-300">{t.quote}</blockquote>
              <p className="mt-6 text-sm font-semibold text-white">{t.name}</p>
              <p className="text-sm text-slate-500">
                {t.role}, {t.company}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
