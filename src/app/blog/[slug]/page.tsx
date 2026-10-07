import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { CtaSection } from "@/components/sections/CtaSection";
import { blogPosts, getPost, type BlogBlock } from "@/content/blog";
import { serviceBySlug } from "@/content/services";
import { articleSchema, buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: post.description, path: `/blog/${post.slug}`, type: "article" });
}

function renderBlock(block: BlogBlock, i: number) {
  switch (block.type) {
    case "h2":
      return <h2 key={i}>{block.text}</h2>;
    case "h3":
      return <h3 key={i}>{block.text}</h3>;
    case "ul":
      return (
        <ul key={i}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    default:
      return <p key={i}>{block.text}</p>;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        intro={post.description}
        breadcrumbs={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      >
        <p className="mt-6 text-sm text-slate-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
        </p>
      </PageHero>

      <article className="container pb-16">
        <div className="prose-content">{post.body.map(renderBlock)}</div>
      </article>

      <section className="section pt-0" aria-labelledby="related-heading">
        <div className="container">
          <h2 id="related-heading" className="text-2xl font-semibold">
            Related services
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {post.related.map((s) => (
              <ServiceCard key={s} service={serviceBySlug[s]} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
      <JsonLd
        data={articleSchema({ title: post.title, description: post.description, path: `/blog/${post.slug}`, datePublished: post.date })}
      />
    </>
  );
}
