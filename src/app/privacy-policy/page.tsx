import Link from "next/link";
import { CompanyDetails, LegalPage } from "@/components/templates/LegalPage";
import { Ph } from "@/components/ui/Placeholder";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, shares and protects personal information when you use our website and services.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      intro={`This policy explains how ${site.name} collects, uses and protects personal information when you visit our website, contact us or use our services.`}
    >
      <h2>1. Who we are</h2>
      <p>This website is operated by:</p>
      <CompanyDetails />
      <p>
        For privacy questions or requests, contact our privacy contact, <Ph>[Name / Role of Privacy or Grievance Officer]</Ph>, at{" "}
        <Ph>[privacy@your-domain.com]</Ph>.
      </p>

      <h2>2. Information we collect</h2>
      <h3>Information you provide</h3>
      <ul>
        <li>Contact details such as your name, business name, email address, phone or WhatsApp number and website.</li>
        <li>Details about your business, industry, the services you&apos;re interested in, budget range and your message.</li>
        <li>Information you share through our website assistant, email, WhatsApp, calls or meetings.</li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li>Device and usage data such as IP address, browser type, pages visited, referring pages and time spent on the site.</li>
        <li>
          Cookie and similar technology data, as described in our <Link href="/cookie-policy">Cookie Policy</Link>.
        </li>
      </ul>
      <h3>Information from clients during projects</h3>
      <p>
        When we provide services, we may access data held in your systems (for example, CRM, analytics or advertising accounts). We process
        this data on your behalf as described in our <Link href="/data-processing">Data Processing information</Link>.
      </p>

      <h2>3. How we use information</h2>
      <ul>
        <li>To respond to enquiries and provide consultations, proposals and services.</li>
        <li>To manage our relationship with clients, including billing and communication.</li>
        <li>To operate, secure and improve our website and services.</li>
        <li>To send marketing communications where you have consented or where otherwise permitted by law. You can opt out at any time.</li>
        <li>To comply with legal obligations and protect our legal rights.</li>
      </ul>

      <h2>4. Legal basis for processing</h2>
      <p>
        Depending on your location, we rely on one or more of the following: your consent, performance of a contract or steps before
        entering one, our legitimate interests (such as responding to enquiries and improving our services), and compliance with legal
        obligations.{" "}
        <Ph>[Confirm the legal bases and applicable laws for your jurisdiction, e.g. GDPR, UK GDPR, India&apos;s DPDP Act.]</Ph>
      </p>

      <h2>5. Sharing information</h2>
      <p>We do not sell personal information. We may share information with:</p>
      <ul>
        <li>Service providers that help us operate, such as hosting, email, CRM, analytics, communication and automation tools.</li>
        <li>Professional advisers such as lawyers and accountants, where necessary.</li>
        <li>Authorities, where required by law or to protect rights and safety.</li>
      </ul>
      <p>
        Key service providers: <Ph>[List main processors, e.g. hosting provider, CRM, email platform, analytics]</Ph>.
      </p>

      <h2>6. International transfers</h2>
      <p>
        Some service providers may process data outside your country. Where required, we use appropriate safeguards for such transfers.{" "}
        <Ph>[Describe safeguards used, if applicable.]</Ph>
      </p>

      <h2>7. Data retention</h2>
      <p>
        We keep personal information only as long as needed for the purposes described in this policy, including legal, accounting and
        reporting requirements. <Ph>[Specify retention periods, e.g. enquiries kept for X months if no engagement follows.]</Ph>
      </p>

      <h2>8. Security</h2>
      <p>
        We use reasonable technical and organisational measures to protect personal information. No method of transmission or storage is
        completely secure, so we cannot guarantee absolute security.
      </p>

      <h2>9. Your rights</h2>
      <p>Depending on applicable law, you may have the right to:</p>
      <ul>
        <li>Access the personal information we hold about you.</li>
        <li>Correct inaccurate or incomplete information.</li>
        <li>Request deletion of your information.</li>
        <li>Object to or restrict certain processing, including direct marketing.</li>
        <li>Withdraw consent where processing is based on consent.</li>
        <li>Request a copy of your data in a portable format.</li>
        <li>Lodge a complaint with a data protection authority.</li>
      </ul>
      <p>
        To exercise these rights, contact us at <Ph>[privacy@your-domain.com]</Ph>. We may need to verify your identity before responding.
      </p>

      <h2>10. Children</h2>
      <p>
        Our website and services are intended for businesses and are not directed at children. We do not knowingly collect children&apos;s
        personal information.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>We may update this policy from time to time. The &ldquo;Last updated&rdquo; date above shows when it was last revised.</p>

      <h2>12. Contact</h2>
      <p>
        Questions about this policy can be sent to <Ph>[privacy@your-domain.com]</Ph> or to our address above.
      </p>
    </LegalPage>
  );
}
