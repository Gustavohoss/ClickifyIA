'use client';

import { motion } from 'framer-motion';
import { Compass, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="w-full relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      <div
        aria-hidden={true}
        className="-z-10 absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-fuchsia-500/10 rounded-full mix-blend-normal filter blur-[96px] animate-pulse delay-1000" />
      </div>

      <Empty className="border-none">
        <EmptyHeader>
          <EmptyTitle className="font-extrabold text-8xl text-white">404</EmptyTitle>
          <EmptyDescription className="text-nowrap text-zinc-400">
            A página que você está procurando pode ter sido <br />
            movida ou não existe.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/painel">
                <Home className="mr-2 h-4 w-4" /> Ir para o Painel
              </Link>
            </Button>

            <Button asChild variant="outline" className="bg-transparent hover:bg-white/10 text-white border-white/20 hover:text-white">
              <Link href="/abordagem">
                <Compass className="mr-2 h-4 w-4" /> Explorar
              </Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}
