import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Standing } from "@/hooks/useQueries";
import { AlertCircle, Trophy } from "lucide-react";
import { motion } from "motion/react";

interface StandingsTableProps {
  standings: Standing[] | undefined;
  isLoading: boolean;
  isError: boolean;
  hasNoData: boolean;
}

function getRankStyle(rank: number): string {
  if (rank === 1) return "text-yellow-400 font-black";
  if (rank <= 3) return "text-primary/80 font-bold";
  if (rank <= 6) return "text-muted-foreground font-semibold";
  return "text-muted-foreground";
}

export default function StandingsTable({
  standings,
  isLoading,
  isError,
  hasNoData,
}: StandingsTableProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2" data-ocid="standings.loading_state">
        {Array.from({ length: 8 }, (_, i) => `sk-${i}`).map((k) => (
          <Skeleton key={k} className="h-9 w-full rounded" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="flex flex-col items-center gap-3 py-10 text-center"
        data-ocid="standings.error_state"
      >
        <AlertCircle className="h-8 w-8 text-destructive/50" />
        <p className="text-sm text-muted-foreground">
          Standings not available for this league
        </p>
      </div>
    );
  }

  if (hasNoData || !standings || standings.length === 0) {
    return (
      <div
        className="flex flex-col items-center gap-3 py-10 text-center"
        data-ocid="standings.empty_state"
      >
        <Trophy className="h-8 w-8 text-muted-foreground/30" />
        <p className="text-sm text-muted-foreground">
          No standings data available
        </p>
        <p className="text-xs text-muted-foreground/60">
          This league may not have current standings
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      data-ocid="standings.table"
    >
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="w-8 text-xs font-mono text-muted-foreground/70">
              #
            </TableHead>
            <TableHead className="text-xs font-mono text-muted-foreground/70">
              Team
            </TableHead>
            <TableHead className="text-right text-xs font-mono text-muted-foreground/70 w-8">
              P
            </TableHead>
            <TableHead className="text-right text-xs font-mono text-muted-foreground/70 w-8">
              W
            </TableHead>
            <TableHead className="text-right text-xs font-mono text-muted-foreground/70 w-8">
              D
            </TableHead>
            <TableHead className="text-right text-xs font-mono text-muted-foreground/70 w-8">
              L
            </TableHead>
            <TableHead className="text-right text-xs font-mono text-muted-foreground/70 w-10 hidden sm:table-cell">
              GF
            </TableHead>
            <TableHead className="text-right text-xs font-mono text-muted-foreground/70 w-10 hidden sm:table-cell">
              GA
            </TableHead>
            <TableHead className="text-right text-xs font-mono text-primary w-10">
              Pts
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {standings.map((row, i) => {
            const rank = Number.parseInt(row.intRank) || i + 1;
            return (
              <TableRow
                key={`${row.strTeam}-${i}`}
                className="border-border/50 hover:bg-muted/20"
                data-ocid={`standings.row.${i + 1}`}
              >
                <TableCell
                  className={`text-xs font-mono w-8 ${getRankStyle(rank)}`}
                >
                  {rank === 1 ? "🥇" : rank}
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex items-center gap-2">
                    {row.strBadge && (
                      <img
                        src={row.strBadge}
                        alt={row.strTeam}
                        className="w-5 h-5 object-contain"
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display =
                            "none";
                        }}
                      />
                    )}
                    <span className="text-sm font-medium truncate max-w-[120px]">
                      {row.strTeam || row.name || "-"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right text-xs font-mono text-muted-foreground">
                  {row.intPlayed ?? row.played ?? "-"}
                </TableCell>
                <TableCell className="text-right text-xs font-mono text-primary/80">
                  {row.intWin ?? row.win ?? "-"}
                </TableCell>
                <TableCell className="text-right text-xs font-mono text-muted-foreground">
                  {row.intDraw ?? row.draw ?? "-"}
                </TableCell>
                <TableCell className="text-right text-xs font-mono text-destructive/70">
                  {row.intLoss ?? row.loss ?? "-"}
                </TableCell>
                <TableCell className="text-right text-xs font-mono text-muted-foreground hidden sm:table-cell">
                  {row.intGoalsFor ?? row.goalsfor ?? "-"}
                </TableCell>
                <TableCell className="text-right text-xs font-mono text-muted-foreground hidden sm:table-cell">
                  {row.intGoalsAgainst ?? row.goalsagainst ?? "-"}
                </TableCell>
                <TableCell className="text-right text-sm font-display font-black text-primary">
                  {row.intPoints ?? row.total ?? "-"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </motion.div>
  );
}
