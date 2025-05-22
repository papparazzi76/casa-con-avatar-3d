
// Configuración común para los servicios de IA
export const OPENAI_API_KEY = "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";

// Headers comunes para las peticiones a la API
export const getOpenAIHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${OPENAI_API_KEY}`
});
