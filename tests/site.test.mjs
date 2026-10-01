import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const root = new URL('../', import.meta.url);
const html = await readFile(new URL('_site/index.html', root), 'utf8');
test('homepage features only the two public research projects', () => {
  assert.match(html, /id="ufish-title"/);
  assert.match(html, /id="uprobe-title"/);
  assert.equal((html.match(/<article /g) || []).length, 2);
  assert.doesNotMatch(html, /digital.twin|autoFISH/i);
});
test('all local page assets and links exist in the deployment', async () => {
  for (const match of html.matchAll(/(?:src|href|poster)="(\/(?!\/)[^"?#]*)(?:\?[^"#]*)?"/g)) {
    const item = await stat(new URL(`_site${match[1]}`, root));
    assert.ok(item.isFile() || match[1] === '/');
  }
});
test('both pages use the current content-hashed stylesheet', async () => {
  const css = await readFile(new URL('site.css', root));
  const hash = createHash('sha256').update(css).digest('hex').slice(0, 12);
  const expected = `/assets/site.${hash}.css`;
  for (const file of ['index.html', '404.html']) {
    const page = await readFile(new URL(`_site/${file}`, root), 'utf8');
    assert.ok(page.includes(`href="${expected}"`));
    assert.doesNotMatch(page, /href="\/site\.css/);
  }
});
test('research media is accessible and video is opt-in', () => {
  assert.match(html, /alt="Official U-FISH workflow/);
  assert.match(html, /<video controls playsinline preload="none"/);
  assert.doesNotMatch(html, /autoplay/);
  assert.match(html, /aria-label="U-Probe official custom probe design tutorial"/);
});
