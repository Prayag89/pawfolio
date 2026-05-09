import React, { createContext, useContext, useState, useCallback } from 'react';
import { SelectionContextType } from '../types';

/**
 * SelectionContext — Manages global image selection state.
 *
 * Why Context over Redux?
 * The selection state is simple (a Set of IDs) and only consumed
 * by a handful of components. Context avoids the boilerplate of
 * Redux while still providing persistence across route changes,
 * since the Provider wraps the entire Router.
 */

const SelectionContext = createContext<SelectionContextType | undefined>(
  undefined
);

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  /** Toggle a single pet in/out of the selection */
  const toggleSelection = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  /** Select all pets from a given list of IDs */
  const selectAll = useCallback((ids: string[]) => {
    setSelectedIds(new Set(ids));
  }, []);

  /** Clear the entire selection */
  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  /** Check if a specific pet is selected */
  const isSelected = useCallback(
    (id: string) => selectedIds.has(id),
    [selectedIds]
  );

  return (
    <SelectionContext.Provider
      value={{
        selectedIds,
        toggleSelection,
        selectAll,
        clearSelection,
        isSelected,
        selectionCount: selectedIds.size,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

/** Custom hook for consuming selection context with safety check */
export function useSelection(): SelectionContextType {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
}
