import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { Pet } from '../types/pet';
import { formatPetDate } from '../utils/date';
import { truncateText } from '../utils/pets';
import { inferPetCategory } from '../utils/petPresentation';
import { Badge, Button, MetaText, Surface } from '../styles/primitives';
import { PetImage } from './PetImage';

const Card = styled(Surface)`
  display: grid;
  overflow: hidden;
  border-radius: 4px;
  transition: box-shadow 180ms ease, transform 180ms ease;

  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
  }
`;

const ImageWrap = styled.div`
  aspect-ratio: 1 / 1;
  background: #f8fafc;
  display: grid;
  place-items: center;
`;

const CardImage = styled(PetImage)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Content = styled.div`
  display: grid;
  gap: 0.65rem;
  padding: 0.95rem;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const Title = styled.h3`
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  line-height: 1.4;
`;

const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Checkbox = styled.input`
  inline-size: 1rem;
  block-size: 1rem;
  accent-color: ${({ theme }) => theme.colors.primary};
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: wrap;
`;

interface PetCardProps {
  pet: Pet;
  selected: boolean;
  onToggleSelection: (petId: Pet['id']) => void;
  index: number;
}

export function PetCard({
  pet,
  selected,
  onToggleSelection,
  index,
}: PetCardProps) {
  const category = inferPetCategory(pet);

  return (
    <Card
      as={motion.article}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.04, duration: 0.2 }}
      layout
    >
      <ImageWrap>
        <CardImage pet={pet} loading="lazy" decoding="async" />
      </ImageWrap>

      <Content>
        <TopRow>
          <div>
            <Title>{pet.title}</Title>
            <MetaText>{category}</MetaText>
          </div>
          <Badge>{selected ? 'Selected' : 'Add to picks'}</Badge>
        </TopRow>

        <MetaText>{truncateText(pet.description, 86)}</MetaText>
        <MetaRow>
          <MetaText>Added {formatPetDate(pet.created_at)}</MetaText>
        </MetaRow>

        <BottomRow>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={selected}
              onChange={() => onToggleSelection(pet.id)}
              aria-label={`Select ${pet.title}`}
            />
            Choose
          </CheckboxLabel>

          <Button as={Link} to={`/pets/${pet.id}`} $variant="ghost">
            View
          </Button>
        </BottomRow>
      </Content>
    </Card>
  );
}
