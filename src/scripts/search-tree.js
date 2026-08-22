/* A search trace, scrubbed. No library, no build step, no CDN.

   The trace is the JSONL the branch and bound in `after-hours` writes, inlined
   into the page as JSON: a header, then `open`, `bound`, `prune`, `adopt` and
   `close` in the order they happened. Nothing here knows what a linear programme
   is. Hand it any trace in the `search` world and it draws the tree that trace
   describes, which is the claim the format exists to make.

   Where a node sits is decided here and appears nowhere in the trace. The
   renderer that keyframes the same format in Blender puts the same events
   somewhere else entirely, and both are right: a position is a reading of a run,
   not a fact about it. */

import { frame, svg } from './svg.js';

const STEP_X = 74, STEP_Y = 78, RADIUS = 13, MARGIN = 30;
const BOUND_DROP = 18;   // where a node's bound sits below it, and the last row's floor

/* Outcome to the token that fills it. `open` is a node still being worked on,
   which is every node until the event that settles it arrives. */
const FILL = {
  open: 'var(--ink)',
  adopt: 'var(--gold)',
  bounded: 'var(--muted)',
  infeasible: 'var(--sunken)',
  unbounded: 'var(--sunken)',
  limit: 'var(--correction)',
};

/* Every string the scrubber says, as templates a page can replace. The site is
   bilingual and this line is read aloud by `role="status"`, so leaving it in
   English on the French page would be the one part of that page that is not.
   `{node}`, `{value}` and `{branch}` are filled in; anything else is literal. */
const WORDS = {
  play: 'Play',
  pause: 'Pause',
  step: '{step} of {total}: ',
  nothing: 'nothing yet',
  open: 'open {node}, the branch where {branch}',
  openRoot: 'open {node}, the whole problem',
  bound: '{node} relaxes to {value}',
  adopt: '{node} is whole at {value}, and is the best so far',
  close: '{node} is done, both of its branches walked',
  bounded: '{node} pruned: cannot beat the best already found',
  infeasible: '{node} pruned: no point satisfies it',
  unbounded: '{node} pruned: unbounded',
  limit: '{node} pruned: the node budget ran out',
  otherwise: '{node} pruned: {value}',
};

const fill = (template, values) =>
  template.replace(/\{(\w+)\}/g, (whole, key) => (key in values ? values[key] : whole));

/* `(children, depth, branch)` per node, and the order they were opened in. */
function readTree(events) {
  const children = new Map(), depth = new Map(), branch = new Map(), order = [];
  for (const event of events) {
    if (event.op !== 'open') continue;
    const name = event.ids[0];
    children.set(name, children.get(name) ?? []);
    depth.set(name, event.attrs.depth);
    branch.set(name, event.attrs.branch);
    order.push(name);
    const parent = event.attrs.parent;
    if (parent !== null) children.get(parent).push(name);
  }
  return { children, depth, branch, order };
}

/* Leaves in the order they were opened, parents centred above their span. */
function columns(children, root) {
  const column = new Map();
  let next = 0;
  const walk = (name) => {
    const kids = children.get(name);
    if (!kids.length) {
      column.set(name, next);
      next += 1;
      return column.get(name);
    }
    const spans = kids.map(walk);
    column.set(name, (spans[0] + spans[spans.length - 1]) / 2);
    return column.get(name);
  };
  walk(root);
  return column;
}

/* What each node looks like once the first `step` events have happened, and what
   the last of those events was, which is the line under the picture. */
function stateAt(events, step, words) {
  const shown = new Map();
  let said = words.nothing;
  for (let t = 0; t < step; t += 1) {
    const event = events[t];
    const name = event.ids[0];
    const attrs = event.attrs ?? {};
    const say = (key, extra = {}) => fill(words[key] ?? WORDS[key], { node: name, ...extra });
    if (event.op === 'open') {
      shown.set(name, { verdict: 'open', bound: null });
      said = attrs.branch ? say('open', { branch: attrs.branch }) : say('openRoot');
    } else if (event.op === 'bound') {
      shown.get(name).bound = attrs.value;
      said = say('bound', { value: attrs.value });
    } else if (event.op === 'prune') {
      shown.get(name).verdict = attrs.why;
      said = attrs.why in words || attrs.why in WORDS
        ? say(attrs.why) : say('otherwise', { value: attrs.why });
    } else if (event.op === 'adopt') {
      shown.get(name).verdict = 'adopt';
      said = say('adopt', { value: attrs.value });
    } else if (event.op === 'close') {
      said = say('close');
    }
  }
  return { shown, said };
}

export function searchTree(host, spec) {
  const { head, events } = spec.trace;
  const words = { ...WORDS, ...(spec.words ?? {}) };
  const { children, depth, branch, order } = readTree(events);
  if (!order.length) return;
  const column = columns(children, order[0]);

  const deepest = Math.max(...depth.values());
  const width = (Math.max(...column.values()) + 1) * STEP_X + 2 * MARGIN;
  /* Down to the last row's bound label and no further. Reserving a whole extra
     STEP_Y below the deepest node left a band of empty viewBox, and because the
     drawing is scaled to the column width that band came out twice the size it
     is here: two hundred pixels of nothing between the tree and its scrubber. */
  const height = MARGIN + 2 * RADIUS + deepest * STEP_Y + BOUND_DROP + MARGIN;
  const at = (name) => [MARGIN + RADIUS + column.get(name) * STEP_X,
                        MARGIN + RADIUS + depth.get(name) * STEP_Y];

  const picture = frame(width, height);
  /* A nine-node tree stretched across a 920 px reading column gives nodes the
     size of buttons. It stays responsive and stops growing a little past its
     natural size, which is where the labels are still comfortable. */
  picture.style.maxWidth = `${Math.round(width * 1.3)}px`;
  picture.style.marginInline = 'auto';
  picture.setAttribute('aria-label',
    `${head.algorithm}: a search tree of ${order.length} nodes, ` +
    `${Math.max(...depth.values()) + 1} deep. The events it replays are listed below it.`);

  const scrub = document.createElement('input');
  Object.assign(scrub, { type: 'range', min: 0, max: events.length, value: events.length, step: 1 });
  scrub.className = 'scrub';
  scrub.setAttribute('aria-label', 'step through the search');

  const play = document.createElement('button');
  play.type = 'button';
  play.className = 'scrub-play';
  play.textContent = words.play;

  const caption = document.createElement('p');
  caption.className = 'scrub-said';
  caption.setAttribute('role', 'status');

  function paint() {
    const step = Number(scrub.value);
    const { shown, said } = stateAt(events, step, words);
    picture.replaceChildren();

    for (const [name, kids] of children) {
      if (!shown.has(name)) continue;
      for (const child of kids) {
        if (!shown.has(child)) continue;
        const [x0, y0] = at(name), [x1, y1] = at(child);
        picture.append(svg('path', {
          d: `M ${x0} ${y0 + RADIUS} V ${(y0 + y1) / 2} H ${x1} V ${y1 - RADIUS}`,
          fill: 'none', stroke: 'var(--line)', 'stroke-width': 1.5,
        }));
        const label = svg('text', { x: x1, y: (y0 + y1) / 2 - 5, 'text-anchor': 'middle' });
        label.textContent = branch.get(child) ?? '';
        picture.append(label);
      }
    }

    for (const [name, state] of shown) {
      const [x, y] = at(name);
      picture.append(svg('circle', {
        cx: x, cy: y, r: RADIUS, fill: FILL[state.verdict] ?? FILL.open,
        stroke: 'var(--line)', 'stroke-width': 1,
      }));
      if (state.bound !== null) {
        const value = svg('text', { x, y: y + RADIUS + 13, 'text-anchor': 'middle', class: 'val' });
        value.textContent = state.bound;
        picture.append(value);
      }
    }
    caption.textContent = fill(words.step, { step, total: events.length }) + said;
  }

  /* Autoplay is a motion the visitor did not ask for, so the button says play
     until they do. Under reduced motion it never runs on its own either way. */
  let timer = null;
  const stop = () => { clearInterval(timer); timer = null; play.textContent = words.play; };
  play.addEventListener('click', () => {
    if (timer) return stop();
    if (Number(scrub.value) >= events.length) scrub.value = 0;
    play.textContent = words.pause;
    timer = setInterval(() => {
      scrub.value = Number(scrub.value) + 1;
      paint();
      if (Number(scrub.value) >= events.length) stop();
    }, 420);
  });
  scrub.addEventListener('input', () => { if (timer) stop(); paint(); });

  const controls = document.createElement('div');
  controls.className = 'scrub-row';
  controls.append(play, scrub);
  host.replaceChildren(picture, controls, caption);
  paint();
  return picture;
}
