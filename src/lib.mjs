import { readFileSync } from 'node:fs';

const manifest = JSON.parse(readFileSync(new URL('../static/img/manifest.json', import.meta.url)));

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Tagged template that joins arrays, so `${list.map(...)}` needs no .join('').
export const html = (strings, ...values) =>
  strings.reduce((out, s, i) => out + s + (i < values.length ? flat(values[i]) : ''), '');
const flat = (v) => (Array.isArray(v) ? v.map(flat).join('') : v === false || v == null ? '' : String(v));

/**
 * Responsive <img> from static/img/manifest.json.
 * sizes: the CSS display width hint, e.g. '(min-width: 960px) 50vw, 100vw'.
 */
export function img(ctx, name, alt, { sizes = '100vw', cls = '', eager = false, style = '' } = {}) {
  const m = manifest[name];
  if (!m) throw new Error(`Unknown image "${name}" — run tools/extract_assets.py`);
  const base = `${ctx.root}img/${name}`;
  const attrs = [
    `alt="${esc(alt)}"`,
    `width="${m.w}" height="${m.h}"`,
    eager ? 'fetchpriority="high"' : 'loading="lazy"',
    'decoding="async"',
    cls && `class="${cls}"`,
    style && `style="${style}"`,
  ].filter(Boolean);
  if (!m.widths.length) return `<img src="${base}.webp" ${attrs.join(' ')}>`;
  const largest = m.widths[m.widths.length - 1];
  const srcset = m.widths.map((w) => `${base}-${w}.webp ${w}w`).join(', ');
  return `<img src="${base}-${largest}.webp" srcset="${srcset}" sizes="${sizes}" ${attrs.join(' ')}>`;
}

// Icons come from the booklet itself: tools/extract_icons.py rebuilds each one as SVG from
// the PDF's own vector paths (static/icons). Nothing here is drawn by hand — an unknown name
// throws, so a missing icon fails the build rather than silently disappearing.
const ICON_DIR = new URL('../static/icons/', import.meta.url);
const iconCache = new Map();

export function icon(name, { label, cls = '' } = {}) {
  if (!iconCache.has(name)) {
    const svg = readFileSync(new URL(`${name}.svg`, ICON_DIR), 'utf8')
      .replace(/\s*aria-hidden="true"/, '')
      .replace(/\n/g, '')
      .trim();
    iconCache.set(name, svg);
  }
  const a11y = label ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true" focusable="false"';
  return iconCache.get(name).replace('<svg', `<svg class="ico${cls ? ' ' + cls : ''}" ${a11y}`);
}

// Typographic affordances (not imagery): the booklet has no UI arrows or chevrons.
export const glyph = (kind) => {
  const g = { arrow: '\u2192', external: '\u2197', chevron: '\u25BE', close: '\u00D7' }[kind];
  return `<span class="glyph glyph--${kind}" aria-hidden="true">${g}</span>`;
};

/**
 * Section head in the parent-site idiom: sentence-case bold title, optional grey
 * standfirst underneath, optional small label above. `title` stays an array so the
 * content file is shared with V1; the parts are simply joined.
 */
export function heading({ title, sub, level = 2, cls = '', id, aside = '' } = {}) {
  const text = title.join(' ');
  return html`<header class="sec-head ${cls}">
    <div>
      <h${level} class="sec-title"${id ? ` id="${id}"` : ''}>${esc(text)}</h${level}>
      ${sub ? html`<p class="sec-sub">${esc(sub)}</p>` : ''}
    </div>
    ${aside}
  </header>`;
}

export const link = (ctx, path) => ctx.root + path;
