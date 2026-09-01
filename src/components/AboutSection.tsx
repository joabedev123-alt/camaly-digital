import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import jonatanImg from "@/assets/socios/Jonatan Drumond.png";
import joabeImg from "@/assets/socios/Joabe Avila.png";
import igorImg from "@/assets/socios/Igor Martins.png";

const ease = [0.22, 1, 0.36, 1] as const;

const team = [
  { name: "Jonatan Drumond", role: "CEO & Estrategista", image: jonatanImg },
  { name: "Joabe Avila",     role: "CPO & Tech Lead", image: joabeImg },
  { name: "Igor Martins",    role: "CIO & Design Lead", image: igorImg },
];

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="sobre" ref={sectionRef} className="relative py-24 md:py-36 bg-background overflow-hidden">
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* COLUNA ESQUERDA: Texto */}
          <div className="flex flex-col">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
              className="inline-block self-start text-[11px] md:text-xs font-display uppercase tracking-[0.25em] text-muted-foreground font-semibold px-4 py-2 border border-white/5 rounded-full bg-white/[0.02] backdrop-blur-md mb-8"
            >
              Quem Somos
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter leading-tight mb-8 text-foreground"
            >
              Nascemos da ambição de criar produtos digitais excepcionais.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.3 }}
              className="text-base md:text-lg leading-relaxed mb-6 font-body text-muted-foreground"
            >
              Somos um Digital Product Studio liderado por três especialistas unidos por um propósito: elevar o padrão do mercado digital. 
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.4 }}
              className="text-sm md:text-base leading-relaxed text-muted-foreground/80 font-body"
            >
              Como o camaleão, nosso símbolo, nos adaptamos aos desafios de cada negócio, entregando estratégia, tecnologia e design perfeitamente alinhados para o crescimento.
            </motion.p>
          </div>

          {/* COLUNA DIREITA: Equipe */}
          <div className="flex flex-col gap-6">
            {team.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-6 p-4 md:p-6 rounded-2xl bg-surface border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/10 transition-colors"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/10 overflow-hidden flex-shrink-0 bg-background">
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg md:text-xl text-foreground mb-1">{m.name}</h3>
                  <p className="text-sm text-primary tracking-wide">{m.role}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
