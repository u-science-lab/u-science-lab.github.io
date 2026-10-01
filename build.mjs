import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(root, '_site');
await mkdir(path.join(output, 'assets', 'projects'), { recursive: true });
const css = await readFile(path.join(root, 'site.css'));
const cssName = `site.${createHash('sha256').update(css).digest('hex').slice(0, 12)}.css`;
await writeFile(path.join(output, 'assets', cssName), css);
for (const file of ['index.html', '404.html']) {
  const html = await readFile(path.join(root, file), 'utf8');
  await writeFile(path.join(output, file), html.replace(/href="\/site\.css(?:\?[^"]*)?"/g, `href="/assets/${cssName}"`));
}
// Explicit publish list: research images and attribution only, not development files.
for (const file of ['favicon.svg', '.nojekyll', 'assets/projects/ufish-overview.png', 'assets/projects/uprobe-editor.jpg', 'assets/projects/SOURCES.txt', 'autofish-digital-twin/index.html']) {
  await mkdir(path.dirname(path.join(output, file)), { recursive: true });
  await cp(path.join(root, file), path.join(output, file));
}
console.log(`Website built in _site with cache-safe stylesheet ${cssName}`);
