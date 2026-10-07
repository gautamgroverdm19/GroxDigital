export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = { title: string; links: NavLink[] };

export const servicesMenu: NavGroup[] = [
  {
    title: "Digital Marketing",
    links: [
      { label: "SEO", href: "/seo", description: "Rank for searches that bring customers" },
      { label: "Meta Ads", href: "/meta-ads", description: "Facebook & Instagram campaigns" },
      { label: "Google Ads", href: "/google-ads", description: "Search, Display, Shopping & YouTube" },
      { label: "Social Media", href: "/social-media-marketing", description: "Strategy, content & management" },
      { label: "LinkedIn", href: "/linkedin-marketing", description: "B2B leads & founder branding" },
      { label: "Email Marketing", href: "/email-marketing", description: "Campaigns & automated sequences" },
    ],
  },
  {
    title: "Web",
    links: [
      { label: "Website Development", href: "/website-development", description: "Fast, conversion-focused websites" },
      { label: "E-commerce", href: "/ecommerce", description: "Shopify, WooCommerce & growth" },
      { label: "Landing Pages", href: "/website-development#landing-pages", description: "Pages built to convert" },
      { label: "Website Redesign", href: "/website-development#redesign-maintenance", description: "Modernise what you have" },
    ],
  },
  {
    title: "AI & Automation",
    links: [
      { label: "AI Solutions", href: "/ai-solutions", description: "Practical AI for your business" },
      { label: "AI Automation", href: "/ai-automation", description: "Workflows that run themselves" },
      { label: "AI Agents", href: "/ai-solutions#ai-agents", description: "Agents for support, sales & ops" },
      { label: "Business Automation", href: "/ai-automation#business-automation", description: "CRM, email, data & reporting" },
    ],
  },
  {
    title: "Growth",
    links: [
      { label: "Lead Generation", href: "/lead-generation", description: "Funnels that fill your pipeline" },
      { label: "WhatsApp Marketing", href: "/whatsapp-marketing", description: "Campaigns, chatbots & API" },
      { label: "GBP Optimization", href: "/google-business-profile", description: "Google Maps & local search" },
      { label: "Analytics", href: "/analytics-tracking", description: "Tracking, pixels & dashboards" },
      { label: "CRO", href: "/conversion-optimization", description: "Convert more of your traffic" },
    ],
  },
];

export const solutionsMenu: NavGroup[] = [
  {
    title: "By Goal",
    links: [
      { label: "Get More Leads", href: "/lead-generation", description: "Ads, landing pages & follow-up" },
      { label: "Grow Online Sales", href: "/ecommerce", description: "E-commerce growth systems" },
      { label: "Get Found Locally", href: "/google-business-profile", description: "Maps, reviews & local SEO" },
      { label: "Convert More Visitors", href: "/conversion-optimization", description: "Fix leaks in your funnel" },
    ],
  },
  {
    title: "By Capability",
    links: [
      { label: "Automate Repetitive Work", href: "/ai-automation", description: "n8n, Make, Zapier & custom" },
      { label: "Deploy AI Agents", href: "/ai-solutions#ai-agents", description: "Support, sales & research" },
      { label: "Measure What Works", href: "/analytics-tracking", description: "Know where sales come from" },
      { label: "Content & Creative", href: "/content-creative", description: "Copy, creatives & AI content" },
    ],
  },
];

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerColumns: NavGroup[] = [
  {
    title: "Services",
    links: [
      { label: "Website Development", href: "/website-development" },
      { label: "Digital Marketing", href: "/digital-marketing" },
      { label: "SEO", href: "/seo" },
      { label: "Meta Ads", href: "/meta-ads" },
      { label: "Google Ads", href: "/google-ads" },
      { label: "Social Media Marketing", href: "/social-media-marketing" },
      { label: "LinkedIn Marketing", href: "/linkedin-marketing" },
      { label: "Email Marketing", href: "/email-marketing" },
      { label: "Content & Creative", href: "/content-creative" },
      { label: "All Services", href: "/services" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "AI Solutions", href: "/ai-solutions" },
      { label: "AI Automation", href: "/ai-automation" },
      { label: "WhatsApp Marketing", href: "/whatsapp-marketing" },
      { label: "Lead Generation", href: "/lead-generation" },
      { label: "E-commerce Growth", href: "/ecommerce" },
      { label: "Google Business Profile", href: "/google-business-profile" },
      { label: "Analytics & Tracking", href: "/analytics-tracking" },
      { label: "Conversion Optimization", href: "/conversion-optimization" },
      { label: "Industries", href: "/industries" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Data Processing", href: "/data-processing" },
    ],
  },
];
