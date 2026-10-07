import { Info } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Ph, Val } from "@/components/ui/Placeholder";
import { site } from "@/lib/site";

export function LegalPage({ title, path, intro, children }: { title: string; path: string; intro: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero title={title} intro={intro} breadcrumbs={[{ name: title, path }]}>
        <p className="mt-6 text-sm text-slate-500">
          Last updated: <Val value={site.legal.lastUpdated} />
        </p>
      </PageHero>
      <div className="container pb-24">
        <div className="mb-10 flex max-w-prose items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/[0.06] p-4 text-sm text-amber-100">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            This document is a template. Highlighted placeholders must be completed, and the full text should be reviewed by a qualified
            legal professional for your jurisdiction before publication.
          </p>
        </div>
        <div className="prose-content">{children}</div>
      </div>
    </>
  );
}

/** Company identity block reused across legal documents. */
export function CompanyDetails() {
  return (
    <ul>
      <li>
        Legal entity: <Val value={site.legalName} /> (trading as {site.name})
      </li>
      <li>
        Registration number: <Val value={site.legal.registrationNumber} />
      </li>
      <li>
        Tax registration: <Val value={site.legal.taxId} />
      </li>
      <li>
        Registered address: <Ph>[Registered Office Address]</Ph>
      </li>
      <li>
        Email: <Val value={site.contact.email} />
      </li>
    </ul>
  );
}
