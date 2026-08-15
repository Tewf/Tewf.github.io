/* What each project shows when you point at it.

   Moving things come first. A loop of the agent actually playing, or of the
   rank actually falling, says more in two seconds than a chart does, so each
   set is ordered animation first and stills after.

   Most pictures are served from the project's own repository site on this same
   domain rather than copied here, so they stay whatever that project currently
   says. The local ones are the exceptions: the bilinear repository ships PDFs
   and no figures, and the Battleship loop is rendered from that project's
   recorded game data.

   Every animated image carries a `still`, used when the visitor has asked for
   reduced motion. */

const AH = 'https://tewf.github.io/after-hours/';
const UC = 'https://tewf.github.io/University-Coursework/';
const IA = 'https://tewf.github.io/IA-Economie-Strategique/';
const RAPPORT = UC + 'Bachelor/L3/S6/ComplementMath2/Projet/rapport/notebooks/';

export const SETS = {
  __rest__: {
    caption: 'Point at anything below to see what is inside it.',
    images: [
      { src: AH + 'thumbs/flappy_bird.webp', still: 'still-flappy.webp',
        alt: 'A Flappy Bird agent playing' },
      { src: 'anim-battleship.webp', still: 'still-battleship.webp',
        alt: 'A Battleship bot working through a board' },
      { src: AH + 'Blender_Python_Scripts/sorting_algorithms/bubble_sort.webp', still: 'still-sorting.webp',
        alt: 'Bubble sort animated as moving bars' },
      { src: IA + 'tournament/leaderboard.png', alt: 'Sixteen agents ranked by cumulative score' },
    ],
  },

  'after-hours': {
    caption: 'Flappy Bird from raw pixels · sorting, rendered · 3-SAT over GF(2) · the French income tax · matrix algorithms',
    images: [
      { src: AH + 'thumbs/flappy_bird.webp', still: 'still-flappy.webp',
        alt: 'A convolutional agent playing Flappy Bird from rendered frames' },
      { src: AH + 'Blender_Python_Scripts/sorting_algorithms/bubble_sort.webp', still: 'still-sorting.webp',
        alt: 'Bubble sort keyframed through Blender, bars swapping as it runs' },
      { src: AH + 'thumbs/sat_solver.png', alt: 'Clauses encoded as polynomials over GF(2)' },
      { src: AH + 'thumbs/income_tax.png', alt: 'Marginal against average French income tax rate' },
      { src: AH + 'thumbs/matrix_algorithms.png', alt: 'Accuracy of a hand-written FFT against NumPy' },
    ],
  },

  'university-coursework': {
    caption: 'The Battleship bot playing a recorded game · ROC curves over 24 000 fragrances · the correlation structure behind them',
    images: [
      { src: 'anim-battleship.webp', still: 'still-battleship.webp',
        alt: 'The probability grid updating as the bot hunts the fleet' },
      { src: RAPPORT + '07_comparaison_files/figure-html/fig-roc-comp-1.png',
        alt: 'ROC curves for four classifiers' },
      { src: RAPPORT + '01_exploration_files/figure-html/fig-corr-1.png',
        alt: 'Correlation matrix of the fragrance features' },
    ],
  },

  'strategic-pricing': {
    caption: 'The tournament standings · the match against Nash and what it cost · imitation as a weight update',
    images: [
      { src: IA + 'tournament/leaderboard.png', alt: 'Sixteen agents on a log scale' },
      { src: IA + 'equilibrium/equilibrium_comparison.png', alt: 'The match against Nash, and its cost' },
      { src: IA + 'mirror_neurons/update_shape.png', alt: 'The logistic shape of the imitation update' },
    ],
  },

  bilinear: {
    caption: 'Multiplications falling, on four bilinear maps over F2 and F3',
    images: [
      { src: 'anim-bilinear.svg', still: 'thumb-bilinear.svg',
        alt: 'Multiplications falling from 25 to 14, 24 to 15, 28 to 16 and 18 to 10' },
    ],
  },
};

/** Resolve local thumbnails against /site/, and honour reduced motion. */
export function resolveSets(calm = matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const abs = s => (s.startsWith('http') ? s : '/site/' + s);
  const out = {};
  for (const [k, v] of Object.entries(SETS)) {
    out[k] = {
      caption: v.caption,
      images: v.images.map(i => ({ alt: i.alt, src: abs(calm && i.still ? i.still : i.src) })),
    };
  }
  return out;
}
