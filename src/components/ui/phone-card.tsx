
'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";

interface PhoneCardProps {
    title: string;
    description: string;
    imageUrl?: string;
}

export const PhoneCard: React.FC<PhoneCardProps> = ({ title, description, imageUrl }) => {
    return (
        <div className="relative w-full max-w-[280px] mx-auto aspect-[9/19.5] bg-black border-4 border-neutral-800 rounded-[2.5rem] overflow-hidden shadow-xl">
            <div className="absolute inset-0 z-10 p-1">
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-[2.25rem]"
                    />
                )}
                 <div className="absolute inset-0 bg-black/40 rounded-[2.25rem]"></div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-center">
                <h3 className="text-white text-lg font-bold mb-1">{title}</h3>
                <p className="text-neutral-300 text-sm">{description}</p>
            </div>
            
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-30"></div>
        </div>
    );
};
