
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { PropertyValuationInput } from "@/pages/PropertyValuator";
import { propertyValuationSchema } from "./schema";
import { BasicInfoSection } from "./BasicInfoSection";
import { PropertyDetailsSection } from "./PropertyDetailsSection";
import { ExtrasSection } from "./ExtrasSection";

interface PropertyValuationFormProps {
  onSubmit: (data: PropertyValuationInput) => void;
  isLoading: boolean;
}

export function PropertyValuationForm({ onSubmit, isLoading }: PropertyValuationFormProps) {
  const form = useForm<PropertyValuationInput>({
    resolver: zodResolver(propertyValuationSchema),
    defaultValues: {
      address: "",
      cp: "",
      locality: "",
      propertyType: "",
      surface_m2: undefined,
      bedrooms: undefined,
      bathrooms: undefined,
      year_built: undefined,
      state: "",
      extras: [],
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Datos de tu propiedad</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <BasicInfoSection form={form} />
            <PropertyDetailsSection form={form} />
            <ExtrasSection form={form} />
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Valorando...
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
