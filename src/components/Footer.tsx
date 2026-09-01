import { motion } from "framer-motion";
import { MessageCircle, Instagram, Mail } from "lucide-react";

const menuLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Projetos", href: "#projetos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

const serviceLinks = [
  { label: "Landing Pages", href: "#servicos" },
  { label: "Sites Institucionais", href: "#servicos" },
  { label: "E-commerce", href: "#servicos" },
  { label: "Sistemas", href: "#servicos" },
  { label: "Plataformas", href: "#servicos" },
  { label: "UI/UX", href: "#servicos" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-white/[0.04] bg-background">
      <div className="container mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#inicio" className="flex items-center gap-3">
              <img
                src="/Logo frente 03-Photoroom.png"
                alt="Camaly Digital"
                className="h-10 w-auto object-contain"
              />
              <span className="font-display font-bold text-foreground text-2xl tracking-tight">
                CAMALY
              </span>
            </a>
            <p className="mt-6 text-sm text-muted-foreground max-w-[280px] leading-relaxed">
              Estratégia, design e tecnologia para empresas que querem crescer no digital.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="font-display font-semibold text-foreground text-sm tracking-widest uppercase mb-6">Navegação</h4>
            <nav className="flex flex-col gap-3">
              {menuLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Serviços */}
          <div>
            <h4 className="font-display font-semibold text-foreground text-sm tracking-widest uppercase mb-6">Serviços</h4>
            <nav className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-display font-semibold text-foreground text-sm tracking-widest uppercase mb-6">Contato</h4>
            <div className="flex flex-col gap-4">
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href="https://instagram.com/camalydigital"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
              >
                <Instagram className="w-4 h-4" />
                @camalydigital
              </a>
              <a
                href="mailto:contato@camaly.com.br"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
              >
                <Mail className="w-4 h-4" />
                contato@camaly.com.br
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground tracking-wider uppercase">
            © CAMALY DIGITAL — TODOS OS DIREITOS RESERVADOS
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground tracking-wider uppercase">
            <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
            <a href="#" className="hover:text-foreground transition-colors">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
