/* What each project shows when you point at it.

   The pictures are served from the project's own repository site on this same
   domain, not copied here, so they stay whatever that project currently says.
   Only the bilinear thumbnail is local, because that repository ships PDFs and
   no figures. */

const AH = 'https://tewf.github.io/after-hours/';
const UC = 'https://tewf.github.io/University-Coursework/';
const IA = 'https://tewf.github.io/IA-Economie-Strategique/';
const RAPPORT = UC + 'Bachelor/L3/S6/ComplementMath2/Projet/rapport/notebooks/';

export const SETS = {
  __rest__: {
    caption: 'Point at anything below to see what is inside it.',
    images: [
      { src: AH + 'thumbs/flappy_bird.webp', alt: 'A Flappy Bird agent mid-run' },
      { src: IA + 'tournament/leaderboard.png', alt: 'Sixteen agents ranked by cumulative score' },
      { src: UC + 'Bachelor/Java/BattleshipAI/Results/performance_gaussian_overlay.png',
        alt: 'Distribution of shots to clear a Battleship board' },
      { src: AH + 'thumbs/sorting.webp', alt: 'A sorting algorithm rendered as moving bars' },
    ],
  },

  'after-hours': {
    caption: 'Flappy Bird from raw pixels · 3-SAT over GF(2) · the French income tax · matrix algorithms · sorting, rendered',
    images: [
      { src: AH + 'thumbs/flappy_bird.webp', alt: 'A convolutional agent playing Flappy Bird' },
      { src: AH + 'thumbs/sat_solver.png', alt: 'Clauses encoded as polynomials over GF(2)' },
      { src: AH + 'thumbs/income_tax.png', alt: 'Marginal against average French income tax rate' },
      { src: AH + 'thumbs/matrix_algorithms.png', alt: 'Accuracy of a hand-written FFT against NumPy' },
      { src: AH + 'thumbs/sorting.webp', alt: 'Bubble and merge sort animated in Blender' },
    ],
  },

  'university-coursework': {
    caption: 'Battleship shot distribution · ROC curves over 24 000 fragrances · the correlation structure behind them',
    images: [
      { src: UC + 'Bachelor/Java/BattleshipAI/Results/performance_gaussian_overlay.png',
        alt: 'Shots needed to clear the board, by strategy' },
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
    caption: 'Rank before and after, on four bilinear maps over F2 and F3',
    images: [
      { src: 'thumb-bilinear.svg', alt: 'Rank falling from 25 to 14, 24 to 15, 28 to 16 and 18 to 11' },
    ],
  },

};

/** Rewrite the local thumbnails so they resolve from any page depth. */
export function withBase(base) {
  const out = {};
  for (const [k, v] of Object.entries(SETS)) {
    out[k] = {
      caption: v.caption,
      images: v.images.map(i => ({
        alt: i.alt,
        src: i.src.startsWith('http') ? i.src : base + 'site/' + i.src,
      })),
    };
  }
  return out;
}
