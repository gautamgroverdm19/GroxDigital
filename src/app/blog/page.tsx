import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { blogPosts } from "@/content/blog";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/format";

export const metadata = buildMetadata({
  title: "Blog — Insights on Digital Growth, AI & Automation",
  description:
    "Practical articles on websites, SEO, paid ads, local search, analytics, AI and business automation from the Groxdigital team.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Practical insights for growing businesses."
        intro="Clear, useful guidance on websites, marketing, AI and automation, without the jargon."
        breadcrumbs={[{ name: "Blog", path: "/blog" }]}
      />
      <section className="pb-16" aria-label="Articles">
        <div className="container grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <article
              key={post.slug}
              className="card card-hover reveal group relative flex flex-col p-6"
              style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-sky">{post.category}</p>
              <h2 className="mt-3 text-xl font-semibold leading-snug">
                <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{post.description}</p>
              <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
                <span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
                </span>
                <ArrowRight className="h-4 w-4 text-brand-sky transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaSection title="Want advice specific to your business?" primary={{ label: "Get Free Consultation", href: "/contact" }} />
    </>
  );
}
