/* The single entry script. Pages are generated markup with their configuration
   in data attributes, so nothing on this site carries an inline script. */

/* The stylesheet is linked from the document rather than imported here, so it
   downloads alongside the HTML instead of waiting for this module. */
import { mountPreview } from './scripts/preview.js';
import { resolveSets } from './scripts/previews.js';
import { beforeAfter, logBars } from './scripts/chart.js';

const CHARTS = { beforeAfter, logBars };

const panel = document.querySelector('[data-preview-panel]');
if (panel) mountPreview(panel, resolveSets(), panel.dataset.previewRest || undefined);

/* The board ships stills and moves only if the visitor has not asked otherwise.
   No CSS rule stops an animated WebP looping, so this is the only place the
   reduced-motion promise can actually be kept. */
if (matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  for (const image of document.querySelectorAll('img[data-motion]')) {
    image.src = image.dataset.motion;
  }
}

/* Most pins are served from the project's own site, which is what stops a
   picture here outliving the work it depicts. The cost is that this page can be
   right while a sibling site is mid-deploy, so a pin whose image does not arrive
   removes itself rather than showing a recruiter an empty frame. */
for (const image of document.querySelectorAll('.pin img')) {
  image.addEventListener('error', () => {
    image.closest('.pin')?.remove();
    console.warn(`Pin dropped, image did not load: ${image.src}`);
  });
}

for (const host of document.querySelectorAll('[data-chart]')) {
  const spec = JSON.parse(host.dataset.chart);
  const draw = CHARTS[spec.kind];
  if (draw) draw(host, spec);
  else console.warn(`No chart named "${spec.kind}"`);
}
