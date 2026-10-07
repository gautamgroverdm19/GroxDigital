import type { Metadata } from "next";
import { absoluteUrl, isPlaceholder, site } from "./site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Use the title exactly as given (skip the "| Groxdigital" template). */
  absoluteTitle?: boolean;
  noindex?: boolean;
  type?: "website" | "article";
};

export function buildMetadata({ title, description, path, absoluteTitle, noindex, type = "website" }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

export function organizationSchema() {
  const sameAs = Object.values(site.social).filter((v) => !isPlaceholder(v));
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/icon.svg"),
    description: site.description,
  };
  if (sameAs.length) schema.sameAs = sameAs;
  if (!isPlaceholder(site.contact.email)) {
    schema.contactPoint = {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.contact.email,
      ...(isPlaceholder(site.contact.phone) ? {} : { telephone: site.contact.phone }),
    };
  }
  return schema;
}

/** Only emitted once a real street address has been configured. */
export function localBusinessSchema() {
  if (isPlaceholder(site.address.streetAddress)) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#localbusiness"),
    name: site.name,
    url: site.url,
    image: absoluteUrl("/opengraph-image"),
    ...(isPlaceholder(site.contact.phone) ? {} : { telephone: site.contact.phone }),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.streetAddress,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: site.name,
    url: site.url,
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function serviceSchema(opts: { name: string; description: string; path: string; offers: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    serviceType: opts.name,
    provider: { "@id": absoluteUrl("/#organization") },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: opts.name,
      itemListElement: opts.offers.map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o },
      })),
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema(opts: { title: string; description: string; path: string; datePublished: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: absoluteUrl(opts.path),
    datePublished: opts.datePublished,
    author: { "@id": absoluteUrl("/#organization") },
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}
