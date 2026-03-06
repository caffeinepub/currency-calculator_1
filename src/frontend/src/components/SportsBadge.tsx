import { getSportColorClass, getSportEmoji } from "@/hooks/useQueries";

interface SportsBadgeProps {
  sport: string;
  size?: "sm" | "md";
}

export default function SportsBadge({ sport, size = "sm" }: SportsBadgeProps) {
  const colorClass = getSportColorClass(sport);
  const emoji = getSportEmoji(sport);

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium font-mono ${
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      } ${colorClass}`}
    >
      <span>{emoji}</span>
      <span>{sport}</span>
    </span>
  );
}
