/**
 * Blog articles. Each post is structured content rendered by /blog/[slug].
 * Add new posts to the top of the list; dates use ISO format (YYYY-MM-DD).
 */
export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readingMinutes: number;
  related: string[];
  body: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "where-to-start-with-ai-automation",
    title: "Where to start with AI automation in a small or mid-sized business",
    description:
      "A practical way to find the first workflows worth automating, avoid common mistakes and decide when AI is actually needed.",
    category: "AI & Automation",
    date: "2026-10-07",
    readingMinutes: 6,
    related: ["ai-automation", "ai-solutions"],
    body: [
      {
        type: "p",
        text: "Most businesses don't need a grand AI strategy to get started. They need one well-chosen workflow that saves time every week and proves the value of automation to the team. Here's how to find it.",
      },
      { type: "h2", text: "1. List the tasks your team repeats" },
      {
        type: "p",
        text: "Ask each person to note the tasks they do more than a few times a week that follow roughly the same steps. Typical examples include replying to new enquiries, copying lead details into a CRM or spreadsheet, sending reminders, and compiling weekly reports.",
      },
      { type: "h2", text: "2. Score each task on three questions" },
      {
        type: "ul",
        items: [
          "How often does it happen, and how long does it take each time?",
          "What happens when it's done late or incorrectly? Lost leads, unhappy customers, bad data?",
          "Are the steps clear enough to write down as rules?",
        ],
      },
      {
        type: "p",
        text: "Tasks that are frequent, costly when missed and rule-based are the best first candidates. Lead response is often near the top of the list, because speed has a direct effect on whether a prospect stays interested.",
      },
      { type: "h2", text: "3. Decide whether you need AI at all" },
      {
        type: "p",
        text: "Many valuable automations are simple rules: when a form is submitted, create a CRM record and send a WhatsApp message. AI becomes useful when a step requires understanding language, such as classifying an enquiry, extracting details from an email or drafting a personalised reply. Use AI for those steps and plain rules for the rest; it keeps the system cheaper and more predictable.",
      },
      { type: "h2", text: "4. Keep a person in the loop where it matters" },
      {
        type: "p",
        text: "AI can make mistakes. For anything customer-facing or high-stakes, design clear hand-off points where a person reviews, approves or takes over. Start with AI drafting and humans sending, then increase automation as confidence grows.",
      },
      { type: "h2", text: "5. Measure before and after" },
      {
        type: "p",
        text: "Record how long the task takes and how often things slip through before you automate. After launch, compare. This gives you an honest view of the value and helps decide what to automate next.",
      },
      { type: "h2", text: "Common mistakes to avoid" },
      {
        type: "ul",
        items: [
          "Automating a broken process instead of fixing it first",
          "Building without error alerts, so failures go unnoticed",
          "Choosing tools before understanding the workflow",
          "Sending customer data to tools without checking privacy settings and agreements",
        ],
      },
    ],
  },
  {
    slug: "google-business-profile-checklist",
    title: "A Google Business Profile checklist for local businesses",
    description:
      "The profile settings, content and review habits that help local businesses present themselves properly on Google Search and Maps.",
    category: "Local SEO",
    date: "2026-10-07",
    readingMinutes: 5,
    related: ["google-business-profile", "seo"],
    body: [
      {
        type: "p",
        text: "For many local businesses, the Google Business Profile is seen by more potential customers than the website. Yet it's often set up once and forgotten. Use this checklist to review yours.",
      },
      { type: "h2", text: "Profile basics" },
      {
        type: "ul",
        items: [
          "Business name matches your real-world signage, without added keywords",
          "Address or service area is accurate and consistent with your website",
          "Phone number and website link are correct and tracked",
          "Opening hours, including holiday hours, are up to date",
        ],
      },
      { type: "h2", text: "Categories and services" },
      {
        type: "p",
        text: "Your primary category has a strong influence on which searches you appear for. Choose the most specific category that describes your main service, then add relevant secondary categories. List your individual services with clear descriptions.",
      },
      { type: "h2", text: "Photos and posts" },
      {
        type: "ul",
        items: [
          "Add real photos of your premises, team and work; avoid generic stock images",
          "Upload new photos regularly",
          "Use posts for offers, events and updates",
        ],
      },
      { type: "h2", text: "Reviews" },
      {
        type: "p",
        text: "Ask genuine customers for reviews at a natural moment, such as after a completed service, and make it easy with a direct link. Respond to every review, positive or negative, politely and specifically. Never buy reviews or offer incentives in exchange for them; this breaks Google's policies and can lead to penalties.",
      },
      { type: "h2", text: "Support from your website" },
      {
        type: "p",
        text: "Your website should reinforce the same name, address and phone number, and include pages for each core service and location you serve. This helps Google understand your relevance for local searches.",
      },
    ],
  },
  {
    slug: "why-conversion-tracking-matters",
    title: "Why conversion tracking matters before you increase ad spend",
    description:
      "Without accurate tracking, you can't tell which campaigns produce customers. Here's what to track and why it improves ad performance.",
    category: "Analytics",
    date: "2026-10-07",
    readingMinutes: 5,
    related: ["analytics-tracking", "meta-ads", "google-ads"],
    body: [
      {
        type: "p",
        text: "It's tempting to increase ad budgets when a campaign seems to be working. But if conversion tracking is incomplete, you may be scaling the wrong campaigns, or cutting the right ones.",
      },
      { type: "h2", text: "What to track" },
      {
        type: "ul",
        items: [
          "Form submissions, tracked on successful submission rather than button clicks",
          "Click-to-call and click-to-WhatsApp actions",
          "Bookings and purchases, including value where possible",
          "Lead status changes in your CRM, such as qualified or closed",
        ],
      },
      { type: "h2", text: "Why ad platforms need good data" },
      {
        type: "p",
        text: "Platforms such as Google Ads and Meta use conversion data to decide who to show your ads to. If conversions are missing or include low-quality actions, automated bidding learns the wrong lessons. Server-side connections such as Meta's Conversion API and Google's enhanced conversions can help recover signals that browser tracking misses.",
      },
      { type: "h2", text: "Track quality, not just quantity" },
      {
        type: "p",
        text: "Where possible, send information about which leads became qualified or turned into customers back to the ad platforms. This helps campaigns optimise for the outcomes your business actually cares about.",
      },
      { type: "h2", text: "Respect privacy" },
      {
        type: "p",
        text: "Tracking should respect user consent and applicable privacy laws. Use a consent management tool where required, keep your privacy policy accurate, and only collect the data you need.",
      },
      { type: "h2", text: "A quick self-check" },
      {
        type: "ol",
        items: [
          "Submit a test enquiry and confirm it appears in analytics and your ad platforms",
          "Compare the number of conversions reported with the leads in your inbox or CRM",
          "Check that each campaign is optimising for the right conversion action",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
