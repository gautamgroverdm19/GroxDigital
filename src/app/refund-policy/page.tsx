import { LegalPage } from "@/components/templates/LegalPage";
import { Ph, Val } from "@/components/ui/Placeholder";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Refund & Cancellation Policy",
  description: `${site.name}'s policy on cancellations, refunds and changes to project and retainer engagements.`,
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      path="/refund-policy"
      intro="This policy explains how cancellations and refunds work for our services. The terms in your signed proposal or agreement take precedence where they differ."
    >
      <h2>1. Nature of our services</h2>
      <p>
        Our services involve time, expertise and work that begins once an engagement starts. For this reason, refunds are handled according
        to the stage of work and the terms agreed for each engagement.
      </p>

      <h2>2. Project-based work</h2>
      <p>For fixed-scope projects such as websites, landing pages, automation builds and audits:</p>
      <ul>
        <li>
          Advance payments:{" "}
          <Ph>[State whether deposits are refundable, partially refundable or non-refundable, and under what conditions.]</Ph>
        </li>
        <li>
          Cancellation after work begins: <Ph>[e.g. fees for work completed up to the cancellation date are payable.]</Ph>
        </li>
        <li>Completed and approved milestones are not refundable.</li>
      </ul>

      <h2>3. Monthly retainers and ongoing services</h2>
      <p>For ongoing services such as SEO, ads management, social media and maintenance:</p>
      <ul>
        <li>
          Notice period: <Ph>[e.g. X days&apos; written notice to cancel.]</Ph>
        </li>
        <li>
          Minimum term: <Ph>[State any minimum commitment period, if applicable.]</Ph>
        </li>
        <li>Fees for the current billing period are generally non-refundable once work for that period has started.</li>
      </ul>

      <h2>4. Third-party costs</h2>
      <p>
        Advertising spend, software subscriptions, domains, hosting, messaging fees and other third-party costs are paid to those providers
        and are subject to their own refund policies. We cannot refund these amounts.
      </p>

      <h2>5. How to request a cancellation or refund</h2>
      <p>
        Email <Val value={site.contact.email} /> with your name, business name, invoice number and reason. We aim to respond within{" "}
        <Ph>[X business days]</Ph>. Approved refunds are processed to the original payment method within <Ph>[X business days]</Ph>.
      </p>

      <h2>6. Disputes</h2>
      <p>
        If you&apos;re unhappy with any part of our service, please contact us first. We&apos;ll work with you to resolve the issue fairly.
      </p>
    </LegalPage>
  );
}
