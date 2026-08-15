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

for (const host of document.querySelectorAll('[data-chart]')) {
  const spec = JSON.parse(host.dataset.chart);
  const draw = CHARTS[spec.kind];
  if (draw) draw(host, spec);
  else console.warn(`No chart named "${spec.kind}"`);
}
