
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PropertyInfo } from "@/services/propertyValuatorService";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { propertySchema, PropertyFormData } from "./property-valuator-form/FormSchema";
import { LocationSection } from "./property-valuator-form/LocationSection";
import { CharacteristicsSection } from "./property-valuator-form/CharacteristicsSection";
import { TermsCheckboxField } from "@/components/TermsCheckboxField";

interface PropertyValuatorFormProps {
  onSubmit: (data: PropertyInfo) => void;
  isLoading: boolean;
  missingFields?: string[];
}

export function PropertyValuatorForm({ onSubmit, isLoading, missingFields }: PropertyValuatorFormProps) {
  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      localidad: "Valladolid",
      distrito: "",
      zona_idealista: "",
      direccion: "",
      tipo_vivienda: "",
      superficie_m2: undefined,
      habitaciones: undefined,
      banos: undefined,
      estado_conservacion: "",
      planta: "",
      ascensor: false,
      exterior: false,
      anno_construccion: undefined,
      acceptedTerms: undefined,
    },
  });

  function handleSubmit(values: PropertyFormData) {
    onSubmit(values as PropertyInfo);
  }

  return (
    <Card className="border-2">
      <CardContent className="pt-6">
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Servicio disponible solo para Valladolid</h4>
          <p className="text-blue-700 text-sm">
            Este valorador utiliza datos reales de propiedades de Idealista y está disponible únicamente para zonas de Valladolid capital. Selecciona la zona específica de tu propiedad.
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <LocationSection form={form} />
            <CharacteristicsSection form={form} />
            
            {missingFields && missingFields.length > 0 && (
              <motion.div
                className="bg-amber-50 border border-amber-200 p-4 rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="font-medium text-amber-800">Se necesitan más datos:</p>
                <ul className="list-disc list-inside text-amber-700 mt-1">
                  {missingFields.map((field, index) => (
                    <li key={index}>{field}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            <TermsCheckboxField control={form.control} />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                'Valorar Propiedad'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
