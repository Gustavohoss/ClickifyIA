'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import {
  Loader2,
  AlertCircle,
  ExternalLink,
  Send,
  Save,
  Check,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { GradientButton } from '@/components/ui/gradient-button';
import { useFirebase, useUser } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { LocationMap } from '@/components/ui/expand-map';


type Resultado = {
  nome: string;
  endereco: string | null;
  horario: string | null;
  site: string | null;
  telefone: string | null;
};

export default function ScraperPage() {
  const [cidade, setCidade] = useState('');
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [filtrarComTelefone, setFiltrarComTelefone] = useState(false);
  const [filtrarSemTelefone, setFiltrarSemTelefone] = useState(false);
  const [filtrarComSite, setFiltrarComSite] = useState(false);
  const [filtrarSemSite, setFiltrarSemSite] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const { toast } = useToast();

  const { firestore } = useFirebase();
  const { user } = useUser();

  const handleSearch = async () => {
    setLoading(true);
    setResultados([]);
    setError(null);
    setSearched(true);
    setSaved([]);

    try {
      const response = await fetch(
        `/api/scraper?busca=${encodeURIComponent(busca)}&cidade=${encodeURIComponent(cidade)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha na busca.');
      }

      const result = await response.json();

      if (result && result.length > 0) {
        setResultados(result);
      } else {
        setError('Nenhum resultado encontrado para sua busca.');
      }
    } catch (err: any) {
      console.error('Erro:', err);
      setError(err.message || 'Falha ao se comunicar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLead = async (leadData: Resultado) => {
    if (!user || !firestore) {
        setError('Você precisa estar logado para salvar um lead.');
        return;
    }

    setSaving(leadData.nome);

    try {
        const leadsCollection = collection(firestore, `users/${user.uid}/leads`);
        await addDoc(leadsCollection, {
            ...leadData,
            ownerId: user.uid,
            notes: '',
            status: 'Novo',
            valorContrato: 0,
            ultimaInteracao: serverTimestamp(),
            createdAt: serverTimestamp()
        });
        setSaved(prev => [...prev, leadData.nome]);
        toast({
            title: "Lead Salvo!",
            description: `${leadData.nome} foi adicionado à sua lista.`,
            variant: "default",
        })

    } catch (err: any) {
        console.error("Erro ao salvar lead:", err);
        setError("Não foi possível salvar o lead. Tente novamente.");
         toast({
            title: "Erro ao Salvar",
            description: "Não foi possível salvar o lead. Tente novamente.",
            variant: "destructive",
        })
    } finally {
        setSaving(null);
    }
  };

  const resultadosFiltrados = useMemo(() => {
    return resultados.filter(item => {
      let passaFiltro = true;

      if (filtrarComTelefone) {
        passaFiltro = passaFiltro && !!item.telefone;
      }
      if (filtrarSemTelefone) {
        passaFiltro = passaFiltro && !item.telefone;
      }
      if (filtrarComSite) {
        passaFiltro = passaFiltro && !!item.site;
      }
      if (filtrarSemSite) {
        passaFiltro = passaFiltro && !item.site;
      }
      
      return passaFiltro;
    });
  }, [resultados, filtrarComTelefone, filtrarSemTelefone, filtrarComSite, filtrarSemSite]);

  return (
    <main className="p-4 md:p-10 min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-fuchsia-500/10 rounded-full mix-blend-normal filter blur-[96px] animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        <motion.div
          className="relative z-10 space-y-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="text-center space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block"
            >
              <h1 className="text-3xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/40 pb-1">
                CLICKIFY
              </h1>
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.div>
            <motion.p
              className="text-sm text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Digite uma cidade e o que você procura
            </motion.p>
          </div>

          <motion.div
            className="relative backdrop-blur-2xl bg-white/[0.02] rounded-2xl border border-white/[0.05] shadow-2xl"
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Cidade (ex: São Paulo)"
                  value={cidade}
                  onChange={e => setCidade(e.target.value)}
                  className="bg-black/50 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-all duration-300"
                />
                <Input
                  placeholder="O que buscar? (ex: Barbearia)"
                  value={busca}
                  onChange={e => setBusca(e.target.value)}
                  className="bg-black/50 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-all duration-300"
                />
              </div>

              {searched && resultados.length > 0 && (
                <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-400">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="filtro-com-telefone" checked={filtrarComTelefone} onCheckedChange={(checked) => setFiltrarComTelefone(Boolean(checked))} className="border-zinc-600 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"/>
                        <Label htmlFor="filtro-com-telefone" className="cursor-pointer">Com Telefone</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="filtro-sem-telefone" checked={filtrarSemTelefone} onCheckedChange={(checked) => setFiltrarSemTelefone(Boolean(checked))} className="border-zinc-600 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"/>
                        <Label htmlFor="filtro-sem-telefone" className="cursor-pointer">Sem Telefone</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="filtro-com-site" checked={filtrarComSite} onCheckedChange={(checked) => setFiltrarComSite(Boolean(checked))} className="border-zinc-600 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500" />
                        <Label htmlFor="filtro-com-site" className="cursor-pointer">Com Site</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="filtro-sem-site" checked={filtrarSemSite} onCheckedChange={(checked) => setFiltrarSemSite(Boolean(checked))} className="border-zinc-600 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500" />
                        <Label htmlFor="filtro-sem-site" className="cursor-pointer">Sem Site</Label>
                    </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/[0.05] flex items-center justify-center md:justify-end">
              <GradientButton
                variant="variant"
                onClick={handleSearch}
                disabled={loading || !cidade || !busca}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-[spin_2s_linear_infinite]" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span className="ml-2">{loading ? 'Processando...' : 'INICIAR VARREDURA'}</span>
              </GradientButton>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="mt-12">
            {error && (
                <Alert variant="destructive" className="mb-8 bg-red-900/20 border-red-800 text-red-300">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro no Sistema</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {searched && !loading && !error && resultadosFiltrados.length === 0 && (
                <Alert className="mb-8 bg-zinc-900/50 border-zinc-800 text-zinc-300">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Sem Dados</AlertTitle>
                <AlertDescription>Nenhum resultado encontrado para a sua busca ou filtros selecionados.</AlertDescription>
                </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resultadosFiltrados.map((item, index) => (
                <LocationMap
                    key={index}
                    location={item.nome}
                    details={{
                        endereco: item.endereco,
                        horario: item.horario,
                        site: item.site,
                        telefone: item.telefone,
                    }}
                    actionButton={
                        <GradientButton
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent card click
                                handleSaveLead(item);
                            }}
                            disabled={saving === item.nome || saved.includes(item.nome)}
                            className={cn("w-full gradient-button-green", {"opacity-50 cursor-not-allowed": saved.includes(item.nome)})}
                        >
                            {saving === item.nome ? <Loader2 className="w-4 h-4 animate-spin"/> : saved.includes(item.nome) ? <Check className="w-4 h-4"/> : <Save className="w-4 h-4" />}
                            <span className="ml-2">
                                {saving === item.nome ? 'Salvando...' : saved.includes(item.nome) ? 'Salvo!' : 'Salvar Lead'}
                            </span>
                        </GradientButton>
                    }
                />
                ))}
            </div>
        </div>

      </div>
    </main>
  );
}
