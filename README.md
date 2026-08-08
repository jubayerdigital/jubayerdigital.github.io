# Jubayer — Digital Marketing Specialist Portfolio

A single-page portfolio site built with [Astro](https://astro.build) and editable
through [Decap CMS](https://decapcms.org) (formerly Netlify CMS), deployed for free
on GitHub Pages.

Every section on the page — hero, case studies, services, FAQ, testimonials, and
more — is backed by a content file under `src/content/`. You can edit these
directly in the repo, or through the visual CMS at `/admin`.

---

## 1. Getting it running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:4321`.

```bash
npm run build     # builds the static site into ./dist
npm run preview   # serves the built site locally
```

---

## 2. Deploying to GitHub Pages

This repo already includes a GitHub Actions workflow
(`.github/workflows/deploy.yml`) that builds the site and publishes it to
GitHub Pages automatically on every push to `main`.

**One-time setup, in the GitHub repo:**

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main` (or re-run the workflow from the **Actions** tab).

Since this repo is named `jubayerdigital.github.io`, it will automatically be
served at `https://jubayerdigital.github.io` once Pages is enabled — no extra
path configuration needed.

---

## 3. Setting up the CMS login (`/admin`)

The site editor lives at `https://jubayerdigital.github.io/admin`. It's powered by
Decap CMS with the `github` backend, which means edits made in the CMS are
committed straight to this repo.

Decap's `github` backend needs a small **OAuth relay** to complete GitHub
logins — GitHub doesn't allow a plain static site to do the OAuth handshake on
its own. You only need to set this up once. Pick one of the two options below.

### Option A — Use Netlify only for the OAuth handshake (free, ~5 minutes, recommended)

You do **not** need to host the site on Netlify — GitHub Pages keeps serving
the live site. You're only using Netlify to unlock its built-in GitHub OAuth
support.

1. Create a free account at [netlify.com](https://netlify.com) and click
   **Add new site → Import an existing project**, then connect this same
   GitHub repo. Let it deploy once (its own build can even fail — it doesn't
   matter, you won't use its output; GitHub Pages remains the live site).
2. Netlify automatically provides GitHub OAuth for any site whose CMS backend
   is configured as `github`, once the repo is connected — no extra setup
   needed on the Netlify side.
3. Back in `public/admin/config.yml`, set:
   ```yaml
   backend:
     name: github
     repo: jubayerdigital/jubayerdigital.github.io
     branch: main
     base_url: https://api.netlify.com
   ```
4. Commit and push. Visit `https://jubayerdigital.github.io/admin`, click
   **Login with GitHub**, and authorize the app. You're in.

### Option B — Self-host a small OAuth provider (no Netlify at all)

If you'd rather not touch Netlify, deploy one of the open-source OAuth
proxies built for this exact purpose — for example
[`decap-proxy`](https://github.com/decaporg/decap-proxy), which deploys as a
Cloudflare Worker or Vercel function in a few minutes.

Once deployed, set `base_url` in `public/admin/config.yml` to that provider's
URL, following its README for the exact GitHub OAuth App settings (Homepage
URL, Authorization callback URL).

### Who can log in?

Anyone who authenticates with a GitHub account that has **write access to
this repository** can publish through `/admin`. Manage collaborators under
**Settings → Collaborators** in GitHub.

---

## 4. Editing content

### Through the CMS

Go to `/admin`, log in, and you'll see the page broken into:

- **Site Settings** — name, nav links, socials, contact email
- **Homepage Sections** — hero, trust bar, problem statement, process, about,
  trust-building line, final CTA (each edited as a single form)
- **Case Studies**, **Services**, **FAQ**, **Testimonials** — repeatable
  entries you can add, remove, and reorder

Every save is committed to `main` and triggers a new deploy automatically —
the live site updates within a couple of minutes.

### Directly in the repo

All content lives under `src/content/`:

```
src/content/
├── site/settings.yaml         Site name, nav, socials
├── home/hero.yaml
├── home/trust-bar.yaml
├── home/problem.yaml
├── home/process.yaml
├── home/about.yaml
├── home/trust-building.yaml
├── home/final-cta.yaml
├── case-studies/*.md          One file per case study
├── services/*.yaml            One file per service
├── faqs/*.yaml                One file per FAQ entry
└── testimonials/*.md          One file per testimonial
```

Content is validated against schemas in `src/content.config.ts` — if a file
is missing a required field, `npm run build` will fail with a clear error
telling you what's wrong and where.

### Images

Photos uploaded through the CMS land in `public/images/uploads/`. To add
images manually, drop them in `public/images/` and reference the path (e.g.
`/images/my-photo.jpg`) in the relevant content field.

### The hero visual

The hero defaults to an animated line-chart illustration (no stock photos, per
the design brief). To switch to a real video instead:

1. In the CMS, open **Homepage Sections → Hero**, set **Visual Type** to
   `video`, and upload a short (5–8s) muted clip.
2. This currently swaps the *data*; if you want the video to actually render
   in place of the chart, add a `<video>` branch to `src/components/Hero.astro`
   that reads `data.visualVideo` when `data.visualType === 'video'`.

---

## 5. Design system

Defined in `src/styles/global.css`:

- **Colors** — deep navy ink (`--ink`) and a cool blue-white paper background
  (`--paper`) for a "trust" register, with a single warm coral accent
  (`--accent`) reserved for buttons, links, and key stat numbers — never used
  as a large background fill, per the brief.
- **Type** — Space Grotesk for headlines, Inter for body text, and an italic
  serif (Fraunces) used only for numerals (process steps, case-study stats)
  as a small recurring signature detail.
- **Motion** — a single fade-up reveal on scroll (`.reveal`, ~400ms,
  ease-out), respecting `prefers-reduced-motion`.

All fonts are self-hosted via `@fontsource`, so there are no third-party font
requests at runtime.

---

## 6. Project structure

```
src/
├── components/        One .astro component per page section
├── content/            Content files (edited via CMS or by hand)
├── content.config.ts   Schemas for every content collection
├── layouts/Layout.astro
├── pages/index.astro   Assembles all sections in order
└── styles/global.css   Design tokens + base styles
public/
├── admin/              Decap CMS (config.yml + index.html)
└── images/
.github/workflows/deploy.yml   Build + deploy to GitHub Pages
```
