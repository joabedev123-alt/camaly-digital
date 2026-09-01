import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/* ══════════════════════════════════════════════════
   Grid Tecnológico de Fundo
   ══════════════════════════════════════════════════ */
const TechGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsla(162, 100%, 47%, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, hsla(162, 100%, 47%, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse at top, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at top, black 20%, transparent 70%)',
        }}
      />
    </div>
  );
};

/* ══════════════════════════════════════════════════
   Nós e Conexões (Representando Ideia -> Resultado)
   ══════════════════════════════════════════════════ */
const NodesNetwork = () => {
  const nodes = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 12 : 24;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 2 + Math.random() * 3,
      duration: 15 + Math.random() * 15,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size,
            height: node.size,
            boxShadow: "0 0 12px 2px hsla(162,100%,47%,0.4)",
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: node.duration,
            repeat: Infinity,
            delay: node.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════════════
   Linhas Geométricas / Wireframes 
   ══════════════════════════════════════════════════ */
const WireframeLines = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
      <svg className="w-full h-full max-w-[1200px]" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M100,600 C300,600 400,200 600,200 C800,200 900,400 1100,400"
          stroke="hsla(162, 100%, 47%, 0.15)"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeOut", delay: 0.5 }}
        />
        <motion.path
          d="M100,500 L1100,500"
          stroke="hsla(255, 100%, 100%, 0.05)"
          strokeWidth="1"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 1 }}
        />
        <motion.path
          d="M600,100 L600,700"
          stroke="hsla(255, 100%, 100%, 0.05)"
          strokeWidth="1"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 1.2 }}
        />
      </svg>
    </div>
  );
};

export const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Fundo ultra premium dark */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Iluminação suave e radial (glow muito discreto) */}
      <div 
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-[100%] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, hsla(162, 100%, 47%, 0.15) 0%, transparent 60%)',
          filter: 'blur(60px)'
        }}
      />
      
      <TechGrid />
      <WireframeLines />
      <NodesNetwork />
    </div>
  );
};
