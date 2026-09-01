import { motion, useInView } from "framer-motion";
import { Sparkles, Target, Zap, Crown } from "lucide-react";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const pillars = [
  { 
    Icon: Crown, 
    title: "Design Autoral", 
    desc: "Cada projeto é desenhado do zero. Sem templates genéricos, focamos em uma estética única que posiciona sua marca no topo." 
  },
  { 
    Icon: Target, 
    title: "Foco em Conversão", 
    desc: "Beleza com propósito. Estruturamos a jornada do usuário para maximizar métricas, leads e vendas reais." 
  },
  { 
    Icon: Zap, 
    title: "Alta Performance", 
    desc: "Tecnologia de ponta, código otimizado e arquitetura moderna para garantir carregamento instantâneo e estabilidade." 
  },
  { 
    Icon: Sparkles, 
    title: "Experiência Premium", 
    desc: "Do primeiro atendimento à entrega final, oferecemos um serviço executivo e consultivo de alto padrão." 
  },
];

export const Differentials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="diferenciais" ref={sectionRef} className="relative py-24 md:py-36 bg-background border-t border-white/[0.04]">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16 md:mb-24 max-w-3xl mx-auto"
        >
          <span className="inline-block text-[11px] md:text-xs font-display uppercase tracking-[0.25em] text-muted-foreground font-semibold px-4 py-2 border border-white/5 rounded-full bg-white/[0.02] backdrop-blur-md mb-6">
            Padrão Camaly
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tighter text-foreground mb-6">
            A diferença está no que <span className="text-primary italic font-light">você não vê.</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Nós não apenas criamos sites. Nós projetamos ecossistemas digitais robustos, pensados meticulosamente em cada detalhe técnico e visual.
          </p>
        </motion.div>

        {/* 4 Pilares */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const { Icon } = pillar;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                className="group relative p-8 rounded-3xl bg-surface border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Glow sutil de fundo */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-500 relative z-10">
                  <Icon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
                </div>
                
                <div className="relative z-10">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">{pillar.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{pillar.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
