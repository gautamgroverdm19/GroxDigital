import type { LucideIcon } from "lucide-react";
import type { FlowStep } from "@/components/sections/FlowDiagram";
import type { FaqItem } from "@/components/sections/Faq";

export type Pillar = "build" | "grow" | "automate" | "optimize";

export type TitledText = { title: string; desc: string };

export type ServiceGroup = {
  /** Anchor id so menus can deep-link (e.g. /website-development#landing-pages). */
  id?: string;
  title: string;
  desc: string;
  items: string[];
  /** Optional dedicated page for this group. */
  href?: string;
};

export type ServicePage = {
  slug: string;
  name: string;
  pillar: Pillar;
  icon: LucideIcon;
  /** One-line description for service cards. */
  summary: string;
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; intro: string; primaryCta?: string };
  problem: { title: string; intro: string; points: TitledText[] };
  solution: { title: string; body: string; points: string[] };
  services: { title: string; intro: string; groups: ServiceGroup[] };
  benefits: TitledText[];
  howItWorks: { title: string; intro: string; steps: FlowStep[] };
  /** Additional visual workflow examples. */
  workflows?: { title: string; steps: FlowStep[] }[];
  /** A highlighted feature section, e.g. "AI Agents for Your Business". */
  spotlight?: { id: string; eyebrow: string; title: string; intro: string; items: TitledText[] };
  useCases: TitledText[];
  faqs: FaqItem[];
  related: string[];
  cta?: { title: string; intro?: string; primary?: string };
};
