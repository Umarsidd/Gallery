import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useAppContext } from '../context/AppContext';
import { usePets } from '../hooks/usePets';
import { downloadRemoteFile } from '../utils/file';
import { getPetKey } from '../utils/pets';
import { MarketplaceFilters } from '../components/MarketplaceFilters';
import { SearchAndSortBar } from '../components/SearchAndSortBar';
import { SkeletonGrid } from '../components/SkeletonGrid';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { PetGrid } from '../components/PetGrid';
import { PaginationControls } from '../components/PaginationControls';

const Layout = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 1080px) {
    grid-template-columns: 280px minmax(0, 1fr);
    align-items: start;
  }
`;

const ResultsColumn = styled.div`
  display: grid;
  gap: 1rem;
`;

export function GalleryPage() {
  const {
    selectedIds,
    toggleSelection,
    clearSelection,
    pets,
    pushToast,
    estimatedSizes,
    selectMany,
  } = useAppContext();
  const {
    loading,
    error,
    refreshPets,
    query,
    setQuery,
    sortBy,
    setSortBy,
    currentPage,
    totalPages,
    visiblePets,
    filteredPets,
    isEmpty,
    isEmptyResults,
    totalSelected,
    goToPage,
    activeCategories,
    toggleCategory,
    selectionFilter,
    setSelectionFilter,
    recencyFilter,
    setRecencyFilter,
    clearFilters,
    categoryCounts,
    appliedFilterCount,
  } = usePets();
  const [isDownloading, setIsDownloading] = useState(false);

  const selectedPets = pets.filter((pet) => selectedIds.includes(getPetKey(pet.id)));
  const estimatedTotalSize = selectedPets.reduce(
    (total, pet) => total + Math.max(estimatedSizes[getPetKey(pet.id)] ?? 0, 0),
    0,
  );

  async function handleDownloadSelected() {
    if (selectedPets.length === 0) {
      pushToast('Select at least one pet before downloading.', 'info');
      return;
    }

    setIsDownloading(true);
    pushToast(`Preparing ${selectedPets.length} image download(s)...`, 'info');

    const results = await Promise.allSettled(
      selectedPets.map((pet) => downloadRemoteFile(pet.image_url, `${pet.title}-${pet.id}`)),
    );

    const failedCount = results.filter((result) => result.status === 'rejected').length;

    if (failedCount > 0) {
      pushToast(`${failedCount} file(s) could not be downloaded.`, 'error');
    } else {
      pushToast('Selected images downloaded successfully.', 'success');
    }

    setIsDownloading(false);
  }

  function handleSelectAll() {
    if (visiblePets.length === 0) {
      pushToast('There are no current results to select.', 'info');
      return;
    }

    selectMany(visiblePets.map((pet) => pet.id));
    pushToast(`Selected ${visiblePets.length} visible pet(s).`, 'success');
  }

  function handleClearSelection() {
    clearSelection();
    pushToast('Selection cleared.', 'info');
  }

  return (
    <motion.section
      key="gallery-page"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22 }}
    >
      <Layout>
        <MarketplaceFilters
          activeCategories={activeCategories}
          categoryCounts={categoryCounts}
          onToggleCategory={toggleCategory}
          selectionFilter={selectionFilter}
          onSelectionFilterChange={setSelectionFilter}
          recencyFilter={recencyFilter}
          onRecencyFilterChange={setRecencyFilter}
          onClearFilters={clearFilters}
          appliedFilterCount={appliedFilterCount}
        />

        <ResultsColumn>
          <SearchAndSortBar
            query={query}
            onQueryChange={setQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalResults={filteredPets.length}
            totalSelected={totalSelected}
            estimatedTotalSize={estimatedTotalSize}
            isDownloading={isDownloading}
            onSelectAll={handleSelectAll}
            onClearSelection={handleClearSelection}
            onDownloadSelected={handleDownloadSelected}
          />

          {loading ? <SkeletonGrid /> : null}
          {!loading && error ? <ErrorState message={error} onRetry={refreshPets} /> : null}
          {!loading && isEmpty ? (
            <EmptyState
              title="No pets were returned."
              description="The API responded successfully, but the store is empty right now."
              actionLabel="Reload gallery"
              onAction={() => {
                void refreshPets();
              }}
            />
          ) : null}
          {!loading && isEmptyResults ? (
            <EmptyState
              title="No pets match the current filters."
              description="Try removing a sidebar filter, changing the search query, or resetting the current view."
              actionLabel="Reset filters"
              onAction={clearFilters}
            />
          ) : null}
          {!loading && !error && !isEmpty && !isEmptyResults ? (
            <>
              <PetGrid
                pets={visiblePets}
                selectedIds={selectedIds}
                onToggleSelection={toggleSelection}
              />
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            </>
          ) : null}
        </ResultsColumn>
      </Layout>
    </motion.section>
  );
}
