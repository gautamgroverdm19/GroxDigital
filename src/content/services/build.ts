import {
  Brush,
  Code2,
  FileText,
  Globe,
  LayoutTemplate,
  MousePointerClick,
  PenTool,
  Rocket,
  Search,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import type { ServicePage } from "../types";

export const websiteDevelopment: ServicePage = {
  slug: "website-development",
  name: "Website Development",
  pillar: "build",
  icon: Globe,
  summary: "Fast, modern websites and landing pages designed to turn visitors into enquiries and customers.",
  meta: {
    title: "Website Development — Business, E-commerce & Landing Pages",
    description:
      "Groxdigital designs and builds fast, SEO-ready business websites, landing pages, e-commerce stores and custom web apps that are built to convert visitors into leads.",
  },
  hero: {
    eyebrow: "Website Development",
    title: "Websites built to win trust and generate enquiries.",
    intro:
      "Your website is usually the first serious impression a customer has of your business. We design and build fast, clear, conversion-focused websites that explain what you do, earn trust quickly and make it easy to get in touch.",
    primaryCta: "Start Your Project",
  },
  problem: {
    title: "Most business websites look fine and still don't perform.",
    intro: "A website that doesn't bring in enquiries is a cost, not an asset. These are the issues we see most often.",
    points: [
      {
        title: "Slow and dated",
        desc: "Pages take too long to load, especially on mobile, and visitors leave before they see your offer.",
      },
      {
        title: "Unclear message",
        desc: "Visitors can't tell within a few seconds what you do, who it's for and why they should choose you.",
      },
      {
        title: "No path to action",
        desc: "Weak or missing calls to action, long forms and no WhatsApp or booking option mean lost leads.",
      },
      {
        title: "Invisible to search",
        desc: "Poor structure, missing metadata and no tracking make it hard to rank and impossible to measure.",
      },
    ],
  },
  solution: {
    title: "A website that works as your best salesperson.",
    body: "We start with your customers and your goals, then design every page around a clear message and an obvious next step. The result is a site that's quick, easy to manage and connected to the rest of your marketing: analytics, CRM, WhatsApp and automation.",
    points: [
      "Strategy, structure and copy planned before design begins",
      "Mobile-first, accessible and built for Core Web Vitals",
      "SEO foundations: clean URLs, metadata, schema and sitemaps",
      "Analytics, pixels and conversion tracking set up from day one",
      "Forms connected to your CRM, email or WhatsApp",
      "A site your team can update without calling a developer",
    ],
  },
  services: {
    title: "Website services",
    intro: "From a single high-converting landing page to a full corporate site or online store.",
    groups: [
      {
        id: "business-websites",
        title: "Business & Corporate Websites",
        desc: "Professional websites that position your business clearly and generate enquiries.",
        items: [
          "Business Website Development",
          "Corporate Website Development",
          "Service Business Websites",
          "Portfolio Websites",
          "Personal Branding Websites",
          "WordPress Development",
          "Custom Website Development",
        ],
      },
      {
        id: "landing-pages",
        title: "Landing Pages",
        desc: "Focused pages for campaigns, offers and lead generation, built to be tested and improved.",
        items: ["Landing Page Development", "Conversion-Focused Landing Pages", "Campaign & Offer Pages", "Lead Magnet Pages"],
      },
      {
        id: "industry-websites",
        title: "Industry Websites",
        desc: "Websites shaped around how customers in your industry research and decide.",
        items: [
          "Real Estate Websites",
          "Restaurant Websites",
          "Clinic / Hospital Websites",
          "Education Websites",
          "Immigration Consultant Websites",
          "Finance / CA Websites",
          "Hotel / Hospitality Websites",
        ],
      },
      {
        id: "ecommerce-websites",
        title: "E-commerce",
        desc: "Online stores designed for browsing, trust and checkout.",
        items: ["E-commerce Website Development", "Shopify Development", "WooCommerce Development", "Product Page Design"],
        href: "/ecommerce",
      },
      {
        id: "ai-websites",
        title: "AI-Powered & Custom Builds",
        desc: "Smarter websites and bespoke web tools for teams that need more than a brochure site.",
        items: [
          "AI-Powered Website Creation",
          "AI Chat Assistants on Your Site",
          "SaaS / MVP Development",
          "Custom Business Tools & Portals",
          "API Integrations",
        ],
      },
      {
        id: "redesign-maintenance",
        title: "Redesign & Maintenance",
        desc: "Modernise an existing site and keep it secure, fast and up to date.",
        items: ["Website Redesign", "Website Maintenance", "Speed & Performance Optimization", "Security Updates & Backups"],
      },
    ],
  },
  benefits: [
    { title: "Clear first impression", desc: "Visitors understand what you do and why it matters within seconds." },
    { title: "Fast on every device", desc: "Lean builds, optimised images and modern hosting for quick load times." },
    { title: "Ready for search", desc: "Technical SEO foundations so your pages can be found and indexed properly." },
    { title: "Measurable", desc: "Every form, call and WhatsApp click can be tracked back to its source." },
    { title: "Connected", desc: "Leads flow into your CRM, inbox or WhatsApp automatically." },
    { title: "Easy to grow", desc: "A scalable structure that's simple to extend with new pages and features." },
  ],
  howItWorks: {
    title: "How a website project runs",
    intro: "A clear, collaborative process so you always know what's happening and what's next.",
    steps: [
      { label: "Discovery", desc: "Goals, audience, competitors", icon: Search },
      { label: "Sitemap & Copy", desc: "Structure and messaging", icon: FileText },
      { label: "Design", desc: "Wireframes to visual design", icon: PenTool },
      { label: "Development", desc: "Build, integrate, test", icon: Code2 },
      { label: "Launch", desc: "Tracking, SEO, go-live", icon: Rocket },
    ],
  },
  useCases: [
    {
      title: "A clinic that needs online bookings",
      desc: "Service pages, doctor profiles and a booking flow connected to WhatsApp reminders.",
    },
    { title: "A consultant building authority", desc: "A personal brand site with case studies, insights and a simple consultation form." },
    {
      title: "A real-estate firm with many listings",
      desc: "Searchable property pages, enquiry forms per listing and lead routing to the sales team.",
    },
    {
      title: "A business with an outdated site",
      desc: "A redesign that keeps what ranks, fixes what doesn't and improves speed and conversions.",
    },
  ],
  faqs: [
    {
      q: "How long does a website take to build?",
      a: "It depends on scope. A focused landing page can take a couple of weeks, while a multi-page business or e-commerce website usually takes longer. We'll give you a realistic timeline after the discovery call.",
    },
    {
      q: "Which platform will you use?",
      a: "We recommend the platform that suits your needs and team: WordPress for easy content editing, Shopify or WooCommerce for stores, or a custom Next.js build when performance and flexibility matter most.",
    },
    {
      q: "Will I be able to update the website myself?",
      a: "Yes. We set up an editing experience your team can use for everyday changes and walk you through it before handover.",
    },
    {
      q: "Do you write the website content?",
      a: "We can. Our team can plan the messaging and write conversion-focused copy, or we can refine content you already have.",
    },
    {
      q: "Do you offer maintenance after launch?",
      a: "Yes. We offer ongoing maintenance covering updates, backups, security, performance checks and small content changes.",
    },
  ],
  related: ["ecommerce", "conversion-optimization", "seo", "analytics-tracking"],
  cta: { title: "Ready for a website that actually brings in business?", primary: "Start Your Project" },
};

export const ecommerce: ServicePage = {
  slug: "ecommerce",
  name: "E-commerce Growth",
  pillar: "build",
  icon: ShoppingCart,
  summary: "Stores, ads, retention and automation working together to grow online sales.",
  meta: {
    title: "E-commerce Growth — Shopify, WooCommerce, Ads & Retention",
    description:
      "Build and grow your online store with Groxdigital: Shopify and WooCommerce development, e-commerce SEO, Meta and Google Shopping ads, CRO, email, WhatsApp and retention automation.",
  },
  hero: {
    eyebrow: "E-commerce Growth",
    title: "Build a store that sells, then keep customers coming back.",
    intro:
      "Growing an online store takes more than traffic. We connect the store, the ads, the follow-up and the data so each part supports the others, from first visit to repeat purchase.",
    primaryCta: "Discuss Your Store",
  },
  problem: {
    title: "Where online stores usually leak revenue",
    intro: "Most stores don't have a single big problem. They have several small ones that add up.",
    points: [
      {
        title: "Paid traffic that doesn't convert",
        desc: "Ad spend rises while product pages, trust signals and checkout hold sales back.",
      },
      { title: "Abandoned carts with no follow-up", desc: "Shoppers who were ready to buy never hear from you again." },
      { title: "One-time customers", desc: "No retention system means paying to acquire the same customer twice." },
      { title: "Unreliable data", desc: "Broken pixels and missing events make it hard to know which campaigns actually drive sales." },
    ],
  },
  solution: {
    title: "One connected e-commerce growth system",
    body: "We look at the full journey: how people find you, how your product pages persuade, how checkout performs and what happens after the first order. Then we fix the weakest links first.",
    points: [
      "Store builds and improvements on Shopify or WooCommerce",
      "Product pages written and designed to answer buying questions",
      "Meta and Google Shopping campaigns with clean tracking",
      "Abandoned cart, post-purchase and win-back automation",
      "Email and WhatsApp retention flows",
      "Dashboards that show revenue by channel",
    ],
  },
  services: {
    title: "E-commerce services",
    intro: "Pick a single service or let us run the whole growth system.",
    groups: [
      {
        title: "Store Development",
        desc: "Fast, trustworthy stores that are easy to manage.",
        items: ["E-commerce Website Development", "Shopify Development", "WooCommerce Development", "Product Page Optimization"],
      },
      {
        title: "Traffic & Acquisition",
        desc: "Reach shoppers who are ready to buy.",
        items: ["E-commerce SEO", "Meta Ads", "Google Shopping Ads", "Remarketing Campaigns"],
      },
      {
        title: "Conversion & Retention",
        desc: "Turn more visitors into buyers and buyers into repeat customers.",
        items: [
          "Conversion Rate Optimization",
          "Abandoned Cart Automation",
          "Email Marketing",
          "WhatsApp Marketing",
          "Customer Retention Automation",
        ],
      },
      {
        title: "Measurement",
        desc: "Know what's working and where to invest next.",
        items: ["Analytics & Tracking", "Meta Pixel & Conversion API", "E-commerce Dashboards"],
        href: "/analytics-tracking",
      },
    ],
  },
  benefits: [
    { title: "Higher conversion potential", desc: "Better product pages and a smoother checkout make the most of existing traffic." },
    { title: "Recovered sales", desc: "Automated reminders bring back shoppers who abandoned their carts." },
    { title: "More repeat orders", desc: "Retention flows keep your brand in front of past customers." },
    { title: "Smarter ad spend", desc: "Accurate tracking helps you shift budget toward what's profitable." },
  ],
  howItWorks: {
    title: "The e-commerce growth loop",
    intro: "Each stage feeds the next, and the data from every stage helps improve the whole loop.",
    steps: [
      { label: "Attract", desc: "SEO, Meta & Shopping ads", icon: Target },
      { label: "Convert", desc: "Product pages & checkout", icon: MousePointerClick },
      { label: "Recover", desc: "Cart & browse reminders", icon: TrendingUp },
      { label: "Retain", desc: "Email & WhatsApp flows", icon: Users },
      { label: "Measure", desc: "Revenue by channel", icon: Sparkles },
    ],
  },
  useCases: [
    { title: "A new D2C brand launching online", desc: "Store setup, launch campaigns and the essential automations from day one." },
    { title: "An established store with rising ad costs", desc: "Tracking audit, creative refresh and CRO to improve return on spend." },
    { title: "A retailer moving online", desc: "Catalogue setup, local delivery options and WhatsApp ordering support." },
    { title: "A store with lots of one-time buyers", desc: "Post-purchase, replenishment and win-back flows to increase repeat orders." },
  ],
  faqs: [
    {
      q: "Shopify or WooCommerce: which is better?",
      a: "Shopify is usually simpler to run and scale; WooCommerce offers more control and suits businesses already on WordPress. We'll recommend one based on your catalogue, budget and team.",
    },
    {
      q: "Can you improve my existing store instead of rebuilding it?",
      a: "Yes. Often the best first step is an audit and targeted improvements to product pages, speed, checkout and tracking rather than a full rebuild.",
    },
    {
      q: "Do you manage ad budgets?",
      a: "We plan and manage campaigns on your ad accounts. Ad spend is paid directly by you to the platform, separate from our fees.",
    },
    {
      q: "Can abandoned cart reminders be sent on WhatsApp?",
      a: "Yes, using the WhatsApp Business API with approved message templates and customer opt-in, alongside or instead of email.",
    },
  ],
  related: ["meta-ads", "google-ads", "email-marketing", "conversion-optimization"],
};

export const contentCreative: ServicePage = {
  slug: "content-creative",
  name: "Content & Creative",
  pillar: "build",
  icon: Brush,
  summary: "Copy, creatives and AI-assisted content that make your marketing clearer and more persuasive.",
  meta: {
    title: "Content & Creative — Copywriting, Ad Creatives & AI Content",
    description:
      "Website and landing page copy, ad copywriting and creatives, SEO blog content, social media content, reels scripts and AI-assisted image and video concepts from Groxdigital.",
  },
  hero: {
    eyebrow: "Content & Creative",
    title: "Content that's clear, on-brand and made to perform.",
    intro:
      "Good marketing needs a steady supply of good content. We combine strategy, experienced writing and AI-assisted production to create copy and creatives that sound like you and move people to act.",
  },
  problem: {
    title: "Content is usually the bottleneck",
    intro: "Campaigns stall and channels go quiet when content can't keep up.",
    points: [
      { title: "Inconsistent output", desc: "Posting and publishing happen in bursts, then stop for weeks." },
      { title: "Generic messaging", desc: "Copy that could belong to any competitor gives customers no reason to choose you." },
      { title: "Creative fatigue", desc: "Ads lose performance when the same creatives run for too long." },
      { title: "Content without a goal", desc: "Posts and blogs that aren't tied to search demand or the sales journey." },
    ],
  },
  solution: {
    title: "A content system, not one-off pieces",
    body: "We define your positioning and voice first, then build a repeatable production process. AI speeds up research, drafts and variations; human editors make sure everything is accurate, on-brand and worth reading.",
    points: [
      "Brand voice and messaging guidelines",
      "Content calendars mapped to goals and channels",
      "AI-assisted drafting with human editing and fact-checking",
      "Creative testing frameworks for ads",
      "Repurposing one idea across formats and channels",
    ],
  },
  services: {
    title: "Content & creative services",
    intro: "Everything from a single landing page to an ongoing monthly content programme.",
    groups: [
      {
        title: "Copywriting",
        desc: "Words that explain, persuade and convert.",
        items: ["Website Copywriting", "Landing Page Copy", "Ad Copywriting", "Email Copywriting"],
      },
      {
        title: "SEO & Long-form",
        desc: "Content built around what your customers search for.",
        items: ["SEO Content", "Blog Writing", "Brand Content Strategy"],
      },
      {
        title: "Social Content",
        desc: "Platform-native content that earns attention.",
        items: ["Social Media Content", "Social Media Captions", "Reels Scripts", "Creative Strategy"],
      },
      {
        title: "AI-Assisted Creative",
        desc: "Faster production and more variations to test, with human review.",
        items: ["AI Content Creation", "Ad Creatives", "AI Image Generation", "AI Video Concepts"],
      },
    ],
  },
  benefits: [
    { title: "Consistency", desc: "A reliable publishing rhythm across your channels." },
    { title: "Sharper messaging", desc: "Copy that makes your differences obvious." },
    { title: "More to test", desc: "Multiple creative angles so campaigns can find what works." },
    { title: "Efficient production", desc: "AI handles the heavy lifting; people handle quality and judgment." },
  ],
  howItWorks: {
    title: "From idea to published content",
    intro: "A repeatable workflow that keeps quality high and turnaround predictable.",
    steps: [
      { label: "Strategy", desc: "Audience, goals, voice", icon: Target },
      { label: "Plan", desc: "Calendar & briefs", icon: LayoutTemplate },
      { label: "Create", desc: "AI-assisted drafts", icon: Sparkles },
      { label: "Edit & Approve", desc: "Human review", icon: PenTool },
      { label: "Publish & Learn", desc: "Measure and iterate", icon: TrendingUp },
    ],
  },
  useCases: [
    { title: "Launching a new website", desc: "Messaging framework and page copy written before design begins." },
    { title: "Running paid social", desc: "Fresh ad creatives and copy variations every month to avoid fatigue." },
    { title: "Building organic search traffic", desc: "A topic plan and regular SEO articles targeting real search demand." },
    { title: "A founder growing on LinkedIn", desc: "Ghostwritten posts based on the founder's own ideas and experience." },
  ],
  faqs: [
    {
      q: "Is your content written by AI?",
      a: "We use AI to speed up research, outlines, drafts and variations, but every piece is planned, edited and checked by a person before it's delivered.",
    },
    {
      q: "Will the content sound like our brand?",
      a: "Yes. We start by documenting your voice, vocabulary and examples you like, and refine it with your feedback over the first few rounds.",
    },
    {
      q: "Who owns the content you create?",
      a: "Once paid for, the content is yours to use. Specific usage terms are confirmed in your agreement.",
    },
    {
      q: "Do you create video?",
      a: "We plan video concepts, write scripts and reels hooks, and can produce AI-assisted visuals. Full video shoots can be arranged through production partners where needed.",
    },
  ],
  related: ["social-media-marketing", "seo", "meta-ads", "email-marketing"],
};
