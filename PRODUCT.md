# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

No single primary audience, confirmed by Mohamed rather than assumed. Three groups
are addressed at once, in this order of frequency:

1. **M2 research internship supervisors** at Grenoble labs (LJK, GAEL, ORCO) and
   elsewhere, deciding whether to take him for a research internship. They arrive
   from an email or an application, want to know whether the two internships were
   real work, and whether he can be trusted with an open problem.
2. **Technical recruiters and engineers**, skimming for stack, shipped artifacts
   and measurable outcomes.
3. **PhD admissions and academic panels**, reading for research direction and
   whether the work is honest.

The visit is short and evaluative in all three cases. Nobody arrives to browse.

*Consequence Mohamed accepted when choosing this:* designing for the union means
the first viewport is not addressed to one named reader, so the work itself has to
carry it rather than a positioning line aimed at a specific audience.

## Product Purpose

A personal site at `tewf.github.io` that is the front door to five separately
published project sites on the same origin. It exists so that a stranger deciding
whether to work with Mohamed can verify the claims themselves in a few minutes.
Success is a supervisor or recruiter reaching a decision without needing to ask
him for evidence.

## Positioning

The mechanism a neighbouring student portfolio could not truthfully copy: **every
number on the site names the file, in the repository, that produced it**, and the
repositories are public and reproduce those numbers in CI. The site is auditable
rather than asserted.

The second, rarer half: **the failures are published on purpose.** An error found
in his own equilibrium analysis after the internship ended, a solver step measured
to be nearly inert, a training run that never scored. These are on the site as
results, not omissions.

## Operating Context

- One origin, six sites. `tewf.github.io/` is this product. `after-hours`,
  `University-Coursework`, `IA-Economie-Strategique`, `tensor-rank-toolkit` and
  `bilinear-tensor-optimization` are separate repositories publishing their own
  sites at `tewf.github.io/<repo>/`. This site writes a page *about* several of
  them and links out; it never duplicates their content.
  `/bilinear-tensor-optimization/` publishes the 2024 internship as it was
  submitted, kept as an archive now that the bilinear rank work continues in
  `tensor-rank-toolkit`. One path resolves to nothing and stays reserved anyway,
  because that repository can switch Pages back on: `/shots/`, private as of
  August 2026.
- Project thumbnails are loaded from each project's own published site, so the
  pictures on this site cannot drift from the work they depict.
- The reader is often on a laptop, mid-triage, with the tab open beside an email or
  an application form.

## Capabilities and Constraints

- Nine pages: home, `research/` and three research pages, `work/` and two work
  pages, `contact/`. **This said eight until 2026-08-24, and the decision it
  recorded was reversed rather than quietly outgrown.** What stood here was that
  the eight stay as they are and that `tensor-rank-toolkit` needed no page of its
  own, since it was already described inside the bilinear page and carried one
  card. Mohamed reversed it: the toolkit is independent work of his own, at
  v0.4.1, and appearing only as two paragraphs inside the page about the
  internship that preceded it says the wrong thing about whose work it is. The
  ninth page is `research/tensor-rank-toolkit/`, and the bilinear page was cut
  back to a pointer wherever the two would otherwise have said the same thing,
  so the page count grew without the site repeating itself. Odophone, the
  playable game `shots`, and `backend-systems` were each offered and declined and
  stay declined; `shots` is moot while it is private.
- Static. Content lives in `content/`, is rendered by `tools/build-pages.mjs`
  through `src/templates/`, built by Vite, deployed by GitHub Actions.
- **Nothing may be loaded from a CDN**, and no third-party code may run in the
  browser. Every dependency is bundled from source.
- Bilingual EN/FR, both written. Every page carries both languages, and the build
  fails on a page missing one. `ALLOW_MISSING_TRANSLATIONS` remains as an env var
  for a translation in progress; nothing sets it by default, which is the whole
  point of it.
- `public/site/tokens.css` is served unhashed at a stable URL because four sibling
  project sites will link it across the origin. Its custom-property names are a
  contract pinned in `site/tokens.lock.json`.
- Never emit a page at a top-level path a project site owns (`/after-hours/`,
  `/University-Coursework/`, `/IA-Economie-Strategique/`,
  `/tensor-rank-toolkit/`, `/bilinear-tensor-optimization/`, `/shots/`);
  project sites win on this origin.

## Brand Commitments

- Name: **Mohamed Ali Tewfik Hamlil**, published as *Mohamed Hamlil*. GitHub `Tewf`.
- **No em dashes in prose.** House style, stated 2026-08-15.
- Odophone's identity (Fraunces + Inter, the copper and vellum palette, the
  wordmark) belongs to the venture, not to this site, and its figurative mark is
  not yet filed. Those assets stay out.
- The existing line "I count what things cost, then try to make them cost less" is
  his and is good; it is available to the redesign, not mandatory.

## Evidence on Hand

Real, verifiable, and already published:

- **Bilinear map rank** (LJK, supervised by Jean-Guillaume Dumas, then continued
  alone as `tensor-rank-toolkit`): the descent takes 5x5 polynomial multiplication
  over GF(2) from 25 multiplications to 14, 3x8 24 to 15, 4x7 28 to 16 and F3 3x6
  18 to **10**, source `descent_search/results.json` and `fixtures/README.md`.
  Four maps are then settled *exactly* by exhaustion: 2x2 matrix multiplication
  at **7**, GF(16) over GF(2) at **9**, F2 5x5 at **13** and F3 3x6 at **10**,
  the last two matching values published in 2012. Sources
  `famous_tensors/decided-exactly.md` and `incumbent_search/what-it-reaches.md`.
  Two published values are *not* reached, and the page says so. C++20 on Givaro,
  CI reproduces every count.
- **Strategic pricing** (GAEL, supervised by Alexis Garapin and Olivier Bonroy):
  a survey, an imitation model, and a correction to the equilibrium analysis of the
  Prolog course project entered alongside it. The submitted strategy beats Nash
  3.5552 to 3.1521 head to head, while simply playing Nash earns 3.8889.
- **Battleship AI**: heatmap targeting wins 74.3%, clears in 54.8 shots against
  94.3 for random. Source `Results/performance_summary.csv`.
- **Grenoble housing prices**: random forest cuts error from EUR 265,214 to
  EUR 58,750. Source `ProjetEconometrie/results.json`.
- **Flappy Bird CNN**: switching the observed colour channel moved the agent from
  0.4 pipes to 12.65 at 250k steps, everything else held fixed. Source
  `Flappy_Bird_CNN/results/dqn.log`.
- **Perfume satisfaction**: four classifiers, best AUC 0.693, all between 0.65 and
  0.69, reported as the honest finding.
- Moving imagery that already exists: a Flappy Bird agent playing, a Battleship
  probability grid solving, bubble sort keyframed in Blender, a tournament
  leaderboard, ROC curves, a correlation matrix.

Absent, and not to be invented: no testimonials, no publications, no employers, no
stars, no traffic figures, no awards. Nothing may be fabricated to fill a layout.

## Product Principles

1. **Auditable, not asserted.** Every number names the file that produced it. A
   number without a source is a bug.
2. **Publish what did not work.** Corrections, inert steps and failed runs are
   results and stay visible.
3. **Claims stay the size of the evidence.** A heuristic is called a heuristic; a
   study that did not settle its question says so; coursework is not called research.
4. **The work is the interface.** The visitor came to evaluate artifacts, so the
   artifacts lead and the chrome recedes.
5. **One origin, one place.** Moving between the front door and any project site
   should feel like one site, which is why the tokens are shared rather than copied.

## Accessibility & Inclusion

No formal standard was established as a requirement. Product-specific needs that
already exist in the implementation and must survive: reduced-motion fallbacks for
every animated thumbnail, keyboard focus reaching the same previews that hover
does, and the site remaining readable with JavaScript switched off.
