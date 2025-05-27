
// API key constante (permanente)
const API_KEY = "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";

export async function calculatePlusvalia(
  municipality: string,
  currentPrice: number,
  previousPurchaseYear: number,
  previousPurchasePrice: number
): Promise<{ amount: number; explanation: string }> {
  try {
    // Create a prompt for OpenAI to calculate the plusvalía
    const prompt = `
      Necesito calcular el impuesto de plusvalía municipal para una propiedad en ${municipality}, España.
      Datos:
      - Precio de venta actual (2025): ${currentPrice} euros
      - Año de la compra anterior: ${previousPurchaseYear}
      - Precio de compra anterior: ${previousPurchasePrice} euros
      
      Por favor, calcula la plusvalía municipal teniendo en cuenta las reglas específicas del municipio ${municipality}.
      Explica detalladamente cómo se ha calculado el impuesto, mencionando los porcentajes aplicados,
      los años transcurridos, y cualquier otra consideración relevante según las normativas locales.
      
      Da como resultado un objeto JSON con dos propiedades:
      - amount: la cantidad a pagar en euros (solo el número, sin decimales)
      - explanation: una explicación detallada pero concisa del cálculo
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Eres un experto en impuestos inmobiliarios en España, especializado en el cálculo del impuesto de plusvalía municipal."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Error al calcular la plusvalía");
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      // Extract the JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        return {
          amount: result.amount || 0,
          explanation: result.explanation || "No se pudo generar una explicación detallada."
        };
      }
    } catch (parseError) {
      console.error("Error parsing plusvalía calculation:", parseError);
    }
    
    // Fallback to a simple calculation if parsing fails
    const yearsHeld = new Date().getFullYear() - previousPurchaseYear;
    const valueIncrease = currentPrice - previousPurchasePrice;
    const estimatedPlusvalia = valueIncrease * 0.03; // Simple 3% estimate
    
    return {
      amount: Math.max(0, Math.round(estimatedPlusvalia)),
      explanation: `Cálculo estimado basado en un incremento de valor de ${valueIncrease}€ durante ${yearsHeld} años.`
    };
  } catch (error) {
    console.error("Error calculating plusvalía:", error);
    return {
      amount: 0,
      explanation: "No se pudo calcular la plusvalía debido a un error en el servicio."
    };
  }
}
