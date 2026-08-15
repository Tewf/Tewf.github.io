/* The HTML shell. Everything here is per-document: language, title, the link
   relations that tell a crawler which pages are translations of each other, and
   the two stylesheets.

   The stylesheets are linked separately on purpose. site/tokens.css is copied
   verbatim out of public/ and keeps a stable, unhashed URL because four sibling
   project sites link to it across the origin; everything else goes through the
   bundler and is hashed. Importing one into the other would either hash the
   shared file or add a render-blocking waterfall. */

const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function alternates (origin, links) {
  return links.map(({ lang, path }) =>
    `<link rel="alternate" hreflang="${attr(lang)}" href="${attr(origin + path)}">`).join('\n');
}

export function document ({ site, lang, title, description, canonical, links, body }) {
  const hreflang = links.length > 1
    ? `${alternates(site.origin, links)}
<link rel="alternate" hreflang="x-default" href="${attr(site.origin + links[0].path)}">`
    : '';

  return `<!doctype html>
<html lang="${attr(lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${attr(description)}">
<link rel="canonical" href="${attr(site.origin + canonical)}">
${hreflang}
<link rel="icon" href="/site/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/site/tokens.css">
<link rel="stylesheet" href="/src/styles/style.css">
</head>
<body>
${body}
<script type="module" src="/src/main.js"></script>
</body>
</html>
`;
}
