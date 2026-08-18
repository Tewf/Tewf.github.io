/* One renderer per content block type. Each returns a fragment of HTML and
   knows nothing about the page around it.

   The two interactive pieces, the hover preview and the charts, are emitted as
   plain markup carrying their configuration in data attributes; src/main.js
   finds them and mounts them. No page carries an inline script. */

import { resolve, resolveInHtml } from './links.js';
import { SETS, text } from '../scripts/previews.js';

const attr = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* The opening. `lines` sets the name at display scale, one line each, the way
   the reference does; without it the title is an ordinary heading, which is what
   every page except the home page wants.

   Nothing sits above the heading. The course and the university are real
   information the audience needs, so they are the first sentence underneath
   rather than a label announcing the name. */
const hero = (b, ctx) => `
  <section class="hero">
    ${b.lines
      ? `<h1 class="stacked">${b.lines.map((line, i) =>
          `<span class="line${i ? ' dim' : ''}">${line}</span>`).join('')}</h1>`
      : `<h1>${b.title}</h1>`}
    <p class="lede">${b.lede}</p>
    ${b.actions ? `<p class="actions">${b.actions.map((a, i) =>
      `<a class="btn${i ? '' : ' primary'}" href="${attr(resolve(a.href, ctx.base))}">${a.label}</a>`).join('')}</p>` : ''}
  </section>`;

// mode "head": the panel is this project's own header, static and at full
// strength. mode "chooser": it sits above a list and previews whatever is
// pointed at, so it rests on the site-wide montage.
const preview = (b) => `
  <div class="preview${b.mode === 'head' ? ' head' : ''}" data-state="rest"
       data-preview-panel${b.key ? ` data-preview-rest="${attr(b.key)}"` : ''}>
    <div class="pv-frame"></div>
    <p class="pv-cap"></p>
  </div>`;

const cards = (b, ctx) => `
  <div class="cards">${b.items.map((c) => `
    <a class="card" href="${attr(resolve(c.href, ctx.base))}"${c.preview ? ` data-preview="${attr(c.preview)}"` : ''}>
      <span class="tag">${c.tag}</span>
      <span class="t">${c.title}</span>
      <span class="d">${c.desc}</span>
    </a>`).join('')}
  </div>`;

const figure = (b) => `
  <figure>
    <div class="chart" data-chart="${attr(JSON.stringify(b.chart))}"></div>
    <figcaption>${b.caption}</figcaption>
  </figure>`;

const caveat = (b) => `
  <div class="caveat">
    <h3>${b.title}</h3>
    <p>${b.html}</p>
  </div>`;

/* The board. Pins come from src/scripts/previews.js, which is the one list of
   what each project shows, so the board and the hover previews cannot disagree.
   Most pins are served from the project's own published site, which is what
   keeps a picture here from outliving the work it depicts.

   A loop of the agent actually playing says more than any still, so the animated
   pins lead the board. The markup ships the *still* and carries the animation in
   `data-motion`; src/main.js upgrades it only when the visitor has not asked for
   reduced motion. Shipping it the other way round meant an animated WebP that
   kept looping under `prefers-reduced-motion: reduce`, because no CSS rule stops
   an animated image playing. The side effect is the honest one: with JavaScript
   off the board is twelve stills rather than twelve moving things.

   The image carries `alt=""` because the description it would have announced is
   the visible caption right under it, inside the same link. Repeating it would
   make a screen reader say the whole thing twice per pin. */
const board = (b, ctx) => {
  const asset = (s) => (s.startsWith('http') ? s : '/site/' + s);

  // Moving first, across projects rather than within them: the board is filled
  // column by column, so grouping by project buries three of the four loops at
  // the bottom of a column where the first screen never reaches them. After
  // those, `lead` from previews.js decides which stills earn the top.
  const rank = (pin) => (pin.still ? 0 : 1);
  const pins = b.projects
    .flatMap((p) => (SETS[p.key]?.images ?? []).map((image) => ({ ...image, project: p })))
    .sort((one, other) =>
      rank(one) - rank(other) || (one.lead ?? Infinity) - (other.lead ?? Infinity));

  return `
  <ul class="board" id="board">${pins.map((pin, i) => `
    <li class="pin">
      <a href="${attr(resolve(pin.project.href, ctx.base))}">
        <img src="${attr(asset(pin.still ?? pin.src))}"
             ${pin.still ? `data-motion="${attr(asset(pin.src))}"` : ''}
             alt="" loading="${i < 4 ? 'eager' : 'lazy'}" decoding="async">
        <span class="pin-face">
          <span class="pin-what">${text(pin.alt, ctx.lang)}</span>
          ${pin.result ? `<span class="pin-result">${text(pin.result, ctx.lang)}</span>` : ''}
          <span class="pin-where">${pin.project.title}</span>
        </span>
      </a>
    </li>`).join('')}
  </ul>`;
};

const RENDERERS = {
  hero,
  board,
  preview,
  cards,
  figure,
  caveat,
  heading: (b) => `<h2>${b.text}</h2>`,
  prose: (b, ctx) => `<p>${resolveInHtml(b.html, ctx.base)}</p>`,
  meta: (b) => `<p class="meta">${b.html}</p>`,
  html: (b, ctx) => resolveInHtml(b.html, ctx.base),
  showcase: (b, ctx) => `
  <section class="showcase">
    ${preview({ ...b.preview, mode: b.preview?.mode ?? 'chooser' })}
    ${renderBlocks(b.blocks, ctx)}
  </section>`,
};

export function renderBlocks (blocks, ctx) {
  return blocks.map((b) => {
    const render = RENDERERS[b.type];
    if (!render) throw new Error(`Unknown block type "${b.type}"`);
    return render(b, ctx);
  }).join('\n');
}
