# Specification

## Summary
**Goal:** Fix the broken exchange rate fetching so the currency exchange app works end-to-end.

**Planned changes:**
- Fix `useQueries.ts` to correctly fetch live rates from `open.er-api.com`, with automatic fallback to the Fawaz CDN API if the primary fails
- Add a user-facing error message in the calculator UI when all fetch attempts fail
- Fix the backend Motoko actor's `fetchExchangeRates` HTTP outcall so the request is correctly formed and the response passes consensus
- Fix the transform function in the Motoko actor to properly strip non-deterministic headers
- Ensure the converted amount, exchange rate, and last-updated timestamp all display correctly once rates are fetched

**User-visible outcome:** The app loads exchange rates on startup, displays correct conversion results, and shows a meaningful error message if the network is unavailable — instead of a blank or broken UI.
