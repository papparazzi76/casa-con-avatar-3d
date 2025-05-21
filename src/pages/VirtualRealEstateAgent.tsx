
import React, { useState } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, ChevronRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VirtualRealEstateAgent() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Define our steps
  const steps = [
    {
      id: 1,
      title: "Valoración inmobiliaria y fijación del precio",
      description: "Determina el valor óptimo de tu propiedad",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Métodos habituales:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Comparativa de mercado (precio medio €/m² de viviendas vendidas recientemente en el barrio).</li>
            <li>Tasación oficial (valor hipotecario; útil si el comprador necesita financiación).</li>
            <li>Valor automático (AVM) basado en big data: rápido para obtener una horquilla.</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6">Criterios clave:</h3>
          <p>Superficie útil vs. construida, estado de conservación, planta, orientación, eficiencia energética.</p>
          
          <Alert className="mt-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Herramientas digitales sugeridas</AlertTitle>
            <AlertDescription>
              Calculadora AVM interactiva + gráfico de sensibilidad precio/tiempo de venta.
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    {
      id: 2,
      title: "Decidir quién comercializa (particular o agencia)",
      description: "Explora las diferentes opciones para vender tu propiedad",
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modalidad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ventajas</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inconvenientes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coste típico</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">FSBO (venta por propietario)</td>
                  <td className="px-6 py-4">Máximo control y ahorro de honorarios</td>
                  <td className="px-6 py-4">Inversión personal de tiempo, curva de aprendizaje legal y de marketing</td>
                  <td className="px-6 py-4">0 € honorarios</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Inmobiliaria en exclusiva</td>
                  <td className="px-6 py-4">Difusión multicanal, filtro de compradores, acompañamiento jurídico</td>
                  <td className="px-6 py-4">Pago de honorarios al éxito (3%–5% + IVA)</td>
                  <td className="px-6 py-4">3%–5%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Multimandato</td>
                  <td className="px-6 py-4">Mayor alcance inicial</td>
                  <td className="px-6 py-4">Riesgo de sobreexposición y "quemar" el inmueble</td>
                  <td className="px-6 py-4">3%–6%</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <Alert className="mt-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Tip interactivo</AlertTitle>
            <AlertDescription>
              Cuestionario de 8 preguntas que recomiende la modalidad ideal según perfil de usuario.
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    {
      id: 3,
      title: "Preparar la documentación obligatoria",
      description: "Asegúrate de tener toda la documentación necesaria",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Checklist descargable con semáforo de validez:</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quién lo expide</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validez</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Obligatorio</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4">DNI/NIE vigente</td>
                  <td className="px-6 py-4">Propietario</td>
                  <td className="px-6 py-4">—</td>
                  <td className="px-6 py-4 text-green-600">✓</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Título de propiedad (escritura)</td>
                  <td className="px-6 py-4">Notaría original</td>
                  <td className="px-6 py-4">Permanente</td>
                  <td className="px-6 py-4 text-green-600">✓</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Nota simple registral {'<'} 90 d</td>
                  <td className="px-6 py-4">Registro de la Propiedad</td>
                  <td className="px-6 py-4">3 m</td>
                  <td className="px-6 py-4 text-green-600">✓</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
          
          <Alert className="mt-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Herramienta útil</AlertTitle>
            <AlertDescription>
              Generador de lista de tareas con alertas de caducidad.
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    // Add more steps here...
    {
      id: 4,
      title: "Definir la estrategia de marketing y canales",
      description: "Planifica cómo promocionar tu propiedad",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Buyer persona:</h3>
          <p>Perfil socio-demográfico del comprador objetivo.</p>
          
          <h3 className="text-xl font-semibold mt-4">Canales gratuitos:</h3>
          <p>Idealista Particular, Fotocasa, Milanuncios, Wallapop, Facebook Marketplace.</p>
          
          <h3 className="text-xl font-semibold mt-4">Canales de pago/pro:</h3>
          <p>Idealista Pro, portales MLS, Google Ads Local Services.</p>
          
          <h3 className="text-xl font-semibold mt-4">Redes Sociales:</h3>
          <p>Reels en Instagram, Shorts en YouTube, campañas segmentadas en Meta Ads.</p>
          
          <h3 className="text-xl font-semibold mt-4">Marketing local:</h3>
          <p>Cartelería QR en fachada, buzoneo con enlaces rastreables.</p>
          
          <Alert className="mt-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Widget sugerido</AlertTitle>
            <AlertDescription>
              Matriz interactiva "coste vs. alcance" para portales y redes.
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    {
      id: 5,
      title: "Preparación visual: home staging, foto y tour virtual",
      description: "Optimiza la presentación visual de tu propiedad",
      content: (
        <div className="space-y-4">
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-semibold">Home staging:</span> orden, neutralidad cromática, reparaciones menores.</li>
            <li><span className="font-semibold">Fotografía profesional:</span> lente gran angular (16–18 mm APS-C), bracketing HDR, trípode.</li>
            <li><span className="font-semibold">Video storytelling:</span> plano secuencia que muestre distribución (menos de 90 segundos).</li>
            <li><span className="font-semibold">Recorrido 360°/gemelo digital:</span> Matterport o iPhone LiDAR → visita autoguiada.</li>
            <li><span className="font-semibold">Planos 2D y 3D:</span> generados desde la captura 360° o CAD.</li>
            <li><span className="font-semibold">IA de mejora:</span> eliminación de objetos, virtual staging para estancias vacías (indicar "imagen virtual").</li>
          </ul>
        </div>
      )
    }
    // Continue with more steps...
  ];

  const handleStepClick = (stepId: number) => {
    setActiveStep(activeStep === stepId ? null : stepId);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-center mb-6">
              Agente Virtual Inmobiliario
            </h1>
            <p className="text-lg text-center text-muted-foreground mb-12">
              Guía paso a paso para vender o alquilar tu propiedad como un profesional
            </p>
            
            <Tabs defaultValue="flowchart" className="mb-12">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="flowchart">Diagrama de Flujo</TabsTrigger>
                <TabsTrigger value="detailed">Pasos Detallados</TabsTrigger>
              </TabsList>
              
              <TabsContent value="flowchart" className="mt-6">
                <div className="bg-gradient-to-r from-realestate-purple/5 to-realestate-turquoise/5 p-6 rounded-lg">
                  <div className="flex flex-col space-y-4">
                    {steps.map((step, index) => (
                      <div key={step.id}>
                        <div 
                          className={cn(
                            "flex items-center p-4 rounded-lg cursor-pointer transition-colors",
                            activeStep === step.id 
                              ? "bg-gradient-to-r from-realestate-purple/20 to-realestate-turquoise/20"
                              : "bg-white hover:bg-gray-50"
                          )}
                          onClick={() => handleStepClick(step.id)}
                        >
                          <div className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                            {step.id}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{step.title}</h3>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                          </div>
                          <ChevronRight className={cn(
                            "h-5 w-5 text-muted-foreground transition-transform",
                            activeStep === step.id ? "rotate-90" : ""
                          )} />
                        </div>
                        
                        {activeStep === step.id && (
                          <div className="mt-2 ml-12 p-4 bg-white rounded-lg border">
                            {step.content}
                          </div>
                        )}
                        
                        {index < steps.length - 1 && (
                          <div className="h-8 w-0.5 bg-gray-200 ml-4 mx-auto"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="detailed" className="mt-6">
                <div className="space-y-8">
                  {steps.map((step) => (
                    <Card key={step.id}>
                      <CardHeader>
                        <div className="flex items-center">
                          <div className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                            {step.id}
                          </div>
                          <div>
                            <CardTitle>{step.title}</CardTitle>
                            <CardDescription>{step.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {step.content}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="bg-gradient-to-r from-realestate-purple/10 to-realestate-turquoise/10 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Buenas prácticas finales</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-realestate-turquoise mr-2 flex-shrink-0 mt-0.5" />
                  <span>Trazabilidad: conserva correos y justificantes en un drive compartido.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-realestate-turquoise mr-2 flex-shrink-0 mt-0.5" />
                  <span>RGPD: bases legales de tratamiento de datos de interesados.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-realestate-turquoise mr-2 flex-shrink-0 mt-0.5" />
                  <span>Transparencia: sube al anuncio la CEE y nota simple para generar confianza.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-realestate-turquoise mr-2 flex-shrink-0 mt-0.5" />
                  <span>Revisión legal: plantillas de reserva y arras validadas por abogado colegiado.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
