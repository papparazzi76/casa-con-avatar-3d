
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PropertyInfo } from "@/services/propertyValuatorService";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { getPostalCodeInfo } from "@/services/propertyValuator/postalCodeService";
import { useEffect } from "react";

const propertySchema = z.object({
  localidad: z.string().min(2, {
    message: "La localidad es obligatoria.",
  }),
  distrito: z.string().min(1, {
    message: "El distrito o barrio es obligatorio.",
  }),
  codigo_postal: z.string().min(5, {
    message: "El código postal es obligatorio (5 dígitos).",
  }).max(5, {
    message: "El código postal debe tener exactamente 5 dígitos.",
  }).regex(/^\d{5}$/, {
    message: "El código postal debe contener solo números.",
  }),
  direccion: z.string().optional(),
  tipo_vivienda: z.string({
    required_error: "Selecciona el tipo de vivienda.",
  }),
  superficie_m2: z.coerce.number().min(15, {
    message: "La superficie debe ser al menos 15 m².",
  }),
  habitaciones: z.coerce.number().min(1, {
    message: "Indica al menos 1 habitación.",
  }),
  banos: z.coerce.number().min(1, {
    message: "Indica al menos 1 baño.",
  }),
  estado_conservacion: z.string({
    required_error: "Selecciona el estado de conservación.",
  }),
  planta: z.string({
    required_error: "Indica la planta.",
  }),
  ascensor: z.boolean().default(false),
  exterior: z.boolean().default(false),
  anno_construccion: z.coerce.number().min(1900, {
    message: "El año debe ser posterior a 1900",
  }).max(new Date().getFullYear(), {
    message: "El año no puede ser futuro",
  }),
});

interface PropertyValuatorFormProps {
  onSubmit: (data: PropertyInfo) => void;
  isLoading: boolean;
  missingFields?: string[];
}

export function PropertyValuatorForm({ onSubmit, isLoading, missingFields }: PropertyValuatorFormProps) {
  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      localidad: "",
      distrito: "",
      codigo_postal: "",
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
    },
  });

  // Watch for postal code changes to auto-complete district
  const watchedPostalCode = form.watch("codigo_postal");

  useEffect(() => {
    if (watchedPostalCode && watchedPostalCode.length === 5) {
      const postalCodeInfo = getPostalCodeInfo(watchedPostalCode);
      if (postalCodeInfo) {
        // Auto-complete localidad and distrito
        form.setValue("localidad", postalCodeInfo.localidad);
        if (postalCodeInfo.distrito) {
          form.setValue("distrito", postalCodeInfo.distrito);
        }
      }
    }
  }, [watchedPostalCode, form]);

  function handleSubmit(values: z.infer<typeof propertySchema>) {
    onSubmit(values as PropertyInfo);
  }

  return (
    <Card className="border-2">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Ubicación</h3>
              
              <FormField
                control={form.control}
                name="codigo_postal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código Postal <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Ej.: 28001" maxLength={5} {...field} />
                    </FormControl>
                    <FormDescription>
                      El distrito y localidad se completarán automáticamente
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="localidad"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localidad <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Ej.: Madrid" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="distrito"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distrito/Barrio <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Ej.: Salamanca" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="direccion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej.: Calle Serrano, 21" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ayuda a encontrar inmuebles más cercanos
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Características</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="tipo_vivienda"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de vivienda <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="piso">Piso</SelectItem>
                          <SelectItem value="atico">Ático</SelectItem>
                          <SelectItem value="bajo">Bajo</SelectItem>
                          <SelectItem value="chalet">Chalet</SelectItem>
                          <SelectItem value="adosado">Adosado</SelectItem>
                          <SelectItem value="duplex">Dúplex</SelectItem>
                          <SelectItem value="estudio">Estudio</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="superficie_m2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Superficie (m²) <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="habitaciones"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Habitaciones <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="banos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Baños <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="estado_conservacion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado de conservación <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="nueva-construccion">Nueva construcción</SelectItem>
                          <SelectItem value="buen-estado">Buen estado</SelectItem>
                          <SelectItem value="a-reformar">A reformar</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="planta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Planta <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar planta" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bajo">Bajo</SelectItem>
                          <SelectItem value="entreplanta">Entreplanta</SelectItem>
                          <SelectItem value="1">1ª</SelectItem>
                          <SelectItem value="2">2ª</SelectItem>
                          <SelectItem value="3">3ª</SelectItem>
                          <SelectItem value="4">4ª</SelectItem>
                          <SelectItem value="5">5ª</SelectItem>
                          <SelectItem value="6">6ª o superior</SelectItem>
                          <SelectItem value="atico">Ático</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="anno_construccion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Año de construcción <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Ej.: 1990" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="ascensor"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Ascensor</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="exterior"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Exterior</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
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
