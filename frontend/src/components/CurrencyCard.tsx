import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CurrencyCardProps {
  children: ReactNode;
  className?: string;
}

export default function CurrencyCard({ children, className }: CurrencyCardProps) {
  return (
    <div
      className={cn(
        'bg-navy-900 border border-navy-700 rounded-2xl shadow-card p-6',
        className
      )}
    >
      {children}
    </div>
  );
}
