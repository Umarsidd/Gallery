import styled from 'styled-components';
import type { Pet } from '../types/pet';
import { PetCard } from './PetCard';
import { media } from '../styles/media';

const Grid = styled.section`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;

  ${media.tablet`
    grid-template-columns: repeat(2, minmax(0, 1fr));
  `}

  ${media.desktop`
    grid-template-columns: repeat(4, minmax(0, 1fr));
  `}
`;

interface PetGridProps {
  pets: Pet[];
  selectedIds: string[];
  onToggleSelection: (petId: Pet['id']) => void;
}

export function PetGrid({ pets, selectedIds, onToggleSelection }: PetGridProps) {
  return (
    <Grid aria-label="Pet gallery">
      {pets.map((pet, index) => (
        <PetCard
          key={String(pet.id)}
          pet={pet}
          index={index}
          selected={selectedIds.includes(String(pet.id))}
          onToggleSelection={onToggleSelection}
        />
      ))}
    </Grid>
  );
}

