#!/usr/bin/env python3
"""Pull every image the site uses out of the print booklet and write web-ready WebP files.

    python3 tools/extract_assets.py [path/to/booklet.pdf]

Needs PyMuPDF (fitz) and Pillow. Writes static/img/*.webp plus static/img/manifest.json,
which build.mjs reads for width/height/srcset. Re-run whenever the booklet is revised.

Photos and raster logos are lifted at native resolution by PDF object id (xref).
Vector-only artwork (Juffali logo, Saudi Made mark, SERVE service marks, footprint map)
is rendered from the page and trimmed.
"""
import json, os, sys
import fitz
from PIL import Image, ImageChops, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'static', 'img')
PDF = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser('~/Downloads/Koraspond/Petrolube/B2B Transportation Booklet Solution.pdf')

# name: (xref, widths). widths=None keeps a single file at native size.
PHOTOS = {
    'hero-truck':          (885, [960, 1600, 2400]),
    'about-tank-farm':     (756, [800, 1600, 2400]),
    'fleets-dump-truck':   (110, [800, 1600]),
    'seg-long-haul':       (111, None),
    'seg-public-transport':(113, None),
    'seg-oil-gas':         (115, None),
    'seg-last-mile':       (117, None),
    'seg-box-chiller':     (119, None),
    'seg-municipal':       (121, None),
    'handshake':           (174, [800, 1600]),
    'trial-fleet':         (779, [800, 1600, 2400]),
    'gearbox-oil':         (490, [800, 1536]),
    'xray-truck':          (527, [1000, 2000, 3000]),
    'diesel-truck':        (535, [800, 1600]),
    'gears-golden':        (781, [800, 1448]),
    'grease-bearing':      (554, [800, 1448]),
    'hydraulic-cylinder':  (555, [800, 1600]),
    'brake-disc':          (562, [800, 1600]),
    'coolant-engine':      (563, [800, 1053]),
    'def-cap':             (787, [800, 1448]),
    'services-inspector':  (610, [800, 1600, 2400]),
    'svc-assess':          (666, [800, 1600]),
    'svc-lab-on-wheels':   (668, [800, 1600]),
    'svc-ocm':             (712, [800, 1600]),
    'svc-training':        (714, [800, 1600]),
    'svc-tank-sensors':    (730, [800, 1600]),
    'svc-mobile-tanks':    (732, [800, 1600]),
    'oil-finder-phone':    (737, [700, 1400]),
    'contact-plant':       (746, [800, 1600, 2400]),
    # client logos
    'client-modern-bus':   (167, None),
    'client-al-jaber':     (176, None),
    'client-sgp-riyadh':   (178, None),
    # certifications
    'cert-bv-iso9001':     (373, None),
    'cert-bv-iso45001':    (317, None),
    'cert-bv-iso14001':    (335, None),
    'cert-iso17025':       (375, None),
    'cert-saso-standards': (384, None),
    'cert-saudi-accreditation': (382, None),
    'cert-saso-quality':   (386, None),
    'cert-eneos':          (387, None),
    'cert-emirates-quality': (388, None),
    # OEM approvals
    'oem-daimler':         (390, None),
    'oem-volvo':           (345, None),
    'oem-cummins':         (392, None),
    'oem-renault':         (363, None),
    'oem-gm':              (394, None),
    'oem-dexos1':          (355, None),
    'oem-scania':          (358, None),
    'oem-mack':            (368, None),
    # industry specs + sustainability
    'spec-api':            (288, None),
    'spec-astm':           (379, None),
    'spec-acea':           (377, None),
    'esg-gri':             (381, None),
    'esg-msci':            (291, None),
}

MAX_SINGLE = 1400  # cap for single-size assets
SCENE = (842, 110, 1684, 558)  # Story Legacy artwork on p.05, in PDF points
POST = {}  # name -> clean-up function, filled in below the helpers


def pixmap_image(doc, xref):
    pix = fitz.Pixmap(doc, xref)
    if pix.colorspace and pix.colorspace.n != 3:
        pix = fitz.Pixmap(fitz.csRGB, pix)
    smask = next((i[1] for p in doc for i in p.get_images(full=True) if i[0] == xref), 0)
    if smask:
        m = fitz.Pixmap(doc, smask)
        if (m.width, m.height) == (pix.width, pix.height):
            pix = fitz.Pixmap(pix, m)
    mode = 'RGBA' if pix.alpha else 'RGB'
    im = Image.frombytes(mode, (pix.width, pix.height), pix.samples)
    if mode == 'RGBA':
        # Many photos carry a rectangular clip mask from the layout: crop to it, and if what
        # remains is opaque, drop the alpha channel so it behaves as an ordinary photo.
        alpha = im.getchannel('A')
        bb = alpha.point(lambda v: 255 if v > 40 else 0).getbbox()  # ignore faint shadow haze
        if bb:
            im = im.crop(bb)
            alpha = im.getchannel('A')
        hist = alpha.histogram()
        if sum(hist[:245]) / sum(hist) < 0.01:
            im = im.convert('RGB')
    return im


def soften_halo(im):
    """The gearbox cut-out sits in a feathered grey smoke mask that reads as a ring on white.
    Fade light, desaturated half-transparent pixels; keep the dark dust and the golden oil."""
    import numpy as np
    a = np.asarray(im).astype(float)
    rgb, alpha = a[..., :3], a[..., 3] / 255
    light = rgb.mean(axis=2)
    sat = rgb.max(axis=2) - rgb.min(axis=2)
    fade = np.where(sat > 40, 1, np.clip((200 - light) / 90, 0, 1))
    alpha = np.where(alpha < 0.98, (alpha ** 1.5) * fade, alpha)
    a[..., 3] = alpha * 255
    return Image.fromarray(a.astype('uint8'))


def trim(im, thr=18, pad=6):
    rgb = im.convert('RGB')
    bg = Image.new('RGB', rgb.size, (255, 255, 255))
    bb = ImageChops.difference(rgb, bg).convert('L').point(lambda v: 255 if v > thr else 0).getbbox()
    if not bb:
        return im
    return im.crop((max(0, bb[0] - pad), max(0, bb[1] - pad), min(im.width, bb[2] + pad), min(im.height, bb[3] + pad)))


def render(doc, pno, rect, zoom, alpha=False):
    """alpha=True leaves the unpainted paper transparent, so a mark can sit on any ground."""
    pix = doc[pno].get_pixmap(matrix=fitz.Matrix(zoom, zoom), clip=fitz.Rect(*rect), alpha=alpha)
    return Image.frombytes('RGBA' if alpha else 'RGB', (pix.width, pix.height), pix.samples)


def trim_alpha(im, pad=2):
    bb = im.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
    if not bb:
        return im
    return im.crop((max(0, bb[0] - pad), max(0, bb[1] - pad),
                    min(im.width, bb[2] + pad), min(im.height, bb[3] + pad)))


def strip_divider_and_rule(im):
    """SERVE marks sit beside a black divider and above an orange heading rule; cut both."""
    w, h = im.size
    px = im.load()
    for x in range(w - 1, int(w * 0.5), -1):
        if sum(1 for y in range(h) if sum(px[x, y]) < 200) > h * 0.4:
            im = im.crop((0, 0, x - 6, h)); break
    w, h = im.size
    px = im.load()
    bottom = h
    for y in range(h - 1, int(h * 0.5), -1):
        if sum(1 for x in range(w) if px[x, y][0] > 200 and 120 < px[x, y][1] < 200 and px[x, y][2] < 90) > w * 0.6:
            bottom = y - 4
    return trim(im.crop((0, 0, w, bottom)))


LEGACY_PHOTOS = {  # printed photo areas on p.05, in PDF points
    'legacy-1968': (899, 396, 984, 450),
    'legacy-1982': (1030, 361, 1119, 410),
    'legacy-2007': (1161, 289, 1254, 351),
    'legacy-2010': (1300, 242, 1396, 306),
    'legacy-2021': (1411, 195, 1543, 283),
    'legacy-2023': (1563, 179, 1648, 236),
}


def legacy_photos():
    """Each milestone photo as printed — several are composites (a logo layered over a photo),
    so the printed area is rendered, from the page whose captions have been redacted away."""
    import numpy as np
    doc, page = _redacted_legacy_page()
    out = {}
    for name, rect in LEGACY_PHOTOS.items():
        pix = page.get_pixmap(matrix=fitz.Matrix(6, 6), clip=fitz.Rect(*rect))
        im = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
        # trim the spread's green ground and any amber pole caught at the edge
        a = np.asarray(im).astype(int)
        r, g, b = a[..., 0], a[..., 1], a[..., 2]
        ground = (r < 90) & (g - r > 15) & (b < 120)
        pole = (r > 160) & (g > 110) & (b < 110)
        keep = ~(ground | pole)
        rows = np.where(keep.sum(axis=1) > keep.shape[1] * 0.25)[0]
        cols = np.where(keep.sum(axis=0) > keep.shape[0] * 0.25)[0]
        if len(rows) and len(cols):
            im = im.crop((int(cols[0]), int(rows[0]), int(cols[-1]) + 1, int(rows[-1]) + 1))
        out[name] = im
    doc.close()
    return out


def _redacted_legacy_page():
    """p.05 with its live text removed; images (photos) and line art (poles, road) kept."""
    doc = fitz.open(PDF)
    page = doc[2]
    half = page.rect.width / 2
    for b in page.get_text('dict')['blocks']:
        if b['type'] != 0:
            continue
        x0, y0, x1, y1 = b['bbox']
        if x0 < half or y0 > 560:
            continue
        page.add_redact_annot(fitz.Rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1))
    # keep the images (photos) and the line art (poles, road) — remove only the text
    page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE, graphics=fitz.PDF_REDACT_LINE_ART_NONE)
    return doc, page


def legacy_scene():
    """The Story Legacy spread as the booklet draws it: receding road, amber milestone poles and
    the six photos, with the live text removed so the site can set real text over the artwork."""
    doc, page = _redacted_legacy_page()
    pix = page.get_pixmap(matrix=fitz.Matrix(3, 3), clip=fitz.Rect(SCENE))
    im = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
    doc.close()
    # the spread's amber title rule clips into the top-left of the crop; carry the background
    # gradient over it (the site sets its own heading above the artwork)
    z = 3
    x1 = round((1012 - SCENE[0]) * z)
    y0, y1 = round((135 - SCENE[1]) * z), round((143 - SCENE[1]) * z)
    src = y1 + 1
    for y in range(y0, y1 + 1):
        for x in range(0, x1):
            im.putpixel((x, y), im.getpixel((x, src)))
    return im


def vector_assets(doc):
    out = {}
    titles = {16: [('ASSESS', 'serve-assess'), ('LAB ON WHEELS', 'serve-lab-on-wheels')],
              17: [('OIL CONDITION', 'serve-ocm'), ('TECHNICAL TRAINING', 'serve-training')],
              18: [('MOBILE STORAGE TANKS', 'serve-mobile-tanks'), ('TANK SENSORS', 'serve-tank-sensors')]}
    for pno, items in titles.items():
        for text, name in items:
            r = sorted(doc[pno].search_for(text), key=lambda r: -r.height)[0]
            # clipped short of the page's divider rule, and rendered on transparency
            out[name] = trim_alpha(render(doc, pno, (r.x0 - 150, r.y0 - 20, r.x0 - 14, r.y1 + 10), 6, alpha=True))
    juffali = render(doc, 4, (40, 340, 180, 420), 6)
    juffali = juffali.point(lambda v: 255 if v > 232 else v)
    out['client-juffali'] = trim(juffali)
    out['cert-saudi-made'] = trim(render(doc, 5, (260, 330, 560, 420), 5))
    m = render(doc, 2, (30, 130, 540, 540), 3)
    s = m.width / 522  # legend boxes are rebuilt in HTML, so blank them out
    d = ImageDraw.Draw(m)
    d.rectangle((0, int(318 * s), int(135 * s), int(360 * s)), fill='white')
    d.rectangle((int(350 * s), int(288 * s), m.width, m.height), fill='white')
    out['footprint-map'] = trim(m, pad=10)
    return out


def save(name, im, widths, manifest):
    has_alpha = im.mode == 'RGBA'
    if widths is None:
        if im.width > MAX_SINGLE:
            im = im.resize((MAX_SINGLE, round(im.height * MAX_SINGLE / im.width)), Image.LANCZOS)
        widths = [im.width]
    widths = sorted({min(w, im.width) for w in widths})
    for w in widths:
        h = round(im.height * w / im.width)
        variant = im if w == im.width else im.resize((w, h), Image.LANCZOS)
        suffix = '' if len(widths) == 1 else f'-{w}'
        # exact=True keeps the RGB under transparent pixels; without it the encoder zeroes
        # them and lossy compression bleeds a dark ring into feathered edges.
        variant.save(os.path.join(OUT, f'{name}{suffix}.webp'), 'WEBP', quality=80, method=6, exact=has_alpha)
    manifest[name] = {'w': im.width, 'h': im.height, 'widths': widths if len(widths) > 1 else [], 'alpha': has_alpha}


POST['gearbox-oil'] = soften_halo


def main():
    os.makedirs(OUT, exist_ok=True)
    doc = fitz.open(PDF)
    manifest = {}
    for name, (xref, widths) in PHOTOS.items():
        im = pixmap_image(doc, xref)
        if name in POST:
            im = POST[name](im)
        save(name, im, widths, manifest)
        print('photo ', name)
    for name, im in legacy_photos().items():
        save(name, im, None, manifest)
        print('photo ', name)
    save('legacy-scene', legacy_scene(), [1200, 2000], manifest)
    print('scene  legacy-scene')
    for name, im in vector_assets(doc).items():
        save(name, im, [720, 1439] if name == 'footprint-map' else None, manifest)
        print('vector', name)
    with open(os.path.join(OUT, 'manifest.json'), 'w') as f:
        json.dump(manifest, f, indent=1, sort_keys=True)
    print(len(manifest), 'assets ->', OUT)


if __name__ == '__main__':
    main()
