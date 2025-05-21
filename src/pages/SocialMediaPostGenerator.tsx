
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SocialMediaPostForm } from "@/components/SocialMediaPostForm";
import { SocialMediaPostResult } from "@/components/SocialMediaPostResult";
import { SocialMediaPostFormData, SocialMediaPostResult as ResultType, generateSocialMediaPosts } from "@/services/socialMediaService";
import { toast } from "sonner";
import { ContactProfessionalButtonWithDialog } from "@/components/ContactProfessionalButtonWithDialog";

export default function SocialMediaPostGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null);

  const handleSubmit = async (formData: SocialMediaPostFormData) => {
    setIsGenerating(true);

    try {
      const data = await generateSocialMediaPosts(formData);
      
      // Check if data contains an error message about missing data
      if (data.status === "error" || "faltan_datos" in data) {
        const missingFields = (data as any).faltan_datos || [];
        if (missingFields.length > 0) {
          toast.error(`Faltan datos obligatorios: ${missingFields.join(', ')}`);
        } else {
          toast.error("No se pudieron generar los posts. Inténtalo de nuevo.");
        }
        setIsGenerating(false);
        return;
      }
      
      setResult(data);
    } catch (error) {
      console.error("Error al generar posts:", error);
      toast.error("Hubo un problema al generar el contenido. Inténtalo de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2">
              Creador de Posts para Redes Sociales
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              Genera contenido profesional para Instagram y Facebook que destaque tu propiedad
            </p>
            <div className="flex justify-center mb-6">
              <ContactProfessionalButtonWithDialog 
                className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90" 
              />
            </div>
            <div className="flex justify-center mb-8">
              <img 
                src="/lovable-uploads/c3052305-d6fe-4366-bde4-42aa25f4998c.png" 
                alt="Social Media Post Creator" 
                className="max-w-full h-auto max-h-80 rounded-lg shadow-md" 
              />
            </div>
          </div>
          
          <div className="mx-auto w-full">
            {result ? (
              <SocialMediaPostResult result={result} onReset={handleReset} />
            ) : (
              <SocialMediaPostForm 
                onSubmit={handleSubmit} 
                isGenerating={isGenerating}
              />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
