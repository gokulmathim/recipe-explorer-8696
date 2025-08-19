"use client";

import Header from "@/components/Header";
import RecipeGrid from "@/components/RecipeGrid";
import EmptyState from "@/components/EmptyState";
import { getFavorites } from "@/lib/favorites";
import { fetchRecipeById, Recipe } from "@/lib/api";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const [items, setItems] = useState<Recipe[] | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      const ids = getFavorites();
      if (ids.length === 0) {
        if (isMounted) setItems([]);
        return;
      }
      try {
        const results = await Promise.allSettled(ids.map((id) => fetchRecipeById(id)));
        const recipes = results
          .filter((r): r is PromiseFulfilledResult<Recipe> => r.status === "fulfilled")
          .map((r) => r.value);
        if (isMounted) setItems(recipes);
      } catch {
        if (isMounted) setItems([]);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen" style={{ background: "#fff" }}>
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-xl font-semibold mb-4">Your Favorites</h1>
        {items === null ? (
          <div>Loading...</div>
        ) : items.length ? (
          <RecipeGrid items={items} />
        ) : (
          <EmptyState title="No favorites yet" subtitle="Browse recipes and add some favorites!" />
        )}
      </div>
    </main>
  );
}
