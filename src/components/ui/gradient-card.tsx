
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
        "relative p-8 rounded-2xl overflow-hidden",
        "bg-zinc-900/40 border border-zinc-800/80",
        "transition-all duration-300 ease-in-out",
        "hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10"
    )}>
        <motion.div
            className="relative flex flex-col h-full z-10"
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
        >
          <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-purple-500/10 border border-purple-500/20">
            {icon}
          </div>

          <div className="mb-auto">
            <h3
              className="text-xl font-medium text-white mb-2"
            >
              {title}
            </h3>
            <p
              className="text-sm mb-4 text-gray-300"
            >
              {description}
            </p>
          </div>
        </motion.div>
    </div>
  );
};
