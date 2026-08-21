# tewf.github.io

Source for [tewf.github.io](https://tewf.github.io/), my personal site: the two research
internships, the projects, and what each of them measured.

Pages are generated from `content/` at build time and deployed by GitHub Actions. Nothing
is loaded from a CDN, no third-party code runs in the browser, and every dependency is
bundled from source. The charts are SVG drawn in
[`src/scripts/chart.js`](src/scripts/chart.js); the header, breadcrumb and footer are
rendered once in [`src/templates/chrome.js`](src/templates/chrome.js) so no page repeats
them and the site reads with JavaScript switched off.

## Layout

| Path | What it is |
|---|---|
| [`content/`](content/) | Every page's text, one file per page, all languages side by side |
| [`src/templates/`](src/templates/) | How a content file becomes a document |
| [`src/scripts/`](src/scripts/) | The hover preview and the charts |
| [`src/styles/`](src/styles/) | This site's stylesheet |
| [`public/site/`](public/site/) | Served verbatim: the shared tokens, the favicon, the thumbnails |
| [`tools/`](tools/) | The page generator and the token guard |

## Working on it

```sh
pnpm install
pnpm dev        # localhost:5173, regenerates on any edit under content/ or src/templates/
pnpm build      # -> dist/
pnpm preview    # serve dist/ exactly as GitHub Pages will
```

`.gen/` and `dist/` are build output and are not committed.

## The shared stylesheet

[`public/site/tokens.css`](public/site/tokens.css) is the one copy of the design tokens for
every site on this domain. It is served unhashed at `/site/tokens.css`, and because the
project sites are published at `tewf.github.io/<repo>/` they are same-origin and link it
directly instead of keeping copies that drift.

That makes a rename here able to restyle four live sites at once, so the names are pinned in
[`site/tokens.lock.json`](site/tokens.lock.json) and `pnpm build` fails if one goes missing.
Values may change freely. Removing or renaming a token means updating the sites that use it
in the same commit.

## The rule this site follows

Every figure names the file it came from, in the repository that produced it. If a number
appears here without a source, that is a bug.

The project sites it links to live in their own repositories:
[University-Coursework](https://tewf.github.io/University-Coursework/),
[after-hours](https://tewf.github.io/after-hours/),
[IA-Economie-Strategique](https://tewf.github.io/IA-Economie-Strategique/) and
[tensor-rank-toolkit](https://tewf.github.io/tensor-rank-toolkit/), which is where
the bilinear rank work continued after the internship repository was archived.
