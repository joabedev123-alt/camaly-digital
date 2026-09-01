import { motion } from "framer-motion";

const technologies = [
  "React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Node.js", 
  "Figma", "Webflow", "Shopify", "WordPress", "PostgreSQL", "AWS"
];

export const TechMarquee = () => {
  return (
    <section className="py-12 md:py-20 border-y border-white/[0.04] bg-surface overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent z-10" />
      
      <div className="flex overflow-hidden relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          className="flex whitespace-nowrap gap-12 md:gap-24 items-center pr-12 md:pr-24"
        >
          {/* Duplicar para loop contínuo */}
          {[...technologies, ...technologies].map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className="font-display font-bold text-2xl md:text-4xl lg:text-5xl text-foreground opacity-10 hover:opacity-50 transition-opacity duration-300 select-none"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
