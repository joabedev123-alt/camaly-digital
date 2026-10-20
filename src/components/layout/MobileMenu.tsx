import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/system/Icon";
import { EASE } from "@/components/system/Reveal";
import { WhatsAppButton } from "@/components/system/Button";
import { BrandWatermark } from "@/components/brand/BrandWatermark";
import { CONTACT } from "@/config/site";
import { NAV, SERVICE_LINKS } from "./nav";

export const MobileMenu = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink lg:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <BrandWatermark variant="wire" position="bottom-right" opacity={0.06} scale={1.3} />

          <div className="container-x flex items-center justify-between" style={{ height: "var(--header-h)" }}>
            <img src="/brand/camaly-logo-sm.webp" alt="Camaly Digital" className="h-8 w-auto" />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03]"
              aria-label="Fechar menu"
            >
              <Icon name="x-lg" className="text-lg" />
            </button>
          </div>

          <nav aria-label="Menu mobile" className="container-x relative z-10 flex-1 pt-6 pb-8">
            <ul className="flex flex-col">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.05 }}
                  className="border-b border-line"
                >
                  {"mega" in item ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setServicesOpen((v) => !v)}
                        aria-expanded={servicesOpen}
                        className="flex w-full items-center justify-between py-5 text-[30px] font-semibold tracking-tight"
                      >
                        {item.label}
                        <Icon name="plus-lg" className={`text-xl text-soft transition-transform duration-500 ease-premium ${servicesOpen ? "rotate-45" : ""}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {servicesOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <li>
                              <Link to="/servicos" onClick={onClose} className="flex items-center gap-3 py-3 text-soft">
                                <Icon name="grid" className="text-brand" /> Todos os serviços
                              </Link>
                            </li>
                            {SERVICE_LINKS.map((s) => (
                              <li key={s.to}>
                                <Link to={s.to} onClick={onClose} className="flex items-center gap-3 py-3 text-[17px]">
                                  <Icon name={s.icon} className="text-brand" /> {s.label}
                                </Link>
                              </li>
                            ))}
                            <li className="h-4" />
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link to={item.to} onClick={onClose} className="flex items-center justify-between py-5 text-[30px] font-semibold tracking-tight">
                      {item.label}
                      <Icon name="arrow-up-right" className="text-lg text-soft" />
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
              className="mt-10 space-y-6"
            >
              <WhatsAppButton size="lg" className="w-full" context="home">
                Falar sobre meu projeto
              </WhatsAppButton>
              <div className="flex flex-col items-stretch gap-4 text-sm text-soft sm:flex-row sm:items-center sm:justify-center sm:gap-6">
                <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2">
                  <Icon name="instagram" /> @{CONTACT.instagram}
                </a>
                <a href={`mailto:${CONTACT.email}`} className="flex min-h-11 items-center justify-center gap-2">
                  <Icon name="envelope" /> E-mail
                </a>
              </div>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
