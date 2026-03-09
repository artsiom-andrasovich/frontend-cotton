"use client";

import { useCallback, useState } from "react";

export function useSelectCards() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isSelecting, setIsSelecting] = useState(false);

  const enterSelectionMode = useCallback((id: string) => {
    setIsSelecting(true);
    setSelectedIds(new Set([id]));
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      // Exit selection mode if nothing selected
      if (next.size === 0) {
        setIsSelecting(false);
      }
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
    setIsSelecting(false);
  }, []);

  const selectAll = useCallback((ids: string[]) => {
    setSelectedIds(new Set(ids));
  }, []);

  return {
    selectedIds,
    isSelecting,
    enterSelectionMode,
    toggleSelect,
    clearSelection,
    selectAll,
  };
}
