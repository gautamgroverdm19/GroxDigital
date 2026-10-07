/** Subtle, GPU-cheap ambient glow used behind hero sections. */
export function Backdrop({ variant = "default" }: { variant?: "default" | "soft" }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="grid-bg absolute inset-0" />
      <div
        className={`absolute left-1/2 top-[-18rem] h-[36rem] w-[60rem] -translate-x-1/2 animate-gradient-drift rounded-full blur-3xl ${
          variant === "soft" ? "opacity-40" : "opacity-60"
        }`}
        style={{
          background: "radial-gradient(closest-side, rgba(79,140,255,0.35), rgba(139,92,246,0.18) 55%, transparent 80%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
    </div>
  );
}
