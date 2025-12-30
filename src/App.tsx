import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Caracteristicas from "./pages/Caracteristicas";
import Propuesta from "./pages/Propuesta";
import Plan from "./pages/Plan";

import Avances from "./pages/Avances";
import Objetivos from "./pages/Objetivos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/caracteristicas" element={<Caracteristicas />} />
          <Route path="/propuesta" element={<Propuesta />} />
          <Route path="/plan" element={<Plan />} />
          
          <Route path="/avances" element={<Avances />} />
          <Route path="/objetivos" element={<Objetivos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
