import { Heart } from 'lucide-react';

export default function AppFooter() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'currency-calculator'
  );

  return (
    <footer className="w-full border-t border-navy-800 bg-navy-950 py-5 px-4">
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-navy-400 text-sm">
        <span>© {year} Currency Calc. All rights reserved.</span>
        <span className="flex items-center gap-1">
          Built with{' '}
          <Heart className="w-4 h-4 text-gold-400 fill-gold-400 mx-0.5" aria-label="love" />
          using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-400 hover:text-gold-300 transition-colors font-medium"
          >
            caffeine.ai
          </a>
        </span>
      </div>
    </footer>
  );
}
