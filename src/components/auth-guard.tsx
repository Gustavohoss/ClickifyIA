'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [isUserLoading, user, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return <>{children}</>;
}
