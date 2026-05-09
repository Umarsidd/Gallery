import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Badge, Button, Eyebrow, MetaText, Panel, SectionTitle } from '../styles/primitives';
import { formatBytes } from '../utils/file';

const Grid = styled(Panel)`
  display: grid;
  gap: 1rem;
  overflow: hidden;

  @media (min-width: 900px) {
    grid-template-columns: 1.3fr 0.9fr;
    align-items: end;
  }
`;

const HeadingBlock = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const Title = styled(SectionTitle)`
  max-width: 12ch;
`;

const StatsGrid = styled.div`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
`;

const StatCard = styled(motion.div)`
  padding: 1rem;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundStrong};
`;

const StatLabel = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
`;

const StatValue = styled.strong`
  display: block;
  margin-top: 0.35rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.55rem;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

interface HeroPanelProps {
  totalVisible: number;
  totalSelected: number;
  estimatedTotalSize: number;
  unknownSizeCount: number;
  onClearSelection: () => void;
  onDownloadSelected: () => void;
  onSelectAll: () => void;
  isDownloading: boolean;
}

export function HeroPanel({
  totalVisible,
  totalSelected,
  estimatedTotalSize,
  unknownSizeCount,
  onClearSelection,
  onDownloadSelected,
  onSelectAll,
  isDownloading,
}: HeroPanelProps) {
  const { isEstimatingSizes } = useAppContext();

  return (
    <Grid
      as={motion.section}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.28 }}
    >
      <HeadingBlock>
        <Eyebrow>Eulerity Challenge</Eyebrow>
        <Title>Discover, compare, and collect your next favorite pet.</Title>
        <MetaText>
          Responsive browsing, cross-route selection persistence, keyboard-friendly
          controls, cached file-size estimation, and graceful data states are all
          built in.
        </MetaText>
        <ActionRow>
          <Button type="button" onClick={onSelectAll}>
            Select All Results
          </Button>
          <Button type="button" $variant="secondary" onClick={onDownloadSelected} disabled={!totalSelected || isDownloading}>
            {isDownloading ? 'Downloading...' : 'Download Selected'}
          </Button>
          <Button type="button" $variant="ghost" onClick={onClearSelection} disabled={!totalSelected}>
            Clear Selection
          </Button>
        </ActionRow>
      </HeadingBlock>

      <StatsGrid>
        <StatCard layout>
          <StatLabel>Visible results</StatLabel>
          <StatValue>{totalVisible}</StatValue>
          <Badge>Responsive pagination</Badge>
        </StatCard>
        <StatCard layout>
          <StatLabel>Selected pets</StatLabel>
          <StatValue>{totalSelected}</StatValue>
          <Badge>{totalSelected ? 'Selection persists across routes' : 'Ready to curate'}</Badge>
        </StatCard>
        <StatCard layout>
          <StatLabel>Estimated size</StatLabel>
          <StatValue>
            {estimatedTotalSize > 0 ? formatBytes(estimatedTotalSize) : 'Unavailable'}
          </StatValue>
          <Badge>
            {isEstimatingSizes
              ? 'Estimating...'
              : unknownSizeCount > 0
                ? `${unknownSizeCount} pending or unavailable`
                : 'All selected files estimated'}
          </Badge>
        </StatCard>
      </StatsGrid>
    </Grid>
  );
}

