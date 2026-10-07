import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Backdrop } from "./Backdrop";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  breadcrumbs?: Crumb[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  children?: React.ReactNode;
};

export function PageHero({ eyebrow, title, intro, breadcrumbs, primaryCta, secondaryCta, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pt-40">
      <Backdrop variant="soft" />
      <div className="container">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className={`max-w-3xl animate-fade-up ${breadcrumbs ? "mt-8" : ""}`}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className={`h-display ${eyebrow ? "mt-5" : ""}`}>{title}</h1>
          {intro && <p className="lead mt-6 max-w-2xl">{intro}</p>}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primaryCta && (
                <Link href={primaryCta.href} className="btn-accent px-6 py-3.5">
                  {primaryCta.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href} className="btn-ghost px-6 py-3.5">
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
