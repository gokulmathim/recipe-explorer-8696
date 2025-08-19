import type { Metadata, ResolvingMetadata } from "next";
import { fetchRecipeById } from "@/lib/api";

// PUBLIC_INTERFACE
export async function generateMetadata(
  { params }: { params: { id: string } },
  _parent?: ResolvingMetadata
): Promise<Metadata> {
  /** Generate dynamic metadata for recipe details page. */
  try {
    const recipe = await fetchRecipeById(params.id);
    return {
      title: `${recipe.title} • Recipe Explorer`,
      description: recipe.description || `View details for ${recipe.title}`,
      openGraph: {
        title: `${recipe.title} • Recipe Explorer`,
        description: recipe.description || "",
        images: recipe.imageUrl ? [{ url: recipe.imageUrl }] : undefined,
      },
    };
  } catch {
    return {
      title: "Recipe • Recipe Explorer",
      description: "Recipe details",
    };
  }
}
