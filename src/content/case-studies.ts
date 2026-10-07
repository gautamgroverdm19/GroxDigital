/**
 * DEMO CASE STUDIES — PLACEHOLDERS ONLY.
 *
 * These entries illustrate the structure of a case study. They do not describe
 * real clients, and every result is a placeholder. Replace each entry with a
 * real, verified project (and client permission) before presenting it as work.
 * Never add revenue, ROAS, lead, ranking, traffic or conversion figures that
 * have not been verified.
 */
export type CaseStudy = {
  slug: string;
  demo: boolean;
  title: string;
  client: string;
  industry: string;
  summary: string;
  challenge: string;
  strategy: string[];
  services: string[];
  solution: string[];
  results: { label: string; value: string }[];
  screenshots: { alt: string }[];
  learnings: string[];
};

const resultPlaceholder = "[Add verified result]";

export const caseStudies: CaseStudy[] = [
  {
    slug: "demo-real-estate-lead-system",
    demo: true,
    title: "Lead generation and WhatsApp follow-up for a residential project",
    client: "[Client / Project Name]",
    industry: "Real Estate",
    summary:
      "An example of how a real-estate developer could combine targeted ads, a project landing page and WhatsApp automation to qualify buyers before site visits.",
    challenge:
      "The sales team received many enquiries from ads, but a large share were outside budget or not ready to buy, and slow follow-up meant genuine buyers were often contacted too late.",
    strategy: [
      "Define buyer profiles by budget, location and purchase timeline",
      "Replace generic lead forms with a project landing page and qualifying questions",
      "Respond to every enquiry instantly on WhatsApp",
      "Route qualified leads to the right sales executive in the CRM",
    ],
    services: ["meta-ads", "website-development", "whatsapp-marketing", "ai-automation"],
    solution: [
      "Project landing page with floor plans, location highlights and a short qualification form",
      "Meta campaigns segmented by audience and creative angle",
      "Automated WhatsApp welcome message with brochure and site-visit booking link",
      "CRM integration with lead scoring and automatic assignment",
    ],
    results: [
      { label: "Qualified leads", value: resultPlaceholder },
      { label: "Cost per qualified lead", value: resultPlaceholder },
      { label: "Average first-response time", value: resultPlaceholder },
      { label: "Site visits booked", value: resultPlaceholder },
    ],
    screenshots: [{ alt: "Project landing page — screenshot placeholder" }, { alt: "WhatsApp follow-up flow — screenshot placeholder" }],
    learnings: [
      "Qualifying questions reduce lead volume but tend to improve the sales team's time per opportunity.",
      "Response speed matters as much as targeting for high-consideration purchases.",
    ],
  },
  {
    slug: "demo-clinic-local-visibility",
    demo: true,
    title: "Local visibility and appointment automation for a multi-specialty clinic",
    client: "[Client / Project Name]",
    industry: "Healthcare / Clinics",
    summary:
      "An example of how a clinic could improve its Google Business Profile, website and booking journey while reducing no-shows with automated reminders.",
    challenge:
      "Patients struggled to find accurate information online, the front desk spent hours answering repetitive calls, and missed appointments disrupted the schedule.",
    strategy: [
      "Optimise Google Business Profile categories, services and photos",
      "Create clear service and doctor pages on the website",
      "Introduce online booking with automated confirmations and reminders",
      "Request reviews from patients after appointments, ethically and with consent",
    ],
    services: ["google-business-profile", "website-development", "whatsapp-marketing", "ai-solutions"],
    solution: [
      "Restructured website with service, doctor and location pages",
      "Google Business Profile optimisation and local citations",
      "WhatsApp confirmations and reminders for appointments",
      "An FAQ assistant for timings, location and preparation instructions",
    ],
    results: [
      { label: "Calls from Google profile", value: resultPlaceholder },
      { label: "Online bookings", value: resultPlaceholder },
      { label: "No-show rate", value: resultPlaceholder },
      { label: "Front-desk time saved", value: resultPlaceholder },
    ],
    screenshots: [
      { alt: "Clinic website service page — screenshot placeholder" },
      { alt: "Appointment reminder flow — screenshot placeholder" },
    ],
    learnings: [
      "Accurate, complete profile information reduces repetitive enquiries.",
      "Reminders are most effective when they include clear preparation and rescheduling options.",
    ],
  },
  {
    slug: "demo-ecommerce-retention",
    demo: true,
    title: "Tracking rebuild and retention automation for a D2C brand",
    client: "[Client / Project Name]",
    industry: "E-commerce",
    summary:
      "An example of how an online store could fix its tracking, improve product pages and introduce automated retention flows to make paid acquisition more efficient.",
    challenge:
      "Advertising costs were rising, platform reports didn't match store sales, and most customers bought once and never returned.",
    strategy: [
      "Audit and rebuild analytics, Meta Pixel and Conversion API tracking",
      "Improve product pages based on customer questions and heatmap insights",
      "Launch abandoned cart, post-purchase and win-back automations",
      "Restructure campaigns around accurate purchase data",
    ],
    services: ["analytics-tracking", "conversion-optimization", "email-marketing", "meta-ads"],
    solution: [
      "GA4, Google Tag Manager, Meta Pixel and Conversion API implementation",
      "Product page improvements: clearer benefits, sizing help and trust signals",
      "Email and WhatsApp flows for cart recovery and repeat purchase",
      "A weekly dashboard showing revenue by channel",
    ],
    results: [
      { label: "Return on ad spend", value: resultPlaceholder },
      { label: "Conversion rate", value: resultPlaceholder },
      { label: "Repeat purchase rate", value: resultPlaceholder },
      { label: "Revenue from automations", value: resultPlaceholder },
    ],
    screenshots: [
      { alt: "Marketing dashboard — screenshot placeholder" },
      { alt: "Product page before and after — screenshot placeholder" },
    ],
    learnings: [
      "Reliable tracking is a prerequisite for making confident budget decisions.",
      "Retention automation helps make acquisition costs more sustainable over time.",
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
