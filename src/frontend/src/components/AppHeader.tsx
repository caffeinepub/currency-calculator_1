import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SPORT_FILTERS } from "@/hooks/useQueries";
import type { SportFilter } from "@/hooks/useQueries";
import { Globe2, Search, X } from "lucide-react";
import { useState } from "react";

interface AppHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sportFilter: SportFilter;
  onSportFilterChange: (s: SportFilter) => void;
}

export default function AppHeader({
  searchQuery,
  onSearchChange,
  sportFilter,
  onSportFilterChange,
}: AppHeaderProps) {
  const [focused, setFocused] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Globe2 className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="font-display font-black text-base leading-none tracking-tight">
                World Sports
              </h1>
              <p className="text-xs text-muted-foreground leading-none mt-0.5 font-mono">
                Tracker
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div
            className={`relative flex-1 max-w-sm transition-all duration-200 ${focused ? "max-w-md" : ""}`}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search leagues, sports, countries..."
              className="pl-9 pr-8 h-8 text-sm bg-muted/40 border-border/60 focus:border-primary/50 focus:bg-muted/60 rounded-lg"
              data-ocid="header.search_input"
              aria-label="Search leagues and sports"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
                data-ocid="header.button"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Sport filter tabs */}
        <div className="pb-0 -mb-px overflow-x-auto scrollbar-thin">
          <Tabs
            value={sportFilter}
            onValueChange={(v) => onSportFilterChange(v as SportFilter)}
          >
            <TabsList className="bg-transparent h-auto gap-0 p-0 rounded-none w-max">
              {SPORT_FILTERS.map((sport) => (
                <TabsTrigger
                  key={sport}
                  value={sport}
                  className="
                    h-9 px-3 sm:px-4 text-xs font-mono font-semibold rounded-none border-b-2 border-transparent
                    data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent
                    text-muted-foreground hover:text-foreground hover:bg-muted/30
                    transition-all duration-150 whitespace-nowrap
                  "
                  data-ocid="header.tab"
                >
                  {sport === "All"
                    ? "🏆 All"
                    : sport === "Soccer"
                      ? "⚽ Soccer"
                      : sport === "Basketball"
                        ? "🏀 Basketball"
                        : sport === "Tennis"
                          ? "🎾 Tennis"
                          : sport === "Cricket"
                            ? "🏏 Cricket"
                            : sport === "American Football"
                              ? "🏈 Am. Football"
                              : sport === "Baseball"
                                ? "⚾ Baseball"
                                : sport === "Rugby"
                                  ? "🏉 Rugby"
                                  : sport}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
    </header>
  );
}
