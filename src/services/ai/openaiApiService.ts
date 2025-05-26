
import { getOpenAIHeaders } from "./config";

/**
 * Helper function to call OpenAI API
 */
export async function callOpenAIAPI(model: string, systemPrompt: string, userContent: any) {
  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: getOpenAIHeaders(),
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: JSON.stringify(userContent) }
      ],
      temperature: 0.7
    })
  });
}

/**
 * Parses the JSON response from GPT
 */
export function parseGptResponse(responseContent: string): any {
  try {
    return JSON.parse(responseContent);
  } catch (parseError) {
    console.error("Error parsing JSON response:", parseError);
    return {
      success: false,
      error_message: "Error al procesar el plan de edición. Formato incorrecto.",
      edit_plan: null
    };
  }
}
