import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappHref, hasWhatsapp } from "@/lib/site";

type Props = {
  title?: React.ReactNode;
  intro?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function CtaSection({
  title = "Let's build something that grows your business.",
  intro = "Tell us where you are and where you want to be. We'll come back with an honest view of what will move the needle, whether that's a website, campaigns, automation or all three.",
  primary = { label: "Get a Free Consultation", href: "/contact" },
  secondary,
}: Props) {
  const wa = hasWhatsapp();
  const second =
    secondary ?? (wa ? { label: "Chat on WhatsApp", href: whatsappHref() } : { label: "Explore Our Services", href: "/services" });
  const external = second.href.startsWith("http");
  return (
    <section className="section">
      <div className="container">
        <div className="reveal relative isolate overflow-hidden rounded-3xl border border-white/10 bg-ink-900 px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-70"
            style={{
              background:
                "radial-gradient(60% 80% at 50% 0%, rgba(79,140,255,0.25), transparent 70%), radial-gradient(40% 60% at 90% 100%, rgba(139,92,246,0.2), transparent 70%)",
            }}
          />
          <h2 className="h-section mx-auto max-w-2xl">{title}</h2>
          <p className="lead mx-auto mt-4 max-w-xl">{intro}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={primary.href} className="btn-primary px-6 py-3.5">
              {primary.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            {external ? (
              <a href={second.href} target="_blank" rel="noopener noreferrer" className="btn-ghost px-6 py-3.5">
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> {second.label}
              </a>
            ) : (
              <Link href={second.href} className="btn-ghost px-6 py-3.5">
                {second.label}
              </Link>
            )}
          </div>
          <p className="mt-6 text-xs text-slate-500">Free, no-obligation conversation. No hard sell.</p>
        </div>
      </div>
    </section>
  );
}
