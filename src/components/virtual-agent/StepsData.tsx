import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Quiz from "./PropertySaleQuiz/Quiz";

export interface Step {
  id: number;
  title: string;
  description: string;
  content: React.ReactNode;
}

export const getSteps = (): Step[] => [
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
        
        <div className="mt-4">
          <Button 
            asChild
            className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
          >
            <Link to="/valorador-inmuebles">
              Ir al Valorador de Inmuebles
            </Link>
          </Button>
        </div>
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
        
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-4">Cuestionario interactivo "¿Quién debe vender mi vivienda?"</h3>
          <Quiz />
        </div>
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
  },
  {
    id: 6,
    title: "Publicación del anuncio",
    description: "Crea un anuncio efectivo para tu propiedad",
    content: (
      <div className="space-y-4">
        <ul className="list-disc pl-5 space-y-2">
          <li><span className="font-semibold">Titular ≤ 70 caracteres con USP:</span> Por ejemplo "Ático con terraza al sur y garaje en Parquesol".</li>
          <li><span className="font-semibold">Descripción jerarquizada:</span> Párrafos cortos + emojis en portales que lo permitan.</li>
          <li><span className="font-semibold">Ficha técnica:</span> Superficie, año, CEE, gastos comunitarios, IBI, orientación.</li>
          <li><span className="font-semibold">CTA claro:</span> Botón de contacto, WhatsApp Business o formulario.</li>
          <li><span className="font-semibold">Sincronización de datos:</span> Feed XML a varios portales para evitar incongruencias.</li>
        </ul>
      </div>
    )
  },
  {
    id: 7,
    title: "Gestión de leads y agenda de visitas",
    description: "Organiza y gestiona contactos y visitas eficientemente",
    content: (
      <div className="space-y-4">
        <ul className="list-disc pl-5 space-y-2">
          <li><span className="font-semibold">CRM inmobiliario o planilla Kanban:</span> Captado → cualificado → visita → oferta.</li>
          <li><span className="font-semibold">Respuesta rápida:</span> En menos de 1 hora (trigger correo + WhatsApp).</li>
          <li><span className="font-semibold">Pre-filtro:</span> Financiación aprobada, motivo de compra, fecha objetivo.</li>
          <li><span className="font-semibold">Calendario compartido:</span> Franjas inteligentes (máximo 4 visitas seguidas).</li>
        </ul>
        
        <Alert className="mt-4">
          <Info className="h-4 w-4" />
          <AlertTitle>Tip profesional</AlertTitle>
          <AlertDescription>
            Usa un CRM específico para inmobiliarias para mantener seguimiento de todas las interacciones.
          </AlertDescription>
        </Alert>
      </div>
    )
  },
  {
    id: 8,
    title: "Realizar las visitas",
    description: "Maximiza la efectividad de las visitas presenciales",
    content: (
      <div className="space-y-4">
        <ul className="list-disc pl-5 space-y-2">
          <li><span className="font-semibold">Guion de recorrido:</span> Zona día → zona noche → extras.</li>
          <li><span className="font-semibold">Dossier impreso/digital:</span> Con plano y desglose de gastos.</li>
          <li><span className="font-semibold">Registro de asistencia:</span> RGPD y encuesta post-visita rápida QR.</li>
          <li><span className="font-semibold">Reunión de recap:</span> 24h después para recoger feedback y ajustar precio si procede.</li>
        </ul>
      </div>
    )
  },
  {
    id: 9,
    title: "Negociación y contrato de reserva",
    description: "Gestiona adecuadamente las ofertas recibidas",
    content: (
      <div className="space-y-4">
        <ul className="list-disc pl-5 space-y-2">
          <li><span className="font-semibold">Documento:</span> Hoja de encargo/contrato de reserva (señal) con depósito (1%–2%).</li>
          <li><span className="font-semibold">Puntos mínimos:</span> Datos partes, precio, plazo para firma de arras, condiciones suspensivas (préstamo, tasación).</li>
          <li><span className="font-semibold">Depósito:</span> Retenido por el agente o ingresado en cuenta escrow.</li>
        </ul>
        
        <Alert className="mt-4">
          <Info className="h-4 w-4" />
          <AlertTitle>Consejo legal</AlertTitle>
          <AlertDescription>
            Es recomendable contar con un abogado para revisar los términos del contrato de reserva.
          </AlertDescription>
        </Alert>
      </div>
    )
  },
  {
    id: 10,
    title: "Contrato de arras (arras penitenciales, art. 1454 CC)",
    description: "Formaliza el compromiso de compraventa",
    content: (
      <div className="space-y-4">
        <ul className="list-disc pl-5 space-y-2">
          <li><span className="font-semibold">Importe habitual:</span> Suele fijarse en 10% del precio.</li>
          <li><span className="font-semibold">Plazos:</span> Define plazo máximo para acudir a notaría y repercusiones de desistimiento.</li>
          <li><span className="font-semibold">Reparto de gastos:</span> Ley 5/2019: vendedor asume cancelación hipotecaria y copia simple; comprador, escritura matriz.</li>
        </ul>
      </div>
    )
  },
  {
    id: 11,
    title: "Preparar y coordinar la firma notarial",
    description: "Prepara todos los documentos para la firma",
    content: (
      <div className="space-y-4">
        <ul className="list-disc pl-5 space-y-2">
          <li><span className="font-semibold">Elección de notario:</span> Libre, coste similar en toda España.</li>
          <li><span className="font-semibold">Documentación previa:</span> Envío con 5 días de antelación de toda la documentación (punto 3) + contrato de arras.</li>
          <li><span className="font-semibold">Verificaciones:</span> Verificación de cargas y certificado de dominio por el notario.</li>
          <li><span className="font-semibold">Videofirma:</span> Opción de videofirma telemática desde el 9-XI-2023 gracias a la Ley 11/2023, a través del Portal Notarial del Ciudadano.</li>
          <li><span className="font-semibold">Comunicación registral:</span> El notario envía minuta al Registro de la Propiedad mediante el sistema SIGNO en menos de 24h.</li>
        </ul>
        
        <Alert className="mt-4">
          <Info className="h-4 w-4" />
          <AlertTitle>Novedad legal</AlertTitle>
          <AlertDescription>
            La videofirma telemática facilita el proceso para partes que no pueden asistir físicamente a la notaría.
          </AlertDescription>
        </Alert>
      </div>
    )
  },
  {
    id: 12,
    title: "Firma de la escritura pública",
    description: "El momento de formalización de la compraventa",
    content: (
      <div className="space-y-4">
        <ul className="list-disc pl-5 space-y-2">
          <li><span className="font-semibold">Presencia:</span> Las partes acuden (o se conectan) con DNI/NIE y justificante de pagos.</li>
          <li><span className="font-semibold">Pago:</span> Se liquida precio (cheque bancario, transferencia inmediata o talón conformado).</li>
          <li><span className="font-semibold">Entrega:</span> Entrega de llaves y certificación energética.</li>
          <li><span className="font-semibold">Documentación:</span> Obtención de copia simple electrónica inmediata; copia autorizada en 2-3 días.</li>
        </ul>
      </div>
    )
  },
  {
    id: 13,
    title: "Post-venta: liquidación de plusvalía municipal e impuestos",
    description: "Completa las obligaciones fiscales y administrativas",
    content: (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Impuestos a liquidar:</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impuesto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quién paga</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plazo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cómo se calcula en 2025</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4">Plusvalía Municipal (IIVTNU)</td>
                <td className="px-6 py-4">Vendedor (salvo pacto)</td>
                <td className="px-6 py-4">30 d hábiles desde firma</td>
                <td className="px-6 py-4">Opción &apos;objetiva&apos; → valor catastral × coeficiente anual; <br />Opción &apos;real&apos; → plusvalía efectivamente obtenida</td>
              </tr>
              <tr>
                <td className="px-6 py-4">IRPF (ganancia patrimonial)</td>
                <td className="px-6 py-4">Vendedor</td>
                <td className="px-6 py-4">Declaración anual</td>
                <td className="px-6 py-4">Diferencia valor escriturado compra-venta + coeficiente abatimiento si {'>'}1994</td>
              </tr>
              <tr>
                <td className="px-6 py-4">AJD / ITP</td>
                <td className="px-6 py-4">Comprador</td>
                <td className="px-6 py-4">30 d hábiles</td>
                <td className="px-6 py-4">Tipo 0,5%–1,5% (AJD obra nueva) / 6%–10% (ITP)</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <Alert className="mt-4">
          <Info className="h-4 w-4" />
          <AlertTitle>Nota fiscal 2025</AlertTitle>
          <AlertDescription>
            El Gobierno anuló la subida prevista de coeficientes para 2025, manteniendo los de 2024.
          </AlertDescription>
        </Alert>
      </div>
    )
  }
];
