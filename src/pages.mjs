import { html, esc, img, icon, glyph, heading, link } from './lib.mjs';
import {
  site, about, footprint, legacy, whoWeServe, trial, categories, apiCategories,
  services, oilFinder, oems, recommendations,
} from './content.mjs';
import {
  pageHero, btn, statsBand, challengesSection, bumperSection, trialTeaser, segmentsGrid,
  lifecycle, serviceTable, serviceCards, roadmapSection, testimonialsSection, approvalsStrip,
  qualityFull, oemMatrix, productCard, benefitsRow, categoryCards, oilFinderCta,
  crumbs, directoryHead, sidebar,
} from './sections.mjs';

const pages = [];
const page = (p) => pages.push(p);

// ======================================================================= HOME
page({
  path: 'index.html',
  section: 'home',
  description: 'Complete lubrication solutions for commercial vehicles and fleets: Petromin heavy-duty engine oils, gear oils, coolants, greases and DEF, plus on-site testing, oil condition monitoring and training from Petrolube.',
  render: (ctx) => html`
<section class="hero hero--home" aria-labelledby="hero-title">
  <div class="hero-media">${img(ctx, 'hero-truck', '', { eager: true, sizes: '100vw' })}</div>
  <div class="wrap">
    <div class="hero-card">
      <h1 class="hero-title" id="hero-title">Fleet &amp; Transportation Solutions Toolkit</h1>
      <p class="hero-lead">Every fluid on the vehicle, engineered as one system — and the specialist services that keep your fleet on the road.</p>
      <div class="actions">
        ${btn(link(ctx, 'contact.html'), 'Request a fleet assessment', 'btn-primary')}
        ${btn(link(ctx, 'products/index.html'), 'Explore products', 'btn-outline')}
      </div>
    </div>
  </div>
</section>
${statsBand(ctx)}
<section class="section section--soft" aria-labelledby="range-title">
  <div class="wrap">
    ${heading({
      title: ['Explore our Petromin range for fleets'],
      sub: 'Comprehensive lubricant solutions engineered for every system on the vehicle.',
      id: 'range-title',
      aside: btn(link(ctx, 'products/index.html'), 'All products', 'btn-outline btn-sm'),
    })}
    ${categoryCards(ctx)}
  </div>
</section>
${challengesSection(ctx)}
${bumperSection(ctx)}
${trialTeaser(ctx)}
<section class="section" aria-labelledby="segments-title">
  <div class="wrap">
    ${heading({
      title: whoWeServe.coverageTitle,
      sub: whoWeServe.intro,
      id: 'segments-title',
      aside: btn(link(ctx, 'fleets.html'), 'How we support each segment', 'btn-outline btn-sm'),
    })}
    ${segmentsGrid(ctx)}
  </div>
</section>
<section class="section section--soft" aria-labelledby="services-title">
  <div class="wrap">
    <div class="svc-home-grid">
      <div>
        ${heading({ title: ['Our services'], sub: 'Beyond the product: specialists who assess, recommend, implement, monitor and optimize lubrication across your fleet.', id: 'services-title' })}
        ${serviceTable(ctx)}
      </div>
      <figure class="svc-home-img">${img(ctx, 'services-inspector', 'A Petrolube field engineer inspecting a tipper truck with a tablet', { sizes: '(min-width: 960px) 46vw, 100vw' })}</figure>
    </div>
    <h3 class="lifecycle-title">How it works</h3>
    ${lifecycle(ctx)}
  </div>
</section>
${testimonialsSection(ctx)}
${approvalsStrip(ctx)}
${oilFinderCta(ctx)}
`,
});

// ======================================================================= ABOUT
page({
  path: 'about.html',
  section: 'about',
  title: 'Who We Are',
  description: 'Petrolube is a leading Saudi manufacturer of high-performance lubricants since 1968, with three blending plants in Jeddah, Riyadh and Dubai and 312,000+ tonnes of annual capacity.',
  render: (ctx) => html`
${pageHero(ctx, {
  trail: [['Who we are']],
  title: about.title,
  lead: esc(about.body),
  image: 'about-tank-farm',
  imageAlt: 'Petrolube storage tanks at a blending plant',
  actions: btn('#footprint', 'Our global footprint', 'btn-primary'),
  cardCls: 'hero-card--wide',
})}
${statsBand(ctx)}
<section class="section footprint" id="footprint" aria-labelledby="footprint-title">
  <div class="wrap">
    ${heading({ title: footprint.title, sub: 'Three blending plants, six warehouses and exports to more than 50 countries.', id: 'footprint-title' })}
    <div class="fp-grid">
      <figure class="fp-map">
        ${img(ctx, 'footprint-map', 'Map of Petrolube physical presence in the GCC and regional export markets across Africa, the Middle East and Asia', { sizes: '(min-width: 960px) 55vw, 100vw' })}
        <figcaption class="fp-legend"><span><i class="sw sw--green"></i>Physical presence</span><span><i class="sw sw--amber"></i>Regional exports</span></figcaption>
      </figure>
      <div class="fp-side">
        <ul class="icards">
          ${footprint.stats.map((s) => html`<li class="icard">${icon(s.icon)}<span class="icard-num">${esc(s.value)}</span><span class="icard-text">${esc(s.label)}${s.sub ? html`<br>${esc(s.sub)}` : ''}</span></li>`)}
        </ul>
        <div class="plants">
          <h3>Blending plant capacity</h3>
          <ul class="bars">
            ${footprint.plants.map((p) => html`<li><span class="bar-city">${esc(p.city)}</span><span class="bar-track"><span class="bar-fill" style="--w:${(p.tonnes / 177000 * 100).toFixed(1)}%"></span></span><span class="bar-val">${p.tonnes.toLocaleString('en-US')} t</span></li>`)}
          </ul>
          <p class="bars-total">Total: <strong>312,000 t</strong> per year</p>
        </div>
        <div class="warehouses">
          <h3>Warehouses</h3>
          <ul>${footprint.warehouses.map((w) => html`<li>${esc(w)}</li>`)}</ul>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="legacy" id="legacy" aria-labelledby="legacy-title">
  <div class="wrap">
    ${heading({ title: ['Story & legacy'], sub: 'From a single Jeddah factory in 1968 to the GCC\u2019s largest independent lubricant manufacturer.', id: 'legacy-title', cls: 'sec-head--light' })}
  </div>
  <div class="legacy-scene">
    ${img(ctx, 'legacy-scene', 'Petrolube milestones set along a road, each marked by a post with a photograph from that year', { sizes: '100vw' })}
    <ol class="legacy-points">
      ${legacy.map((m) => html`<li style="--x:${m.x}%;--b:${m.b}%;--w:${m.w}%">
        <span class="ly-year">${esc(m.year)}</span>
        <span class="ly-text">${esc(m.text)}</span>
      </li>`)}
    </ol>
  </div>
  <ol class="legacy-list wrap">
    ${legacy.map((m) => html`<li>
      <div class="ly-img">${img(ctx, m.img, '', { sizes: '(min-width: 560px) 220px, 40vw' })}</div>
      <div><span class="ly-year">${esc(m.year)}</span><p>${esc(m.text)}</p></div>
    </li>`)}
  </ol>
</section>
${qualityFull(ctx)}
`,
});

// ======================================================================= FLEETS
page({
  path: 'fleets.html',
  section: 'fleets',
  title: 'Fleets We Serve',
  description: 'Lubrication programs for long-haul trucking, last-mile distribution, public transport, box and chiller trucks, oil and gas transport, and municipal fleets.',
  render: (ctx) => html`
${pageHero(ctx, {
  trail: [['Fleets we serve']],
  title: whoWeServe.title,
  lead: esc(whoWeServe.intro),
  image: 'fleets-dump-truck',
  imageAlt: 'A yellow heavy-duty dump truck on a quarry road',
  extra: html`<ul class="dots dots--lg">${whoWeServe.points.map((p) => html`<li>${esc(p)}</li>`)}</ul>`,
  cardCls: 'hero-card--wide',
})}
<section class="section" id="segments" aria-labelledby="segments-title">
  <div class="wrap">
    ${heading({ title: whoWeServe.coverageTitle, sub: 'Each sector operates under different conditions and duty cycles — the program is matched to yours.', id: 'segments-title' })}
    ${segmentsGrid(ctx)}
  </div>
</section>
${challengesSection(ctx)}
${bumperSection(ctx)}
`,
});

// ======================================================================= RESULTS
page({
  path: 'results.html',
  section: 'results',
  title: 'Results',
  description: 'Petromin Turbomaster Plus 10W-40 CI-4 ran 60,000 km on one fill with a leading fuel fleet customer: +50% drain extension, 100% fleet readiness.',
  render: (ctx) => html`
${pageHero(ctx, {
  trail: [['Results']],
  title: trial.title,
  lead: html`<strong>${esc(trial.product)}</strong> ${esc(trial.productNote)}`,
  image: 'trial-fleet',
  imageAlt: 'A line of green and black heavy trucks at sunset',
  cardCls: 'hero-card--wide',
})}
<section class="section trial-results" aria-labelledby="impact-title">
  <div class="wrap">
    ${heading({ title: [trial.resultsTitle], sub: 'Measured across long-haul routes, heavy loads, high heat and dust.', id: 'impact-title' })}
    <ul class="big-stats">
      ${trial.stats.map((s) => html`<li><span class="num">${esc(s.value)}<sup>*</sup><small>${esc(s.unit)}</small></span><span class="lbl">${esc(s.label)}</span></li>`)}
    </ul>
    <p class="fineprint">${esc(trial.footnote)}</p>
    <div class="twin">
      ${[trial.protection, trial.value].map((grp) => html`<div>
        <h3 class="sub-title">${esc(grp.title)}</h3>
        <ul class="icards icards--text">
          ${grp.items.map((it) => html`<li class="icard">${icon(it.icon)}<span class="icard-text"><strong>${esc(it.name)}</strong>${esc(it.text)}</span></li>`)}
        </ul>
      </div>`)}
    </div>
    <p class="more">${btn(link(ctx, 'products/diesel-engine-oils.html#oem-matrix'), 'See where Turbomaster Plus is approved', 'btn-outline')}</p>
  </div>
</section>
${testimonialsSection(ctx)}
`,
});

// ======================================================================= PRODUCTS INDEX
page({
  path: 'products/index.html',
  section: 'products',
  title: 'Product Portfolio',
  description: 'Petromin heavy-duty diesel engine oils, transmission and gear oils, hydraulic oils, greases, coolants, brake fluids and AdBlue for commercial fleets.',
  render: (ctx) => html`
${pageHero(ctx, {
  trail: [['Products']],
  title: ['Complete bumper to bumper lubrication'],
  lead: 'Engine oils, gear oils and ATF, coolants, greases, hydraulic oils, brake fluids and diesel exhaust fluid — every fluid on the vehicle, engineered as one system.',
  image: 'diesel-truck',
  imageAlt: 'Heavy trucks on the road at dusk',
  actions: btn('#categories', 'Browse categories', 'btn-primary') + btn(link(ctx, 'products/diesel-engine-oils.html#oem-matrix'), 'OEM recommendations', 'btn-outline'),
  cardCls: 'hero-card--wide',
})}
<section class="section section--soft" id="categories" aria-labelledby="categories-title">
  <div class="wrap">
    ${heading({ title: ['Product categories'], sub: 'Explore our full range of products for commercial vehicle and transportation fleets.', id: 'categories-title' })}
    ${categoryCards(ctx)}
  </div>
</section>
${bumperSection(ctx)}
${oilFinderCta(ctx)}
`,
});

// ======================================================================= PRODUCT CATEGORIES
categories.forEach((c, idx) => {
  const prev = categories[idx - 1];
  const next = categories[idx + 1];
  const multi = c.groups.length > 1;
  page({
    path: `products/${c.slug}.html`,
    section: 'products',
    title: c.nav,
    description: `${c.summary} ${c.groups.flatMap((g) => g.products.map((p) => p.name)).join(', ')}.`,
    render: (ctx) => html`
<div class="dir">
  <div class="wrap dir-grid">
    ${sidebar(ctx, { kind: 'products', active: c.slug })}
    <div class="dir-main">
      ${directoryHead(ctx, {
        trail: [['Products', 'products/index.html'], [c.short]],
        title: c.nav,
        sub: c.summary,
        mark: html`<img class="petromin-badge" src="${ctx.root}brand/petromin-logo.svg" alt="Petromin Lubricants" width="110" height="48">`,
      })}
      <figure class="dir-banner">
        ${img(ctx, c.img, '', { sizes: '(min-width: 960px) 70vw, 100vw', eager: true })}
        <figcaption>${esc(c.quote.join(' '))}</figcaption>
      </figure>
      ${!multi ? benefitsRow(c.benefits) : ''}
      ${c.groups.map((g) => html`<section class="dir-section" id="${g.id}" aria-labelledby="${g.id}-title">
        ${multi ? html`<div class="group-head">
          ${g.img ? html`<div class="group-img">${img(ctx, g.img, '', { sizes: '(min-width: 960px) 300px, 100vw' })}</div>` : ''}
          <div>
            <h2 class="group-title" id="${g.id}-title">${esc(g.name)}</h2>
            ${benefitsRow(g.benefits)}
          </div>
        </div>` : html`<h2 class="sr" id="${g.id}-title">${esc(c.nav)} range</h2>`}
        <div class="product-list">
          ${g.products.map((p) => productCard(ctx, p))}
        </div>
        <p class="more">${btn(g.directory || c.directory, `View ${multi ? g.name.toLowerCase() : 'the range'} in the product directory`, 'btn-outline btn-sm', true)}</p>
      </section>`)}
      ${c.slug === 'diesel-engine-oils' ? html`
      <section class="dir-section api" id="api-categories" aria-labelledby="api-title">
        <h2 class="group-title" id="api-title">${esc(apiCategories.title)}</h2>
        <div class="api-grid">
          <div>
            <ol class="api-line">
              ${apiCategories.timeline.map((t, i) => html`<li class="api-${t.status}" style="--i:${i}"><span class="api-year">${t.year}</span><span class="api-dot"></span><span class="api-cat">${esc(t.cat)}</span></li>`)}
            </ol>
            <p class="api-key"><span class="k k--obsolete">Obsolete</span><span class="k k--current">Current</span></p>
          </div>
          <div class="table-scroll" tabindex="0" role="region" aria-label="API CK-4 summary">
            <table class="api-table">
              <thead><tr><th scope="col">API standard</th><th scope="col">Market position</th><th scope="col">Best for</th><th scope="col">Compatibility</th></tr></thead>
              <tbody><tr><th scope="row">${apiCategories.table.standard}</th><td>${apiCategories.table.position}</td><td>${apiCategories.table.bestFor}</td><td>${esc(apiCategories.table.compatibility)}</td></tr></tbody>
            </table>
          </div>
        </div>
      </section>` : ''}
      <nav class="pager" aria-label="Product categories">
        ${prev ? html`<a class="pager-prev" href="${prev.slug}.html"><span>Previous</span>${esc(prev.nav)}</a>` : html`<a class="pager-prev" href="index.html"><span>Back to</span>All products</a>`}
        ${next ? html`<a class="pager-next" href="${next.slug}.html"><span>Next</span>${esc(next.nav)}</a>` : html`<a class="pager-next" href="../oil-finder.html"><span>Find the right oil</span>Oil Finder</a>`}
      </nav>
    </div>
  </div>
</div>
${c.slug === 'diesel-engine-oils' ? oemMatrix(ctx) : ''}
`,
  });
});

// ======================================================================= SERVICES INDEX
page({
  path: 'services/index.html',
  section: 'services',
  title: 'Our Services',
  description: 'Petrolube service solutions for fleets: lubrication assessment, Lab on Wheels, oil condition monitoring, technical training, tank sensors and mobile bulk storage.',
  render: (ctx) => html`
${pageHero(ctx, {
  trail: [['Services']],
  title: ['Petrolube service solutions'],
  lead: 'Beyond the product: specialists who assess, recommend, implement, monitor and optimize lubrication across your fleet.',
  image: 'services-inspector',
  imageAlt: 'A Petrolube field engineer inspecting a tipper truck with a tablet',
  actions: btn('#all-services', 'Browse services', 'btn-primary') + btn(link(ctx, 'contact.html'), 'Talk to an account manager', 'btn-outline'),
  cardCls: 'hero-card--wide',
})}
<section class="section" aria-labelledby="lifecycle-title">
  <div class="wrap">
    ${heading({ title: ['How the program works'], sub: 'Five stages, from first assessment to continuous optimization.', id: 'lifecycle-title' })}
    ${lifecycle(ctx)}
  </div>
</section>
<section class="section section--soft" id="all-services" aria-labelledby="svc-all-title">
  <div class="wrap">
    ${heading({ eyebrow: 'Service detail', title: ['Six services, one program'], sub: 'Each service can run on its own or as part of the full lubrication program.', id: 'svc-all-title' })}
    ${serviceCards(ctx)}
  </div>
</section>
${roadmapSection(ctx)}
`,
});

// ======================================================================= SERVICE DETAIL
services.list.forEach((s, idx) => {
  const next = services.list[(idx + 1) % services.list.length];
  page({
    path: `services/${s.slug}.html`,
    section: 'services',
    title: s.short || s.name,
    description: `${s.intro} ${s.features.slice(0, 2).join('. ')}.`,
    render: (ctx) => html`
<div class="dir">
  <div class="wrap dir-grid">
    ${sidebar(ctx, { kind: 'services', active: s.slug })}
    <div class="dir-main">
      ${directoryHead(ctx, {
        trail: [['Services', 'services/index.html'], [s.short || s.name]],
        title: s.short || s.name,
        sub: s.intro,
        mark: img(ctx, s.mark, `SERVE ${s.name}`, { cls: 'svc-mark svc-mark--hero', sizes: '260px' }),
      })}
      <div class="svc-detail">
        <figure class="svc-detail-img">${img(ctx, s.img, '', { sizes: '(min-width: 960px) 40vw, 100vw', eager: true })}</figure>
        <div>
          <h2 class="sub-title">What’s included</h2>
          <ul class="dots dots--lg">${s.features.map((f) => html`<li>${esc(f)}</li>`)}</ul>
          ${s.notes ? html`<div class="notes">${s.notes.map((n) => html`<p>${esc(n)}</p>`)}</div>` : ''}
        </div>
      </div>
      <div class="value-box">
        <h2 class="sub-title">Value to your operation</h2>
        <ul class="ticks">${s.value.map((v) => html`<li>${icon('check')}${esc(v)}</li>`)}</ul>
      </div>
      <nav class="pager" aria-label="Services">
        <a class="pager-prev" href="index.html"><span>Back to</span>All services</a>
        <a class="pager-next" href="${next.slug}.html"><span>Next service</span>${esc(next.short || next.name)}</a>
      </nav>
    </div>
  </div>
</div>
${roadmapSection(ctx, { compact: true })}
`,
  });
});

// ======================================================================= OIL FINDER
page({
  path: 'oil-finder.html',
  section: 'oil-finder',
  title: 'Oil Finder',
  description: 'Petrolube Oil Finder matches your vehicle or equipment with the right Petrolube lubricant, plus a quick lookup of heavy-duty engine oils by OEM.',
  render: (ctx) => html`
${pageHero(ctx, {
  trail: [['Oil Finder']],
  title: oilFinder.title,
  lead: esc(oilFinder.what),
  image: 'oil-finder-phone',
  imageAlt: 'Petrolube Oil Finder open on a smartphone',
  mediaCls: 'hero-media--contain',
  actions: btn(site.links.oilFinder, 'Open Oil Finder', 'btn-primary', true) + btn('#lookup', 'Quick OEM lookup', 'btn-outline'),
  cardCls: 'hero-card--wide',
})}
<section class="section" aria-labelledby="delivers-title">
  <div class="wrap narrow">
    ${heading({ title: ['What does this service deliver?'], id: 'delivers-title' })}
    <p class="lead">${esc(oilFinder.delivers)}</p>
    <ul class="ticks ticks--cards">${oilFinder.includes.map((t) => html`<li>${icon('check')}${esc(t)}</li>`)}</ul>
  </div>
</section>
<section class="section section--soft lookup" id="lookup" aria-labelledby="lookup-title">
  <div class="wrap">
    ${heading({ eyebrow: 'Heavy-duty diesel engine oils', title: ['Quick lookup by engine OEM'], sub: 'Pick the engine or vehicle manufacturer to see which Petromin heavy-duty engine oils hold its approval, and which meet or exceed its requirements.', id: 'lookup-title' })}
    <div class="lookup-ui" data-lookup>
      <div class="chips" role="group" aria-label="Engine or vehicle manufacturer">
        ${oems.map((o, i) => html`<button type="button" class="chip" aria-pressed="${i === 0}" data-oem="${i}">${esc(o)}</button>`)}
      </div>
      <div class="lookup-results" aria-live="polite">
        ${oems.map((o, i) => {
          const approved = recommendations.filter((r) => r.row[i] === 'A');
          const meets = recommendations.filter((r) => r.row[i] === 'M');
          return html`<div class="lookup-panel" data-panel="${i}"${i ? ' hidden' : ''}>
            <h3>${esc(o)}</h3>
            <div class="lookup-cols">
              <div><h4><span class="dot dot--a"></span> Approved (${approved.length})</h4>
                ${approved.length ? html`<ul>${approved.map((r) => html`<li>${esc(r.product)}</li>`)}</ul>` : html`<p class="muted">No approvals listed.</p>`}</div>
              <div><h4><span class="dot dot--m"></span> Meets / exceeds (${meets.length})</h4>
                ${meets.length ? html`<ul>${meets.map((r) => html`<li>${esc(r.product)}</li>`)}</ul>` : html`<p class="muted">None listed.</p>`}</div>
            </div>
          </div>`;
        })}
      </div>
    </div>
    <p class="fineprint">From the Petrolube recommendation matrix for heavy-duty engine oils. For other vehicles, equipment and fluids, use the full Oil Finder.</p>
  </div>
</section>
${oemMatrix(ctx, { id: 'full-matrix' })}
`,
});

// ======================================================================= CONTACT
page({
  path: 'contact.html',
  section: 'contact',
  title: 'Contact',
  description: 'Contact Petrolube sales: head office on Prince Sultan Road, Jeddah. sales@petrolubegroup.com, +966 12 699 6600.',
  render: (ctx) => html`
${pageHero(ctx, {
  trail: [['Contact']],
  title: ['Contact us'],
  lead: 'Share your equipment and lubrication details and your account manager will schedule a technical meeting.',
  image: 'contact-plant',
  imageAlt: '',
  cardCls: 'hero-card--wide',
})}
<section class="section section--soft" aria-label="Contact details">
  <div class="wrap">
    <ul class="contact-cards">
      <li><span class="lbl">Head office</span>${esc(site.contact.office)}</li>
      <li><span class="lbl">Sales</span><a href="mailto:${site.contact.email}">${site.contact.email}</a></li>
      <li><span class="lbl">Contact</span>${site.contact.phones.map((p, i) => html`${i ? '<br>' : ''}<a href="tel:${p.replace(/\s/g, '')}">${p}</a>`)}</li>
      <li><span class="lbl">Website</span><a href="${site.contact.website}" rel="noopener">${site.contact.websiteLabel}</a></li>
    </ul>
  </div>
</section>
<section class="section" aria-labelledby="form-title">
  <div class="wrap contact-form-wrap">
    <div>
      ${heading({ eyebrow: 'Step 01 — contact account manager', title: ['Request a technical meeting'], sub: 'Your account manager will schedule a technical meeting, and our team will assess conditions and report back with recommendations.', id: 'form-title' })}
      <form class="form" data-contact-form data-to="${site.contact.email}" novalidate>
        <div class="field-row">
          <div class="field"><label for="f-name">Full name <span aria-hidden="true">*</span></label><input id="f-name" name="name" autocomplete="name" required></div>
          <div class="field"><label for="f-company">Company <span aria-hidden="true">*</span></label><input id="f-company" name="company" autocomplete="organization" required></div>
        </div>
        <div class="field-row">
          <div class="field"><label for="f-email">Work email <span aria-hidden="true">*</span></label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
          <div class="field"><label for="f-phone">Phone</label><input id="f-phone" name="phone" type="tel" autocomplete="tel"></div>
        </div>
        <div class="field-row">
          <div class="field"><label for="f-segment">Fleet segment</label>
            <select id="f-segment" name="segment"><option value="">Select…</option>${whoWeServe.segments.map((s) => html`<option>${esc(s.name)}</option>`)}<option>Other</option></select></div>
          <div class="field"><label for="f-size">Fleet size</label>
            <select id="f-size" name="size"><option value="">Select…</option><option>Under 25 vehicles</option><option>25–100 vehicles</option><option>100–500 vehicles</option><option>500+ vehicles</option></select></div>
        </div>
        <fieldset class="field">
          <legend>Services of interest</legend>
          <div class="checks">${services.list.map((s) => html`<label><input type="checkbox" name="services" value="${esc(s.short || s.name)}"> ${esc(s.short || s.name)}</label>`)}</div>
        </fieldset>
        <div class="field"><label for="f-msg">Equipment &amp; lubrication details</label><textarea id="f-msg" name="message" rows="5" placeholder="Vehicle makes and models, duty cycles, current lubricants, drain intervals…"></textarea></div>
        <p class="form-error" role="alert" hidden></p>
        <button class="btn btn-primary" type="submit">Send message</button>
      </form>
    </div>
  </div>
</section>
`,
});

export default pages;
