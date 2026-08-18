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
   the picture alone. Images without one fall to the end in declaration order.

   Every `caption` and `alt` here is read by a visitor, so each one carries a
   value per language rather than a string. The pictures do not: an image is the
   same picture in both. `text` below is what turns one into the other, and a
   bare string still works so that a set can be added before it is translated. */

const AH = 'https://tewf.github.io/after-hours/';
const UC = 'https://tewf.github.io/University-Coursework/';
const IA = 'https://tewf.github.io/IA-Economie-Strategique/';
const RAPPORT = UC + 'Bachelor/L3/S6/ComplementMath2/Projet/rapport/notebooks/';
const TOURNAMENT = UC + 'Bachelor/SecondSemestreLanguage/Prolog/StrategyTournament/';

const DEFAULT_LANGUAGE = 'en';

/** One of the per-language strings above, for the language actually rendering. */
export function text (value, lang = DEFAULT_LANGUAGE) {
  if (typeof value === 'string') return value;
  return value[lang] ?? value[DEFAULT_LANGUAGE];
}

export const SETS = {
  __rest__: {
    caption: {
      en: 'Point at anything below to see what is inside it.',
      fr: "Pointez l'un des éléments ci-dessous pour voir ce qu'il contient.",
    },
    images: [
      { src: AH + 'thumbs/flappy_bird.webp', still: 'still-flappy.webp',
        alt: { en: 'A Flappy Bird agent playing',
               fr: 'Un agent jouant à Flappy Bird' } },
      { src: 'anim-battleship.webp', still: 'still-battleship.webp',
        alt: { en: 'A Battleship bot working through a board',
               fr: 'Un bot de bataille navale progressant sur une grille' } },
      { src: AH + 'Blender_Python_Scripts/sorting_algorithms/bubble_sort.webp', still: 'still-sorting.webp',
        alt: { en: 'Bubble sort animated as moving bars',
               fr: 'Le tri à bulles animé en barres mobiles' } },
      { src: TOURNAMENT + 'results/leaderboard.png',
        alt: { en: 'Sixteen agents ranked by cumulative score',
               fr: 'Seize agents classés par score cumulé' } },
    ],
  },

  'after-hours': {
    caption: {
      en: 'Flappy Bird from raw pixels · sorting, rendered · 3-SAT over GF(2) · the French income tax · matrix algorithms',
      fr: "Flappy Bird à partir des pixels bruts · les tris, rendus · 3-SAT sur GF(2) · l'impôt sur le revenu français · les algorithmes matriciels",
    },
    images: [
      { src: AH + 'thumbs/flappy_bird.webp', still: 'still-flappy.webp',
        alt: { en: 'A neural network learning to play Flappy Bird from raw pixels',
               fr: 'Un réseau de neurones apprenant à jouer à Flappy Bird à partir des pixels bruts' } },
      { src: AH + 'Blender_Python_Scripts/sorting_algorithms/bubble_sort.webp', still: 'still-sorting.webp',
        alt: { en: 'Sorting algorithms rendered in Blender, one swap per frame',
               fr: 'Des algorithmes de tri rendus dans Blender, un échange par image' } },
      { src: AH + 'thumbs/sat_solver.png', lead: 1,
        alt: { en: 'A SAT solver that turns logic into algebra over GF(2)',
               fr: 'Un solveur SAT qui transforme la logique en algèbre sur GF(2)' } },
      { src: AH + 'thumbs/income_tax.png', lead: 5,
        alt: { en: 'What French income tax actually costs, marginal against average',
               fr: "Ce que coûte réellement l'impôt sur le revenu français, marginal contre moyen" } },
      { src: AH + 'thumbs/matrix_algorithms.png', lead: 6,
        alt: { en: 'An FFT written from scratch, checked against NumPy',
               fr: 'Une FFT écrite de zéro, vérifiée contre NumPy' } },
    ],
  },

  'university-coursework': {
    caption: {
      en: 'The Battleship bot playing a recorded game · ROC curves over 24 000 fragrances · the correlation structure behind them',
      fr: 'Le bot de bataille navale jouant une partie enregistrée · des courbes ROC sur 24 000 parfums · la structure de corrélation qui les sous-tend',
    },
    images: [
      { src: 'anim-battleship.webp', still: 'still-battleship.webp',
        alt: { en: 'A Battleship bot working out where the ships are',
               fr: 'Un bot de bataille navale déduisant où sont les navires' } },
      { src: RAPPORT + '07_comparaison_files/figure-html/fig-roc-comp-1.png', lead: 3,
        alt: { en: 'Predicting how a perfume will be rated, four models compared',
               fr: "Prédire la note d'un parfum, quatre modèles comparés" } },
      { src: RAPPORT + '01_exploration_files/figure-html/fig-corr-1.png', lead: 2,
        alt: { en: 'What actually moves together in 24 000 fragrances',
               fr: 'Ce qui varie réellement ensemble dans 24 000 parfums' } },
    ],
  },

  'strategic-pricing': {
    caption: {
      en: 'Imitation as a weight update · the agent against a cooperator, a defector and a coin flip · the tournament the course project entered',
      fr: "L'imitation comme mise à jour de poids · l'agent face à un coopérateur, un défecteur et un tirage à pile ou face · le tournoi auquel le projet de cours a participé",
    },
    images: [
      { src: IA + 'mirror_neurons/opponents_sequential.png', lead: 4,
        alt: { en: 'An imitating agent meeting a cooperator, a defector and a coin flip',
               fr: 'Un agent imitateur face à un coopérateur, un défecteur et un tirage à pile ou face' } },
      { src: IA + 'mirror_neurons/update_shape.png', lead: 8,
        alt: { en: 'How an agent that copies what it sees changes its mind',
               fr: "Comment un agent qui copie ce qu'il voit change d'avis" } },
      { src: TOURNAMENT + 'results/leaderboard.png', lead: 7,
        alt: { en: 'Sixteen Prolog strategies played against each other',
               fr: 'Seize stratégies Prolog jouées les unes contre les autres' } },
    ],
  },

  bilinear: {
    caption: {
      en: 'Multiplications falling, on four bilinear maps over F2 and F3',
      fr: 'Les multiplications qui tombent, sur quatre applications bilinéaires sur F2 et F3',
    },
    images: [
      { src: 'anim-bilinear.svg', still: 'thumb-bilinear.svg',
        alt: { en: 'Cutting the multiplications a polynomial product needs',
               fr: "Réduire les multiplications qu'exige un produit de polynômes" } },
    ],
  },
};

/** Resolve local thumbnails against /site/, and honour reduced motion. */
export function resolveSets (
  calm = matchMedia('(prefers-reduced-motion: reduce)').matches,
  lang = DEFAULT_LANGUAGE,
) {
  const abs = s => (s.startsWith('http') ? s : '/site/' + s);
  const out = {};
  for (const [k, v] of Object.entries(SETS)) {
    out[k] = {
      caption: text(v.caption, lang),
      images: v.images.map(i => ({ alt: text(i.alt, lang), src: abs(calm && i.still ? i.still : i.src) })),
    };
  }
  return out;
}
