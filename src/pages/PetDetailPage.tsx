import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { formatPetDate } from '../utils/date';
import { getPetKey } from '../utils/pets';
import { Badge, Button, Eyebrow, MetaText, Panel, SectionTitle } from '../styles/primitives';
import { PetImage } from '../components/PetImage';

const Layout = styled(motion.section)`
  display: grid;
  gap: 1rem;

  @media (min-width: 980px) {
    grid-template-columns: minmax(0, 1.2fr) minmax(340px, 0.8fr);
    align-items: start;
  }
`;

const ImagePanel = styled(Panel)`
  overflow: hidden;
  padding: 0;
`;

const LargeImage = styled(PetImage)`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: contain;
  background: #f8fafc;
`;

const DetailPanel = styled(Panel)`
  display: grid;
  gap: 1rem;
`;

const MetadataList = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.75rem 1rem;
  margin: 0;
`;

const Term = styled.dt`
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 700;
`;

const Description = styled.dd`
  margin: 0;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export function PetDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pets, loading, toggleSelection, isSelected } = useAppContext();
  const pet = pets.find((entry) => getPetKey(entry.id) === id);

  if (!loading && !pet) {
    return (
      <Panel as={motion.section} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <SectionTitle>Pet not found</SectionTitle>
        <MetaText>
          The selected pet could not be found. It may have been removed from the
          current API response.
        </MetaText>
        <Button as={Link} to="/">
          Back to gallery
        </Button>
      </Panel>
    );
  }

  if (!pet) {
    return (
      <Panel as={motion.section} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <SectionTitle>Loading pet details...</SectionTitle>
        <MetaText>The gallery is still preparing the full pet dataset.</MetaText>
      </Panel>
    );
  }

  const selected = isSelected(pet.id);

  return (
    <Layout
      key={String(pet.id)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <ImagePanel>
        <LargeImage pet={pet} />
      </ImagePanel>

      <DetailPanel>
        <Eyebrow>Pet Details</Eyebrow>
        <SectionTitle>{pet.title}</SectionTitle>
        <MetaText>{pet.description}</MetaText>
        <Badge>{selected ? 'Selected for download' : 'Not selected yet'}</Badge>

        <MetadataList>
          <Term>ID</Term>
          <Description>{pet.id}</Description>
          <Term>Created</Term>
          <Description>{formatPetDate(pet.created_at)}</Description>
          <Term>Image source</Term>
          <Description>
            <a href={pet.image_url} target="_blank" rel="noreferrer">
              Open original image
            </a>
          </Description>
        </MetadataList>

        <ButtonRow>
          <Button
            type="button"
            onClick={() => toggleSelection(pet.id)}
            $variant={selected ? 'secondary' : 'primary'}
          >
            {selected ? 'Remove From Selection' : 'Add To Selection'}
          </Button>
          <Button
            type="button"
            $variant="ghost"
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
                return;
              }

              navigate('/');
            }}
          >
            Back
          </Button>
        </ButtonRow>
      </DetailPanel>
    </Layout>
  );
}
