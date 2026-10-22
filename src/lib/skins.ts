/**
 * Public site institution skins — each family re-brands the whole site by
 * overriding the design system's CSS custom properties (RGB triplets) plus
 * providing family-specific copy and hero imagery.
 */

export type SkinId = 'nursery' | 'primary' | 'secondary' | 'tertiary';

export type SkinVars = {
  accent: string; // RGB triplet e.g. "244 114 182"
  accentSoft: string;
  accentDeep: string;
  ok: string;
  background: string;
  surface: string;
  card: string;
  line: string;
  muted: string;
};

export type WebsiteSkin = {
  id: SkinId;
  label: string;
  family: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  ctaLabel: string;
  motif: string;
  heroGradient: string;
  /** Full-bleed photoreal school environment for heroes / apply banners. */
  heroImage: string;
  applyImage: string;
  vars: SkinVars;
  features: { title: string; body: string; icon: string }[];
};

export const SKIN_ORDER: SkinId[] = ['nursery', 'primary', 'secondary', 'tertiary'];

export const skins: Record<SkinId, WebsiteSkin> = {
  nursery: {
    id: 'nursery',
    label: 'Nursery',
    family: 'Early Years',
    headline: 'Where little minds',
    headlineAccent: 'start to bloom.',
    subheadline:
      'Warm, playful nurseries and early-years centres that nurture curiosity, confidence and care from the very first day.',
    ctaLabel: 'Find a nursery',
    motif: '🧸',
    heroImage: '/images/modern-early-years.jpg',
    applyImage: '/images/modern-early-years.jpg',
    heroGradient:
      'radial-gradient(1200px 600px at 12% -8%, rgba(244,114,182,0.32), transparent 60%), radial-gradient(1000px 500px at 88% 8%, rgba(251,191,36,0.22), transparent 55%), linear-gradient(165deg, #1A0E1C 0%, #241124 55%, #16090F 100%)',
    vars: {
      accent: '244 114 182',
      accentSoft: '251 207 232',
      accentDeep: '190 24 93',
      ok: '74 222 128',
      background: '20 12 22',
      surface: '26 15 28',
      card: '38 22 40',
      line: '58 34 60',
      muted: '176 150 180',
    },
    features: [
      { title: 'Play-based learning', body: 'Sensory and play-led curricula built for early development.', icon: '🎨' },
      { title: 'Caring educators', body: 'Low ratios and trained early-years practitioners.', icon: '🤗' },
      { title: 'Safe & cosy', body: 'Secure, child-proofed spaces designed for little ones.', icon: '🏡' },
    ],
  },

  primary: {
    id: 'primary',
    label: 'Primary',
    family: 'Foundation',
    headline: 'Strong foundations for',
    headlineAccent: 'bright futures.',
    subheadline:
      'Discover primary schools that build confident readers, curious mathematicians and kind citizens — one class at a time.',
    ctaLabel: 'Find a primary school',
    motif: '🌱',
    heroImage: '/images/modern-classroom-whiteboard.jpg',
    applyImage: '/images/modern-classroom-whiteboard.jpg',
    heroGradient:
      'radial-gradient(1200px 600px at 12% -8%, rgba(34,197,94,0.30), transparent 60%), radial-gradient(1000px 500px at 88% 8%, rgba(132,204,22,0.20), transparent 55%), linear-gradient(165deg, #071510 0%, #0C1F18 55%, #06100B 100%)',
    vars: {
      accent: '34 197 94',
      accentSoft: '134 239 172',
      accentDeep: '21 128 61',
      ok: '163 230 53',
      background: '7 21 16',
      surface: '12 31 24',
      card: '18 42 32',
      line: '34 64 48',
      muted: '150 176 162',
    },
    features: [
      { title: 'Foundational literacy', body: 'Reading, writing and numeracy done the engaging way.', icon: '📚' },
      { title: 'Whole-child care', body: 'Sports, arts and pastoral support in every school.', icon: '⚽' },
      { title: 'Parent partnership', body: 'Transparent progress and regular updates.', icon: '🤝' },
    ],
  },

  secondary: {
    id: 'secondary',
    label: 'Secondary',
    family: 'Development',
    headline: 'Turn potential into',
    headlineAccent: 'performance.',
    subheadline:
      'Secondary schools where teenagers master subjects, sit real exams, and grow into leaders ready for the world beyond.',
    ctaLabel: 'Find a secondary school',
    motif: '🚀',
    heroImage: '/images/modern-stem-lab.jpg',
    applyImage: '/images/modern-stem-lab.jpg',
    heroGradient:
      'radial-gradient(1200px 600px at 12% -8%, rgba(59,130,246,0.32), transparent 60%), radial-gradient(1000px 500px at 88% 8%, rgba(6,182,212,0.22), transparent 55%), linear-gradient(165deg, #060D18 0%, #0A1628 55%, #040810 100%)',
    vars: {
      accent: '59 130 246',
      accentSoft: '147 197 253',
      accentDeep: '30 64 175',
      ok: '34 211 238',
      background: '6 13 24',
      surface: '10 22 40',
      card: '15 31 56',
      line: '30 52 78',
      muted: '148 163 184',
    },
    features: [
      { title: 'Exam excellence', body: 'Structured prep for WAEC, NECO, IGCSE and more.', icon: '🎓' },
      { title: 'STEM & beyond', body: 'Science, tech, humanities and vocational tracks.', icon: '🧪' },
      { title: 'Leadership & clubs', body: 'Debate, sports and societies that build character.', icon: '🏆' },
    ],
  },

  tertiary: {
    id: 'tertiary',
    label: 'Tertiary',
    family: 'Excellence',
    headline: 'Higher learning,',
    headlineAccent: 'real-world ready.',
    subheadline:
      'Universities, polytechnics and colleges offering accredited programmes, research and industry-ready skills.',
    ctaLabel: 'Find an institution',
    motif: '🎓',
    heroImage: '/images/modern-lecture-hall.jpg',
    applyImage: '/images/modern-lecture-hall.jpg',
    heroGradient:
      'radial-gradient(1200px 600px at 12% -8%, rgba(251,191,36,0.30), transparent 60%), radial-gradient(1000px 500px at 88% 8%, rgba(245,158,11,0.20), transparent 55%), linear-gradient(165deg, #141008 0%, #1C1608 55%, #0E0B05 100%)',
    vars: {
      accent: '251 191 36',
      accentSoft: '253 230 138',
      accentDeep: '180 83 9',
      ok: '74 222 128',
      background: '20 16 8',
      surface: '28 22 8',
      card: '40 32 12',
      line: '62 48 20',
      muted: '180 166 120',
    },
    features: [
      { title: 'Accredited degrees', body: 'University, polytechnic and college programmes.', icon: '🏛️' },
      { title: 'Research & innovation', body: 'Labs, libraries and industry partnerships.', icon: '🔬' },
      { title: 'Career pathways', body: 'Internships, SIWES and graduate outcomes.', icon: '💼' },
    ],
  },
};

/** Map a raw institution type to a skin id. */
export function institutionTypeToSkin(type: string): SkinId {
  switch (type) {
    case 'nursery':
      return 'nursery';
    case 'primary':
      return 'primary';
    case 'secondary':
      return 'secondary';
    case 'college':
    case 'university':
    case 'polytechnic':
    case 'training':
      return 'tertiary';
    default:
      return 'secondary';
  }
}

/** Directory filter groups (nursery + primary shown together as "Basic"). */
export type DirectoryFilterId = 'all' | 'nursery' | 'primary' | 'basic' | 'secondary' | 'tertiary';

export const directoryFilters: {
  id: DirectoryFilterId;
  label: string;
  types: string[];
}[] = [
  { id: 'all', label: 'All', types: [] },
  { id: 'nursery', label: 'Nursery', types: ['nursery'] },
  { id: 'primary', label: 'Primary', types: ['primary'] },
  { id: 'basic', label: 'Nursery + Primary', types: ['nursery', 'primary'] },
  { id: 'secondary', label: 'Secondary', types: ['secondary'] },
  { id: 'tertiary', label: 'Tertiary', types: ['college', 'university', 'polytechnic', 'training'] },
];

export const institutionTypeLabels: Record<string, string> = {
  nursery: 'Nursery',
  primary: 'Primary',
  secondary: 'Secondary',
  college: 'College',
  university: 'University',
  polytechnic: 'Polytechnic',
  training: 'Training',
};
