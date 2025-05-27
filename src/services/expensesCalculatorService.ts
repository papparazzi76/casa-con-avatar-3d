
import { CalculationResult, CalculatorRequest, CalculationBreakdown } from "@/types/calculatorTypes";
import { calculateRegionalITP, REGIONAL_TAX_RATES } from "./regionalTaxService";

// API key constante (permanente)
const API_KEY = "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";

export async function calculateExpenses(request: CalculatorRequest): Promise<CalculationResult> {
  try {
    const propertyPrice = request.propertyValue || 0;
    
    // Si se especifica un rol, calculamos por separado
    if (request.userRole === 'buyer' || request.userRole === 'seller') {
      return calculateByRole(request);
    }
    
    // Cálculo tradicional para compatibilidad
    let result: CalculationResult = {
      total: 0,
      taxes: {
        iva: 0,
        transferTax: 0,
        plusvalia: 0,
        ajdTax: 0,
        ibiTax: 0
      },
      expenses: {
        notary: 0,
        registry: 0,
        agency: 0,
        legalFees: 0,
        appraisal: 0
      }
    };
    
    // Base calculation logic for new or used homes
    if (request.propertyType === 'new') {
      // IVA (10%)
      result.taxes.iva = propertyPrice * 0.10;
      
      // Actos Jurídicos Documentados (AJD) (1% - 1.5% typically)
      result.taxes.ajdTax = propertyPrice * 0.015; // We'll use 1.5%
      
      // No transfer tax for new homes
      result.taxes.transferTax = 0;
      
      // No plusvalía para vivienda nueva
      result.taxes.plusvalia = 0;
      
    } else {
      // Used property - Impuesto de Transmisiones Patrimoniales (ITP)
      // Typically 6-10% depending on the region
      result.taxes.transferTax = propertyPrice * 0.08; // Using 8% as an average
      
      // No VAT for used homes
      result.taxes.iva = 0;
      
      // No AJD for used homes (generally)
      result.taxes.ajdTax = 0;
      
      // Plusvalía solo para vivienda usada si hay municipio
      if (request.municipality) {
        const plusvaliaResponse = await calculatePlusvalia(
          request.municipality, 
          propertyPrice, 
          request.previousPurchaseYear || new Date().getFullYear() - 5,
          request.previousPurchasePrice || Math.round(propertyPrice * 0.7)
        );
        
        result.taxes.plusvalia = plusvaliaResponse.amount;
        result.plusvaliaDetails = plusvaliaResponse.explanation;
      }
    }
    
    // Notary fees - approximate
    result.expenses.notary = Math.min(900, 500 + (propertyPrice * 0.0004));
    
    // Registry fees - approximate
    result.expenses.registry = Math.min(800, 400 + (propertyPrice * 0.0004));
    
    // Agency fees if applicable
    if (request.includeAgencyFees) {
      result.expenses.agency = propertyPrice * 0.03; // Typically 3-5%
    }
    
    // Legal assistance fees if applicable
    if (request.includeLegalFees) {
      result.expenses.legalFees = 1000 + (propertyPrice * 0.005); // Base fee + percentage
    }
    
    // IBI Tax - rough approximation
    result.taxes.ibiTax = propertyPrice * 0.005; // Usually 0.4% - 1.1% of cadastral value

    // Calculate the total
    result.total = 
      result.taxes.iva + 
      result.taxes.transferTax + 
      result.taxes.plusvalia + 
      result.taxes.ajdTax + 
      result.taxes.ibiTax + 
      result.expenses.notary + 
      result.expenses.registry + 
      result.expenses.agency + 
      result.expenses.legalFees + 
      result.expenses.appraisal;
    
    return result;
  } catch (error) {
    console.error("Error calculating expenses:", error);
    throw new Error("Error al calcular los gastos e impuestos");
  }
}

async function calculateByRole(request: CalculatorRequest): Promise<CalculationResult> {
  const propertyPrice = request.propertyValue || 0;
  
  let result: CalculationResult = {
    total: 0,
    taxes: { iva: 0, transferTax: 0, plusvalia: 0, ajdTax: 0, ibiTax: 0 },
    expenses: { notary: 0, registry: 0, agency: 0, legalFees: 0, appraisal: 0 },
    separateByRole: true
  };

  if (request.userRole === 'buyer') {
    result.buyer = await calculateBuyerCosts(request);
    result.total = result.buyer.totalCost;
  } else if (request.userRole === 'seller') {
    result.seller = await calculateSellerCosts(request);
    result.total = result.seller.totalCost;
  }

  return result;
}

async function calculateBuyerCosts(request: CalculatorRequest): Promise<CalculationBreakdown> {
  const propertyPrice = request.propertyValue || 0;
  
  let breakdown: CalculationBreakdown = {
    propertyPrice,
    taxes: {},
    fees: {},
    totalAdditionalCosts: 0,
    totalCost: propertyPrice
  };

  // Impuestos para compradores
  if (request.propertyType === 'new') {
    // Vivienda nueva: IVA + AJD
    breakdown.taxes.iva = propertyPrice * 0.10; // 10% IVA
    
    // AJD regional rate
    const ajdRate = request.region && REGIONAL_TAX_RATES[request.region] 
      ? REGIONAL_TAX_RATES[request.region].ajdRate 
      : 0.015;
    breakdown.taxes.ajdTax = propertyPrice * ajdRate;
  } else {
    // Vivienda usada: ITP with regional and age considerations
    if (request.region) {
      const itpCalculation = calculateRegionalITP(propertyPrice, request.region, request.buyerAge);
      breakdown.taxes.transferTax = itpCalculation.amount;
      breakdown.taxes.itpExplanation = itpCalculation.explanation;
    } else {
      // Fallback to default 8% if no region specified
      breakdown.taxes.transferTax = propertyPrice * 0.08;
      breakdown.taxes.itpExplanation = "Tarifa estándar del 8% (región no especificada)";
    }
  }

  // Gastos del comprador
  breakdown.fees.notaryFees = Math.min(900, 500 + (propertyPrice * 0.0004));
  breakdown.fees.registerFees = Math.min(800, 400 + (propertyPrice * 0.0004));
  
  if (request.includeAgencyFees) {
    breakdown.fees.agencyFees = propertyPrice * 0.03;
  }
  
  if (request.includeLegalFees) {
    breakdown.fees.legalFees = 1000 + (propertyPrice * 0.005);
  }

  // Calcular totales - ensure all values are numbers
  const totalTaxes = Object.values(breakdown.taxes).reduce((sum, tax) => {
    return sum + (typeof tax === 'number' ? tax : 0);
  }, 0);
  const totalFees = Object.values(breakdown.fees).reduce((sum, fee) => {
    return sum + (typeof fee === 'number' ? fee : 0);
  }, 0);
  
  breakdown.totalAdditionalCosts = totalTaxes + totalFees;
  breakdown.totalCost = propertyPrice + breakdown.totalAdditionalCosts;

  return breakdown;
}

async function calculateSellerCosts(request: CalculatorRequest): Promise<CalculationBreakdown> {
  const propertyPrice = request.propertyValue || 0;
  
  let breakdown: CalculationBreakdown = {
    propertyPrice,
    taxes: {},
    fees: {},
    totalAdditionalCosts: 0,
    totalCost: 0 // Para vendedores, esto representará los costos a deducir
  };

  // Plusvalía municipal solo para vivienda usada
  if (request.propertyType === 'used' && request.municipality) {
    const plusvaliaResponse = await calculatePlusvalia(
      request.municipality, 
      propertyPrice, 
      request.previousPurchaseYear || new Date().getFullYear() - 5,
      request.previousPurchasePrice || Math.round(propertyPrice * 0.7)
    );
    breakdown.taxes.plusvalia = plusvaliaResponse.amount;
  }

  // Ganancia patrimonial (IRPF) - aproximación
  if (request.previousPurchasePrice && request.previousPurchaseYear) {
    const currentPrice = Number(propertyPrice);
    const previousPrice = Number(request.previousPurchasePrice);
    const capitalGain = currentPrice - previousPrice;
    
    if (capitalGain > 0) {
      // Aplicar coeficientes de actualización si aplica
      const yearsHeld = new Date().getFullYear() - request.previousPurchaseYear;
      let taxableGain = capitalGain;
      
      // Reducción por años de tenencia (si fue adquirida antes de 2015)
      if (request.previousPurchaseYear < 2015 && yearsHeld > 1) {
        const reductionPercentage = Math.min(yearsHeld * 0.11, 0.60); // 11% por año, máximo 60%
        taxableGain = capitalGain * (1 - reductionPercentage);
      }
      
      // Impuesto sobre ganancia patrimonial (aproximado 19-23%)
      breakdown.taxes.capitalGainsTax = taxableGain * 0.19;
    }
  }

  // Gastos del vendedor
  if (request.includeAgencyFees) {
    breakdown.fees.agencyFees = propertyPrice * 0.03;
  }
  
  if (request.includeLegalFees) {
    breakdown.fees.legalFees = 1000;
  }

  // Calcular totales - ensure all values are numbers
  const totalTaxes = Object.values(breakdown.taxes).reduce((sum, tax) => sum + (Number(tax) || 0), 0);
  const totalFees = Object.values(breakdown.fees).reduce((sum, fee) => sum + (Number(fee) || 0), 0);
  
  breakdown.totalAdditionalCosts = totalTaxes + totalFees;
  breakdown.totalCost = breakdown.totalAdditionalCosts; // Costos que debe pagar el vendedor

  return breakdown;
}

async function calculatePlusvalia(
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
