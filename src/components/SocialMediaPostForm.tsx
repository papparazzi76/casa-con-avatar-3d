import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { SocialMediaPostFormData } from "@/services/socialMediaService";
import { X, Plus, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const propertyTypes = [
  { value: "piso", label: "Piso" },
  { value: "chalet", label: "Casa / Chalet" },
  { value: "atico", label: "Ático" },
  { value: "duplex", label: "Dúplex" },
  { value: "estudio", label: "Estudio" },
  { value: "apartamento", label: "Apartamento" },
  { value: "local", label: "Local comercial" },
  { value: "oficina", label: "Oficina" },
  { value: "terreno", label: "Terreno" },
  { value: "garaje", label: "Garaje" },
  { value: "trastero", label: "Trastero" },
  { value: "edificio", label: "Edificio" },
  { value: "nave", label: "Nave industrial" },
];

const toneOptions = [
  { value: "profesional", label: "Profesional" },
  { value: "premium", label: "Premium / Lujo" },
  { value: "juvenil", label: "Juvenil / Moderno" },
  { value: "familiar", label: "Familiar" },
  { value: "corporativo", label: "Corporativo" },
  { value: "amistoso", label: "Amistoso" },
];

const conservationOptions = [
  { value: "nuevo", label: "Nuevo / A estrenar" },
  { value: "reformado", label: "Reformado" },
  { value: "buen_estado", label: "Buen estado" },
  { value: "a_reformar", label: "A reformar" },
];

// Define form schema with proper type for the form data
const formSchema = z.object({
  plataforma: z.enum(["instagram", "facebook", "ambas"], { 
    required_error: "Selecciona al menos una plataforma" 
  }),
  tipo_operacion: z.enum(["venta", "alquiler"], { 
    required_error: "Selecciona el tipo de operación" 
  }),
  tipo_inmueble: z.string({ required_error: "Selecciona un tipo de inmueble" }),
  localidad: z.string().min(2, { message: "Indica la localidad (mínimo 2 caracteres)" }),
  superficie_m2: z.string().min(1, { message: "Indica la superficie" }),
  habitaciones: z.string().min(1, { message: "Indica el número de habitaciones" }),
  banos: z.string().min(1, { message: "Indica el número de baños" }),
  precio: z.string().min(1, { message: "Indica el precio" }),
  caracteristicas_destacadas: z.array(z.string()).min(1, { message: "Añade al menos una característica destacada" }),
  url_contacto: z.string().min(3, { message: "Indica un método de contacto válido" }),
  fotos: z.array(z.any()).min(1, { message: "Sube al menos una foto" }),
  estado_conservacion: z.string().optional(),
  extras: z.array(z.string()).optional(),
  titulo_anuncio: z.string().optional(),
  idioma: z.string().default("ES"),
  tono: z.string().optional(),
});

// Ensure this matches the type from socialMediaService.ts
type FormValues = z.infer<typeof formSchema>;

interface SocialMediaPostFormProps {
  onSubmit: (data: SocialMediaPostFormData) => void;
  isGenerating: boolean;
}

export function SocialMediaPostForm({ onSubmit, isGenerating }: SocialMediaPostFormProps) {
  // Use local state to manage arrays instead of useFieldArray
  const [caracteristicasArray, setCaracteristicasArray] = useState<string[]>([]);
  const [extrasArray, setExtrasArray] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [extraInput, setExtraInput] = useState("");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plataforma: "ambas",
      tipo_operacion: "venta",
      caracteristicas_destacadas: [],
      extras: [],
      fotos: [],
      idioma: "ES"
    },
  });
  
  const addCaracteristica = () => {
    if (featureInput.trim() && caracteristicasArray.length < 10) {
      const newCaracteristicas = [...caracteristicasArray, featureInput.trim()];
      setCaracteristicasArray(newCaracteristicas);
      form.setValue("caracteristicas_destacadas", newCaracteristicas);
      setFeatureInput("");
    } else if (caracteristicasArray.length >= 10) {
      toast.warning("Has alcanzado el máximo de 10 características destacadas");
    }
  };
  
  const removeCaracteristica = (index: number) => {
    const newCaracteristicas = [...caracteristicasArray];
    newCaracteristicas.splice(index, 1);
    setCaracteristicasArray(newCaracteristicas);
    form.setValue("caracteristicas_destacadas", newCaracteristicas);
  };
  
  const addExtra = () => {
    if (extraInput.trim() && extrasArray.length < 10) {
      const newExtras = [...extrasArray, extraInput.trim()];
      setExtrasArray(newExtras);
      form.setValue("extras", newExtras);
      setExtraInput("");
    } else if (extrasArray.length >= 10) {
      toast.warning("Has alcanzado el máximo de 10 extras");
    }
  };
  
  const removeExtra = (index: number) => {
    const newExtras = [...extrasArray];
    newExtras.splice(index, 1);
    setExtrasArray(newExtras);
    form.setValue("extras", newExtras);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 10) {
      toast.warning("Solo puedes subir hasta 10 imágenes");
      form.setValue("fotos", files.slice(0, 10));
    } else {
      form.setValue("fotos", files);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter") {
      e.preventDefault();
      action();
    }
  };
  
  const handleSubmit = (data: FormValues) => {
    if (isGenerating) return;
    
    // Convert form data to SocialMediaPostFormData
    // All required fields are already validated by zod
    const formattedData: SocialMediaPostFormData = {
      plataforma: data.plataforma,
      tipo_operacion: data.tipo_operacion,
      tipo_inmueble: data.tipo_inmueble,
      localidad: data.localidad,
      superficie_m2: data.superficie_m2,
      habitaciones: data.habitaciones,
      banos: data.banos,
      precio: data.precio,
      caracteristicas_destacadas: data.caracteristicas_destacadas,
      url_contacto: data.url_contacto,
      fotos: data.fotos,
      estado_conservacion: data.estado_conservacion,
      extras: data.extras || [],
      titulo_anuncio: data.titulo_anuncio,
      idioma: data.idioma,
      tono: data.tono
    };
    
    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="plataforma"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plataforma*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona plataforma" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="ambas">Instagram y Facebook</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="tipo_operacion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Operación*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de operación" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="venta">Venta</SelectItem>
                    <SelectItem value="alquiler">Alquiler</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="tipo_inmueble"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de inmueble*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="localidad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Localidad*</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Chamberí, Madrid" {...field} />
                </FormControl>
                <FormDescription>
                  Barrio, distrito o zona y ciudad
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="titulo_anuncio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título del anuncio</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Espectacular ático con vistas al mar" {...field} />
                </FormControl>
                <FormDescription>
                  Opcional - título principal para tus anuncios
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="superficie_m2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Superficie (m²)*</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: 95" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="habitaciones"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Habitaciones*</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: 3" type="number" {...field} />
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
                <FormLabel>Baños*</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: 2" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="precio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio (€)*</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: 250000" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="estado_conservacion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado de conservación</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {conservationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="caracteristicas_destacadas"
          render={() => (
            <FormItem>
              <FormLabel>Características destacadas*</FormLabel>
              <div className="flex flex-col space-y-3">
                <div className="flex space-x-2">
                  <FormControl>
                    <Input
                      placeholder="Añade una característica destacada"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, addCaracteristica)}
                    />
                  </FormControl>
                  <Button type="button" onClick={addCaracteristica} className="shrink-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {caracteristicasArray.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1.5">
                      {feature}
                      <button 
                        type="button" 
                        onClick={() => removeCaracteristica(index)}
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                {form.formState.errors.caracteristicas_destacadas && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.caracteristicas_destacadas.message}
                  </p>
                )}
              </div>
              <FormDescription>
                Añade las características más relevantes de tu propiedad
              </FormDescription>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="extras"
          render={() => (
            <FormItem>
              <FormLabel>Extras</FormLabel>
              <div className="flex flex-col space-y-3">
                <div className="flex space-x-2">
                  <FormControl>
                    <Input
                      placeholder="Añade un extra (terraza, piscina, garaje...)"
                      value={extraInput}
                      onChange={(e) => setExtraInput(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, addExtra)}
                    />
                  </FormControl>
                  <Button type="button" onClick={addExtra} className="shrink-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {extrasArray.map((extra, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1.5">
                      {extra}
                      <button 
                        type="button" 
                        onClick={() => removeExtra(index)}
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              <FormDescription>
                Opcional - Añade características adicionales que destaquen tu propiedad
              </FormDescription>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="url_contacto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contacto*</FormLabel>
              <FormControl>
                <Input placeholder="Teléfono, email o URL" {...field} />
              </FormControl>
              <FormDescription>
                Información de contacto que aparecerá en los posts
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="fotos"
          render={() => (
            <FormItem>
              <FormLabel>Fotos*</FormLabel>
              <FormControl>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-all">
                  <Input 
                    type="file" 
                    multiple 
                    accept="image/*"
                    className="hidden"
                    id="fileUpload"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">Haz clic para seleccionar imágenes o arrástralas aquí</p>
                    <p className="mt-1 text-xs text-gray-500">(Máximo 10 imágenes)</p>
                  </label>
                </div>
              </FormControl>
              {form.watch("fotos") && form.watch("fotos").length > 0 && (
                <div className="mt-2">
                  <p className="text-sm">{form.watch("fotos").length} {form.watch("fotos").length === 1 ? "imagen seleccionada" : "imágenes seleccionadas"}</p>
                </div>
              )}
              {form.formState.errors.fotos && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.fotos.message}
                </p>
              )}
              <FormDescription>
                Las imágenes se utilizarán para generar sugerencias para los posts
              </FormDescription>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="tono"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tono del contenido</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tono" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {toneOptions.map((tone) => (
                    <SelectItem key={tone.value} value={tone.value}>
                      {tone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Opcional - Define el estilo de comunicación de los posts
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
          disabled={isGenerating}
          size="lg"
        >
          {isGenerating ? "Generando posts..." : "Generar Posts para Redes Sociales"}
        </Button>
      </form>
    </Form>
  );
}
