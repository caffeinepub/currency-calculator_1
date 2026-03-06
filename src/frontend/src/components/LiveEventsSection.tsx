import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTodayEvents } from "@/hooks/useQueries";
import { CalendarDays, Radio, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import LiveEventCard from "./LiveEventCard";

export default function LiveEventsSection() {
  const {
    data: events,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useTodayEvents();

  return (
    <section className="w-full" aria-label="Live and Today's Events">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-live animate-live-pulse" />
            <h2 className="text-lg font-display font-bold tracking-tight">
              Live & Today's Matches
            </h2>
          </div>
          {events && events.length > 0 && (
            <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
              {events.length} matches
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
          className="text-muted-foreground hover:text-foreground h-7 px-2"
          data-ocid="events.button"
          aria-label="Refresh events"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`}
          />
        </Button>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div
          className="flex gap-3 overflow-hidden"
          data-ocid="events.loading_state"
        >
          {Array.from({ length: 5 }, (_, i) => `sk-${i}`).map((k) => (
            <div key={k} className="flex-shrink-0 w-56">
              <Skeleton className="h-28 w-full rounded-xl" />
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div
          className="flex flex-col items-center justify-center gap-3 py-8 rounded-xl border border-destructive/20 bg-destructive/5"
          data-ocid="events.error_state"
        >
          <Radio className="h-8 w-8 text-destructive/60" />
          <p className="text-sm text-muted-foreground">
            Failed to load live events
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            data-ocid="events.button"
          >
            Try again
          </Button>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && (!events || events.length === 0) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center gap-3 py-10 rounded-xl border border-border bg-muted/10"
          data-ocid="events.empty_state"
        >
          <CalendarDays className="h-8 w-8 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">
            No matches scheduled for today
          </p>
        </motion.div>
      )}

      {/* Events scroll row */}
      {!isLoading && events && events.length > 0 && (
        <div className="relative">
          {/* Edge fade */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div
            className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin"
            data-ocid="events.list"
          >
            {events.map((event, i) => (
              <LiveEventCard key={event.idEvent} event={event} index={i} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
