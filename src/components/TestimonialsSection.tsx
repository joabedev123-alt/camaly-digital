import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    name: "Rafael Mendes",
    role: "CEO, TechForward",
    text: "A Camaly transformou nossa presença digital por completo. O resultado superou todas as expectativas — um nível de design premium e performance impecável que nos colocou à frente no mercado.",
  },
  {
    name: "Juliana Alves",
    role: "Diretora, Studio Belle",
    text: "Profissionalismo e criatividade em outro nível. O site que criaram para nós transmite exatamente a sofisticação e a elegância que nossa marca precisa. Nossos clientes elogiam constantemente.",
  },
  {
    name: "Carlos Eduardo",
    role: "Fundador, NovaTech",
    text: "Desde o diagnóstico estratégico até o lançamento, a experiência com a Camaly foi impecável e muito bem estruturada. Nosso site agora converte três vezes mais leads qualificados.",
  },
];

export const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [active, setActive] = useState(0);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[active];

  return (
    <section className="relative py-32 md:py-48 bg-surface border-y border-white/[0.04] overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsla(162,100%,47%,0.05)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
            className="flex flex-col items-center text-center mb-16"
          >
            <Quote className="w-12 h-12 text-primary/30 mb-8" strokeWidth={1} />
            
            <div className="relative min-h-[180px] md:min-h-[220px] flex items-center justify-center w-full">
              <motion.h3 
                key={active}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.8, ease }}
                className="font-display text-2xl md:text-4xl lg:text-5xl leading-tight font-medium tracking-tight text-foreground"
              >
                "{t.text}"
              </motion.h3>
            </div>

            <motion.div 
              key={`author-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-12 flex flex-col items-center gap-4"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <div>
                <p className="font-display font-semibold text-lg text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground tracking-wide mt-1">{t.role}</p>
              </div>
            </motion.div>
          </motion.div>

          <div className="flex justify-center items-center gap-6 mt-12">
            <button 
              onClick={() => setActive(active === 0 ? testimonials.length - 1 : active - 1)}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-3">
              {testimonials.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${active === i ? 'w-8 bg-primary' : 'bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
            <button 
              onClick={() => setActive((active + 1) % testimonials.length)}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
