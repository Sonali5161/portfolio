import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navigation from "./components/Navigation";
import ParticleBackground from "./components/ParticleBackground";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import usePerformanceMonitor from "./hooks/usePerformanceMonitor";

import HomePage from "./pages/HomePage";
import ProjectsResearchPage from "./pages/ProjectsResearchPage";
import ExperienceCertificationsPage from "./pages/ExperienceCertificationsPage";
import ResumePage from "./pages/ResumePage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  // Monitor performance and adjust animations accordingly
  usePerformanceMonitor((metrics) => {
    if (metrics.isLowPerformance) {
      console.log('Low performance detected, reducing animation complexity');
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="relative min-h-screen">
          <ParticleBackground />
          <ScrollProgress />
          <CustomCursor />
          <Navigation />

          <main className="relative z-10">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsResearchPage />} />
                <Route path="/experience" element={<ExperienceCertificationsPage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
