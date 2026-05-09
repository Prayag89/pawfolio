/**
 * Core type definitions for the Pawfolio application.
 * These types mirror the API response shape from the Eulerity hackathon endpoint.
 */

/** Represents a single pet entity from the API */
export interface Pet {
  id: string;
  url: string;
  title: string;
  description: string;
  created: string;
}

/** Sort options available in the gallery */
export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'date-newest'
  | 'date-oldest';

/** Possible states for async data fetching */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/** Shape of the custom usePets hook return value */
export interface UsePetsReturn {
  pets: Pet[];
  allPets: Pet[];
  state: LoadingState;
  error: string | null;
  searchQuery: string;
  sortOption: SortOption;
  setSearchQuery: (query: string) => void;
  setSortOption: (option: SortOption) => void;
  refetch: () => void;
}

/** Selection context shape for global state management */
export interface SelectionContextType {
  selectedIds: Set<string>;
  toggleSelection: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  isSelected: (id: string) => boolean;
  selectionCount: number;
}
