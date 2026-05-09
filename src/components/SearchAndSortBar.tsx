import styled from 'styled-components';
import { Button, Input, MetaText, Panel, Select } from '../styles/primitives';
import type { SortOption } from '../types/pet';
import { formatBytes } from '../utils/file';

const Controls = styled(Panel)`
  display: grid;
  gap: 1rem;

  @media (min-width: 980px) {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: start;
  }
`;

const Intro = styled.div`
  display: grid;
  gap: 0.55rem;
`;

const Breadcrumbs = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
`;

const HeadingRow = styled.div`
  display: grid;
  gap: 0.75rem;

  @media (min-width: 840px) {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
  }
`;

const ControlsRow = styled.div`
  display: grid;
  gap: 0.8rem;

  @media (min-width: 840px) {
    grid-template-columns: minmax(0, 1.3fr) 220px;
    align-items: end;
  }
`;

const FieldBlock = styled.label`
  display: grid;
  gap: 0.45rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
  font-weight: 700;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  justify-content: flex-start;

  @media (min-width: 840px) {
    justify-content: flex-end;
  }
`;

const Stats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
`;

interface SearchAndSortBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  totalResults: number;
  totalSelected: number;
  estimatedTotalSize: number;
  isDownloading: boolean;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onDownloadSelected: () => void;
}

export function SearchAndSortBar({
  query,
  onQueryChange,
  sortBy,
  onSortChange,
  totalResults,
  totalSelected,
  estimatedTotalSize,
  isDownloading,
  onSelectAll,
  onClearSelection,
  onDownloadSelected,
}: SearchAndSortBarProps) {
  return (
    <Controls>
      <Intro>
        <Breadcrumbs>Home &gt; Pet Store &gt; Companion Picks</Breadcrumbs>
        <HeadingRow>
          <div>
            <strong>Pet Collection</strong>{' '}
            <MetaText as="span">
              ({totalResults} result{totalResults === 1 ? '' : 's'})
            </MetaText>
          </div>
          <Stats>
            <span>{totalSelected} selected</span>
            <span>
              Estimated download:{' '}
              {estimatedTotalSize > 0 ? formatBytes(estimatedTotalSize) : 'Unavailable'}
            </span>
          </Stats>
        </HeadingRow>
        <MetaText>
          Clean product-style browsing with separate filters, marketplace-inspired
          spacing, and persistent multi-selection across the gallery.
        </MetaText>
        <ControlsRow>
          <FieldBlock>
            Search pets
            <Input
              type="search"
              value={query}
              placeholder="Search for pets, titles and descriptions"
              onChange={(event) => onQueryChange(event.target.value)}
              aria-label="Search pets by title or description"
            />
          </FieldBlock>

          <FieldBlock>
            Sort by
            <Select
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value as SortOption)}
              aria-label="Sort pets"
            >
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="date-desc">Date Newest First</option>
              <option value="date-asc">Date Oldest First</option>
            </Select>
          </FieldBlock>
        </ControlsRow>
      </Intro>

      <ActionRow>
        <Button type="button" onClick={onSelectAll}>
          Select Visible
        </Button>
        <Button type="button" $variant="ghost" onClick={onClearSelection} disabled={!totalSelected}>
          Clear
        </Button>
        <Button
          type="button"
          $variant="secondary"
          onClick={onDownloadSelected}
          disabled={!totalSelected || isDownloading}
        >
          {isDownloading ? 'Downloading...' : 'Download'}
        </Button>
      </ActionRow>
    </Controls>
  );
}
