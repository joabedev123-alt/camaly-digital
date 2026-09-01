import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import spaceParkImg from "@/assets/Plataforma/space park.png";
import zapyImg from "@/assets/Plataforma/zapy.png";
import megaPixImg from "@/assets/Plataforma/mega pix.png";
import portfolioEcommerce1 from "@/assets/IMG/portfolio-ecommerce-1.png";
import portfolioEcommerce2 from "@/assets/IMG/portfolio-ecommerce-2.png";
import portfolioEcommerce3 from "@/assets/IMG/portfolio-ecommerce-3.png";
import andersonImg from "@/assets/landing page/anderson .png";
import landscapImg from "@/assets/landing page/landscap.png";
import thaynaraImg from "@/assets/landing page/thaynara.png";
import domMiguelImg from "@/assets/Institucional/dommiguel.png";
import genesisImg from "@/assets/Institucional/genesis tatoo.png";
import starKaseImg from "@/assets/Institucional/star kase.png";
import douglasImg from "@/assets/Imobiliario/douglas.png";
import mansaoImg from "@/assets/Imobiliario/mansao venda nova.png";

const ease = [0.22, 1, 0.36, 1] as const;

// Agrupando os projetos para visualização de destaque
const allProjects = [
  {
    title: "Space Park",
    category: "Plataforma Web",
    image: spaceParkImg,
    url: "https://www.estacionamentospacepark.com.br",
  },
  {
    title: "Zapy",
    category: "Sistema",
    image: zapyImg,
    url: "https://zapybr.com.br",
  },
  {
    title: "Mega Pix",
    category: "Plataforma Web",
    image: megaPixImg,
    url: "https://megapixx.net",
  },
  {
    title: "Anderson Silva",
    category: "Landing Page",
    image: andersonImg,
    url: "http://andersonsilvatreinador.com.br",
  },
  {
    title: "Dom Miguel",
    category: "Site Institucional",
    image: domMiguelImg,
    url: "https://dommiguelindustria.com.br",
  },
  {
    title: "Genesis Tattoo",
    category: "Site Institucional",
    image: genesisImg,
    url: "https://www.genesistattoo.com.br",
  },
  {
    title: "MD Landiscap",
    category: "Landing Page",
    image: landscapImg,
    url: "https://mdlandiscapellc.com",
  },
  {
    title: "Douglas Azevedo",
    category: "Mercado Imobiliário",
    image: douglasImg,
    url: "https://douglasazevedoimoveis.com.br",
  },
  {
    title: "Mansão Venda Nova",
    category: "Mercado Imobiliário",
    image: mansaoImg,
    url: "https://mansaovendanova.com.br",
  },
];

const FeaturedProject = ({ project, index }: { project: typeof allProjects[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, scale }}
      className="relative w-full h-[60vh] md:h-[80vh] mb-16 md:mb-32 group rounded-3xl overflow-hidden"
    >
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative overflow-hidden bg-surface cursor-pointer">
        {/* Imagem com Parallax */}
        <motion.div 
          style={{ y }} 
          className="absolute inset-0 w-full h-[130%]"
        >
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </motion.div>
        
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent transition-opacity duration-500" />
        
        {/* Info do Projeto */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div>
            <span className="inline-block text-[10px] md:text-xs font-display uppercase tracking-[0.2em] text-primary mb-3">
              {project.category}
            </span>
            <h3 className="font-display font-semibold text-3xl md:text-5xl lg:text-6xl text-white tracking-tighter">
              {project.title}
            </h3>
          </div>
          
          <div className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm uppercase tracking-widest font-display opacity-0 group-hover:opacity-100 duration-500">
            Ver projeto
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:translate-x-2 transition-transform">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  return (
    <section id="projetos" className="relative py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="inline-block text-[11px] md:text-xs font-display uppercase tracking-[0.25em] text-muted-foreground font-semibold px-4 py-2 border border-white/5 rounded-full bg-white/[0.02] backdrop-blur-md mb-6">
            Portfólio Selecionado
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-foreground mb-6">
            Projetos de <span className="text-primary italic font-light">Impacto.</span>
          </h2>
        </motion.div>

        {/* Lista de Projetos (Exibindo os primeiros 6 para não ficar muito longo) */}
        <div className="w-full max-w-[1400px] mx-auto">
          {allProjects.slice(0, 6).map((project, index) => (
            <FeaturedProject key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
