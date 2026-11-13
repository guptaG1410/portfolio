"use client";

import { ArrowUpRight } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contactMailto, validateContact, type ContactFailure, type ContactResponse, type FieldErrors } from "@/lib/contact";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [banner, setBanner] = useState("");
  const [fallbackHref, setFallbackHref] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = validateContact({ name, email, message });
    if (!parsed.ok) {
      setErrors(parsed.errors);
      setStatus("error");
      setBanner("Check the highlighted fields.");
      setFallbackHref("");
      return;
    }

    setErrors({});
    setStatus("submitting");
    setBanner("");
    setFallbackHref("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, website }),
      });
      const data = (await response.json()) as ContactResponse;
      if (data.ok) {
        setStatus("success");
        setBanner("Message sent.");
        setName("");
        setEmail("");
        setMessage("");
        return;
      }

      const failure = data as ContactFailure;
      setStatus("error");
      setErrors(failure.errors ?? {});
      setBanner(failure.message ?? "The message could not be sent.");
      if (failure.code === "NOT_CONFIGURED") {
        setFallbackHref(contactMailto(parsed.data, site.email));
      }
    } catch {
      setStatus("error");
      setBanner("The message could not be sent. You can email directly instead.");
      setFallbackHref(contactMailto(parsed.data, site.email));
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <SectionHeader index="09" eyebrow="Contact" title="Have an interesting problem to solve?">
            Let&apos;s build something meaningful together.
          </SectionHeader>
          <ul className="space-y-3 text-sm">
            <li>
              <a className="inline-flex items-center gap-2 text-muted hover:text-text" href={`mailto:${site.email}`}>
                {site.email}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 text-muted hover:text-text" href={site.phoneHref}>
                {site.phoneDisplay}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 text-muted hover:text-text" href={site.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 text-muted hover:text-text" href={site.github} target="_blank" rel="noreferrer">
                GitHub
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </li>
            <li>
              {site.leetcodeUrl ? (
                <a className="inline-flex items-center gap-2 text-muted hover:text-text" href={site.leetcodeUrl} target="_blank" rel="noreferrer">
                  LeetCode
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ) : (
                <span className="text-faint">
                  LeetCode
                  <span className="mt-1 block text-xs">Add NEXT_PUBLIC_LEETCODE_URL to publish the profile link.</span>
                </span>
              )}
            </li>
          </ul>
        </div>

        <form className="glass relative rounded-[1.8rem] p-5 sm:p-7" onSubmit={onSubmit} noValidate>
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
          </div>
          <div className="grid gap-4">
            <Field id="name" label="Name" value={name} error={errors.name} autoComplete="name" onChange={setName} />
            <Field id="email" label="Email" type="email" value={email} error={errors.email} autoComplete="email" onChange={setEmail} />
            <Field id="message" label="Message" value={message} error={errors.message} onChange={setMessage} multiline />
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button className="button-primary" type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Send message"}
            </button>
            {banner ? (
              <p role={status === "error" ? "alert" : "status"} className={status === "success" ? "text-sm text-ok" : "text-sm text-danger"}>
                {banner}
              </p>
            ) : null}
          </div>
          {fallbackHref ? (
            <a className="button-ghost mt-3 px-0" href={fallbackHref}>
              Open in email app
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          ) : null}
          <p className="mt-4 text-xs leading-relaxed text-faint">
            Messages send through Resend when RESEND_API_KEY, CONTACT_FROM_EMAIL, and CONTACT_TO_EMAIL are set. Until then, this form will not report a successful delivery.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
  multiline = false,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
}) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name: id,
    value,
    "aria-invalid": Boolean(error) || undefined,
    "aria-describedby": error ? errorId : undefined,
    className: "field mt-2",
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value),
  };

  return (
    <div>
      <label htmlFor={id} className="text-sm text-muted">
        {label}
      </label>
      {multiline ? <textarea {...shared} rows={6} /> : <input {...shared} type={type} autoComplete={autoComplete} />}
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
