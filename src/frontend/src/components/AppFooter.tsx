import { Heart } from "lucide-react";

export default function AppFooter() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(
    typeof window !== "undefined"
      ? window.location.hostname
      : "world-sports-tracker",
  );

  return (
    <footer className="w-full border-t border-border/50 bg-background py-5 px-4 mt-8">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-muted-foreground text-xs">
        <div className="flex items-center gap-3">
          <span className="font-mono">© {year} World Sports Tracker</span>
          <span className="text-border">·</span>
          <span className="font-mono text-muted-foreground/60">
            Data via TheSportsDB
          </span>
        </div>
        <span className="flex items-center gap-1">
          Built with{" "}
          <Heart
            className="w-3.5 h-3.5 text-primary fill-primary mx-0.5"
            aria-label="love"
          />
          using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${appId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors font-medium"
            data-ocid="footer.link"
          >
            caffeine.ai
          </a>
        </span>
      </div>
    </footer>
  );
}
