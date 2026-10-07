import Link from "next/link";
import { ArrowRight, Check, CircleAlert } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { FlowDiagram } from "@/components/sections/FlowDiagram";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Faq } from "@/components/sections/Faq";
import { CtaSection } from "@/components/sections/CtaSection";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { serviceBySlug } from "@/content/services";
import type { ServicePage } from "@/content/types";
import { serviceSchema } from "@/lib/seo";

export function ServicePageView({ page }: { page: ServicePage }) {
  const offers = page.services.groups.flatMap((g) => g.items);
  const related = page.related.map((slug) => serviceBySlug[slug]).filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        intro={page.hero.intro}
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: page.name, path: `/${page.slug}` },
        ]}
        primaryCta={{ label: page.hero.primaryCta ?? "Get Free Consultation", href: "/contact" }}
        secondaryCta={{ label: "See How It Works", href: "#how-it-works" }}
      />

      {/* Problem */}
      <section className="section pt-8 sm:pt-10" aria-labelledby="problem-heading">
        <div className="container">
          <SectionHeader id="problem-heading" align="left" eyebrow="The challenge" title={page.problem.title} intro={page.problem.intro} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.problem.points.map((p, i) => (
              <li key={p.title} className="card reveal p-6" style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}>
                <CircleAlert className="h-5 w-5 text-amber-300/80" aria-hidden="true" />
                <h3 className="mt-4 font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Solution */}
      <section className="section" aria-labelledby="solution-heading">
        <div className="container">
          <div className="reveal grid gap-10 rounded-3xl border border-white/[0.07] bg-gradient-to-br from-ink-850 to-ink-900 p-6 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
            <div>
              <p className="eyebrow">Our approach</p>
              <h2 id="solution-heading" className="h-section mt-5">
                {page.solution.title}
              </h2>
              <p className="lead mt-4">{page.solution.body}</p>
            </div>
            <ul className="grid content-center gap-3">
              {page.solution.points.map((pt) => (
                <li key={pt} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue/20 text-brand-sky">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="text-slate-200">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section" aria-labelledby="services-heading">
        <div className="container">
          <SectionHeader id="services-heading" eyebrow="What we offer" title={page.services.title} intro={page.services.intro} />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {page.services.groups.map((g, i) => (
              <article
                key={g.title}
                id={g.id}
                className="card reveal flex scroll-mt-28 flex-col p-6"
                style={{ ["--reveal-delay" as string]: `${(i % 3) * 60}ms` }}
              >
                <h3 className="text-lg font-semibold">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{g.desc}</p>
                <ul className="mt-5 flex-1 space-y-2 border-t border-white/[0.06] pt-5">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                {g.href && (
                  <Link href={g.href} className="link-arrow mt-5">
                    Learn more <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </article>
            ))}
          </div>
          <div className="reveal mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-ink-900/60 p-6 text-center sm:flex-row sm:text-left">
            <p className="text-slate-300">
              <span className="font-semibold text-white">Not sure which of these you need?</span> We&apos;ll recommend the right mix for
              your goals and budget.
            </p>
            <Link href="/contact" className="btn-primary shrink-0">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section" aria-labelledby="benefits-heading">
        <div className="container">
          <SectionHeader id="benefits-heading" eyebrow="Benefits" title="What this means for your business" />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.benefits.map((b, i) => (
              <li
                key={b.title}
                className="reveal border-l border-brand-blue/40 pl-5"
                style={{ ["--reveal-delay" as string]: `${(i % 3) * 60}ms` }}
              >
                <h3 className="font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{b.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section scroll-mt-20" aria-labelledby="how-heading">
        <div className="container">
          <SectionHeader id="how-heading" eyebrow="How it works" title={page.howItWorks.title} intro={page.howItWorks.intro} />
          <div className="mt-12">
            <FlowDiagram steps={page.howItWorks.steps} title={page.howItWorks.title} />
          </div>
          {page.workflows && (
            <div className="mt-16 space-y-10">
              <h3 className="text-center text-xl font-semibold">Automation workflow examples</h3>
              {page.workflows.map((w) => (
                <div key={w.title}>
                  <p className="mb-4 text-sm font-medium text-slate-300">{w.title}</p>
                  <FlowDiagram steps={w.steps} compact />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Spotlight */}
      {page.spotlight && (
        <section id={page.spotlight.id} className="section scroll-mt-20" aria-labelledby="spotlight-heading">
          <div className="container">
            <div className="relative isolate overflow-hidden rounded-3xl border border-brand-blue/20 bg-ink-900 p-6 sm:p-10 lg:p-14">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10"
                style={{ background: "radial-gradient(50% 60% at 100% 0%, rgba(139,92,246,0.18), transparent 70%)" }}
              />
              <SectionHeader
                id="spotlight-heading"
                align="left"
                eyebrow={page.spotlight.eyebrow}
                title={page.spotlight.title}
                intro={page.spotlight.intro}
              />
              <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {page.spotlight.items.map((item, i) => (
                  <li
                    key={item.title}
                    className="reveal rounded-xl border border-white/[0.07] bg-ink-850/80 p-5"
                    style={{ ["--reveal-delay" as string]: `${(i % 3) * 50}ms` }}
                  >
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{item.desc}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link href="/contact" className="btn-accent">
                  Discuss an AI Agent for Your Business <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Use cases */}
      <section className="section" aria-labelledby="usecases-heading">
        <div className="container">
          <SectionHeader
            id="usecases-heading"
            eyebrow="Use cases"
            title="Where this works well"
            intro="Illustrative examples of how businesses typically use this service."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {page.useCases.map((u, i) => (
              <li key={u.title} className="card reveal p-6" style={{ ["--reveal-delay" as string]: `${(i % 2) * 60}ms` }}>
                <h3 className="font-semibold">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{u.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProcessSteps
        eyebrow="Process"
        title="Our process"
        intro={`Every ${page.name.toLowerCase()} engagement follows the same transparent, five-step approach.`}
      />

      <Faq faqs={page.faqs} title={`${page.name} FAQs`} />

      {related.length > 0 && (
        <section className="section pt-0" aria-labelledby="related-heading">
          <div className="container">
            <SectionHeader id="related-heading" align="left" title="Related services" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((s, i) => (
                <ServiceCard key={s.slug} service={s} delay={i * 50} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection
        title={page.cta?.title ?? "Ready to discuss your business?"}
        intro={page.cta?.intro}
        primary={{ label: page.cta?.primary ?? "Get Free Consultation", href: "/contact" }}
      />

      <JsonLd data={serviceSchema({ name: page.name, description: page.meta.description, path: `/${page.slug}`, offers })} />
    </>
  );
}
