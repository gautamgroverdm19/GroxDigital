import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ServicePageView } from "@/components/templates/ServicePageView";
import { getService, servicePages } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

// Only the service slugs below exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((s) => ({ service: s.slug }));
}

type Props = { params: Promise<{ service: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const page = getService(service);
  if (!page) return {};
  return buildMetadata({ title: page.meta.title, description: page.meta.description, path: `/${page.slug}` });
}

export default async function ServiceRoute({ params }: Props) {
  const { service } = await params;
  const page = getService(service);
  if (!page) notFound();
  return <ServicePageView page={page} />;
}
