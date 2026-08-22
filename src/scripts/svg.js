/* Making an SVG element, and framing one. Two functions, used by every drawing
   here, so that the namespace string and the viewBox convention are written once.

   They were inside chart.js while it was the only thing drawing. The search tree
   is the second, and a second copy of `document.createElementNS` is exactly the
   kind of snippet that drifts: one of them gains a `role` and the other does not,
   and nobody notices until a screen reader meets the one that did not. */

const NS = 'http://www.w3.org/2000/svg';

export function svg(tag, attrs = {}) {
  const n = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  return n;
}

export function frame(w, h) {
  return svg('svg', { viewBox: `0 0 ${w} ${h}`, role: 'img', preserveAspectRatio: 'xMidYMid meet' });
}
