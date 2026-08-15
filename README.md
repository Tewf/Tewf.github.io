# tewf.github.io

Source for [tewf.github.io](https://tewf.github.io/), my personal site: the two research
internships, the projects, and what each of them measured.

Static files served straight from `main`. No build step, no framework, no third-party
script, and nothing loaded from a CDN. The charts are SVG drawn in
[`site/chart.js`](site/chart.js); the header, breadcrumb and footer come from
[`site/manifest.json`](site/manifest.json) so no page repeats them.

## Layout

| Path | What it is |
|---|---|
| [`index.html`](index.html) | The landing page, with the measured changes |
| [`research/`](research/) | The LJK and GAEL internships, one page each |
| [`work/`](work/) | after-hours, the coursework, and the game |
| [`contact/`](contact/) | How to reach me |
| [`site/`](site/) | Stylesheet, nav, charts, favicon |

## The rule this site follows

Every figure names the file it came from, in the repository that produced it. If a number
appears here without a source, that is a bug.

The project sites it links to live in their own repositories:
[University-Coursework](https://tewf.github.io/University-Coursework/),
[after-hours](https://tewf.github.io/after-hours/) and
[IA-Economie-Strategique](https://tewf.github.io/IA-Economie-Strategique/).
