import type { LucideIcon } from "lucide-react";

export type FlowStep = { label: string; desc?: string; icon?: LucideIcon };

function Connector() {
  return (
    <div aria-hidden="true" className="flex shrink-0 items-center justify-center text-brand-blue/70 lg:w-8">
      <svg className="hidden h-2 w-8 lg:block" viewBox="0 0 32 8" preserveAspectRatio="none">
        <line x1="0" y1="4" x2="32" y2="4" stroke="currentColor" strokeWidth="2" className="flow-line" />
      </svg>
      <svg className="h-8 w-2 lg:hidden" viewBox="0 0 8 32" preserveAspectRatio="none">
        <line x1="4" y1="0" x2="4" y2="32" stroke="currentColor" strokeWidth="2" className="flow-line" />
      </svg>
    </div>
  );
}

/**
 * Animated, accessible workflow diagram. Renders as an ordered list so screen
 * readers announce the sequence; stacks vertically on small screens.
 */
export function FlowDiagram({ steps, title, compact = false }: { steps: FlowStep[]; title?: string; compact?: boolean }) {
  return (
    <figure className="reveal">
      <ol className="flex flex-col items-stretch lg:flex-row lg:items-stretch" aria-label={title ?? "Workflow"}>
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <li key={step.label} className="flex flex-col items-center lg:flex-1 lg:flex-row">
              <div
                className={`card relative flex w-full min-w-0 flex-col lg:w-auto lg:flex-1 items-center text-center ${compact ? "p-3" : "p-4 lg:min-h-[9.5rem]"} lg:justify-start`}
              >
                <span
                  aria-hidden="true"
                  className="absolute right-3 top-3 h-1.5 w-1.5 animate-pulse-dot rounded-full bg-brand-sky"
                  style={{ animationDelay: `${i * 0.35}s` }}
                />
                {Icon ? (
                  <span className="icon-tile mb-3 h-10 w-10">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : (
                  <span className="mb-2 font-mono text-xs text-slate-500">{String(i + 1).padStart(2, "0")}</span>
                )}
                <span className="text-sm font-semibold text-white">{step.label}</span>
                {step.desc && !compact && <span className="mt-1 text-xs leading-relaxed text-slate-400">{step.desc}</span>}
              </div>
              {i < steps.length - 1 && <Connector />}
            </li>
          );
        })}
      </ol>
      {title && <figcaption className="mt-4 text-center text-xs text-slate-500">{title}</figcaption>}
    </figure>
  );
}
