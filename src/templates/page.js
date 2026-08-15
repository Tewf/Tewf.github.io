/* One page, in one language: chrome around rendered blocks, inside the shell. */

import { document } from './document.js';
import { header, footer } from './chrome.js';
import { renderBlocks } from './blocks.js';
import { languageBase } from './links.js';

/** Every language this page exists in, default language first. */
function translations (site, page) {
  return site.languages
    .filter((l) => page[l])
    .sort((a, b) => (a === site.defaultLanguage ? -1 : b === site.defaultLanguage ? 1 : 0))
    .map((l) => ({ lang: l, path: `/${languageBase(l, site.defaultLanguage)}${page.path}` }));
}

export function renderPage ({ site, pages, page, lang }) {
  const base = languageBase(lang, site.defaultLanguage);
  const content = page[lang];
  const links = translations(site, page);

  const other = links.find((l) => l.lang !== lang);
  const alternate = other && { lang: other.lang, href: other.path };

  const body = [
    header(site, pages, page, lang, base, alternate),
    `<main class="wrap">\n${renderBlocks(content.blocks, { base, lang })}\n</main>`,
    footer(site, lang),
  ].join('\n');

  return document({
    site,
    lang,
    title: content.title,
    description: content.description,
    canonical: `/${base}${page.path}`,
    links,
    body,
  });
}
