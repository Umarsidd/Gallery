import type { Pet } from '../types/pet';

export const PET_CATEGORIES = [
  'Dogs',
  'Cats',
  'Paired Pets',
  'Small Pets',
  'Other Pets',
] as const;

export type PetCategory = (typeof PET_CATEGORIES)[number];
export type SelectionFilter = 'all' | 'selected' | 'unselected';
export type RecencyFilter = 'all' | 'fresh' | 'classic';

function inferEmoji(category: PetCategory) {
  switch (category) {
    case 'Dogs':
      return 'DOG';
    case 'Cats':
      return 'CAT';
    case 'Paired Pets':
      return 'DUO';
    case 'Small Pets':
      return 'SMALL';
    default:
      return 'PET';
  }
}

export function normalizeImageUrl(url: string): string {
  if (!url) {
    return '';
  }

  if (url.startsWith('//')) {
    return `https:${url}`;
  }

  if (url.startsWith('http://')) {
    return `https://${url.slice('http://'.length)}`;
  }

  return url;
}

export function inferPetCategory(pet: Pet): PetCategory {
  const haystack = `${pet.title} ${pet.description}`.toLowerCase();

  if (haystack.includes('&') || haystack.includes(' duo ') || haystack.includes(' buds ')) {
    return 'Paired Pets';
  }

  if (
    haystack.includes('woof') ||
    haystack.includes('bark') ||
    haystack.includes('pup') ||
    haystack.includes('dog') ||
    haystack.includes('fetch')
  ) {
    return 'Dogs';
  }

  if (
    haystack.includes('cat') ||
    haystack.includes('feline') ||
    haystack.includes('purr') ||
    haystack.includes('laser pointer') ||
    haystack.includes('meow')
  ) {
    return 'Cats';
  }

  if (
    haystack.includes('rabbit') ||
    haystack.includes('bunny') ||
    haystack.includes('hamster') ||
    haystack.includes('bird') ||
    haystack.includes('fish') ||
    haystack.includes('parrot') ||
    haystack.includes('turtle')
  ) {
    return 'Small Pets';
  }

  return 'Other Pets';
}

export function buildCategoryCounts(pets: Pet[]) {
  const counts: Record<PetCategory, number> = {
    Dogs: 0,
    Cats: 0,
    'Paired Pets': 0,
    'Small Pets': 0,
    'Other Pets': 0,
  };

  for (const pet of pets) {
    counts[inferPetCategory(pet)] += 1;
  }

  return counts;
}

export function createPetFallbackImage(pet: Pet): string {
  const category = inferPetCategory(pet);
  const label = inferEmoji(category);
  const background =
    category === 'Dogs'
      ? '#eef5ff'
      : category === 'Cats'
        ? '#fff3ea'
        : category === 'Paired Pets'
          ? '#eefbf5'
          : '#f5f5f5';

  const accent =
    category === 'Dogs'
      ? '#2874f0'
      : category === 'Cats'
        ? '#fb641b'
        : category === 'Paired Pets'
          ? '#118c4f'
          : '#4b5563';

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360">
      <rect width="480" height="360" fill="${background}" rx="18"/>
      <circle cx="240" cy="128" r="64" fill="${accent}" opacity="0.12"/>
      <text x="240" y="142" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="${accent}">
        ${label}
      </text>
      <text x="240" y="234" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#212121">
        ${pet.title.replace(/&/g, '&amp;')}
      </text>
      <text x="240" y="266" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#6b7280">
        Image unavailable, showing a fallback card
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

