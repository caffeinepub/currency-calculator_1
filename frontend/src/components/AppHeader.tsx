export default function AppHeader() {
  return (
    <header className="relative w-full overflow-hidden">
      {/* Hero background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/generated/hero-bg.dim_1200x400.png')" }}
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-navy-950/75" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-10 px-4 text-center">
        <div className="flex items-center gap-4 mb-3">
          <img
            src="/assets/generated/currency-logo.dim_128x128.png"
            alt="Currency Calc Logo"
            className="w-14 h-14 rounded-2xl shadow-gold"
          />
          <h1 className="text-4xl font-display font-bold tracking-tight text-white">
            Currency <span className="text-gold-400">Calc</span>
          </h1>
        </div>
        <p className="text-navy-300 text-base max-w-md font-sans">
          Real-time exchange rates for 20+ major currencies, updated every 5 minutes.
        </p>
      </div>
    </header>
  );
}
