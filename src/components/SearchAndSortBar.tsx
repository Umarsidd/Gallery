import styled from 'styled-components';
import { Input, Panel, Select } from '../styles/primitives';
import type { SortOption } from '../types/pet';

const Controls = styled(Panel)`
  display: grid;
  gap: 0.85rem;

  @media (min-width: 760px) {
    grid-template-columns: 1.5fr 0.7fr;
    align-items: center;
  }
`;

const FieldBlock = styled.label`
  display: grid;
  gap: 0.45rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
  font-weight: 700;
`;

interface SearchAndSortBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}

export function SearchAndSortBar({
  query,
  onQueryChange,
  sortBy,
  onSortChange,
}: SearchAndSortBarProps) {
  return (
    <Controls>
      <FieldBlock>
        Search pets
        <Input
          type="search"
          value={query}
          placeholder="Search by title or description"
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
    </Controls>
  );
}

