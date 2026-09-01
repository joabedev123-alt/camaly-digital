import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const metrics = [
  { value: "3x", label: "Mais conversão" },
  { value: "120+", label: "Projetos entregues" },
  { value: "98%", label: "Satisfação dos clientes" },
  { value: "100%", label: "Atendimento estratégico" },
];

export const ResultsSection = () => {
  return (
    <section className="py-24 bg-surface border-y border-white/[0.04] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="md:w-1/3"
          >
            <h2 className="font-display font-semibold text-3xl md:text-4xl tracking-tight leading-tight mb-6">
              O design só é incrível se trouxer <span className="text-primary italic font-light">resultado.</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Não entregamos apenas beleza. Construímos ferramentas de vendas, engajamento e conversão. A performance é a métrica principal.
            </p>
          </motion.div>

          <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 w-full">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="flex flex-col items-start md:items-center text-left md:text-center"
              >
                <span className="font-display text-4xl md:text-5xl font-semibold tracking-tighter text-foreground mb-2">
                  {m.value}
                </span>
                <span className="text-sm font-medium text-muted-foreground/80 uppercase tracking-wider">
                  {m.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
