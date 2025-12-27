
'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Copy, Check, Handshake, Store, UtensilsCrossed, Megaphone, Scale, Calculator, Building, Sparkles as SparklesIcon, Dumbbell, Code, Camera, Scissors, Search, Dog, Coffee, Landmark, Briefcase, Palette, Car, Shield, Languages, Pencil, Calendar, HeartPulse, BrainCircuit, Smartphone, Flower, DiscAlbum, DraftingCompass, Plane, ShoppingCart, Award, Mic, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from '@/components/ui/input';


const approachTemplates = [
    {
        category: 'Barbearia',
        icon: <Handshake className="w-5 h-5 text-yellow-400" />,
        message: `Olá, [Nome do Contato]! Meu nome é [Seu Nome].\n\nNotei a [Nome da Barbearia] e fiquei impressionado com o estilo de vocês. Tenho uma solução que ajuda barbearias a [Principal Problema que Resolve], resultando em [Benefício Principal].\n\nÉ algo como [Sua Solução em uma frase]. Nosso diferencial é [Seu Principal Diferencial].\n\nGostaria de agendar uma chamada rápida de 15 minutos para mostrar como podemos ajudar a [Nome da Barbearia] a crescer. O que acha?`
    },
    {
        category: 'Loja de Roupas',
        icon: <Store className="w-5 h-5 text-blue-400" />,
        message: `Oi, [Nome do Contato], tudo bem? Sou [Seu Nome].\n\nAdmiro muito o trabalho da [Nome da Loja]! Vi que vocês focam em [Estilo da Loja] e acredito que minha solução pode ser muito útil.\n\nNós ajudamos lojas como a sua a [Principal Problema que Resolve], o que leva a [Benefício Principal]. Fazemos isso através de [Sua Solução em uma frase].\n\nNosso principal diferencial é [Seu Principal Diferencial], e o objetivo é simples: [Seu Objetivo].\n\nSerá que teríamos 15 minutos na próxima semana para eu te apresentar a ideia?`
    },
    {
        category: 'Restaurante',
        icon: <UtensilsCrossed className="w-5 h-5 text-red-400" />,
        message: `Prezado(a) [Nome do Contato],\n\nMeu nome é [Seu Nome] e sou especialista em [Sua Área]. Acompanho o [Nome do Restaurante] e a qualidade de vocês é fantástica.\n\nTrabalho com uma solução que resolve o [Principal Problema que Resolve] para restaurantes, gerando [Benefício Principal]. Em resumo, nós [Sua Solução em uma frase].\n\nO que nos torna únicos é [Seu Principal Diferencial].\n\nMeu objetivo é agendar uma conversa de 15 minutos para explorar como podemos gerar mais resultados para o [Nome do Restaurante].\n\nQual o melhor dia e horário para você?`
    },
    {
        category: 'Agência de Marketing',
        icon: <Megaphone className="w-5 h-5 text-indigo-400" />,
        message: `Olá, [Nome do Contato], tudo bem? Sou [Seu Nome], especialista em [Sua Especialidade].\n\nAnalisando a presença online da [Nome da Agência], vi que vocês fazem um ótimo trabalho em [Área de Destaque da Agência].\n\nTenho uma ferramenta que ajuda agências a [Problema que Resolve], otimizando o [Processo Otimizado] e entregando [Benefício para o Cliente Final].\n\nSeria ótimo ter 15 minutos para mostrar como podemos agregar valor aos seus projetos. O que me diz?`
    },
    {
        category: 'Advocacia',
        icon: <Scale className="w-5 h-5 text-gray-400" />,
        message: `Dr(a). [Nome do Contato], boa tarde. Meu nome é [Seu Nome].\n\nEncontrei o escritório [Nome da Advocacia] e notei a especialização de vocês em [Área do Direito].\n\nDesenvolvemos uma solução que auxilia escritórios a [Problema que Resolve], garantindo mais [Benefício Principal, ex: segurança jurídica, eficiência].\n\nNossa plataforma [Sua Solução em uma frase]. Teria um breve momento na sua agenda para uma demonstração de como podemos otimizar o dia a dia do seu escritório?`
    },
    {
        category: 'Contabilidade',
        icon: <Calculator className="w-5 h-5 text-cyan-400" />,
        message: `Prezado(a) [Nome do Contato],\n\nSou [Seu Nome], e trabalho com soluções para escritórios de contabilidade.\n\nSei que a rotina na [Nome da Contabilidade] é corrida, e viemos para ajudar. Nossa ferramenta automatiza o [Processo que Automatiza], reduzindo o tempo gasto em tarefas manuais e minimizando erros.\n\nO resultado é [Benefício Principal]. Gostaria de apresentar nossa solução em 15 minutos. Qual o melhor momento para você?`
    },
    {
        category: 'Imobiliária',
        icon: <Building className="w-5 h-5 text-orange-400" />,
        message: `Olá, [Nome do Contato], como vai? Meu nome é [Seu Nome].\n\nSou especialista em tecnologia para o setor imobiliário e fiquei impressionado com os imóveis da [Nome da Imobiliária].\n\nNossa plataforma ajuda imobiliárias a [Principal Problema que Resolve], o que resulta em [Benefício, ex: mais leads qualificados, fechamentos mais rápidos].\n\nPodemos conversar por 15 minutos para que eu possa mostrar como podemos impulsionar as vendas da [Nome da Imobiliária]?`
    },
    {
        category: 'Clínica de Estética',
        icon: <SparklesIcon className="w-5 h-5 text-pink-400" />,
        message: `Oi, [Nome do Contato], tudo bem? Me chamo [Seu Nome].\n\nVi o trabalho incrível que vocês fazem na [Nome da Clínica] e admiro muito a qualidade dos procedimentos.\n\nNós temos uma solução que ajuda clínicas de estética a [Problema que Resolve, ex: gerenciar agendamentos, fidelizar clientes], aumentando o [Benefício, ex: faturamento, taxa de retorno].\n\nSeria um prazer apresentar a ferramenta em uma chamada rápida. Você teria um horário nesta semana?`
    },
    {
        category: 'Academia / Fitness',
        icon: <Dumbbell className="w-5 h-5 text-red-500" />,
        message: `Olá, [Nome do Contato]! Sou [Seu Nome] e vi que a [Nome da Academia] está com tudo!\n\nTenho uma plataforma que ajuda academias a [Problema, ex: reter alunos, gerenciar aulas], o que melhora a [Benefício, ex: experiência do membro, ocupação das aulas].\n\nCom nossa ferramenta, vocês conseguem [Sua Solução em uma frase].\n\nGostaria de mostrar como podemos ajudar a [Nome da Academia] a lotar as turmas. Tem 15 minutos disponíveis?`
    },
    {
        category: 'Desenvolvedor(a) Freelancer',
        icon: <Code className="w-5 h-5 text-green-400" />,
        message: `Fala, [Nome do Contato]! Beleza? Sou [Seu Nome], também sou dev.\n\nVi seu perfil no [Plataforma, ex: LinkedIn] e gostei muito dos seus projetos. Tenho uma ferramenta que pode te ajudar a [Problema que Resolve, ex: organizar tarefas, gerenciar clientes].\n\nEla basicamente [Sua Solução em uma frase], liberando mais tempo pra você focar no código.\n\nTopa fazer uma call rápida de 10 min pra eu te mostrar? Sem compromisso.`
    },
    {
        category: 'Fotógrafo(a)',
        icon: <Camera className="w-5 h-5 text-gray-300" />,
        message: `Olá, [Nome do Contato], tudo bem? Meu nome é [Seu Nome].\n\nSeu trabalho fotográfico é incrível, parabéns! Acompanho seu portfólio e a qualidade é sensacional.\n\nNós desenvolvemos uma plataforma que ajuda fotógrafos a [Problema que Resolve, ex: organizar galerias, vender fotos online], o que resulta em [Benefício, ex: mais vendas, melhor experiência para o cliente].\n\nQue tal 15 minutinhos para eu te mostrar como funciona? Acredito que pode otimizar muito seu fluxo.`
    },
    {
        category: 'Salão de Beleza',
        icon: <Scissors className="w-5 h-5 text-purple-400" />,
        message: `Oi, [Nome do Contato]! Sou [Seu Nome] e adoro o que vocês fazem no [Nome do Salão].\n\nTrabalho com uma solução que ajuda salões a [Problema, ex: diminuir faltas, lotar a agenda], aumentando o [Benefício, ex: faturamento mensal].\n\nÉ um sistema de [Sua Solução em uma frase] que encanta as clientes.\n\nSeria ótimo te apresentar a ideia em 15 minutos. Podemos marcar um horário?`
    },
    {
        category: 'Pet Shop',
        icon: <Dog className="w-5 h-5 text-amber-600" />,
        message: `Olá, [Nome do Contato]! Sou [Seu Nome] e apaixonado por pets assim como vocês da [Nome do Pet Shop].\n\nVi que vocês oferecem [Serviço do Pet Shop, ex: banho e tosa] e tenho uma solução que pode ajudar a [Problema que Resolve, ex: organizar os agendamentos e lembrar os tutores].\n\nO objetivo é aumentar a [Benefício, ex: frequência dos clientes e a satisfação]. Podemos bater um papo rápido de 15 minutos sobre isso?`
    },
    {
        category: 'Cafeteria',
        icon: <Coffee className="w-5 h-5 text-yellow-800" />,
        message: `Oi, [Nome do Contato], tudo bem? Meu nome é [Seu Nome].\n\nSou fã do ambiente da [Nome da Cafeteria]! Vi o cuidado que vocês têm com o café e com o atendimento.\n\nTenho uma ideia para ajudar vocês a [Problema que Resolve, ex: criar um programa de fidelidade digital], incentivando os clientes a voltarem sempre.\n\nGostaria de te apresentar a proposta em 10 minutinhos. Que tal?`
    },
    {
        category: 'Consultor Financeiro',
        icon: <Landmark className="w-5 h-5 text-green-600" />,
        message: `Prezado(a) [Nome do Contato],\n\nMeu nome é [Seu Nome]. Encontrei seu perfil e vi que você é especialista em [Área da Consultoria].\n\nDesenvolvi uma ferramenta que auxilia consultores a [Problema que Resolve, ex: automatizar o acompanhamento de carteiras], liberando mais tempo para prospecção e estratégia.\n\nSeria um prazer demonstrar como a [Nome da Ferramenta] pode otimizar seu trabalho. Você teria 15 minutos disponíveis na próxima semana?`
    },
    {
        category: 'Coach de Carreira',
        icon: <Briefcase className="w-5 h-5 text-blue-500" />,
        message: `Olá, [Nome do Contato], como vai? Sou [Seu Nome].\n\nAcompanho seu trabalho como coach e admiro a forma como você [Ponto Positivo do Coach].\n\nNós criamos uma plataforma para coaches que ajuda a [Problema que Resolve, ex: organizar sessões, compartilhar materiais e acompanhar o progresso dos clientes], tudo em um só lugar.\n\nGostaria de te mostrar como podemos te ajudar a escalar seu atendimento. Podemos conversar por 15 minutos?`
    },
    {
        category: 'Designer Gráfico',
        icon: <Palette className="w-5 h-5 text-rose-400" />,
        message: `Fala, [Nome do Contato]! Beleza? Sou [Seu Nome].\n\nVi seu portfólio no [Onde Viu, ex: Behance] e seu trabalho é de altíssimo nível. Parabéns!\n\nTenho uma ferramenta que ajuda designers a [Problema que Resolve, ex: gerenciar revisões de projetos com clientes de forma visual], evitando dezenas de e-mails e confusão.\n\nTopa uma call de 10 minutos para eu te mostrar como funciona? Acho que vai economizar um bom tempo pra você.`
    },
    {
        category: 'Loja de Carros',
        icon: <Car className="w-5 h-5 text-neutral-400" />,
        message: `Olá, [Nome do Contato]. Meu nome é [Seu Nome] e sou especialista em soluções para o setor automotivo.\n\nVi o estoque da [Nome da Loja] e a qualidade dos veículos é impressionante.\n\nNós temos uma plataforma que ajuda lojas de carro a [Problema que Resolve, ex: criar anúncios em vídeo automaticamente para cada veículo], aumentando o [Benefício, ex: engajamento online e o número de leads].\n\nPodemos agendar uma breve apresentação para eu mostrar como funciona na prática?`
    },
    {
        category: 'Corretor de Seguros',
        icon: <Shield className="w-5 h-5 text-teal-500" />,
        message: `Prezado(a) [Nome do Contato],\n\nMeu nome é [Seu Nome]. Sei que a rotina de um corretor é corrida, e por isso entro em contato.\n\nDesenvolvemos um sistema que ajuda corretores a [Problema que Resolve, ex: gerenciar renovações de apólices de forma automática], garantindo que nenhuma oportunidade seja perdida.\n\nO resultado é [Benefício, ex: maior retenção de clientes e mais tempo para vender]. Gostaria de te apresentar a solução. Tem 15 minutos disponíveis?`
    },
    {
        category: 'Escola de Idiomas',
        icon: <Languages className="w-5 h-5 text-sky-500" />,
        message: `Oi, [Nome do Contato], tudo bem? Sou [Seu Nome].\n\nAdmiro muito o trabalho da [Nome da Escola] em ensinar [Idioma Ensinado].\n\nNós temos uma plataforma que ajuda escolas de idiomas a [Problema que Resolve, ex: oferecer aulas de conversação com nativos sob demanda], criando um diferencial incrível para os alunos.\n\nSeria ótimo apresentar essa parceria em uma conversa de 15 minutos. O que acha?`
    },
    {
        category: 'Estúdio de Tatuagem',
        icon: <Pencil className="w-5 h-5 text-gray-500" />,
        message: `E aí, [Nome do Artista]! Sou [Seu Nome].\n\nSigo seu trabalho no Instagram e suas tattoos são animais! O traço é muito único.\n\nEu criei um sistema que ajuda tatuadores a [Problema que Resolve, ex: organizar a agenda de orçamentos e agendamentos], para você focar só na arte.\n\nÉ algo bem visual e prático. Quer fazer uma chamada de 10 minutos pra eu te mostrar? Sem compromisso.`
    },
    {
        category: 'Produtor de Eventos',
        icon: <Calendar className="w-5 h-5 text-red-600" />,
        message: `Olá, [Nome do Contato], tudo bem? Meu nome é [Seu Nome].\n\nAcompanho os eventos da [Nome da Produtora] e a qualidade de vocês é referência.\n\nNós desenvolvemos uma solução para produtores que [Problema que Resolve, ex: centraliza a venda de ingressos, a comunicação com o público e o controle de acesso], tudo em uma única plataforma.\n\nO objetivo é simples: [Benefício, ex: evento mais organizado e público satisfeito]. Podemos conversar por 15 minutos sobre como podemos colaborar?`
    },
    {
        category: 'Nutricionista',
        icon: <HeartPulse className="w-5 h-5 text-lime-500" />,
        message: `Oi, Dr(a). [Nome do Contato], como vai? Me chamo [Seu Nome].\n\nVi seu conteúdo sobre [Tópico de Nutrição] e achei excelente. Ajuda muitas pessoas!\n\nNós temos um aplicativo que ajuda nutricionistas a [Problema que Resolve, ex: entregar planos alimentares interativos e acompanhar a evolução dos pacientes de perto].\n\nA ideia é [Benefício, ex: aumentar a adesão ao plano e fidelizar seus pacientes]. Gostaria de fazer uma demonstração rápida. Teria um horário livre nesta semana?`
    },
    {
        category: 'Psicólogo(a)',
        icon: <BrainCircuit className="w-5 h-5 text-fuchsia-500" />,
        message: `Olá, Dr(a). [Nome do Contato]. Meu nome é [Seu Nome].\n\nEncontrei seu perfil e admiro muito seu trabalho na área de [Especialidade da Psicologia].\n\nDesenvolvemos uma plataforma segura que ajuda psicólogos a [Problema que Resolve, ex: gerenciar prontuários e agendamentos de forma 100% online e criptografada], garantindo a privacidade e otimizando seu tempo.\n\nSeria um prazer apresentar a ferramenta em uma chamada de 15 minutos. Qual o melhor momento para você?`
    },
    {
        category: 'Loja de Eletrônicos',
        icon: <Smartphone className="w-5 h-5 text-slate-400" />,
        message: `Oi, [Nome do Contato]. Sou [Seu Nome].\n\nVi que a [Nome da Loja] tem uma ótima variedade de [Tipo de Produto, ex: smartphones].\n\nTenho uma solução que ajuda lojas de eletrônicos a [Problema que Resolve, ex: criar um sistema de trade-in (troca de usados)], atraindo mais clientes e aumentando o ticket médio.\n\nGostaria de apresentar a proposta em uma conversa rápida. Podemos marcar?`
    },
    {
        category: 'Floricultura',
        icon: <Flower className="w-5 h-5 text-pink-500" />,
        message: `Olá, [Nome do Contato], tudo bem?\n\nMeu nome é [Seu Nome] e fiquei encantado(a) com os arranjos da [Nome da Floricultura].\n\nTrabalho com um sistema de e-commerce especializado para floriculturas, que permite [Funcionalidade, ex: agendar entregas com data e horário específicos e vender assinaturas de flores].\n\nO objetivo é [Benefício, ex: aumentar as vendas online e criar uma receita recorrente]. Adoraria mostrar para você. Tem 15 minutos disponíveis?`
    },
    {
        category: 'DJ',
        icon: <DiscAlbum className="w-5 h-5 text-violet-500" />,
        message: `Fala, [Nome do DJ]! Beleza? Sou [Seu Nome].\n\nOuvi seu último set no [Plataforma, ex: SoundCloud] e a seleção estava muito fina!\n\nEu desenvolvi uma ferramenta que ajuda DJs a [Problema que Resolve, ex: criar uma página profissional para divulgar suas datas, sets e informações de contato], tudo de forma simples e estilosa.\n\nQuer fazer uma call de 10 minutos para eu te mostrar? Pode te ajudar a conseguir mais gigs.`
    },
    {
        category: 'Arquiteto(a)',
        icon: <DraftingCompass className="w-5 h-5 text-stone-500" />,
        message: `Prezado(a) [Nome do Arquiteto],\n\nMeu nome é [Seu Nome]. Acompanho seu trabalho e sou grande admirador(a) da estética dos seus projetos.\n\nNós criamos uma plataforma de realidade aumentada que permite que arquitetos [Funcionalidade, ex: apresentem seus projetos 3D diretamente no ambiente do cliente], criando uma experiência imersiva e impactante.\n\nSei que seu tempo é valioso, por isso gostaria de agendar uma demonstração de apenas 15 minutos. Qual seria um bom momento?`
    },
    {
        category: 'Agência de Viagens',
        icon: <Plane className="w-5 h-5 text-cyan-600" />,
        message: `Olá, [Nome do Contato], tudo bem?\n\nSou [Seu Nome] e vi os roteiros incríveis que a [Nome da Agência] monta.\n\nNós temos uma solução que ajuda agências a [Problema que Resolve, ex: criar roteiros visuais e interativos para os clientes], em vez de enviar PDFs estáticos. Isso aumenta o [Benefício, ex: encantamento e a taxa de conversão].\n\nSeria ótimo te apresentar a plataforma. Podemos marcar uma conversa rápida?`
    },
    {
        category: 'E-commerce (Genérico)',
        icon: <ShoppingCart className="w-5 h-5 text-emerald-500" />,
        message: `Oi, [Nome do Contato], tudo bem? Sou [Seu Nome].\n\nAnalisando a [Nome da Loja Online], vi que vocês têm ótimos produtos.\n\nSomos especialistas em [Sua Especialidade, ex: recuperação de carrinho abandonado] e nossa ferramenta ajuda e-commerces a [Benefício, ex: aumentar o faturamento em até 15%] com uma abordagem automatizada e inteligente.\n\nPosso te mostrar em 15 minutos como conseguimos esses resultados?`
    },
    {
        category: 'Personal Trainer',
        icon: <Award className="w-5 h-5 text-amber-500" />,
        message: `Olá, [Nome do Personal], beleza? Meu nome é [Seu Nome].\n\nVi seus stories no Instagram e a energia dos seus treinos é contagiante!\n\nEu desenvolvi um aplicativo para personais que [Problema que Resolve, ex: organiza as fichas de treino dos alunos e permite que eles registrem o progresso de forma fácil], deixando seu acompanhamento muito mais profissional.\n\nQuer fazer uma call rápida para eu te mostrar como funciona e como pode te ajudar a reter mais alunos?`
    },
    {
        category: 'Criador de Conteúdo',
        icon: <Mic className="w-5 h-5 text-blue-300" />,
        message: `E aí, [Nome do Criador]! Sou [Seu Nome] e curto muito o seu conteúdo sobre [Nicho do Conteúdo].\n\nTenho uma ferramenta que pode te ajudar a [Problema que Resolve, ex: transformar seus vídeos longos em dezenas de clipes curtos para redes sociais], usando IA para encontrar os melhores momentos.\n\nA ideia é economizar seu tempo de edição e multiplicar seu alcance. Topa ver como funciona em 10 minutinhos?`
    },
    {
        category: 'Mecânica',
        icon: <Wrench className="w-5 h-5 text-slate-500" />,
        message: `Olá, [Nome do Contato], tudo bem? Meu nome é [Seu Nome].\n\nVi a [Nome da Mecânica] e a boa avaliação de vocês na região.\n\nNós temos um sistema que ajuda mecânicas a [Problema que Resolve, ex: enviar atualizações do serviço por WhatsApp com fotos e vídeos para o cliente], gerando muito mais transparência e confiança.\n\nIsso [Benefício, ex: aumenta a satisfação e a fidelização]. Podemos agendar uma conversa de 15 minutos para que eu possa apresentar a solução?`
    }
];

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
    const [copied, setCopied] = useState(false);
    const { toast } = useToast();

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        toast({
            title: "Texto Copiado!",
            description: "O modelo de abordagem foi copiado para sua área de transferência.",
        });
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <Button
            onClick={handleCopy}
            size="sm"
            className={cn(
                "bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300",
                copied && "bg-green-600 hover:bg-green-700"
            )}
        >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? 'Copiado!' : 'Copiar Texto'}
        </Button>
    );
}

export default function AbordagemPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTemplates = useMemo(() => {
        if (!searchTerm) {
            return approachTemplates;
        }
        return approachTemplates.filter(template =>
            template.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <main className="p-4 md:p-10 min-h-screen bg-black text-white relative overflow-hidden">
             <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute -top-1/4 left-0 w-96 h-96 bg-green-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
                <div className="absolute -bottom-1/4 right-0 w-96 h-96 bg-green-500/20 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
            </div>

            <div className="w-full max-w-4xl mx-auto relative z-10 space-y-8">
                 <div className="absolute top-0 left-0">
                    <Link href="/painel" passHref>
                        <Button
                        variant="ghost"
                        className="text-white/70 hover:text-white hover:bg-white/10"
                        >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar ao Painel
                        </Button>
                    </Link>
                </div>
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="pt-16"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/60">
                            Modelos de Abordagem
                        </h1>
                        <p className="mt-2 text-zinc-400">Scripts prontos para você copiar e adaptar em sua prospecção.</p>
                    </div>

                     <motion.div 
                        className="p-6 space-y-6 bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                         <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                            <Input
                                placeholder="Pesquisar por tipo de negócio..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 bg-zinc-800/50 border-zinc-700 focus:border-purple-500"
                            />
                        </div>

                         <Accordion type="single" collapsible className="w-full">
                            {filteredTemplates.map((template, index) => (
                                 <AccordionItem key={index} value={`item-${index}`} className={cn("border-zinc-800", index === filteredTemplates.length - 1 && 'border-b-0')}>
                                    <AccordionTrigger className="hover:no-underline text-lg font-semibold text-zinc-200 hover:text-white transition-colors py-5">
                                        <div className="flex items-center gap-3">
                                            {template.icon}
                                            <span>{template.category}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-2">
                                        <div className="bg-zinc-900/50 p-4 rounded-md border border-zinc-700/50">
                                            <p className="whitespace-pre-wrap text-zinc-300 leading-relaxed font-mono text-sm">{template.message}</p>
                                            <div className="mt-4 flex justify-end">
                                               <CopyButton textToCopy={template.message} />
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                        {filteredTemplates.length === 0 && (
                            <div className="text-center py-10 text-zinc-500">
                                <p>Nenhum modelo encontrado para &quot;{searchTerm}&quot;.</p>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}
