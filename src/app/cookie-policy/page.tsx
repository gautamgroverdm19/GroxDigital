import Link from "next/link";
import { LegalPage } from "@/components/templates/LegalPage";
import { Ph, Val } from "@/components/ui/Placeholder";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description: `How ${site.name} uses cookies and similar technologies, and how you can manage your preferences.`,
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      path="/cookie-policy"
      intro="This policy explains what cookies are, which types we use and how you can control them."
    >
      <h2>What are cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website. Similar technologies include pixels, tags and local
        storage. They help websites work, remember preferences and understand how visitors use them.
      </p>

      <h2>Types of cookies we use</h2>
      <h3>Strictly necessary</h3>
      <p>Required for the website to function and be secure. These cannot be switched off.</p>
      <h3>Analytics</h3>
      <p>
        Help us understand how visitors use the website so we can improve it, for example Google Analytics.{" "}
        <Ph>[Confirm whether analytics are enabled.]</Ph>
      </p>
      <h3>Marketing</h3>
      <p>
        Used to measure advertising and show relevant ads, for example the Meta Pixel or Google Ads tags.{" "}
        <Ph>[Confirm whether marketing tags are enabled.]</Ph>
      </p>

      <h2>Cookies currently in use</h2>
      <p>
        <Ph>[Insert a table of cookies in use: name, provider, purpose, type and duration. Update whenever tracking tools change.]</Ph>
      </p>

      <h2>Managing cookies</h2>
      <p>
        Where required by law, non-essential cookies are only set with your consent, and you can change your preferences at any time.{" "}
        <Ph>[Describe your consent banner / preference centre once implemented.]</Ph> You can also block or delete cookies in your browser
        settings, though some parts of the website may not work correctly as a result.
      </p>

      <h2>More information</h2>
      <p>
        See our <Link href="/privacy-policy">Privacy Policy</Link> for how we handle personal information, or contact{" "}
        <Val value={site.contact.email} />.
      </p>
    </LegalPage>
  );
}
