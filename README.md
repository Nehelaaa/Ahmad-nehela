# Ahmad Nehela — Portfolio (Next.js)

A modern, conversion-focused portfolio for website development services. Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Features

- **SEO**: Metadata, Open Graph, Twitter cards, JSON-LD, sitemap, `robots.txt`
- **Performance**: Next.js App Router, optimized fonts (Syne, DM Sans), responsive images
- **Accessibility**: Semantic HTML, focus states, ARIA labels
- **Mobile-first**: Responsive layout and touch-friendly navigation
- **Conversion**: Clear CTAs, pricing section, contact form, thank-you page

## Getting started

### 1. Install dependencies

```bash
cd portfolio-next
npm install
```

### 2. Add your images

Copy your existing portfolio images into `public/images/` so the About and Work sections display correctly:

- **Profile**: `profile-3.jpeg` (About section)
- **Projects** (optional): `profile-1.jpeg`, `profile-2.jpeg`, `profile-4.jpeg`, `new.png`, `copys.png`, `DD.jpg`, `bit.png`. For Franklin Tire & Auto, add an image as `franklin.png` (or rename your existing file if it has a different name).

If an image is missing, the site still works: the About section may show a broken image until you add `profile-3.jpeg`, and project cards show a gradient placeholder with the project name.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
npm start
```

## Contact form

The contact form submits to `/api/contact` and sends mail with [Resend](https://resend.com). Without `RESEND_API_KEY`, the API still returns success but no email is sent.

**Avoid spam / Promotions:** Messages sent from Resend’s shared address (`onboarding@resend.dev`) often fail Gmail’s filters. For reliable delivery:

1. In Resend, **add and verify your own domain** (DNS: SPF, DKIM, and ideally DMARC — Resend shows the records).
2. Set **`RESEND_FROM_EMAIL`** to an address on that domain (e.g. `Your Name <hello@yourdomain.com>`).
3. Optionally set **`CONTACT_TO_EMAIL`** if the inbox should differ from the default.
4. Set **`NEXT_PUBLIC_SITE_URL`** to your live site URL (included in the email footer for context).

Copy `.env.example` to `.env.local` for local development; add the same variables in Netlify → Site settings → Environment variables for production.

- **Netlify Forms**: To use Netlify’s form handling instead, you can switch to a traditional form POST with `data-netlify="true"` and add a Netlify redirect to `/thank-you` in your Netlify config.

## Environment (optional)

Create `.env.local` (see `.env.example` for all keys):

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=Your Name <hello@yourdomain.com>
CONTACT_TO_EMAIL=you@gmail.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

`NEXT_PUBLIC_SITE_URL` is also used for `sitemap.xml` and `robots.txt`.

## Project structure

- `app/` — Layout, pages, API route, sitemap, robots
- `components/` — Header, Footer, Hero, About, Services, Skills, Work, Contact, ScrollToTop
- `lib/content.ts` — Copy and data (services, skills, projects)
- `public/images/` — Static assets (add your images here)

## License

Private. All rights reserved.
