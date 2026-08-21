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

   `w` and `h` are the picture's own pixel size, emitted as width and height so
   the browser reserves the right box before the image arrives. Without them a
   masonry column reflows under the reader as each lazy image lands. They are a
   hint, not a crop: the stylesheet keeps height auto, so if a project reissues a
   figure at another shape the real one still wins once it loads.

   `result` is what that thing measured, shown on the board under the name. It is
   optional on purpose: a pin carries one only where there is an honest number,
   so the sorting loop and the correlation matrix have none rather than a
   sentence dressed up as a finding.

   `lead` orders the board. Anything that moves goes first whatever its lead,
   because a two-second loop of the thing running is worth more than any still;
   `lead` then ranks the stills, lowest first, by how much a stranger gets from
   the picture alone. Images without one fall to the end in declaration order.

   Every `caption`, `alt` and `result` is read by a visitor, so each carries a
   value per language rather than a string. The pictures do not: an image is the
   same picture in both. `text` below turns one into the other, and a bare string
   still works, so a set can be added before it is translated. */

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
      { src: AH + 'thumbs/flappy_bird.webp', still: 'still-flappy.webp', w: 640, h: 480,
        alt: { en: 'A Flappy Bird agent playing',
               fr: 'Un agent jouant à Flappy Bird' } },
      { src: 'anim-battleship.webp', still: 'still-battleship.webp', w: 327, h: 327,
        alt: { en: 'A Battleship bot working through a board',
               fr: 'Un bot de bataille navale progressant sur une grille' } },
      { src: AH + 'Blender_Python_Scripts/sorting_algorithms/bubble_sort.webp', still: 'still-sorting.webp', w: 640, h: 360,
        alt: { en: 'Bubble sort animated as moving bars',
               fr: 'Le tri à bulles animé en barres mobiles' } },
      { src: TOURNAMENT + 'results/leaderboard.png', w: 978, h: 647,
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
      { src: AH + 'thumbs/flappy_bird.webp', still: 'still-flappy.webp', w: 640, h: 480,
        alt: { en: 'A neural network learning to play Flappy Bird from raw pixels',
               fr: 'Un réseau de neurones apprenant à jouer à Flappy Bird à partir des pixels bruts' },
        result: { en: '0.4 to 12.65 pipes, from one colour channel',
                  fr: 'de 0,4 à 12,65 tuyaux, par un seul canal de couleur' } },
      { src: AH + 'Blender_Python_Scripts/sorting_algorithms/bubble_sort.webp', still: 'still-sorting.webp', w: 640, h: 360,
        alt: { en: 'Sorting algorithms rendered in Blender, one swap per frame',
               fr: 'Des algorithmes de tri rendus dans Blender, un échange par image' } },
      { src: AH + 'thumbs/sat_solver.png', lead: 1, w: 640, h: 480,
        alt: { en: 'A SAT solver that turns logic into algebra over GF(2)',
               fr: 'Un solveur SAT qui transforme la logique en algèbre sur GF(2)' },
        result: { en: '500 instances, zero wrong verdicts',
                  fr: '500 instances, aucun verdict erroné' } },
      { src: AH + 'thumbs/income_tax.png', lead: 7, w: 640, h: 480,
        alt: { en: 'What French income tax actually costs, marginal against average',
               fr: "Ce que coûte réellement l'impôt sur le revenu français, marginal contre moyen" },
        result: { en: 'inflection at €59,800',
                  fr: "point d'inflexion à 59 800 €" } },
      { src: AH + 'thumbs/matrix_algorithms.png', lead: 8, w: 640, h: 480,
        alt: { en: 'An FFT written from scratch, checked against NumPy',
               fr: 'Une FFT écrite de zéro, vérifiée contre NumPy' },
        result: { en: 'agreeing with NumPy to 1e-13',
                  fr: 'en accord avec NumPy à 1e-13' } },
    ],
  },

  'university-coursework': {
    caption: {
      en: 'The Battleship bot playing a recorded game · ROC curves over 24 000 fragrances · the correlation structure behind them',
      fr: 'Le bot de bataille navale jouant une partie enregistrée · des courbes ROC sur 24 000 parfums · la structure de corrélation qui les sous-tend',
    },
    images: [
      { src: 'anim-battleship.webp', still: 'still-battleship.webp', w: 327, h: 327,
        alt: { en: 'A Battleship bot working out where the ships are',
               fr: 'Un bot de bataille navale déduisant où sont les navires' },
        result: { en: '74.3% of games, 54.8 shots to clear',
                  fr: '74,3 % des parties, 54,8 tirs pour vider le plateau' } },
      { src: RAPPORT + '07_comparaison_files/figure-html/fig-roc-comp-1.png', lead: 4, w: 864, h: 576,
        alt: { en: 'Predicting how a perfume will be rated, four models compared',
               fr: "Prédire la note d'un parfum, quatre modèles comparés" },
        result: { en: 'best AUC 0.693, all four between 0.65 and 0.69',
                  fr: 'meilleure AUC 0,693, les quatre entre 0,65 et 0,69' } },
      { src: RAPPORT + '01_exploration_files/figure-html/fig-corr-1.png', lead: 3, w: 672, h: 480,
        alt: { en: 'What actually moves together in 24 000 fragrances',
               fr: 'Ce qui varie réellement ensemble dans 24 000 parfums' } },
    ],
  },

  'strategic-pricing': {
    caption: {
      en: 'Imitation as a weight update · the agent against a cooperator, a defector and a coin flip · five language models over 220 matches · the tournament the course project entered',
      fr: "L'imitation comme mise à jour de poids · l'agent face à un coopérateur, un défecteur et un tirage à pile ou face · cinq modèles de langue sur 220 parties · le tournoi auquel le projet de cours a participé",
    },
    images: [
      { src: IA + 'llm/results/message_content.png', lead: 2, w: 1039, h: 448,
        alt: { en: 'What the models actually put in the message',
               fr: 'Ce que les modèles mettent réellement dans le message' },
        result: { en: '0.39 of messages name an action, down to 0.00',
                  fr: "0,39 des messages nomme une action, jusqu'à 0,00" } },
      { src: IA + 'mirror_neurons/results/standings.png', lead: 5, w: 860, h: 473,
        alt: { en: 'An imitating agent meeting a cooperator, a defector and a coin flip',
               fr: 'Un agent imitateur face à un coopérateur, un défecteur et un tirage à pile ou face' },
        result: { en: '8th of 8, behind a coin flip',
                  fr: '8e sur 8, derrière un tirage à pile ou face' } },
      { src: IA + 'llm/results/self_play_lock_in.png', lead: 6, w: 796, h: 452,
        alt: { en: 'Two models keeping whatever regime they were handed',
               fr: "Deux modèles conservant le régime qu'on leur a donné" },
        result: { en: '0.21 cooperating out of a defecting opening, 0.47 with a message',
                  fr: "0,21 coopère depuis une ouverture de défection, 0,47 avec un message" } },
      { src: TOURNAMENT + 'results/leaderboard.png', lead: 9, w: 978, h: 647,
        alt: { en: 'Sixteen Prolog strategies played against each other',
               fr: 'Seize stratégies Prolog jouées les unes contre les autres' },
        result: { en: '7th and 8th of 16',
                  fr: '7e et 8e sur 16' } },
      { src: IA + 'mirror_neurons/results/reciprocity_decay.png', lead: 10, w: 761, h: 473,
        alt: { en: 'How an agent that copies what it sees changes its mind',
               fr: "Comment un agent qui copie ce qu'il voit change d'avis" },
        result: { en: 'reciprocity to zero, Tit-for-Tat holds at one',
                  fr: 'réciprocité à zéro, le donnant-donnant tient à un' } },
    ],
  },

  bilinear: {
    caption: {
      en: 'Multiplications falling on four bilinear maps over F2 and F3, and the rank of the first since proved to be 13',
      fr: "Les multiplications qui tombent sur quatre applications bilinéaires sur F2 et F3, et le rang de la première depuis démontré égal à 13",
    },
    images: [
      { src: 'anim-bilinear.svg', still: 'thumb-bilinear.svg', w: 400, h: 264,
        alt: { en: 'Cutting the multiplications a polynomial product needs',
               fr: "Réduire les multiplications qu'exige un produit de polynômes" },
        result: { en: '25 multiplications to 14, and the rank proved to be 13',
                  fr: 'de 25 multiplications à 14, et le rang démontré égal à 13' } },
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
