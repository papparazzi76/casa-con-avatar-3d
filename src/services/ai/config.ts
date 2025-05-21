
// Configuración común para los servicios de IA
export const OPENAI_API_KEY = "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";

// Headers comunes para las peticiones a la API
export const getOpenAIHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${OPENAI_API_KEY}`
});

