import { BarChart3, Bot, Globe, Megaphone, MessageCircle, Search, Workflow, type LucideIcon } from "lucide-react";
import { LogoMark } from "@/components/layout/Logo";

const nodes: { label: string; icon: LucideIcon }[] = [
  { label: "Website", icon: Globe },
  { label: "Ads", icon: Megaphone },
  { label: "SEO", icon: Search },
  { label: "AI", icon: Bot },
  { label: "Automation", icon: Workflow },
  { label: "WhatsApp", icon: MessageCircle },
  { label: "Analytics", icon: BarChart3 },
];

const RADIUS = 39;

const positioned = nodes.map((node, i) => {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / nodes.length;
  return {
    ...node,
    x: +(50 + RADIUS * Math.cos(angle)).toFixed(2),
    y: +(50 + RADIUS * Math.sin(angle)).toFixed(2),
  };
});

/**
 * Hero illustration: every growth channel connected to one system.
 * Pure SVG + CSS (no JS), decorative, and paused for reduced-motion users.
 */
export function HeroVisual() {
  return (
    <figure
      className="relative mx-auto aspect-square w-full max-w-[540px]"
      aria-label="Website, ads, SEO, AI, automation, WhatsApp and analytics connected in one growth system"
    >
      <div
        aria-hidden="true"
        className="absolute inset-[12%] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(79,140,255,0.28), rgba(139,92,246,0.14), transparent)" }}
      />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="hv-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.3" />
        <circle cx="50" cy="50" r={RADIUS - 14} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" strokeDasharray="1 2" />
        {positioned.map((n) => (
          <line
            key={n.label}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke="url(#hv-line)"
            strokeOpacity="0.55"
            strokeWidth="0.35"
            className="flow-line"
            style={{ strokeDasharray: "1.2 2.4", animationDuration: "2.4s" }}
          />
        ))}
        {/* Links between neighbouring channels */}
        {positioned.map((n, i) => {
          const next = positioned[(i + 1) % positioned.length];
          return (
            <line key={`ring-${n.label}`} x1={n.x} y1={n.y} x2={next.x} y2={next.y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" />
          );
        })}
      </svg>

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border border-white/10 bg-ink-900/90 px-4 py-3 text-center shadow-[0_0_60px_-10px_rgba(79,140,255,0.5)] backdrop-blur sm:px-5 sm:py-4">
        <LogoMark className="h-8 w-8 sm:h-10 sm:w-10" />
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate-300 sm:text-xs">Growth System</span>
      </div>

      <ul>
        {positioned.map((n, i) => {
          const Icon = n.icon;
          return (
            <li key={n.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
              <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-ink-850/95 py-1.5 pl-1.5 pr-3 text-[0.7rem] font-medium text-slate-200 shadow-lg shadow-black/40 sm:text-xs">
                <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue/25 to-brand-violet/25 text-brand-sky">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span
                    aria-hidden="true"
                    className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                </span>
                {n.label}
              </span>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}
