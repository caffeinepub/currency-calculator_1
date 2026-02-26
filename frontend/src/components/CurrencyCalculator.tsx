import { ArrowLeftRight, RefreshCw, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CurrencySelect from './CurrencySelect';
import CurrencyCard from './CurrencyCard';
import { useCurrencyExchange } from '../hooks/useCurrencyExchange';
import { SUPPORTED_CURRENCIES } from '../hooks/useQueries';

const QUICK_AMOUNTS = [100, 500, 1000, 5000, 10000];

const ALL_CURRENCY_CODES = SUPPORTED_CURRENCIES.map((c) => c.code);

export default function CurrencyCalculator() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    amount,
    setAmount,
    isLoading,
    isError,
    error,
    refetch,
    convertedAmount,
    exchangeRate,
    lastUpdated,
    isStatic,
  } = useCurrencyExchange();

  const formatNumber = (num: number, currency: string) => {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      }).format(num);
    } catch {
      return `${num.toFixed(4)} ${currency}`;
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Main Calculator Card */}
      <CurrencyCard>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gold-400" />
              <h2 className="text-lg font-semibold text-navy-50">Currency Calculator</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => refetch()}
              disabled={isLoading}
              className="text-navy-300 hover:text-gold-400 hover:bg-navy-700"
              title="Refresh rates"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          {/* Static rates warning */}
          {isStatic && !isLoading && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-950/40 border border-amber-700/40">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-amber-300">
                  Using approximate offline rates — live data unavailable.{' '}
                  <button
                    onClick={() => refetch()}
                    className="underline hover:text-amber-200 transition-colors"
                  >
                    Try again
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-red-950/50 border border-red-800/50">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-red-300">Failed to load exchange rates</p>
                <p className="text-xs text-red-400/80 mt-1">
                  {error instanceof Error ? error.message : 'An unexpected error occurred'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => refetch()}
                className="text-red-300 hover:text-red-200 hover:bg-red-900/50 shrink-0"
              >
                Retry
              </Button>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="flex flex-col items-center gap-3">
                <RefreshCw className="w-8 h-8 text-gold-400 animate-spin" />
                <p className="text-sm text-navy-300">Fetching live exchange rates...</p>
              </div>
            </div>
          )}

          {/* Calculator Form */}
          {!isLoading && (
            <div className="space-y-4">
              {/* Amount Input */}
              <div className="space-y-2">
                <Label className="text-navy-200 text-sm font-medium">Amount</Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="0"
                  className="bg-navy-800 border-navy-600 text-navy-50 placeholder:text-navy-400 focus:border-gold-500 focus:ring-gold-500/20 text-lg h-12"
                />
              </div>

              {/* Currency Selectors */}
              <div className="grid grid-cols-[1fr,auto,1fr] items-end gap-3">
                <div className="space-y-2">
                  <Label className="text-navy-200 text-sm font-medium">From</Label>
                  <CurrencySelect
                    value={fromCurrency}
                    onChange={setFromCurrency}
                    currencies={ALL_CURRENCY_CODES}
                  />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const swap = fromCurrency;
                    setFromCurrency(toCurrency);
                    setToCurrency(swap);
                  }}
                  className="mb-0.5 text-navy-300 hover:text-gold-400 hover:bg-navy-700 rounded-full"
                  title="Swap currencies"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </Button>

                <div className="space-y-2">
                  <Label className="text-navy-200 text-sm font-medium">To</Label>
                  <CurrencySelect
                    value={toCurrency}
                    onChange={setToCurrency}
                    currencies={ALL_CURRENCY_CODES}
                  />
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="flex flex-wrap gap-2">
                {QUICK_AMOUNTS.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => setAmount(String(quickAmount))}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                      amount === String(quickAmount)
                        ? 'bg-gold-500 border-gold-500 text-navy-900 font-semibold'
                        : 'bg-navy-800 border-navy-600 text-navy-300 hover:border-gold-500/50 hover:text-gold-400'
                    }`}
                  >
                    {quickAmount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </CurrencyCard>

      {/* Result Card */}
      {!isLoading && !isError && convertedAmount !== null && (
        <CurrencyCard>
          <div className="p-6 space-y-4">
            <div className="text-center space-y-1">
              <p className="text-sm text-navy-400">
                {amount} {fromCurrency} equals
              </p>
              <p className="text-4xl font-bold text-gold-400">
                {formatNumber(convertedAmount, toCurrency)}
              </p>
            </div>

            {exchangeRate !== null && (
              <div className="flex items-center justify-center gap-2 text-sm text-navy-300">
                <span>
                  1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
                </span>
              </div>
            )}

            {lastUpdated && (
              <div className="text-center text-xs text-navy-500">
                {isStatic
                  ? 'Approximate rates (offline)'
                  : `Rates updated: ${formatDate(lastUpdated)}`}
              </div>
            )}
          </div>
        </CurrencyCard>
      )}
    </div>
  );
}
