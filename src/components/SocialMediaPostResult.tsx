
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyIcon, Check } from "lucide-react";
import { SocialMediaPostResult as SocialMediaPostResultType } from "@/services/socialMediaService";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SocialMediaPostResultProps {
  result: SocialMediaPostResultType;
  onReset: () => void;
}

export function SocialMediaPostResult({ result, onReset }: SocialMediaPostResultProps) {
  const [copiedInstagram, setCopiedInstagram] = useState(false);
  const [copiedFacebook, setCopiedFacebook] = useState(false);

  const copyToClipboard = (text: string, platform: 'instagram' | 'facebook') => {
    navigator.clipboard.writeText(text);
    if (platform === 'instagram') {
      setCopiedInstagram(true);
      setTimeout(() => setCopiedInstagram(false), 2000);
    } else {
      setCopiedFacebook(true);
      setTimeout(() => setCopiedFacebook(false), 2000);
    }
  };

  // Calculate which tab to show based on the data
  const defaultTab = result.instagram ? "instagram" : "facebook";

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Tu Contenido para Redes Sociales</h2>
        <Button variant="outline" onClick={onReset}>Crear Nuevo Post</Button>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="instagram" disabled={!result.instagram}>Instagram</TabsTrigger>
          <TabsTrigger value="facebook" disabled={!result.facebook}>Facebook</TabsTrigger>
        </TabsList>
        
        {result.instagram && (
          <TabsContent value="instagram" className="w-full space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">
                  Texto para Instagram
                  <Button 
                    variant="ghost" 
                    className="ml-2"
                    onClick={() => copyToClipboard(result.instagram.caption, 'instagram')}
                  >
                    {copiedInstagram ? <Check className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                  </Button>
                </CardTitle>
                <CardDescription>Texto principal para tu post de Instagram</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 p-4 rounded-lg text-sm whitespace-pre-line">
                  {result.instagram.caption}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Hashtags Recomendados</CardTitle>
                <CardDescription>Copia y pega estos hashtags para aumentar el alcance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 pb-4">
                  {result.instagram.hashtags.map((hashtag, index) => (
                    <Badge key={index} variant="secondary">{hashtag}</Badge>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => copyToClipboard(result.instagram.hashtags.join(' '), 'instagram')}
                >
                  {copiedInstagram ? <Check className="h-4 w-4 mr-2" /> : <CopyIcon className="h-4 w-4 mr-2" />}
                  Copiar todos
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Sugerencias para Carrusel</CardTitle>
                <CardDescription>Ideas para cada slide de tu carrusel de Instagram</CardDescription>
              </CardHeader>
              <CardContent className="pb-0">
                <Carousel className="w-full max-w-md mx-auto">
                  <CarouselContent>
                    {result.instagram.slides.map((slide, index) => (
                      <CarouselItem key={index}>
                        <Card className="border-0 shadow-sm">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-md">Slide {index + 1}: {slide.titulo}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm whitespace-pre-line">{slide.descripcion}</p>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <p className="text-xs text-gray-500">Alt: {slide.alt}</p>
                          </CardFooter>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center mt-4">
                    <CarouselPrevious className="static transform-none mr-2" />
                    <CarouselNext className="static transform-none ml-2" />
                  </div>
                </Carousel>
              </CardContent>
            </Card>
          </TabsContent>
        )}
        
        {result.facebook && (
          <TabsContent value="facebook" className="space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">
                  Texto para Facebook
                  <Button 
                    variant="ghost" 
                    className="ml-2"
                    onClick={() => copyToClipboard(result.facebook.post, 'facebook')}
                  >
                    {copiedFacebook ? <Check className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                  </Button>
                </CardTitle>
                <CardDescription>Texto para tu publicación de Facebook</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 p-4 rounded-lg text-sm whitespace-pre-line">
                  {result.facebook.post}
                </div>
              </CardContent>
            </Card>
            
            {result.facebook.hashtags && result.facebook.hashtags.length > 0 && (
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">Hashtags Recomendados</CardTitle>
                  <CardDescription>Hashtags relevantes para aumentar tu visibilidad</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 pb-4">
                    {result.facebook.hashtags.map((hashtag, index) => (
                      <Badge key={index} variant="secondary">{hashtag}</Badge>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => copyToClipboard(result.facebook.hashtags.join(' '), 'facebook')}
                  >
                    {copiedFacebook ? <Check className="h-4 w-4 mr-2" /> : <CopyIcon className="h-4 w-4 mr-2" />}
                    Copiar todos
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        )}
      </Tabs>
      
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500 italic">{result.disclaimer}</p>
        <p className="text-xs text-gray-500 mt-1">Generado el: {result.fecha_generacion}</p>
      </div>
    </div>
  );
}
