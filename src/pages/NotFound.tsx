import { Seo } from "@/components/system/Seo";
import { ButtonLink, WhatsAppButton } from "@/components/system/Button";
import { BrandWatermark } from "@/components/brand/BrandWatermark";

const NotFound = () => (
  <>
    <Seo title="Página não encontrada" description="A página que você procura não existe ou mudou de endereço." noindex />
    <section className="relative flex min-h-[90svh] items-center overflow-hidden pt-[var(--header-h)]">
      <BrandWatermark variant="chameleon" position="center" opacity={0.06} scale={0.9} />
      <div className="container-x relative z-10 text-center">
        <p className="font-mono text-[13px] uppercase tracking-[0.3em] text-brand">Erro 404</p>
        <h1 className="display-1 mx-auto mt-6 max-w-3xl">Até o camaleão se perdeu aqui.</h1>
        <p className="lead mx-auto mt-6 max-w-lg">A página que você procura não existe ou mudou de endereço.</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink to="/" icon="arrow-right">
            Voltar ao início
          </ButtonLink>
          <WhatsAppButton variant="ghost" context="home">
            Falar com a Camaly
          </WhatsAppButton>
        </div>
      </div>
    </section>
  </>
);

export default NotFound;
