
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Package, PencilRuler } from 'lucide-react';

interface InitialSelectionProps {
    setSelection: (selection: 'custom' | 'template') => void;
}

export default function InitialSelection({ setSelection }: InitialSelectionProps) {
    return (
        <div className="text-center">
            <div className="text-center mb-12 space-y-2">
                <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/60">
                    Como você quer começar?
                </h1>
                <p className="text-lg text-white/50 max-w-2xl mx-auto">
                    Crie um projeto do zero com nosso assistente ou escolha um modelo pronto para acelerar o desenvolvimento.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                <motion.div
                    className="group relative backdrop-blur-xl bg-white/[0.02] rounded-2xl border border-zinc-800 shadow-2xl p-8 cursor-pointer overflow-hidden hover:border-purple-500/50 transition-colors duration-300"
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    onClick={() => setSelection('custom')}
                >
                    <div className="relative z-10 text-left">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 group-hover:text-purple-300 transition-colors">
                        Criar do Zero
                        </h2>
                        <p className="text-white/40 mt-2">
                        Use nosso assistente passo a passo para gerar um briefing detalhado e criar seu SaaS personalizado.
                        </p>
                    </div>
                    <div className="mt-6 flex items-center text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                        Começar
                        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                    <PencilRuler className="absolute -right-8 -bottom-8 h-32 w-32 text-white/5 group-hover:text-purple-500/10 transition-colors duration-500"/>
                </motion.div>
                <motion.div
                    className="group relative backdrop-blur-xl bg-white/[0.02] rounded-2xl border border-zinc-800 shadow-2xl p-8 cursor-pointer overflow-hidden hover:border-teal-500/50 transition-colors duration-300"
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    onClick={() => setSelection('template')}
                >
                    <div className="relative z-10 text-left">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 group-hover:text-teal-300 transition-colors">
                        Pegar um Pronto
                        </h2>
                        <p className="text-white/40 mt-2">
                        Escolha um modelo de SaaS pré-construído e acelere o lançamento do seu projeto.
                        </p>
                    </div>
                    <div className="mt-6 flex items-center text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                        Ver Modelos
                        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                    <Package className="absolute -right-8 -bottom-8 h-32 w-32 text-white/5 group-hover:text-teal-500/10 transition-colors duration-500"/>
                </motion.div>
            </div>
        </div>
    );
}
