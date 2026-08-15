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
   reduced motion.

   `alt` is the name a visitor reads under the pin, so it says what the thing is
   rather than what the picture contains: "a neural network learning to play
   Flappy Bird", not "an agent playing". Someone who reads only the board should
   come away knowing what was built.

   `lead` orders the board. Anything that moves goes first whatever its lead,
   because a two-second loop of the thing running is worth more than any still;
   `lead` then ranks the stills, lowest first, by how much a stranger gets from
   the picture alone. Images without one fall to the end in declaration order. */

const AH = 'https://tewf.github.io/after-hours/';
const UC = 'https://tewf.github.io/University-Coursework/';
const IA = 'https://tewf.github.io/IA-Economie-Strategique/';
const RAPPORT = UC + 'Bachelor/L3/S6/ComplementMath2/Projet/rapport/notebooks/';
const TOURNAMENT = UC + 'Bachelor/SecondSemestreLanguage/Prolog/StrategyTournament/';

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
      { src: TOURNAMENT + 'results/leaderboard.png', alt: 'Sixteen agents ranked by cumulative score' },
    ],
  },

  'after-hours': {
    caption: 'Flappy Bird from raw pixels · sorting, rendered · 3-SAT over GF(2) · the French income tax · matrix algorithms',
    images: [
      { src: AH + 'thumbs/flappy_bird.webp', still: 'still-flappy.webp',
        alt: 'A neural network learning to play Flappy Bird from raw pixels' },
      { src: AH + 'Blender_Python_Scripts/sorting_algorithms/bubble_sort.webp', still: 'still-sorting.webp',
        alt: 'Sorting algorithms rendered in Blender, one swap per frame' },
      { src: AH + 'thumbs/sat_solver.png', lead: 1,
        alt: 'A SAT solver that turns logic into algebra over GF(2)' },
      { src: AH + 'thumbs/income_tax.png', lead: 5,
        alt: 'What French income tax actually costs, marginal against average' },
      { src: AH + 'thumbs/matrix_algorithms.png', lead: 6,
        alt: 'An FFT written from scratch, checked against NumPy' },
    ],
  },

  'university-coursework': {
    caption: 'The Battleship bot playing a recorded game · ROC curves over 24 000 fragrances · the correlation structure behind them',
    images: [
      { src: 'anim-battleship.webp', still: 'still-battleship.webp',
        alt: 'A Battleship bot working out where the ships are' },
      { src: RAPPORT + '07_comparaison_files/figure-html/fig-roc-comp-1.png', lead: 3,
        alt: 'Predicting how a perfume will be rated, four models compared' },
      { src: RAPPORT + '01_exploration_files/figure-html/fig-corr-1.png', lead: 2,
        alt: 'What actually moves together in 24 000 fragrances' },
    ],
  },

  'strategic-pricing': {
    caption: 'Imitation as a weight update · the agent against a cooperator, a defector and a coin flip · the tournament the course project entered',
    images: [
      { src: IA + 'mirror_neurons/opponents_sequential.png', lead: 4,
        alt: 'An imitating agent meeting a cooperator, a defector and a coin flip' },
      { src: IA + 'mirror_neurons/update_shape.png', lead: 8,
        alt: 'How an agent that copies what it sees changes its mind' },
      { src: TOURNAMENT + 'results/leaderboard.png', lead: 7,
        alt: 'Sixteen Prolog strategies played against each other' },
    ],
  },

  bilinear: {
    caption: 'Multiplications falling, on four bilinear maps over F2 and F3',
    images: [
      { src: 'anim-bilinear.svg', still: 'thumb-bilinear.svg',
        alt: 'Cutting the multiplications a polynomial product needs' },
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
