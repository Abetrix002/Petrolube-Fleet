#!/usr/bin/env node
// Static build: renders every page in src/pages.mjs into site/ and copies static/ alongside.
// No dependencies. Output uses relative links, so site/index.html opens straight from disk
// and the folder can be uploaded to any static host as-is.
//
//   node build.mjs
import { mkdirSync, rmSync, writeFileSync, cpSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import pages from './src/pages.mjs';
import { layout } from './src/layout.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, 'site');

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(join(ROOT, 'static'), OUT, {
  recursive: true,
  filter: (src) => !src.endsWith('manifest.json'),
});

for (const page of pages) {
  const depth = page.path.split('/').length - 1;
  const ctx = { root: '../'.repeat(depth), path: page.path };
  const file = join(OUT, page.path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, layout(ctx, page, page.render(ctx)));

}

console.log(`Built ${pages.length} pages → site/`);
