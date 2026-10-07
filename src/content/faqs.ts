import type { FaqItem } from "@/components/sections/Faq";

export const faqCategories: { title: string; faqs: FaqItem[] }[] = [
  {
    title: "Working with us",
    faqs: [
      {
        q: "What does Groxdigital do?",
        a: "Groxdigital is a digital growth, AI and automation partner. We build websites and digital experiences, run SEO, paid ads, social and lead generation, implement AI and business automation, and improve performance through analytics and conversion optimisation.",
      },
      {
        q: "What kinds of businesses do you work with?",
        a: "Startups, local businesses, e-commerce brands, service businesses, professionals and B2B companies across industries such as real estate, healthcare, education, finance, immigration, hospitality and retail. If you don't see your industry, get in touch and we'll discuss your requirements.",
      },
      {
        q: "Do I have to use all of your services?",
        a: "No. You can start with a single service, such as a website or Google Ads, and add more later. We'll always recommend what's most useful for your goals and budget, not the biggest package.",
      },
      {
        q: "How do we get started?",
        a: "Book a free consultation. We'll learn about your business and goals, then recommend a plan with clear scope, timeline and pricing. There's no obligation.",
      },
      {
        q: "Do you work with clients remotely?",
        a: "Yes. We work with clients remotely using video calls, shared documents and project tools, and keep you updated throughout.",
      },
    ],
  },
  {
    title: "Pricing & results",
    faqs: [
      {
        q: "How much do your services cost?",
        a: "Pricing depends on scope, complexity and the level of ongoing support you need. After the consultation, we provide a clear proposal so you know exactly what's included.",
      },
      {
        q: "Is advertising spend included in your fees?",
        a: "No. Advertising spend is paid directly to platforms such as Meta, Google and LinkedIn from your own accounts. Our fees cover strategy, setup, creative, management and optimisation.",
      },
      {
        q: "Do you guarantee results?",
        a: "We don't guarantee specific rankings, leads, sales or returns, because results depend on many factors including your market, offer, budget and competition. We do commit to a clear strategy, honest reporting and continuous improvement.",
      },
      {
        q: "How do you report on progress?",
        a: "Through regular reports and dashboards focused on the metrics that matter for your goals, explained in plain language with recommended next steps.",
      },
    ],
  },
  {
    title: "AI & automation",
    faqs: [
      {
        q: "Is AI right for my business?",
        a: "AI is useful when it's applied to specific tasks such as answering common questions, qualifying leads, drafting content or processing data. We'll help you identify where it can genuinely help and where it isn't needed.",
      },
      {
        q: "Will automation replace my team?",
        a: "Our aim is to remove repetitive work so your team can focus on customers, decisions and growth. Most solutions include clear points where a person reviews or takes over.",
      },
      {
        q: "Which automation tools do you use?",
        a: "We work with tools such as n8n, Make, Zapier, popular CRMs, Google Workspace, WhatsApp Business Platform and custom API integrations, choosing the right option for each workflow.",
      },
    ],
  },
  {
    title: "Ownership & data",
    faqs: [
      {
        q: "Who owns the website and ad accounts?",
        a: "You do. Websites, domains, ad accounts, analytics and content are set up under your ownership, with access granted to us for the work. Specific terms are confirmed in your agreement.",
      },
      {
        q: "How do you handle our data?",
        a: "We only access the data we need for the work, use appropriate security practices and follow the commitments in our Privacy Policy and your agreement.",
      },
    ],
  },
];

export const homeFaqs: FaqItem[] = [
  faqCategories[0].faqs[0],
  faqCategories[0].faqs[2],
  faqCategories[1].faqs[0],
  faqCategories[1].faqs[2],
  faqCategories[2].faqs[0],
  faqCategories[0].faqs[3],
];
