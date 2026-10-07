import type { MetadataRoute } from "next";
import { servicePages } from "@/content/services";
import { caseStudies } from "@/content/case-studies";
import { blogPosts } from "@/content/blog";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "weekly"),
    page("/services", 0.9),
    ...servicePages.map((s) => page(`/${s.slug}`, 0.8)),
    page("/industries", 0.7),
    page("/about", 0.7),
    page("/contact", 0.8),
    page("/case-studies", 0.6),
    // Demo case studies are noindex, so only real ones are listed.
    ...caseStudies.filter((c) => !c.demo).map((c) => page(`/case-studies/${c.slug}`, 0.6)),
    page("/blog", 0.6, "weekly"),
    ...blogPosts.map((p) => ({ ...page(`/blog/${p.slug}`, 0.5), lastModified: new Date(p.date) })),
    page("/faq", 0.5),
    page("/privacy-policy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
    page("/disclaimer", 0.2, "yearly"),
    page("/cookie-policy", 0.2, "yearly"),
    page("/refund-policy", 0.2, "yearly"),
    page("/data-processing", 0.2, "yearly"),
  ];
}
