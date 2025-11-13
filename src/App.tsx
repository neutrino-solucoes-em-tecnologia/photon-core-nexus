import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import { lazy, Suspense } from "react";

// Lazy load pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const Categoria = lazy(() => import("./pages/Categoria"));
const Artigo = lazy(() => import("./pages/Artigo"));
const Sobre = lazy(() => import("./pages/Sobre"));
const Contato = lazy(() => import("./pages/Contato"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <LoadingSpinner size="lg" message="Carregando página..." />
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider defaultOpen={true}>
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-col min-h-screen w-full group">
              <main className="flex-1 w-full relative">
                <MainContent>
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/categoria/:slug" element={<Categoria />} />
                      <Route path="/artigo/:slug" element={<Artigo />} />
                      <Route path="/sobre" element={<Sobre />} />
                      <Route path="/contato" element={<Contato />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </MainContent>
              </main>
              <Footer />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
