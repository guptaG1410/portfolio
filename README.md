# Govind Gupta — Portfolio

Personal portfolio for Govind Gupta, Software Engineer. Built with Next.js, React, TypeScript, and Tailwind CSS.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configure

Copy `.env.example` to `.env.local`.

### LeetCode

Set `NEXT_PUBLIC_LEETCODE_URL` to the real profile URL. If it is empty, the site shows that the link is not configured and does not guess a profile.

### Availability

The hero indicator is a manual setting, not something inferred from the resume.

- `NEXT_PUBLIC_AVAILABILITY_SHOW=false` hides it.
- `NEXT_PUBLIC_AVAILABILITY_LABEL` changes the text. The default is `Open to opportunities`.

### Site URL

Set `NEXT_PUBLIC_SITE_URL` to the public origin before deploying. It is used for canonical links, Open Graph metadata, and the sitemap.

### Resume

The downloadable file is `public/Govind-Gupta-Resume.pdf`. Replace that file to update the resume.

### Project links

`liveUrl` and `repositoryUrl` in `lib/site.ts` are `null` on purpose. Add a real URL only when one exists. The project pages explain the empty state.

### Contact form

The form posts to `POST /api/contact` and sends mail with [Resend](https://resend.com). All three variables are required:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` — an address Resend is allowed to send from
- `CONTACT_TO_EMAIL` — defaults to `guptagovind1410@gmail.com` in `.env.example`

For a first test without a custom domain, Resend can send from `onboarding@resend.dev` only to the email on the Resend account. For production, verify a domain and use an address on that domain.

Until those variables are set, the API returns `503` with code `NOT_CONFIGURED`. The form shows that message and offers a `mailto:` link. It does not report a successful send.

The route also rejects cross-origin posts and limits each IP to 5 messages in 10 minutes. That limit is in memory, so it applies per server instance.

## Scripts

```bash
npm run typecheck
npm run lint
npm test
npm run build
```
