"use client";

import { Recipe } from "@/lib/api";
import { COLORS } from "@/lib/constants";
import Link from "next/link";
import { isFavorite, toggleFavorite } from "@/lib/favorites";
import { useEffect, useState } from "react";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(recipe.id));
  }, [recipe.id]);

  const onToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    const updated = toggleFavorite(recipe.id);
    setFav(updated.includes(recipe.id));
  };

  return (
    <Link
      href={`/recipe/${encodeURIComponent(recipe.id)}`}
      className="group block rounded-lg border overflow-hidden hover:shadow-md transition-shadow"
      style={{ borderColor: COLORS.border, background: COLORS.cardBg }}
    >
      <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
        {recipe.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-sm text-gray-400">No Image</div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold leading-snug" style={{ color: COLORS.text }}>
            {recipe.title}
          </h3>
          <button
            aria-label={fav ? "Remove from favorites" : "Add to favorites"}
            onClick={onToggle}
            className="shrink-0 rounded-md px-2 py-1 text-xs border"
            style={{
              color: fav ? "white" : COLORS.accent,
              background: fav ? COLORS.accent : `${COLORS.accent}15`,
              borderColor: fav ? COLORS.accent : COLORS.accent,
            }}
          >
            {fav ? "♥" : "♡"}
          </button>
        </div>
        <div className="mt-2 text-xs" style={{ color: COLORS.subtleText }}>
          {(recipe.cuisine || "General")} • {recipe.cookingTimeMinutes ? `${recipe.cookingTimeMinutes} min` : "—"}
        </div>
      </div>
    </Link>
  );
}
