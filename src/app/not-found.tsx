import Link from "next/link";
import { Backdrop } from "@/components/ui/Backdrop";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden pt-24">
      <Backdrop variant="soft" />
      <div className="container text-center">
        <p className="font-mono text-sm text-brand-sky">404</p>
        <h1 className="h-display mt-4">This page couldn&apos;t be found.</h1>
        <p className="lead mx-auto mt-5 max-w-lg">The page may have moved or no longer exists. Let&apos;s get you back on track.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary px-6 py-3.5">
            Back to Home
          </Link>
          <Link href="/services" className="btn-ghost px-6 py-3.5">
            Explore Our Services
          </Link>
          <Link href="/contact" className="btn-ghost px-6 py-3.5">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
