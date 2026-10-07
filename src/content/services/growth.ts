import {
  BarChart3,
  Bell,
  Database,
  Eye,
  FileText,
  Filter,
  FlaskConical,
  Gauge,
  Handshake,
  Inbox,
  LayoutDashboard,
  LayoutTemplate,
  LineChart,
  MapPin,
  Megaphone,
  MousePointerClick,
  Search,
  Settings2,
  Star,
  Tag,
  Target,
  TrendingUp,
} from "lucide-react";
import type { ServicePage } from "../types";

export const leadGeneration: ServicePage = {
  slug: "lead-generation",
  name: "Lead Generation",
  pillar: "grow",
  icon: Filter,
  summary: "Ads, landing pages, lead magnets and follow-up systems that fill your pipeline.",
  meta: {
    title: "Lead Generation Services — Meta, Google, LinkedIn & WhatsApp",
    description:
      "Complete lead generation systems from Groxdigital: Meta, Google and LinkedIn campaigns, landing pages, lead magnets, WhatsApp lead capture, qualification, CRM integration and automated follow-up.",
  },
  hero: {
    eyebrow: "Lead Generation",
    title: "A predictable flow of qualified leads, not just form fills.",
    intro:
      "Generating leads is only half the job. We build complete systems that attract the right people, capture their details, qualify them and follow up quickly, so your sales team spends time on real opportunities.",
    primaryCta: "Discuss Your Lead Goals",
  },
  problem: {
    title: "Why lead generation often disappoints",
    intro: "Most problems happen after the click.",
    points: [
      { title: "Lots of leads, few customers", desc: "Cheap leads that aren't qualified waste your sales team's time." },
      { title: "Slow follow-up", desc: "Leads cool off quickly if nobody responds promptly." },
      { title: "No landing page", desc: "Traffic goes to a general page that doesn't match the ad or offer." },
      { title: "Leads in spreadsheets", desc: "No CRM, no status tracking and no way to measure what converts." },
    ],
  },
  solution: {
    title: "A full-funnel lead system",
    body: "We connect each stage: targeted campaigns, a focused landing page or lead magnet, qualification questions, CRM capture and automated follow-up by WhatsApp and email. Then we track which sources produce customers, not just leads.",
    points: [
      "Offer and lead magnet strategy",
      "Campaigns on Meta, Google and LinkedIn",
      "Dedicated landing pages",
      "Qualification by form logic or AI",
      "CRM integration and lead routing",
      "Instant WhatsApp and email follow-up",
    ],
  },
  services: {
    title: "Lead generation services",
    intro: "Every component you need, built to work together.",
    groups: [
      {
        title: "Traffic",
        desc: "Reach the people most likely to buy.",
        items: ["Meta Lead Generation", "Google Lead Generation", "LinkedIn Lead Generation", "WhatsApp Lead Generation"],
      },
      {
        title: "Capture",
        desc: "Turn interest into contact details.",
        items: ["Landing Pages", "Lead Magnets", "Quiz & Calculator Funnels", "Sales Funnel Development"],
      },
      {
        title: "Qualify & Nurture",
        desc: "Focus on the right prospects.",
        items: ["Lead Qualification", "Automated Follow-ups", "Lead Nurturing", "CRM Integration"],
      },
    ],
  },
  benefits: [
    { title: "Better lead quality", desc: "Qualification filters out poor fits before they reach sales." },
    { title: "Faster response", desc: "Every lead gets an immediate, personalised reply." },
    { title: "Full visibility", desc: "See which campaigns produce customers, not just contacts." },
    { title: "Scalable", desc: "Increase budget confidently once the system is proven." },
  ],
  howItWorks: {
    title: "The lead generation funnel",
    intro: "Every stage is designed, connected and measured.",
    steps: [
      { label: "Traffic", desc: "Ads, SEO, social", icon: Megaphone },
      { label: "Landing Page", desc: "One clear offer", icon: LayoutTemplate },
      { label: "Lead", desc: "Details captured", icon: Inbox },
      { label: "Qualification", desc: "Fit & intent", icon: Filter },
      { label: "Follow-up", desc: "WhatsApp & email", icon: Bell },
      { label: "Sales", desc: "Conversation & close", icon: Handshake },
    ],
  },
  useCases: [
    { title: "Real estate", desc: "Project campaigns with budget and location qualification before site-visit booking." },
    { title: "Education & immigration", desc: "Eligibility-based funnels that route prospects to the right counsellor." },
    { title: "Finance & CA firms", desc: "Service-specific landing pages and consultation booking." },
    { title: "B2B services", desc: "LinkedIn and search campaigns with lead magnets and nurture sequences." },
  ],
  faqs: [
    {
      q: "Do you charge per lead?",
      a: "We typically work on a management fee rather than per lead, because we focus on lead quality and sales outcomes. We'll discuss the most suitable model for your business.",
    },
    {
      q: "How do you improve lead quality?",
      a: "With clearer offers, qualifying questions, better targeting, landing pages that set expectations and feedback from your sales team on which leads converted.",
    },
    {
      q: "Can leads go straight into my CRM?",
      a: "Yes. We integrate forms, ad platforms and WhatsApp with most popular CRMs, or set up a simple CRM if you don't have one.",
    },
  ],
  related: ["meta-ads", "google-ads", "whatsapp-marketing", "conversion-optimization"],
};

export const googleBusinessProfile: ServicePage = {
  slug: "google-business-profile",
  name: "Google Business Profile",
  pillar: "grow",
  icon: MapPin,
  summary: "Google Maps visibility, profile optimisation, reviews and local SEO.",
  meta: {
    title: "Google Business Profile Optimization & Local SEO",
    description:
      "Get found on Google Maps and local search. Groxdigital offers Google Business Profile setup and optimisation, local SEO, review strategy, citations and local competitor analysis.",
  },
  hero: {
    eyebrow: "Google Business Profile & Local SEO",
    title: "Get Found When Customers Search for Your Business.",
    intro:
      "When people search for a service near them, Google often shows a map with a few local businesses. We optimise your Google Business Profile and local presence to improve your chances of appearing there and turning searches into calls and visits.",
    primaryCta: "Request a Local SEO Review",
  },
  problem: {
    title: "Local customers can't choose you if they can't find you",
    intro: "Many businesses have a profile but haven't optimised it.",
    points: [
      { title: "Incomplete profile", desc: "Missing categories, services, photos and descriptions." },
      { title: "Few or unanswered reviews", desc: "Reviews influence both rankings and customer decisions." },
      { title: "Inconsistent details", desc: "Different names, addresses or numbers across the web confuse search engines." },
      { title: "Competitors look more active", desc: "Regular posts, photos and updates make other profiles more attractive." },
    ],
  },
  solution: {
    title: "A complete local visibility system",
    body: "We set up or optimise your Google Business Profile, align your website with local search, build consistent citations and put a simple, ethical review strategy in place.",
    points: [
      "Profile setup, verification support and optimisation",
      "Primary and secondary category selection",
      "Services, products, attributes and descriptions",
      "Photo and post strategy",
      "Review generation and response management",
      "Local landing pages and citations",
    ],
  },
  services: {
    title: "Local visibility services",
    intro: "Everything needed to compete in local search.",
    groups: [
      {
        title: "Google Business Profile",
        desc: "Make your profile complete and compelling.",
        items: [
          "Google Business Profile Setup",
          "GBP Optimization",
          "Business Category Optimization",
          "Business Description Optimization",
          "Google Maps Optimization",
        ],
      },
      {
        title: "Local SEO",
        desc: "Support your profile with a strong local presence.",
        items: ["Local SEO", "Local Keyword Strategy", "Local Citation Strategy", "Local Competitor Analysis", "Google Maps Visibility"],
      },
      {
        title: "Reviews & Reputation",
        desc: "Build trust through genuine customer feedback.",
        items: ["Review Strategy", "Review Response Management", "Reputation Management", "Review Request Automation"],
      },
      {
        title: "Local Leads",
        desc: "Turn local visibility into enquiries.",
        items: ["Local Lead Generation", "Call & Direction Tracking", "Local Search Ads"],
      },
    ],
  },
  benefits: [
    { title: "Map visibility", desc: "Improve your chances of appearing in local map results." },
    { title: "More calls and visits", desc: "Make it easy for nearby customers to contact or find you." },
    { title: "Trust", desc: "Genuine reviews and an active profile reassure new customers." },
    { title: "Low cost", desc: "One of the most cost-effective local marketing channels." },
  ],
  howItWorks: {
    title: "Our local SEO process",
    intro: "Steady improvements across the signals that matter locally.",
    steps: [
      { label: "Audit", desc: "Profile & competitors", icon: Search },
      { label: "Optimise", desc: "Categories, services", icon: Settings2 },
      { label: "Citations", desc: "Consistent details", icon: Tag },
      { label: "Reviews", desc: "Request & respond", icon: Star },
      { label: "Track", desc: "Calls & directions", icon: LineChart },
    ],
  },
  useCases: [
    { title: "Clinics and dentists", desc: "Service-rich profiles and review requests after appointments." },
    { title: "Restaurants and cafés", desc: "Menus, photos, posts and reservation links." },
    { title: "Home services", desc: "Service-area setup and call tracking." },
    { title: "Multi-location businesses", desc: "Consistent profiles and local pages for every branch." },
  ],
  faqs: [
    {
      q: "Can you guarantee a top-three map ranking?",
      a: "No. Google determines local rankings based on relevance, distance and prominence, and proximity to the searcher is outside anyone's control. We improve the factors you can influence.",
    },
    {
      q: "Do you buy or write reviews?",
      a: "Never. Fake reviews violate Google's policies and can harm your business. We help you request genuine reviews from real customers and respond to them professionally.",
    },
    {
      q: "My profile is suspended. Can you help?",
      a: "We can review the likely cause, correct issues and guide you through Google's reinstatement process, though the final decision rests with Google.",
    },
  ],
  related: ["seo", "website-development", "ai-automation", "analytics-tracking"],
};

export const analyticsTracking: ServicePage = {
  slug: "analytics-tracking",
  name: "Analytics & Tracking",
  pillar: "optimize",
  icon: BarChart3,
  summary: "GA4, Tag Manager, pixels, Conversion API and dashboards that show what's working.",
  meta: {
    title: "Analytics & Conversion Tracking — GA4, GTM, Meta Pixel & CAPI",
    description:
      "Know where your leads and sales come from. Groxdigital sets up Google Analytics 4, Google Tag Manager, Meta Pixel and Conversion API, conversion, call and form tracking, and marketing dashboards.",
  },
  hero: {
    eyebrow: "Analytics & Tracking",
    title: "Know exactly where your leads and sales come from.",
    intro:
      "Without reliable tracking, marketing decisions are guesses. We set up analytics, pixels and conversion tracking correctly, then build dashboards that show which channels, campaigns and pages produce results.",
    primaryCta: "Request a Tracking Audit",
  },
  problem: {
    title: "Most tracking setups have gaps",
    intro: "And small gaps lead to big wrong decisions.",
    points: [
      { title: "Conversions not recorded", desc: "Form submissions, calls and WhatsApp clicks aren't tracked at all." },
      { title: "Numbers don't match", desc: "Ads platforms, analytics and the CRM all report different results." },
      { title: "Ad platforms flying blind", desc: "Without good conversion data, smart bidding can't optimise." },
      { title: "Reports nobody reads", desc: "Data exists but isn't presented in a way that supports decisions." },
    ],
  },
  solution: {
    title: "Clean data, clear decisions",
    body: "We audit what you have, define the actions that matter, implement tracking through Google Tag Manager and server-side connections where appropriate, and bring it together in dashboards built for decision-making.",
    points: [
      "Measurement plan aligned to business goals",
      "GA4 and Google Tag Manager implementation",
      "Meta Pixel and Conversion API",
      "Form, call and WhatsApp click tracking",
      "CRM and offline conversion imports",
      "Consent-aware tracking setup",
    ],
  },
  services: {
    title: "Tracking & analytics services",
    intro: "From a one-off audit to ongoing reporting.",
    groups: [
      {
        title: "Analytics Setup",
        desc: "The foundation for measuring performance.",
        items: ["Google Analytics", "Google Tag Manager", "Event & Goal Configuration", "E-commerce Tracking"],
      },
      {
        title: "Conversion Tracking",
        desc: "Capture every valuable action.",
        items: [
          "Conversion Tracking",
          "Google Ads Conversion Tracking",
          "Meta Pixel",
          "Conversion API",
          "Lead Tracking",
          "Call Tracking",
          "Form Tracking",
        ],
      },
      {
        title: "Reporting & Insight",
        desc: "Turn data into decisions.",
        items: ["Funnel Tracking", "Marketing Dashboards", "Campaign Reporting", "Performance Analytics"],
      },
    ],
  },
  benefits: [
    { title: "Know your best channels", desc: "See which sources produce leads and sales, not just clicks." },
    { title: "Better ad performance", desc: "Platforms optimise more effectively with accurate conversion data." },
    { title: "Find funnel leaks", desc: "Spot where visitors drop off and fix it." },
    { title: "Confident budgeting", desc: "Invest more in what works and cut what doesn't." },
  ],
  howItWorks: {
    title: "How tracking connects the dots",
    intro: "Tracking follows a customer from the first click to the final sale, so you can credit the right campaigns.",
    steps: [
      { label: "Ad / Search", desc: "Source & campaign", icon: Megaphone },
      { label: "Website Visit", desc: "Pages & behaviour", icon: Eye },
      { label: "Conversion", desc: "Form, call, WhatsApp", icon: MousePointerClick },
      { label: "CRM", desc: "Lead status & value", icon: Database },
      { label: "Dashboard", desc: "Clear reporting", icon: LayoutDashboard },
    ],
  },
  useCases: [
    { title: "Businesses running paid ads", desc: "Accurate conversion data to improve bidding and reduce wasted spend." },
    { title: "Lead-based businesses", desc: "Track leads through to closed deals to understand real cost per customer." },
    { title: "Online stores", desc: "Full e-commerce tracking from product view to purchase." },
    { title: "Leadership teams", desc: "A single dashboard of marketing performance for weekly reviews." },
  ],
  faqs: [
    {
      q: "Why do my ad platform numbers differ from Google Analytics?",
      a: "Each platform uses different attribution models, time windows and tracking methods. We configure them consistently and explain which source to use for which decision.",
    },
    {
      q: "Is tracking compliant with privacy laws?",
      a: "We implement consent-aware tracking and can integrate a consent management tool. You remain responsible for your privacy policy and legal compliance, and we recommend seeking legal advice for your jurisdiction.",
    },
    {
      q: "Can you track WhatsApp clicks and phone calls?",
      a: "Yes. We track click-to-WhatsApp and click-to-call actions, and can set up call tracking solutions where needed.",
    },
  ],
  related: ["conversion-optimization", "google-ads", "meta-ads", "lead-generation"],
};

export const conversionOptimization: ServicePage = {
  slug: "conversion-optimization",
  name: "Conversion Rate Optimization",
  pillar: "optimize",
  icon: Gauge,
  summary: "Landing page, funnel and UX improvements that convert more of your existing traffic.",
  meta: {
    title: "Conversion Rate Optimization (CRO) — Landing Pages & Funnels",
    description:
      "More traffic is not enough. Groxdigital improves landing pages, websites, forms, CTAs and sales funnels with research-led CRO, UX improvements and A/B testing strategy.",
  },
  hero: {
    eyebrow: "Conversion Rate Optimization",
    title: "More Traffic Is Not Enough. Convert More of It.",
    intro:
      "If your website or landing pages don't persuade, more traffic just means more people leaving. We find what's stopping visitors from taking action and fix it with research, better UX and structured testing.",
    primaryCta: "Request a CRO Review",
  },
  problem: {
    title: "Signs your conversion rate is holding you back",
    intro: "Small improvements in conversion can make every marketing channel more efficient.",
    points: [
      { title: "High bounce rates", desc: "Visitors leave without scrolling or clicking." },
      { title: "Abandoned forms", desc: "People start forms but don't finish them." },
      { title: "Unclear offer", desc: "The page doesn't quickly explain why someone should act now." },
      { title: "Weak mobile experience", desc: "Pages that work on desktop but frustrate mobile users." },
    ],
  },
  solution: {
    title: "Research-led improvements, measured properly",
    body: "We combine analytics, heatmaps, session recordings and a structured page review to find friction. Then we prioritise changes by expected impact, implement them and test where traffic allows.",
    points: [
      "Conversion audits and funnel analysis",
      "Heatmaps and session recording reviews",
      "Copy, layout and CTA improvements",
      "Form and checkout simplification",
      "A/B testing strategy and implementation",
      "Ongoing optimisation roadmap",
    ],
  },
  services: {
    title: "CRO services",
    intro: "Focused on the pages and steps that matter most.",
    groups: [
      {
        title: "Pages",
        desc: "Make key pages more persuasive.",
        items: ["Landing Page Optimization", "Website Conversion Optimization", "CTA Optimization", "Product Page Optimization"],
      },
      {
        title: "Funnels & Forms",
        desc: "Remove friction from the journey.",
        items: ["Lead Funnel Optimization", "Sales Funnel Optimization", "Form Optimization", "Checkout Optimization"],
      },
      {
        title: "Research & Testing",
        desc: "Evidence before opinions.",
        items: ["A/B Testing Strategy", "User Experience Optimization", "Heatmap & Recording Analysis", "Conversion Audits"],
      },
    ],
  },
  benefits: [
    { title: "Lower acquisition costs", desc: "Convert more visitors from the same ad spend." },
    { title: "Better user experience", desc: "Clearer, faster pages that respect visitors' time." },
    { title: "Decisions based on data", desc: "Changes guided by evidence rather than opinions." },
    { title: "Compounding gains", desc: "Each improvement benefits every channel that sends traffic." },
  ],
  howItWorks: {
    title: "Our CRO cycle",
    intro: "A continuous loop of learning and improvement.",
    steps: [
      { label: "Analyse", desc: "Data & behaviour", icon: BarChart3 },
      { label: "Hypothesise", desc: "What & why", icon: FileText },
      { label: "Prioritise", desc: "Impact vs effort", icon: Target },
      { label: "Test", desc: "Implement & test", icon: FlaskConical },
      { label: "Learn", desc: "Roll out & repeat", icon: TrendingUp },
    ],
  },
  useCases: [
    { title: "Paid campaign landing pages", desc: "Message match, social proof placement and form improvements." },
    { title: "Service websites", desc: "Clearer service pages, stronger CTAs and simpler contact options." },
    { title: "Online stores", desc: "Product page, cart and checkout improvements." },
    { title: "SaaS sign-ups", desc: "Pricing page clarity and onboarding flow improvements." },
  ],
  faqs: [
    {
      q: "How much traffic do I need for A/B testing?",
      a: "Reliable A/B tests need enough conversions to reach meaningful results. For lower-traffic sites, we focus on research-based improvements and track before-and-after performance instead.",
    },
    {
      q: "Do you redesign the whole website?",
      a: "Not usually. CRO focuses on targeted, high-impact changes. If a redesign is genuinely needed, we'll explain why.",
    },
    {
      q: "Which tools do you use?",
      a: "Typically GA4, heatmap and session recording tools such as Microsoft Clarity or Hotjar, and testing tools suited to your platform.",
    },
  ],
  related: ["analytics-tracking", "website-development", "lead-generation", "ecommerce"],
};
