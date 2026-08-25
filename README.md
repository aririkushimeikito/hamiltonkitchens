# Hamilton Kitchens — Kitchen & Bath Remodeling Since 1973

Static six-page website. Plain HTML, CSS and vanilla JavaScript — no build step, no dependencies.
Push the contents of this folder to a GitHub Pages repo (root) and it's live.

## Public launch (this revision)

- **Live deployment** — a GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) publishes
  the repo root to GitHub Pages automatically on every push to `main` or the launch branch. It enables
  Pages on first run, so the site goes live at `https://<owner>.github.io/<repo>/` with no manual setup.
  To use the custom domain, add a `CNAME` file containing `hamiltonkitchens.com` and point DNS at Pages.
- **Background video** — the home hero and all five inner pages now use compressed, muted, looping
  background video, organized under `videos/` (see below). Source footage was ~430 MB; the web set is ~17 MB.
- **Favicon from the logo** — `favicon/` now contains icons generated from the actual sign logo
  (`favicon.ico`, `favicon.svg`, `favicon-16/32/192/512.png`, `apple-touch-icon.png`) plus `site.webmanifest`.
- **Content placeholders resolved** — the bracketed `[…]` placeholders were reworded for a public launch
  without inventing prices or reviews (costs defer to the consultation; the second review slot links to the
  real Houzz/BBB profiles). Add specific prices, timelines, and real review quotes when you have them.

### Videos (`videos/`)

Each page has its own background clip + JPG poster, all H.264 MP4, muted, `+faststart` for fast start:

```
home-hero.mp4       + home-hero-poster.jpg       Home hero
kitchen-hero.mp4    + kitchen-hero-poster.jpg    Kitchens page header
bathroom-hero.mp4   + bathroom-hero-poster.jpg   Bathrooms page header
gallery-hero.mp4    + gallery-hero-poster.jpg    Gallery page header
about-hero.mp4      + about-hero-poster.jpg      About page header (storefront)
contact-hero.mp4    + contact-hero-poster.jpg    Contact page header (storefront)
```

To swap a clip, replace the `.mp4` and its `-poster.jpg` keeping the same names. Re-compress large source
files first, e.g.:
`ffmpeg -i in.mp4 -an -vf "scale='min(1920,iw)':-2,fps=30" -c:v libx264 -pix_fmt yuv420p -crf 26 -preset slow -movflags +faststart out.mp4`

```
/                              index.html                      Home
/about/                        about/index.html                About Us
/kitchen-remodeling/           kitchen-remodeling/index.html   Kitchens
/bathroom-remodeling/          bathroom-remodeling/index.html  Bathrooms
/gallery/                      gallery/index.html              Gallery
/contact/                      contact/index.html              Contact Us

css/style.css                  all styles (brand tokens at the top)
js/main.js                     nav, header, reveals, gallery + lightbox, contact form
js/gallery-data.js             ← the gallery photo list (edit this to add photos)
images/hamilton-kitchens-logo.png       ← header/footer logo (referenced by schema)
images/hamilton-kitchens-showroom.jpg   ← schema image
images/showroom/  images/exterior/       client photos, 1600px + -800px versions
images/gallery/                          gallery photos (placeholders included)
videos/                                  hero video + poster
favicon/  sitemap.xml  robots.txt
```

## Three things to drop in

**1. Logo** — replace `images/hamilton-kitchens-logo.png` with the supplied file, keeping the filename. It's used in the header and footer of every page and in the LocalBusiness schema. If the new file's proportions differ, update the `width`/`height` attributes on the two `<img>` tags in each page (currently 1332×811).

**2. Gallery photos** — save each photo twice in `images/gallery/`: `name.jpg` (1600px wide) and `name-800.jpg`. Name files by service and town, e.g. `bathroom-remodel-robbinsville-nj.jpg`. Then add one entry to `js/gallery-data.js`:

```js
{ src: "gallery/bathroom-remodel-robbinsville-nj", categories: ["bathrooms"],
  alt: "Walk-in shower with frameless glass and double vanity, bathroom remodel in Robbinsville NJ",
  caption: "Hall bath refresh — Robbinsville, NJ. Curbless shower, quartz vanity top, large-format porcelain tile." },
```

Categories: `kitchens`, `bathrooms`, `wood-mode`, `before-after` (a photo can have several). Add `wide: true` to span two columns. Filters, lightbox and keyboard navigation pick it up automatically. Delete the four `placeholder-*` entries (and files) once real photos are in.

**3. Web3Forms key** — sign up at web3forms.com, then paste the key in two places: `contact/index.html` (hidden `access_key` input) and `js/main.js` (`SITE.web3formsKey`). Until then, submitting shows a "not connected yet, please call" message. The form has client-side validation, a honeypot (`botcheck`), inline success/error states and no page reload.

## Bracketed placeholders still open

Anything in a yellow dashed box on the live site is a bracketed placeholder from the copy, rendered visibly on purpose. Search the HTML for `class="placeholder"`:

- Home: `[thousands of]`, `[INSERT 2–3 ADDITIONAL GOOGLE / HOUZZ REVIEWS…]`
- About: `[semi-custom and stock lines / countertop materials]`, `[Optional: Memberships / affiliations…]`
- Kitchens: `[plumbing and electrical coordination]`, `[semi-custom and value lines]`, `[marble, quartzite…]`, `[Coastal / Craftsman]`, `[X–X weeks]`, `[$XX,000 and $XX,000]`, plumbing/electrical answer
- Bathrooms: `[Brand names carried…]`, `[$XX,000 to $XX,000]`
- Contact: `[confirm]` on the evening/weekend note
- Schema A `sameAs`: `[FACEBOOK URL IF ANY]`, `[INSTAGRAM URL IF ANY]` — replace or delete those two lines in every page's first JSON-LD block
- Schema D / E FAQ answers contain the same `[$XX,000…]` and plumbing placeholders as the visible FAQs — keep them in sync

## Everyday edits

- **Hours** are plain HTML. They appear in: Home showroom section, Contact page, and the footer of every page. Search for `Monday–Thursday`. Also update `openingHoursSpecification` in Schema A.
- **NAP** (footer, every page): `Hamilton Kitchens · 2659 Nottingham Way, Hamilton, NJ 08619 · (609) 890-0012 · kitchens@hamiltonkitchens.com`. Phone also lives in the header CTA, hero, CTA bands, mobile action bar and `js/main.js` (`SITE.phoneDisplay`).
- **Copy**: each page is self-contained HTML; edit in place. Keep exactly one `<h1>`.
- **Titles / meta / canonical / OG**: in each page's `<head>`. Canonical base is `https://hamiltonkitchens.com`.
- **Schema**: every page has Schema A (LocalBusiness) first. Home adds B (WebSite). Every other page adds C (BreadcrumbList) plus its page block — D Kitchens, E Bathrooms, F About, G Gallery, H Contact. All verbatim from the spec.
- **Map**: keyless Google Maps embed in `contact/index.html` (`?q=2659+Nottingham+Way…&output=embed`). "Get Directions" links use the same address.
- **Hero video**: `videos/showroom-hero.mp4` (1080p, muted, 4.7 MB) + `showroom-hero-poster.jpg`. Replace with same names, or edit the `<video>` in `index.html`.
- **Colors / fonts**: `:root` in `css/style.css` — royal blue `#1f4fa3`, warm gold `#d8b877`, near-black text. Fraunces (headings) + Public Sans (body) via Google Fonts.

## Run locally

```bash
python3 -m http.server 8080   # then open http://localhost:8080
```
Folder URLs (`/about/` etc.) need a server or GitHub Pages; opening `index.html` directly works, but the folder links resolve to `about/index.html`, which also works in most browsers.

## Deploy to GitHub Pages

Push the contents of this folder to the repo root → Settings → Pages → Deploy from branch `main` / `(root)`. For the custom domain, add a `CNAME` file containing `hamiltonkitchens.com` and point DNS at GitHub Pages.

## Notes

- Showroom photos in the gallery are the client's real photos; their captions say "showroom display". The four `placeholder-*` tiles are clearly labeled and exist only so the Bathrooms / Wood-Mode / Before & After tabs render.
- The supplied logo graphic itself still reads "Fine Cabinetry" — that's the client's file to replace; the site's text, alt text and tags use the new tagline everywhere.
- Accessibility: semantic HTML, skip link, keyboard-operable nav and lightbox, visible focus rings, `prefers-reduced-motion` respected. All images lazy-loaded with descriptive alt text; hero video is decorative and `aria-hidden`.
