/* Guards the one thing four other repositories depend on.

   /site/tokens.css is linked across the origin by the sibling project sites,
   which have no build and no test, so a rename here would restyle four live
   sites with no signal anywhere. This turns that into a failed build. */

import { readFile } from 'node:fs/promises';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const css = await readFile(join(ROOT, 'public/site/tokens.css'), 'utf8');
const lock = JSON.parse(await readFile(join(ROOT, 'site/tokens.lock.json'), 'utf8'));

const declared = new Set([...css.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gim)].map((m) => m[1]));
const missing = lock.required.filter((name) => !declared.has(name));

if (missing.length) {
  console.error(
    `tokens: ${missing.join(', ')} ${missing.length === 1 ? 'is' : 'are'} required by ` +
    `site/tokens.lock.json but no longer declared in public/site/tokens.css.\n` +
    `If the rename is deliberate, update the sites that consume it and edit the lock ` +
    `in the same commit.`);
  process.exit(1);
}

const added = [...declared].filter((name) => !lock.required.includes(name));
console.log(
  `tokens: ${lock.required.length} required name${lock.required.length === 1 ? '' : 's'} present` +
  (added.length ? `, ${added.length} not yet locked (${added.join(', ')})` : ''));
