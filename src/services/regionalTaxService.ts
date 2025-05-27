
// Regional tax rates and configurations for Spanish autonomous communities
export interface RegionalTaxConfig {
  baseITP: number; // Base ITP rate
  highValueThreshold?: number; // Price threshold for higher rate
  highValueITP?: number; // Higher ITP rate for expensive properties
  ageReductions: {
    maxAge: number;
    reduction: number; // Percentage reduction
  }[];
  ajdRate: number; // AJD rate for new properties
}

export const REGIONAL_TAX_RATES: Record<string, RegionalTaxConfig> = {
  'andalucia': {
    baseITP: 0.08, // 8%
    highValueThreshold: 400000,
    highValueITP: 0.10, // 10% for properties over 400k
    ageReductions: [
      { maxAge: 35, reduction: 0.20 }, // 20% reduction for under 35
    ],
    ajdRate: 0.015
  },
  'madrid': {
    baseITP: 0.06, // 6%
    highValueThreshold: 600000,
    highValueITP: 0.09, // 9% for properties over 600k
    ageReductions: [
      { maxAge: 32, reduction: 0.20 }, // 20% reduction for under 32
    ],
    ajdRate: 0.015
  },
  'cataluna': {
    baseITP: 0.10, // 10%
    highValueThreshold: 500000,
    highValueITP: 0.11, // 11% for properties over 500k
    ageReductions: [
      { maxAge: 32, reduction: 0.50 }, // 50% reduction for under 32
    ],
    ajdRate: 0.015
  },
  'valencia': {
    baseITP: 0.10, // 10%
    highValueThreshold: 400000,
    highValueITP: 0.11, // 11% for properties over 400k
    ageReductions: [
      { maxAge: 35, reduction: 0.50 }, // 50% reduction for under 35
    ],
    ajdRate: 0.015
  },
  'pais-vasco': {
    baseITP: 0.04, // 4%
    ageReductions: [
      { maxAge: 30, reduction: 0.20 }, // 20% reduction for under 30
    ],
    ajdRate: 0.015
  },
  'galicia': {
    baseITP: 0.10, // 10%
    ageReductions: [
      { maxAge: 36, reduction: 0.30 }, // 30% reduction for under 36
    ],
    ajdRate: 0.015
  },
  'castilla-leon': {
    baseITP: 0.08, // 8%
    ageReductions: [
      { maxAge: 36, reduction: 0.20 }, // 20% reduction for under 36
    ],
    ajdRate: 0.015
  },
  'murcia': {
    baseITP: 0.08, // 8%
    highValueThreshold: 300000,
    highValueITP: 0.10, // 10% for properties over 300k
    ageReductions: [
      { maxAge: 35, reduction: 0.30 }, // 30% reduction for under 35
    ],
    ajdRate: 0.015
  },
  'aragon': {
    baseITP: 0.08, // 8%
    ageReductions: [
      { maxAge: 35, reduction: 0.50 }, // 50% reduction for under 35
    ],
    ajdRate: 0.015
  },
  'asturias': {
    baseITP: 0.08, // 8%
    ageReductions: [
      { maxAge: 35, reduction: 0.20 }, // 20% reduction for under 35
    ],
    ajdRate: 0.015
  },
  'cantabria': {
    baseITP: 0.08, // 8%
    ageReductions: [
      { maxAge: 35, reduction: 0.20 }, // 20% reduction for under 35
    ],
    ajdRate: 0.015
  },
  'castilla-la-mancha': {
    baseITP: 0.09, // 9%
    ageReductions: [
      { maxAge: 35, reduction: 0.30 }, // 30% reduction for under 35
    ],
    ajdRate: 0.015
  },
  'extremadura': {
    baseITP: 0.08, // 8%
    ageReductions: [
      { maxAge: 35, reduction: 0.25 }, // 25% reduction for under 35
    ],
    ajdRate: 0.015
  },
  'rioja': {
    baseITP: 0.07, // 7%
    ageReductions: [
      { maxAge: 36, reduction: 0.20 }, // 20% reduction for under 36
    ],
    ajdRate: 0.015
  },
  'baleares': {
    baseITP: 0.08, // 8%
    highValueThreshold: 600000,
    highValueITP: 0.11, // 11% for properties over 600k
    ageReductions: [
      { maxAge: 35, reduction: 0.30 }, // 30% reduction for under 35
    ],
    ajdRate: 0.015
  },
  'canarias': {
    baseITP: 0.065, // 6.5%
    ageReductions: [
      { maxAge: 35, reduction: 0.50 }, // 50% reduction for under 35
    ],
    ajdRate: 0.015
  },
  'navarra': {
    baseITP: 0.06, // 6%
    ageReductions: [
      { maxAge: 35, reduction: 0.20 }, // 20% reduction for under 35
    ],
    ajdRate: 0.015
  }
};

export function calculateRegionalITP(
  propertyValue: number, 
  region: string, 
  buyerAge?: number
): { amount: number; rate: number; explanation: string } {
  const config = REGIONAL_TAX_RATES[region];
  
  if (!config) {
    // Default rates if region not found
    return {
      amount: propertyValue * 0.08,
      rate: 0.08,
      explanation: "Aplicando tarifa estándar del 8% (región no especificada)"
    };
  }

  let applicableRate = config.baseITP;
  let explanation = `Tarifa base: ${(config.baseITP * 100).toFixed(1)}%`;

  // Check for high value threshold
  if (config.highValueThreshold && config.highValueITP && propertyValue > config.highValueThreshold) {
    applicableRate = config.highValueITP;
    explanation = `Tarifa alta: ${(config.highValueITP * 100).toFixed(1)}% (inmueble > ${config.highValueThreshold.toLocaleString('es-ES')}€)`;
  }

  // Apply age reductions
  if (buyerAge && config.ageReductions.length > 0) {
    for (const ageReduction of config.ageReductions) {
      if (buyerAge <= ageReduction.maxAge) {
        const originalRate = applicableRate;
        applicableRate = applicableRate * (1 - ageReduction.reduction);
        explanation += `. Reducción del ${(ageReduction.reduction * 100).toFixed(0)}% por edad (≤${ageReduction.maxAge} años): ${(originalRate * 100).toFixed(1)}% → ${(applicableRate * 100).toFixed(1)}%`;
        break;
      }
    }
  }

  return {
    amount: propertyValue * applicableRate,
    rate: applicableRate,
    explanation
  };
}
