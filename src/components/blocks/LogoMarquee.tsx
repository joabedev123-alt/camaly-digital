import { CLIENT_NAMES } from "@/data/projects";

/**
 * Faixa de prova social com nomes reais de clientes do portfólio.
 * (Não há arquivos de logo dos clientes no projeto — os nomes são exibidos
 * como marcas tipográficas monocromáticas, sem inventar logotipos.)
 */
export const LogoMarquee = () => {
  const items = [...CLIENT_NAMES, ...CLIENT_NAMES];
  return (
    <div className="marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
      <ul className="flex w-max animate-logo-marquee items-center" aria-label="Clientes">
        {items.map((name, i) => (
          <li
            key={i}
            aria-hidden={i >= CLIENT_NAMES.length}
            className="flex items-center gap-8 whitespace-nowrap px-5 text-[13px] font-medium uppercase tracking-[0.14em] text-foreground/35 transition-colors duration-500 hover:text-foreground/65 sm:gap-10 sm:px-7 sm:text-[14px]"
          >
            {name}
            <span className="h-px w-6 bg-foreground/15" aria-hidden />
          </li>
        ))}
      </ul>
    </div>
  );
};
