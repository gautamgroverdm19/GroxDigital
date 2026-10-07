import type { Pillar, ServicePage } from "../types";
import { contentCreative, ecommerce, websiteDevelopment } from "./build";
import { digitalMarketing, emailMarketing, googleAds, linkedinMarketing, metaAds, seo, socialMediaMarketing } from "./marketing";
import { aiAutomation, aiSolutions, whatsappMarketing } from "./automation";
import { analyticsTracking, conversionOptimization, googleBusinessProfile, leadGeneration } from "./growth";

export const servicePages: ServicePage[] = [
  websiteDevelopment,
  ecommerce,
  digitalMarketing,
  seo,
  metaAds,
  googleAds,
  socialMediaMarketing,
  linkedinMarketing,
  emailMarketing,
  contentCreative,
  leadGeneration,
  googleBusinessProfile,
  aiSolutions,
  aiAutomation,
  whatsappMarketing,
  analyticsTracking,
  conversionOptimization,
];

export const serviceBySlug = Object.fromEntries(servicePages.map((s) => [s.slug, s])) as Record<string, ServicePage>;

export function getService(slug: string): ServicePage | undefined {
  return serviceBySlug[slug];
}

export const pillars: { key: Pillar; label: string; title: string; desc: string; slugs: string[] }[] = [
  {
    key: "build",
    label: "Build",
    title: "Websites & Digital Experiences",
    desc: "Fast, credible websites, landing pages and online stores that turn visitors into enquiries.",
    slugs: ["website-development", "ecommerce", "content-creative"],
  },
  {
    key: "grow",
    label: "Grow",
    title: "SEO, Ads, Social Media & Lead Generation",
    desc: "Campaigns and content that reach the right people and bring qualified leads into your pipeline.",
    slugs: [
      "digital-marketing",
      "seo",
      "meta-ads",
      "google-ads",
      "social-media-marketing",
      "linkedin-marketing",
      "email-marketing",
      "lead-generation",
      "google-business-profile",
    ],
  },
  {
    key: "automate",
    label: "Automate",
    title: "AI, WhatsApp & Business Automation",
    desc: "AI assistants and automated workflows that respond faster and remove repetitive work.",
    slugs: ["ai-solutions", "ai-automation", "whatsapp-marketing"],
  },
  {
    key: "optimize",
    label: "Optimize",
    title: "Analytics, CRO & Continuous Growth",
    desc: "Tracking, reporting and conversion improvements that make every channel perform better over time.",
    slugs: ["analytics-tracking", "conversion-optimization"],
  },
];
