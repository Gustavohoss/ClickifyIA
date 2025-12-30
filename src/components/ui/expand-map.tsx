"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { MapPin, Clock, Globe, Phone, ExternalLink } from "lucide-react"

interface LocationMapProps {
  location?: string
  details: {
    endereco: string | null;
    horario: string | null;
    site: string | null;
    telefone: string | null;
  }
  className?: string
  actionButton?: React.ReactNode;
}

export function LocationMap({
  location = "Local Desconhecido",
  details,
  actionButton,
  className,
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-100, 100], [10, -10])
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10])

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleClick = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <motion.div
      ref={containerRef}
      className={`relative cursor-pointer select-none ${className}`}
      style={{
        perspective: 1200,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm text-zinc-100 will-change-transform"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          height: isExpanded ? "auto" : 140,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: isExpanded ? 30: 20,
        }}
      >
        
        <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-5">
          {/* Top section */}
          <div className="flex items-start justify-between">
            <div className="relative w-full">
               <h3 className="text-white font-bold text-lg tracking-tight truncate pr-10">{location}</h3>
            </div>
            
            <motion.div
              className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-foreground/5 backdrop-blur-sm flex-shrink-0"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span className="text-[10px] font-medium text-muted-foreground tracking-wide uppercase">Lead</span>
            </motion.div>
          </div>

          {/* Collapsed content placeholder */}
           <motion.div 
            animate={{ opacity: isExpanded ? 0 : 1, height: isExpanded ? 0 : 'auto' }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="space-y-1 overflow-hidden"
          >
              <div className="w-3/4 h-2 bg-zinc-700/50 rounded-full" />
              <div className="w-1/2 h-2 bg-zinc-700/50 rounded-full" />
          </motion.div>

          <AnimatePresence>
            {isExpanded && (
                <motion.div
                  className="space-y-3 text-sm mt-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                    {details.endereco && (
                    <div className="flex items-start text-zinc-400">
                        <MapPin className="mr-3 h-4 w-4 shrink-0 mt-0.5 text-purple-500/70" />
                        <p className="line-clamp-2">{details.endereco}</p>
                    </div>
                    )}
                    {details.horario && (
                    <div className="flex items-start text-zinc-400">
                        <Clock className="mr-3 h-4 w-4 shrink-0 mt-0.5 text-purple-500/70" />
                        <p>{details.horario}</p>
                    </div>
                    )}
                    {details.site && (
                    <div className="flex items-start group/link">
                        <Globe className="mr-3 h-4 w-4 shrink-0 mt-0.5 text-purple-400" />
                        <a
                        href={details.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-purple-400 hover:text-purple-300 transition-colors duration-300 break-all flex items-center gap-1 hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]"
                        >
                        <span className="truncate">{new URL(details.site).hostname.replace('www.', '')}</span>
                        <ExternalLink className="h-3 w-3 opacity-50 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                    </div>
                    )}
                    {details.telefone && (
                    <div className="flex items-start text-zinc-400">
                        <Phone className="mr-3 h-4 w-4 shrink-0 mt-0.5 text-purple-500/70" />
                        <p className="font-mono">{details.telefone}</p>
                    </div>
                    )}
                </motion.div>
            )}
          </AnimatePresence>
          
           <AnimatePresence>
            {isExpanded && actionButton && (
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto', transition: { delay: 0.2 } }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {actionButton}
                </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>

      <motion.p
        className="absolute -bottom-6 left-1/2 text-[10px] text-muted-foreground whitespace-nowrap"
        style={{ x: "-50%" }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered && !isExpanded ? 1 : 0,
          y: isHovered ? 0 : 4,
        }}
        transition={{ duration: 0.2 }}
      >
        Click to expand
      </motion.p>
    </motion.div>
  )
}
