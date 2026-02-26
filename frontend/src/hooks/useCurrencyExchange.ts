import { useState, useMemo } from 'react';
import { useExchangeRates } from './useQueries';

export function useCurrencyExchange() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('1');

  const { data: rates, isLoading, isError, error, refetch } = useExchangeRates();

  const { convertedAmount, exchangeRate } = useMemo(() => {
    if (!rates || !amount) return { convertedAmount: null, exchangeRate: null };

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 0) return { convertedAmount: null, exchangeRate: null };

    const fromRate = rates.rates[fromCurrency];
    const toRate = rates.rates[toCurrency];

    if (!fromRate || !toRate) return { convertedAmount: null, exchangeRate: null };

    const amountInUSD = numAmount / fromRate;
    const converted = amountInUSD * toRate;
    const rate = toRate / fromRate;

    return { convertedAmount: converted, exchangeRate: rate };
  }, [rates, amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return {
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
    lastUpdated: rates?.lastUpdated ?? null,
    isStatic: rates?.isStatic ?? false,
    swapCurrencies,
  };
}
