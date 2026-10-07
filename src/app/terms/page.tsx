import Link from "next/link";
import { CompanyDetails, LegalPage } from "@/components/templates/LegalPage";
import { Ph, Val } from "@/components/ui/Placeholder";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description: `The terms and conditions that govern use of the ${site.name} website and our services.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      path="/terms"
      intro={`These terms govern your use of the ${site.name} website. Services we provide to clients are also governed by the specific proposal, statement of work or agreement signed for that engagement.`}
    >
      <h2>1. About us</h2>
      <CompanyDetails />

      <h2>2. Acceptance of terms</h2>
      <p>By accessing or using this website, you agree to these terms. If you do not agree, please do not use the website.</p>

      <h2>3. Use of the website</h2>
      <ul>
        <li>You may use the website for lawful purposes only.</li>
        <li>You must not attempt to gain unauthorised access to the website, its servers or connected systems.</li>
        <li>You must not submit false, misleading or harmful information through our forms or assistant.</li>
        <li>You must not use automated tools to scrape, overload or disrupt the website.</li>
      </ul>

      <h2>4. Services and engagements</h2>
      <p>
        Information on this website describes our services in general terms. The scope, deliverables, timelines, fees and payment terms of
        any engagement are set out in a separate written proposal or agreement. If there is a conflict, the signed agreement prevails.
      </p>
      <ul>
        <li>
          Third-party costs such as advertising spend, software subscriptions, domains, hosting and messaging fees are paid by the client
          unless agreed otherwise in writing.
        </li>
        <li>Clients are responsible for providing accurate information, timely feedback and necessary access to accounts and assets.</li>
        <li>
          Clients are responsible for ensuring their products, services, offers and claims comply with applicable laws and platform
          policies.
        </li>
      </ul>

      <h2>5. No guarantee of results</h2>
      <p>
        Marketing, SEO, advertising and automation outcomes depend on many factors outside our control, including platform algorithms,
        competition, market conditions and client decisions. We do not guarantee specific rankings, traffic, leads, sales or returns. See
        our <Link href="/disclaimer">Disclaimer</Link>.
      </p>

      <h2>6. Intellectual property</h2>
      <p>
        The content, design, graphics and code of this website are owned by or licensed to {site.name} and protected by intellectual
        property laws. You may not copy or reuse them without permission. Ownership of work created for clients is defined in the relevant
        client agreement. <Ph>[Confirm default IP transfer terms for client deliverables.]</Ph>
      </p>

      <h2>7. Third-party links and tools</h2>
      <p>
        The website may link to third-party websites or rely on third-party services. We are not responsible for their content, policies or
        availability.
      </p>

      <h2>8. Website assistant</h2>
      <p>
        The Growth Assistant on this website provides automated, general information only. It is not professional advice and may not be
        accurate or complete. Please contact us to discuss your specific situation.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, {site.name} is not liable for indirect, incidental or consequential losses arising from use
        of this website. <Ph>[Insert liability cap and exclusions as advised by your legal counsel.]</Ph>
      </p>

      <h2>10. Indemnity</h2>
      <p>You agree to indemnify us against claims arising from your misuse of the website or breach of these terms.</p>

      <h2>11. Changes</h2>
      <p>We may update these terms from time to time. Continued use of the website after changes means you accept the updated terms.</p>

      <h2>12. Governing law</h2>
      <p>
        These terms are governed by the laws of <Val value={site.legal.jurisdiction} />, and disputes are subject to the exclusive
        jurisdiction of the courts of <Ph>[City / Jurisdiction]</Ph>.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions about these terms can be sent to <Val value={site.contact.email} />.
      </p>
    </LegalPage>
  );
}
