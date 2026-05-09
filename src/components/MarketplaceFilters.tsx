import styled from 'styled-components';
import {
  Button,
  Divider,
  MetaText,
  Panel,
  SectionTitle,
} from '../styles/primitives';
import type {
  PetCategory,
  RecencyFilter,
  SelectionFilter,
} from '../utils/petPresentation';

const Sidebar = styled.aside`
  display: grid;
  gap: 0;
  align-self: start;
  position: sticky;
  top: 108px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const FilterTitle = styled(SectionTitle)`
  font-size: 1.45rem;
`;

const Section = styled.section`
  display: grid;
  gap: 0.8rem;
  padding: 1rem 0;
`;

const Label = styled.h3`
  margin: 0;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
`;

const Checkbox = styled.input`
  accent-color: ${({ theme }) => theme.colors.primary};
`;

const OptionCount = styled.span`
  margin-left: auto;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.88rem;
`;

const TextButton = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  padding: 0;
`;

interface MarketplaceFiltersProps {
  activeCategories: PetCategory[];
  categoryCounts: Record<PetCategory, number>;
  onToggleCategory: (category: PetCategory) => void;
  selectionFilter: SelectionFilter;
  onSelectionFilterChange: (value: SelectionFilter) => void;
  recencyFilter: RecencyFilter;
  onRecencyFilterChange: (value: RecencyFilter) => void;
  onClearFilters: () => void;
  appliedFilterCount: number;
}

export function MarketplaceFilters({
  activeCategories,
  categoryCounts,
  onToggleCategory,
  selectionFilter,
  onSelectionFilterChange,
  recencyFilter,
  onRecencyFilterChange,
  onClearFilters,
  appliedFilterCount,
}: MarketplaceFiltersProps) {
  const categoryOptions: PetCategory[] = [
    'Dogs',
    'Cats',
    'Paired Pets',
    'Small Pets',
    'Other Pets',
  ];

  return (
    <Sidebar>
      <Panel>
        <Header>
          <FilterTitle>Filters</FilterTitle>
          {appliedFilterCount > 0 ? (
            <TextButton type="button" onClick={onClearFilters}>
              Clear all
            </TextButton>
          ) : null}
        </Header>

        <Section>
          <Label>Categories</Label>
          {categoryOptions.map((category) => (
            <CheckboxRow key={category}>
              <Checkbox
                type="checkbox"
                checked={activeCategories.includes(category)}
                onChange={() => onToggleCategory(category)}
              />
              {category}
              <OptionCount>{categoryCounts[category]}</OptionCount>
            </CheckboxRow>
          ))}
        </Section>

        <Divider />

        <Section>
          <Label>Selection</Label>
          <CheckboxRow>
            <Checkbox
              type="radio"
              name="selection-filter"
              checked={selectionFilter === 'all'}
              onChange={() => onSelectionFilterChange('all')}
            />
            All pets
          </CheckboxRow>
          <CheckboxRow>
            <Checkbox
              type="radio"
              name="selection-filter"
              checked={selectionFilter === 'selected'}
              onChange={() => onSelectionFilterChange('selected')}
            />
            Selected only
          </CheckboxRow>
          <CheckboxRow>
            <Checkbox
              type="radio"
              name="selection-filter"
              checked={selectionFilter === 'unselected'}
              onChange={() => onSelectionFilterChange('unselected')}
            />
            Not selected
          </CheckboxRow>
        </Section>

        <Divider />

        <Section>
          <Label>Uploaded</Label>
          <CheckboxRow>
            <Checkbox
              type="radio"
              name="recency-filter"
              checked={recencyFilter === 'all'}
              onChange={() => onRecencyFilterChange('all')}
            />
            All uploads
          </CheckboxRow>
          <CheckboxRow>
            <Checkbox
              type="radio"
              name="recency-filter"
              checked={recencyFilter === 'fresh'}
              onChange={() => onRecencyFilterChange('fresh')}
            />
            Fresh arrivals
          </CheckboxRow>
          <CheckboxRow>
            <Checkbox
              type="radio"
              name="recency-filter"
              checked={recencyFilter === 'classic'}
              onChange={() => onRecencyFilterChange('classic')}
            />
            Earlier uploads
          </CheckboxRow>
        </Section>

        <Divider />

        <Section>
          <Label>Need help?</Label>
          <MetaText>
            Search works across pet names and descriptions, so it pairs well with
            the sidebar filters above.
          </MetaText>
          <Button type="button" $variant="ghost" onClick={onClearFilters}>
            Reset all filters
          </Button>
        </Section>
      </Panel>
    </Sidebar>
  );
}
