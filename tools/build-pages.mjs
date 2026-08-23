/* content/ -> .gen/**\/index.html, one file per page per language.

   Run by vite.config.js on every build and on every content edit in dev, so
   .gen is disposable and gitignored. */

import { readdir, readFile, mkdir, writeFile, rm } from 'node:fs/promises';
import { dirname, join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPage } from '../src/templates/page.js';
import { languageBase } from '../src/templates/links.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = join(ROOT, 'content');

/* Project sites published from sibling repositories are served at these paths
   on this same origin, and they win over anything the root site emits. A page
   generated here at one of them would be silently unreachable.

   `bilinear-tensor-optimization` publishes the 2024 internship as it was
   submitted and owns its path like any other project site, while the bilinear
   work itself continues as `tensor-rank-toolkit`. `shots` went private in
   August 2026 and currently serves nothing; its path stays reserved anyway,
   because that repository can turn Pages back on without this build hearing
   about it. */
const OWNED_BY_PROJECT_SITES = new Set([
  'after-hours', 'University-Coursework', 'IA-Economie-Strategique',
  'tensor-rank-toolkit', 'bilinear-tensor-optimization', 'shots',
]);

export async function jsonFiles (dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await jsonFiles(path));
    else if (entry.name.endsWith('.json')) out.push(path);
  }
  return out.sort();
}

function assertPathIsServable (page) {
  const first = page.path.split('/')[0];
  if (OWNED_BY_PROJECT_SITES.has(first)) {
    throw new Error(
      `content page "${page.path}" starts with "${first}/", which is served by ` +
      `the ${first} project site on this origin and would never be reachable.`);
  }
}

/* `{"$shared": "key"}` anywhere in a page becomes `page.shared[key]`.

   Language-independent data would otherwise be typed once per language. The
   knapsack trace on the after-hours page is two kilobytes of it, and storing
   the same twenty-five events under `en` and again under `fr` means a
   regenerated trace has to be pasted into two places or the two pages quietly
   replay different runs. Prose is translated and belongs per language; a run
   is not, and does not. */
function resolveShared (value, shared, where) {
  if (Array.isArray(value)) return value.map((item) => resolveShared(item, shared, where));
  if (value && typeof value === 'object') {
    if (typeof value.$shared === 'string') {
      if (!(value.$shared in shared)) {
        throw new Error(`content page "${where}" refers to shared "${value.$shared}", ` +
                        `which its "shared" block does not define.`);
      }
      return resolveShared(shared[value.$shared], shared, where);
    }
    return Object.fromEntries(Object.entries(value)
      .map(([key, item]) => [key, resolveShared(item, shared, where)]));
  }
  return value;
}

export async function buildPages ({ out, strict = true } = {}) {
  const site = JSON.parse(await readFile(join(CONTENT, 'site.json'), 'utf8'));
  const files = await jsonFiles(join(CONTENT, 'pages'));
  const pages = await Promise.all(files.map(async (f) => JSON.parse(await readFile(f, 'utf8'))));

  pages.sort((a, b) => a.path.localeCompare(b.path));
  pages.forEach(assertPathIsServable);
  for (const page of pages) {
    if (!page.shared) continue;
    for (const key of Object.keys(page)) {
      if (key === 'shared' || key === 'path') continue;
      page[key] = resolveShared(page[key], page.shared, page.path);
    }
  }

  for (const page of pages) {
    if (!page[site.defaultLanguage]) {
      throw new Error(`content page "${page.path}" has no ${site.defaultLanguage} content.`);
    }
    const missing = site.languages.filter((l) => !page[l]);
    if (missing.length && strict) {
      throw new Error(
        `content page "${page.path}" is missing ${missing.join(', ')}. ` +
        `Translate it, or pass --allow-missing-translations while it is in progress.`);
    }
  }

  await rm(out, { recursive: true, force: true });

  let written = 0;
  for (const page of pages) {
    for (const lang of site.languages.filter((l) => page[l])) {
      const dir = join(out, languageBase(lang, site.defaultLanguage), page.path);
      await mkdir(dir, { recursive: true });
      await writeFile(join(dir, 'index.html'), renderPage({ site, pages, page, lang }));
      written += 1;
    }
  }
  return { written, pages: pages.length };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const out = join(ROOT, '.gen');
  const strict = !process.argv.includes('--allow-missing-translations');
  const { written, pages } = await buildPages({ out, strict });
  console.log(`build-pages: ${written} documents from ${pages} pages -> ${relative(ROOT, out)}/`);
}
