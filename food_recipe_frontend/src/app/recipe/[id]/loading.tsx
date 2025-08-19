import { RecipesSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
        <RecipesSkeleton />
      </div>
    </main>
  );
}
