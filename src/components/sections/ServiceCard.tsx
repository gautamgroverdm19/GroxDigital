import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServicePage } from "@/content/types";

export function ServiceCard({ service, delay = 0 }: { service: ServicePage; delay?: number }) {
  const Icon = service.icon;
  return (
    <Link
      href={`/${service.slug}`}
      className="card card-hover reveal group flex h-full flex-col p-6"
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      <span className="icon-tile">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-semibold">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{service.summary}</p>
      <span className="link-arrow mt-5">
        Explore Service
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
