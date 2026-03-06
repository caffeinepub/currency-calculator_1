import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLeagueStandings } from "@/hooks/useQueries";
import type { League } from "@/hooks/useQueries";
import { Calendar, Globe, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import SportsBadge from "./SportsBadge";
import StandingsTable from "./StandingsTable";

interface LeagueDetailSheetProps {
  league: League | null;
  onClose: () => void;
}

export default function LeagueDetailSheet({
  league,
  onClose,
}: LeagueDetailSheetProps) {
  const isOpen = !!league;
  // Use the league's current season if available, otherwise fall back to the
  // most recent completed season so standings can still be fetched.
  const season = league?.strCurrentSeason ?? "2024-2025";

  const {
    data: standings,
    isLoading,
    isError,
    isFetched,
  } = useLeagueStandings(league?.idLeague ?? "", season, isOpen);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const logoUrl = league?.strLogo || league?.strBadge;

  const hasNoData =
    !isLoading &&
    !isError &&
    isFetched &&
    (!standings || standings.length === 0);

  return (
    <AnimatePresence>
      {isOpen && league && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
            data-ocid="league.modal"
          />

          {/* Sheet */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-card border-l border-border shadow-2xl z-50 flex flex-col"
            aria-label={`${league.strLeague} details`}
            data-ocid="league.sheet"
          >
            {/* Sheet header */}
            <div className="flex-shrink-0 p-5 border-b border-border">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-4 min-w-0">
                  {/* Logo */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-muted/30 border border-border/50 flex items-center justify-center overflow-hidden">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={league.strLeague}
                        className="w-full h-full object-contain p-1.5"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display =
                            "none";
                          (
                            e.currentTarget.parentElement as HTMLElement
                          ).innerHTML = '<span class="text-3xl">🏆</span>';
                        }}
                      />
                    ) : (
                      <span className="text-3xl">🏆</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="font-display font-black text-lg leading-tight mb-1">
                      {league.strLeague}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2">
                      <SportsBadge sport={league.strSport} size="sm" />
                      {league.strCountry && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Globe className="h-3 w-3" />
                          {league.strCountry}
                        </span>
                      )}
                      {league.strCurrentSeason && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {league.strCurrentSeason}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="flex-shrink-0 h-8 w-8 rounded-lg"
                  data-ocid="league.close_button"
                  aria-label="Close league details"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Banner if available */}
            {league.strBanner && (
              <div className="flex-shrink-0 h-24 overflow-hidden">
                <img
                  src={league.strBanner}
                  alt={`${league.strLeague} banner`}
                  className="w-full h-full object-cover opacity-40"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement)
                      .parentElement!.style.display = "none";
                  }}
                />
              </div>
            )}

            {/* Standings section header */}
            <div className="flex-shrink-0 px-5 pt-4 pb-2">
              <h3 className="text-sm font-display font-bold text-muted-foreground uppercase tracking-widest">
                {season ? `${season} Standings` : "Standings"}
              </h3>
            </div>

            {/* Standings content */}
            <ScrollArea className="flex-1 px-5 pb-5">
              <StandingsTable
                standings={standings}
                isLoading={isLoading}
                isError={isError}
                hasNoData={hasNoData}
              />
            </ScrollArea>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
