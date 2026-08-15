/* The hover preview. Pointing at a project fills a panel above the list with
   what is actually inside it, pulled from the project's own repository site so
   the pictures cannot drift from the work.

   Hover is not the only way in: focus does the same thing, so a keyboard gets
   the panel too. Where there is no hover at all, the panel keeps its resting
   montage and the cards simply behave as links. */

const REST = '__rest__';

function img(src, alt) {
  const i = document.createElement('img');
  i.loading = 'lazy';
  i.decoding = 'async';
  i.src = src;
  i.alt = alt;
  return i;
}

export function mountPreview(panel, sets) {
  const frame = panel.querySelector('.pv-frame');
  const cap = panel.querySelector('.pv-cap');
  let current = null;
  let leaveTimer = null;

  function show(key) {
    if (key === current) return;
    const set = sets[key];
    if (!set) return;
    current = key;

    const shelf = document.createElement('div');
    shelf.className = 'pv-shelf';
    for (const shot of set.images) shelf.append(img(shot.src, shot.alt));

    frame.replaceChildren(shelf);
    cap.textContent = set.caption;
    panel.dataset.state = key === REST ? 'rest' : 'active';
  }

  // Preload one set the first time it is pointed at, so the second look is instant.
  const warmed = new Set();
  function warm(key) {
    if (warmed.has(key) || !sets[key]) return;
    warmed.add(key);
    for (const shot of sets[key].images) new Image().src = shot.src;
  }

  for (const el of document.querySelectorAll('[data-preview]')) {
    const key = el.dataset.preview;
    const enter = () => { clearTimeout(leaveTimer); warm(key); show(key); };
    const leave = () => {
      clearTimeout(leaveTimer);
      leaveTimer = setTimeout(() => show(REST), 260);
    };
    el.addEventListener('mouseenter', enter);
    el.addEventListener('focus', enter);
    el.addEventListener('mouseleave', leave);
    el.addEventListener('blur', leave);
  }

  show(REST);
}
