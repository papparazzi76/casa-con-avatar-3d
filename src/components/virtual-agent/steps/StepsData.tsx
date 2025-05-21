
import React from 'react';
import { Step } from './StepTypes';
import Step1Valuation from './Step1Valuation';
import Step2Marketing from './Step2Marketing';
import Step3Documentation from './Step3Documentation';
import Step4MarketingStrategy from './Step4MarketingStrategy';
import Step5VisualPreparation from './Step5VisualPreparation';
import Step6AdListing from './Step6AdListing';
import Step7LeadManagement from './Step7LeadManagement';
import Step8Visits from './Step8Visits';
import Step9Negotiation from './Step9Negotiation';
import Step10Contract from './Step10Contract';
import Step11NotaryPreparation from './Step11NotaryPreparation';
import Step12DeedSigning from './Step12DeedSigning';
import Step13PostSale from './Step13PostSale';

export const getSteps = (): Step[] => [
  {
    id: 1,
    title: "Valoración inmobiliaria y fijación del precio",
    description: "Determina el valor óptimo de tu propiedad",
    content: <Step1Valuation />
  },
  {
    id: 2,
    title: "Decidir quién comercializa (particular o agencia)",
    description: "Explora las diferentes opciones para vender tu propiedad",
    content: <Step2Marketing />
  },
  {
    id: 3,
    title: "Preparar la documentación obligatoria",
    description: "Asegúrate de tener toda la documentación necesaria",
    content: <Step3Documentation />
  },
  {
    id: 4,
    title: "Definir la estrategia de marketing y canales",
    description: "Planifica cómo promocionar tu propiedad",
    content: <Step4MarketingStrategy />
  },
  {
    id: 5,
    title: "Preparación visual: home staging, foto y tour virtual",
    description: "Optimiza la presentación visual de tu propiedad",
    content: <Step5VisualPreparation />
  },
  {
    id: 6,
    title: "Publicación del anuncio",
    description: "Crea un anuncio efectivo para tu propiedad",
    content: <Step6AdListing />
  },
  {
    id: 7,
    title: "Gestión de leads y agenda de visitas",
    description: "Organiza y gestiona contactos y visitas eficientemente",
    content: <Step7LeadManagement />
  },
  {
    id: 8,
    title: "Realizar las visitas",
    description: "Maximiza la efectividad de las visitas presenciales",
    content: <Step8Visits />
  },
  {
    id: 9,
    title: "Negociación y contrato de reserva",
    description: "Gestiona adecuadamente las ofertas recibidas",
    content: <Step9Negotiation />
  },
  {
    id: 10,
    title: "Contrato de arras (arras penitenciales, art. 1454 CC)",
    description: "Formaliza el compromiso de compraventa",
    content: <Step10Contract />
  },
  {
    id: 11,
    title: "Preparar y coordinar la firma notarial",
    description: "Prepara todos los documentos para la firma",
    content: <Step11NotaryPreparation />
  },
  {
    id: 12,
    title: "Firma de la escritura pública",
    description: "El momento de formalización de la compraventa",
    content: <Step12DeedSigning />
  },
  {
    id: 13,
    title: "Post-venta: liquidación de plusvalía municipal e impuestos",
    description: "Completa las obligaciones fiscales y administrativas",
    content: <Step13PostSale />
  }
];
