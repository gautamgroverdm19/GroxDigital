import {
  BarChart3,
  Briefcase,
  FileText,
  Filter,
  Inbox,
  LineChart,
  Link2,
  Mail,
  Megaphone,
  MousePointerClick,
  PenTool,
  Search,
  SearchCheck,
  Settings2,
  Share2,
  Target,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import type { ServicePage } from "../types";

export const digitalMarketing: ServicePage = {
  slug: "digital-marketing",
  name: "Digital Marketing",
  pillar: "grow",
  icon: Megaphone,
  summary: "SEO, paid ads, social and LinkedIn, planned around one goal: profitable growth.",
  meta: {
    title: "Digital Marketing Services — SEO, Ads, Social & LinkedIn",
    description:
      "Strategy-led digital marketing from Groxdigital: SEO, Meta Ads, Google Ads, YouTube Ads, social media marketing and LinkedIn marketing, all tracked and tied to business goals.",
  },
  hero: {
    eyebrow: "Digital Marketing",
    title: "Marketing that's planned around your numbers, not vanity metrics.",
    intro:
      "We plan and run search, paid and social campaigns as one connected system. Each channel has a clear job, every lead is tracked, and budgets move toward what's working.",
    primaryCta: "Request a Strategy",
  },
  problem: {
    title: "Why marketing often feels like guesswork",
    intro: "Spending on marketing without a plan or proper tracking makes it hard to know what to keep and what to cut.",
    points: [
      { title: "Channels in silos", desc: "SEO, ads and social are handled separately with no shared goal or message." },
      { title: "Busy but not effective", desc: "Lots of posts and campaigns, but few qualified enquiries." },
      { title: "No reliable attribution", desc: "It's unclear which channel or campaign actually produced a sale." },
      { title: "Leads go cold", desc: "Enquiries come in but nobody follows up quickly or consistently." },
    ],
  },
  solution: {
    title: "One strategy, every channel pulling in the same direction",
    body: "We start with your goals, margins and customer journey, then decide which channels deserve investment. From there we build campaigns, landing pages and tracking together so performance can be measured and improved month by month.",
    points: [
      "Channel strategy based on your goals and budget",
      "Campaigns and landing pages built together",
      "Full-funnel tracking from click to customer",
      "Monthly reporting in plain language",
      "Ongoing testing of audiences, creatives and offers",
    ],
  },
  services: {
    title: "Digital marketing services",
    intro: "Explore each area in detail, or let us recommend the right mix for your business.",
    groups: [
      {
        id: "seo",
        title: "SEO",
        desc: "Be found by people already searching for what you offer.",
        items: [
          "Local SEO",
          "Technical SEO",
          "On-Page SEO",
          "Off-Page SEO",
          "E-commerce SEO",
          "Keyword Research",
          "Competitor Analysis",
          "SEO Content Strategy",
          "SEO Audits",
          "Google Search Optimization",
        ],
        href: "/seo",
      },
      {
        id: "paid-advertising",
        title: "Paid Advertising",
        desc: "Reach the right audience quickly with campaigns built around your goals.",
        items: [
          "Meta Ads",
          "Facebook Ads",
          "Instagram Ads",
          "Google Ads",
          "Google Search Ads",
          "Google Display Ads",
          "YouTube Ads",
          "Remarketing Ads",
          "Lead Generation Campaigns",
          "Conversion Campaigns",
          "E-commerce Ads",
        ],
        href: "/meta-ads",
      },
      {
        id: "social-media",
        title: "Social Media Marketing",
        desc: "Build an audience and stay visible where your customers spend time.",
        items: [
          "Instagram Marketing",
          "Facebook Marketing",
          "LinkedIn Marketing",
          "Social Media Strategy",
          "Content Planning",
          "Social Media Management",
          "Reels Strategy",
          "Social Media Advertising",
          "YouTube Marketing",
          "Influencer Marketing",
        ],
        href: "/social-media-marketing",
      },
      {
        id: "linkedin",
        title: "LinkedIn Marketing",
        desc: "B2B lead generation and authority building on LinkedIn.",
        items: [
          "LinkedIn Page Management",
          "LinkedIn Lead Generation",
          "LinkedIn Ads",
          "Personal Branding",
          "Founder Branding",
          "B2B Lead Generation",
          "LinkedIn Content Strategy",
        ],
        href: "/linkedin-marketing",
      },
      {
        id: "strategy",
        title: "Strategy & Consulting",
        desc: "Senior input on where to focus and how to grow.",
        items: ["Marketing Strategy Consulting", "Go-to-Market Planning", "Funnel & Offer Strategy", "Marketing Audits"],
      },
    ],
  },
  benefits: [
    { title: "Clarity", desc: "Know which channels and campaigns are producing results." },
    { title: "Efficiency", desc: "Budget shifts toward what works instead of being spread thin." },
    { title: "Consistency", desc: "One message and brand experience across every channel." },
    { title: "Compounding growth", desc: "SEO and content build long-term visibility while ads deliver short-term demand." },
  ],
  howItWorks: {
    title: "How the channels work together",
    intro: "Each channel plays a distinct role in moving people from first awareness to becoming customers.",
    steps: [
      { label: "Reach", desc: "Social & YouTube", icon: Share2 },
      { label: "Capture Demand", desc: "SEO & Google Ads", icon: Search },
      { label: "Convert", desc: "Landing pages", icon: MousePointerClick },
      { label: "Nurture", desc: "Email & WhatsApp", icon: Mail },
      { label: "Measure", desc: "Tracking & reports", icon: BarChart3 },
    ],
  },
  useCases: [
    { title: "A local service business", desc: "Local SEO, Google Business Profile and search ads to capture nearby demand." },
    { title: "A B2B company", desc: "LinkedIn content, LinkedIn Ads and Google Search campaigns feeding a CRM." },
    { title: "An e-commerce brand", desc: "Meta and Shopping campaigns with remarketing and email retention." },
    { title: "A personal brand or coach", desc: "Content-led social growth supported by lead magnets and paid promotion." },
  ],
  faqs: [
    {
      q: "Which marketing channel should I start with?",
      a: "It depends on how your customers buy. If people already search for your service, SEO and Google Ads are strong starting points. If you need to create demand, social and Meta Ads often work better. We'll recommend a mix after understanding your business.",
    },
    {
      q: "Do you guarantee results?",
      a: "No responsible agency can guarantee specific rankings, leads or sales, because results depend on your market, offer, budget and many outside factors. What we do commit to is a clear strategy, transparent reporting and continuous improvement.",
    },
    {
      q: "How do you report on performance?",
      a: "You'll receive regular reports and access to dashboards showing the metrics that matter for your goals, such as leads, cost per lead, sales and revenue, explained in plain language.",
    },
    {
      q: "Is ad spend included in your fees?",
      a: "No. Ad spend is paid directly to platforms like Meta and Google from your own accounts. Our fee covers strategy, setup, management and optimisation.",
    },
  ],
  related: ["seo", "meta-ads", "google-ads", "social-media-marketing"],
};

export const seo: ServicePage = {
  slug: "seo",
  name: "SEO",
  pillar: "grow",
  icon: SearchCheck,
  summary: "Technical, on-page, local and content SEO to grow qualified organic traffic.",
  meta: {
    title: "SEO Services — Technical, Local, On-Page & E-commerce SEO",
    description:
      "Groxdigital provides SEO audits, technical SEO, on-page and off-page SEO, local SEO, e-commerce SEO, keyword research and SEO content strategy to grow qualified organic traffic.",
  },
  hero: {
    eyebrow: "Search Engine Optimization",
    title: "Get found by customers who are already searching.",
    intro:
      "People search for the products and services you offer every day. Our SEO work makes your website easier for search engines to understand and more useful for the people you want to reach.",
    primaryCta: "Request an SEO Review",
  },
  problem: {
    title: "Signs your SEO needs attention",
    intro: "Organic search is often a business's most valuable channel, and its most neglected one.",
    points: [
      { title: "Competitors outrank you", desc: "Businesses that may be no better than yours appear first for the searches that matter." },
      { title: "Traffic without enquiries", desc: "You rank for terms that bring visitors who never become customers." },
      { title: "Technical issues", desc: "Slow pages, indexing errors and duplicate content quietly hold rankings back." },
      { title: "No content plan", desc: "Blog posts are published without research, so they rarely attract search traffic." },
    ],
  },
  solution: {
    title: "SEO built on research, not guesswork",
    body: "We find the searches that match your services and buying intent, fix the technical foundations, improve your key pages and build content and authority over time. Progress is tracked transparently so you can see how visibility develops.",
    points: [
      "Keyword research focused on commercial intent",
      "Technical audit and prioritised fixes",
      "On-page optimisation of service and product pages",
      "Content strategy built around topics your customers search",
      "Ethical link building and digital PR",
      "Rank, traffic and conversion tracking",
    ],
  },
  services: {
    title: "SEO services",
    intro: "Comprehensive SEO, or a focused engagement on the area that needs it most.",
    groups: [
      {
        title: "Technical SEO",
        desc: "Make sure search engines can crawl, render and index your site.",
        items: ["SEO Audits", "Technical SEO", "Site Speed & Core Web Vitals", "Schema Markup", "Indexing & Crawl Fixes"],
      },
      {
        title: "On-Page & Content",
        desc: "Pages and content that match search intent.",
        items: ["On-Page SEO", "Keyword Research", "SEO Content Strategy", "Content Optimization", "Internal Linking"],
      },
      {
        title: "Off-Page & Authority",
        desc: "Build credibility signals the right way.",
        items: ["Off-Page SEO", "Link Building", "Digital PR", "Competitor Analysis"],
      },
      {
        title: "Local & E-commerce SEO",
        desc: "Specialised SEO for local businesses and online stores.",
        items: ["Local SEO", "Google Business Profile", "E-commerce SEO", "Category & Product Page SEO", "Google Search Optimization"],
      },
    ],
  },
  benefits: [
    { title: "Long-term visibility", desc: "Rankings keep working for you without paying for every click." },
    { title: "High-intent visitors", desc: "Reach people actively looking for what you sell." },
    { title: "Credibility", desc: "Appearing prominently in search builds trust with new customers." },
    { title: "Better website", desc: "Most SEO improvements also make your site faster and easier to use." },
  ],
  howItWorks: {
    title: "Our SEO process",
    intro: "SEO is a continuous cycle of research, improvement and measurement.",
    steps: [
      { label: "Audit", desc: "Technical & content review", icon: SearchCheck },
      { label: "Research", desc: "Keywords & competitors", icon: Search },
      { label: "Optimise", desc: "Fix & improve pages", icon: Settings2 },
      { label: "Create", desc: "Content that ranks", icon: PenTool },
      { label: "Build Authority", desc: "Links & mentions", icon: Link2 },
      { label: "Track", desc: "Rankings & leads", icon: LineChart },
    ],
  },
  useCases: [
    { title: "Service businesses in competitive cities", desc: "Location and service pages plus local SEO to win nearby searches." },
    { title: "Online stores", desc: "Category, product and technical improvements for better shopping visibility." },
    { title: "B2B and professional services", desc: "Thought-leadership content that answers the questions buyers research." },
    { title: "Website migrations", desc: "Redirect planning and monitoring to protect existing rankings during a redesign." },
  ],
  faqs: [
    {
      q: "How long does SEO take to show results?",
      a: "SEO is a long-term channel. Some technical fixes can have an effect relatively quickly, but meaningful growth typically builds over several months depending on competition, your site's history and how much content and authority work is done.",
    },
    {
      q: "Can you guarantee first-page rankings?",
      a: "No. Search engines control rankings and no one can guarantee positions. Be cautious of anyone who does. We focus on the work that improves your chances and report progress transparently.",
    },
    {
      q: "Do you use AI for SEO content?",
      a: "We use AI to assist research and drafting, but content is planned around real search intent and edited by people for accuracy, quality and usefulness.",
    },
    {
      q: "What's the difference between SEO and Google Ads?",
      a: "Google Ads buys visibility immediately and stops when spend stops. SEO earns organic visibility that builds over time. Many businesses use both together.",
    },
  ],
  related: ["google-business-profile", "content-creative", "website-development", "analytics-tracking"],
};

export const metaAds: ServicePage = {
  slug: "meta-ads",
  name: "Meta Ads",
  pillar: "grow",
  icon: Target,
  summary: "Facebook and Instagram campaigns for leads, sales and remarketing.",
  meta: {
    title: "Meta Ads Management — Facebook & Instagram Advertising",
    description:
      "Facebook and Instagram ads managed by Groxdigital: lead generation, conversion and e-commerce campaigns, remarketing, creative testing and Conversion API tracking.",
  },
  hero: {
    eyebrow: "Meta Ads",
    title: "Facebook & Instagram ads that turn attention into customers.",
    intro:
      "Meta's platforms can reach almost any audience, but results depend on the offer, the creative, the targeting and the tracking working together. We manage all four.",
    primaryCta: "Request an Ads Strategy",
  },
  problem: {
    title: "Common reasons Meta campaigns underperform",
    intro: "Most issues come from setup and process, not the platform itself.",
    points: [
      { title: "Weak tracking", desc: "Missing pixel events or no Conversion API means the algorithm optimises on poor data." },
      { title: "Tired creatives", desc: "The same ads run for months until costs climb and results fade." },
      { title: "Low-quality leads", desc: "Instant forms collect lots of contacts but few genuine prospects." },
      { title: "Boosting, not advertising", desc: "Boosted posts without a strategy, audience plan or clear objective." },
    ],
  },
  solution: {
    title: "Structured campaigns, constant creative testing",
    body: "We set up clean tracking first, structure campaigns around clear objectives and test creative angles systematically. Lead quality is improved with qualifying questions, landing pages and fast follow-up automation.",
    points: [
      "Meta Pixel and Conversion API setup",
      "Campaign structure aligned to your funnel",
      "Creative strategy and regular new variations",
      "Lead quality filters and instant follow-up",
      "Remarketing to warm audiences",
      "Clear reporting on cost per result",
    ],
  },
  services: {
    title: "Meta advertising services",
    intro: "Campaigns for every stage of the customer journey.",
    groups: [
      {
        title: "Campaign Types",
        desc: "Objectives matched to what you need.",
        items: ["Facebook Ads", "Instagram Ads", "Lead Generation Campaigns", "Conversion Campaigns", "E-commerce & Catalogue Ads"],
      },
      {
        title: "Audiences & Remarketing",
        desc: "Reach new people and bring back interested ones.",
        items: ["Audience Research", "Lookalike Audiences", "Remarketing Ads", "Engagement Retargeting"],
      },
      {
        title: "Creative",
        desc: "The biggest lever in most Meta campaigns.",
        items: ["Ad Creative Strategy", "Ad Copywriting", "Reels & Video Ads", "Creative Testing"],
      },
      {
        title: "Tracking & Follow-up",
        desc: "Accurate data and fast responses.",
        items: ["Meta Pixel", "Conversion API", "CRM Integration", "WhatsApp Lead Follow-up"],
      },
    ],
  },
  benefits: [
    { title: "Precise reach", desc: "Target by interests, behaviours, location and lookalikes of your best customers." },
    { title: "Fast feedback", desc: "Learn quickly which messages and offers resonate." },
    { title: "Visual storytelling", desc: "Show your product or service in action with video and carousels." },
    { title: "Full-funnel", desc: "From awareness to remarketing in one platform." },
  ],
  howItWorks: {
    title: "How we run Meta campaigns",
    intro: "A repeatable process for launching, learning and scaling.",
    steps: [
      { label: "Tracking Setup", desc: "Pixel + Conversion API", icon: Settings2 },
      { label: "Audience & Offer", desc: "Who and what", icon: Users },
      { label: "Creatives", desc: "Multiple angles", icon: PenTool },
      { label: "Launch & Test", desc: "Find winners", icon: Target },
      { label: "Scale", desc: "Grow what works", icon: TrendingUp },
    ],
  },
  useCases: [
    { title: "Real-estate lead generation", desc: "Project-specific campaigns with qualifying questions and instant WhatsApp follow-up." },
    { title: "Clinic appointment bookings", desc: "Local campaigns driving to a booking page with reminder automation." },
    { title: "E-commerce sales", desc: "Catalogue ads and dynamic remarketing for product viewers and cart abandoners." },
    { title: "Event or webinar sign-ups", desc: "Registration campaigns with automated email and WhatsApp reminders." },
  ],
  faqs: [
    {
      q: "What budget do I need for Meta Ads?",
      a: "It depends on your goals, market and cost per result. We'll suggest a realistic test budget during the strategy call, then scale based on what the data shows.",
    },
    {
      q: "Do you create the ad creatives?",
      a: "Yes. We plan creative angles, write copy and produce static, carousel and short-form video creatives, or work with your existing brand assets.",
    },
    {
      q: "Why is the Conversion API important?",
      a: "Browser tracking alone can miss conversions because of privacy settings and ad blockers. The Conversion API sends events from your server, giving Meta better data to optimise campaigns.",
    },
    {
      q: "Will I own the ad account?",
      a: "Yes. Campaigns run in your own Business Manager and ad account, so you keep full ownership of your data and history.",
    },
  ],
  related: ["google-ads", "lead-generation", "content-creative", "analytics-tracking"],
};

export const googleAds: ServicePage = {
  slug: "google-ads",
  name: "Google Ads",
  pillar: "grow",
  icon: MousePointerClick,
  summary: "Search, Display, Shopping and YouTube campaigns that capture ready-to-buy demand.",
  meta: {
    title: "Google Ads Management — Search, Shopping, Display & YouTube",
    description:
      "Google Ads campaigns managed by Groxdigital: Search, Display, Shopping, Performance Max and YouTube Ads with keyword strategy, landing pages and accurate conversion tracking.",
  },
  hero: {
    eyebrow: "Google Ads",
    title: "Show up at the moment customers are looking for you.",
    intro:
      "Google Ads puts your business in front of people actively searching for your products and services. We build focused campaigns, write relevant ads and track every conversion so your budget goes where it counts.",
    primaryCta: "Request a Google Ads Review",
  },
  problem: {
    title: "Where Google Ads budgets get wasted",
    intro: "Small setup mistakes can quietly drain a large share of spend.",
    points: [
      { title: "Irrelevant searches", desc: "Broad keywords without negatives trigger ads for searches that will never convert." },
      { title: "Generic landing pages", desc: "Sending all traffic to the homepage instead of a page that matches the search." },
      { title: "Broken conversion tracking", desc: "Smart bidding can't optimise if conversions aren't recorded correctly." },
      { title: "Set and forget", desc: "Campaigns left running without regular search-term reviews and testing." },
    ],
  },
  solution: {
    title: "Tight campaigns built on intent",
    body: "We organise campaigns around what people are searching for, match each ad to a relevant landing page and make sure conversions are tracked accurately, including calls and WhatsApp clicks. Then we refine continuously.",
    points: [
      "Keyword and competitor research",
      "Structured campaigns and ad groups",
      "Negative keyword management",
      "Landing pages matched to search intent",
      "Google Ads conversion tracking and enhanced conversions",
      "Regular search-term and bid optimisation",
    ],
  },
  services: {
    title: "Google advertising services",
    intro: "Campaign types for every business model.",
    groups: [
      {
        title: "Search",
        desc: "Text ads for high-intent searches.",
        items: ["Google Search Ads", "Local Search Campaigns", "Call Campaigns", "Competitor Campaigns"],
      },
      {
        title: "Shopping & E-commerce",
        desc: "Product ads for online stores.",
        items: ["Google Shopping Ads", "Performance Max", "Merchant Center Setup", "Feed Optimization"],
      },
      {
        title: "Display & YouTube",
        desc: "Visual reach and remarketing.",
        items: ["Google Display Ads", "YouTube Ads", "Remarketing Ads", "Demand Gen Campaigns"],
      },
      {
        title: "Measurement",
        desc: "Know exactly what your spend produces.",
        items: ["Google Ads Conversion Tracking", "Google Tag Manager", "Call Tracking", "GA4 Integration"],
      },
    ],
  },
  benefits: [
    { title: "Immediate visibility", desc: "Appear at the top of search results as soon as campaigns go live." },
    { title: "Intent-driven", desc: "Reach people who are actively looking, not just browsing." },
    { title: "Controllable", desc: "Set budgets, locations, schedules and bids precisely." },
    { title: "Measurable", desc: "See which keywords and ads produce leads and sales." },
  ],
  howItWorks: {
    title: "How we manage Google Ads",
    intro: "Every campaign follows the same disciplined approach.",
    steps: [
      { label: "Research", desc: "Keywords & competitors", icon: Search },
      { label: "Structure", desc: "Campaigns & ad groups", icon: Settings2 },
      { label: "Landing Pages", desc: "Match the search", icon: FileText },
      { label: "Track", desc: "Conversions & calls", icon: BarChart3 },
      { label: "Optimise", desc: "Bids, terms, ads", icon: TrendingUp },
    ],
  },
  useCases: [
    { title: "Emergency and urgent services", desc: "Call-focused search campaigns with scheduling around your hours." },
    { title: "Online stores", desc: "Shopping and Performance Max campaigns using an optimised product feed." },
    { title: "Immigration and education consultants", desc: "Service and country-specific campaigns with qualifying landing pages." },
    { title: "B2B software and services", desc: "High-intent search plus YouTube and display remarketing for longer sales cycles." },
  ],
  faqs: [
    {
      q: "How quickly will I see results from Google Ads?",
      a: "Ads can start receiving clicks shortly after launch. Campaigns usually need some time and data to optimise, so expect an initial learning and refinement period.",
    },
    {
      q: "Can you audit my existing Google Ads account?",
      a: "Yes. We review structure, keywords, search terms, tracking, landing pages and bidding, then give you a prioritised list of improvements.",
    },
    {
      q: "Do you run YouTube Ads?",
      a: "Yes. YouTube campaigns can build awareness, remarketing audiences and conversions, and we plan video creative to suit each objective.",
    },
    {
      q: "How is my budget protected from wasted clicks?",
      a: "Through careful keyword selection, negative keywords, location and schedule targeting, and regular search-term reviews.",
    },
  ],
  related: ["meta-ads", "seo", "conversion-optimization", "analytics-tracking"],
};

export const socialMediaMarketing: ServicePage = {
  slug: "social-media-marketing",
  name: "Social Media Marketing",
  pillar: "grow",
  icon: Share2,
  summary: "Strategy, content and management for Instagram, Facebook, LinkedIn and YouTube.",
  meta: {
    title: "Social Media Marketing — Strategy, Content & Management",
    description:
      "Social media strategy, content planning, reels, management and advertising for Instagram, Facebook, LinkedIn and YouTube by Groxdigital.",
  },
  hero: {
    eyebrow: "Social Media Marketing",
    title: "Stay visible, build trust and give people a reason to follow.",
    intro:
      "Social media is often where customers check whether a business is real, active and credible. We plan, create and manage content that builds your brand and supports your sales goals.",
  },
  problem: {
    title: "Social media without a plan rarely works",
    intro: "Posting regularly is only half the job.",
    points: [
      { title: "Irregular posting", desc: "Accounts go quiet for weeks, then post in a rush." },
      { title: "No clear purpose", desc: "Content isn't connected to an audience, offer or business goal." },
      { title: "Low reach", desc: "Formats and hooks don't match how each platform currently works." },
      { title: "No link to sales", desc: "Followers grow, but enquiries and sales don't." },
    ],
  },
  solution: {
    title: "Social media with a strategy behind every post",
    body: "We define who you're speaking to, what you want them to think and do, and which platforms matter. Then we build content pillars, a calendar and a production workflow, and use paid promotion where it helps.",
    points: [
      "Platform strategy and content pillars",
      "Monthly content calendars",
      "Reels, carousels and short-form video scripts",
      "Community management guidelines",
      "Paid promotion of your best content",
      "Monthly insights and recommendations",
    ],
  },
  services: {
    title: "Social media services",
    intro: "Strategy only, done-with-you or fully managed.",
    groups: [
      {
        title: "Strategy",
        desc: "Decide where to show up and what to say.",
        items: ["Social Media Strategy", "Content Planning", "Reels Strategy", "Competitor & Trend Research"],
      },
      {
        title: "Platforms",
        desc: "Native content for each channel.",
        items: ["Instagram Marketing", "Facebook Marketing", "LinkedIn Marketing", "YouTube Marketing"],
      },
      {
        title: "Management",
        desc: "Consistent, on-brand presence.",
        items: ["Social Media Management", "Content Creation", "Captions & Hashtags", "Community Guidelines"],
      },
      {
        title: "Growth",
        desc: "Amplify what's working.",
        items: ["Social Media Advertising", "Influencer Marketing", "Collaborations & Partnerships"],
      },
    ],
  },
  benefits: [
    { title: "Credibility", desc: "An active, professional presence reassures potential customers." },
    { title: "Top of mind", desc: "Stay visible between purchase decisions." },
    { title: "Audience insight", desc: "Learn what your customers care about from how they engage." },
    { title: "Content you can reuse", desc: "Social content fuels ads, emails and your website." },
  ],
  howItWorks: {
    title: "Our monthly social workflow",
    intro: "A predictable rhythm that keeps your channels active and improving.",
    steps: [
      { label: "Plan", desc: "Pillars & calendar", icon: FileText },
      { label: "Create", desc: "Posts, reels, captions", icon: PenTool },
      { label: "Approve", desc: "Your review", icon: UserCheck },
      { label: "Publish", desc: "Scheduled & native", icon: Share2 },
      { label: "Review", desc: "Insights & next steps", icon: LineChart },
    ],
  },
  useCases: [
    { title: "Restaurants and cafés", desc: "Menu highlights, behind-the-scenes reels and local promotions." },
    { title: "Beauty and wellness", desc: "Before-and-after content (with consent), tips and booking prompts." },
    { title: "Education providers", desc: "Student-focused content, course explainers and admission campaigns." },
    { title: "Founders and coaches", desc: "Personal brand content that showcases expertise and opinions." },
  ],
  faqs: [
    {
      q: "Which platforms should my business be on?",
      a: "The ones your customers actually use. For most consumer businesses that's Instagram and Facebook; for B2B it's usually LinkedIn. We'll recommend a focused set rather than spreading you thin.",
    },
    {
      q: "How many posts do you create per month?",
      a: "That depends on the package and platforms. We agree a content volume that's sustainable and appropriate for your goals.",
    },
    {
      q: "Do you reply to comments and messages?",
      a: "We can support community management based on agreed guidelines, or set up automated replies and routing for common questions.",
    },
    {
      q: "Can you help us shoot content?",
      a: "We provide shot lists and scripts for your team, and can arrange shoots through production partners where needed.",
    },
  ],
  related: ["content-creative", "meta-ads", "linkedin-marketing", "whatsapp-marketing"],
};

export const linkedinMarketing: ServicePage = {
  slug: "linkedin-marketing",
  name: "LinkedIn Marketing",
  pillar: "grow",
  icon: Briefcase,
  summary: "B2B lead generation, LinkedIn Ads and founder branding.",
  meta: {
    title: "LinkedIn Marketing — B2B Lead Generation & Founder Branding",
    description:
      "LinkedIn page management, LinkedIn Ads, B2B lead generation, personal and founder branding and LinkedIn content strategy from Groxdigital.",
  },
  hero: {
    eyebrow: "LinkedIn Marketing",
    title: "Build authority and B2B pipeline on LinkedIn.",
    intro:
      "LinkedIn is where decision-makers research partners, follow industry voices and evaluate vendors. We help companies and founders show up consistently with content and campaigns that start valuable conversations.",
    primaryCta: "Discuss Your B2B Goals",
  },
  problem: {
    title: "Why LinkedIn often underdelivers",
    intro: "Many businesses are on LinkedIn; few use it well.",
    points: [
      { title: "Inactive company page", desc: "Occasional announcements that reach almost no one." },
      { title: "Invisible founders", desc: "Leaders with valuable expertise who rarely post." },
      { title: "Spammy outreach", desc: "Generic connection messages that damage your brand." },
      { title: "Expensive ads, poor leads", desc: "LinkedIn Ads run without tight targeting or a strong offer." },
    ],
  },
  solution: {
    title: "Authority first, pipeline follows",
    body: "We combine thoughtful content from your company and leaders with targeted LinkedIn Ads and respectful lead-generation workflows. Leads are captured in your CRM and followed up properly.",
    points: [
      "Founder and executive content programmes",
      "Company page strategy and management",
      "LinkedIn Ads with tight B2B targeting",
      "Lead magnets suited to professional audiences",
      "CRM integration and follow-up sequences",
    ],
  },
  services: {
    title: "LinkedIn services",
    intro: "For companies, founders and B2B sales teams.",
    groups: [
      {
        title: "Branding",
        desc: "Show up as a credible voice in your industry.",
        items: ["Personal Branding", "Founder Branding", "LinkedIn Profile Optimization", "LinkedIn Content Strategy"],
      },
      {
        title: "Company Presence",
        desc: "A page that reflects your business properly.",
        items: ["LinkedIn Page Management", "Employee Advocacy Planning", "Content Calendars"],
      },
      {
        title: "Lead Generation",
        desc: "Start conversations with the right people.",
        items: ["LinkedIn Lead Generation", "B2B Lead Generation", "LinkedIn Ads", "Lead Gen Forms & CRM Sync"],
      },
    ],
  },
  benefits: [
    { title: "Reach decision-makers", desc: "Target by job title, seniority, industry and company size." },
    { title: "Trust at scale", desc: "Consistent expertise builds familiarity before the first call." },
    { title: "Warmer conversations", desc: "Prospects already know your thinking when you reach out." },
    { title: "Long-term asset", desc: "A strong personal brand keeps working for years." },
  ],
  howItWorks: {
    title: "How we approach LinkedIn",
    intro: "A steady system for visibility and conversations.",
    steps: [
      { label: "Positioning", desc: "Audience & themes", icon: Target },
      { label: "Profiles", desc: "Optimise presence", icon: UserCheck },
      { label: "Content", desc: "Weekly posts", icon: PenTool },
      { label: "Ads & Outreach", desc: "Targeted reach", icon: Megaphone },
      { label: "CRM", desc: "Capture & follow up", icon: Inbox },
    ],
  },
  useCases: [
    { title: "B2B service firms", desc: "Thought-leadership content plus LinkedIn Ads to generate discovery calls." },
    { title: "SaaS startups", desc: "Founder-led content and targeted ads to reach early adopters." },
    { title: "Consultants and advisors", desc: "A personal brand that brings inbound enquiries." },
    { title: "Recruitment and HR", desc: "Employer branding and talent-focused content." },
  ],
  faqs: [
    {
      q: "Do you write posts for founders?",
      a: "Yes. We interview you regularly, capture your ideas and experiences, and turn them into posts in your voice for your approval.",
    },
    {
      q: "Do you use automation tools for outreach?",
      a: "We only use approaches that respect LinkedIn's terms and your brand. We focus on personalised, relevant outreach rather than mass automated messaging.",
    },
    {
      q: "Are LinkedIn Ads worth it?",
      a: "LinkedIn Ads are often more expensive per click than other platforms, but the targeting can make them valuable for B2B offers with higher deal values. We'll help you judge whether they fit.",
    },
  ],
  related: ["lead-generation", "content-creative", "social-media-marketing", "email-marketing"],
};

export const emailMarketing: ServicePage = {
  slug: "email-marketing",
  name: "Email Marketing",
  pillar: "grow",
  icon: Mail,
  summary: "Newsletters, campaigns and automated sequences that nurture and retain customers.",
  meta: {
    title: "Email Marketing — Campaigns, Automation & Lead Nurturing",
    description:
      "Email marketing strategy, newsletters, promotional campaigns, automated welcome, nurture and abandoned cart sequences, copywriting and analytics from Groxdigital.",
  },
  hero: {
    eyebrow: "Email Marketing",
    title: "Turn your email list into a reliable growth channel.",
    intro:
      "Email lets you speak directly to people who've already shown interest, without paying for every impression. We build campaigns and automated sequences that nurture leads, drive repeat sales and keep customers engaged.",
  },
  problem: {
    title: "An underused email list is a missed opportunity",
    intro: "Most businesses collect emails and then do very little with them.",
    points: [
      { title: "No welcome sequence", desc: "New subscribers and leads receive nothing until the next promotion." },
      { title: "Only discount emails", desc: "Constant promotions train customers to wait for sales." },
      { title: "Deliverability issues", desc: "Emails land in spam because of poor setup or list hygiene." },
      { title: "No segmentation", desc: "Everyone receives the same message regardless of interest or behaviour." },
    ],
  },
  solution: {
    title: "Automated journeys plus well-timed campaigns",
    body: "We set up the automated sequences that work in the background, then plan regular campaigns that add value. Everything is segmented, tested and connected to your CRM or store.",
    points: [
      "Deliverability setup (SPF, DKIM, DMARC) and list hygiene",
      "Welcome, nurture and re-engagement sequences",
      "Abandoned cart and post-purchase flows",
      "Segmentation by interest and behaviour",
      "Copywriting and design for every email",
      "Reporting on opens, clicks and revenue",
    ],
  },
  services: {
    title: "Email marketing services",
    intro: "From strategy to send.",
    groups: [
      {
        title: "Strategy & Campaigns",
        desc: "Plan what to send and when.",
        items: ["Email Marketing Strategy", "Newsletter Campaigns", "Promotional Emails", "Email Copywriting"],
      },
      {
        title: "Automation",
        desc: "Sequences that run on their own.",
        items: ["Email Automation", "Automated Email Sequences", "Welcome Emails", "Lead Nurturing"],
      },
      {
        title: "E-commerce & Retention",
        desc: "Recover sales and bring customers back.",
        items: ["Abandoned Cart Emails", "Customer Retention Campaigns", "Post-Purchase Flows", "Win-back Campaigns"],
      },
      {
        title: "Integration & Analytics",
        desc: "Connected, measured and improving.",
        items: ["CRM Email Integration", "Email Analytics", "A/B Testing", "Deliverability Setup"],
      },
    ],
  },
  benefits: [
    { title: "You own the audience", desc: "No algorithm decides whether your subscribers see your message." },
    { title: "Cost-effective", desc: "Reach your list repeatedly without paying per impression." },
    { title: "Always on", desc: "Automated sequences nurture leads around the clock." },
    { title: "Personal at scale", desc: "Segmentation makes each message more relevant." },
  ],
  howItWorks: {
    title: "A simple lead nurturing journey",
    intro: "An example of how an automated sequence moves a new lead toward a conversation.",
    steps: [
      { label: "Sign-up", desc: "Form or lead magnet", icon: Inbox },
      { label: "Welcome", desc: "Immediate email", icon: Mail },
      { label: "Educate", desc: "Helpful content", icon: FileText },
      { label: "Segment", desc: "Based on clicks", icon: Filter },
      { label: "Offer", desc: "Relevant next step", icon: Target },
    ],
  },
  useCases: [
    { title: "Online stores", desc: "Abandoned cart, browse abandonment, post-purchase and replenishment flows." },
    { title: "Service businesses", desc: "Nurture sequences that answer common objections before the sales call." },
    { title: "Education and coaching", desc: "Webinar reminders, course launches and student onboarding." },
    { title: "B2B companies", desc: "Newsletters that keep prospects warm through long sales cycles." },
  ],
  faqs: [
    {
      q: "Which email platform do you use?",
      a: "We work with popular platforms such as Mailchimp, Klaviyo, Brevo, HubSpot and others. We'll recommend one based on your needs, or work with the platform you already use.",
    },
    {
      q: "Do you follow email marketing regulations?",
      a: "Yes. We follow consent-based practices, include clear unsubscribe options and help you comply with the rules that apply in your markets.",
    },
    {
      q: "Can you design email templates?",
      a: "Yes. We design responsive, on-brand templates that work across devices and email clients.",
    },
  ],
  related: ["whatsapp-marketing", "ai-automation", "ecommerce", "lead-generation"],
};
