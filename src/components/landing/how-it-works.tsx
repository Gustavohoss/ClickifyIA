
'use client';

import { BGPattern } from "@/components/ui/bg-pattern";

const steps = [
    {
      number: 1,
      title: "Responda as Perguntas",
      description: "Explique seu projeto, público e propósito. Nossa IA compreenderá e planejará a estrutura ideal.",
      align: "left",
    },
    {
      number: 2,
      title: "Visualize e Personalize",
      description: "Personalize cores, fontes e design de forma simples para refletir a identidade da sua marca.",
      align: "right",
    },
    {
      number: 3,
      title: "Gere com 1 clique",
      description: "Em instantes, seu sistema completo será gerado — interface, servidor e painel de controle inclusos.",
      align: "left",
    },
    {
      number: 4,
      title: "Publique e Lucre",
      description: "Publique online, conecte seu domínio e comece a lucrar com seu novo produto digital.",
      align: "right",
    },
  ];

const HowItWorks = () => {
    return (
        <section className="relative py-24">
            <BGPattern variant="grid" fill="hsl(var(--primary) / 0.1)" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center md:text-left max-w-3xl mx-auto md:mx-0 mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white font-body">
                        Com a <span className="text-primary">CLICKIFY</span>, desenvolver um SaaS é fácil, ágil e eficiente:
                    </h2>
                </div>

                <div className="relative max-w-3xl mx-auto">
                    {/* Vertical line */}
                    <div className="absolute left-1/2 top-5 bottom-5 w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>

                    <div className="space-y-16">
                        {steps.map((step, index) => (
                            <div key={index} className="relative">
                                {/* Card */}
                                <div className={`flex flex-col md:flex-row items-center ${step.align === 'right' ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="w-full md:w-5/12">
                                        <div className="bg-background/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6 shadow-lg">
                                            <h3 className="font-bold text-primary text-xl mb-2">{step.title}</h3>
                                            <p className="text-neutral-300">{step.description}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Number Circle and Horizontal Line */}
                                <div className={`absolute top-1/2 -translate-y-1/2 flex items-center w-auto ${step.align === 'left' ? 'right-0 md:right-auto md:left-1/2 md:-translate-x-full md:-mr-4' : 'left-0 md:left-auto md:right-1/2 md:translate-x-full md:-ml-4'}`}>
                                   {step.align === 'left' && <div className="w-10 h-px bg-border hidden md:block"></div> }
                                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-md shadow-primary/30">
                                        {step.number}
                                    </div>
                                    {step.align === 'right' && <div className="w-10 h-px bg-border hidden md:block"></div> }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
