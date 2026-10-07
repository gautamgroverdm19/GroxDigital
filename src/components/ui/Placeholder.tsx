import { isPlaceholder } from "@/lib/site";

/** Visually marks content that must be replaced with real business information. */
export function Ph({ children }: { children: React.ReactNode }) {
  return (
    <span className="placeholder-note" title="Placeholder — replace with real information">
      {children}
    </span>
  );
}

/** Shows a configured value as plain text, or highlights it while it is still a placeholder. */
export function Val({ value }: { value: string }) {
  return isPlaceholder(value) ? <Ph>{value}</Ph> : <>{value}</>;
}
