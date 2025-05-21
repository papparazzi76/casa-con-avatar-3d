
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./formSchema";

type PhotoUploaderProps = {
  form: UseFormReturn<FormValues>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function PhotoUploader({ form, handleFileChange }: PhotoUploaderProps) {
  return (
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
  );
}
