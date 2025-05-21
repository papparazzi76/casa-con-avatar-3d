
import { ContractFormData, ContractResult, MissingFieldsResponse } from "@/types/contractTypes";

export async function generateContract(
  contractData: ContractFormData
): Promise<ContractResult | MissingFieldsResponse> {
  try {
    // The system prompt is provided in the first message, then the user query follows
    const systemPrompt = `Eres un asistente‐redactor jurídico-inmobiliario para España.  
Tu única función es generar, a petición de la aplicación web, contratos tipo totalmente rellenados a partir de los datos que te aporte el usuario.`;

    const userQuery = JSON.stringify(contractData, null, 2);

    // Make API call to OpenAI directly since we don't have a generateAIResponse function
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY || ""}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userQuery
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Error generating contract");
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response
    return JSON.parse(content);
  } catch (error) {
    console.error("Error generating contract:", error);
    return {
      faltan_datos: ["Error en el servidor: no se pudo generar el contrato"]
    };
  }
}
