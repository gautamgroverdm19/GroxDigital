import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries } from "@/content/industries";
import { serviceBySlug } from "@/content/services";

export function IndustryGrid({ detailed = false, limit }: { detailed?: boolean; limit?: number }) {
  const list = limit ? industries.slice(0, limit) : industries;
  return (
    <ul className={`grid gap-3 ${detailed ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"}`}>
      {list.map((ind, i) => {
        const Icon = ind.icon;
        return (
          <li
            key={ind.name}
            className={`card card-hover reveal ${detailed ? "p-6" : "flex flex-col items-start gap-3 p-4"}`}
            style={{ ["--reveal-delay" as string]: `${(i % 6) * 50}ms` }}
          >
            <span className={`icon-tile ${detailed ? "" : "h-9 w-9 rounded-lg"}`}>
              <Icon className={detailed ? "h-5 w-5" : "h-4 w-4"} aria-hidden="true" />
            </span>
            <h3 className={`${detailed ? "mt-5 text-lg" : "text-sm"} font-semibold leading-snug`}>{ind.name}</h3>
            {detailed && (
              <>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{ind.desc}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Often starts with</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {ind.services.map((slug) => (
                    <li key={slug}>
                      <Link
                        href={`/${slug}`}
                        className="inline-block rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-300 hover:border-brand-blue/50 hover:text-white"
                      >
                        {serviceBySlug[slug].name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        );
      })}
      {!detailed && (
        <li className="reveal col-span-2 sm:col-span-3 lg:col-span-4 xl:col-span-6">
          <Link
            href="/contact"
            className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-dashed border-white/15 p-5 transition hover:border-brand-blue/50 sm:flex-row sm:items-center"
          >
            <span className="font-medium text-white">Don&apos;t see your industry? Let&apos;s discuss your requirements.</span>
            <span className="link-arrow">
              Discuss Your Business <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        </li>
      )}
    </ul>
  );
}
