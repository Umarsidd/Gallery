import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { Pet } from '../types/pet';
import { formatPetDate } from '../utils/date';
import { truncateText } from '../utils/pets';
import { Badge, Button, MetaText, Surface } from '../styles/primitives';

const Card = styled(Surface)`
  display: grid;
  overflow: hidden;
  border-radius: 24px;
  transition: transform 180ms ease, border-color 180ms ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ImageWrap = styled.div`
  aspect-ratio: 4 / 3;
  background:
    linear-gradient(135deg, rgba(205, 93, 60, 0.22), rgba(22, 123, 119, 0.2));
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  display: grid;
  gap: 0.85rem;
  padding: 1rem;
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
`;

const Title = styled.h3`
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.18rem;
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
  return (
    <Card
      as={motion.article}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.04, duration: 0.2 }}
      layout
    >
      <ImageWrap>
        <CardImage
          src={pet.image_url}
          alt={pet.title}
          loading="lazy"
          decoding="async"
        />
      </ImageWrap>

      <Content>
        <TopRow>
          <div>
            <Title>{pet.title}</Title>
            <MetaText>{formatPetDate(pet.created_at)}</MetaText>
          </div>
          <Badge>{selected ? 'Selected' : 'Selectable'}</Badge>
        </TopRow>

        <MetaText>{truncateText(pet.description)}</MetaText>

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
            View Details
          </Button>
        </BottomRow>
      </Content>
    </Card>
  );
}

