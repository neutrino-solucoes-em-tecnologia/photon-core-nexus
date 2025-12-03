import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Categoria from "./pages/Categoria";
import Artigo from "./pages/Artigo";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import TrabalheConosco from "./pages/TrabalheConosco";
import Imprensa from "./pages/Imprensa";
import Termos from "./pages/Termos";
import Privacidade from "./pages/Privacidade";
import Cookies from "./pages/Cookies";
import NotFound from "./pages/NotFound";
import { features } from "./lib/features";
import { useEffect } from "react";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden group">
              <main className="flex-1 w-full max-w-full overflow-x-hidden relative">
                <MainContent>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/categoria/:slug" element={<Categoria />} />
                    <Route path="/artigo/:slug" element={<Artigo />} />
                    <Route path="/sobre" element={<Sobre />} />
                    <Route path="/fale-conosco" element={<Contato />} />
                    <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
                    <Route path="/imprensa" element={<Imprensa />} />
                    <Route path="/termos" element={<Termos />} />
                    <Route path="/privacidade" element={<Privacidade />} />
                    <Route path="/cookies" element={<Cookies />} />
                    
                    {/* Rotas condicionais baseadas em feature flags */}
                    {features.trending.enabled && (
                      <Route 
                        path={features.trending.route} 
                        element={
                          <div className="p-8 text-center">
                            <h1 className="text-3xl font-bold mb-4">🔥 Trending Articles</h1>
                            <p className="text-muted-foreground">Feature em desenvolvimento</p>
                          </div>
                        } 
                      />
                    )}
                    
                    {features.descontos.enabled && (
                      <Route 
                        path={features.descontos.route} 
                        element={
                          <div className="p-8 text-center">
                            <h1 className="text-3xl font-bold mb-4">💰 Descontos e Ofertas</h1>
                            <p className="text-muted-foreground">Feature em desenvolvimento</p>
                          </div>
                        } 
                      />
                    )}
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
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
