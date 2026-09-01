import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

// Utilizando marcas genéricas como placeholders elegantes
const BRANDS = [
  "TECHFORWARD", "NOVA TECH", "STUDIO BELLE", "SPACE PARK", "ZAPY", "MEGA PIXX"
];

export const SocialProof = () => {
  return (
    <section className="py-12 border-b border-white/[0.04] bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center text-[10px] md:text-xs font-display uppercase tracking-[0.25em] text-muted-foreground/50 mb-8"
        >
          Projetos desenvolvidos para negócios que decidiram evoluir.
        </motion.p>
        
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="text-lg md:text-2xl font-display font-bold tracking-widest text-muted-foreground hover:text-foreground hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all cursor-default"
            >
              {brand}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
