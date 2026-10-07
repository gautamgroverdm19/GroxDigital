"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { mainNav, servicesMenu, solutionsMenu, type NavGroup } from "@/lib/navigation";

type MenuKey = "services" | "solutions" | null;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const enter = useCallback((key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  }, []);
  const leave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || mobileOpen ? "border-b border-white/[0.06] bg-ink-950/85 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-ink-950"
        >
          Skip to content
        </a>
        <div className="container flex h-[4.5rem] items-center justify-between gap-6">
          <Logo />

          <nav ref={navRef} aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1 text-sm">
              <li>
                <NavItem href="/" active={isActive("/")}>
                  Home
                </NavItem>
              </li>
              <li className="relative" onMouseEnter={() => enter("services")} onMouseLeave={leave}>
                <MenuButton
                  label="Services"
                  open={openMenu === "services"}
                  onClick={() => setOpenMenu(openMenu === "services" ? null : "services")}
                  controls="menu-services"
                />
                {openMenu === "services" && (
                  <MegaPanel id="menu-services" groups={servicesMenu} footerHref="/services" footerLabel="View all services" wide />
                )}
              </li>
              <li className="relative" onMouseEnter={() => enter("solutions")} onMouseLeave={leave}>
                <MenuButton
                  label="Solutions"
                  open={openMenu === "solutions"}
                  onClick={() => setOpenMenu(openMenu === "solutions" ? null : "solutions")}
                  controls="menu-solutions"
                />
                {openMenu === "solutions" && (
                  <MegaPanel id="menu-solutions" groups={solutionsMenu} footerHref="/contact" footerLabel="Not sure? Talk to an expert" />
                )}
              </li>
              {mainNav.slice(1).map((item) => (
                <li key={item.href}>
                  <NavItem href={item.href} active={isActive(item.href)}>
                    {item.label}
                  </NavItem>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/contact" className="btn-accent hidden px-4 py-2.5 sm:inline-flex">
              Get Started
            </Link>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white xl:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>
      {/* Rendered outside <header>: its backdrop-filter would otherwise become the fixed-position containing block. */}
      {mobileOpen && <MobileMenu pathname={pathname} onNavigate={() => setMobileOpen(false)} />}
    </>
  );
}

function NavItem({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-full px-3 py-2 transition ${active ? "text-white" : "text-slate-400 hover:text-white"}`}
    >
      {children}
    </Link>
  );
}

function MenuButton({ label, open, onClick, controls }: { label: string; open: boolean; onClick: () => void; controls: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls={controls}
      className={`flex items-center gap-1 rounded-full px-3 py-2 transition ${open ? "text-white" : "text-slate-400 hover:text-white"}`}
    >
      {label}
      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
    </button>
  );
}

function MegaPanel({
  id,
  groups,
  footerHref,
  footerLabel,
  wide,
}: {
  id: string;
  groups: NavGroup[];
  footerHref: string;
  footerLabel: string;
  wide?: boolean;
}) {
  return (
    <div
      id={id}
      className={`absolute left-1/2 top-full z-50 pt-3 ${wide ? "w-[min(960px,92vw)] -translate-x-[40%]" : "w-[560px] -translate-x-1/2"}`}
    >
      <div className="animate-fade-up rounded-2xl border border-white/10 bg-ink-900/95 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <div className={`grid gap-6 ${wide ? "grid-cols-4" : "grid-cols-2"}`}>
          {groups.map((group) => (
            <div key={group.title}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{group.title}</p>
              <ul className="space-y-1">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group block rounded-lg px-2 py-1.5 -mx-2 transition hover:bg-white/[0.04]">
                      <span className="block text-sm font-medium text-slate-100 group-hover:text-white">{link.label}</span>
                      {link.description && <span className="block text-xs text-slate-500">{link.description}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
          <p className="text-xs text-slate-500">Build · Grow · Automate · Optimize</p>
          <Link href={footerHref} className="link-arrow">
            {footerLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  const [section, setSection] = useState<MenuKey>(null);
  return (
    <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[4.5rem] z-50 overflow-y-auto bg-ink-950 xl:hidden">
      <nav aria-label="Mobile" className="container flex min-h-full flex-col pb-10 pt-4">
        <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          <li>
            <Link href="/" onClick={onNavigate} className="block py-4 text-lg font-medium text-white">
              Home
            </Link>
          </li>
          {(
            [
              ["services", "Services", servicesMenu],
              ["solutions", "Solutions", solutionsMenu],
            ] as const
          ).map(([key, label, groups]) => (
            <li key={key}>
              <button
                type="button"
                className="flex w-full items-center justify-between py-4 text-lg font-medium text-white"
                aria-expanded={section === key}
                onClick={() => setSection(section === key ? null : key)}
              >
                {label}
                <ChevronDown className={`h-5 w-5 transition-transform ${section === key ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {section === key && (
                <div className="space-y-5 pb-5">
                  {groups.map((group) => (
                    <div key={group.title}>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{group.title}</p>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {group.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={onNavigate}
                              className="block py-1.5 text-[0.95rem] text-slate-300 hover:text-white"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {key === "services" && (
                    <Link href="/services" onClick={onNavigate} className="link-arrow">
                      View all services <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              )}
            </li>
          ))}
          {mainNav.slice(1).map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                className="block py-4 text-lg font-medium text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-3">
          <Link href="/contact" onClick={onNavigate} className="btn-accent w-full py-3.5">
            Get a Free Consultation
          </Link>
          <Link href="/services" onClick={onNavigate} className="btn-ghost w-full py-3.5">
            Explore Our Services
          </Link>
        </div>
      </nav>
    </div>
  );
}
