import { ShieldCheck } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 font-headline text-lg font-semibold text-primary">
      <ShieldCheck className="h-6 w-6" />
      <span>License Sentinel</span>
    </div>
  );
}
