
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import InitialSelection from '@/components/prompt-builder/initial-selection';
import PromptBuilder from '@/components/prompt-builder/prompt-builder';
import ReadyMadeSaaS from '@/components/prompt-builder/ready-made-saas';


export default function PromptBuilderPage() {
    const [selection, setSelection] = useState<'initial' | 'custom' | 'template'>('initial');

    const handleBackToSelection = () => {
      setSelection('initial');
    }

    const renderContent = () => {
        switch (selection) {
            case 'custom':
                return <PromptBuilder />;
            case 'template':
                return <ReadyMadeSaaS />;
            case 'initial':
            default:
                return (
                    <InitialSelection setSelection={setSelection} />
                );
        }
    }


  return (
    <main className="p-4 md:p-10 min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        
        <div className="pt-8">
            <AnimatePresence mode="wait">
                <motion.div 
                    key={selection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {selection !== 'initial' && (
                        <div className="mb-8">
                            <Button
                                onClick={handleBackToSelection}
                                variant="ghost"
                                className="text-white/70 hover:text-white hover:bg-white/10"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Voltar para a seleção
                            </Button>
                        </div>
                    )}
                    {renderContent()}
                </motion.div>
            </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
