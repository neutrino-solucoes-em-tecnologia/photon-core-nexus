import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Categoria from "./pages/Categoria";
import Artigo from "./pages/Artigo";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";

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
            <div className="flex flex-col min-h-screen w-full">
              <main className="flex-1 w-full overflow-y-auto">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/categoria/:slug" element={<Categoria />} />
                  <Route path="/artigo/:slug" element={<Artigo />} />
                  <Route path="/sobre" element={<Sobre />} />
                  <Route path="/contato" element={<Contato />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
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
