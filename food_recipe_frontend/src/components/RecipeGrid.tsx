import { Recipe } from "@/lib/api";
import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ items }: { items: Recipe[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
}
