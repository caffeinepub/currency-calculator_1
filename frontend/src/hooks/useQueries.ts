import { useQuery } from '@tanstack/react-query';

export const SUPPORTED_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
];

export interface ExchangeRates {
  base: string;
  rates: Record<string, number>;
  lastUpdated: string;
  isStatic?: boolean;
}

// Static fallback rates (approximate, USD-based) used when all live APIs fail
const STATIC_FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  CAD: 1.36,
  AUD: 1.53,
  CHF: 0.89,
  CNY: 7.24,
  INR: 83.1,
  MXN: 17.15,
  BRL: 4.97,
  KRW: 1325,
  SGD: 1.34,
  HKD: 7.82,
  NOK: 10.55,
  SEK: 10.42,
  DKK: 6.88,
  NZD: 1.63,
  ZAR: 18.63,
  AED: 3.67,
};

async function tryFetch(url: string, timeoutMs = 8000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchFromOpenER(): Promise<ExchangeRates> {
  const response = await tryFetch('https://open.er-api.com/v6/latest/USD');
  if (!response.ok) throw new Error(`open.er-api.com failed: ${response.status}`);
  const data = await response.json();
  if (data.result !== 'success') throw new Error('open.er-api.com returned non-success result');
  return {
    base: 'USD',
    rates: data.rates,
    lastUpdated: data.time_last_update_utc,
  };
}

async function fetchFromFawazJsDelivr(): Promise<ExchangeRates> {
  const response = await tryFetch(
    'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json'
  );
  if (!response.ok) throw new Error(`Fawaz jsDelivr failed: ${response.status}`);
  const data = await response.json();
  if (!data.usd) throw new Error('Fawaz jsDelivr returned unexpected format');
  const rates: Record<string, number> = {};
  for (const [key, value] of Object.entries(data.usd)) {
    rates[key.toUpperCase()] = value as number;
  }
  return {
    base: 'USD',
    rates,
    lastUpdated: data.date || new Date().toISOString(),
  };
}

async function fetchFromFawazPages(): Promise<ExchangeRates> {
  const response = await tryFetch(
    'https://latest.currency-api.pages.dev/v1/currencies/usd.json'
  );
  if (!response.ok) throw new Error(`Fawaz Pages failed: ${response.status}`);
  const data = await response.json();
  if (!data.usd) throw new Error('Fawaz Pages returned unexpected format');
  const rates: Record<string, number> = {};
  for (const [key, value] of Object.entries(data.usd)) {
    rates[key.toUpperCase()] = value as number;
  }
  return {
    base: 'USD',
    rates,
    lastUpdated: data.date || new Date().toISOString(),
  };
}

async function fetchFromFrankfurter(): Promise<ExchangeRates> {
  const symbols = SUPPORTED_CURRENCIES.map((c) => c.code)
    .filter((c) => c !== 'USD')
    .join(',');
  const response = await tryFetch(
    `https://api.frankfurter.dev/v1/latest?base=USD&symbols=${symbols}`
  );
  if (!response.ok) throw new Error(`Frankfurter failed: ${response.status}`);
  const data = await response.json();
  if (!data.rates) throw new Error('Frankfurter returned unexpected format');
  return {
    base: 'USD',
    rates: { USD: 1, ...data.rates },
    lastUpdated: data.date || new Date().toISOString(),
  };
}

async function fetchExchangeRates(): Promise<ExchangeRates> {
  const attempts = [
    { name: 'open.er-api.com', fn: fetchFromOpenER },
    { name: 'Fawaz jsDelivr CDN', fn: fetchFromFawazJsDelivr },
    { name: 'Fawaz Pages CDN', fn: fetchFromFawazPages },
    { name: 'Frankfurter', fn: fetchFromFrankfurter },
  ];

  for (const attempt of attempts) {
    try {
      const result = await attempt.fn();
      return result;
    } catch {
      // try next
    }
  }

  // All live APIs failed — return static fallback so the app remains usable
  return {
    base: 'USD',
    rates: STATIC_FALLBACK_RATES,
    lastUpdated: new Date().toISOString(),
    isStatic: true,
  };
}

export function useExchangeRates() {
  return useQuery<ExchangeRates>({
    queryKey: ['exchangeRates'],
    queryFn: fetchExchangeRates,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
    retryDelay: 2000,
  });
}
