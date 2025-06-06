
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Home, Mail, Info } from "lucide-react";
import { motion } from "framer-motion";
import { z } from "zod";
import { propertyValuationSchema } from "./schema";
import { BasicInfoSection } from "./BasicInfoSection";
import { PropertyDetailsSection } from "./PropertyDetailsSection";
import { ExtrasSection } from "./ExtrasSection";
import { ContactSection } from "./ContactSection";
import { ConservationStateSection } from "./ConservationStateSection";
import { ExteriorAreasSection } from "./ExteriorAreasSection";
import { CommunityAreasSection } from "./CommunityAreasSection";
import { TermsAcceptanceField } from "../TermsAcceptanceField";

// Extend the existing schema to include terms acceptance
const extendedPropertyValuationSchema = propertyValuationSchema.extend({
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "Debe aceptar los términos y condiciones"
  })
});

type ExtendedPropertyValuationFormData = z.infer<typeof extendedPropertyValuationSchema>;

interface PropertyValuationFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export function PropertyValuationForm({ onSubmit, isLoading }: PropertyValuationFormProps) {
  const form = useForm<ExtendedPropertyValuationFormData>({
    resolver: zodResolver(extendedPropertyValuationSchema),
    defaultValues: {
      direccion_calle: "",
      direccion_numero: "",
      es_unifamiliar: false,
      direccion_planta: "",
      direccion_puerta: "",
      direccion_codigo_postal: "",
      direccion_ciudad: "",
      email: "",
      tipo_vivienda: "",
      superficie_m2: undefined,
      habitaciones: undefined,
      banos: undefined,
      anno_construccion: undefined,
      estado_puertas: "",
      estado_ventanas: "",
      estado_banos: "",
      estado_cocina: "",
      estado_fontaneria: "",
      estado_electricidad: "",
      orientacion: "",
      exterior_interior: "",
      planta: "",
      tiene_garaje: false,
      tiene_trastero: false,
      tiene_ascensor: false,
      tiene_calefaccion: false,
      tiene_aire_acondicionado: false,
      tiene_terraza: false,
      superficie_terraza: undefined,
      tiene_jardin: false,
      superficie_jardin: undefined,
      tiene_piscina: false,
      zonas_comunes: [],
      zona_deportiva: false,
      zona_juegos_infantiles: false,
      observaciones: "",
      acceptTerms: false,
    },
  });

  function handleSubmit(values: ExtendedPropertyValuationFormData) {
    // Remove acceptTerms from the data sent to the service
    const { acceptTerms, ...valuationData } = values;
    
    // Construir dirección completa antes de enviar
    let direccionCompleta = `${valuationData.direccion_calle}, ${valuationData.direccion_numero}`;
    
    if (!valuationData.es_unifamiliar && valuationData.direccion_planta && valuationData.direccion_puerta) {
      direccionCompleta += `, ${valuationData.direccion_planta} ${valuationData.direccion_puerta}`;
    }
    
    direccionCompleta += `, ${valuationData.direccion_codigo_postal} ${valuationData.direccion_ciudad}`;
    
    // Enviar datos con dirección completa construida
    const dataToSubmit = {
      ...valuationData,
      direccion_completa: direccionCompleta
    };
    
    onSubmit(dataToSubmit);
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center bg-gradient-to-r from-realestate-purple to-realestate-turquoise text-white">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Home className="h-6 w-6" />
          Valoración Completa de Inmueble
        </CardTitle>
        <p className="text-sm opacity-90">
          Complete todos los datos para recibir una valoración detallada
        </p>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Aviso importante */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-800 mb-1">Información importante:</p>
              <ul className="text-blue-700 space-y-1">
                <li>• El resultado será una <strong>estimación orientativa</strong></li>
                <li>• Recibirá el informe en su email en <strong>24 horas</strong></li>
                <li>• Para una valoración precisa, recomendamos contactar con un profesional</li>
              </ul>
            </div>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            {/* Sección de contacto - Al principio para capturar el email */}
            <ContactSection form={form} />
            
            {/* Información básica */}
            <BasicInfoSection form={form} />
            
            {/* Detalles de la propiedad */}
            <PropertyDetailsSection form={form} />
            
            {/* Estado de conservación */}
            <ConservationStateSection form={form} />
            
            {/* Extras y servicios */}
            <ExtrasSection form={form} />
            
            {/* Áreas exteriores */}
            <ExteriorAreasSection form={form} />
            
            {/* Zonas comunitarias */}
            <CommunityAreasSection form={form} />
            
            {/* Terms acceptance */}
            <TermsAcceptanceField 
              control={form.control} 
              name="acceptTerms" 
            />
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90 text-lg py-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Procesando valoración...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-5 w-5" />
                  Solicitar Valoración (Resultado en 24h)
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
