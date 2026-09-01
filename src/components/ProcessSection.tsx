import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Stethoscope, Compass, Paintbrush, Code2, Rocket, RefreshCw,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  { Icon: Stethoscope, title: "Diagnóstico",      desc: "Imersão profunda no seu negócio para mapear o cenário atual e identificar oportunidades claras de crescimento." },
  { Icon: Compass,     title: "Estratégia",        desc: "Definição do posicionamento, arquitetura de informação e direcionamento focado em conversão." },
  { Icon: Paintbrush,  title: "Direção visual",    desc: "Criação de uma identidade autêntica, com UI Design focado na experiência do usuário e na estética premium." },
  { Icon: Code2,       title: "Desenvolvimento",   desc: "Engenharia de software com as tecnologias mais modernas, garantindo performance, segurança e escalabilidade." },
  { Icon: Rocket,      title: "Lançamento",        desc: "Deploy monitorado e garantia de que tudo funciona perfeitamente no ambiente de produção." },
  { Icon: RefreshCw,   title: "Evolução",          desc: "Análise de métricas, testes e refinamento contínuo para extrair o máximo de resultado." },
];

export const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="processo" ref={sectionRef} className="relative py-24 md:py-36 bg-background overflow-hidden border-t border-white/[0.04]">
      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-6xl">
        
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-20 md:mb-32"
        >
          <span className="inline-block text-[11px] md:text-xs font-display uppercase tracking-[0.25em] text-muted-foreground font-semibold px-4 py-2 border border-white/5 rounded-full bg-white/[0.02] backdrop-blur-md mb-6">
            Nosso Método
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tighter text-foreground max-w-3xl mx-auto">
            Da concepção ao <span className="text-primary italic font-light">resultado escalável.</span>
          </h2>
        </motion.div>

        {/* Linha do Tempo Clean */}
        <div className="relative">
          {/* Linha Vertical (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/[0.05] -translate-x-1/2" />

          <div className="space-y-16 md:space-y-32">
            {steps.map((step, index) => {
              const { Icon } = step;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, ease, delay: index * 0.15 }}
                  className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16 group"
                >
                  {/* Conector Central (Desktop) */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border border-white/10 items-center justify-center z-10 transition-colors duration-500 group-hover:border-primary/50 group-hover:bg-primary/5">
                    <span className="font-display text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Conteúdo Esquerda */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right md:pr-16' : 'md:order-last md:pl-16'} flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                    <div className="w-14 h-14 rounded-2xl bg-surface border border-white/[0.05] flex items-center justify-center mb-6 text-foreground group-hover:text-primary group-hover:border-primary/20 transition-all duration-500">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold mb-3 text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base max-w-sm">
                      {step.desc}
                    </p>
                  </div>
                  
                  {/* Espaço Vazio para alinhamento na outra metade */}
                  <div className={`hidden md:block w-1/2 ${isEven ? 'md:order-last' : ''}`} />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
