import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { pillars, serviceBySlug } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services — Websites, Marketing, AI & Automation",
  description:
    "Explore Groxdigital's services: website development, e-commerce, SEO, Meta and Google Ads, social media, LinkedIn, email, WhatsApp, AI solutions, automation, analytics and CRO.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything you need to build, grow, automate and optimize."
        intro="Our services are organised into four pillars. Use one on its own or combine them into a connected growth system, with one team responsible for the whole journey."
        breadcrumbs={[{ name: "Services", path: "/services" }]}
        primaryCta={{ label: "Get Free Consultation", href: "/contact" }}
        secondaryCta={{ label: "Find the Right Service", href: "#build" }}
      />

      <div className="container space-y-6 pb-12">
        {pillars.map((p, idx) => (
          <section
            key={p.key}
            id={p.key}
            aria-labelledby={`pillar-${p.key}`}
            className="reveal scroll-mt-24 rounded-3xl border border-white/[0.07] bg-ink-900/50 p-6 sm:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-[0.8fr_2fr] lg:gap-12">
              <div>
                <p className="font-mono text-xs text-slate-500">0{idx + 1}</p>
                <h2 id={`pillar-${p.key}`} className="mt-2 font-display text-3xl font-semibold uppercase tracking-wide">
                  {p.label}
                </h2>
                <p className="mt-1 text-sm font-medium text-brand-sky">{p.title}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">{p.desc}</p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {p.slugs.map((slug) => {
                  const s = serviceBySlug[slug];
                  const Icon = s.icon;
                  return (
                    <li key={slug}>
                      <Link href={`/${slug}`} className="card card-hover group flex h-full flex-col p-5">
                        <div className="flex items-center gap-3">
                          <span className="icon-tile h-9 w-9 rounded-lg">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <h3 className="font-semibold">{s.name}</h3>
                        </div>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{s.summary}</p>
                        <ul className="mt-3 space-y-1">
                          {s.services.groups.slice(0, 3).map((g) => (
                            <li key={g.title} className="flex items-center gap-2 text-xs text-slate-500">
                              <Check className="h-3 w-3 text-brand-blue" aria-hidden="true" /> {g.title}
                            </li>
                          ))}
                        </ul>
                        <span className="link-arrow mt-4">
                          Explore Service{" "}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        ))}

        <section aria-labelledby="more-heading" className="reveal rounded-3xl border border-dashed border-white/15 p-6 sm:p-10">
          <h2 id="more-heading" className="text-xl font-semibold">
            Also available
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">Specialist services we offer as part of wider projects or on request.</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {[
              "SaaS / MVP Development",
              "Custom Business Tools",
              "CRM Setup",
              "API Integrations",
              "Sales Funnel Development",
              "Marketing Dashboards",
              "Reputation & Review Management",
              "YouTube Marketing",
              "Influencer Marketing",
              "Personal Branding",
              "Marketing Strategy Consulting",
              "AI-powered Internal Business Systems",
            ].map((item) => (
              <li key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-slate-300">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <ProcessSteps />
      <CtaSection
        title="Not sure where to start?"
        intro="Tell us about your business and goals. We'll recommend the services that will make the biggest difference first."
        primary={{ label: "Request a Strategy", href: "/contact" }}
      />
    </>
  );
}
