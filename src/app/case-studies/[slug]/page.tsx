import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check, ImageIcon, Info, Lightbulb } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { serviceBySlug } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return buildMetadata({
    title: `${study.demo ? "Demo Case Study: " : ""}${study.title}`,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
    // Demo case studies shouldn't be indexed as if they were real work.
    noindex: study.demo,
  });
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="reveal border-t border-white/[0.07] py-10 first:border-t-0 first:pt-0">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <PageHero
        eyebrow={study.demo ? "Demo case study · placeholder" : "Case study"}
        title={study.title}
        intro={study.summary}
        breadcrumbs={[
          { name: "Case Studies", path: "/case-studies" },
          { name: study.title, path: `/case-studies/${study.slug}` },
        ]}
      />

      <div className="container grid gap-10 pb-16 lg:grid-cols-[1fr_320px] lg:gap-16">
        <article className="min-w-0">
          {study.demo && (
            <div className="mb-10 flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/[0.06] p-4 text-sm text-amber-100">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p>
                This is a demo case study showing our structure and approach. It does not describe a real client, and all results are
                placeholders until replaced with verified data.
              </p>
            </div>
          )}

          <Block title="The challenge">
            <p className="leading-relaxed text-slate-400">{study.challenge}</p>
          </Block>

          <Block title="Strategy">
            <ul className="space-y-2.5">
              {study.strategy.map((s) => (
                <li key={s} className="flex items-start gap-3 text-slate-300">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" /> {s}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Solution">
            <ul className="space-y-2.5">
              {study.solution.map((s) => (
                <li key={s} className="flex items-start gap-3 text-slate-300">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" /> {s}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Results">
            <dl className="grid gap-3 sm:grid-cols-2">
              {study.results.map((r) => (
                <div key={r.label} className="card p-5">
                  <dt className="text-sm text-slate-400">{r.label}</dt>
                  <dd className="mt-2">
                    <span className="placeholder-note">{r.value}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block title="Screenshots">
            <div className="grid gap-4 sm:grid-cols-2">
              {study.screenshots.map((s) => (
                <figure
                  key={s.alt}
                  className="flex aspect-[16/10] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-ink-900 p-4 text-center"
                >
                  <ImageIcon className="h-6 w-6 text-slate-600" aria-hidden="true" />
                  <figcaption className="text-xs text-slate-500">{s.alt}</figcaption>
                </figure>
              ))}
            </div>
          </Block>

          <Block title="Key learnings">
            <ul className="space-y-3">
              {study.learnings.map((l) => (
                <li key={l} className="flex items-start gap-3 text-slate-300">
                  <Lightbulb className="mt-1 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" /> {l}
                </li>
              ))}
            </ul>
          </Block>
        </article>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <dl className="card space-y-5 p-6 text-sm">
            <div>
              <dt className="text-slate-500">Client / Project</dt>
              <dd className="mt-1">
                <span className="placeholder-note">{study.client}</span>
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Industry</dt>
              <dd className="mt-1 font-medium text-white">{study.industry}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Services used</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {study.services.map((s) => (
                  <Link
                    key={s}
                    href={`/${s}`}
                    className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-300 hover:border-brand-blue/50 hover:text-white"
                  >
                    {serviceBySlug[s]?.name}
                  </Link>
                ))}
              </dd>
            </div>
          </dl>
          <Link href="/contact" className="btn-accent mt-4 w-full">
            Discuss a Similar Project
          </Link>
        </aside>
      </div>

      <CtaSection title="Facing a similar challenge?" primary={{ label: "Discuss Your Business", href: "/contact" }} />
    </>
  );
}
