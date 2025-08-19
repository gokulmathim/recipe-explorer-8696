"use client";

/**
 * Local favorites management with localStorage.
 * Stores an array of recipe IDs.
 */

const KEY = "recipe_favorites_v1";

// PUBLIC_INTERFACE
export function getFavorites(): string[] {
  /** Get current list of favorite recipe IDs. */
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export function isFavorite(id: string): boolean {
  /** Check if a recipe ID is favorited. */
  return getFavorites().includes(id);
}

// PUBLIC_INTERFACE
export function toggleFavorite(id: string): string[] {
  /** Toggle favorite state for an ID and return updated list. */
  const current = new Set(getFavorites());
  if (current.has(id)) {
    current.delete(id);
  } else {
    current.add(id);
  }
  const updated = Array.from(current);
  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}
