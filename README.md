# Cosmin Grigore — Personal Site

A static React (Vite) site. No server required to run it — it's plain HTML/CSS/JS
once built, deployable anywhere that serves static files.

## Run it locally

```bash
npm install
npm run dev
```

Open the printed localhost URL. Edit any file in `src/` and the page updates instantly.

## Build for deployment

```bash
npm run build
```

This outputs a static `dist/` folder. Deploy that folder to any static host:

- **Vercel / Netlify**: connect the repo (or drag-and-drop the `dist` folder on Netlify),
  build command `npm run build`, output directory `dist`. Free tier is plenty for this.
- **GitHub Pages**: push `dist/` to a `gh-pages` branch, or use an action that runs
  the build command above.

No backend, database, or server process is needed for anything on this site.

## ✅ After you deploy: the 5-minute SEO checklist

The SEO scaffolding is in place, but three files contain the placeholder
`https://YOUR-DOMAIN.com` that you must replace with your real domain once you have it:

1. `index.html` — the canonical URL, all `og:` / `twitter:` URLs (search for `YOUR-DOMAIN`)
2. `public/robots.txt` — the Sitemap line
3. `public/sitemap.xml` — the `<loc>` URL

Then, once live:

- Submit the sitemap at [Google Search Console](https://search.google.com/search-console)
  — this is how Google finds and ranks the site.
- Paste your URL into [opengraph.xyz](https://www.opengraph.xyz) to confirm the link
  preview (title + `og-image.png`) looks right on WhatsApp/LinkedIn.

`public/og-image.png` is the image shown when the site is shared. Feel free to
replace it with anything 1200×630px.

## Languages (English / Italian)

The site is fully bilingual. How it decides which language to show:

1. If the visitor already picked a language with the EN/IT toggle in the nav,
   that choice is remembered (localStorage) and wins.
2. Otherwise, if their browser is set to Italian (the default for computers in
   Italy), the site opens in Italian.
3. Everyone else gets English.

**To change any text on the site**, edit `src/i18n/translations.js` — every string
appears twice, once under `en:` and once under `it:`. Keep both in sync.

Project descriptions live in `src/data/projects.js` and are also bilingual
(see below).

## Adding a new project

Open `src/data/projects.js` and add an object to the array:

```js
{
  id: 'unique-slug',
  title: 'Project Name',
  year: '2026',
  status: { en: 'Live', it: 'Online' },   // optional — omit if not needed
  location: 'City, Country',
  description: {
    en: 'One or two sentences about it.',
    it: 'Una o due frasi a riguardo.',
  },
  tags: ['React', 'Node.js'],
  link: 'https://example.com',            // '' if there's nothing to link yet
  preview: '/previews/placeholder.svg',   // see "Project previews" below
}
```

It'll appear automatically in the Work section, in order, above the "more on the way" tile.
When `link` is set, the whole card becomes clickable and a "Visit →" label appears.

## Project previews (replacing the placeholder)

Each project card shows a thumbnail. Right now they all use
`public/previews/placeholder.svg`. To use a real screenshot:

1. Take a screenshot of the project (a wide crop looks best — roughly 8:5,
   e.g. 1280×800px). Save it as PNG, JPG or WebP.
2. Drop the file into `public/previews/`, e.g. `public/previews/iryse.png`.
3. In `src/data/projects.js`, change that project's `preview` field to
   `'/previews/iryse.png'`.

That's it — no code changes. Tip: keep images under ~300 KB (tinypng.com
compresses them well) so the page stays fast.

## Filling in LinkedIn / Instagram

Open `src/data/socials.js` and paste the URL into the matching `href: ''`. Until
you do, that link shows as "coming soon" instead of a dead link.

## Setting up the contact form

Right now the form works via a `mailto:` fallback — it opens the visitor's email
client pre-filled with their message. To make it submit silently instead:

1. Create a free form at formspree.io (or a similar service — Web3Forms is
   another good free option).
2. Copy the endpoint URL it gives you.
3. Open `src/components/Contact.jsx` and replace the `FORM_ENDPOINT` constant
   near the top with your real endpoint.

That's it — no server code needed on your end either way.

## Adding your photo (dithered hero background)

You mentioned wanting your face dithered into the background eventually. The
Game of Life canvas (`src/components/GameOfLifeCanvas.jsx`) already contains the
ordered-dither (Bayer matrix) color logic used for the automaton. The cleanest
way to add a dithered portrait later: sample your photo's luminance onto the
same grid, and use it as the *seed pattern* the automaton starts from (or blend
it in as a second "glow" layer). Send over a photo whenever you're ready and
this can be wired in without changing the rest of the design.

## Accessibility notes

- All animation (the Game of Life canvas, scroll indicator) respects
  `prefers-reduced-motion` — reduced-motion visitors get a still, frozen frame.
- Focus states are visible everywhere (olive outline) for keyboard navigation.
- A skip-to-content link is present for screen reader / keyboard users, in the
  visitor's language.
- The `<html lang>` attribute, page title and meta description all update when
  the language changes.
- Color contrast was re-checked after the legibility pass: secondary text is now
  `#9ba695` (≈7:1 on the dark background) and body copy `#d4d5cd`.
