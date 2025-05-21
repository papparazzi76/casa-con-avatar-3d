
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const VirtualRealEstateAgent = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      title: "Valoración inmobiliaria y fijación del precio",
      color: "from-realestate-purple to-realestate-purple/70",
      content: (
        <div className="space-y-4">
          <p className="font-medium">Métodos habituales:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Comparativa de mercado (precio medio €/m² de viviendas vendidas recientemente en el barrio).</li>
            <li>Tasación oficial (valor hipotecario; útil si el comprador necesita financiación).</li>
            <li>Valor automático (AVM) basado en big data: rápido para obtener una horquilla.</li>
          </ul>
          
          <p className="font-medium mt-4">Criterios clave:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Superficie útil vs. construida</li>
            <li>Estado de conservación</li>
            <li>Planta, orientación</li>
            <li>Eficiencia energética</li>
          </ul>
          
          <p className="font-medium mt-4">Herramientas digitales sugeridas:</p>
          <p>Calculadora AVM interactiva + gráfico de sensibilidad precio/tiempo de venta.</p>
        </div>
      )
    },
    {
      id: 2,
      title: "Decidir quién comercializa (particular o agencia)",
      color: "from-realestate-turquoise to-realestate-turquoise/70",
      content: (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-medium text-sm">Modalidad</th>
                <th className="px-4 py-2 text-left font-medium text-sm">Ventajas</th>
                <th className="px-4 py-2 text-left font-medium text-sm">Inconvenientes</th>
                <th className="px-4 py-2 text-left font-medium text-sm">Coste típico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2">FSBO (venta por propietario)</td>
                <td className="px-4 py-2">Máximo control y ahorro de honorarios</td>
                <td className="px-4 py-2">Inversión personal de tiempo, curva de aprendizaje legal y de marketing</td>
                <td className="px-4 py-2">0 € honorarios</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Inmobiliaria en exclusiva</td>
                <td className="px-4 py-2">Difusión multicanal, filtro de compradores, acompañamiento jurídico</td>
                <td className="px-4 py-2">Pago de honorarios al éxito (3 %–5 % + IVA)</td>
                <td className="px-4 py-2">3 %–5 %</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Multimandato</td>
                <td className="px-4 py-2">Mayor alcance inicial</td>
                <td className="px-4 py-2">Riesgo de sobreexposición y "quemar" el inmueble</td>
                <td className="px-4 py-2">3 %–6 %</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4 text-sm italic">
            Tip interactivo: cuestionario de 8 preguntas que recomiende la modalidad ideal según perfil de usuario.
          </p>
        </div>
      )
    },
    {
      id: 3,
      title: "Preparar la documentación obligatoria",
      color: "from-realestate-purple-light to-realestate-purple/60",
      content: (
        <div className="space-y-4">
          <p className="font-medium">Checklist descargable con semáforo de validez:</p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-sm">Documento</th>
                  <th className="px-4 py-2 text-left font-medium text-sm">Quién lo expide</th>
                  <th className="px-4 py-2 text-left font-medium text-sm">Validez</th>
                  <th className="px-4 py-2 text-left font-medium text-sm">Obligatorio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2">DNI/NIE vigente</td>
                  <td className="px-4 py-2">Propietario</td>
                  <td className="px-4 py-2">—</td>
                  <td className="px-4 py-2">✔</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Título de propiedad (escritura)</td>
                  <td className="px-4 py-2">Notaría original</td>
                  <td className="px-4 py-2">Permanente</td>
                  <td className="px-4 py-2">✔</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Nota simple registral &lt; 90 d</td>
                  <td className="px-4 py-2">Registro de la Propiedad</td>
                  <td className="px-4 py-2">3 m</td>
                  <td className="px-4 py-2">✔</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Último recibo IBI</td>
                  <td className="px-4 py-2">Ayuntamiento</td>
                  <td className="px-4 py-2">Anual</td>
                  <td className="px-4 py-2">✔</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Certificado de deuda comunidad</td>
                  <td className="px-4 py-2">Administrador</td>
                  <td className="px-4 py-2">30 d</td>
                  <td className="px-4 py-2">✔</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Certificado de eficiencia energética (CEE)</td>
                  <td className="px-4 py-2">Técnico habilitado</td>
                  <td className="px-4 py-2">10 a (A–F) / 5 a (G)</td>
                  <td className="px-4 py-2">✔</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Inspección Técnica (ITE) >45 a vivienda</td>
                  <td className="px-4 py-2">Ayuntamiento</td>
                  <td className="px-4 py-2">10 a</td>
                  <td className="px-4 py-2">Cond.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Cédula habitabilidad (CCAA)</td>
                  <td className="px-4 py-2">CCAA</td>
                  <td className="px-4 py-2">15 a</td>
                  <td className="px-4 py-2">Cond.</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="mt-4 text-sm italic">
            Incluye generador de lista de tareas con alertas de caducidad.
          </p>
        </div>
      )
    },
    {
      id: 4,
      title: "Definir la estrategia de marketing y canales",
      color: "from-realestate-turquoise to-realestate-purple/60",
      content: (
        <div className="space-y-4">
          <p><span className="font-medium">Buyer persona:</span> perfil socio-demográfico del comprador objetivo.</p>
          
          <div className="space-y-2">
            <p className="font-medium">Canales gratuitos:</p>
            <p>Idealista Particular, Fotocasa, Milanuncios, Wallapop, Facebook Marketplace.</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Canales de pago/pro:</p>
            <p>Idealista Pro, portales MLS, Google Ads Local Services.</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Redes Sociales:</p>
            <p>Reels en Instagram, Shorts en YouTube, campañas segmentadas en Meta Ads.</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Marketing local:</p>
            <p>Cartelería QR en fachada, buzoneo con enlaces rastreables.</p>
          </div>
          
          <p className="mt-4 text-sm italic">
            Widget sugerido: matriz interactiva "coste vs. alcance" para portales y redes.
          </p>
        </div>
      )
    },
    {
      id: 5,
      title: "Preparación visual: home staging, foto y tour virtual",
      color: "from-realestate-purple to-realestate-turquoise/60",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="font-medium">Home staging:</p>
            <p>Orden, neutralidad cromática, reparaciones menores.</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Fotografía profesional:</p>
            <p>Lente gran angular (16–18 mm APS-C), bracketing HDR, trípode.</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Video storytelling (&lt; 90 s):</p>
            <p>Plano secuencia que muestre distribución.</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Recorrido 360°/gemelo digital:</p>
            <p>Matterport o iPhone LiDAR → visita autoguiada.</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Planos 2D y 3D:</p>
            <p>Generados desde la captura 360° o CAD.</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">IA de mejora:</p>
            <p>Eliminación de objetos, virtual staging para estancias vacías (indicar "imagen virtual").</p>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Publicación del anuncio",
      color: "from-realestate-turquoise to-realestate-turquoise/70",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="font-medium">Titular ≤ 70 caracteres con USP:</p>
            <p>Ejemplo: "Ático con terraza al sur y garaje en Parquesol".</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Descripción jerarquizada:</p>
            <p>Párrafos cortos + emojis en portales que lo permitan.</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Ficha técnica:</p>
            <p>Superficie, año, CEE, gastos comunitarios, IBI, orientación.</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">CTA claro:</p>
            <p>Botón de contacto, WhatsApp Business o formulario.</p>
          </div>
          
          <p>Sincroniza datos vía feed XML a varios portales para evitar incongruencias.</p>
        </div>
      )
    },
    {
      id: 7,
      title: "Gestión de leads y agenda de visitas",
      color: "from-realestate-purple-light to-realestate-purple/70",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="font-medium">CRM inmobiliario o planilla Kanban:</p>
            <p>Captado → cualificado → visita → oferta</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Respuesta rápida:</p>
            <p>&lt; 1 h (trigger correo + WhatsApp).</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Pre-filtro:</p>
            <p>Financiación aprobada, motivo de compra, fecha objetivo.</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Calendario compartido:</p>
            <p>Franjas inteligentes (máximo 4 visitas seguidas).</p>
          </div>
        </div>
      )
    },
    {
      id: 8,
      title: "Realizar las visitas",
      color: "from-realestate-turquoise to-realestate-purple/60",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="font-medium">Guion de recorrido:</p>
            <p>Zona día → zona noche → extras.</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Dossier impreso/digital:</p>
            <p>Con plano y gastos.</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Registro de asistencia (RGPD):</p>
            <p>Encuesta post-visita rápida QR.</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Reunión de recap:</p>
            <p>24 h después para recoger feedback y ajustar precio si procede.</p>
          </div>
        </div>
      )
    },
    {
      id: 9,
      title: "Negociación y contrato de reserva",
      color: "from-realestate-purple to-realestate-turquoise/60",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="font-medium">Documento:</p>
            <p>Hoja de encargo/contrato de reserva (señal) con depósito (1 %–2 %).</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Puntos mínimos:</p>
            <p>Datos partes, precio, plazo para firma de arras, condiciones suspensivas (préstamo, tasación).</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Depósito:</p>
            <p>Retenido por el agente o ingresado en cuenta escrow.</p>
          </div>
        </div>
      )
    },
    {
      id: 10,
      title: "Contrato de arras (arras penitenciales, art. 1454 CC)",
      color: "from-realestate-turquoise to-realestate-turquoise/70",
      content: (
        <div className="space-y-4">
          <p>Suele fijarse en 10 % del precio.</p>
          
          <p>Define plazo máximo para acudir a notaría y repercusiones de desistimiento.</p>
          
          <p>Incluir reparto de gastos (Ley 5/2019: vendedor asume cancelación hipotecaria y copia simple; comprador, escritura matriz).</p>
        </div>
      )
    },
    {
      id: 11,
      title: "Preparar y coordinar la firma notarial",
      color: "from-realestate-purple-light to-realestate-purple/60",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="font-medium">Elección de notario:</p>
            <p>Libre, coste similar en toda España.</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Envío de documentación:</p>
            <p>Con 5 d antelación de toda la documentación + contrato de arras.</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Verificación:</p>
            <p>De cargas y certificado de dominio por el notario.</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Opción de videofirma telemática:</p>
            <p>Desde el 9-XI-2023 gracias a la Ley 11/2023, a través del Portal Notarial del Ciudadano.</p>
          </div>
          
          <p>El notario envía minuta al Registro de la Propiedad mediante el sistema SIGNO en &lt; 24 h.</p>
        </div>
      )
    },
    {
      id: 12,
      title: "Firma de la escritura pública",
      color: "from-realestate-turquoise to-realestate-purple/70",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="font-medium">Partes acuden:</p>
            <p>O se conectan con DNI/NIE y justificante de pagos.</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Se liquida precio:</p>
            <p>Cheque bancario, transferencia inmediata o talón conformado.</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Entrega:</p>
            <p>De llaves y certificación energética.</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Obtención:</p>
            <p>De copia simple electrónica inmediata; copia autorizada en 2-3 d.</p>
          </div>
        </div>
      )
    },
    {
      id: 13,
      title: "Post-venta: liquidación de plusvalía municipal e impuestos",
      color: "from-realestate-purple to-realestate-purple/70",
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-sm">Impuesto</th>
                  <th className="px-4 py-2 text-left font-medium text-sm">Quién paga</th>
                  <th className="px-4 py-2 text-left font-medium text-sm">Plazo</th>
                  <th className="px-4 py-2 text-left font-medium text-sm">Cálculo en 2025</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2">Plusvalía Municipal (IIVTNU)</td>
                  <td className="px-4 py-2">Vendedor (salvo pacto)</td>
                  <td className="px-4 py-2">30 d hábiles desde firma</td>
                  <td className="px-4 py-2">Opción 'objetiva' → valor catastral × coeficiente anual; opción 'real' → plusvalía efectivamente obtenida</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">IRPF (ganancia patrimonial)</td>
                  <td className="px-4 py-2">Vendedor</td>
                  <td className="px-4 py-2">Declaración anual</td>
                  <td className="px-4 py-2">Diferencia valor escriturado compra-venta + coeficiente abatimiento si >1994</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">AJD / ITP</td>
                  <td className="px-4 py-2">Comprador</td>
                  <td className="px-4 py-2">30 d hábiles</td>
                  <td className="px-4 py-2">Tipo 0,5 %–1,5 % (AJD obra nueva) / 6 %–10 % (ITP).</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-sm italic">
            Nota 2025: el Gobierno anuló la subida prevista de coeficientes para 2025, manteniendo los de 2024.
          </p>
        </div>
      )
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Agente Virtual Inmobiliario
            </h1>
            <p className="mx-auto max-w-[800px] text-gray-500 md:text-xl">
              Guía completa para vender o alquilar tu propiedad como un profesional
            </p>
          </motion.div>
          
          {/* Flow diagram */}
          <div className="mb-12 overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="flex justify-between items-center mb-8">
                {steps.slice(0, 7).map((step) => (
                  <motion.div
                    key={step.id}
                    className={`w-20 h-20 rounded-full flex items-center justify-center cursor-pointer 
                      bg-gradient-to-br ${step.color} shadow-md
                      ${activeStep === step.id ? 'ring-4 ring-offset-2 ring-realestate-purple' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveStep(step.id === activeStep ? null : step.id)}
                  >
                    <span className="text-white font-bold text-xl">{step.id}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="relative h-4 bg-gray-200 rounded-full mb-8">
                <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-realestate-purple to-realestate-turquoise rounded-full"></div>
                <div className="absolute top-1/2 left-0 w-full flex justify-between transform -translate-y-1/2">
                  {steps.slice(0, 7).map((step) => (
                    <div key={step.id} className="w-3 h-3 bg-white rounded-full shadow-md"></div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                {steps.slice(7).map((step) => (
                  <motion.div
                    key={step.id}
                    className={`w-20 h-20 rounded-full flex items-center justify-center cursor-pointer 
                      bg-gradient-to-br ${step.color} shadow-md
                      ${activeStep === step.id ? 'ring-4 ring-offset-2 ring-realestate-turquoise' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveStep(step.id === activeStep ? null : step.id)}
                  >
                    <span className="text-white font-bold text-xl">{step.id}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="relative h-4 bg-gray-200 rounded-full mt-8">
                <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-realestate-turquoise to-realestate-purple rounded-full"></div>
                <div className="absolute top-1/2 left-0 w-full flex justify-between transform -translate-y-1/2">
                  {steps.slice(7).map((step) => (
                    <div key={step.id} className="w-3 h-3 bg-white rounded-full shadow-md"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Step Details */}
          {activeStep && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-12"
            >
              <Card className={`border-l-4 border-realestate-purple shadow-lg`}>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">
                    {activeStep}. {steps.find(s => s.id === activeStep)?.title}
                  </h2>
                  <div className="prose max-w-none">
                    {steps.find(s => s.id === activeStep)?.content}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
          
          {/* All steps accordion */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Guía completa paso a paso</h2>
            
            <Accordion type="single" collapsible className="w-full">
              {steps.map((step) => (
                <AccordionItem key={step.id} value={`step-${step.id}`}>
                  <AccordionTrigger className="text-xl font-semibold">
                    {step.id}. {step.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="prose max-w-none py-4">
                      {step.content}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          {/* Interactive modules section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Módulos interactivos</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Paso</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Widget sugerido</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Valor añadido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3">1</td>
                    <td className="px-4 py-3">Calculadora AVM con mapa calor</td>
                    <td className="px-4 py-3">Precio objetivo en 30 s</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">3</td>
                    <td className="px-4 py-3">Checklist dinámico con alertas</td>
                    <td className="px-4 py-3">Evita desplazamientos de última hora</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">5</td>
                    <td className="px-4 py-3">Galería 360° inmersiva</td>
                    <td className="px-4 py-3">+40 % de tiempo de visualización</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">7</td>
                    <td className="px-4 py-3">Bot conversacional de cualificación</td>
                    <td className="px-4 py-3">Lead scoring automático</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">13</td>
                    <td className="px-4 py-3">Simulador de plusvalía municipal</td>
                    <td className="px-4 py-3">Cálculo en ambos métodos + PDF resumen</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Best practices */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Buenas prácticas finales</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">Trazabilidad</h3>
                  <p>Conserva correos y justificantes en un drive compartido.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">RGPD</h3>
                  <p>Bases legales de tratamiento de datos de interesados.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">Transparencia</h3>
                  <p>Sube al anuncio la CEE y nota simple para generar confianza.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">Revisión legal</h3>
                  <p>Plantillas de reserva y arras validadas por abogado colegiado.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VirtualRealEstateAgent;
