"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { COLORS } from "@/lib/constants";

const CUISINES = ["All", "Italian", "Mexican", "Indian", "Chinese", "American", "Mediterranean"];
const CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Drink"];
const TAGS = ["vegetarian", "vegan", "gluten-free", "keto", "paleo", "low-carb", "quick"];

export default function FiltersSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Derive current params safely
  const derived = useMemo(() => {
    const c = searchParams.get("cuisine") || "All";
    const cat = searchParams.get("category") || "All";
    const mt = searchParams.get("maxTime") || "";
    const t = searchParams.getAll("tags");
    return {
      cuisine: c,
      category: cat,
      maxTime: mt,
      tags: Array.isArray(t) ? t : [],
    };
  }, [searchParams]);

  // Local UI state mirrors URL params
  const [cuisine, setCuisine] = useState<string>(derived.cuisine);
  const [category, setCategory] = useState<string>(derived.category);
  const [maxTime, setMaxTime] = useState<string>(derived.maxTime);
  const [tags, setTags] = useState<string[]>(derived.tags);

  // Keep state in sync when URL changes
  useEffect(() => {
    setCuisine(derived.cuisine);
    setCategory(derived.category);
    setMaxTime(derived.maxTime);
    setTags(derived.tags);
  }, [derived]);

  const apply = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (cuisine && cuisine !== "All") params.set("cuisine", cuisine);
    else params.delete("cuisine");

    if (category && category !== "All") params.set("category", category);
    else params.delete("category");

    if (maxTime) params.set("maxTime", maxTime);
    else params.delete("maxTime");

    params.delete("tags");
    tags.forEach((t) => params.append("tags", t));

    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  const toggleTag = (t: string) => {
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  const clear = () => {
    router.push("/");
  };

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="sticky top-4 rounded-lg border p-4 space-y-4"
           style={{ borderColor: COLORS.border, background: COLORS.cardBg }}>
        <h2 className="text-base font-semibold" style={{ color: COLORS.text }}>
          Filters
        </h2>

        <div>
          <label className="text-sm block mb-1" style={{ color: COLORS.subtleText }}>Cuisine</label>
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="w-full border rounded-md px-2 py-2 text-sm"
            style={{ borderColor: COLORS.border, color: COLORS.text, background: COLORS.bg }}
          >
            {CUISINES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm block mb-1" style={{ color: COLORS.subtleText }}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-md px-2 py-2 text-sm"
            style={{ borderColor: COLORS.border, color: COLORS.text, background: COLORS.bg }}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm block mb-1" style={{ color: COLORS.subtleText }}>Max time (min)</label>
          <input
            type="number"
            min={0}
            placeholder="e.g. 30"
            value={maxTime}
            onChange={(e) => setMaxTime(e.target.value)}
            className="w-full border rounded-md px-2 py-2 text-sm"
            style={{ borderColor: COLORS.border, color: COLORS.text, background: COLORS.bg }}
          />
        </div>

        <div>
          <div className="text-sm mb-2" style={{ color: COLORS.subtleText }}>Tags</div>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((t) => {
              const active = tags.includes(t);
              return (
                <button
                  type="button"
                  key={t}
                  onClick={() => toggleTag(t)}
                  className="px-2 py-1 rounded-full text-xs border"
                  style={{
                    borderColor: active ? COLORS.accent : COLORS.border,
                    background: active ? `${COLORS.accent}15` : COLORS.cardBg,
                    color: active ? COLORS.accent : COLORS.text,
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={apply}
            className="flex-1 rounded-md px-3 py-2 text-sm font-medium"
            style={{ background: COLORS.primary, color: "#fff" }}
          >
            Apply
          </button>
          <button
            onClick={clear}
            className="flex-1 rounded-md px-3 py-2 text-sm font-medium border"
            style={{ borderColor: COLORS.border, color: COLORS.text, background: COLORS.cardBg }}
          >
            Clear
          </button>
        </div>
      </div>
    </aside>
  );
}
