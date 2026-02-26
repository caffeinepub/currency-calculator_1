import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import CurrencyCalculator from './components/CurrencyCalculator';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950">
      <AppHeader />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <CurrencyCalculator />
      </main>
      <AppFooter />
    </div>
  );
}
