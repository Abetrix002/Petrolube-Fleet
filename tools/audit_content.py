#!/usr/bin/env python3
"""Check that every substantive line of the booklet appears on the built site.

    node build.mjs && python3 tools/audit_content.py

Prints booklet phrases (4+ words) that no page contains. A short tail of known artefacts is
expected: page folios ("18 Diesel Engine oil"), the printed table-of-contents numbering, and
the three typo corrections listed in the README.
"""
import re, os, glob, subprocess
from html.parser import HTMLParser

PDF=os.path.expanduser('~/Downloads/Koraspond/Petrolube/B2B Transportation Booklet Solution.pdf')
raw=subprocess.run(['pdftotext','-layout',PDF,'-'],capture_output=True,text=True).stdout
pages=raw.split('\f')

class T(HTMLParser):
    def __init__(s): super().__init__(); s.buf=[]; s.skip=0
    def handle_starttag(s,t,a):
        if t in ('script','style'): s.skip+=1
        d=dict(a)
        for k in ('alt','aria-label','title'):
            if d.get(k): s.buf.append(d[k])
    def handle_endtag(s,t):
        if t in ('script','style'): s.skip=max(0,s.skip-1)
    def handle_data(s,d):
        if not s.skip: s.buf.append(d)

site=[]
for f in glob.glob(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'site', '**', '*.html'),recursive=True):
    p=T(); p.feed(open(f).read()); site.append(' '.join(p.buf))
def norm(x):
    x=x.lower().replace('’',"'").replace('‘',"'").replace('–','-').replace('—','-')
    x=re.sub(r'[^a-z0-9%&+./\- ]',' ',x)
    return re.sub(r'\s+',' ',x).strip()
SITE=norm(' '.join(site))

missing=[]
for i,pg in enumerate(pages,1):
    text=pg.replace('\n',' ')
    # split into phrases on runs of 2+ spaces (layout columns)
    for ph in re.split(r'\s{2,}', text):
        w=ph.split()
        if len(w)<4: continue
        n=norm(ph)
        if len(n)<18: continue
        if n in SITE: continue
        # try trimmed variants (wrapped lines)
        ok=False
        for k in range(len(w), 3, -1):
            if norm(' '.join(w[:k])) in SITE: ok=True; break
        if not ok:
            for k in range(0, len(w)-3):
                if norm(' '.join(w[k:])) in SITE: ok=True; break
        if not ok: missing.append((i,ph.strip()))
print(f'{len(missing)} phrases not found on the site\n')
for p,m in missing: print(f'p{p:02d}: {m[:150]}')
