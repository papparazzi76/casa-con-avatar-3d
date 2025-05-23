
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AdGenerator from "./pages/AdGenerator";
import ImageEditor from "./pages/ImageEditor";
import ExpensesCalculator from "./pages/ExpensesCalculator";
import ContractsGenerator from "./pages/ContractsGenerator";
import LegalAdvisor from "./pages/LegalAdvisor";
import PropertyValuator from "./pages/PropertyValuator";
import SocialMediaPostGenerator from "./pages/SocialMediaPostGenerator";
import PropertiesPage from "./pages/PropertiesPage";
import PropertyCreatePage from "./pages/PropertyCreatePage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import PropertyEditPage from "./pages/PropertyEditPage";
import UserPropertiesPage from "./pages/UserPropertiesPage";
import VirtualRealEstateAgent from "./pages/VirtualRealEstateAgent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <NotificationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/privacidad" element={<PrivacyPolicy />} />
              <Route path="/terminos" element={<TermsOfService />} />
              <Route path="/generador-anuncios" element={<AdGenerator />} />
              <Route path="/editor-imagenes" element={<ImageEditor />} />
              <Route path="/calculadora-gastos" element={<ExpensesCalculator />} />
              <Route path="/generador-contratos" element={<ContractsGenerator />} />
              <Route path="/asesor-legal" element={<LegalAdvisor />} />
              <Route path="/valorador-inmuebles" element={<PropertyValuator />} />
              <Route path="/generador-posts-rrss" element={<SocialMediaPostGenerator />} />
              <Route path="/agente-virtual-inmobiliario" element={<VirtualRealEstateAgent />} />
              
              {/* Rutas para el escaparate inmobiliario */}
              <Route path="/propiedades" element={<PropertiesPage />} />
              <Route path="/propiedades/nueva" element={<PropertyCreatePage />} />
              <Route path="/propiedades/:id" element={<PropertyDetailPage />} />
              <Route path="/propiedades/:id/editar" element={<PropertyEditPage />} />
              <Route path="/mis-propiedades" element={<UserPropertiesPage />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </NotificationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
