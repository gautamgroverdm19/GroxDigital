import { LegalPage } from "@/components/templates/LegalPage";
import { Val } from "@/components/ui/Placeholder";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Disclaimer",
  description: `Important information about the content on the ${site.name} website, results, third-party platforms and the website assistant.`,
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      path="/disclaimer"
      intro="Please read this disclaimer carefully before relying on information on this website."
    >
      <h2>General information only</h2>
      <p>
        The content on this website, including articles, service descriptions and assistant responses, is provided for general information.
        It is not legal, financial, tax or other professional advice, and should not be relied on as such.
      </p>

      <h2>No guaranteed results</h2>
      <p>
        Results from websites, SEO, advertising, social media, email, WhatsApp, AI and automation vary by business. They depend on factors
        such as market conditions, competition, budget, offer, platform changes and implementation. {site.name} does not guarantee any
        specific outcome, including rankings, traffic, leads, sales, revenue or return on ad spend.
      </p>

      <h2>Examples and case studies</h2>
      <p>
        Any examples, use cases or demo case studies on this website are illustrative. Where a case study is marked as a demo or
        placeholder, it does not describe a real client and no results are claimed. Published client results, where shown, reflect that
        client&apos;s circumstances and are not a promise of similar outcomes.
      </p>

      <h2>Third-party platforms</h2>
      <p>
        We work with platforms such as Google, Meta, LinkedIn, WhatsApp and various software providers. We are not affiliated with, endorsed
        by or acting on behalf of these companies unless stated. Their policies, pricing and features may change at any time and are outside
        our control. All trademarks belong to their respective owners.
      </p>

      <h2>AI-generated content and automated responses</h2>
      <p>
        Our website assistant is an automated tool that provides general guidance. AI and automated systems can produce inaccurate or
        incomplete information. Please verify important information with our team.
      </p>

      <h2>Accuracy</h2>
      <p>
        We aim to keep information accurate and up to date but make no warranties about its completeness or accuracy. Information may change
        without notice.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email <Val value={site.contact.email} />.
      </p>
    </LegalPage>
  );
}
