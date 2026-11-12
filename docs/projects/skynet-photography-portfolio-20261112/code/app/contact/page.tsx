// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

import { ContactForm } from "@/components/contact-form";

export const metadata = {
  title: "Contact — Landscape & nature photography portfolio",
  description:
    "Get in touch about landscape and nature photography. Licensing, commissions, and image questions welcome.",
};

/**
 * Contact page (/contact): contact form integrated with POST /api/contact.
 * Name, Email, Message fields with inline validation; success/error states.
 */
export default function ContactPage() {
  return (
    <section className="py-10 lg:py-14 px-6">
      <div className="max-w-content mx-auto space-y-6 px-6">
        <h1 className="text-h2 text-text">Contact</h1>
        <p className="text-body text-text-muted leading-relaxed">
          Have a question about an image, or interested in licensing or a
          commission? Send me a message and I will get back to you.
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
