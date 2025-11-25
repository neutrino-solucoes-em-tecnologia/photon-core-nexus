import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
