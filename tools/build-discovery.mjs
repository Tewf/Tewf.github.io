/* content/ -> dist/sitemap.xml and dist/robots.txt.

   The sitemap is generated rather than written by hand for the same reason the
   pages are: it has to name every page in every language it actually exists in,
   and a hand-kept list goes stale the first time a page is added. Each entry
   carries the alternates for its own page, which is what tells a crawler the
   English and French URLs are one document rather than two competing ones. */

import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { languageBase } from '../src/templates/links.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = join(ROOT, 'content');

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

/** Every language a page exists in, as absolute URLs on this origin. */
function urlsFor (site, page) {
  return site.languages
    .filter((lang) => page[lang])
    .map((lang) => ({ lang, url: `${site.origin}/${languageBase(lang, site.defaultLanguage)}${page.path}` }));
}

function sitemap (site, pages) {
  const entries = pages.flatMap((page) => {
    const urls = urlsFor(site, page);
    const defaultUrl = urls.find((u) => u.lang === site.defaultLanguage) ?? urls[0];
    const alternates = [...urls.map((u) => ({ hreflang: u.lang, href: u.url })),
                        { hreflang: 'x-default', href: defaultUrl.url }];
    return urls.map(({ url }) => [
      '  <url>',
      `    <loc>${escape(url)}</loc>`,
      ...alternates.map((a) =>
        `    <xhtml:link rel="alternate" hreflang="${escape(a.hreflang)}" href="${escape(a.href)}"/>`),
      '  </url>',
    ].join('\n'));
  });

  return ['<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
          '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
          ...entries, '</urlset>', ''].join('\n');
}

const robots = (site) => `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`;

export async function buildDiscovery ({ out, pages, site }) {
  await writeFile(join(out, 'sitemap.xml'), sitemap(site, pages));
  await writeFile(join(out, 'robots.txt'), robots(site));
  return { urls: pages.reduce((n, page) => n + urlsFor(site, page).length, 0) };
}

/** The same page list build-pages.mjs works from, for callers that lack one. */
export async function readContent () {
  const site = JSON.parse(await readFile(join(CONTENT, 'site.json'), 'utf8'));
  const { jsonFiles } = await import('./build-pages.mjs');
  const files = await jsonFiles(join(CONTENT, 'pages'));
  const pages = await Promise.all(files.map(async (f) => JSON.parse(await readFile(f, 'utf8'))));
  pages.sort((a, b) => a.path.localeCompare(b.path));
  return { site, pages };
}
