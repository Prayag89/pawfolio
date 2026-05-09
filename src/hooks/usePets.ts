import { useState, useEffect, useCallback, useMemo } from 'react';
import { Pet, SortOption, LoadingState, UsePetsReturn } from '../types';

const API_URL = 'https://eulerity-hackathon.appspot.com/pets';

/**
 * usePets — Custom hook for loading and managing pet data.
 *
 * Handles:
 * - Fetching pets from the Eulerity API
 * - Loading, error, and empty states
 * - Client-side search filtering (by title + description)
 * - Client-side sorting (name A-Z/Z-A, date newest/oldest)
 *
 * The hook returns both the filtered/sorted `pets` array and the
 * unfiltered `allPets` array, so consumers can reference the full
 * dataset (e.g. for "Select All visible" vs "Select All").
 */
export function usePets(): UsePetsReturn {
  const [allPets, setAllPets] = useState<Pet[]>([]);
  const [state, setState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');

  /** Fetch pets from the API. Generates stable IDs from URL hashes. */
  const fetchPets = useCallback(async () => {
    setState('loading');
    setError(null);

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Failed to fetch pets (HTTP ${response.status})`);
      }

      const data = await response.json();

      // The API doesn't provide explicit IDs, so we derive one
      // from the image URL to ensure stability across refetches.
      const petsWithIds: Pet[] = data.map((pet: any, index: number) => ({
        ...pet,
        id: pet.id || btoa(pet.url).slice(0, 12) + index,
      }));

      setAllPets(petsWithIds);
      setState(petsWithIds.length === 0 ? 'success' : 'success');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
      setState('error');
    }
  }, []);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  /**
   * Derived state: filter by search query, then sort.
   * Memoized to avoid recalculating on every render.
   */
  const pets = useMemo(() => {
    let filtered = allPets;

    // Search filter — case-insensitive match on title or description
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = allPets.filter(
        (pet) =>
          pet.title.toLowerCase().includes(q) ||
          pet.description.toLowerCase().includes(q)
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'date-newest':
          return (
            new Date(b.created).getTime() - new Date(a.created).getTime()
          );
        case 'date-oldest':
          return (
            new Date(a.created).getTime() - new Date(b.created).getTime()
          );
        default:
          return 0;
      }
    });

    return sorted;
  }, [allPets, searchQuery, sortOption]);

  return {
    pets,
    allPets,
    state,
    error,
    searchQuery,
    sortOption,
    setSearchQuery,
    setSortOption,
    refetch: fetchPets,
  };
}
