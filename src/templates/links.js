/* Internal hrefs in content/ are written site-relative from the root
   ("research/strategic-pricing/"), never relative to the page that holds them.
   That is what lets the same block render at "/research/..." in English and
   "/fr/research/..." in French without the content knowing which it is. */

const EXTERNAL = /^(https?:|mailto:|tel:|#|\/\/|\/)/;

/** "" for the default language, "fr/" for the others. */
export function languageBase (lang, defaultLanguage) {
  return lang === defaultLanguage ? '' : `${lang}/`;
}

/** A content href turned into an absolute path on this origin. */
export function resolve (href, base) {
  if (EXTERNAL.test(href)) return href;
  return `/${base}${href}`;
}

/** The same, applied to every href inside a fragment of authored HTML. */
export function resolveInHtml (html, base) {
  return html.replace(/href="([^"]*)"/g, (whole, href) =>
    EXTERNAL.test(href) ? whole : `href="/${base}${href}"`);
}
