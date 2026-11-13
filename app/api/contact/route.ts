import { validateContact, type ContactFailure } from "@/lib/contact";
import { site } from "@/lib/site";

const hits = new Map<string, number[]>();
const windowMs = 10 * 60 * 1000;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= 5) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function fail(status: number, body: ContactFailure) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return fail(403, {
          ok: false,
          code: "FORBIDDEN",
          message: "This form only accepts requests from this site.",
        });
      }
    } catch {
      return fail(400, { ok: false, code: "VALIDATION", message: "The request origin was invalid." });
    }
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return fail(429, {
      ok: false,
      code: "RATE_LIMITED",
      message: "Too many messages. Try again in a few minutes, or email directly.",
    });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return fail(400, { ok: false, code: "VALIDATION", errors: { message: "Send a JSON body." } });
  }

  if (payload && typeof payload === "object" && "website" in payload) {
    const website = (payload as { website?: unknown }).website;
    if (typeof website === "string" && website.trim()) {
      return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
    }
  }

  const parsed = validateContact(payload);
  if (!parsed.ok) {
    return fail(400, {
      ok: false,
      code: "VALIDATION",
      message: "Check the highlighted fields.",
      errors: parsed.errors,
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  if (!apiKey || !from || !to) {
    return fail(503, {
      ok: false,
      code: "NOT_CONFIGURED",
      message:
        "Email delivery is not configured yet. Use the email link, or set RESEND_API_KEY, CONTACT_FROM_EMAIL, and CONTACT_TO_EMAIL.",
    });
  }

  const safeName = parsed.data.name.replace(/[\r\n]/g, " ");
  const delivery = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: parsed.data.email,
      subject: `Portfolio note from ${safeName}`,
      text: `${parsed.data.message}\n\n— ${safeName}\n${parsed.data.email}`,
    }),
  });

  if (!delivery.ok) {
    return fail(502, {
      ok: false,
      code: "DELIVERY_FAILED",
      message: "The email service rejected the message. You can email directly instead.",
    });
  }

  return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
