# Govind Gupta — Portfolio

Personal site for Govind Gupta, a software engineer based in New Delhi. It presents verified experience, projects, and contact details from the resume, with a dark engineering layout and a working contact path.

**Live site:** [portfolio-seven-iota-uvvyj362na.vercel.app](https://portfolio-seven-iota-uvvyj362na.vercel.app)

**Repository:** [github.com/guptaG1410/portfolio](https://github.com/guptaG1410/portfolio)

## Stack

- [Next.js 16](https://nextjs.org) App Router and React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion for navigation and button interaction
- GSAP ScrollTrigger for the hero parallax orb and the experience timeline
- Lucide icons

## Pages

| Route | What it is |
| --- | --- |
| `/` | Single-page site: hero, about, skills, experience, projects, engineering, metrics, education, and contact |
| `/projects/geniai` | GeniAI project page |
| `/projects/socioverse` | SocioVerse project page |
| `/api/contact` | Contact form endpoint |

`/robots.txt` and `/sitemap.xml` are generated from the site URL.

## Local development

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev        # local dev server
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm test           # contact validation and content checks
```

## Environment

Copy `.env.example` to `.env.local`. Do not commit `.env.local`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, Open Graph, and the sitemap. On Vercel this falls back to the deployment host when the value is empty or still localhost. |
| `NEXT_PUBLIC_LEETCODE_URL` | Optional override. The contact link already points at [leetcode.com/u/guptagovind1410](https://leetcode.com/u/guptagovind1410/). |
| `NEXT_PUBLIC_AVAILABILITY_SHOW` | `false` hides the hero availability line. Any other value shows it. This is a manual setting. |
| `NEXT_PUBLIC_AVAILABILITY_LABEL` | Hero status text. Default: `Open to opportunities`. |
| `RESEND_API_KEY` | Resend API key for the contact form. |
| `CONTACT_FROM_EMAIL` | Sender address Resend is allowed to use. |
| `CONTACT_TO_EMAIL` | Inbox that receives messages. Default in the example file: `guptagovind1410@gmail.com`. |

## Contact form

`POST /api/contact` sends mail through [Resend](https://resend.com). All three Resend variables must be set.

Until they are set, the API returns `503` with code `NOT_CONFIGURED`. The form shows that message and a `mailto:` link to `guptagovind1410@gmail.com`. It does not claim the message was sent.

For a first test without a custom domain, Resend can send from `onboarding@resend.dev` only to the email on the Resend account. For a public site, verify a domain in Resend and use an address on that domain.

The route rejects cross-origin posts and limits each IP to 5 messages in 10 minutes. The limit is stored in memory, so it applies per server instance. A honeypot field named `website` drops bot submissions.

## Content

All visible copy lives in `lib/site.ts`.

- Experience, education, and metrics keep the company or project they came from.
- `liveUrl` and `repositoryUrl` on projects stay `null` until a real link exists. Project pages say the link has not been added.
- Replace `public/Govind-Gupta-Resume.pdf` to update the resume download. The nav links to that file directly.

## Profiles

- Email: [guptagovind1410@gmail.com](mailto:guptagovind1410@gmail.com)
- Phone: +91 9643099218
- GitHub: [guptaG1410](https://github.com/guptaG1410)
- LinkedIn: [guptag1410](https://www.linkedin.com/in/guptag1410)
- LeetCode: [guptagovind1410](https://leetcode.com/u/guptagovind1410/)

## Deploy

The site is deployed on Vercel as the project `portfolio` on the `guptag1410` account.

Production: [https://portfolio-seven-iota-uvvyj362na.vercel.app](https://portfolio-seven-iota-uvvyj362na.vercel.app)

Dashboard: [vercel.com/guptag1410s-projects/portfolio](https://vercel.com/guptag1410s-projects/portfolio)

GitHub is not connected yet, so a push to `master` does not redeploy by itself. In the Vercel project, connect [guptaG1410/portfolio](https://github.com/guptaG1410/portfolio) and track `master`. Until then, publish from this directory with:

```bash
npx vercel deploy --prod
```

Vercel detects Next.js and runs `npm run build`. If `NEXT_PUBLIC_SITE_URL` is empty or still localhost, canonical and Open Graph URLs use the Vercel host. Set `NEXT_PUBLIC_SITE_URL` to a custom domain when you add one, then redeploy.

Add the Resend variables in the Vercel project when you want the contact form to deliver mail. The site still builds, and the form stays honest, without them.
