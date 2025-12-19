import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        className="h-6 w-6 text-white"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M21 16.5C21 16.5 17.5 14 12 14C6.5 14 3 16.5 3 16.5M21 16.5C21 19.5 17 22 12 22C7 22 3 19.5 3 16.5M21 16.5V7.5C21 7.5 17.5 5 12 5C6.5 5 3 7.5 3 7.5V16.5M12 5V14M12 5C12 2 17 2 17 2M12 5C12 2 7 2 7 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="text-xl font-bold tracking-tight text-white">
        CLICKIFY
      </span>
    </div>
  );
}
