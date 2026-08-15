/* Header, breadcrumb and footer, rendered once at build time.

   The old site fetched site/manifest.json and built these in the browser. Doing
   it here means the chrome is in the HTML: no fetch, no flash, and the page
   reads with JavaScript switched off rather than only mostly reading. */

const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

/** Every page whose path is a prefix of this one, shortest first. */
function trail (pages, page, lang) {
  return pages
    .filter((p) => page.path === p.path || page.path.startsWith(p.path))
    .sort((a, b) => a.path.length - b.path.length)
    .map((p) => ({ path: p.path, short: p[lang].short }));
}

function crumbs (pages, page, lang, base, label) {
  const items = trail(pages, page, lang).map((p, i, all) =>
    i === all.length - 1
      ? `<span aria-current="page">${p.short}</span>`
      : `<a href="/${base}${p.path}">${p.short}</a>`);
  return `<nav class="crumbs" aria-label="${attr(label)}">${items.join('<span class="sep">/</span>')}</nav>`;
}

export function header (site, pages, page, lang, base, alternate) {
  const t = site[lang];
  const languageLink = alternate
    ? `<a class="lang" href="${attr(alternate.href)}" hreflang="${attr(alternate.lang)}" lang="${attr(alternate.lang)}" rel="alternate">${t.otherLanguageName}</a>`
    : '';
  return `
<header class="site-head">
  <div class="wrap">
    <a class="brand" href="/${base}">${t.brand}</a>
    ${crumbs(pages, page, lang, base, t.breadcrumbLabel)}
    <div class="spacer"></div>
    ${languageLink}
    <a class="repo" href="${attr(site.profile)}">${t.profileLabel}</a>
  </div>
</header>`;
}

export function footer (site, lang) {
  const t = site[lang];
  return `
<footer class="site-foot">
  <div class="wrap">
    <p>${t.footerNote}<a href="${attr(site.repo)}">${t.footerLink}</a>.</p>
  </div>
</footer>`;
}
