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
<!--
THESIS: A board of what the work actually looks like. It refuses the pitch line
and the table of figures: the artifacts are the argument, so pictures lead and
prose gets out of the way.
OWN-WORLD: Light ground under one soft iridescent field, which is the only
colour the site owns; white pins, hairline borders, pill chrome, and monospace
reserved for labels and paths. The name is Archivo widened and heavy. Ten of the
twelve pins are figures on white, and the white surface exists to host them.
STORY: A visitor sees a dozen real things running, recognises the range, opens
the one that interests them, and finds the numbers on the project's own page.
FIRST VIEWPORT: A translucent pane on the field: mono course label, the name
across two lines at display scale, one sentence, two pill actions. Immediately
beneath, the board of twelve pins, the animated ones first.
FORM: Pinterest board in the light reference's world, both pinned by the brief
over the dealt hand; seed key eca17f8c.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->
${body}
<script type="module" src="/src/main.js"></script>
</body>
</html>
`;
}
