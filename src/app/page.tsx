'use client';

import { Logo } from '@/components/landing/logo';
import { BGPattern } from '@/components/ui/bg-pattern';
import { Header } from '@/components/landing/header';

export default function BlankPage() {
  return (
    <div className="text-white relative min-h-screen">
      <Header />
      <BGPattern variant="grid" fill="hsl(var(--border))" />
      <div className="flex items-center justify-center pt-20">
        <div className="w-full max-w-4xl p-8 space-y-8">
            <h1 className="text-4xl font-bold text-center text-white/90">Conteúdo Principal</h1>
            <p className="text-lg text-center text-white/70">
              Role para baixo para ver o efeito do cabeçalho.
            </p>
            <div className="h-[200vh]"></div>
        </div>
      </div>
    </div>
  );
}
