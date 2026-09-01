import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export const ImpactBlock = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-44 bg-surface border-y border-white/[0.04] overflow-hidden flex items-center justify-center"
    >
      {/* Glow Sutil Central */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsla(162, 100%, 47%, 0.4) 0%, transparent 70%)",
          filter: "blur(60px)"
        }}
      />
      
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '3rem 3rem',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
        }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12 text-center max-w-4xl">
        
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="inline-block text-[11px] md:text-xs font-display uppercase tracking-[0.25em] text-muted-foreground font-semibold px-4 py-2 border border-white/5 rounded-full bg-white/[0.02] backdrop-blur-md mb-8"
        >
          Manifesto Camaly
        </motion.span>

        {/* Título Principal */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease, delay: 0.3 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.05] mb-12 text-foreground"
        >
          Acreditamos que o design tem o poder de <span className="text-primary italic font-light">transformar</span> a percepção de valor do seu negócio.
        </motion.h2>

        {/* Parágrafo Secundário */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.4 }}
          className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-muted-foreground font-body"
        >
          Desenvolvemos projetos digitais que unem identidade visual autêntica, tecnologia de ponta e arquitetura focada em performance e conversão.
        </motion.p>
      </div>
    </section>
  );
};
