import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SocialProof } from "@/components/SocialProof";
import { TechMarquee } from "@/components/TechMarquee";
import { AboutSection } from "@/components/AboutSection";
import { Differentials } from "@/components/Differentials";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ProcessSection } from "@/components/ProcessSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ResultsSection } from "@/components/ResultsSection";
import { ImpactBlock } from "@/components/ImpactBlock";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HeroSection />
      <SocialProof />
      <TechMarquee />
      <AboutSection />
      <Differentials />
      <ServicesGrid />
      <ProcessSection />
      <ProjectsSection />
      <ResultsSection />
      <ImpactBlock />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
