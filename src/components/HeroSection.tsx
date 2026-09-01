import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { HeroBackground } from "./HeroBackground";

const ease = [0.22, 1, 0.36, 1] as const;

export const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <HeroBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-8 md:mt-0">
        
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="mb-8"
        >
          <span className="inline-block text-[11px] md:text-xs font-display uppercase tracking-[0.25em] text-muted-foreground font-semibold px-4 py-2 border border-white/5 rounded-full bg-white/[0.02] backdrop-blur-md">
            CAMALY® DIGITAL PRODUCT STUDIO
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="font-display font-semibold tracking-tighter leading-[0.95] md:leading-[1.02] text-foreground mb-8"
          style={{ 
            fontSize: "clamp(42px, 8vw, 108px)",
            letterSpacing: "-0.04em"
          }}
        >
          Transformamos negócios <br className="hidden md:block" />
          em experiências digitais <br className="hidden md:block" />
          que geram <span className="text-primary italic font-light tracking-tight pr-2">resultado.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="text-muted-foreground font-body text-base md:text-xl max-w-2xl leading-relaxed mb-12"
        >
          Estratégia, design e tecnologia para criar sites, landing pages, e-commerces, sistemas e plataformas digitais construídos para crescer.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wide hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
          >
            Iniciar um projeto
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#projetos"
            className="w-full sm:w-auto flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-transparent border border-white/10 text-foreground font-display font-semibold text-sm tracking-wide hover:border-primary hover:text-primary transition-colors"
          >
            Explorar projetos
            <ArrowDownRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Microcopy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease }}
          className="mt-16 sm:mt-24 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-[11px] sm:text-xs font-display uppercase tracking-[0.15em] text-muted-foreground/60"
        >
          <span>Design estratégico.</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-white/10" />
          <span>Desenvolvimento sob medida.</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-white/10" />
          <span>Performance desde o primeiro pixel.</span>
        </motion.div>

      </div>
    </section>
  );
};
