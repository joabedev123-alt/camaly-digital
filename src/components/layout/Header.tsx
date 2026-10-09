import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/system/Icon";
import { EASE } from "@/components/system/Reveal";
import { WhatsAppButton } from "@/components/system/Button";
import { FEATURED_PROJECTS } from "@/data/projects";
import { NAV, SERVICE_LINKS } from "./nav";
import { MobileMenu } from "./MobileMenu";

export const Logo = ({ className }: { className?: string }) => (
  <Link to="/" className={cn("flex items-center shrink-0", className)} aria-label="Camaly Digital — página inicial">
    <img src="/brand/camaly-logo.webp" alt="Camaly Digital" width={560} height={193} className="h-8 w-auto lg:h-9" />
  </Link>
);

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number>();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMegaOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  const openMega = () => {
    window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 140);
  };

  const solid = scrolled || megaOpen;
  const featured = FEATURED_PROJECTS[0];

  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-ink">
        Pular para o conteúdo
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-premium border-b",
          solid ? "bg-ink/75 backdrop-blur-xl border-line" : "bg-transparent border-transparent",
        )}
        onMouseLeave={closeMega}
      >
        <div className="container-x flex items-center justify-between gap-6" style={{ height: "var(--header-h)" }}>
          <Logo />

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) =>
                "mega" in item ? (
                  <li key={item.to} onMouseEnter={openMega}>
                    <button
                      type="button"
                      aria-expanded={megaOpen}
                      aria-controls="mega-servicos"
                      onClick={() => setMegaOpen((v) => !v)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-medium transition-colors",
                        megaOpen || pathname.startsWith("/servicos") ? "text-foreground" : "text-soft hover:text-foreground",
                      )}
                    >
                      {item.label}
                      <Icon name="chevron-down" className={cn("text-[10px] transition-transform duration-500 ease-premium", megaOpen && "rotate-180")} />
                    </button>
                  </li>
                ) : (
                  <li key={item.to} onMouseEnter={closeMega}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        cn(
                          "relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors",
                          isActive ? "text-foreground" : "text-soft hover:text-foreground",
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {item.label}
                          {isActive && <motion.span layoutId="nav-dot" className="absolute left-1/2 -bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-brand" />}
                        </>
                      )}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <WhatsAppButton size="sm" className="hidden md:inline-flex" context="home">
              Falar com a Camaly
            </WhatsAppButton>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-foreground"
              aria-label="Abrir menu"
              aria-expanded={mobileOpen}
              aria-controls="menu-mobile"
            >
              <Icon name="list" className="text-xl" />
            </button>
          </div>
        </div>

        {/* MEGA MENU — Serviços */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              id="mega-servicos"
              onMouseEnter={openMega}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute inset-x-0 top-full hidden lg:block border-b border-line bg-ink shadow-[0_40px_80px_-20px_rgba(0,0,0,0.85)]"
            >
              <div className="container-x grid grid-cols-12 gap-8 py-10">
                <div className="col-span-3 flex flex-col justify-between">
                  <div>
                    <span className="eyebrow">Serviços</span>
                    <p className="mt-5 text-[22px] font-semibold leading-tight tracking-tight">
                      Da presença digital
                      <br />
                      ao produto completo.
                    </p>
                  </div>
                  <Link to="/servicos" className="link-arrow mt-8">
                    Ver todos os serviços <Icon name="arrow-right" />
                  </Link>
                </div>

                <ul className="col-span-6 grid grid-cols-2 gap-2">
                  {SERVICE_LINKS.map((s) => (
                    <li key={s.to}>
                      <Link
                        to={s.to}
                        className="group spotlight flex h-full gap-4 rounded-md border border-transparent p-5 transition-colors hover:border-line hover:bg-surface"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm border border-line bg-surface text-brand transition-colors group-hover:border-primary/40">
                          <Icon name={s.icon} className="text-lg" />
                        </span>
                        <span>
                          <span className="flex items-center gap-2 font-semibold tracking-tight">
                            {s.label}
                            <Icon name="arrow-up-right" className="text-xs opacity-0 -translate-x-1 transition-all duration-500 ease-premium group-hover:opacity-100 group-hover:translate-x-0" />
                          </span>
                          <span className="mt-1.5 block text-[13.5px] leading-snug text-soft line-clamp-2">{s.text}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {featured && (
                  <Link to={`/portfolio/${featured.slug}`} className="group col-span-3 overflow-hidden rounded-md border border-line bg-surface">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={featured.cover.srcSm} alt="" loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-1000 ease-premium group-hover:scale-[1.04]" />
                    </div>
                    <div className="p-4">
                      <span className="text-[11px] uppercase tracking-[0.18em] text-soft">Projeto em destaque</span>
                      <span className="mt-1 flex items-center justify-between font-semibold">
                        {featured.name} <Icon name="arrow-up-right" className="text-sm text-brand" />
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {megaOpen && (
          <motion.div
            aria-hidden
            className="fixed inset-0 z-40 hidden bg-ink/60 backdrop-blur-[2px] lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={() => setMegaOpen(false)}
          />
        )}
      </AnimatePresence>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};
