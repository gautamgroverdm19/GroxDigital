import {
  Bell,
  Bot,
  Brain,
  CalendarCheck,
  ClipboardList,
  Database,
  FileSpreadsheet,
  Filter,
  Inbox,
  Lightbulb,
  Mail,
  MessageCircle,
  PlugZap,
  RefreshCw,
  Rocket,
  Search,
  Send,
  Settings2,
  Smartphone,
  Sparkles,
  Target,
  UserCheck,
  Workflow,
} from "lucide-react";
import type { ServicePage } from "../types";

export const aiSolutions: ServicePage = {
  slug: "ai-solutions",
  name: "AI Solutions",
  pillar: "automate",
  icon: Brain,
  summary: "Practical AI for support, sales, content, research and internal work.",
  meta: {
    title: "AI Solutions for Business — AI Agents, Chatbots & Consulting",
    description:
      "Groxdigital helps businesses put AI to practical use: AI consulting, AI chatbots and agents, AI customer support, lead qualification, sales assistants, content and custom AI tools.",
  },
  hero: {
    eyebrow: "AI Solutions",
    title: "Practical AI that saves time and supports growth.",
    intro:
      "AI is most useful when it's applied to real, specific problems. We help you identify where AI can make a difference in your business, then design, build and integrate solutions your team will actually use.",
    primaryCta: "Book an AI Consultation",
  },
  problem: {
    title: "Interested in AI but unsure where to start?",
    intro: "Most businesses know AI matters. Fewer know how to apply it safely and usefully.",
    points: [
      { title: "Too many tools", desc: "New AI products launch daily, and it's hard to know which are worth adopting." },
      { title: "Experiments that stall", desc: "Promising pilots that never become part of how the business works." },
      { title: "Data and privacy concerns", desc: "Uncertainty about what information can safely be used with AI." },
      { title: "No in-house expertise", desc: "Teams lack the time or skills to design and maintain AI systems." },
    ],
  },
  solution: {
    title: "From AI idea to working system",
    body: "We start with your processes and goals, find the tasks where AI can genuinely help, and build solutions that connect to the tools you already use. Every solution includes human oversight, clear boundaries and a plan for measuring value.",
    points: [
      "AI opportunity assessment across your business",
      "Use cases prioritised by value and feasibility",
      "Solutions integrated with your website, CRM and messaging",
      "Human review built in where accuracy matters",
      "Responsible data handling and access controls",
      "Training so your team can use and improve the system",
    ],
  },
  services: {
    title: "AI services",
    intro: "Consulting, ready-to-deploy solutions and custom AI builds.",
    groups: [
      {
        title: "Strategy & Consulting",
        desc: "Decide where AI fits and how to adopt it responsibly.",
        items: ["AI Business Consulting", "AI Readiness Assessment", "AI Productivity Systems", "Team Training & Enablement"],
      },
      {
        title: "Customer-Facing AI",
        desc: "Respond faster and qualify leads around the clock.",
        items: ["AI Chatbots", "AI Customer Support", "AI Lead Qualification", "AI Sales Assistants", "AI-powered Website Features"],
      },
      {
        title: "Marketing & Content AI",
        desc: "Produce and personalise content efficiently.",
        items: ["AI Content Creation", "AI Marketing Systems", "AI Image & Video Concepts", "Personalisation"],
      },
      {
        title: "Operations & Data AI",
        desc: "Reduce manual work behind the scenes.",
        items: ["AI Workflow Automation", "AI Data Processing", "AI Research Systems", "AI-powered Internal Business Systems"],
      },
      {
        id: "custom-ai",
        title: "Custom AI",
        desc: "Tailored tools and agents for specific workflows.",
        items: ["AI Agents", "Custom AI Solutions", "AI-powered Business Tools", "Knowledge-base Assistants"],
      },
    ],
  },
  spotlight: {
    id: "ai-agents",
    eyebrow: "AI Agents",
    title: "AI Agents for Your Business",
    intro:
      "An AI agent is software that can understand a request, use your information and tools, and complete a task, handing over to a person when it should. Agents work best on well-defined, repetitive tasks with clear rules. Here are tasks businesses commonly use them for:",
    items: [
      { title: "Lead qualification", desc: "Ask the right questions, score enquiries and route serious prospects to sales." },
      { title: "Customer support", desc: "Answer common questions from your knowledge base and escalate complex issues." },
      { title: "Appointment handling", desc: "Check availability, book, reschedule and send reminders." },
      { title: "FAQ answering", desc: "Give consistent, accurate answers about services, pricing and policies." },
      { title: "Follow-ups", desc: "Send timely, personalised follow-ups so leads don't go cold." },
      { title: "Data collection", desc: "Gather documents and details from customers in a structured way." },
      { title: "Content generation", desc: "Draft posts, emails, descriptions and summaries for human review." },
      { title: "Internal workflows", desc: "Move information between tools, update records and trigger next steps." },
      { title: "Reporting", desc: "Compile data from multiple sources into regular summaries." },
      { title: "Research", desc: "Collect and summarise information on markets, competitors or prospects." },
      { title: "Sales assistance", desc: "Prepare call notes, draft proposals and suggest next actions." },
    ],
  },
  benefits: [
    { title: "Faster responses", desc: "Customers get answers immediately, even outside business hours." },
    { title: "More time for important work", desc: "Your team spends less time on repetitive tasks." },
    { title: "Consistency", desc: "Processes follow the same steps every time." },
    { title: "Scalable", desc: "Handle more enquiries and data without adding the same amount of headcount." },
  ],
  howItWorks: {
    title: "How we deliver AI solutions",
    intro: "A careful, step-by-step approach that starts small and proves value.",
    steps: [
      { label: "Assess", desc: "Processes & data", icon: Search },
      { label: "Prioritise", desc: "Highest-value use case", icon: Lightbulb },
      { label: "Prototype", desc: "Test with real cases", icon: Sparkles },
      { label: "Integrate", desc: "Connect your tools", icon: PlugZap },
      { label: "Improve", desc: "Monitor & refine", icon: RefreshCw },
    ],
  },
  useCases: [
    { title: "Immigration consultancy", desc: "An assistant that answers eligibility FAQs, collects details and books consultations." },
    { title: "Clinic or hospital", desc: "Appointment handling, reminders and answers to common pre-visit questions." },
    { title: "Real-estate agency", desc: "Lead qualification on budget, location and timeline before handover to agents." },
    { title: "Professional services firm", desc: "An internal assistant that searches policies, templates and past work." },
  ],
  faqs: [
    {
      q: "Will AI replace my team?",
      a: "That isn't our goal. We use AI to remove repetitive work so your team can focus on judgment, relationships and higher-value tasks. Most solutions include clear hand-offs to people.",
    },
    {
      q: "Which AI models or platforms do you use?",
      a: "We choose models and platforms based on the task, budget, data requirements and where you operate. We'll explain the options and trade-offs before building.",
    },
    {
      q: "Is my business data safe?",
      a: "We design solutions with data minimisation, access controls and appropriate vendor settings, and we'll discuss what data should and shouldn't be used. Specific obligations are covered in your agreement.",
    },
    {
      q: "What if the AI gives a wrong answer?",
      a: "AI can make mistakes. We reduce the risk by grounding answers in your approved information, limiting what the system can do, adding human review where needed and monitoring conversations.",
    },
    {
      q: "Do I need a large budget to start with AI?",
      a: "No. Many businesses start with one focused use case, such as a website assistant or a lead-qualification workflow, then expand once it proves useful.",
    },
  ],
  related: ["ai-automation", "whatsapp-marketing", "lead-generation", "website-development"],
  cta: { title: "Find out where AI can help your business.", primary: "Book an AI Consultation" },
};

export const aiAutomation: ServicePage = {
  slug: "ai-automation",
  name: "AI Automation",
  pillar: "automate",
  icon: Workflow,
  summary: "Automate lead handling, CRM updates, follow-ups, reporting and other repetitive work.",
  meta: {
    title: "AI Automation & Business Process Automation — n8n, Make, Zapier",
    description:
      "Stop doing manually what AI can automate. Groxdigital builds business process automation, CRM, email and WhatsApp automation, AI agents and API integrations with n8n, Make and Zapier.",
  },
  hero: {
    eyebrow: "AI Automation",
    title: "Stop Doing Manually What AI Can Automate.",
    intro:
      "Copying data between tools, chasing follow-ups and building reports by hand slows your team down. We design and build automations that handle the repetitive work reliably, with AI where it adds intelligence.",
    primaryCta: "Get an Automation Review",
  },
  problem: {
    title: "Manual work is costing more than you think",
    intro: "Small repetitive tasks add up to hours every week and cause avoidable mistakes.",
    points: [
      { title: "Slow lead response", desc: "Enquiries wait hours or days for a reply while prospects contact competitors." },
      { title: "Copy-paste data entry", desc: "Information is retyped between forms, spreadsheets, CRMs and invoices." },
      { title: "Forgotten follow-ups", desc: "Reminders depend on someone remembering to send them." },
      { title: "Manual reporting", desc: "Hours spent each week pulling numbers into the same spreadsheet." },
    ],
  },
  solution: {
    title: "Reliable workflows that run in the background",
    body: "We map how work currently flows through your business, find the steps that can be automated and build workflows that connect your tools. AI handles tasks that need understanding, like classifying enquiries or summarising messages, while rules handle the rest.",
    points: [
      "Process mapping and automation opportunities",
      "Workflows built in n8n, Make, Zapier or custom code",
      "AI steps for classification, extraction and drafting",
      "Error handling, logging and alerts",
      "Documentation and hand-over to your team",
    ],
  },
  services: {
    title: "Automation services",
    intro: "From a single workflow to an automation layer across your business.",
    groups: [
      {
        id: "business-automation",
        title: "Business Process Automation",
        desc: "Remove repetitive steps from everyday operations.",
        items: [
          "Business Process Automation",
          "Data Entry Automation",
          "Reporting Automation",
          "Google Sheets Automation",
          "Document & Invoice Workflows",
        ],
      },
      {
        title: "Sales & Marketing Automation",
        desc: "Respond faster and never miss a follow-up.",
        items: [
          "Lead Automation",
          "Sales Automation",
          "Marketing Automation",
          "Follow-up Automation",
          "Email Automation",
          "Sales Funnel Development",
        ],
      },
      {
        title: "Customer Communication",
        desc: "Keep customers informed automatically.",
        items: ["WhatsApp Automation", "Customer Support Automation", "Appointment Automation", "Review Request Automation"],
      },
      {
        title: "CRM & Integrations",
        desc: "Connect the tools you already use.",
        items: ["CRM Automation", "CRM Setup", "CRM Integrations", "API Integrations", "Webhooks & Custom Connectors"],
      },
      {
        title: "AI & Platforms",
        desc: "The right tool for each workflow.",
        items: [
          "AI Workflow Automation",
          "AI Agent Development",
          "No-Code / Low-Code Automation",
          "n8n Automation",
          "Make Automation",
          "Zapier Automation",
        ],
      },
    ],
  },
  benefits: [
    { title: "Hours back every week", desc: "Your team stops doing the same tasks over and over." },
    { title: "Faster responses", desc: "Leads and customers hear back in minutes, not days." },
    { title: "Fewer errors", desc: "Data moves between systems accurately and consistently." },
    { title: "Visibility", desc: "Automatic logging and reports show what's happening." },
  ],
  howItWorks: {
    title: "How an automation project works",
    intro: "We build in small, testable steps so you see value early.",
    steps: [
      { label: "Map", desc: "Current process", icon: ClipboardList },
      { label: "Design", desc: "Automated workflow", icon: Settings2 },
      { label: "Build", desc: "Connect tools & AI", icon: PlugZap },
      { label: "Test", desc: "Real scenarios", icon: UserCheck },
      { label: "Launch & Monitor", desc: "Alerts & logs", icon: Rocket },
    ],
  },
  workflows: [
    {
      title: "Example: instant lead response",
      steps: [
        { label: "Form / Ad Lead", icon: Inbox },
        { label: "AI Qualifies", icon: Brain },
        { label: "CRM Updated", icon: Database },
        { label: "WhatsApp Reply", icon: MessageCircle },
        { label: "Sales Alert", icon: Bell },
      ],
    },
    {
      title: "Example: appointment automation",
      steps: [
        { label: "Booking Made", icon: CalendarCheck },
        { label: "Confirmation", icon: Send },
        { label: "Reminder", icon: Bell },
        { label: "Visit / Call", icon: UserCheck },
        { label: "Review Request", icon: Sparkles },
      ],
    },
    {
      title: "Example: weekly reporting",
      steps: [
        { label: "Ads + CRM + GA4", icon: Database },
        { label: "Data Collected", icon: FileSpreadsheet },
        { label: "AI Summary", icon: Brain },
        { label: "Report Sent", icon: Mail },
      ],
    },
  ],
  useCases: [
    { title: "Lead routing for a sales team", desc: "New leads are scored, assigned to the right person and followed up automatically." },
    { title: "Client onboarding", desc: "Welcome emails, document collection, CRM records and task creation in one flow." },
    { title: "E-commerce operations", desc: "Order updates, inventory alerts and customer notifications without manual steps." },
    { title: "Agency and team reporting", desc: "Weekly performance reports compiled and summarised automatically." },
  ],
  faqs: [
    {
      q: "Which automation platform is best: n8n, Make or Zapier?",
      a: "Each has strengths. Zapier is simple and widely supported, Make handles complex visual workflows well, and n8n offers flexibility and self-hosting. We'll recommend one based on your workflows, volume and budget.",
    },
    {
      q: "What can't be automated?",
      a: "Tasks that require judgment, relationships or sensitive decisions usually need a person. We design automations that handle the routine parts and hand over to people at the right moment.",
    },
    {
      q: "What happens if an automation breaks?",
      a: "We build in error handling and alerts so issues are flagged quickly, and offer ongoing support and monitoring plans.",
    },
    {
      q: "Do I need to change the tools I use?",
      a: "Usually not. Most automation connects the tools you already have. We'll only suggest changes if a tool is holding the process back.",
    },
  ],
  related: ["ai-solutions", "whatsapp-marketing", "email-marketing", "lead-generation"],
  cta: {
    title: "What would you automate first?",
    intro: "Share the tasks that take up your team's time. We'll suggest what can be automated and how.",
    primary: "Get an Automation Review",
  },
};

export const whatsappMarketing: ServicePage = {
  slug: "whatsapp-marketing",
  name: "WhatsApp Marketing",
  pillar: "automate",
  icon: MessageCircle,
  summary: "WhatsApp campaigns, chatbots, automated replies and CRM integration.",
  meta: {
    title: "WhatsApp Marketing & Automation — API, Chatbots & Campaigns",
    description:
      "WhatsApp Business setup, WhatsApp API solutions, chatbots, automated replies, lead follow-ups, appointment reminders, broadcast campaigns and CRM integration from Groxdigital.",
  },
  hero: {
    eyebrow: "WhatsApp Marketing & Automation",
    title: "Meet customers on the app they already check all day.",
    intro:
      "For many customers, WhatsApp is the easiest way to contact a business. We help you use it properly, with fast automated replies, qualified leads, timely reminders and opt-in campaigns, all connected to your CRM.",
    primaryCta: "Set Up WhatsApp Automation",
  },
  problem: {
    title: "WhatsApp is busy, but often unmanaged",
    intro: "When everything runs through one phone, things get missed.",
    points: [
      { title: "Missed messages", desc: "Enquiries arrive after hours or during busy periods and never get answered." },
      { title: "Same questions, every day", desc: "Your team types the same answers about prices, timings and locations." },
      { title: "No record of leads", desc: "Conversations live on a phone instead of in a CRM." },
      { title: "Risky broadcasting", desc: "Bulk messages without opt-in or approved templates can get numbers restricted." },
    ],
  },
  solution: {
    title: "A WhatsApp system, not just a phone number",
    body: "We set up WhatsApp Business or the WhatsApp Business API, build chatbot flows for common questions, connect conversations to your CRM and create compliant campaigns for opted-in customers.",
    points: [
      "WhatsApp Business and API setup and verification",
      "Automated greetings, FAQs and lead capture",
      "AI-assisted replies with hand-off to your team",
      "CRM integration and lead tagging",
      "Reminders and follow-ups using approved templates",
      "Opt-in based broadcast strategy",
    ],
  },
  services: {
    title: "WhatsApp services",
    intro: "Marketing, automation and integration in one place.",
    groups: [
      {
        title: "Setup",
        desc: "The right foundation for your volume and use case.",
        items: ["WhatsApp Business Setup", "WhatsApp API Solutions", "Template Approval Support", "Catalogue Setup"],
      },
      {
        title: "Marketing",
        desc: "Reach customers who've opted in.",
        items: [
          "WhatsApp Marketing",
          "WhatsApp Campaigns",
          "WhatsApp Broadcast Strategy",
          "Promotional Campaigns",
          "WhatsApp Lead Generation",
        ],
      },
      {
        title: "Automation",
        desc: "Instant, consistent responses.",
        items: ["WhatsApp Automation", "Automated Customer Replies", "WhatsApp Chatbots", "Lead Follow-ups", "Appointment Reminders"],
      },
      {
        title: "Integration",
        desc: "Connect WhatsApp to the rest of your business.",
        items: ["WhatsApp CRM Integration", "Website & Ads Click-to-WhatsApp", "Team Inbox Setup"],
      },
    ],
  },
  benefits: [
    { title: "Faster replies", desc: "Instant automated responses, any time of day." },
    { title: "Higher engagement", desc: "Messages land where customers are already active." },
    { title: "Organised leads", desc: "Every conversation captured and tagged in your CRM." },
    { title: "Fewer no-shows", desc: "Automated reminders before appointments and calls." },
  ],
  howItWorks: {
    title: "From first message to conversion",
    intro: "How a WhatsApp enquiry flows through an automated system.",
    steps: [
      { label: "Customer", desc: "Clicks ad or website", icon: Smartphone },
      { label: "WhatsApp", desc: "Starts a chat", icon: MessageCircle },
      { label: "AI / Automation", desc: "Instant reply", icon: Bot },
      { label: "Qualification", desc: "Key questions", icon: Filter },
      { label: "CRM", desc: "Lead recorded", icon: Database },
      { label: "Follow-up", desc: "Timely nudges", icon: Bell },
      { label: "Conversion", desc: "Booked or sold", icon: Target },
    ],
  },
  useCases: [
    { title: "Clinics", desc: "Appointment booking, reminders, pre-visit instructions and follow-ups." },
    { title: "Real estate", desc: "Instant property details, site-visit scheduling and agent hand-off." },
    { title: "Restaurants", desc: "Menu sharing, table reservations and promotional offers to opted-in guests." },
    { title: "Education & immigration", desc: "Eligibility questions, document checklists and counsellor scheduling." },
  ],
  faqs: [
    {
      q: "What's the difference between WhatsApp Business and the API?",
      a: "The WhatsApp Business app suits small teams using one phone. The WhatsApp Business Platform (API) supports multiple agents, chatbots, CRM integrations and automated messaging at larger scale.",
    },
    {
      q: "Can I send bulk messages on WhatsApp?",
      a: "You can send messages to customers who have opted in, using approved templates through the WhatsApp Business Platform. We help you follow WhatsApp's policies to protect your number.",
    },
    {
      q: "Does WhatsApp charge for messages?",
      a: "Business-initiated conversations through the API are charged by Meta according to its current pricing, which varies by country and message category. We'll explain the costs that apply to you.",
    },
    {
      q: "Can a chatbot hand over to a person?",
      a: "Yes. Chatbot flows include clear hand-off points so your team can take over complex or sensitive conversations.",
    },
  ],
  related: ["ai-automation", "lead-generation", "email-marketing", "ai-solutions"],
};
