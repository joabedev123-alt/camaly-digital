import { Link } from "react-router-dom";
import { Icon } from "@/components/system/Icon";
import { BrandWatermark } from "@/components/brand/BrandWatermark";
import { CONTACT } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { SERVICE_LINKS } from "./nav";

const COMPANY = [
  { label: "Sobre", to: "/sobre" },
  { label: "Processo", to: "/processo" },
  { label: "Portfólio", to: "/portfolio" },
  { label: "Perguntas frequentes", to: "/faq" },
  { label: "Contato", to: "/contato" },
];

export const Footer = () => (
  <footer className="relative overflow-hidden border-t border-line bg-ink pb-28 pt-20 md:pb-10 lg:pt-28">
    <div className="container-x relative z-10">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <img src="/brand/camaly-logo.webp" alt="Camaly Digital" width={560} height={193} loading="lazy" className="h-10 w-auto" />
          <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-soft">
            Estratégia, design e tecnologia para transformar ideias e negócios em produtos digitais.
          </p>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-soft/70">Entender · Adaptar · Construir · Evoluir</p>
        </div>

        <nav aria-label="Serviços" className="lg:col-span-3">
          <h2 className="text-[12px] font-medium uppercase tracking-[0.22em] text-soft">Serviços</h2>
          <ul className="mt-6 space-y-3.5">
            {SERVICE_LINKS.map((s) => (
              <li key={s.to}>
                <Link to={s.to} className="text-[15px] text-foreground/85 transition-colors hover:text-brand">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Empresa" className="lg:col-span-2">
          <h2 className="text-[12px] font-medium uppercase tracking-[0.22em] text-soft">Empresa</h2>
          <ul className="mt-6 space-y-3.5">
            {COMPANY.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-[15px] text-foreground/85 transition-colors hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <h2 className="text-[12px] font-medium uppercase tracking-[0.22em] text-soft">Contato</h2>
          <ul className="mt-6 space-y-3.5 text-[15px]">
            <li>
              <a href={waLink("home")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-foreground/85 hover:text-brand">
                <Icon name="whatsapp" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-foreground/85 hover:text-brand">
                <Icon name="instagram" /> Instagram
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 text-foreground/85 hover:text-brand break-all">
                <Icon name="envelope" /> E-mail
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-24 flex flex-col gap-4 border-t border-line pt-8 text-[13px] text-soft md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Camaly Digital. Todos os direitos reservados.</p>
        <div className="flex items-center gap-6">
          <Link to="/privacidade" className="hover:text-foreground">
            Privacidade
          </Link>
          <Link to="/termos" className="hover:text-foreground">
            Termos
          </Link>
          <a href="#topo" className="flex items-center gap-1.5 hover:text-foreground" aria-label="Voltar ao topo">
            Topo <Icon name="arrow-up" />
          </a>
        </div>
      </div>
    </div>

    <BrandWatermark variant="camaly" position="bottom" opacity={0.05} scale={1} className="translate-y-[38%]" />
  </footer>
);
