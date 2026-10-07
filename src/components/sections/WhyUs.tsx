import { BarChart3, Bot, Compass, Layers, MousePointerClick, Workflow } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/lib/site";

const reasons = [
  { icon: Compass, title: "Strategy First", desc: "We don't just execute campaigns. We build strategies around business goals." },
  { icon: Bot, title: "AI-Powered", desc: "We use modern AI tools and systems to work faster and help you do more with less." },
  { icon: Workflow, title: "Automation", desc: "We reduce repetitive manual work so your team can focus on customers and growth." },
  {
    icon: MousePointerClick,
    title: "Conversion Focused",
    desc: "Every page, campaign and funnel is designed to turn traffic into leads and customers.",
  },
  { icon: BarChart3, title: "Data Driven", desc: "Tracking and analytics show what's working, so decisions are based on evidence." },
  { icon: Layers, title: "One Growth Partner", desc: "Website, marketing, AI and automation under one roof, with one team accountable." },
];

export function WhyUs() {
  return (
    <section className="section" aria-labelledby="why-heading">
      <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            id="why-heading"
            align="left"
            eyebrow={`Why ${site.name}?`}
            title="A growth partner, not just another vendor."
            intro="Most businesses juggle a web developer, an ads freelancer and a separate automation tool, and nobody owns the outcome. We bring it together around your goals."
          />
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <li key={r.title} className="card reveal p-6" style={{ ["--reveal-delay" as string]: `${(i % 2) * 80}ms` }}>
                <span className="icon-tile">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{r.desc}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
