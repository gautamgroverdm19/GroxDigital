/**
 * Client testimonials.
 *
 * Intentionally empty: only add real testimonials from real clients, with their
 * permission. The testimonials section is hidden automatically while this list
 * is empty, so nothing fabricated is ever shown.
 *
 * Example entry:
 * { quote: "…", name: "Client Name", role: "Founder", company: "Company Ltd" }
 */
export type Testimonial = { quote: string; name: string; role: string; company: string };

export const testimonials: Testimonial[] = [];
