import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getPets } from '../api/pets';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Pet, ToastMessage } from '../types/pet';
import { estimateRemoteFileSize } from '../utils/file';
import { getPetKey } from '../utils/pets';

type ThemeMode = 'light' | 'dark';

interface AppContextValue {
  pets: Pet[];
  loading: boolean;
  error: string | null;
  refreshPets: () => Promise<void>;
  selectedIds: string[];
  isSelected: (petId: Pet['id']) => boolean;
  toggleSelection: (petId: Pet['id']) => void;
  selectMany: (petIds: Array<Pet['id']>) => void;
  clearSelection: () => void;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  toasts: ToastMessage[];
  pushToast: (message: string, tone?: ToastMessage['tone']) => void;
  estimatedSizes: Record<string, number | null>;
  isEstimatingSizes: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

const TOAST_TIMEOUT_MS = 3200;

export function AppProvider({ children }: PropsWithChildren) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useLocalStorage<string[]>(
    'gallery:selected-pets',
    [],
  );
  const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>(
    'gallery:theme-mode',
    'light',
  );
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [estimatedSizes, setEstimatedSizes] = useLocalStorage<
    Record<string, number | null>
  >('gallery:file-size-cache', {});
  const [isEstimatingSizes, setIsEstimatingSizes] = useState(false);

  async function refreshPets() {
    setLoading(true);
    setError(null);

    try {
      const nextPets = await getPets();
      setPets(nextPets);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : 'Something went wrong while loading pets.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refreshPets();
  }, []);

  useEffect(() => {
    const knownIds = new Set(pets.map((pet) => getPetKey(pet.id)));
    const nextSelectedIds = selectedIds.filter((id) => knownIds.has(id));

    if (nextSelectedIds.length !== selectedIds.length) {
      setSelectedIds(nextSelectedIds);
    }
  }, [pets, selectedIds, setSelectedIds]);

  useEffect(() => {
    const pendingPets = pets.filter((pet) => {
      const petId = getPetKey(pet.id);
      return selectedIds.includes(petId) && !(petId in estimatedSizes);
    });

    if (pendingPets.length === 0) {
      return;
    }

    let isCancelled = false;
    setIsEstimatingSizes(true);

    void Promise.all(
      pendingPets.map(async (pet) => ({
        id: getPetKey(pet.id),
        size: await estimateRemoteFileSize(pet.image_url),
      })),
    )
      .then((results) => {
        if (isCancelled) {
          return;
        }

        setEstimatedSizes((current) => {
          const next = { ...current };

          for (const result of results) {
            next[result.id] = result.size;
          }

          return next;
        });
      })
      .finally(() => {
        if (!isCancelled) {
          setIsEstimatingSizes(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [estimatedSizes, pets, selectedIds, setEstimatedSizes]);

  function pushToast(message: string, tone: ToastMessage['tone'] = 'info') {
    const id = Date.now() + Math.floor(Math.random() * 1000);

    setToasts((current) => [...current, { id, message, tone }]);

    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, TOAST_TIMEOUT_MS);
  }

  function isSelected(petId: Pet['id']) {
    return selectedIds.includes(getPetKey(petId));
  }

  function toggleSelection(petId: Pet['id']) {
    const key = getPetKey(petId);

    setSelectedIds((current) =>
      current.includes(key)
        ? current.filter((value) => value !== key)
        : [...current, key],
    );
  }

  function selectMany(petIds: Array<Pet['id']>) {
    const nextIds = petIds.map((petId) => getPetKey(petId));

    setSelectedIds((current) => Array.from(new Set([...current, ...nextIds])));
  }

  function clearSelection() {
    setSelectedIds([]);
  }

  function toggleTheme() {
    setThemeMode((current) => (current === 'light' ? 'dark' : 'light'));
  }

  return (
    <AppContext.Provider
      value={{
        pets,
        loading,
        error,
        refreshPets,
        selectedIds,
        isSelected,
        toggleSelection,
        selectMany,
        clearSelection,
        themeMode,
        toggleTheme,
        toasts,
        pushToast,
        estimatedSizes,
        isEstimatingSizes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider');
  }

  return context;
}

