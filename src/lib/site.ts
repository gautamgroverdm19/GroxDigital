/**
 * Central business information for Groxdigital.
 *
 * Every value wrapped in [SQUARE BRACKETS] is a placeholder that must be
 * replaced with real, verified information before launch. Components check
 * `isPlaceholder()` so unfinished details are never turned into broken links
 * (e.g. a WhatsApp button falls back to the contact page until a number is set).
 */

export const site = {
  name: "Groxdigital",
  legalName: "[Registered Legal Entity Name]",
  tagline: "Digital Growth, AI & Automation Solutions for Modern Businesses.",
  description: "Groxdigital helps businesses build, market, automate and scale with modern websites, digital marketing, AI and automation.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com").replace(/\/$/, ""),
  locale: "en",

  contact: {
    email: "[hello@your-domain.com]",
    phone: "[+00 00000 00000]",
    /** Digits only, with country code, e.g. "919876543210". Leave as placeholder until available. */
    whatsapp: "[WHATSAPP_NUMBER]",
    whatsappMessage: "Hi Groxdigital, I'd like to discuss a project.",
    hours: "[Business hours, e.g. Mon–Fri, 10:00–18:00]",
  },

  /** Set `streetAddress` to a real address to enable LocalBusiness schema. */
  address: {
    streetAddress: "[Street Address]",
    locality: "[City]",
    region: "[State / Region]",
    postalCode: "[Postal Code]",
    country: "[Country]",
  },

  /** Social profile URLs. Leave as placeholder and the icon is hidden. */
  social: {
    linkedin: "[LINKEDIN_URL]",
    instagram: "[INSTAGRAM_URL]",
    facebook: "[FACEBOOK_URL]",
    x: "[X_URL]",
    youtube: "[YOUTUBE_URL]",
  },

  legal: {
    registrationNumber: "[Company Registration Number]",
    taxId: "[Tax / GST Number, if applicable]",
    jurisdiction: "[Governing Law Jurisdiction]",
    grievanceOfficer: "[Name of Grievance / Privacy Officer]",
    lastUpdated: "[Date of last update]",
  },
} as const;

export function isPlaceholder(value: string | undefined | null): boolean {
  return !value || /^\[.*\]$/.test(value.trim());
}

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** WhatsApp click-to-chat link, or the contact page while the number is a placeholder. */
export function whatsappHref(message: string = site.contact.whatsappMessage): string {
  if (isPlaceholder(site.contact.whatsapp)) return "/contact";
  const digits = site.contact.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function hasWhatsapp(): boolean {
  return !isPlaceholder(site.contact.whatsapp);
}
