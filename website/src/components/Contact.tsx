"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import { EASE, VIEWPORT_ONCE } from "@/lib/motion";

/* Prompt 11 — contact info column + minimal underline-style form.
   Inputs: default/hover/focus/filled/error/disabled. Button: idle/loading/success/error. */

const EASE_OUT = [...EASE.out] as [number, number, number, number];

const SOCIALS = [
  {
    label: "LinkedIn",
    // TODO: replace with your real LinkedIn profile URL
    href: "https://www.linkedin.com/",
    d: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z",
  },
  {
    label: "GitHub",
    href: "https://github.com/girishlade111",
    d: "M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.34 1.12 2.91.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z",
  },
  {
    label: "X (Twitter)",
    // TODO: replace with your real X/Twitter profile URL
    href: "https://x.com/",
    d: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  },
  {
    label: "Lade Stack",
    href: "https://ladestack.in",
    d: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm7.93 9h-3.02a15.7 15.7 0 0 0-1.2-5.3A8.02 8.02 0 0 1 19.93 11zM12 4.04c.86 1.19 1.86 3.3 2.02 6.96h-4.04c.16-3.66 1.16-5.77 2.02-6.96zM4.07 13h3.02c.14 1.98.55 3.8 1.2 5.3A8.02 8.02 0 0 1 4.07 13zm3.02-2H4.07a8.02 8.02 0 0 1 4.22-5.3 15.7 15.7 0 0 0-1.2 5.3zm2.89 2h4.04c-.16 3.66-1.16 5.77-2.02 6.96-.86-1.19-1.86-3.3-2.02-6.96zm4.73 5.3c.65-1.5 1.06-3.32 1.2-5.3h3.02a8.02 8.02 0 0 1-4.22 5.3z",
  },
];

type Status = "idle" | "loading" | "success" | "error";

const inputBase =
  "w-full border-b bg-transparent py-3 text-[16px] text-ink transition-colors duration-300 focus:outline-none placeholder:text-transparent";

function borderFor(state: { error?: boolean; focused?: boolean }) {
  if (state.error) return "border-[#ef4444]";
  if (state.focused) return "border-white";
  return "border-[#3a3a3d] hover:border-[#55555a]";
}

export default function Contact() {
  const reduced = useReducedMotion();
  const [values, setValues] = useState({ name: "", email: "", type: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!values.name.trim()) errs.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errs.email = "Please enter a valid email address.";
    if (values.message.trim().length < 10) errs.message = "Message should be at least 10 characters.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    /* TODO (wiring): replace this stub with a real backend — a Next.js server
       action, Formspree, or an API route that emails you the submission. */
    window.setTimeout(() => {
      setStatus("success");
      window.setTimeout(() => setStatus("idle"), 3000);
    }, 900);
  };

  const fieldError = (key: string) =>
    errors[key] ? (
      <p id={`${key}-error`} className="mt-2 text-[12.5px] text-[#ef4444]">
        {errors[key]}
      </p>
    ) : null;

  return (
    <section id="contact" className="section-pad relative z-10 bg-bg">
      <SectionLabel className="mb-6">Contact</SectionLabel>

      <motion.h2
        initial={reduced ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className="heading-giant text-center"
      >
        Let&rsquo;s Build Something
      </motion.h2>

      <div className="mx-auto mt-20 grid max-w-[1200px] grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:gap-24">
        {/* Info column */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          <p className="max-w-[380px] text-[15px] font-medium uppercase leading-[1.5] text-ink">
            Have an idea for an AI tool, a dev product, or want to collaborate
            on something at Lade Stack? Reach out below.
          </p>

          <dl className="mt-12 space-y-8">
            <div>
              {/* TODO: confirm this is the email you want public */}
              <dt className="font-heading text-[14px] uppercase tracking-[0.06em] text-muted">Email</dt>
              <dd className="mt-1">
                <a href="mailto:hello@ladestack.in" className="text-[16px] text-ink transition-colors hover:text-muted">
                  hello@ladestack.in
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-heading text-[14px] uppercase tracking-[0.06em] text-muted">Location</dt>
              <dd className="mt-1 text-[16px] text-ink">Pune, Maharashtra, India</dd>
            </div>
          </dl>

          <ul className="mt-12 flex items-center gap-6">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center text-ink transition-colors duration-300 hover:text-muted"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                    <path d={s.d} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Form column */}
        <motion.form
          noValidate
          onSubmit={onSubmit}
          initial={reduced ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
          className="space-y-9"
        >
          <div>
            <label htmlFor="name" className="text-[11px] uppercase tracking-[0.12em] text-muted">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={set("name")}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`${inputBase} ${borderFor({ error: !!errors.name, focused: focused === "name" })}`}
            />
            {fieldError("name")}
          </div>

          <div>
            <label htmlFor="email" className="text-[11px] uppercase tracking-[0.12em] text-muted">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={set("email")}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`${inputBase} ${borderFor({ error: !!errors.email, focused: focused === "email" })}`}
            />
            {fieldError("email")}
          </div>

          <div>
            <label htmlFor="type" className="text-[11px] uppercase tracking-[0.12em] text-muted">
              Project Type
            </label>
            <select
              id="type"
              name="type"
              value={values.type}
              onChange={set("type")}
              onFocus={() => setFocused("type")}
              onBlur={() => setFocused(null)}
              className={`${inputBase} ${borderFor({ focused: focused === "type" })} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20stroke%3D%22%238a8a8e%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_4px_center] bg-no-repeat pr-8 [&>option]:bg-surface [&>option]:text-ink`}
            >
              <option value=""></option>
              <option value="brand">Brand Identity</option>
              <option value="marketing">Marketing</option>
              <option value="website">Web Development</option>
              <option value="uiux">UI UX Design</option>
              <option value="graphics">Graphics Design</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="text-[11px] uppercase tracking-[0.12em] text-muted">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={values.message}
              onChange={set("message")}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`${inputBase} resize-none ${borderFor({ error: !!errors.message, focused: focused === "message" })}`}
            />
            {fieldError("message")}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            aria-busy={status === "loading"}
            className="flex h-[52px] w-full items-center justify-center gap-2.5 rounded-pill bg-white text-[15px] font-semibold text-black transition-colors duration-300 hover:bg-[#e5e5e5] active:bg-[#d4d4d4] disabled:opacity-70"
          >
            {status === "loading" && (
              <span
                aria-hidden
                className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black"
              />
            )}
            {status === "idle" && "Send Message"}
            {status === "loading" && "Sending…"}
            {status === "success" && <span role="status">Message Sent ✓</span>}
            {status === "error" && "Something went wrong"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
