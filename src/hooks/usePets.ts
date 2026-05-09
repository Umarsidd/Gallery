import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useDebouncedValue } from './useDebouncedValue';
import type { SortOption } from '../types/pet';
import { sortPets } from '../utils/pets';
import {
  buildCategoryCounts,
  inferPetCategory,
  type PetCategory,
  type RecencyFilter,
  type SelectionFilter,
} from '../utils/petPresentation';

const PAGE_SIZE = 12;

export function usePets() {
  const {
    pets,
    loading,
    error,
    refreshPets,
    selectedIds,
    selectMany,
    clearSelection,
  } = useAppContext();
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategories, setActiveCategories] = useState<PetCategory[]>([]);
  const [selectionFilter, setSelectionFilter] = useState<SelectionFilter>('all');
  const [recencyFilter, setRecencyFilter] = useState<RecencyFilter>('all');
  const debouncedQuery = useDebouncedValue(query, 350);
  const normalizedQuery = debouncedQuery.trim().toLowerCase();
  const newestTimestamp = pets.reduce((latest, pet) => {
    const timestamp = new Date(pet.created_at).getTime();
    return Number.isNaN(timestamp) ? latest : Math.max(latest, timestamp);
  }, 0);
  const freshThreshold = newestTimestamp - 1000 * 60 * 60 * 24 * 180;

  const filteredPets = pets.filter((pet) => {
    const matchesQuery =
      !normalizedQuery ||
      pet.title.toLowerCase().includes(normalizedQuery) ||
      pet.description.toLowerCase().includes(normalizedQuery);
    const matchesCategory =
      activeCategories.length === 0 ||
      activeCategories.includes(inferPetCategory(pet));
    const petKey = String(pet.id);
    const matchesSelection =
      selectionFilter === 'all' ||
      (selectionFilter === 'selected' && selectedIds.includes(petKey)) ||
      (selectionFilter === 'unselected' && !selectedIds.includes(petKey));
    const petTimestamp = new Date(pet.created_at).getTime();
    const matchesRecency =
      recencyFilter === 'all' ||
      (recencyFilter === 'fresh' && petTimestamp >= freshThreshold) ||
      (recencyFilter === 'classic' && petTimestamp < freshThreshold);

    return matchesQuery && matchesCategory && matchesSelection && matchesRecency;
  });

  const sortedPets = sortPets(filteredPets, sortBy);
  const totalPages = Math.max(1, Math.ceil(sortedPets.length / PAGE_SIZE));
  const currentSafePage = Math.min(currentPage, totalPages);
  const visiblePets = sortedPets.slice(
    (currentSafePage - 1) * PAGE_SIZE,
    currentSafePage * PAGE_SIZE,
  );
  const hasPets = pets.length > 0;
  const isEmpty = !loading && !error && !hasPets;
  const isEmptyResults = !loading && !error && hasPets && sortedPets.length === 0;

  useEffect(() => {
    setCurrentPage(1);
  }, [normalizedQuery, sortBy, activeCategories, selectionFilter, recencyFilter]);

  function goToPage(page: number) {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function selectAllFiltered() {
    selectMany(sortedPets.map((pet) => pet.id));
  }

  function toggleCategory(category: PetCategory) {
    setActiveCategories((current) =>
      current.includes(category)
        ? current.filter((value) => value !== category)
        : [...current, category],
    );
  }

  function clearFilters() {
    setActiveCategories([]);
    setSelectionFilter('all');
    setRecencyFilter('all');
    setQuery('');
  }

  return {
    loading,
    error,
    refreshPets,
    query,
    setQuery,
    sortBy,
    setSortBy,
    currentPage: currentSafePage,
    totalPages,
    visiblePets,
    filteredPets: sortedPets,
    isEmpty,
    isEmptyResults,
    hasSelection: selectedIds.length > 0,
    totalSelected: selectedIds.length,
    clearSelection,
    selectAllFiltered,
    goToPage,
    activeCategories,
    toggleCategory,
    selectionFilter,
    setSelectionFilter,
    recencyFilter,
    setRecencyFilter,
    clearFilters,
    categoryCounts: buildCategoryCounts(pets),
    appliedFilterCount:
      activeCategories.length +
      (selectionFilter === 'all' ? 0 : 1) +
      (recencyFilter === 'all' ? 0 : 1) +
      (normalizedQuery ? 1 : 0),
  };
}
