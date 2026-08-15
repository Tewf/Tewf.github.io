/* One renderer per content block type. Each returns a fragment of HTML and
   knows nothing about the page around it.

   The two interactive pieces, the hover preview and the charts, are emitted as
   plain markup carrying their configuration in data attributes; src/main.js
   finds them and mounts them. No page carries an inline script. */

import { resolve, resolveInHtml } from './links.js';

const attr = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;');

const hero = (b) => `
  <section class="hero">
    <p class="eyebrow">${b.eyebrow}</p>
    <h1>${b.title}</h1>
    <p class="lede">${b.lede}</p>
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

const reductions = (b) => `
  <div class="reductions">${b.items.map((r) => `
    <div class="red">
      <span class="what">${r.what}<span class="src">${r.src}</span></span>
      <span class="pair"><span class="from">${r.from}</span><span class="arrow">&rarr;</span><span class="to">${r.to}</span></span>
    </div>`).join('')}
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

const RENDERERS = {
  hero,
  preview,
  cards,
  reductions,
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
