import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import { useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    question: "Quanto tempo leva para desenvolver um projeto completo?",
    answer: "O tempo varia de acordo com a complexidade, mas nossos projetos institucionais levam em média de 3 a 5 semanas. E-commerces e sistemas sob medida podem levar de 6 a 12 semanas. O foco é manter a agilidade sem jamais comprometer nosso padrão de qualidade premium."
  },
  {
    question: "Vocês trabalham com templates prontos?",
    answer: "Não. Cada projeto que desenvolvemos na Camaly Digital é exclusivo e desenhado do zero. Acreditamos que marcas premium exigem uma identidade única que as diferencie da concorrência, o que é impossível com templates genéricos."
  },
  {
    question: "Quais tecnologias a Camaly utiliza?",
    answer: "Utilizamos as stacks mais modernas do mercado, como React, Next.js, Node.js e Tailwind CSS para sistemas e aplicações. Também trabalhamos com Shopify para E-commerces de alta conversão, e Webflow ou WordPress (headless) para sites institucionais flexíveis."
  },
  {
    question: "O site será otimizado para o Google (SEO)?",
    answer: "Sim, todos os nossos projetos são desenvolvidos seguindo as melhores práticas globais de SEO on-page, garantindo semântica correta, velocidade de carregamento (Performance) e acessibilidade, para que sua marca rankeie de forma orgânica."
  },
  {
    question: "Como funciona o acompanhamento após o lançamento?",
    answer: "Oferecemos garantia de estabilidade e um plano de evolução contínua. Nossa equipe estará à disposição para métricas, atualizações e ajustes estratégicos, garantindo que o seu produto digital continue gerando resultados escaláveis."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const toggleOpen = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" ref={sectionRef} className="relative py-24 md:py-36 bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[11px] md:text-xs font-display uppercase tracking-[0.25em] text-muted-foreground font-semibold px-4 py-2 border border-white/5 rounded-full bg-white/[0.02] backdrop-blur-md mb-6">
            Dúvidas Comuns
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tighter text-foreground">
            Perguntas Frequentes
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-surface border-white/10' : 'bg-transparent border-white/[0.04] hover:bg-white/[0.02]'}`}
              >
                <button
                  onClick={() => toggleOpen(i)}
                  className="flex items-center justify-between w-full p-6 md:p-8 text-left focus:outline-none"
                >
                  <span className={`font-display text-lg md:text-xl font-medium transition-colors ${isOpen ? 'text-primary' : 'text-foreground'}`}>
                    {faq.question}
                  </span>
                  <div className={`ml-4 shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-primary/10 text-primary' : 'bg-white/5 text-muted-foreground'}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                    >
                      <div className="px-6 md:px-8 pb-8 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
