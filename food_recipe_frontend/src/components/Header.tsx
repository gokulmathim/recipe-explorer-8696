"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { COLORS } from "@/lib/constants";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query) params.set("q", query);
    else params.delete("q");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <header
      className="w-full border-b"
      style={{ borderColor: "#e5e7eb", background: COLORS.bg }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div
            className="h-8 w-8 rounded-md"
            style={{ background: COLORS.primary }}
          />
          <span className="text-lg font-semibold" style={{ color: COLORS.text }}>
            Recipe Explorer
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm ${pathname === "/" ? "font-semibold" : ""}`}
            style={{ color: COLORS.text }}
          >
            Browse
          </Link>
          <Link
            href="/favorites"
            className={`text-sm ${pathname?.startsWith("/favorites") ? "font-semibold" : ""}`}
            style={{ color: COLORS.text }}
          >
            Favorites
          </Link>
        </nav>
        <form onSubmit={onSubmit} className="flex items-center gap-2 w-1/2 max-w-md">
          <input
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
            style={{
              borderColor: "#e5e7eb",
              color: COLORS.text,
              background: COLORS.cardBg,
            }}
          />
          <button
            type="submit"
            className="rounded-md px-4 py-2 text-sm font-medium"
            style={{ background: COLORS.primary, color: "white" }}
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
