import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Filter,
  Globe,
  Megaphone,
  MessageCircle,
  MousePointerClick,
  SearchCheck,
  Workflow,
} from "lucide-react";
import { Backdrop } from "@/components/ui/Backdrop";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { Pillars } from "@/components/sections/Pillars";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { WhyUs } from "@/components/sections/WhyUs";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { IndustryGrid } from "@/components/sections/IndustryGrid";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { CtaSection } from "@/components/sections/CtaSection";
import { serviceBySlug } from "@/content/services";
import { caseStudies } from "@/content/case-studies";
import { homeFaqs } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: `${site.name} — Digital Growth, AI & Automation Agency`,
  description:
    "Groxdigital helps businesses build, market, automate and scale with modern websites, digital marketing, AI and automation. Websites, SEO, ads, WhatsApp, AI agents and analytics under one roof.",
  path: "/",
  absoluteTitle: true,
});

const essentials = [
  { label: "Websites", desc: "Fast, credible, conversion-ready", href: "/website-development", icon: Globe },
  { label: "Digital Marketing", desc: "Strategy across every channel", href: "/digital-marketing", icon: Megaphone },
  { label: "AI", desc: "Assistants, agents and AI tools", href: "/ai-solutions", icon: Bot },
  { label: "Automation", desc: "Workflows that run themselves", href: "/ai-automation", icon: Workflow },
  { label: "Lead Generation", desc: "Funnels that fill your pipeline", href: "/lead-generation", icon: Filter },
  { label: "WhatsApp", desc: "Campaigns, chatbots and API", href: "/whatsapp-marketing", icon: MessageCircle },
  { label: "SEO", desc: "Get found by ready-to-buy searchers", href: "/seo", icon: SearchCheck },
  { label: "Paid Ads", desc: "Meta, Google, YouTube and LinkedIn", href: "/google-ads", icon: MousePointerClick },
  { label: "Analytics", desc: "Know what drives leads and sales", href: "/analytics-tracking", icon: BarChart3 },
];

const featuredServices = [
  "website-development",
  "digital-marketing",
  "ai-solutions",
  "ai-automation",
  "lead-generation",
  "whatsapp-marketing",
  "google-business-profile",
  "ecommerce",
  "analytics-tracking",
].map((slug) => serviceBySlug[slug]);

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
        <Backdrop />
        <div className="container grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          <div className="animate-fade-up">
            <p className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              Digital Growth · AI · Automation
            </p>
            <h1 className="h-display mt-6">
              Digital Growth. <span className="text-gradient">AI Innovation.</span> Smarter Automation.
            </h1>
            <p className="lead mt-6 max-w-xl">
              {site.name} helps businesses build, market, automate and scale with modern websites, digital marketing, AI and automation.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-accent px-6 py-3.5">
                Get a Free Consultation <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/services" className="btn-ghost px-6 py-3.5">
                Explore Our Services
              </Link>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
              {["Strategy first", "Built to convert", "Tracked end to end"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-brand-blue" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-fade-up [animation-delay:120ms]">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* Everything your business needs */}
      <section className="section pt-8 sm:pt-12" aria-labelledby="essentials-heading">
        <div className="container">
          <SectionHeader
            id="essentials-heading"
            title="Everything Your Business Needs to Grow Online"
            intro="The core building blocks of modern growth, delivered by one team and connected into one system."
          />
          <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {essentials.map((e, i) => {
              const Icon = e.icon;
              return (
                <li key={e.label} className="reveal" style={{ ["--reveal-delay" as string]: `${(i % 3) * 60}ms` }}>
                  <Link href={e.href} className="card card-hover group flex items-center gap-4 p-4">
                    <span className="icon-tile">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-white">{e.label}</span>
                      <span className="block truncate text-sm text-slate-400">{e.desc}</span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-brand-sky"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Pillars />

      {/* Services overview */}
      <section className="section" aria-labelledby="services-heading">
        <div className="container">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              id="services-heading"
              align="left"
              eyebrow="Services"
              title="Services organised around how businesses grow"
              intro="Start with what you need most today. Every service is designed to plug into the others as you grow."
            />
            <Link href="/services" className="btn-ghost reveal shrink-0">
              View all services <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((s, i) => (
              <ServiceCard key={s.slug} service={s} delay={(i % 3) * 70} />
            ))}
          </div>
        </div>
      </section>

      <WhyUs />

      <ProcessSteps />

      {/* Industries */}
      <section className="section" aria-labelledby="industries-heading">
        <div className="container">
          <SectionHeader
            id="industries-heading"
            eyebrow="Industries"
            title="Built for businesses like yours"
            intro="Every industry has its own buying journey. We adapt websites, campaigns and automation to how your customers actually decide."
          />
          <div className="mt-12">
            <IndustryGrid />
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="section" aria-labelledby="work-heading">
        <div className="container">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              id="work-heading"
              align="left"
              eyebrow="Case studies"
              title="How we approach real business problems"
              intro="The examples below are demo case studies that show our approach and format. Verified client results will be published here with permission."
            />
            <Link href="/case-studies" className="btn-ghost reveal shrink-0">
              All case studies <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((c, i) => (
              <CaseStudyCard key={c.slug} study={c} delay={i * 70} />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <Faq faqs={homeFaqs} intro="Quick answers to the questions we hear most. Can't find yours? Ask the assistant or contact us." />

      <CtaSection />
    </>
  );
}
