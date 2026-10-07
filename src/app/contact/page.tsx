import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { SocialIcons, socialPlaceholderList } from "@/components/ui/SocialIcons";
import { Ph } from "@/components/ui/Placeholder";
import { buildMetadata } from "@/lib/seo";
import { hasWhatsapp, isPlaceholder, site, whatsappHref } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact Us — Book a Free Consultation",
  description:
    "Talk to Groxdigital about your website, marketing, AI or automation project. Book a free consultation and get an honest recommendation for your business.",
  path: "/contact",
});

function Value({ value, href }: { value: string; href?: string }) {
  if (isPlaceholder(value)) return <Ph>{value}</Ph>;
  return href ? (
    <a href={href} className="text-white hover:text-brand-sky">
      {value}
    </a>
  ) : (
    <span className="text-white">{value}</span>
  );
}

export default function ContactPage() {
  const addr = site.address;
  const addressText = [addr.streetAddress, addr.locality, addr.region, addr.postalCode, addr.country].join(", ");
  const missingSocial = socialPlaceholderList();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Build Something That Grows Your Business."
        intro="Tell us a little about your business and what you'd like to achieve. We'll review it and come back with practical recommendations in a free, no-obligation consultation."
        breadcrumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section className="pb-24" aria-label="Contact form and details">
        <div className="container grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
          <ContactForm />

          <aside className="space-y-4">
            <div className="card p-6">
              <h2 className="text-lg font-semibold">Prefer to chat?</h2>
              <p className="mt-2 text-sm text-slate-400">Message us on WhatsApp for a quick conversation about your requirements.</p>
              {hasWhatsapp() ? (
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn mt-5 w-full bg-emerald-500 text-white hover:bg-emerald-400"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat on WhatsApp
                </a>
              ) : (
                <p className="mt-4 text-sm">
                  <Ph>[WhatsApp number — set in src/lib/site.ts to enable the WhatsApp button]</Ph>
                </p>
              )}
            </div>

            <div className="card p-6">
              <h2 className="text-lg font-semibold">Contact details</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-sky" aria-hidden="true" />
                  <span>
                    <span className="block text-slate-500">Email</span>
                    <Value value={site.contact.email} href={`mailto:${site.contact.email}`} />
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-sky" aria-hidden="true" />
                  <span>
                    <span className="block text-slate-500">Phone</span>
                    <Value value={site.contact.phone} href={`tel:${site.contact.phone.replace(/[^\d+]/g, "")}`} />
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-sky" aria-hidden="true" />
                  <span>
                    <span className="block text-slate-500">Location</span>
                    {isPlaceholder(addr.streetAddress) ? (
                      <Ph>[Business address, if applicable]</Ph>
                    ) : (
                      <span className="text-white">{addressText}</span>
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-sky" aria-hidden="true" />
                  <span>
                    <span className="block text-slate-500">Hours</span>
                    <Value value={site.contact.hours} />
                  </span>
                </li>
              </ul>
            </div>

            <div className="card p-6">
              <h2 className="text-lg font-semibold">Follow us</h2>
              <SocialIcons className="mt-4" />
              {missingSocial.length > 0 && (
                <p className="mt-3 text-sm">
                  <Ph>[Add social profile links in src/lib/site.ts: {missingSocial.join(", ")}]</Ph>
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-white/[0.07] p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">What happens next?</h2>
              <ol className="mt-4 space-y-3 text-sm text-slate-300">
                <li>
                  <span className="mr-2 font-mono text-brand-sky">01</span>We review your details and goals.
                </li>
                <li>
                  <span className="mr-2 font-mono text-brand-sky">02</span>We schedule a free consultation call.
                </li>
                <li>
                  <span className="mr-2 font-mono text-brand-sky">03</span>You receive clear recommendations and a proposal.
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
