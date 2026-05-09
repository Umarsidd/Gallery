import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { usePets } from '../hooks/usePets';
import { downloadRemoteFile, formatBytes } from '../utils/file';
import { getPetKey } from '../utils/pets';
import { HeroPanel } from '../components/HeroPanel';
import { SearchAndSortBar } from '../components/SearchAndSortBar';
import { SkeletonGrid } from '../components/SkeletonGrid';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { PetGrid } from '../components/PetGrid';
import { PaginationControls } from '../components/PaginationControls';

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
  } = usePets();
  const [isDownloading, setIsDownloading] = useState(false);

  const selectedPets = pets.filter((pet) => selectedIds.includes(getPetKey(pet.id)));
  const estimatedTotalSize = selectedPets.reduce(
    (total, pet) => total + Math.max(estimatedSizes[getPetKey(pet.id)] ?? 0, 0),
    0,
  );
  const unknownSizeCount = selectedPets.filter(
    (pet) => estimatedSizes[getPetKey(pet.id)] == null,
  ).length;

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
    if (filteredPets.length === 0) {
      pushToast('There are no current results to select.', 'info');
      return;
    }

    selectMany(filteredPets.map((pet) => pet.id));
    pushToast(`Selected ${filteredPets.length} pet(s).`, 'success');
  }

  function handleClearSelection() {
    clearSelection();
    pushToast('Selection cleared.', 'info');
  }

  return (
    <motion.section
      key="gallery-page"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22 }}
    >
      <HeroPanel
        totalVisible={filteredPets.length}
        totalSelected={totalSelected}
        estimatedTotalSize={estimatedTotalSize}
        unknownSizeCount={unknownSizeCount}
        onClearSelection={handleClearSelection}
        onDownloadSelected={handleDownloadSelected}
        onSelectAll={handleSelectAll}
        isDownloading={isDownloading}
      />

      <SearchAndSortBar
        query={query}
        onQueryChange={setQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {loading ? <SkeletonGrid /> : null}
      {!loading && error ? <ErrorState message={error} onRetry={refreshPets} /> : null}
      {!loading && isEmpty ? (
        <EmptyState
          title="No pets were returned."
          description="The API responded successfully, but the gallery is empty right now."
          actionLabel="Reload gallery"
          onAction={() => {
            void refreshPets();
          }}
        />
      ) : null}
      {!loading && isEmptyResults ? (
        <EmptyState
          title="No pets match this search."
          description="Try a different search term or change the sort to reveal more matches."
          actionLabel="Clear search"
          onAction={() => setQuery('')}
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
    </motion.section>
  );
}

