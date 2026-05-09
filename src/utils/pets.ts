import type { Pet, SortOption } from '../types/pet';

export function getPetKey(id: Pet['id']): string {
  return String(id);
}

export function truncateText(value: string, maxLength = 112): string {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trimEnd()}...`;
}

export function sortPets(pets: Pet[], sortBy: SortOption): Pet[] {
  const sorted = [...pets];

  sorted.sort((left, right) => {
    switch (sortBy) {
      case 'name-asc':
        return left.title.localeCompare(right.title);
      case 'name-desc':
        return right.title.localeCompare(left.title);
      case 'date-asc':
        return new Date(left.created_at).getTime() - new Date(right.created_at).getTime();
      case 'date-desc':
      default:
        return new Date(right.created_at).getTime() - new Date(left.created_at).getTime();
    }
  });

  return sorted;
}

