import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useDebouncedValue } from './useDebouncedValue';
import type { SortOption } from '../types/pet';
import { sortPets } from '../utils/pets';

const PAGE_SIZE = 8;

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
  const debouncedQuery = useDebouncedValue(query, 350);
  const normalizedQuery = debouncedQuery.trim().toLowerCase();

  const filteredPets = pets.filter((pet) => {
    if (!normalizedQuery) {
      return true;
    }

    return (
      pet.title.toLowerCase().includes(normalizedQuery) ||
      pet.description.toLowerCase().includes(normalizedQuery)
    );
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
  }, [normalizedQuery, sortBy]);

  function goToPage(page: number) {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function selectAllFiltered() {
    selectMany(sortedPets.map((pet) => pet.id));
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
  };
}

