import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/system/Icon";
import { EASE } from "@/components/system/Reveal";
import { waLink, type WaContext } from "@/lib/whatsapp";

function contextFor(pathname: string): WaContext {
  if (pathname.startsWith("/servicos/sites")) return "sites";
  if (pathname.startsWith("/servicos/landing")) return "landing-pages";
  if (pathname.startsWith("/servicos/ecommerce")) return "ecommerce";
  if (pathname.startsWith("/servicos/sistemas")) return "sistemas";
  if (pathname.startsWith("/portfolio")) return "portfolio";
  if (pathname.startsWith("/processo")) return "processo";
  if (pathname.startsWith("/contato")) return "contato";
  return "home";
}

/**
 * CTA flutuante de WhatsApp.
 * Desktop: botão com tooltip. Mobile: barra fixa inferior após o primeiro scroll,
 * escondida quando há um CTA de conversão visível na tela.
 */
export const WhatsAppFloat = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [ctaInView, setCtaInView] = useState(false);
  const href = waLink(contextFor(pathname));

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Evita sobrepor CTAs principais e o rodapé. Reconsulta quando o botão
  // aparece, pois as páginas são carregadas sob demanda.
  useEffect(() => {
    if (!visible) return;
    const targets = document.querySelectorAll("[data-cta-zone], footer");
    if (!targets.length) return;
    const seen = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
        setCtaInView(seen.size > 0);
      },
      { threshold: 0.15 },
    );
    targets.forEach((t) => io.observe(t));
    return () => {
      io.disconnect();
      setCtaInView(false);
    };
  }, [pathname, visible]);

  const show = visible && !ctaInView;

  return (
    <>
      {/* Desktop */}
      <AnimatePresence>
        {show && (
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fale com a Camaly pelo WhatsApp"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="group fixed bottom-7 right-7 z-40 hidden md:flex items-center"
          >
            <span className="pointer-events-none mr-3 translate-x-2 rounded-full border border-line bg-surface/95 px-4 py-2 text-[13px] font-medium opacity-0 shadow-xl backdrop-blur transition-all duration-500 ease-premium group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
              Fale com a Camaly
            </span>
            <span className="relative grid h-14 w-14 place-items-center rounded-full border border-primary/30 bg-ink text-brand shadow-[0_10px_40px_-10px_rgba(0,240,168,0.5)] transition-colors duration-500 group-hover:bg-brand group-hover:text-ink">
              <span className="absolute inset-0 rounded-full border border-primary/40 animate-ping [animation-duration:2.8s]" aria-hidden />
              <Icon name="whatsapp" className="text-[22px]" />
            </span>
          </motion.a>
        )}
      </AnimatePresence>

      {/* Mobile */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            exit={{ y: "110%" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/90 px-4 pt-3 backdrop-blur-xl md:hidden"
            style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
          >
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
              <Icon name="whatsapp" />
              <span>Falar sobre meu projeto</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
