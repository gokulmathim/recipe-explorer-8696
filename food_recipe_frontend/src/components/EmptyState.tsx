import { COLORS } from "@/lib/constants";

export default function EmptyState({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="w-full rounded-lg border p-8 text-center" style={{ borderColor: "#e5e7eb", background: "#fff" }}>
      <h3 className="text-base font-semibold mb-2" style={{ color: COLORS.text }}>{title}</h3>
      {subtitle ? <p className="text-sm" style={{ color: COLORS.subtleText }}>{subtitle}</p> : null}
    </div>
  );
}
