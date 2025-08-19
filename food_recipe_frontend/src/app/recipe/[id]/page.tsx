import { fetchRecipeById } from "@/lib/api";
import { COLORS } from "@/lib/constants";
import FavoriteButton from "./parts/FavoriteButton";
import Link from "next/link";

type Props = {
  params: { id: string };
};

export default async function RecipeDetailPage({ params }: Props) {
  const recipe = await fetchRecipeById(params.id);

  return (
    <main className="min-h-screen" style={{ background: "#fff" }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/" className="text-sm" style={{ color: COLORS.primary }}>
          ← Back to browse
        </Link>

        <div className="mt-4 grid md:grid-cols-2 gap-6">
          <div className="rounded-lg overflow-hidden border" style={{ borderColor: "#e5e7eb" }}>
            {recipe.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
            ) : (
              <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center text-sm text-gray-400">No Image</div>
            )}
          </div>
          <div>
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl font-semibold" style={{ color: COLORS.text }}>{recipe.title}</h1>
              <FavoriteButton id={recipe.id} />
            </div>
            <div className="mt-2 text-sm" style={{ color: "#6b7280" }}>
              {(recipe.cuisine || "General")} • {recipe.category || "Uncategorized"} •{" "}
              {recipe.cookingTimeMinutes ? `${recipe.cookingTimeMinutes} min` : "—"}
            </div>
            {recipe.description ? (
              <p className="mt-4 text-sm" style={{ color: COLORS.text }}>{recipe.description}</p>
            ) : null}

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-base font-semibold mb-2" style={{ color: COLORS.text }}>Ingredients</h2>
                <ul className="list-disc pl-5 space-y-1 text-sm" style={{ color: COLORS.text }}>
                  {recipe.ingredients?.length
                    ? recipe.ingredients.map((i, idx) => <li key={idx}>{i}</li>)
                    : <li>No ingredients provided.</li>}
                </ul>
              </div>
              <div>
                <h2 className="text-base font-semibold mb-2" style={{ color: COLORS.text }}>Instructions</h2>
                <ol className="list-decimal pl-5 space-y-2 text-sm" style={{ color: COLORS.text }}>
                  {recipe.instructions?.length
                    ? recipe.instructions.map((i, idx) => <li key={idx}>{i}</li>)
                    : <li>No instructions provided.</li>}
                </ol>
              </div>
            </div>

            {recipe.tags?.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {recipe.tags.map((t) => (
                  <span key={t} className="px-2 py-1 text-xs rounded-full border" style={{ borderColor: "#e5e7eb", color: "#6b7280" }}>
                    #{t}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
