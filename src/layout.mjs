import { html, esc, glyph, link } from './lib.mjs';
import { site, categories, services } from './content.mjs';

// Primary navigation. `key` marks the active item via page.section.
export const NAV = [
  { key: 'about', label: 'Who We Are', href: 'about.html' },
  { key: 'fleets', label: 'Fleets We Serve', href: 'fleets.html' },
  {
    key: 'products', label: 'Products', href: 'products/index.html',
    children: [
      ...categories.map((c) => ({ label: c.nav, href: `products/${c.slug}.html` })),
      { label: 'OEM recommendations', href: 'products/diesel-engine-oils.html#oem-matrix', divider: true },
    ],
  },
  {
    key: 'services', label: 'Services', href: 'services/index.html',
    children: [
      ...services.list.map((s) => ({ label: s.short || s.name, href: `services/${s.slug}.html` })),
      { label: 'Service roadmap', href: 'services/index.html#roadmap', divider: true },
    ],
  },
  { key: 'results', label: 'Results', href: 'results.html' },
  { key: 'contact', label: 'Contact Us', href: 'contact.html' },
  { key: 'oil-finder', label: 'Petrolube Oil Finder', href: 'oil-finder.html' },
];

function navItem(ctx, item, page) {
  const current = page.section === item.key;
  if (!item.children) {
    return html`<li><a class="nav-link" href="${link(ctx, item.href)}"${current ? ' aria-current="page"' : ''}>${item.label}</a></li>`;
  }
  const id = `menu-${item.key}`;
  return html`<li class="has-menu">
    <button class="nav-link nav-toggle" type="button" aria-expanded="false" aria-controls="${id}"${current ? ' data-current' : ''}>
      ${item.label}${glyph('chevron')}
    </button>
    <div class="menu" id="${id}">
      <a class="menu-overview" href="${link(ctx, item.href)}">${item.label} overview ${glyph('arrow')}</a>
      <ul>
        ${item.children.map((c) => html`<li${c.divider ? ' class="menu-divider"' : ''}><a href="${link(ctx, c.href)}">${esc(c.label)}</a></li>`)}
      </ul>
    </div>
  </li>`;
}

export function layout(ctx, page, body) {
  const title = page.title ? `${page.title} | Petrolube ${site.toolkit}` : `Petrolube | ${site.toolkit}`;
  const year = new Date().getFullYear();
  return html`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(page.description)}">
<meta name="theme-color" content="#006839">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:type" content="website">
<link rel="icon" href="${ctx.root}brand/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${ctx.root}css/site.css">
<script src="${ctx.root}js/site.js" defer></script>
</head>
<body${page.theme ? ` class="theme-${page.theme}"` : ''}>
<a class="skip" href="#main">Skip to content</a>

<header class="site-header" data-header>
  <div class="wrap header-inner">
    <a class="brand" href="${link(ctx, 'index.html')}" aria-label="Petrolube — home">
      <img src="${ctx.root}brand/petrolube-logo.svg" alt="" width="112" height="50">
    </a>
    <nav class="primary-nav" aria-label="Primary">
      <ul class="nav-list">
        ${NAV.map((item) => navItem(ctx, item, page))}
      </ul>
    </nav>
    <a class="btn btn-primary btn-sm nav-cta" href="${link(ctx, 'contact.html')}">Request an assessment</a>
    <button class="nav-burger" type="button" aria-expanded="false" aria-controls="mobile-nav" data-burger>
      <span class="sr">Menu</span><span class="burger-bars" aria-hidden="true"><i></i><i></i><i></i></span>
    </button>
  </div>
  <div class="mobile-nav" id="mobile-nav" data-mobile-nav hidden>
    <div class="wrap">
      ${NAV.map((item) => html`<div class="m-group">
        <a class="m-link" href="${link(ctx, item.href)}"${page.section === item.key ? ' aria-current="page"' : ''}>${item.label}</a>
        ${item.children ? html`<ul>${item.children.map((c) => html`<li><a href="${link(ctx, c.href)}">${esc(c.label)}</a></li>`)}</ul>` : ''}
      </div>`)}
      <a class="btn btn-primary" href="${link(ctx, 'contact.html')}">Request an assessment</a>
    </div>
  </div>
</header>

<main id="main">
${body}
</main>

<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <div class="footer-logos">
        <img src="${ctx.root}brand/petrolube-logo-reverse.svg" alt="Petrolube" width="112" height="50">
        <img src="${ctx.root}brand/petromin-logo-reverse.svg" alt="Petromin Lubricants" width="110" height="48">
      </div>
      <p>Saudi Arabia's largest independent lubricants producer, powering progress across industries.</p>
    </div>
    <nav class="footer-col" aria-label="Products">
      <h2>Products</h2>
      <ul>${categories.map((c) => html`<li><a href="${link(ctx, `products/${c.slug}.html`)}">${esc(c.short)}</a></li>`)}</ul>
    </nav>
    <nav class="footer-col" aria-label="Services">
      <h2>Services</h2>
      <ul>${services.list.map((s) => html`<li><a href="${link(ctx, `services/${s.slug}.html`)}">${esc(s.name)}</a></li>`)}</ul>
    </nav>
    <nav class="footer-col" aria-label="Quick links">
      <h2>Quick links</h2>
      <ul>
        <li><a href="${link(ctx, 'about.html')}">Who we are</a></li>
        <li><a href="${link(ctx, 'about.html#footprint')}">Global footprint</a></li>
        <li><a href="${link(ctx, 'about.html#quality')}">Certifications &amp; approvals</a></li>
        <li><a href="${link(ctx, 'fleets.html')}">Fleets we serve</a></li>
        <li><a href="${link(ctx, 'results.html')}">Results</a></li>
        <li><a href="${link(ctx, 'oil-finder.html')}">Oil Finder</a></li>
      </ul>
    </nav>
    <div class="footer-col footer-contact">
      <h2>Contact</h2>
      <p>${esc(site.contact.office)}</p>
      <p>${site.contact.phones.map((ph) => html`<a href="tel:${ph.replace(/\s/g, '')}">${ph}</a>`)}</p>
      <p><a href="mailto:${site.contact.email}">${site.contact.email}</a></p>
      <p><a href="${site.contact.website}" rel="noopener">${site.contact.websiteLabel}</a></p>
    </div>
  </div>
  <div class="footer-bar">
    <div class="wrap">
      <span>© ${year} Petrolube Oil Company. ${esc(site.toolkit)}.</span>
      <a href="${site.contact.website}" rel="noopener">petrolubegroup.com</a>
    </div>
  </div>
</footer>
</body>
</html>
`;
}
