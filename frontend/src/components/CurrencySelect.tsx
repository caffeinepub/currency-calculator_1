import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CURRENCY_INFO: Record<string, { name: string; symbol: string; flag: string }> = {
  USD: { name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  EUR: { name: 'Euro', symbol: '€', flag: '🇪🇺' },
  GBP: { name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  JPY: { name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  CAD: { name: 'Canadian Dollar', symbol: 'CA$', flag: '🇨🇦' },
  AUD: { name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  CHF: { name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  CNY: { name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  INR: { name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  MXN: { name: 'Mexican Peso', symbol: 'MX$', flag: '🇲🇽' },
  BRL: { name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  KRW: { name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  SGD: { name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  HKD: { name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
  NOK: { name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  SEK: { name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  DKK: { name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
  NZD: { name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  ZAR: { name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  AED: { name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
};

interface CurrencySelectProps {
  value: string;
  onChange: (value: string) => void;
  currencies: string[];
  label?: string;
}

export default function CurrencySelect({ value, onChange, currencies, label }: CurrencySelectProps) {
  const info = CURRENCY_INFO[value];

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="text-xs font-semibold uppercase tracking-widest text-navy-400">{label}</span>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-navy-800 border-navy-700 text-white hover:border-gold-500 focus:ring-gold-500/30 focus:border-gold-500 transition-colors h-12 rounded-xl px-4">
          <SelectValue>
            <span className="flex items-center gap-2">
              <span className="text-xl leading-none">{info?.flag}</span>
              <span className="font-bold text-white">{value}</span>
              <span className="text-navy-400 text-sm hidden sm:inline">{info?.name}</span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-navy-800 border-navy-700 text-white max-h-72">
          {currencies.map((code) => {
            const ci = CURRENCY_INFO[code];
            return (
              <SelectItem
                key={code}
                value={code}
                className="hover:bg-navy-700 focus:bg-navy-700 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg leading-none">{ci?.flag}</span>
                  <span className="font-semibold text-white">{code}</span>
                  <span className="text-navy-400 text-sm">{ci?.name}</span>
                  <span className="text-gold-500 text-xs ml-auto">{ci?.symbol}</span>
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

export { CURRENCY_INFO };
