import { CLIENT_NAMES } from "@/data/projects";

/**
 * Faixa de prova social com nomes reais de clientes do portfólio.
 * (Não há arquivos de logo dos clientes no projeto — os nomes são exibidos
 * como marcas tipográficas monocromáticas, sem inventar logotipos.)
 */
export const LogoMarquee = () => {
  const items = [...CLIENT_NAMES, ...CLIENT_NAMES];
  return (
    <div className="marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
      <ul className="flex w-max animate-marquee items-center" aria-label="Clientes">
        {items.map((name, i) => (
          <li
            key={i}
            aria-hidden={i >= CLIENT_NAMES.length}
            className="flex items-center whitespace-nowrap px-7 text-[clamp(18px,1.8vw,24px)] font-semibold uppercase tracking-[0.04em] text-white/55 transition-colors duration-500 hover:text-white/80 sm:px-10"
          >
            {name}
            <span className="ml-14 h-1.5 w-1.5 rounded-[2px] bg-white/15 sm:ml-20" aria-hidden />
          </li>
        ))}
      </ul>
    </div>
  );
};
