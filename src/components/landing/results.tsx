
'use client';

import { BarChart, Bot, Brush, DollarSign, Hexagon, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';
import React from 'react';
import { Logo } from './logo';

const metrics = [
    {
      value: '+3.961',
      label: 'SaaS desenvolvido pela CLICKIFY IA',
      icon: TrendingUp,
    },
    {
      value: '+R$932K',
      label: 'Faturados mensalmente por usuários',
      icon: Users,
    },
  ];

export default function Results() {
  return (
    <section className="relative bg-background py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(theme(colors.primary/0.1)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute inset-0 -z-20 bg-background" />

      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Nossos{' '}
            <span className="bg-gradient-to-br from-primary to-purple-400 bg-clip-text text-transparent">
              Resultados
            </span>
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            Veja alguns de nossos números
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Logo Column */}
            <div className="flex justify-center items-center">
                <div className="relative">
                    <Hexagon className="h-48 w-48 text-primary/30" strokeWidth={1} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Logo />
                    </div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,theme(colors.primary/0.3),transparent_60%)]" />
                </div>
            </div>

            {/* Metrics Columns */}
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-background/50 p-8 shadow-2xl shadow-primary/10 transition-all duration-300 hover:border-primary/40 hover:shadow-primary/20"
              >
                <div className="relative text-center">
                    <div className="flex justify-center mb-4">
                        <metric.icon className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-4xl font-bold text-white">{metric.value}</p>
                    <p className="mt-2 text-sm text-neutral-400">{metric.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
