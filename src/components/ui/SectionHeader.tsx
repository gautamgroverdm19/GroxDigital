type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
  id?: string;
};

export function SectionHeader({ eyebrow, title, intro, align = "center", as: Tag = "h2", className = "", id }: Props) {
  const centered = align === "center";
  return (
    <div className={`reveal ${centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag id={id} className={`h-section ${eyebrow ? "mt-5" : ""}`}>
        {title}
      </Tag>
      {intro && <p className={`lead mt-4 ${centered ? "mx-auto max-w-2xl" : ""}`}>{intro}</p>}
    </div>
  );
}
