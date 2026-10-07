import Link from "next/link";
import { LegalPage } from "@/components/templates/LegalPage";
import { Ph, Val } from "@/components/ui/Placeholder";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Data Processing & Data Privacy",
  description: `How ${site.name} processes client and end-customer data when delivering marketing, AI and automation services.`,
  path: "/data-processing",
});

export default function DataProcessingPage() {
  return (
    <LegalPage
      title="Data Processing & Data Privacy"
      path="/data-processing"
      intro="Many of our services involve handling data on behalf of clients, such as leads, customer contact details and campaign data. This page summarises how we approach that responsibility."
    >
      <h2>1. Our role</h2>
      <p>
        When we process personal data on behalf of a client (for example, leads in a CRM, WhatsApp conversations, email lists or analytics
        data), the client is generally the data controller (or &ldquo;data fiduciary&rdquo;) and {site.name} acts as a data processor. The
        client decides why and how the data is used; we process it only on documented instructions.
      </p>

      <h2>2. Data processing agreements</h2>
      <p>
        Where required by law or requested by a client, we enter into a data processing agreement (DPA) that sets out the subject matter,
        duration, nature and purpose of processing, the types of data and the obligations of each party.{" "}
        <Ph>[Link to or describe your standard DPA.]</Ph>
      </p>

      <h2>3. Our commitments</h2>
      <ul>
        <li>Process personal data only for the agreed purposes and on the client&apos;s instructions.</li>
        <li>Access only the data needed for the work, using individual, least-privilege accounts where possible.</li>
        <li>Keep data confidential and ensure team members are bound by confidentiality obligations.</li>
        <li>Use appropriate technical and organisational security measures.</li>
        <li>Use sub-processors only where necessary and with appropriate safeguards.</li>
        <li>Notify clients without undue delay if we become aware of a personal data breach affecting their data.</li>
        <li>Support clients in responding to data subject requests where applicable.</li>
        <li>Delete or return client data at the end of the engagement, unless retention is required by law.</li>
      </ul>

      <h2>4. AI and automation</h2>
      <p>When building AI assistants and automations, we:</p>
      <ul>
        <li>Minimise the personal data sent to AI models and third-party tools.</li>
        <li>
          Review vendor data-use and retention settings, and prefer configurations that do not use client data for model training where
          available.
        </li>
        <li>Design human review and hand-off points for sensitive or high-impact decisions.</li>
        <li>Document data flows so clients understand where their data goes.</li>
      </ul>

      <h2>5. Client responsibilities</h2>
      <ul>
        <li>
          Ensure there is a lawful basis and any required consent for collecting and using personal data, including for marketing messages
          on email and WhatsApp.
        </li>
        <li>Maintain accurate privacy notices for their own customers.</li>
        <li>Provide clear instructions about the data we should process.</li>
      </ul>

      <h2>6. Sub-processors</h2>
      <p>
        <Ph>
          [List categories or names of sub-processors used, e.g. hosting, automation platforms, CRM, email and messaging providers, AI
          providers.]
        </Ph>
      </p>

      <h2>7. Contact</h2>
      <p>
        For data protection questions or to request a DPA, contact <Ph>[privacy@your-domain.com]</Ph> or <Val value={site.contact.email} />.
        See also our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
