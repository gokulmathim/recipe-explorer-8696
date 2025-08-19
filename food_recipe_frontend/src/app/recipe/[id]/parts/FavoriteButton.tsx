"use client";

import { isFavorite, toggleFavorite } from "@/lib/favorites";
import { useEffect, useState } from "react";
import { COLORS } from "@/lib/constants";

export default function FavoriteButton({ id }: { id: string }) {
  const [fav, setFav] = useState(false);
  useEffect(() => {
    setFav(isFavorite(id));
  }, [id]);
  const onClick = () => {
    const updated = toggleFavorite(id);
    setFav(updated.includes(id));
  };
  return (
    <button
      onClick={onClick}
      className="rounded-md px-3 py-2 text-sm font-medium"
      style={{ background: fav ? COLORS.accent : `${COLORS.accent}15`, color: fav ? "#fff" : COLORS.accent }}
    >
      {fav ? "♥ Favorited" : "♡ Add Favorite"}
    </button>
  );
}
