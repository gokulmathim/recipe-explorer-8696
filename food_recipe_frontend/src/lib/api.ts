"use client";

/**
 * API client for the food recipe backend.
 * Uses REST endpoints to fetch recipes, details, and supports search/filter queries.
 * Base URL is provided via environment variable NEXT_PUBLIC_API_BASE_URL.
 */

export type Recipe = {
  id: string;
  title: string;
  imageUrl?: string;
  description?: string;
  ingredients?: string[];
  instructions?: string[];
  cuisine?: string;
  category?: string;
  cookingTimeMinutes?: number;
  servings?: number;
  tags?: string[];
  rating?: number;
};

export type RecipeQuery = {
  q?: string;
  cuisine?: string;
  category?: string;
  maxTime?: number;
  tags?: string[];
  page?: number;
  pageSize?: number;
};

export type PaginatedRecipes = {
  items: Recipe[];
  total: number;
  page: number;
  pageSize: number;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

/**
 * Build query string from RecipeQuery.
 */
function buildQuery(params: RecipeQuery): string {
  const searchParams = new URLSearchParams();
  if (params.q) searchParams.set("q", params.q);
  if (params.cuisine) searchParams.set("cuisine", params.cuisine);
  if (params.category) searchParams.set("category", params.category);
  if (typeof params.maxTime === "number") searchParams.set("maxTime", String(params.maxTime));
  if (params.tags && params.tags.length) params.tags.forEach((t) => searchParams.append("tags", t));
  searchParams.set("page", String(params.page ?? 1));
  searchParams.set("pageSize", String(params.pageSize ?? 24));
  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
}

// PUBLIC_INTERFACE
export async function fetchRecipes(params: RecipeQuery = {}): Promise<PaginatedRecipes> {
  /** Fetch a paginated list of recipes using filters/search. */
  const res = await fetch(`${API_BASE}/recipes${buildQuery(params)}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch recipes: ${res.status}`);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function fetchRecipeById(id: string): Promise<Recipe> {
  /** Fetch a single recipe details by ID. */
  const res = await fetch(`${API_BASE}/recipes/${encodeURIComponent(id)}`, {
    next: { revalidate: 120 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch recipe: ${res.status}`);
  }
  return res.json();
}
