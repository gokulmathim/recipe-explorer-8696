"use client";

import Header from "@/components/Header";
import FiltersSidebar from "@/components/FiltersSidebar";
import RecipeGrid from "@/components/RecipeGrid";
import Pagination from "@/components/Pagination";
import EmptyState from "@/components/EmptyState";
import { RecipesSkeleton } from "@/components/Skeletons";
import { fetchRecipes, PaginatedRecipes } from "@/lib/api";
import { UI } from "@/lib/constants";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const params = useSearchParams();
  const [data, setData] = useState<PaginatedRecipes | null>(null);
  const [loading, setLoading] = useState(true);

  // Read filters from URL
  const q = params.get("q") || undefined;
  const cuisine = params.get("cuisine") || undefined;
  const category = params.get("category") || undefined;
  const maxTime = params.get("maxTime") ? Number(params.get("maxTime")) : undefined;
  const tags = useMemo(() => {
    const t = params.getAll("tags");
    return Array.isArray(t) ? t : [];
  }, [params]);
  const page = params.get("page") ? Number(params.get("page")) : 1;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchRecipes({
      q,
      cuisine,
      category,
      maxTime,
      tags,
      page,
      pageSize: UI.pageSize,
    })
      .then((res) => {
        if (isMounted) setData(res);
      })
      .catch(() => {
        if (isMounted) setData({ items: [], total: 0, page: 1, pageSize: UI.pageSize });
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [q, cuisine, category, maxTime, page, tags]);

  return (
    <main className="min-h-screen" style={{ background: "#fff" }}>
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <FiltersSidebar />
          <section className="flex-1">
            {loading ? (
              <RecipesSkeleton />
            ) : data && data.items.length > 0 ? (
              <>
                <RecipeGrid items={data.items} />
                <Pagination page={data.page} pageSize={data.pageSize} total={data.total} />
              </>
            ) : (
              <EmptyState title="No recipes found" subtitle="Try adjusting filters or search." />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
