import { FrameIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <FrameIcon className="h-6 w-6 text-white" />
      <span className="text-xl font-bold tracking-tight text-white">
        CLICKIFY
      </span>
    </div>
  );
}
