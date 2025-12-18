'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {
  Loader2,
  AlertCircle,
  Phone,
  Globe,
  Clock,
  MapPin,
  ExternalLink
} from 'lucide-react';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';

type Resultado = {
  nome: string;
  endereco: string | null;
  horario: string | null;
  site: string | null;
  telefone: string | null;
};

export default function Home() {
  const [cidade, setCidade] = useState('');
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setResultados([]);
    setError(null);
    setSearched(true);

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

  return (
    // Aumentei o max-w para 7xl para caber melhor 3 cards lado a lado
    <main className="p-4 md:p-10 max-w-7xl mx-auto min-h-screen bg-black text-white">
      
      {/* Card de Busca Futurista */}
      <Card className="mb-10 bg-zinc-900/50 border-zinc-800 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.15)]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            CLICKIFY
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input
              placeholder="Cidade (ex: São Paulo)"
              value={cidade}
              onChange={e => setCidade(e.target.value)}
              // Estilo futurista para o input
              className="bg-black/50 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-all duration-300"
            />
            <Input
              placeholder="O que buscar? (ex: Barbearia)"
              value={busca}
              onChange={e => setBusca(e.target.value)}
              // Estilo futurista para o input
              className="bg-black/50 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-all duration-300"
            />
          </div>

          <Button
            onClick={handleSearch}
            disabled={loading || !cidade || !busca}
            // Botão Roxo Futurista com brilho
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold tracking-wide shadow-[0_0_10px_rgba(147,51,234,0.5)] hover:shadow-[0_0_20px_rgba(147,51,234,0.8)] transition-all duration-300 border border-purple-500/50"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              'INICIAR VARREDURA'
            )}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-8 bg-red-900/20 border-red-800 text-red-300">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro no Sistema</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {searched && !loading && !error && resultados.length === 0 && (
         <Alert className="mb-8 bg-zinc-900/50 border-zinc-800 text-zinc-300">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Sem Dados</AlertTitle>
          <AlertDescription>Nenhum resultado encontrado nos parâmetros da busca.</AlertDescription>
        </Alert>
      )}

      {/* MUDANÇA PRINCIPAL: Grid Layout de 3 colunas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resultados.map((item, index) => (
          <Card 
            key={index} 
            // Estilo Futurista do Card (translúcido, borda roxa ao passar o mouse, brilho)
            className="bg-zinc-900/40 border-zinc-800/80 backdrop-blur-sm text-zinc-100 overflow-hidden hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-500 group relative"
          >
            {/* Um pequeno efeito de luz no topo do card */}
            <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <CardHeader className="pb-3 border-b border-zinc-800/50 relative">
                 <CardTitle className="text-lg font-bold text-white tracking-tight truncate">{item.nome}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3 text-sm">
                {item.endereco && (
                  <div className="flex items-start text-zinc-400">
                    <MapPin className="mr-3 h-4 w-4 shrink-0 mt-0.5 text-purple-500/70" />
                    <p className="line-clamp-2">{item.endereco}</p>
                  </div>
                )}
                {item.horario && (
                  <div className="flex items-start text-zinc-400">
                    <Clock className="mr-3 h-4 w-4 shrink-0 mt-0.5 text-purple-500/70" />
                    <p>{item.horario}</p>
                  </div>
                )}
                {item.site && (
                  <div className="flex items-start group/link">
                    <Globe className="mr-3 h-4 w-4 shrink-0 mt-0.5 text-purple-400" />
                    {/* MUDANÇA DO LINK: Roxo Neon Futurista */}
                    <a 
                      href={item.site} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-purple-400 hover:text-purple-300 transition-colors duration-300 break-all flex items-center gap-1 hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]"
                    >
                      <span className="truncate">{new URL(item.site).hostname.replace('www.', '')}</span>
                      <ExternalLink className="h-3 w-3 opacity-50 group-hover/link:opacity-100 transition-opacity" />
                    </a>
                  </div>
                )}
                {item.telefone && (
                  <div className="flex items-start text-zinc-400">
                    <Phone className="mr-3 h-4 w-4 shrink-0 mt-0.5 text-purple-500/70" />
                    <p className="font-mono">{item.telefone}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
