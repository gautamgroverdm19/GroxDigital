import Link from "next/link";
import { BarChart3, Hammer, TrendingUp, Workflow, type LucideIcon } from "lucide-react";
import { pillars, serviceBySlug } from "@/content/services";
import { SectionHeader } from "@/components/ui/SectionHeader";

const pillarIcons: Record<string, LucideIcon> = {
  build: Hammer,
  grow: TrendingUp,
  automate: Workflow,
  optimize: BarChart3,
};

export function Pillars() {
  return (
    <section className="section" aria-labelledby="pillars-heading">
      <div className="container">
        <SectionHeader
          id="pillars-heading"
          eyebrow="Our model"
          title={
            <>
              One partner to <span className="text-gradient">build, grow, automate and optimize</span>.
            </>
          }
          intro="Four connected pillars. Each one makes the others work harder, so your website, marketing and operations grow together instead of in silos."
        />
        <ol className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = pillarIcons[p.key];
            return (
              <li
                key={p.key}
                className="card reveal relative flex flex-col overflow-hidden p-6"
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="icon-tile">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs text-slate-600">0{i + 1}</span>
                </div>
                <p className="mt-6 font-display text-2xl font-semibold uppercase tracking-wide text-white">{p.label}</p>
                <h3 className="mt-1 text-sm font-medium text-brand-sky">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.desc}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-5">
                  {p.slugs.slice(0, 5).map((slug) => (
                    <li key={slug}>
                      <Link
                        href={`/${slug}`}
                        className="inline-block rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-300 transition hover:border-brand-blue/50 hover:text-white"
                      >
                        {serviceBySlug[slug].name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
