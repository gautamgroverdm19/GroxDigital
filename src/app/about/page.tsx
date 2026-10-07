import { Compass, Eye, Target } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Pillars } from "@/components/sections/Pillars";
import { WhyUs } from "@/components/sections/WhyUs";
import { CtaSection } from "@/components/sections/CtaSection";
import { Ph } from "@/components/ui/Placeholder";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About Us — Your Digital Growth, AI & Automation Partner",
  description:
    "Groxdigital is a modern technology and growth partner helping businesses build their online presence, generate leads, automate repetitive work and grow with AI.",
  path: "/about",
});

const stack = [
  { group: "Web & Commerce", items: ["Next.js", "React", "WordPress", "Shopify", "WooCommerce", "Tailwind CSS"] },
  {
    group: "Marketing & Ads",
    items: ["Google Ads", "Meta Ads Manager", "LinkedIn Campaign Manager", "Google Search Console", "Merchant Center"],
  },
  {
    group: "Analytics & Tracking",
    items: ["Google Analytics 4", "Google Tag Manager", "Meta Pixel & Conversion API", "Looker Studio", "Microsoft Clarity"],
  },
  {
    group: "Automation & CRM",
    items: ["n8n", "Make", "Zapier", "WhatsApp Business Platform", "HubSpot / Zoho / other CRMs", "Google Workspace"],
  },
  {
    group: "AI",
    items: ["Large language models", "AI assistants & agents", "Retrieval over your own knowledge", "AI image & video tools"],
  },
];

const principles = [
  {
    title: "Start with the business goal",
    desc: "Every recommendation begins with what you need to achieve: more leads, more sales, less manual work, or better visibility.",
  },
  {
    title: "Fix the foundations first",
    desc: "A clear website, accurate tracking and fast follow-up help every marketing budget work harder.",
  },
  { title: "Connect the system", desc: "Websites, campaigns, CRM, WhatsApp and automation should share data and hand off smoothly." },
  { title: "Measure honestly", desc: "We report what's happening, good or bad, and explain what we'll change next." },
  { title: "Improve continuously", desc: "Growth comes from steady testing and iteration, not one-time launches." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`About ${site.name}`}
        title="A modern technology and growth partner for ambitious businesses."
        intro={`${site.name} brings websites, digital marketing, AI and automation together under one roof, so businesses can grow without managing a patchwork of separate vendors.`}
        breadcrumbs={[{ name: "About", path: "/about" }]}
        primaryCta={{ label: "Work With Us", href: "/contact" }}
        secondaryCta={{ label: "Explore Our Services", href: "/services" }}
      />

      {/* Who we are / What we do */}
      <section className="section pt-8" aria-labelledby="who-heading">
        <div className="container grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="reveal">
            <h2 id="who-heading" className="h-section">
              Who we are
            </h2>
            <div className="mt-5 space-y-4 text-slate-400">
              <p>
                {site.name} is a digital growth, AI and automation agency. We work with startups, local businesses, e-commerce brands,
                professionals and established companies that want to grow online in a measurable, sustainable way.
              </p>
              <p>
                We believe growth today depends on more than marketing alone. It needs a strong website, the right campaigns, quick and
                consistent follow-up, smart use of AI and reliable data, all working together.
              </p>
              <p className="text-sm">
                <Ph>[Add your founding story, founder name(s) and team background here — only verified facts.]</Ph>
              </p>
            </div>
          </div>
          <div className="reveal">
            <h2 className="h-section">What we do</h2>
            <div className="mt-5 space-y-4 text-slate-400">
              <p>
                We design and build websites and online stores, run SEO, paid advertising, social media and lead generation, and implement
                AI assistants, WhatsApp automation and business workflows. Underneath it all, we set up analytics and conversion tracking so
                you can see what&apos;s working.
              </p>
              <p>
                Clients can start with a single service or work with us as an ongoing growth partner across the full journey, from first
                click to repeat customer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Approach */}
      <section className="section" aria-label="Mission, vision and approach">
        <div className="container grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Target,
              title: "Our Mission",
              text: "To help businesses grow with modern websites, smarter marketing, practical AI and automation, delivered honestly and measured clearly.",
            },
            {
              icon: Eye,
              title: "Our Vision",
              text: "A world where businesses of every size can access the digital, AI and automation capabilities that were once only available to large companies.",
            },
            {
              icon: Compass,
              title: "Our Approach",
              text: "Strategy first, then build, launch and optimise. We connect each channel into one system and improve it continuously using real data.",
            },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <article key={c.title} className="card reveal p-7" style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                <span className="icon-tile">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-xl font-semibold">{c.title}</h2>
                <p className="mt-3 leading-relaxed text-slate-400">{c.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <Pillars />

      <WhyUs />

      {/* Technology stack */}
      <section className="section" aria-labelledby="stack-heading">
        <div className="container">
          <SectionHeader
            id="stack-heading"
            eyebrow="Technology"
            title="Our technology stack"
            intro="We choose proven tools that fit your needs and budget, and we're not tied to any single vendor. Typical tools include:"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {stack.map((s, i) => (
              <div key={s.group} className="card reveal p-5" style={{ ["--reveal-delay" as string]: `${i * 50}ms` }}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-sky">{s.group}</h3>
                <ul className="mt-4 space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="text-sm text-slate-300">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth philosophy */}
      <section className="section" aria-labelledby="philosophy-heading">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          <SectionHeader
            id="philosophy-heading"
            align="left"
            eyebrow="Philosophy"
            title="Our growth philosophy"
            intro="Sustainable growth is rarely about one clever tactic. It comes from doing the fundamentals well and improving them consistently."
          />
          <ol className="space-y-3">
            {principles.map((p, i) => (
              <li key={p.title} className="card reveal flex gap-5 p-5" style={{ ["--reveal-delay" as string]: `${i * 50}ms` }}>
                <span className="font-mono text-sm text-brand-sky">0{i + 1}</span>
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaSection title="Let's grow your business together." primary={{ label: "Start Your Project", href: "/contact" }} />
    </>
  );
}
