import { processSteps } from "@/content/process";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ProcessSteps({
  title = "How we work",
  intro = "A simple, transparent process that keeps strategy, execution and results connected.",
  eyebrow = "Process",
}: {
  title?: string;
  intro?: string;
  eyebrow?: string;
}) {
  return (
    <section className="section" aria-labelledby="process-heading">
      <div className="container">
        <SectionHeader id="process-heading" eyebrow={eyebrow} title={title} intro={intro} />
        <ol className="relative mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[2.15rem] hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block"
          />
          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <li
                key={step.n}
                className="reveal relative rounded-2xl p-5 lg:p-4 lg:text-center"
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              >
                <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-ink-900 text-brand-sky">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-4 font-mono text-xs text-slate-500">{step.n}</p>
                <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
