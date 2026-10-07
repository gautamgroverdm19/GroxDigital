import { isPlaceholder, site } from "@/lib/site";

const paths: Record<keyof typeof site.social, { label: string; d: string }> = {
  linkedin: {
    label: "LinkedIn",
    d: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.6h.06c.53-.95 1.84-1.95 3.78-1.95 4.04 0 4.86 2.6 4.86 6v5.35h-4v-4.74c0-1.13-.02-2.59-1.6-2.59-1.6 0-1.84 1.23-1.84 2.5v4.83h-4v-11Z",
  },
  instagram: {
    label: "Instagram",
    d: "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.8-8.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 2.5c-2.6 0-2.9 0-3.9.06-3.5.16-5.4 2.07-5.54 5.54C2.5 9.1 2.5 9.4 2.5 12s0 2.9.06 3.9c.16 3.46 2.07 5.38 5.54 5.54 1 .05 1.3.06 3.9.06s2.9 0 3.9-.06c3.46-.16 5.39-2.07 5.54-5.54.05-1 .06-1.3.06-3.9s0-2.9-.06-3.9c-.15-3.46-2.07-5.38-5.54-5.54C14.9 2.5 14.6 2.5 12 2.5Z",
  },
  facebook: {
    label: "Facebook",
    d: "M13.5 21.5v-8.2h2.77l.41-3.2H13.5V8.06c0-.93.26-1.56 1.59-1.56h1.7V3.64a22.7 22.7 0 0 0-2.48-.13c-2.45 0-4.13 1.5-4.13 4.25v2.35H7.4v3.2h2.78v8.19h3.32Z",
  },
  x: {
    label: "X",
    d: "M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.18h1.7L7.4 4.73H5.58l11.1 14.45Z",
  },
  youtube: {
    label: "YouTube",
    d: "M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.27 5 12 5 12 5s-6.27 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.73 19 12 19 12 19s6.27 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z",
  },
};

/** Renders only the social profiles that have a real URL configured in `site.social`. */
export function SocialIcons({ className = "" }: { className?: string }) {
  const entries = (Object.keys(paths) as (keyof typeof paths)[]).filter((k) => !isPlaceholder(site.social[k]));
  if (!entries.length) return null;
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {entries.map((key) => (
        <li key={key}>
          <a
            href={site.social[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} on ${paths[key].label}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-white/30 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d={paths[key].d} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function socialPlaceholderList() {
  return (Object.keys(paths) as (keyof typeof paths)[]).filter((k) => isPlaceholder(site.social[k])).map((k) => paths[k].label);
}
