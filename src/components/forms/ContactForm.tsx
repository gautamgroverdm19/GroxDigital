"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { budgetOptions, industryOptions, serviceOptions } from "@/lib/leads";

type Status = { state: "idle" } | { state: "sending" } | { state: "success" } | { state: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: fd.get("name"),
      businessName: fd.get("businessName"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      website: fd.get("website"),
      industry: fd.get("industry"),
      services: fd.getAll("services"),
      budget: fd.get("budget"),
      message: fd.get("message"),
      company_url: fd.get("company_url"),
      source: "contact-form",
      page: "/contact",
    };

    setErrors({});
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus({ state: "success" });
        form.reset();
        return;
      }
      if (data.errors) setErrors(data.errors);
      setStatus({ state: "error", message: data.error ?? "Please check the highlighted fields and try again." });
    } catch {
      setStatus({ state: "error", message: "Something went wrong. Please check your connection and try again." });
    }
  }

  if (status.state === "success") {
    return (
      <div className="card flex flex-col items-start p-8" role="status">
        <CheckCircle2 className="h-10 w-10 text-emerald-400" aria-hidden="true" />
        <h2 className="mt-5 text-2xl font-semibold">Thank you. We&apos;ve received your request.</h2>
        <p className="mt-3 text-slate-400">
          Our team will review your details and get in touch to arrange your free consultation. In the meantime, feel free to explore our
          services.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/services" className="btn-ghost">
            Explore Our Services
          </Link>
          <button type="button" className="btn-ghost" onClick={() => setStatus({ state: "idle" })}>
            Send another message
          </button>
        </div>
      </div>
    );
  }

  const err = (name: string) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-1.5 text-sm text-rose-300">
        {errors[name]}
      </p>
    ) : null;
  const aria = (name: string) => (errors[name] ? { "aria-invalid": true, "aria-describedby": `${name}-error` } : {});

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8" aria-describedby="form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">
            Name{" "}
            <span className="text-rose-300" aria-hidden="true">
              *
            </span>
          </label>
          <input id="name" name="name" required autoComplete="name" className="field" placeholder="Your full name" {...aria("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="businessName" className="label">
            Business Name
          </label>
          <input id="businessName" name="businessName" autoComplete="organization" className="field" placeholder="Company or brand" />
        </div>
        <div>
          <label htmlFor="email" className="label">
            Email{" "}
            <span className="text-rose-300" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="field"
            placeholder="you@company.com"
            {...aria("email")}
          />
          {err("email")}
        </div>
        <div>
          <label htmlFor="phone" className="label">
            Phone / WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="field"
            placeholder="+ country code and number"
            {...aria("phone")}
          />
          {err("phone")}
        </div>
        <div>
          <label htmlFor="website" className="label">
            Website
          </label>
          <input id="website" name="website" type="url" inputMode="url" autoComplete="url" className="field" placeholder="https://" />
        </div>
        <div>
          <label htmlFor="industry" className="label">
            Industry
          </label>
          <select id="industry" name="industry" className="field" defaultValue="">
            <option value="" disabled>
              Select your industry
            </option>
            {industryOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="label">Services Required</legend>
          <div className="mt-1 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {serviceOptions.map((o) => (
              <label
                key={o}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-white/10 bg-ink-900 px-3 py-2.5 text-sm text-slate-300 transition has-[:checked]:border-brand-blue/60 has-[:checked]:bg-brand-blue/10 has-[:checked]:text-white"
              >
                <input type="checkbox" name="services" value={o} className="h-4 w-4 accent-brand-blue" />
                {o}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor="budget" className="label">
            Monthly Marketing Budget
          </label>
          <select id="budget" name="budget" className="field" defaultValue="">
            <option value="" disabled>
              Select a range
            </option>
            {budgetOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="field resize-y"
            placeholder="Tell us about your business, your goals and any challenges you're facing."
          />
        </div>

        {/* Honeypot field for spam bots; hidden from people and assistive tech. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="company_url">Leave this field empty</label>
          <input id="company_url" name="company_url" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {status.state === "error" && (
        <p className="mt-5 rounded-lg border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200" role="alert">
          {status.message}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="text-xs leading-relaxed text-slate-500 sm:max-w-xs">
          By submitting, you agree to our{" "}
          <Link href="/privacy-policy" className="underline hover:text-slate-300">
            Privacy Policy
          </Link>
          . We&apos;ll only use your details to respond to your enquiry.
        </p>
        <button type="submit" className="btn-accent px-6 py-3.5" disabled={status.state === "sending"}>
          {status.state === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Book a Free Consultation <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
