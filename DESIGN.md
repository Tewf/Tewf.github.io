---
name: tewf.github.io
description: A board of real artifacts on a light ground under one soft iridescent field.
colors:
  paper: "#F7F7F9"
  surface: "#FFFFFF"
  raised: "#FFFFFF"
  sunken: "#EFEFF3"
  ink: "#101014"
  dim: "#55575F"
  muted: "#6A6D77"
  line: "#1010141F"
  correction: "#B23A1B"
  field-violet: "#CFC0FF"
  field-mint: "#BFEFDC"
  field-peach: "#FFD9C4"
  field-blue: "#C6DCFF"
  teal: "#3B2BFF"
  gold: "#9A6B00"
typography:
  display:
    fontFamily: "Archivo Variable, Archivo Metric, system-ui, sans-serif"
    fontSize: "clamp(3.2rem, 13vw, 10rem)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.05em"
    fontVariation: "'wdth' 118"
  headline:
    fontFamily: "Archivo Variable, Archivo Metric, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.5vw, 3.2rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Archivo Variable, Archivo Metric, system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 1.7vw, 1.35rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Archivo Variable, Archivo Metric, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  lede:
    fontFamily: "Archivo Variable, Archivo Metric, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.2vw, 1.1rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono Variable, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  figure:
    fontFamily: "JetBrains Mono Variable, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "0.92em"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "tabular-nums lining"
rounded:
  r: "20px"
  r-sm: "12px"
  pill: "999px"
spacing:
  gutter: "clamp(12px, 1.4vw, 20px)"
  card-gap: "clamp(10px, 1.2vw, 16px)"
  page-inline: "clamp(18px, 3.5vw, 40px)"
components:
  hero-pane:
    backgroundColor: "color-mix(in srgb, #FFFFFF 44%, transparent)"
    textColor: "{colors.ink}"
    rounded: "{rounded.r}"
    padding: "clamp(2.4rem, 6vw, 4.5rem) clamp(1.4rem, 4vw, 3rem) clamp(2rem, 4vw, 3rem)"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.72rem 1.4rem"
  button-secondary:
    backgroundColor: "color-mix(in srgb, #FFFFFF 75%, transparent)"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.72rem 1.4rem"
  button-secondary-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.72rem 1.4rem"
  pin:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.r}"
    padding: "0.85rem 0.95rem 1rem"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.r}"
    padding: "1.1rem 1.2rem"
  preview-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.r}"
    padding: "0.85rem"
  caveat:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.dim}"
    rounded: "{rounded.r}"
    padding: "1rem 1.15rem"
  site-header:
    backgroundColor: "color-mix(in srgb, #F7F7F9 70%, transparent)"
    textColor: "{colors.ink}"
    height: "58px"
    padding: "0 clamp(18px, 3.5vw, 40px)"
---

# Design System: tewf.github.io

## Overview

**Creative North Star: "The Evidence Board"**

Twelve real captures are pinned to a light wall under a single soft light. The
site owns exactly one piece of colour, an iridescent field fixed behind the page,
and it spends it entirely on the first viewport before fading out above the work.
Everything below that is white, ink and hairlines, because ten of the twelve pins
are figures rendered on white by four repositories this site does not build. A
surface that matches them is what stops the page fighting its own content.

The density is Pinterest, not portfolio: a four-column masonry board of unequal
tiles begins immediately under the opening pane, with no section heading, no
teaser copy and no table of contents between the name and the work. Chrome is
deliberately thin, a 58px sticky bar and a mono footer, and it recedes rather
than frames. The name is the only display-scale element on the site, set in
Archivo at up to 10rem, widened on its `wdth` axis and stacked one word per line.
Monospace appears only where the content is machine truth: captions, paths, table
headers, chart labels and figures.

The confirmed rejections are structural. Nothing sits above a heading, so there
are no kickers or eyebrow labels anywhere in the build. There is no dark scheme,
by decision rather than omission. And no component is allowed to be colourful on
its own account: an accent hue exists for exactly one purpose, marking a published
correction.

**Key Characteristics:**

- One iridescent field, masked out before the board; every component is white, ink and hairline.
- A four-column masonry board of real artifacts, animated pins sorted to the front.
- Hairlines and translucency instead of shadows, with a two-step shadow reserved for one component.
- Archivo at two axes: one family carries both the display name and the body text.
- Monospace strictly for labels, paths, captions and figures, never for prose.
- Light only, permanently, with a stated precondition for reconsidering it.

## Colors

A near-white ground and near-black ink, with all chromatic energy pooled into four
low-saturation stops that live behind the page rather than on it.

### Primary

- **Signal Ink** (`#101014`): the near-black that carries all body text, headings,
  the primary button fill, chart bars, the selection highlight and the focus ring.
  It is the only fill a component is allowed to be, other than white.

### Secondary

- **Field Violet** (`#CFC0FF`), **Field Peach** (`#FFD9C4`), **Field Blue**
  (`#C6DCFF`), **Field Mint** (`#BFEFDC`): four radial stops composited into one
  fixed layer behind the whole page, blurred 36px and saturated 1.12. They are
  strongest at the top where the name sits and are masked to transparent by 96%
  of a 128vh band, so they never reach the board. These four are the entire
  chromatic budget of the site.

### Tertiary

- **Correction Rust** (`#B23A1B`): the one non-field hue permitted on a component,
  used only on the heading of a published-correction panel. Its rarity is the
  point: it marks the site admitting something, and nothing else.

### Neutral

- **Page Ground** (`#F7F7F9`): the body ground, a hair cooler and darker than the
  pins so that white components separate from it without a border doing the work.
- **Component White** (`#FFFFFF`): every pin, card, panel and caveat. It exists to
  host figures rendered on white.
- **Contained Ground** (`#FFFFFF`): the ground behind a `object-fit: contain`
  figure in the preview shelf, distinct in role from component white even though
  it resolves to the same value.
- **Loading Ground** (`#EFEFF3`): the placeholder behind a pin image before it
  paints, and the only grey a picture is ever seen against.
- **Secondary Ink** (`#55575F`): lede sentences, card descriptions, caveat prose,
  and the border colour a hovered outline control steps up to.
- **Label Grey** (`#6A6D77`): pin captions, chart labels, table headers, meta
  lines and the footer. It clears 4.5:1 on both white and the ground (5.2:1 and
  4.9:1), which is the reason it is this light and no lighter.
- **Hairline** (`#1010141F`): a 12%-alpha ink used for every border, divider and
  table rule on the site.

### Legacy contract colours

- **Legacy Teal** (`#3B2BFF`) and **Legacy Gold** (`#9A6B00`): defined in the
  shared token file and pinned by `site/tokens.lock.json` because four sibling
  project sites on this origin speak that vocabulary. No selector in this site
  uses either. They are a compatibility surface, not part of this palette, and
  new work here must not reach for them.

### Named Rules

**The Field-Only Colour Rule.** Colour lives in the fixed field behind the page
and nowhere else. The field is masked to transparent before the board begins, so
no pin is ever read against a gradient. Components are white, ink and hairline;
if a surface needs to feel coloured, it becomes translucent and lets the field
through instead of tinting itself.

**The Correction Rule.** Correction Rust marks a published correction and nothing
else. It never becomes a link colour, a hover state, a brand accent or a chart
series.

**The No Dark Scheme Rule.** There is deliberately no dark scheme, and
`color-scheme: light` is declared so the browser cannot theme form controls and
scrollbars for a page the site never renders. Ten of the twelve board figures are
rendered on white by repositories this site does not build; inverting around them
produces twelve white slabs on black, which is the exact failure the light world
was chosen to avoid. A dark scheme becomes possible the day those figures are
re-rendered on dark grounds, and not before.

**The Shared Names Rule.** `public/site/tokens.css` is served unhashed at a stable
URL and linked across the origin by sibling sites. Its custom-property names are
an additive-only contract pinned in `site/tokens.lock.json`: values may change
freely and names may be added, but removing or renaming one has to happen in the
same commit as the lock file. The file holds custom properties only; anything with
a selector belongs in a site stylesheet where the bundler can hash it.

## Typography

**Display Font:** Archivo Variable (with `Archivo Metric`, then system-ui)
**Body Font:** Archivo Variable (the same stack; the roles differ by axis, not family)
**Label/Mono Font:** JetBrains Mono Variable (with ui-monospace, SF Mono, Menlo, Consolas)

**Character:** One widened grotesque doing two jobs, heavy and uppercase at
display scale and quiet at reading scale, against a monospace that appears only
when the text is a path, a label or a number. The pairing reads as a lab notebook
rather than a brochure: nothing is set in a display face whose only job is to look
technical.

### Hierarchy

- **Display** (800, `clamp(3.2rem, 13vw, 10rem)`, line-height 0.88, `wdth` 118,
  uppercase, -0.05em): the name on the home page only, stacked one word per line.
  The second line steps down to weight 500 and `wdth` 112 rather than to a grey,
  because a mid-grey word on white reads as disabled while a lighter cut of the
  same ink reads as deliberate and keeps both lines at full contrast.
- **Headline** (600, `clamp(2rem, 4.5vw, 3.2rem)`, line-height 1.05, -0.04em):
  the page title on every page except the home page.
- **Title** (600, `clamp(1.1rem, 1.7vw, 1.35rem)`, line-height 1.05, -0.04em):
  section headings, set with 3.5rem of space above and 1rem below so a section
  break is carried by space rather than by a rule.
- **Body** (400, 16px, line-height 1.55): prose, capped at a 68ch measure.
- **Lede** (400, `clamp(1rem, 1.2vw, 1.1rem)`, Secondary Ink): the one sentence
  under a title, capped at a tighter 56ch. On the home page it opens with the
  affiliation, because the course and the university are information the reader
  needs rather than a label announcing the name.
- **Label** (400, 0.72rem to 0.78rem, monospace, Label Grey): pin captions,
  breadcrumbs, card tags, meta lines, chart text and the footer. Table headers use
  the same role at weight 500.
- **Figure** (monospace, 0.92em, `tabular-nums lining`): any number that will be
  compared against another number, in prose or in a right-aligned table column.

### Named Rules

**The Mono-Is-For-Evidence Rule.** Monospace marks machine truth: a path, a file
name, a label, a caption, a figure, a table header. It never sets prose, a
heading, a button or a lede. If a monospace run is a sentence the reader is meant
to read for meaning, it is in the wrong face.

**The One Family, Two Axes Rule.** Display and body are the same Archivo stack.
Hierarchy comes from weight, the `wdth` axis and scale, never from introducing a
second sans. A new display face is a change to the world, not a styling choice.

**The Metric Fallback Rule.** The name is set at up to 160px, so the swap from a
fallback face is the most visible moment on a cold cache. `Archivo Metric` is a
local-only `@font-face` (Arial, Helvetica Neue, Liberation Sans) with
`size-adjust: 97%`, `ascent-override: 90%` and `descent-override: 22%`, so the
first paint is the same size and shape as the loaded face. Any new face that
carries the name inherits this obligation.

**The Nothing Above A Heading Rule.** No kicker, eyebrow, or category label sits
above a heading anywhere on the site. Information that wants that position goes
into the first sentence beneath the name instead. This is a divergence from the
build's own FIRST VIEWPORT line, which specified a mono course label above the
name; the label was deleted in the finish review and the affiliation now opens the
lede. There is no `.chip` rule in the stylesheet and no chip in the markup: the
code is the record.

## Layout

A single centred column, `max-width: 1440px`, with fluid inline padding
(`clamp(18px, 3.5vw, 40px)`). Vertical rhythm is carried by the type scale's own
margins rather than by a spacing scale; the reused spatial values are the board
gutter (`clamp(12px, 1.4vw, 20px)`, used both as column gap and as the gap between
stacked pins), the card grid gap (`clamp(10px, 1.2vw, 16px)`) and the page inline
padding.

The board is a CSS multi-column masonry (`columns: 4`) rather than a grid, so pins
keep their native aspect ratios and the column heights fall where they fall. It
steps down at four widths: four columns above 1180px, three to 1180px, two to
820px, one to 460px. The preview shelf reflows from a single row to a two-column
grid at 640px, and drops its sticky positioning entirely where there is no hover
(`@media (hover: none)`).

Cards use an auto-filling grid with a 280px minimum track. Prose is capped at 68ch
and lede text at 56ch. The header is sticky at the top with a 58px minimum height;
the preview panel on project pages is sticky 70px below it, clearing the header.

### Named Rules

**The Work Starts Immediately Rule.** The board begins directly under the opening
pane, with no section heading and no intervening copy. Nothing may be inserted
between the first viewport and the first artifact.

**The Motion-First Fill Rule.** Pins are flattened across all projects and sorted
so that animated ones lead, rather than being grouped by project. A column-filled
masonry lays out column by column, so grouping by project buries three of the four
loops at the bottom of a column the first screen never reaches.

*Known trade-off:* the flat motion-first sort under a four-column fill puts the
three heaviest images in column one, so the board reads left-loud. This was
weighed and accepted in the finish review; leading with motion won over even
visual weight.

## Elevation & Depth

The system is essentially flat and separates surfaces with a 1px hairline
(`#1010141F`) plus translucency. Three surfaces are translucent over the field and
use `backdrop-filter: blur()` to stay legible: the hero pane (44% white, blur 22px,
saturate 1.2), the sticky header (70% ground, blur 18px) and the secondary button
(75% white). Depth here is atmospheric, not cast.

Exactly one component carries a shadow, and it is the one component the visitor is
meant to want to touch.

### Shadow Vocabulary

- **Pin rest** (`box-shadow: 0 1px 2px #1010140A, 0 10px 26px -18px #10101433`):
  a contact shadow plus a wide, heavily negative-spread ambient. Applies only to a
  board pin at rest.
- **Pin lift** (`box-shadow: 0 2px 6px #1010140F, 0 26px 50px -24px #1010143D`):
  the same two layers grown, paired with a 6px rise, on hover and focus-visible.

### Named Rules

**The Hairline-First Rule.** A new surface separates itself with a 1px hairline
and, if it sits over the field, with translucency. It does not reach for a shadow.
Shadows on this site are a property of the board pin, not a global elevation
scale.

**The Lift Ladder Rule.** Rise on hover scales with the size of the thing lifted:
a button rises 2px, a card 4px, a pin 6px. All three use the same
`cubic-bezier(.16, 1, .3, 1)` ease over 0.28s to 0.34s. A larger lift on a smaller
element reads as a glitch.

## Shapes

Two radii and a pill. Panels, pins, cards, the hero pane and the caveat all use a
large soft 20px corner; contained figures inside the preview shelf and the focus
ring use 12px; anything you can act on that is not a card is fully rounded
(`999px`), which covers the two hero actions and the repository chip in the header.
Scrollbar thumbs are fully rounded with a 3px ground-coloured border so they read
as floating in the track.

Borders are always a single hairline, never a heavier stroke, and never a colour
other than the hairline token except when a hovered outline control steps its
border up to Secondary Ink. Nothing is clipped to a non-rectangular silhouette;
the only masking in the system is the linear gradient that fades the field out
above the board.

### Named Rules

**The Two Radii and a Pill Rule.** 20px for surfaces, 12px for figures nested
inside a surface, 999px for actions. A new radius value is a new shape language
and needs a reason.

## Components

### Buttons

- **Shape:** fully rounded pill (`999px`), 0.72rem by 1.4rem of padding, 0.92rem
  at weight 550.
- **Primary:** ink fill, ground-coloured text, ink border. One per viewport.
- **Secondary:** translucent white (75%) over the field with a hairline border and
  ink text.
- **Hover / Focus:** both rise 2px over 0.28s on `cubic-bezier(.16, 1, .3, 1)`.
  The secondary additionally goes fully opaque white and steps its border up to
  Secondary Ink. The primary's fill does not change; the rise is the whole
  feedback.

### Cards

- **Corner Style:** 20px.
- **Background:** component white on the page ground.
- **Shadow Strategy:** none. A hairline border does the separation.
- **Border:** 1px hairline, stepping to Secondary Ink on hover.
- **Internal Padding:** 1.1rem by 1.2rem.
- **Contents:** a monospace tag in Label Grey, a title at weight 620 with -0.02em
  tracking, and a description in Secondary Ink at 0.91rem. Cards rise 4px on hover
  and can drive the preview panel through a `data-preview` key.

### Navigation

- **Style:** sticky top bar, 70% translucent page ground with an 18px backdrop
  blur and a hairline bottom border, 58px minimum height, wrapping on narrow
  widths.
- **Typography:** the wordmark at weight 700, `wdth` 110, -0.03em. Breadcrumbs,
  language links and the repository link are monospace at 0.78rem in Label Grey.
- **States:** breadcrumb and language links go from Label Grey to ink on hover;
  the repository link is a pill with a hairline border that steps to Secondary Ink
  and fills with white.
- **Footer:** entirely monospace at 0.84rem in Label Grey above a hairline top
  border, because it carries a source link rather than prose.

### Board Pin (signature)

The site's defining component: a white card in a masonry column whose entire top
is a real artifact from a real project, with a two-line face underneath.

- **Structure:** the whole pin is one link. Image at full bleed on a Loading
  Ground placeholder, then a face with a 0.9rem weight-550 description and a
  0.72rem monospace project name in Label Grey.
- **Shape and colour:** 20px radius with `overflow: hidden`, white, hairline
  border, the two-step pin shadow.
- **States:** rises 6px into the pin-lift shadow on hover and focus-visible,
  gated behind both `(hover: hover)` and `prefers-reduced-motion: no-preference`.
- **Loading:** the first four pins are `loading="eager"`, the rest lazy; all are
  `decoding="async"`.

**The Stills-First Rule.** The markup ships the still and carries the animation in
`data-motion`; the entry script swaps the source only when
`prefers-reduced-motion: no-preference` matches. Shipping it the other way meant
an animated WebP that kept looping under `prefers-reduced-motion: reduce`, because
no CSS rule stops an animated image playing. Two consequences are accepted
honestly: with JavaScript off the board is twelve stills rather than twelve moving
things, and each of the four motion pins fetches twice, the still and then the
animation.

**The Alt-Empty Pin Rule.** A pin image carries `alt=""` because the description
it would announce is the visible caption immediately below it, inside the same
link. Repeating it would make a screen reader say the whole pin twice. This rule
holds only while the caption lives inside the link; a decorative-only pin without
a caption would need real alt text.

### Preview Panel

A sticky panel above a list of project cards that fills with what is actually
inside whatever the pointer or keyboard focus is on.

- **Style:** white, hairline border, 20px radius, 0.85rem padding, sticky 70px
  from the top, with a 152px minimum frame.
- **Shelf:** images in equal auto-flow columns, `object-fit: contain` on a
  Contained Ground with a 12px radius, a hairline border and 4px of padding.
  Contain, not cover: most of these are charts, and cropping one turns a result
  into wallpaper.
- **States:** at rest the shelf is at 50% opacity and half saturation with the
  caption at 75%, so the resting montage reads as a placeholder; on hover or focus
  it goes to full strength. A `head` variant, used as a project's own header, is
  static and always at full strength.
- **Motion:** the shelf enters with a 0.3s fade and 4px rise.
- **Input:** focus does everything hover does, so a keyboard reaches the same
  previews. Where there is no hover, the panel un-sticks and the cards behave as
  ordinary links.

### Caveat

The published-correction panel, and the only component that carries a hue.

- **Style:** white, hairline border, 20px radius, 1rem by 1.15rem padding, capped
  at the 68ch measure.
- **Typography:** a 0.97rem heading in Correction Rust over 0.94rem prose in
  Secondary Ink.

### Charts

Hand-drawn inline SVG, no library and no CDN, with all colours inherited from the
custom properties so a chart cannot drift from the page.

- **Text:** monospace at 11px in Label Grey; a highlighted value switches to ink.
- **Bars:** ink for the primary series, Label Grey for the secondary; gridlines
  are the hairline token at 1px.
- **Behaviour:** `preserveAspectRatio` with `overflow: visible`, full-width and
  auto-height, so a chart scales with its column instead of scrolling.

### Browser-Owned Surfaces

The system explicitly themes what a browser would otherwise style itself:
selection is ink on ground (inverted), the focus ring is a 2px ink outline offset
3px with a 12px radius, scrollbars are thin with a hairline thumb on a transparent
track that steps to Label Grey on hover, and the caret is ink. Smooth scrolling is
declared and then revoked under reduced motion.

## Do's and Don'ts

### Do:

- **Do** put every new surface on white (`#FFFFFF`) with a 1px hairline
  (`#1010141F`) and a 20px radius, on the `#F7F7F9` ground.
- **Do** let a surface that sits over the field be translucent with a backdrop
  blur rather than tinted, so the field shows through instead of being covered.
- **Do** reserve monospace for labels, paths, captions, table headers and figures,
  and set every number that will be compared with `tabular-nums lining`.
- **Do** scale hover rise with element size: 2px for a button, 4px for a card, 6px
  for a pin, all on `cubic-bezier(.16, 1, .3, 1)`.
- **Do** gate motion behind both `(hover: hover)` and
  `prefers-reduced-motion: no-preference`, and handle animated image formats in
  JavaScript, because no CSS rule stops an animated image looping.
- **Do** give focus everything hover has: `:focus-visible` shares every hover rule
  on the pin, and focus drives the preview panel exactly as the pointer does.
- **Do** add token names to `public/site/tokens.css` freely, and change values
  freely, but treat removal or renaming as a contract break that must land in the
  same commit as `site/tokens.lock.json`.
- **Do** keep the shared token file selector-free; anything with a selector belongs
  in a site stylesheet the bundler can hash.

### Don't:

- **Don't** put a kicker, eyebrow, or category label above a heading. Put that
  information in the first sentence beneath it.
- **Don't** add a dark scheme until the board's figures are re-rendered on dark
  grounds. Inverting the page around figures drawn on white is the failure this
  world was chosen to avoid.
- **Don't** give a component a colour of its own. Colour is the field's, and the
  field stops above the board.
- **Don't** use Correction Rust (`#B23A1B`) for anything but a published
  correction, and never as a link, hover, brand or chart colour.
- **Don't** reach for `--teal` or `--gold`; they exist only so four sibling
  project sites can migrate one at a time.
- **Don't** add a shadow to a new component. Hairline plus translucency is the
  depth model; the two-step shadow belongs to the board pin.
- **Don't** introduce a second sans-serif or a display-only face. Hierarchy comes
  from Archivo's weight and `wdth` axes.
- **Don't** set prose, headings, buttons or ledes in monospace.
- **Don't** crop a figure to fill a frame. Charts are contained on their own
  ground, never covered, because cropping a result turns it into wallpaper.
- **Don't** load anything from a CDN or let third-party code run in the browser;
  charts are hand-drawn SVG and every dependency is bundled from source.
