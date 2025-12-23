
'use client'
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}


export const GradientCard: React.FC<GradientCardProps> = ({ title, description, icon }) => {
   return (
    <div className={cn(
        "group relative p-6 rounded-2xl overflow-hidden",
        "bg-background/50 border border-primary/20",
        "transition-all duration-300 ease-in-out",
        "hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20"
    )}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <motion.div
            className="relative text-center h-full z-10"
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
        >
          <div className="mb-4 flex h-48 w-full items-center justify-center rounded-lg border border-primary/20 bg-black">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-purple-500/10 border border-purple-500/20">
                {icon}
            </div>
          </div>

          <div className="mb-auto">
            <h3
              className="text-lg font-semibold text-white"
            >
              {title}
            </h3>
            <p
              className="mt-2 text-sm text-neutral-400"
            >
              {description}
            </p>
          </div>
        </motion.div>
    </div>
  );
};
