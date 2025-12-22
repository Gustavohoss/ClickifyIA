'use client';
import { Logo } from './logo';
export function ResultsLogo() {
    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            <svg className="absolute w-full h-full text-primary/30" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.2" />
            </svg>
             <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="absolute w-full h-full text-primary/80" viewBox="0 0 100 100" style={{ filter: "drop-shadow(0 0 10px hsl(var(--primary)))" }}>
                     <path d="M50 2 L95.5 27 V77 L50 98 L4.5 77 V27 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                <div className="z-10">
                    <Logo />
                </div>
            </div>
        </div>
    )
}
