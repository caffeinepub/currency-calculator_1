import { useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strCountry: string;
  strBadge: string | null;
  strLogo: string | null;
  strBanner: string | null;
  strCurrentSeason: string | null;
}

export interface SportEvent {
  idEvent: string;
  strEvent: string;
  strLeague: string;
  strSport: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  strStatus: string | null;
  strTime: string | null;
  dateEvent: string | null;
  strThumb: string | null;
  strLeagueBadge: string | null;
}

export interface Standing {
  // thesportsdb field names (actual API response)
  intRank: string;
  strTeam: string;
  strBadge: string | null;
  intPlayed: string;
  intWin: string;
  intDraw: string;
  intLoss: string;
  intGoalsFor: string;
  intGoalsAgainst: string;
  intPoints: string;
  // legacy aliases kept for compatibility
  name?: string;
  played?: string;
  win?: string;
  draw?: string;
  loss?: string;
  goalsfor?: string;
  goalsagainst?: string;
  total?: string;
}

// ─── Sport helpers ────────────────────────────────────────────────────────────

export const SPORT_EMOJIS: Record<string, string> = {
  Soccer: "⚽",
  Basketball: "🏀",
  Tennis: "🎾",
  Cricket: "🏏",
  "American Football": "🏈",
  Baseball: "⚾",
  Rugby: "🏉",
  Handball: "🤾",
  Volleyball: "🏐",
  "Ice Hockey": "🏒",
  "Motor Sport": "🏎️",
  Golf: "⛳",
  Boxing: "🥊",
  Cycling: "🚴",
  Athletics: "🏃",
};

export const SPORT_FILTERS = [
  "All",
  "Soccer",
  "Basketball",
  "Tennis",
  "Cricket",
  "American Football",
  "Baseball",
  "Rugby",
] as const;

export type SportFilter = (typeof SPORT_FILTERS)[number];

export function getSportEmoji(sport: string): string {
  return SPORT_EMOJIS[sport] ?? "🏆";
}

export function getSportColorClass(sport: string): string {
  const map: Record<string, string> = {
    Soccer: "text-sport-soccer bg-sport-soccer",
    Basketball: "text-sport-basketball bg-sport-basketball",
    Tennis: "text-sport-tennis bg-sport-tennis",
    Cricket: "text-sport-cricket bg-sport-cricket",
    "American Football":
      "text-sport-american-football bg-sport-american-football",
    Baseball: "text-sport-baseball bg-sport-baseball",
    Rugby: "text-sport-rugby bg-sport-rugby",
  };
  return map[sport] ?? "text-primary bg-primary/10";
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useAllLeagues() {
  const { actor, isFetching } = useActor();
  return useQuery<League[]>({
    queryKey: ["allLeagues"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.getAllLeagues();
      const parsed = JSON.parse(raw) as { leagues?: League[] };
      return parsed.leagues ?? [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 10,
  });
}

export function useTodayEvents() {
  const { actor, isFetching } = useActor();
  return useQuery<SportEvent[]>({
    queryKey: ["todayEvents"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.getEventsForToday();
      const parsed = JSON.parse(raw) as { events?: SportEvent[] };
      return parsed.events ?? [];
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 1000 * 60, // auto-refresh every 60s
    staleTime: 1000 * 30,
  });
}

export function useLeagueStandings(
  leagueId: string,
  season: string,
  enabled: boolean,
) {
  const { actor, isFetching } = useActor();
  // Try the provided season first, then fall back to common seasons
  const seasonFallbacks = [
    season,
    "2024-2025",
    "2025",
    "2024",
    "2023-2024",
    "2023",
  ].filter((s, i, arr) => s && arr.indexOf(s) === i);

  return useQuery<Standing[]>({
    queryKey: ["standings", leagueId, season],
    queryFn: async () => {
      if (!actor) return [];
      // Try each season until we get data
      for (const s of seasonFallbacks) {
        const raw = await actor.getLeagueStandings(leagueId, s);
        let parsed: { table?: Standing[] } = {};
        try {
          parsed = JSON.parse(raw) as { table?: Standing[] };
        } catch {
          continue;
        }
        if (parsed.table && parsed.table.length > 0) {
          return parsed.table;
        }
      }
      return [];
    },
    enabled: enabled && !!actor && !isFetching && !!leagueId,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
