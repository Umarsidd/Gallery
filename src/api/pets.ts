import { fetchJson } from './http';
import type { Pet } from '../types/pet';

export async function getPets(): Promise<Pet[]> {
  const pets = await fetchJson<Pet[]>('/pets');

  return pets.map((pet) => ({
    ...pet,
    title: pet.title?.trim() || 'Untitled pet',
    description: pet.description?.trim() || 'No description available yet.',
  }));
}

