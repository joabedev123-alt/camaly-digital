import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Globe2,
  Megaphone,
  ShoppingCart,
  Cpu,
  PenTool,
  TrendingUp,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    Icon: Globe2,
    title: "Sites Institucionais",
    desc:  "Presença digital sólida com design premium que transmite autoridade e converte visitantes em clientes.",
    className: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    Icon: ShoppingCart,
    title: "E-commerces",
    desc:  "Lojas digitais de alta performance com experiência de compra fluida.",
    className: "col-span-1 md:col-span-1 row-span-2",
  },
  {
    Icon: Megaphone,
    title: "Landing Pages",
    desc:  "Páginas de alta conversão focadas em resultados rápidos.",
    className: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    Icon: PenTool,
    title: "UI/UX Design",
    desc:  "Interfaces inteligentes focadas na usabilidade do usuário.",
    className: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    Icon: Cpu,
    title: "Sistemas Web",
    desc:  "Aplicações sob medida para otimizar sua operação diária.",
    className: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    Icon: TrendingUp,
    title: "Estratégia Digital",
    desc:  "Análise de dados e SEO para crescimento escalável.",
    className: "col-span-1 md:col-span-2 row-span-1",
  }
];

export const ServicesGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="servicos" ref={sectionRef} className="relative py-24 md:py-32 bg-background overflow-hidden border-t border-white/[0.04]">
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row gap-8 justify-between items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
            className="max-w-2xl"
          >
            <span className="inline-block text-[11px] md:text-xs font-display uppercase tracking-[0.25em] text-muted-foreground font-semibold px-4 py-2 border border-white/5 rounded-full bg-white/[0.02] backdrop-blur-md mb-6">
              Nossa Expertise
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tighter text-foreground">
              Soluções sob medida para o seu <span className="text-primary italic font-light">crescimento.</span>
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="text-muted-foreground max-w-md"
          >
            Nossa equipe de especialistas desenvolve produtos digitais com as tecnologias mais modernas do mercado, garantindo performance, segurança e escalabilidade.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(200px,auto)] gap-4 md:gap-6">
          {services.map((service, i) => {
            const { Icon } = service;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                className={`group relative p-8 md:p-10 rounded-3xl bg-surface border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 overflow-hidden flex flex-col justify-between ${service.className}`}
              >
                {/* Ícone */}
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-500">
                  <Icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
                </div>
                
                <div className="relative z-10">
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};
