import { getSportEmoji } from "@/hooks/useQueries";
import type { SportEvent } from "@/hooks/useQueries";
import { motion } from "motion/react";

interface LiveEventCardProps {
  event: SportEvent;
  index: number;
}

function isLive(status: string | null): boolean {
  if (!status) return false;
  const s = status.toLowerCase();
  return (
    s.includes("1h") ||
    s.includes("2h") ||
    s.includes("ht") ||
    s.includes("live") ||
    s.includes("progress") ||
    /^\d+'$/.test(s) // e.g. "45'"
  );
}

function isFinished(status: string | null): boolean {
  if (!status) return false;
  const s = status.toLowerCase();
  return (
    s.includes("finished") || s.includes("ft") || s === "aet" || s === "pen"
  );
}

export default function LiveEventCard({ event, index }: LiveEventCardProps) {
  const live = isLive(event.strStatus);
  const finished = isFinished(event.strStatus);
  const hasScore = event.intHomeScore !== null && event.intAwayScore !== null;
  const emoji = getSportEmoji(event.strSport);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex-shrink-0 w-56 relative"
      data-ocid={`events.item.${index + 1}`}
    >
      <div
        className={`
          relative h-full rounded-xl border p-3 flex flex-col gap-2 overflow-hidden
          transition-all duration-200 hover:scale-[1.02] cursor-default
          ${
            live
              ? "border-live/40 bg-live/5 shadow-live"
              : finished
                ? "border-border bg-card"
                : "border-border bg-card hover:border-primary/30"
          }
        `}
      >
        {/* Ambient glow for live matches */}
        {live && (
          <div className="absolute inset-0 bg-gradient-to-br from-live/10 to-transparent pointer-events-none" />
        )}

        {/* Header */}
        <div className="flex items-center justify-between gap-1">
          <span className="text-xs text-muted-foreground truncate flex-1 leading-none">
            {emoji} {event.strLeague}
          </span>
          {live && (
            <span className="flex items-center gap-1 text-xs font-bold text-live flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-live animate-live-pulse" />
              LIVE
            </span>
          )}
          {finished && (
            <span className="text-xs font-medium text-muted-foreground flex-shrink-0">
              FT
            </span>
          )}
          {!live && !finished && event.strTime && (
            <span className="text-xs font-mono text-muted-foreground flex-shrink-0">
              {event.strTime}
            </span>
          )}
        </div>

        {/* Teams */}
        <div className="flex flex-col gap-1.5">
          {/* Home team */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold truncate flex-1 leading-tight">
              {event.strHomeTeam}
            </span>
            {hasScore && (
              <span
                className={`text-lg font-display font-black leading-none tabular-nums ${
                  live ? "text-primary animate-score-glow" : "text-foreground"
                }`}
              >
                {event.intHomeScore}
              </span>
            )}
          </div>
          {/* Away team */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold truncate flex-1 leading-tight text-muted-foreground">
              {event.strAwayTeam}
            </span>
            {hasScore && (
              <span
                className={`text-lg font-display font-black leading-none tabular-nums ${
                  live ? "text-primary animate-score-glow" : "text-foreground"
                }`}
              >
                {event.intAwayScore}
              </span>
            )}
          </div>
        </div>

        {/* Date */}
        {!hasScore && event.dateEvent && (
          <div className="text-xs text-muted-foreground font-mono">
            {event.dateEvent}
          </div>
        )}

        {/* Live status bar */}
        {live && event.strStatus && (
          <div className="text-xs font-mono font-bold text-live">
            {event.strStatus}
          </div>
        )}
      </div>
    </motion.div>
  );
}
