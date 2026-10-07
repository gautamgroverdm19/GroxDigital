import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/content/case-studies";
import { serviceBySlug } from "@/content/services";

export function CaseStudyCard({ study, delay = 0 }: { study: CaseStudy; delay?: number }) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="card card-hover reveal group flex h-full flex-col overflow-hidden"
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-white/[0.06] bg-ink-800">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(70% 90% at 20% 10%, rgba(56,189,248,0.22), transparent 60%), radial-gradient(60% 80% at 90% 90%, rgba(139,92,246,0.25), transparent 60%)",
          }}
        />
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <span className="absolute left-4 top-4 rounded-full border border-amber-400/40 bg-ink-950/70 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-amber-200">
          {study.demo ? "Demo · placeholder" : study.industry}
        </span>
        <span className="absolute bottom-4 left-4 text-xs text-slate-400">Screenshot placeholder</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-sky">{study.industry}</p>
        <h3 className="mt-2 text-lg font-semibold leading-snug">{study.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{study.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {study.services.map((s) => (
            <li key={s} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-400">
              {serviceBySlug[s]?.name}
            </li>
          ))}
        </ul>
        <span className="link-arrow mt-5">
          View case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
