
import { ContractFormData, ContractResult, MissingFieldsResponse } from "@/types/contractTypes";
import { supabase } from "@/integrations/supabase/client";

export async function generateContract(
  contractData: ContractFormData
): Promise<ContractResult | MissingFieldsResponse> {
  try {
    console.log('📝 Enviando datos del contrato a la edge function...');
    
    const { data, error } = await supabase.functions.invoke('generate-contract', {
      body: contractData
    });

    if (error) {
      console.error('❌ Error llamando a la edge function:', error);
      return {
        faltan_datos: [`Error del servidor: ${error.message}`]
      };
    }

    console.log('✅ Respuesta recibida de la edge function:', data);
    return data;
    
  } catch (error) {
    console.error("❌ Error generando contrato:", error);
    return {
      faltan_datos: ["Error en el servidor: no se pudo generar el contrato"]
    };
  }
}
