'use client';

import { ArrowRight, FileText, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AuthGuard from '@/components/auth-guard';
import { useFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';

function PainelContent() {
  const { auth } = useFirebase();
  const router = useRouter();

  const handleSignOut = async () => {
    await auth.signOut();
    router.push('/login');
  };

  return (
    <main className="p-4 md:p-10 min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-fuchsia-500/10 rounded-full mix-blend-normal filter blur-[96px] animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        <motion.div
          className="relative z-10 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex justify-between items-center">
            <div className="text-left space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-block"
                >
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/60 pb-2">
                    Bem-vindo ao seu Painel
                  </h1>
                </motion.div>
                <motion.p
                  className="text-lg text-white/50 max-w-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Escolha uma das ferramentas abaixo para começar.
                </motion.p>
            </div>
            <motion.button
                onClick={handleSignOut}
                className="group relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-white/[0.05] rounded-xl border border-white/[0.1] shadow-lg transition-all duration-300 hover:bg-white/[0.1]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
            </motion.button>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            <Link href="/scraper" passHref>
              <motion.div
                className="group relative backdrop-blur-xl bg-white/[0.02] rounded-2xl border border-white/[0.05] shadow-2xl p-8 cursor-pointer overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                    CLICKIFY Scraper
                  </h2>
                  <p className="text-white/40 mt-2">
                    Uma ferramenta de varredura para encontrar informações de estabelecimentos.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-end text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                  Acessar Ferramenta
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </Link>
            <Link href="/prompt-builder" passHref>
              <motion.div
                className="group relative backdrop-blur-xl bg-white/[0.02] rounded-2xl border border-white/[0.05] shadow-2xl p-8 cursor-pointer overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                    Construtor de Prompts
                  </h2>
                  <p className="text-white/40 mt-2">
                    Crie um briefing de projeto detalhado respondendo a algumas perguntas.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-end text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                  Acessar Ferramenta
                  <FileText className="ml-2 h-4 w-4 transform group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-bl from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default function PainelPage() {
    return (
        <AuthGuard>
            <PainelContent />
        </AuthGuard>
    );
}