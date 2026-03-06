import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SPORT_FILTERS, useAllLeagues } from "@/hooks/useQueries";
import type { League, SportFilter } from "@/hooks/useQueries";
import { AlertCircle, RefreshCw, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import LeagueCard from "./LeagueCard";
import LeagueDetailSheet from "./LeagueDetailSheet";

interface LeaguesGridProps {
  searchQuery: string;
  sportFilter: SportFilter;
}

export default function LeaguesGrid({
  searchQuery,
  sportFilter,
}: LeaguesGridProps) {
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const { data: leagues, isLoading, isError, refetch } = useAllLeagues();

  const filtered = useMemo(() => {
    if (!leagues) return [];
    return leagues.filter((l) => {
      const matchSport = sportFilter === "All" || l.strSport === sportFilter;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        l.strLeague.toLowerCase().includes(q) ||
        l.strCountry?.toLowerCase().includes(q) ||
        l.strSport.toLowerCase().includes(q);
      return matchSport && matchSearch;
    });
  }, [leagues, sportFilter, searchQuery]);

  return (
    <>
      <section className="w-full" aria-label="Leagues grid">
        {/* Section header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Trophy className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-display font-bold tracking-tight">
              Tournaments & Leagues
            </h2>
            {!isLoading && filtered.length > 0 && (
              <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                {filtered.length} leagues
              </span>
            )}
          </div>
          {isError && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => refetch()}
              className="h-7 px-2 text-muted-foreground"
              data-ocid="leagues.button"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              Retry
            </Button>
          )}
        </div>

        {/* Loading grid */}
        {isLoading && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
            data-ocid="leagues.loading_state"
          >
            {Array.from({ length: 12 }, (_, i) => `sk-${i}`).map((k) => (
              <Skeleton key={k} className="h-28 w-full rounded-xl" />
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div
            className="flex flex-col items-center gap-4 py-16 rounded-xl border border-destructive/20 bg-destructive/5"
            data-ocid="leagues.error_state"
          >
            <AlertCircle className="h-10 w-10 text-destructive/50" />
            <div className="text-center">
              <p className="font-semibold text-sm">Failed to load leagues</p>
              <p className="text-xs text-muted-foreground mt-1">
                Check your connection and try again
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              data-ocid="leagues.button"
            >
              Retry
            </Button>
          </div>
        )}

        {/* Empty filtered state */}
        {!isLoading &&
          !isError &&
          filtered.length === 0 &&
          leagues &&
          leagues.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-3 py-16 rounded-xl border border-border bg-muted/5"
              data-ocid="leagues.empty_state"
            >
              <span className="text-4xl">🔍</span>
              <p className="font-semibold text-sm">No leagues found</p>
              <p className="text-xs text-muted-foreground">
                Try a different sport filter or search term
              </p>
            </motion.div>
          )}

        {/* Leagues grid */}
        {!isLoading && !isError && filtered.length > 0 && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
            data-ocid="leagues.list"
          >
            {filtered.map((league, i) => (
              <LeagueCard
                key={league.idLeague}
                league={league}
                index={i}
                onClick={() => setSelectedLeague(league)}
              />
            ))}
          </div>
        )}
      </section>

      {/* League Detail Sheet */}
      <LeagueDetailSheet
        league={selectedLeague}
        onClose={() => setSelectedLeague(null)}
      />
    </>
  );
}
