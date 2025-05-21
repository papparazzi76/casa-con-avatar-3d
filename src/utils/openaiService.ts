
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
