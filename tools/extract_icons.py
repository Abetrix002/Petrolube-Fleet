#!/usr/bin/env python3
"""Rebuild the booklet's own icon set and logos as SVG files.

    python3 tools/extract_icons.py [path/to/booklet.pdf]

Every icon on the site comes from the print booklet: this walks the PDF's vector drawing
operators inside each icon's bounding box and re-emits them as a standalone SVG, keeping the
booklet's own strokes, fills and colours. Nothing is redrawn by hand.

Output: static/icons/*.svg (inlined at build time by src/lib.mjs) and the two brand logos in
static/brand/. Re-run after a booklet revision, then `node build.mjs`.

RECTS maps a name to [page(1-based), x0, y0, x1, y1] in PDF points, measured from the artwork.
"""
import json, os, sys
import fitz

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'static', 'icons')
BRAND = os.path.join(ROOT, 'static', 'brand')
PDF = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser('~/Downloads/Koraspond/Petrolube/B2B Transportation Booklet Solution.pdf')

RECTS = {
    # p.04 global footprint
    'globe': [3, 556.1, 263.6, 583.9, 294.3],
    'export': [3, 555.1, 337.4, 581.5, 367.0],
    'factory': [3, 555.9, 413.2, 580.3, 437.5],
    'warehouse': [3, 555.4, 485.2, 577.8, 506.5],
    # p.08 testimonials
    'quote': [5, 473.3, 309.4, 502.1, 332.0],
    # p.13 trial — protection + customer value
    'engine': [7, 1149.3, 147.9, 1188.0, 186.5],
    'shield': [7, 1149.3, 481.2, 1188.0, 519.8],
    'thermo': [7, 1148.9, 252.2, 1186.5, 285.1],
    'filter': [7, 1424.5, 147.0, 1459.5, 183.4],
    'clock': [7, 1150.5, 386.6, 1184.1, 423.1],
    'gears': [7, 1415.8, 384.8, 1456.6, 421.2],
    # p.14-15 industry challenges (amber) + lubrication answers (green)
    'chart': [8, 44.1, 267.5, 65.1, 299.0],
    'gauge': [8, 40.7, 332.3, 65.3, 359.5],
    'worker': [8, 46.5, 391.9, 65.1, 418.6],
    'leaf': [8, 43.0, 452.3, 65.9, 475.9],
    'drops': [8, 1268.0, 272.5, 1294.1, 300.0],
    'drop-shield': [8, 1271.7, 332.2, 1293.0, 357.6],
    'exhaust': [8, 1266.2, 397.9, 1294.9, 415.2],
    'monitor': [8, 1269.6, 453.3, 1291.2, 473.7],
    'check': [8, 1226.2, 273.4, 1252.0, 299.2],
    # p.18-19 diesel engine oils (red)
    'r-shield-gear': [10, 574.6, 467.3, 599.8, 492.4],
    'r-gauge': [10, 575.4, 505.8, 601.9, 532.6],
    'r-engine': [10, 733.0, 466.9, 758.2, 491.6],
    'r-oilcan': [10, 866.7, 466.2, 910.4, 487.9],
    'r-snow': [10, 734.9, 505.0, 756.3, 529.0],
    'r-fuel': [10, 871.7, 499.9, 899.9, 528.0],
    # p.22-23 transmissions & gearbox oils (red)
    'r-oilcan2': [12, 79.0, 518.0, 107.4, 532.1],
    'r-gauge2': [12, 79.1, 423.9, 105.6, 450.6],
    'r-gear-clock': [12, 253.2, 425.8, 278.4, 451.0],
    'r-gears-rot': [12, 80.6, 470.4, 106.2, 495.1],
    'r-gear-waves': [12, 253.6, 472.5, 279.3, 491.7],
    'r-speaker': [12, 260.7, 519.7, 275.7, 536.0],
    # p.24-25 hydraulic oils + greases (red)
    'r-shield-check': [13, 82.9, 469.4, 103.8, 494.9],
    'r-shield-gear2': [13, 256.2, 518.8, 278.5, 541.0],
    'r-gears-drop': [13, 256.2, 471.6, 278.2, 493.1],
    'r-shield-drop': [13, 82.2, 518.7, 103.7, 539.0],
    'r-sparkle': [13, 1309.7, 292.3, 1324.9, 313.2],
    'r-drop-down': [13, 1311.8, 329.0, 1325.5, 346.6],
    'r-bearing': [13, 1146.4, 290.2, 1167.3, 315.7],
    'r-funnel': [13, 1144.4, 325.5, 1168.8, 348.7],
    # p.26-27 coolants (red)
    'r-hourglass': [14, 83.1, 452.5, 100.5, 473.2],
    'r-thermo': [14, 81.2, 498.4, 101.9, 518.9],
    'r-snow-shield': [14, 257.1, 451.0, 277.1, 473.1],
    'r-gears-compat': [14, 251.9, 501.3, 277.9, 519.5],
    # p.28-29 diesel exhaust fluid (red)
    'r-emissions': [15, 84.4, 458.2, 106.3, 475.7],
    'r-gears-cost': [15, 343.4, 456.4, 368.4, 478.8],
    'r-gauge3': [15, 218.4, 456.4, 240.0, 478.0],
    'r-fuel2': [15, 487.1, 455.0, 508.5, 476.2],
    # p.30-31 service lifecycle
    'svc-assess': [16, 43.0, 455.0, 75.0, 487.0],
    'svc-step': [16, 440.1, 457.1, 466.6, 484.2],
    'arrow-amber': [16, 357.0, 453.8, 382.0, 485.0],
    # p.38 service roadmap
    'road-phone': [20, 44.3, 287.2, 63.8, 306.4],
    'road-share': [20, 316.5, 277.3, 345.5, 308.7],
    'road-meeting': [20, 574.4, 281.0, 607.0, 310.1],
    'road-assess': [20, 43.6, 413.5, 76.2, 442.6],
    'road-report': [20, 315.2, 409.1, 340.5, 439.5],
    'road-align': [20, 574.8, 411.4, 610.0, 442.3],
    'n01': [20, 44.6, 243.6, 78.1, 271.3],
    'n02': [20, 316.1, 239.1, 359.0, 266.6],
    'n03': [20, 575.6, 239.1, 618.4, 266.6],
    'n04': [20, 44.8, 374.6, 89.2, 402.0],
    'n05': [20, 316.5, 371.9, 359.7, 399.3],
    'n06': [20, 575.4, 372.8, 618.0, 400.2],
    'play': [20, 232.1, 264.1, 255.0, 287.1],
}
LOGOS = {
    # The booklet only ever sets the Petrolube mark reversed (white letters on its green
    # running-head band), so that is the only Petrolube lockup available from the PDF.
    # static/brand/petrolube-logo.svg is the client-supplied light-ground lockup used in the
    # header — it is NOT generated here, and re-running this script leaves it untouched.
    # running-head version: white letters only, as the booklet sets it on green bands
    'petrolube-logo-reverse': [3, 1571.0, 20.0, 1658.0, 60.0],
    # Petromin lockup with black "LUBRICANTS" (p.02, white ground) and white (p.03, green band)
    'petromin-logo': [2, 1162.0, 22.0, 1249.0, 66.0],
    'petromin-logo-reverse': [3, 1162.0, 22.0, 1249.0, 66.0],
}


def hexc(c):
    if c is None:
        return None
    return '#%02X%02X%02X' % tuple(max(0, min(255, round(v * 255))) for v in c[:3])


def path_d(items, prec=2):
    """Re-emit PDF path operators as SVG path data (fitz uses a top-left origin, like SVG)."""
    d, cur = [], None
    f = lambda v: f'{v:.{prec}f}'.rstrip('0').rstrip('.')
    for it in items:
        op = it[0]
        if op == 'l':
            p1, p2 = it[1], it[2]
            if cur is None or abs(cur.x - p1.x) > 0.01 or abs(cur.y - p1.y) > 0.01:
                d.append(f'M{f(p1.x)},{f(p1.y)}')
            d.append(f'L{f(p2.x)},{f(p2.y)}')
            cur = p2
        elif op == 'c':
            p1, p2, p3, p4 = it[1], it[2], it[3], it[4]
            if cur is None or abs(cur.x - p1.x) > 0.01 or abs(cur.y - p1.y) > 0.01:
                d.append(f'M{f(p1.x)},{f(p1.y)}')
            d.append(f'C{f(p2.x)},{f(p2.y)} {f(p3.x)},{f(p3.y)} {f(p4.x)},{f(p4.y)}')
            cur = p4
        elif op == 're':
            r = it[1]
            d.append(f'M{f(r.x0)},{f(r.y0)}H{f(r.x1)}V{f(r.y1)}H{f(r.x0)}Z')
            cur = None
        elif op == 'qu':
            q = it[1]
            d.append(f'M{f(q.ul.x)},{f(q.ul.y)}L{f(q.ur.x)},{f(q.ur.y)}L{f(q.lr.x)},{f(q.lr.y)}L{f(q.ll.x)},{f(q.ll.y)}Z')
            cur = None
    return ' '.join(d)


def build_svg(page, rect, pad=1.0):
    """Collect the drawings whose centre falls inside `rect`, then fit the viewBox to what
    was collected — a straddling path (a logo's box, say) is kept whole rather than dropped."""
    win = fitz.Rect(rect[0] - pad, rect[1] - pad, rect[2] + pad, rect[3] + pad)
    picked = []
    for dr in page.get_drawings():
        r = dr['rect']
        cx, cy = (r.x0 + r.x1) / 2, (r.y0 + r.y1) / 2
        if not (win.x0 <= cx <= win.x1 and win.y0 <= cy <= win.y1):
            continue
        if path_d(dr['items']):
            picked.append(dr)
    if not picked:
        return '', 0
    x0 = min(d['rect'].x0 for d in picked); y0 = min(d['rect'].y0 for d in picked)
    x1 = max(d['rect'].x1 for d in picked); y1 = max(d['rect'].y1 for d in picked)
    parts = []
    for dr in picked:
        d = path_d(dr['items'])
        attrs = []
        fill = hexc(dr.get('fill'))
        stroke = hexc(dr.get('color'))
        attrs.append(f'fill="{fill}"' if fill else 'fill="none"')
        if dr.get('even_odd'):
            attrs.append('fill-rule="evenodd"')
        if stroke:
            attrs.append(f'stroke="{stroke}"')
            attrs.append(f'stroke-width="{dr.get("width", 1) or 1:.2f}"')
            cap = (dr.get('lineCap') or [0])[0]
            attrs.append('stroke-linecap="' + ['butt', 'round', 'square'][cap if cap in (0, 1, 2) else 0] + '"')
            join = int(dr.get('lineJoin') or 0)
            attrs.append('stroke-linejoin="' + ['miter', 'round', 'bevel'][join if join in (0, 1, 2) else 0] + '"')
        if dr.get('closePath'):
            d += ' Z'
        for key, attr in (('fill_opacity', 'fill-opacity'), ('stroke_opacity', 'stroke-opacity')):
            v = dr.get(key)
            if v is not None and v < 1:
                attrs.append(f'{attr}="{v:.2f}"')
        parts.append(f'<path d="{d}" {" ".join(attrs)}/>')
    w, h = x1 - x0, y1 - y0
    body = '\n'.join(parts)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" '
            f'fill="none" aria-hidden="true">\n<g transform="translate({-x0:.2f},{-y0:.2f})">\n'
            f'{body}\n</g>\n</svg>\n'), len(parts)


def main():
    os.makedirs(OUT, exist_ok=True)
    os.makedirs(BRAND, exist_ok=True)
    doc = fitz.open(PDF)
    empty = []
    for target, folder in ((RECTS, OUT), (LOGOS, BRAND)):
        for name, (pno, *rect) in target.items():
            svg, n = build_svg(doc[pno - 1], rect)
            if n == 0:
                empty.append(name)
            with open(os.path.join(folder, f'{name}.svg'), 'w') as f:
                f.write(svg)
    print(f'{len(RECTS)} icons -> static/icons, {len(LOGOS)} logos -> static/brand')
    if empty:
        print('WARNING: no paths found for', ', '.join(empty))


if __name__ == '__main__':
    main()
