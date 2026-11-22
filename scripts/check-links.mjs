// Checks every internal link and image in the static export (out/).
// Usage: npm run build && npm run check:links
// Set BASE_PATH the same way as for the build (for example /study-guide).
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const out = 'out';
const base = process.env.BASE_PATH || '';
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) files.push(p);
  }
})(out);

const broken = [];
let checked = 0;
for (const file of files) {
  // Next adds <link rel="preconnect" href="/">; it is a hint, not a link.
  const html = readFileSync(file, 'utf8').replace(/<link rel="preconnect"[^>]*>/g, '');
  for (const [, url] of html.matchAll(/(?:href|src)="([^"#?]*)[^"]*"/g)) {
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    if (base && !url.startsWith(base)) {
      broken.push(`${file}: ${url} (missing base path ${base})`);
      continue;
    }
    const path = decodeURIComponent(url.slice(base.length));
    const target = join(out, path);
    const ok = existsSync(target) && (statSync(target).isFile() || existsSync(join(target, 'index.html')));
    checked++;
    if (!ok) broken.push(`${file}: ${url}`);
  }
}

console.log(`Checked ${checked} internal links in ${files.length} pages.`);
if (broken.length) {
  console.error(`${broken.length} broken:\n${[...new Set(broken)].join('\n')}`);
  process.exit(1);
}
console.log('No broken internal links.');
