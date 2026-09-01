import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { WhatsAppIconFlat } from "./WhatsAppIcon";

const menuItems = [
  { label: "Projetos", href: "#projetos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease }}
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] md:h-[80px] px-6 md:px-12 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "bg-background/70 backdrop-blur-md border-b border-white/[0.04]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <a href="#inicio" className="flex items-center gap-3">
          <img
            src="/Logo frente 03-Photoroom.png"
            alt="Camaly Digital"
            className="h-10 sm:h-12 w-auto object-contain"
          />
          <span className="font-display font-bold text-foreground text-xl tracking-tight hidden sm:block">
            CAMALY
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center justify-center h-11 px-6 rounded-lg bg-primary text-primary-foreground font-display text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            INICIAR PROJETO ↗
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-foreground flex items-center justify-center h-11 w-11 rounded-full bg-white/5 border border-white/10"
            aria-label="Abrir menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col justify-center px-6"
          >
            <nav className="flex flex-col gap-8">
              {menuItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease }}
                  className="text-3xl font-display font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4, ease }}
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center h-14 w-full rounded-xl bg-primary text-primary-foreground font-display font-semibold text-lg"
              >
                INICIAR PROJETO ↗
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
