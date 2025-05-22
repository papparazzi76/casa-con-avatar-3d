
// Este archivo se mantiene como un puente para mantener la compatibilidad
// con el código existente. Todos los servicios ahora están en src/services/ai

import { 
  PropertyAdFormData, 
  PropertyAdResult, 
  generatePropertyAd,
  ImageProcessingOptions,
  ProcessImageResult,
  processImage,
  ImageEditPlan,
  ImageEditStep,
  ImageEditResponse
} from '@/services/ai';

// Reexportamos todos los tipos y funciones para mantener la compatibilidad
export type {
  PropertyAdFormData,
  PropertyAdResult,
  ImageProcessingOptions,
  ProcessImageResult,
  ImageEditPlan,
  ImageEditStep,
  ImageEditResponse
};

// Reexportamos todas las funciones
export {
  generatePropertyAd,
  processImage
};

// Mantenemos la API key aquí para evitar cambios en otros archivos que podrían acceder a ella
const OPENAI_API_KEY = "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";
