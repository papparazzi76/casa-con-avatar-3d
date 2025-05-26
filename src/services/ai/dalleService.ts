
import { getOpenAIHeaders } from "./config";

/**
 * Processes an image with DALL-E API
 */
export async function processDallEImage(
  prompt: string
): Promise<{ url: string }> {
  console.log("Enviando solicitud a DALL-E 3...");
  
  const requestBody = {
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
    quality: "standard"
  };
  
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: getOpenAIHeaders(),
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error en la API de DALL-E:", errorData);
    throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
  }
  
  const data = await response.json();
  console.log("Respuesta de DALL-E recibida:", data);
  
  if (!data.data || !data.data[0] || !data.data[0].url) {
    throw new Error("Respuesta de DALL-E incompleta o incorrecta");
  }
  
  return { url: data.data[0].url };
}
