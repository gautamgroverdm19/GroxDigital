/**
 * Rule-based knowledge for the Growth Assistant. It matches visitor messages to
 * intents by keyword and suggests relevant services. It does not use a language
 * model; it can be swapped for an AI backend later without changing the UI.
 */
export type Suggestion = { label: string; href: string };
export type Intent = {
  id: string;
  keywords: string[];
  reply: string;
  suggestions: Suggestion[];
};

export const intents: Intent[] = [
  {
    id: "leads",
    keywords: ["lead", "leads", "enquir", "inquir", "customers", "clients", "sales", "pipeline", "funnel"],
    reply:
      "For more qualified leads, we usually combine targeted ads, a focused landing page, qualification questions and instant follow-up on WhatsApp or email, so good leads don't go cold.",
    suggestions: [
      { label: "Lead Generation", href: "/lead-generation" },
      { label: "Meta Ads", href: "/meta-ads" },
      { label: "Google Ads", href: "/google-ads" },
    ],
  },
  {
    id: "website",
    keywords: ["website", "site", "landing", "wordpress", "redesign", "web page", "webpage", "develop"],
    reply:
      "We design and build fast, conversion-focused websites and landing pages, from business and corporate sites to industry-specific builds and redesigns, with SEO and tracking included.",
    suggestions: [
      { label: "Website Development", href: "/website-development" },
      { label: "Landing Pages", href: "/website-development#landing-pages" },
      { label: "Conversion Optimization", href: "/conversion-optimization" },
    ],
  },
  {
    id: "ecommerce",
    keywords: ["shop", "store", "ecommerce", "e-commerce", "shopify", "woocommerce", "product", "cart"],
    reply:
      "For online stores we can help with the store itself (Shopify or WooCommerce), shopping ads, product page improvements, and cart-recovery and retention automation.",
    suggestions: [
      { label: "E-commerce Growth", href: "/ecommerce" },
      { label: "Email Marketing", href: "/email-marketing" },
    ],
  },
  {
    id: "automation",
    keywords: ["automat", "manual", "repetitive", "workflow", "zapier", "make.com", "n8n", "crm", "integrat", "spreadsheet", "sheets"],
    reply:
      "We automate repetitive work such as lead routing, CRM updates, follow-ups, reminders and reporting, using tools like n8n, Make and Zapier, with AI steps where they help.",
    suggestions: [
      { label: "AI Automation", href: "/ai-automation" },
      { label: "Business Automation", href: "/ai-automation#business-automation" },
    ],
  },
  {
    id: "ai",
    keywords: ["ai", "artificial", "chatbot", "bot", "agent", "gpt", "llm", "machine learning"],
    reply:
      "We help businesses apply AI practically: chat assistants, lead qualification, customer support agents, content systems and custom AI tools, always with human oversight where it matters.",
    suggestions: [
      { label: "AI Solutions", href: "/ai-solutions" },
      { label: "AI Agents", href: "/ai-solutions#ai-agents" },
    ],
  },
  {
    id: "whatsapp",
    keywords: ["whatsapp", "whats app", "broadcast", "wa"],
    reply:
      "We set up WhatsApp Business or the WhatsApp API with automated replies, chatbots, reminders, opt-in campaigns and CRM integration.",
    suggestions: [{ label: "WhatsApp Marketing", href: "/whatsapp-marketing" }],
  },
  {
    id: "local",
    keywords: ["google map", "maps", "local", "near me", "google business", "gbp", "review", "reviews"],
    reply: "To get found locally, we optimise your Google Business Profile, strengthen local SEO and set up an ethical review strategy.",
    suggestions: [
      { label: "Google Business Profile", href: "/google-business-profile" },
      { label: "SEO", href: "/seo" },
    ],
  },
  {
    id: "seo",
    keywords: ["seo", "rank", "ranking", "search engine", "organic", "keyword", "google search"],
    reply:
      "Our SEO work covers technical fixes, on-page optimisation, content strategy and authority building, focused on searches that bring real customers. Nobody can guarantee rankings, but we report progress transparently.",
    suggestions: [
      { label: "SEO", href: "/seo" },
      { label: "Content & Creative", href: "/content-creative" },
    ],
  },
  {
    id: "social",
    keywords: ["social", "instagram", "facebook", "linkedin", "reels", "content", "posts", "youtube"],
    reply:
      "We plan, create and manage social content and campaigns across Instagram, Facebook, LinkedIn and YouTube, tied to clear business goals.",
    suggestions: [
      { label: "Social Media Marketing", href: "/social-media-marketing" },
      { label: "LinkedIn Marketing", href: "/linkedin-marketing" },
      { label: "Content & Creative", href: "/content-creative" },
    ],
  },
  {
    id: "tracking",
    keywords: ["track", "analytics", "ga4", "pixel", "tag manager", "gtm", "dashboard", "report", "conversion api"],
    reply:
      "We set up GA4, Tag Manager, Meta Pixel and Conversion API, call and form tracking, and dashboards, so you know which channels produce leads and sales.",
    suggestions: [{ label: "Analytics & Tracking", href: "/analytics-tracking" }],
  },
  {
    id: "pricing",
    keywords: ["price", "pricing", "cost", "budget", "charge", "fee", "quote", "how much", "package"],
    reply:
      "Pricing depends on scope, so we quote after understanding your goals. Share a few details or book a free consultation and we'll recommend options that fit your budget. Ad spend is always paid directly to the platforms.",
    suggestions: [{ label: "Get a Free Consultation", href: "/contact" }],
  },
  {
    id: "contact",
    keywords: ["contact", "call", "talk", "human", "person", "meeting", "consult", "book", "email", "phone"],
    reply: "Happy to connect you with our team. You can share your details here, or use the contact page to book a free consultation.",
    suggestions: [{ label: "Contact Page", href: "/contact" }],
  },
];

export const fallbackReply =
  "I'm not completely sure I understood. Here are our main areas. Pick one, or share your details and a specialist will get back to you.";

export const fallbackSuggestions: Suggestion[] = [
  { label: "All Services", href: "/services" },
  { label: "Lead Generation", href: "/lead-generation" },
  { label: "AI Automation", href: "/ai-automation" },
  { label: "Website Development", href: "/website-development" },
];

export const quickReplies = [
  "I need more leads",
  "I need a new website",
  "Automate repetitive work",
  "Get found on Google",
  "WhatsApp automation",
  "How much does it cost?",
];

function keywordPattern(k: string) {
  const escaped = k.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Short keywords ("ai", "seo") must be whole words; longer ones match word prefixes ("automat" → "automation").
  return new RegExp(k.trim().length <= 3 ? `\\b${escaped}\\b` : `\\b${escaped}`, "i");
}

const compiled = intents.map((intent) => ({ intent, patterns: intent.keywords.map(keywordPattern) }));

export function matchIntent(text: string): Intent | undefined {
  let best: { intent: Intent; score: number } | undefined;
  for (const { intent, patterns } of compiled) {
    const score = patterns.reduce((n, re) => (re.test(text) ? n + 1 : n), 0);
    if (score && (!best || score > best.score)) best = { intent, score };
  }
  return best?.intent;
}
