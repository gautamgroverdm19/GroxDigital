import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { footerColumns } from "@/lib/navigation";
import { isPlaceholder, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-950">
      <div className="container py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-8">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">{site.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Websites, marketing, AI and automation, planned and run as one growth system.
            </p>
            <div className="mt-6 space-y-3">
              {!isPlaceholder(site.contact.email) && (
                <a href={`mailto:${site.contact.email}`} className="flex items-center gap-2 text-sm text-slate-300 hover:text-white">
                  <Mail className="h-4 w-4" aria-hidden="true" /> {site.contact.email}
                </a>
              )}
              <SocialIcons />
              <Link href="/contact" className="link-arrow">
                Book a free consultation <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-4 lg:gap-8">
            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="text-sm font-semibold text-white">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-slate-400 transition hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.06] pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.name}. All Rights Reserved.</p>
          <p className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/cookie-policy" className="hover:text-white">
              Cookies
            </Link>
            <a href="/sitemap.xml" className="hover:text-white">
              Sitemap
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
