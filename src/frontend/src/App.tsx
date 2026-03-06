import { motion } from "motion/react";
import { useState } from "react";
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import LeaguesGrid from "./components/LeaguesGrid";
import LiveEventsSection from "./components/LiveEventsSection";
import type { SportFilter } from "./hooks/useQueries";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sportFilter, setSportFilter] = useState<SportFilter>("All");

  return (
    <div className="min-h-screen flex flex-col bg-background grid-noise">
      <AppHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sportFilter={sportFilter}
        onSportFilterChange={setSportFilter}
      />

      <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-8">
        {/* Page hero */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-1"
        >
          <div className="flex items-baseline gap-3">
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight">
              Sports <span className="text-primary">Dashboard</span>
            </h2>
            <span className="hidden sm:inline-block text-muted-foreground font-mono text-sm">
              Global Tournament Stats
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xl">
            Live scores, standings, and stats from leagues and tournaments
            happening around the world.
          </p>
        </motion.div>

        {/* Live Events */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <LiveEventsSection />
        </motion.div>

        {/* Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Leagues Grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <LeaguesGrid searchQuery={searchQuery} sportFilter={sportFilter} />
        </motion.div>
      </main>

      <AppFooter />
    </div>
  );
}
