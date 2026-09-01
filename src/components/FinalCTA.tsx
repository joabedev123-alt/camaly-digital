import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { WhatsAppIconFlat } from "./WhatsAppIcon";
import { FloatingParticles } from "./FloatingParticles";
// Se quiser usar o vídeo, pode, mas um fundo clean escuro com partículas já passa um tom premium.
import ctaVideo from "@/assets/IMG/cta-video.mp4.asset.json";

const ease = [0.22, 1, 0.36, 1] as const;

export const FinalCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="contato" ref={sectionRef} className="relative py-32 md:py-48 overflow-hidden bg-background">
      {/* Vídeo de fundo - opcional, muito escurecido para não roubar a atenção */}
      <div className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none">
        <video
          autoPlay muted loop playsInline
          className="w-full h-full object-cover"
          src={ctaVideo.url}
        />
      </div>

      {/* Overlays e Gradientes */}
      <div className="absolute inset-0 bg-background/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(162,100%,42%,0.08)_0%,transparent_70%)] pointer-events-none" />

      <FloatingParticles count={20} />

      <div className="relative z-10 container mx-auto px-6 md:px-12 text-center max-w-4xl">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease }}
          className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center mx-auto mb-10 text-primary"
        >
          <ArrowRight className="w-8 h-8 rotate-90 md:rotate-0" strokeWidth={1.5} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-foreground leading-tight"
        >
          Seu próximo projeto começa <span className="text-primary italic font-light">aqui.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Se sua marca precisa de um site à altura do que entrega, a Camaly cria a experiência digital memorável que vai te separar da concorrência.
        </motion.p>

        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
        >
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 rounded-xl bg-foreground text-background font-display font-medium text-lg flex items-center gap-3 overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            
            <div className="relative z-10 flex items-center gap-3">
              <WhatsAppIconFlat size={24} />
              Iniciar Projeto
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
