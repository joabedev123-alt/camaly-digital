import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import Home from "./pages/Home";

// Páginas internas carregadas sob demanda (code splitting por rota)
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Case = lazy(() => import("./pages/Case"));
const About = lazy(() => import("./pages/About"));
const Process = lazy(() => import("./pages/Process"));
const Contact = lazy(() => import("./pages/Contact"));
const Faq = lazy(() => import("./pages/Faq"));
const Legal = lazy(() => import("./pages/Legal"));
const NotFound = lazy(() => import("./pages/NotFound"));

const PageFallback = () => <div className="min-h-[100svh]" aria-busy="true" />;

const App = () => (
  <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="servicos" element={<Services />} />
            <Route path="servicos/:slug" element={<ServiceDetail />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="portfolio/:slug" element={<Case />} />
            <Route path="sobre" element={<About />} />
            <Route path="processo" element={<Process />} />
            <Route path="contato" element={<Contact />} />
            <Route path="faq" element={<Faq />} />
            <Route path="privacidade" element={<Legal kind="privacidade" />} />
            <Route path="termos" element={<Legal kind="termos" />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </MotionConfig>
);

export default App;
