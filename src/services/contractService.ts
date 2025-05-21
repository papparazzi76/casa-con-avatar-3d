
import { ContractFormData, ContractResult, MissingFieldsResponse } from "@/types/contractTypes";
import { generateAIResponse } from "@/utils/openaiService";

export async function generateContract(
  contractData: ContractFormData
): Promise<ContractResult | MissingFieldsResponse> {
  try {
    // The system prompt is provided in the first message, then the user query follows
    const systemPrompt = `Eres un asistente‐redactor jurídico-inmobiliario para España.  
Tu única función es generar, a petición de la aplicación web, contratos tipo totalmente rellenados a partir de los datos que te aporte el usuario.`;

    const userQuery = JSON.stringify(contractData, null, 2);

    // Generate contract using AI
    const response = await generateAIResponse({
      systemPrompt,
      userQuery
    });
    
    // Parse the JSON response
    return JSON.parse(response);
  } catch (error) {
    console.error("Error generating contract:", error);
    return {
      faltan_datos: ["Error en el servidor: no se pudo generar el contrato"]
    };
  }
}
