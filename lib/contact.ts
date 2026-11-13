export type ContactFields = {
  name: string;
  email: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactFields, string>>;

export type ContactSuccess = { ok: true };

export type ContactFailure = {
  ok: false;
  code: "VALIDATION" | "NOT_CONFIGURED" | "RATE_LIMITED" | "DELIVERY_FAILED" | "FORBIDDEN";
  message?: string;
  errors?: FieldErrors;
};

export type ContactResponse = ContactSuccess | ContactFailure;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: unknown): { ok: true; data: ContactFields } | { ok: false; errors: FieldErrors } {
  if (!input || typeof input !== "object") {
    return { ok: false, errors: { message: "Enter your name, email, and a message." } };
  }

  const record = input as Record<string, unknown>;
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const email = typeof record.email === "string" ? record.email.trim() : "";
  const message = typeof record.message === "string" ? record.message.trim() : "";
  const errors: FieldErrors = {};

  if (name.length < 2) errors.name = "Enter your name.";
  else if (name.length > 80) errors.name = "Name must be 80 characters or fewer.";

  if (!emailPattern.test(email) || email.length > 120) errors.email = "Enter a valid email address.";

  if (message.length < 10) errors.message = "Message should be at least 10 characters.";
  else if (message.length > 2000) errors.message = "Message must be 2,000 characters or fewer.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: { name, email, message } };
}

export function contactMailto(fields: ContactFields, to: string) {
  const subject = encodeURIComponent(`Portfolio note from ${fields.name}`);
  const body = encodeURIComponent(`${fields.message}\n\n— ${fields.name}\n${fields.email}`);
  return `mailto:${to}?subject=${subject}&body=${body}`;
}
