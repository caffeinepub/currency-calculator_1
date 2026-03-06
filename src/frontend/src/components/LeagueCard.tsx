import type { League } from "@/hooks/useQueries";
import { Globe } from "lucide-react";
import { motion } from "motion/react";
import SportsBadge from "./SportsBadge";

interface LeagueCardProps {
  league: League;
  index: number;
  onClick: () => void;
}

export default function LeagueCard({
  league,
  index,
  onClick,
}: LeagueCardProps) {
  const badgeUrl = league.strBadge || league.strLogo;

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.5) }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      onClick={onClick}
      className="group text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
      data-ocid={`leagues.item.${index + 1}`}
      aria-label={`View ${league.strLeague} standings`}
    >
      <div className="relative h-full rounded-xl border border-border bg-card overflow-hidden transition-all duration-200 group-hover:border-primary/40 group-hover:shadow-glow group-hover:bg-card/80">
        {/* Top accent line on hover */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="p-4 flex flex-col gap-3">
          {/* Badge + name row */}
          <div className="flex items-start gap-3">
            {/* League badge */}
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-muted/30 flex items-center justify-center overflow-hidden border border-border/50">
              {badgeUrl ? (
                <img
                  src={badgeUrl}
                  alt={league.strLeague}
                  className="w-full h-full object-contain p-1"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                    (e.currentTarget.parentElement as HTMLElement).innerHTML =
                      '<span class="text-xl">🏆</span>';
                  }}
                />
              ) : (
                <span className="text-xl">🏆</span>
              )}
            </div>

            {/* Name + country */}
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-150">
                {league.strLeague}
              </h3>
              {league.strCountry && (
                <div className="flex items-center gap-1 mt-1">
                  <Globe className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs text-muted-foreground truncate">
                    {league.strCountry}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-2">
            <SportsBadge sport={league.strSport} size="sm" />
            {league.strCurrentSeason && (
              <span className="text-xs font-mono text-muted-foreground flex-shrink-0">
                {league.strCurrentSeason}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
