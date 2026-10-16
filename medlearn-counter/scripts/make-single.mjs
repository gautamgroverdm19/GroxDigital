// Builds ONE self-contained file: medlearn-counter.html (code + styles + your inventory + template).
// Open it by double-clicking, or upload it to any website host.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist-single');
let html = readFileSync(join(dist, 'index.html'), 'utf8');
const assets = readdirSync(join(dist, 'assets'));
const js = assets.find((f) => f.endsWith('.js'));
const css = assets.find((f) => f.endsWith('.css'));
const read = (f) => readFileSync(join(dist, 'assets', f), 'utf8');
const safeScript = (s) => s.replace(/<\/script/gi, '<\\/script').replace(/<!--/g, '<\\!--');
const plain = (id, text) => {
  if (/<\/script/i.test(text)) throw new Error(`${id} contains </script>`);
  return `<script type="text/plain" id="${id}">${text}</script>`;
};

html = html.replace(/<script type="module" crossorigin src="[^"]+"><\/script>/, () => '');
html = html.replace(/<link rel="stylesheet" crossorigin href="[^"]+">/, () => `<style>${read(css)}</style>`);
html = html.replace(/\s*<link rel="manifest"[^>]*>/, '').replace(/\s*<link rel="apple-touch-icon"[^>]*>/, '');
const favicon = readFileSync(join(root, 'public/favicon.svg'), 'utf8');
html = html.replace(/href="\.\/favicon\.svg"/, `href="data:image/svg+xml,${encodeURIComponent(favicon)}"`);

const inventory = readFileSync(join(root, 'public/data/store-inventory.csv'), 'utf8').replace(/^﻿/, '');
const template = readFileSync(join(root, 'public/sample-template.csv'), 'utf8');
html = html.replace(
  '</body>',
  () => `${plain('embedded-inventory', inventory)}\n${plain('embedded-template', template)}\n<script type="module">${safeScript(read(js))}</script>\n</body>`
);

const out = join(root, 'medlearn-counter.html');
writeFileSync(out, html);
console.log(`Wrote ${out} (${(html.length / 1024).toFixed(0)} KB)`);
