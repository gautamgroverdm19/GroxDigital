type Schema = Record<string, unknown> | null | undefined;

export function JsonLd({ data }: { data: Schema | Schema[] }) {
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean);
  if (!items.length) return null;
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be injected as raw text; "<" is escaped to prevent script injection.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(items.length === 1 ? items[0] : items).replace(/</g, "\\u003c") }}
    />
  );
}
