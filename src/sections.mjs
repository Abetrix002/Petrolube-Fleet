import { html, esc, img, icon, glyph, heading, link } from './lib.mjs';
import {
  site, about, challenges, bumperToBumper, trial, whoWeServe, services, roadmap,
  testimonials, quality, oilFinder, oems, recommendations, categories,
} from './content.mjs';

// ---------------------------------------------------------------- shared bits
export function crumbs(ctx, trail, cls = '') {
  return html`<nav class="crumbs ${cls}" aria-label="Breadcrumb"><ol>
    <li><a href="${link(ctx, 'index.html')}">Home</a></li>
    ${trail.map(([label, href], i) => html`<li>${href && i < trail.length - 1 ? html`<a href="${link(ctx, href)}">${esc(label)}</a>` : html`<span aria-current="page">${esc(label)}</span>`}</li>`)}
  </ol></nav>`;
}

export const btn = (href, label, cls = 'btn-primary', ext = false) =>
  html`<a class="btn ${cls}" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}>${label}${glyph(ext ? 'external' : 'arrow')}</a>`;

/** Marketing hero: full-bleed photo with the frosted card the parent site uses. */
export function pageHero(ctx, { trail, title, lead, image, imageAlt, actions = '', extra = '', mediaCls = '', cardCls = '' }) {
  return html`<section class="hero hero--page">
    <div class="hero-media ${mediaCls}">${img(ctx, image, imageAlt, { sizes: '100vw', eager: true })}</div>
    <div class="wrap">
      <div class="hero-card ${cardCls}">
        ${trail ? crumbs(ctx, trail) : ''}
        <h1 class="hero-title">${esc(title.join(' '))}</h1>
        ${lead ? html`<p class="hero-lead">${lead}</p>` : ''}
        ${extra}
        ${actions ? html`<div class="actions">${actions}</div>` : ''}
      </div>
    </div>
  </section>`;
}

/** Directory pages (products, services) open like the parent site's catalogue: crumb + green title. */
export function directoryHead(ctx, { trail, title, sub, mark = '' }) {
  return html`<div class="dir-head">
    ${crumbs(ctx, trail)}
    ${mark}
    <h1 class="dir-title">${esc(title)}</h1>
    ${sub ? html`<p class="dir-sub">${esc(sub)}</p>` : ''}
  </div>`;
}

/** Left-hand catalogue nav, mirroring the parent site's product directory. */
export function sidebar(ctx, { kind, active }) {
  const groups = kind === 'services'
    ? [
      { label: 'Service solutions', items: services.list.map((s) => ({ label: s.short || s.name, href: `services/${s.slug}.html`, id: s.slug })) },
      { label: 'More', items: [{ label: 'All services', href: 'services/index.html', id: 'index' }, { label: 'Service roadmap', href: 'services/index.html#roadmap' }, { label: 'Fleets we serve', href: 'fleets.html' }] },
    ]
    : [
      { label: 'Product portfolio', items: categories.map((c) => ({ label: c.short, href: `products/${c.slug}.html`, id: c.slug })) },
      { label: 'Tools', items: [{ label: 'All products', href: 'products/index.html', id: 'index' }, { label: 'OEM recommendations', href: 'products/diesel-engine-oils.html#oem-matrix' }, { label: 'Petrolube Oil Finder', href: 'oil-finder.html' }] },
    ];
  return html`<aside class="side" aria-label="${kind === 'services' ? 'Services' : 'Product'} navigation">
    ${groups.map((g) => html`<div class="side-group">
      <p class="side-label">${esc(g.label)}</p>
      <ul>${g.items.map((it) => html`<li><a href="${link(ctx, it.href)}"${it.id && it.id === active ? ' class="is-active" aria-current="page"' : ''}>${esc(it.label)}</a></li>`)}</ul>
    </div>`)}
  </aside>`;
}

// ---------------------------------------------------------------- stats
export function statsBand(ctx) {
  const stats = [...about.stats, { value: '50+', label: 'Countries — exports globally' }];
  return html`<section class="stats" aria-label="Petrolube at a glance">
    <div class="stats-bg">${img(ctx, 'about-tank-farm', '', { sizes: '100vw' })}</div>
    <div class="wrap">
      <ul class="stats-grid">
        ${stats.map((s) => html`<li class="stat">
          <span class="stat-value">${esc(s.value)}</span>
          <span class="stat-label">${esc(s.label)}</span>
        </li>`)}
      </ul>
    </div>
  </section>`;
}

// ---------------------------------------------------------------- challenges
export function challengesSection(ctx, { id = 'challenges' } = {}) {
  const item = (cls, ic, [lead, rest]) => html`<li class="${cls}">
    ${icon(ic)}<p><strong>${esc(lead)}</strong> ${esc(rest)}</p>
  </li>`;
  return html`<section class="section chal" id="${id}" aria-labelledby="${id}-title">
    <div class="wrap">
      ${heading({ title: [challenges.eyebrow], id: `${id}-title` })}
      <div class="chal-grid">
        <div class="chal-col">
          <h3 class="chal-col-title">${esc(challenges.title.join(' '))}</h3>
          <ul>${challenges.pairs.map((p) => item('chal-pressure', p.icon, p.pressure))}</ul>
        </div>
        <figure class="chal-figure">${img(ctx, 'gearbox-oil', 'Cutaway gearbox with lubricant flowing through the gear train', { sizes: '(min-width: 960px) 24vw, 70vw' })}</figure>
        <div class="chal-col">
          <h3 class="chal-col-title chal-col-title--answer">${esc(challenges.answerTitle.join(' '))}</h3>
          <ul>${challenges.pairs.map((p) => item('chal-answer', p.answerIcon, p.answer))}</ul>
        </div>
      </div>
    </div>
  </section>`;
}

// ---------------------------------------------------------------- bumper to bumper (interactive)
export function bumperSection(ctx, { id = 'bumper-to-bumper' } = {}) {
  const sys = bumperToBumper.systems;
  return html`<section class="section b2b" id="${id}" aria-labelledby="${id}-title">
    <div class="wrap">
      ${heading({ eyebrow: bumperToBumper.eyebrow, title: bumperToBumper.title, sub: 'Select a system to see the Petromin fluids that protect it.', id: `${id}-title` })}
      <div class="b2b-stage" data-b2b>
        <div class="b2b-figure">
          ${img(ctx, 'xray-truck', 'X-ray view of a tractor-trailer showing engine, transmission, axles and brake systems', { sizes: '(min-width: 1280px) 1200px, 100vw' })}
          ${sys.map((s) => html`<button class="hotspot" type="button" style="--x:${s.x}%;--y:${s.y}%" data-target="b2b-${s.id}" aria-label="${esc(s.name)}"><span></span></button>`)}
        </div>
        <div class="b2b-side">
        <div class="b2b-tabs" role="tablist" aria-label="Vehicle fluid systems">
          ${sys.map((s, i) => html`<button class="b2b-tab" type="button" role="tab" id="b2b-${s.id}-tab" aria-controls="b2b-${s.id}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ''}>
            <span>${esc(s.name)}</span>
          </button>`)}
        </div>
        <div class="b2b-panels">
          ${sys.map((s) => html`<div class="b2b-panel" role="tabpanel" id="b2b-${s.id}" aria-labelledby="b2b-${s.id}-tab" tabindex="0">
            <h3>${icon(s.icon)} ${esc(s.name)}</h3>
            <ul class="dots">${s.products.map((p) => html`<li>${esc(p)}</li>`)}</ul>
            <a class="text-link" href="${link(ctx, `products/${s.page}.html${s.anchor ? '#' + s.anchor : ''}`)}">View ${esc(s.name.toLowerCase().replace(' (def)', ''))} ${glyph('arrow')}</a>
          </div>`)}
        </div>
        </div>
      </div>
    </div>
  </section>`;
}

// ---------------------------------------------------------------- trial teaser
export function trialTeaser(ctx) {
  return html`<section class="band trial-teaser" aria-labelledby="trial-title">
    <div class="band-bg">${img(ctx, 'trial-fleet', '', { sizes: '100vw' })}</div>
    <div class="wrap band-inner">
      <div class="band-card">
        <h2 id="trial-title">${esc(trial.title.join('. '))}</h2>
        <p class="band-lead"><strong>${esc(trial.product)}</strong> ${esc(trial.productNote)}</p>
        <ul class="trial-stats">
          ${trial.stats.map((s) => html`<li><span class="num">${esc(s.value)}<sup>*</sup><small>${esc(s.unit)}</small></span><span class="lbl">${esc(s.label)}</span></li>`)}
        </ul>
        <p class="fineprint">${esc(trial.footnote)}</p>
        ${btn(link(ctx, 'results.html'), 'See the full trial results', 'btn-primary')}
      </div>
    </div>
  </section>`;
}

// ---------------------------------------------------------------- segments
export function segmentsGrid(ctx, { headingLevel = 3 } = {}) {
  const h = `h${headingLevel}`;
  return html`<ul class="segments">
    ${whoWeServe.segments.map((s) => html`<li class="segment" id="${s.id}">
      <div class="segment-img">${img(ctx, s.img, '', { sizes: '(min-width: 960px) 380px, 90vw' })}</div>
      <div class="segment-body"><${h}>${esc(s.name)}</${h}><p>${esc(s.text)}</p></div>
    </li>`)}
  </ul>`;
}

// ---------------------------------------------------------------- services
export function lifecycle(ctx, { active } = {}) {
  return html`<ol class="lifecycle">
    ${services.lifecycle.map((s, i) => html`<li class="${active === s.name ? 'is-active' : ''}"${active === s.name ? ' aria-current="step"' : ''}>
      ${i ? html`<span class="lc-arrow">${icon('arrow-amber')}</span>` : ''}
      <span class="lc-icon">${icon(s.icon)}</span>
      <span class="lc-step">Step ${i + 1}</span>
      <strong>${esc(s.name)}</strong>
      <span class="lc-text">${esc(s.text)}</span>
    </li>`)}
  </ol>`;
}

export function serviceTable(ctx) {
  return html`<ul class="svc-table">
    ${services.list.map((s) => html`<li><a href="${link(ctx, `services/${s.slug}.html`)}">
      ${img(ctx, s.mark, '', { cls: 'svc-ic', sizes: '150px' })}
      <strong>${esc(s.name)}</strong><span>${esc(s.oneLiner)}</span>${glyph('arrow')}
    </a></li>`)}
  </ul>`;
}

export function serviceCards(ctx, { exclude } = {}) {
  return html`<ul class="svc-cards">
    ${services.list.filter((s) => s.slug !== exclude).map((s) => html`<li class="svc-card">
      <a href="${link(ctx, `services/${s.slug}.html`)}">
        <div class="svc-card-img">${img(ctx, s.img, '', { sizes: '(min-width: 960px) 360px, 90vw' })}</div>
        <div class="svc-card-body">
          ${img(ctx, s.mark, `SERVE ${s.name}`, { cls: 'svc-mark', sizes: '200px' })}
          <h3>${esc(s.short || s.name)}</h3>
          <p>${esc(s.intro)}</p>
          <span class="text-link">Explore ${glyph('arrow')}</span>
        </div>
      </a>
    </li>`)}
  </ul>`;
}

export function roadmapSection(ctx, { id = 'roadmap', compact = false } = {}) {
  return html`<section class="section roadmap${compact ? ' roadmap--compact' : ''}" id="${id}" aria-labelledby="${id}-title">
    <div class="wrap">
      ${heading({ eyebrow: roadmap.eyebrow, title: roadmap.title, sub: roadmap.sub, id: `${id}-title` })}
      <ol class="road">
        ${roadmap.steps.map((s, i) => html`<li>
          <span class="road-n">${String(i + 1).padStart(2, '0')}</span>
          <span class="road-ic">${icon(s.icon)}</span>
          <span class="road-text">${esc(s.text)}</span>
        </li>`)}
      </ol>
    </div>
  </section>`;
}

// ---------------------------------------------------------------- testimonials
export function testimonialsSection(ctx, { id = 'testimonials' } = {}) {
  return html`<section class="section testi" id="${id}" aria-labelledby="${id}-title">
    <div class="wrap">
      ${heading({ title: testimonials.title, sub: testimonials.intro, id: `${id}-title` })}
      <ul class="quotes">
        ${testimonials.quotes.map((q) => html`<li>
          <figure class="quote">
            ${icon('quote', { cls: 'quote-mark' })}
            <div class="quote-logo">${img(ctx, q.logo, q.company, { sizes: '160px' })}</div>
            <blockquote><p>${esc(q.quote)}</p></blockquote>
            <figcaption><strong>${esc(q.role)}</strong>${esc(q.company)}</figcaption>
          </figure>
        </li>`)}
      </ul>
    </div>
  </section>`;
}

// ---------------------------------------------------------------- approvals
const logoRow = (ctx, list) => html`<ul class="logos">${list.map((l) => html`<li>${img(ctx, l.img, l.alt, { sizes: '180px' })}</li>`)}</ul>`;

export function approvalsStrip(ctx) {
  const marks = [...quality.oem, ...quality.specs];
  const lane = (key) => html`<ul class="marquee-track" aria-hidden="${key === 'b'}">
    ${marks.map((l) => html`<li>${img(ctx, l.img, key === 'b' ? '' : l.alt, { sizes: '160px' })}</li>`)}
  </ul>`;
  return html`<section class="section approvals" aria-labelledby="approvals-title">
    <div class="wrap">
      ${heading({
        title: ['Approved by the OEMs your fleet runs'],
        sub: 'Petromin heavy-duty oils carry the approvals and specifications your manufacturers require.',
        id: 'approvals-title',
        aside: btn(link(ctx, 'about.html#quality'), 'All certifications', 'btn-outline btn-sm'),
      })}
    </div>
    <!-- the second track is a duplicate, so the loop has no visible seam -->
    <div class="marquee" data-marquee>${lane('a')}${lane('b')}</div>
  </section>`;
}

export function qualityFull(ctx, { id = 'quality' } = {}) {
  return html`<section class="section quality" id="${id}" aria-labelledby="${id}-title">
    <div class="wrap">
      ${heading({ title: quality.title, id: `${id}-title` })}
      <div class="panel"><h3>Certifications</h3>${logoRow(ctx, quality.certifications)}</div>
      <div class="panel"><h3>OEM approvals <span>(automotive)</span></h3>${logoRow(ctx, quality.oem)}</div>
      <div class="panel-row">
        <div class="panel"><h3>Industry specifications &amp; test standards</h3>${logoRow(ctx, quality.specs)}</div>
        <div class="panel"><h3>Sustainability reporting &amp; rating</h3>${logoRow(ctx, quality.sustainability)}</div>
      </div>
    </div>
  </section>`;
}

// ---------------------------------------------------------------- OEM matrix
const mark = (v) => {
  if (v === 'A') return `<span class="dot dot--a" role="img" aria-label="Approved"></span>`;
  if (v === 'M') return `<span class="dot dot--m" role="img" aria-label="Meets or exceeds"></span>`;
  return `<span class="sr">Not listed</span>`;
};

export function oemMatrix(ctx, { id = 'oem-matrix', title = true } = {}) {
  return html`<section class="section matrix" id="${id}" aria-labelledby="${id}-title">
    <div class="wrap">
      ${title ? heading({ title: ['Recommended engine oils across leading OEMs'], sub: 'Filled dots are approvals; outlines meet or exceed the specification.', id: `${id}-title` })
        : html`<h2 class="sr" id="${id}-title">Recommended engine oils across leading OEMs</h2>`}
      <div class="matrix-filter" data-matrix-filter="${id}">
        <span class="mf-label" id="${id}-filter-label">Show OEM</span>
        <div class="chips" role="group" aria-labelledby="${id}-filter-label">
          <button type="button" class="chip" aria-pressed="true" data-oem="all">All</button>
          ${oems.map((o, i) => html`<button type="button" class="chip" aria-pressed="false" data-oem="${i}">${esc(o)}</button>`)}
        </div>
      </div>
      <div class="table-scroll" tabindex="0" role="region" aria-label="OEM recommendation matrix (scrolls sideways)">
        <table class="oem-table" data-matrix="${id}">
          <thead><tr><th scope="col">Product</th>${oems.map((o, i) => html`<th scope="col" data-col="${i}">${esc(o)}</th>`)}</tr></thead>
          <tbody>
            ${recommendations.map((r) => html`<tr data-row="${r.row}">
              <th scope="row">${esc(r.product)}</th>
              ${[...r.row].map((v, i) => html`<td data-col="${i}">${mark(v)}</td>`)}
            </tr>`)}
          </tbody>
        </table>
      </div>
      <p class="matrix-legend"><span><span class="dot dot--m"></span> Meets / exceeds</span><span><span class="dot dot--a"></span> Approvals</span></p>
    </div>
  </section>`;
}

// ---------------------------------------------------------------- products
export function productCard(ctx, p) {
  return html`<article class="product">
    <h3 class="product-name">${esc(p.name)}</h3>
    <ul class="dots">${p.points.map((t) => html`<li>${esc(t)}</li>`)}</ul>
    <dl class="spec">${p.spec.map(([k, v]) => html`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`)}</dl>
  </article>`;
}

export function benefitsRow(benefits) {
  if (!benefits) return '';
  return html`<ul class="benefits">${benefits.map(([ic, label]) => html`<li>${icon(ic)}<span>${esc(label)}</span></li>`)}</ul>`;
}

const countProducts = (c) => c.groups.reduce((n, g) => n + g.products.length, 0);

/** Portrait tiles, as the parent site presents its Petromin ranges. */
export function categoryCards(ctx) {
  return html`<ul class="cat-cards">
    ${categories.map((c) => html`<li class="cat-card">
      <a href="${link(ctx, `products/${c.slug}.html`)}">
        <div class="cat-card-img">${img(ctx, c.card, '', { sizes: '(min-width: 960px) 260px, 45vw' })}</div>
        <h3>${esc(c.nav)}</h3>
        <p>${countProducts(c)} ${countProducts(c) === 1 ? 'product' : 'products'}</p>
      </a>
    </li>`)}
  </ul>`;
}

// ---------------------------------------------------------------- oil finder + CTA
export function oilFinderCta(ctx) {
  return html`<section class="section finder-cta" aria-labelledby="finder-cta-title">
    <div class="wrap finder-grid">
      <div>
        <h2 id="finder-cta-title" class="sec-title">${esc(oilFinder.title.join(' '))}</h2>
        <p class="sec-sub">A smart digital tool that instantly matches your vehicle or equipment with the right Petrolube lubricant.</p>
        <ul class="ticks">${oilFinder.includes.map((t) => html`<li>${icon('check')}${esc(t)}</li>`)}</ul>
        <div class="actions">
          ${btn(site.links.oilFinder, 'Open Oil Finder', 'btn-primary', true)}
          ${btn(link(ctx, 'oil-finder.html#lookup'), 'Quick OEM lookup', 'btn-outline')}
        </div>
      </div>
      <figure class="finder-phone">${img(ctx, 'oil-finder-phone', 'Petrolube Oil Finder open on a smartphone', { sizes: '(min-width: 960px) 40vw, 90vw' })}</figure>
    </div>
  </section>`;
}

export function ctaBand(ctx, { title = ['Ready to put the toolkit to work on your fleet?'], text } = {}) {
  return html`<section class="cta-band" aria-labelledby="cta-title">
    <div class="wrap cta-inner">
      <div>
        <h2 id="cta-title">${esc(title.join(' '))}</h2>
        <p>${esc(text || 'Contact your account manager, share your equipment and lubrication details, and our team will schedule a technical meeting.')}</p>
      </div>
      <div class="actions">
        ${btn(link(ctx, 'contact.html'), 'Request an assessment', 'btn-white')}
        <a class="btn btn-ghost" href="tel:${site.contact.phones[0].replace(/\s/g, '')}">${site.contact.phones[0]}</a>
      </div>
    </div>
  </section>`;
}
