/** Shared lead shape and validation used by the contact form, the assistant and the API route. */

export const industryOptions = [
  "E-commerce",
  "Real Estate",
  "Healthcare / Clinics",
  "Education",
  "Finance / CA",
  "Professional Services",
  "Immigration & Visa",
  "Restaurants / Hospitality",
  "Retail",
  "Beauty & Wellness",
  "Startup / SaaS",
  "Coach / Consultant / Personal Brand",
  "B2B",
  "Other",
] as const;

export const serviceOptions = [
  "Website Development",
  "E-commerce",
  "SEO",
  "Meta Ads",
  "Google Ads",
  "Social Media Marketing",
  "LinkedIn Marketing",
  "Email Marketing",
  "WhatsApp Marketing & Automation",
  "AI Solutions / AI Agents",
  "AI & Business Automation",
  "Google Business Profile / Local SEO",
  "Lead Generation",
  "Content & Creative",
  "Analytics & Tracking",
  "Conversion Rate Optimization",
  "Not sure yet",
] as const;

export const budgetOptions = [
  "Not sure yet",
  "[Budget range 1 — set in src/lib/leads.ts]",
  "[Budget range 2]",
  "[Budget range 3]",
  "[Budget range 4]",
] as const;

export type Lead = {
  name: string;
  businessName?: string;
  email: string;
  phone?: string;
  website?: string;
  industry?: string;
  services?: string[];
  budget?: string;
  message?: string;
  source: "contact-form" | "assistant";
  page?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLead(input: unknown): { ok: true; lead: Lead } | { ok: false; errors: Record<string, string> } {
  const data = (input ?? {}) as Record<string, unknown>;
  const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const errors: Record<string, string> = {};

  const lead: Lead = {
    name: str(data.name, 120),
    businessName: str(data.businessName, 160) || undefined,
    email: str(data.email, 200),
    phone: str(data.phone, 40) || undefined,
    website: str(data.website, 300) || undefined,
    industry: str(data.industry, 80) || undefined,
    services: Array.isArray(data.services)
      ? data.services
          .map((s) => str(s, 80))
          .filter(Boolean)
          .slice(0, 20)
      : undefined,
    budget: str(data.budget, 80) || undefined,
    message: str(data.message, 5000) || undefined,
    source: data.source === "assistant" ? "assistant" : "contact-form",
    page: str(data.page, 300) || undefined,
  };

  if (lead.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(lead.email)) errors.email = "Please enter a valid email address.";
  if (lead.phone && !/^[+\d][\d\s().-]{5,}$/.test(lead.phone)) errors.phone = "Please enter a valid phone number.";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, lead };
}
