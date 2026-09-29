# Petrolube — Fleet & Transportation Solutions Toolkit (website) — V2

Same content as V1, restyled to sit inside the main Petrolube site
(**www.petrolubegroup.com**). Built from the print booklet
`~/Downloads/B2B Transportation Booklet Solution.pdf` (21 spreads, EN).

```
node build.mjs     # renders src/ → site/ (no dependencies)
node serve.mjs     # preview at http://localhost:4173
```

`site/` is plain static HTML with relative links and can be uploaded to any static host.
V1 (the booklet-faithful design) lives beside this at `~/Petrolube Fleet V1`.

## What changed from V1

V1 reproduced the booklet's print language. V2 reproduces the parent site's web language,
captured from petrolubegroup.com on 2026-09-28:

| | V1 (booklet) | V2 (parent site) |
| --- | --- | --- |
| Type | Plus Jakarta Sans, self-hosted | system stack (`ui-sans-serif, system-ui…`), as the live site uses |
| Headings | UPPERCASE, two weights (300 + 800) | sentence case, bold, grey standfirst underneath |
| Accent device | amber rule bleeding off the page edge | none; grey/mint panels and rounded cards |
| Buttons | 4px radius rectangles | 50px pills, green fill or green outline |
| Hero | full-bleed photo, text directly on image | photo with a frosted glass card over it |
| Header | running head + one nav row | utility row (logo, Oil Finder, phone) + nav row with gradient underline on the active item |
| Product pages | Petromin red theme | green, with a left catalogue sidebar like the live product directory |
| Stats | dark green card, solid fills | outlined cards on green with amber icons and figures |
| Footer | dark green, amber folio bar | solid green with Quick links / Contact columns |
| Corners | 6px | 20px cards, 10px small elements, 50px pills |

Tokens taken from the live site: green `#006839`, footer/band green `#016531`, amber `#F6A81E`,
heading ink `#1C1C1C`, body `#212529`, grey `#595B5A`, page grey `#F5F5F5`, container 1320px.
`--amber-ink` `#9A5800` is used where amber would be text on a light ground, since the brand
amber is 1.98:1 on white and fails contrast.

Kept from V1: all booklet copy and data, the extracted imagery, and the three interactive
pieces — the bumper-to-bumper truck, the OEM approvals matrix and the Oil Finder quick lookup.

## Pages (19)

| Page | Booklet source |
| --- | --- |
| `index.html`: landing page | cover, p.03, 06–17, 30, 39 |
| `about.html`: about, global footprint, story legacy, certifications | p.03–05, 10–11 |
| `fleets.html`: who we serve, segments, challenges | p.06–07, 14–15 |
| `results.html`: Turbomaster trial + testimonials | p.08–09, 12–13 |
| `products/index.html` + 5 category pages (sidebar layout) | p.16–29 |
| `services/index.html` + 6 service pages (sidebar layout) | p.30–38 |
| `oil-finder.html`: Oil Finder + quick OEM lookup + matrix | p.21, 39 |
| `contact.html`: contact details, request form, roadmap | p.38, 40 |

## Structure

```
src/content.mjs    all copy + data, transcribed from the booklet (web-only strings marked // NEW)
src/pages.mjs      one entry per page
src/sections.mjs   reusable sections (hero card, sidebar, truck, matrix, roadmap, CTA…)
src/layout.mjs     head, two-row header, footer
src/lib.mjs        html/img/icon/heading helpers
static/            css, js, brand SVGs, img (copied into site/ on build)
tools/extract_assets.py   pulls every photo out of the PDF → static/img/*.webp + manifest
tools/extract_icons.py    rebuilds the booklet's icon set + logos as SVG → static/icons, static/brand
```

## Imagery policy — everything comes from the booklet

No stock photography, no drawn icons, no outside brand files. Every visual on the site is
extracted from `B2B Transportation Booklet Solution.pdf` by two scripts:

```
python3 tools/extract_assets.py   # photos + raster logos  -> static/img/*.webp
python3 tools/extract_icons.py    # icon set + logos (vector) -> static/icons, static/brand
node build.mjs
```

- **Photos** are lifted at native resolution by PDF object id (p.01–21).
- **Icons** (64) are rebuilt as SVG from the booklet's own vector paths, keeping its strokes,
  fills and colours: the amber pressure icons and green answer icons of p.14–15, the trial icons
  of p.13, the red benefit icons of each product spread, the service icons of p.30–31, and the
  roadmap's outlined 01–06 numerals, step icons and green play connectors of p.38. Each icon is
  used against the label it carries in print.
- **Logos** are the booklet's own lockups: the Petrolube running-head mark (p.03) and the Petromin
  lockup in both its light (p.02) and reversed (p.03) forms. The favicon is built from the same
  Petrolube artwork. `src/lib.mjs` inlines these at build time, and an unknown icon name fails the
  build rather than silently disappearing.

**One supplied exception:** `static/brand/petrolube-logo.svg` is the official light-ground Petrolube
lockup (green PETRO + amber LUBE box), provided by the client on 2026-09-29 and used in the top
navigation bar. The booklet has no green-on-white lockup, so this replaces the previous workaround
of setting the booklet's reversed mark on a green plate. Everything else still comes from the PDF:
the footer keeps the booklet's reversed mark on the green ground, and `tools/extract_icons.py` does
not generate or overwrite the supplied file.

Two other things are deliberately *not* pictures, because the booklet has no artwork for them:

1. **UI affordances** — the link arrow, dropdown chevron, external-link mark and menu button are a
   typographic character (→ ↗ ▾) or CSS bars, not invented icons.
2. **Dark-ground logos.** The footer and other green grounds use the booklet's own reversed
   lockups rather than recoloured artwork.

Contact details, warehouse lists and similar are set as labelled text, since the booklet's contact
page carries no pictograms.

## Open items for the client

1. **Product names differ between spreads.** The bumper-to-bumper spread (p.17) names products
   that are not on the portfolio pages. The site reproduces both as printed:
   - Coolant: *Long Life Coolant 50* (p.17) vs *Extended Life Coolant Nitrite Free* (p.26)
   - Hydraulic: *Hydraulic Oil AW Series* (p.17) vs *Hydraulic Oil VH* (p.24)
   - Gear: *ATF Dexron III H / Gearbox Oil HDC Series / Transmax MBT 75W-90* (p.17) vs
     *Gearbox Oil LD / SYN HDM 75W-90 / HD Series* (p.22–23)
   - *Turbomaster Plus 10W-40 CI-4* (the trial product), *MBX* and *Fleetmaster Plus* appear
     in the matrix but have no product sheet.
2. **Contact details differ from the live site.** The booklet says *Jeddah, Prince Sultan Road,
   Aya Mall* and *sales@petrolubegroup.com*; petrolubegroup.com lists *Building No. 8136, Prince
   Sultan Street, Al-Muhammadiyah District, Jeddah 23618-4482* and *info@petrolubegroup.com*.
   The site uses the booklet's values — confirm which is current.
3. **Oil Finder URL.** The booklet's QR points to `https://petrolube.ewp.earlweb.net/`, which
   looks like a vendor or staging host rather than petrolubegroup.com.
4. **Product directory links** are the booklet's QR targets. Two look odd: diesel engine oils
   → `industrial-b2b-oil/?categories=24`, brake fluid → `automotive-heavy-duty/?categories=16`.
5. **Typeface.** The live site renders in the OS system font, so this build does the same and
   will look slightly different on Windows and macOS. If the brand should hold one typeface
   across platforms, a licensed webfont needs to be chosen (the booklet is set in Codec Pro).
6. **Form endpoint.** Replace the mailto hand-off in `static/js/site.js` with the CRM endpoint.
7. **Copy sign-off.** Everything marked `// NEW` in `src/content.mjs`, plus nav labels, CTAs,
   page intros, meta descriptions and section titles written for the web.
8. **Typos corrected from print:** "Brand We Serve" → "Brands We Serve"; "results-improving" →
   "results — improving"; "Box & Chiller Trucks Fleets" → "Box & Chiller Truck Fleets".
9. **Arabic.** The booklet is English-only, so the site is too. The parent site runs WPML with an
   Arabic toggle; an RTL pass would be needed to match it.
