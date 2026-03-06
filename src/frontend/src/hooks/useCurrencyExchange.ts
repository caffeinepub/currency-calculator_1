// Legacy hook - no longer used (replaced by sports tracker)
export function useCurrencyExchange() {
  return {
    fromCurrency: "USD",
    setFromCurrency: (_: string) => {},
    toCurrency: "EUR",
    setToCurrency: (_: string) => {},
    amount: "1",
    setAmount: (_: string) => {},
    isLoading: false,
    isError: false,
    error: null,
    refetch: () => {},
    convertedAmount: null,
    exchangeRate: null,
    lastUpdated: null,
    isStatic: false,
    swapCurrencies: () => {},
  };
}
