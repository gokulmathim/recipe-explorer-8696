"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { COLORS } from "@/lib/constants";

export default function Pagination({ page, pageSize, total }: { page: number; pageSize: number; total: number; }) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const go = (p: number) => {
    const sp = new URLSearchParams(params.toString());
    sp.set("page", String(p));
    router.push(`${pathname}?${sp.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        disabled={!canPrev}
        onClick={() => go(page - 1)}
        className="rounded-md px-3 py-2 text-sm font-medium border disabled:opacity-50"
        style={{ borderColor: COLORS.border, color: COLORS.text, background: COLORS.cardBg }}
      >
        Previous
      </button>
      <div className="text-sm" style={{ color: COLORS.subtleText }}>
        Page {page} of {totalPages}
      </div>
      <button
        disabled={!canNext}
        onClick={() => go(page + 1)}
        className="rounded-md px-3 py-2 text-sm font-medium"
        style={{ background: COLORS.primary, color: "#fff", opacity: canNext ? 1 : 0.5 }}
      >
        Next
      </button>
    </div>
  );
}
