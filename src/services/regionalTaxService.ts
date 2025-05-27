
// Regional tax rates and configurations for Spanish autonomous communities (2025)
export interface RegionalTaxConfig {
  baseITP: number; // Base ITP rate
  progressiveTariff?: {
    threshold: number;
    rate: number;
    accumulatedQuota: number;
  }[];
  highValueThreshold?: number; // Price threshold for higher rate
  highValueITP?: number; // Higher ITP rate for expensive properties
  ageReductions: {
    maxAge: number;
    reduction: number; // Percentage reduction
    maxValue?: number; // Maximum property value for this reduction
  }[];
  specialConditions?: {
    vpo?: number; // VPO (Protected housing) rate
    ruralAreas?: number; // Rural areas rate
    familyReductions?: {
      largeFamily?: number;
      singleParent?: number;
      disability?: number;
      disabilityThreshold?: number; // Minimum disability percentage
    };
    firstHomeBonus?: {
      maxValue: number;
      rate: number;
      conditions?: string;
    };
  };
  ajdRate: number; // AJD rate for new properties
}

export const REGIONAL_TAX_RATES: Record<string, RegionalTaxConfig> = {
  'aragon': {
    baseITP: 0.08, // 8%
    progressiveTariff: [
      { threshold: 400000, rate: 0.08, accumulatedQuota: 0 },
      { threshold: 450000, rate: 0.085, accumulatedQuota: 32000 },
      { threshold: 500000, rate: 0.09, accumulatedQuota: 36250 },
      { threshold: 750000, rate: 0.095, accumulatedQuota: 40750 },
      { threshold: Infinity, rate: 0.10, accumulatedQuota: 64500 }
    ],
    ageReductions: [
      { maxAge: 35, reduction: 0.50 } // 50% reduction for under 35
    ],
    ajdRate: 0.015
  },
  'asturias': {
    baseITP: 0.08, // 8%
    progressiveTariff: [
      { threshold: 300000, rate: 0.08, accumulatedQuota: 0 },
      { threshold: 500000, rate: 0.09, accumulatedQuota: 24000 },
      { threshold: Infinity, rate: 0.10, accumulatedQuota: 42000 }
    ],
    ageReductions: [
      { maxAge: 35, reduction: 0.50, maxValue: 150000 } // 4% rate (50% reduction) up to 150k, 6% above
    ],
    specialConditions: {
      ruralAreas: 0.04, // 4% for rural depopulation areas
    },
    ajdRate: 0.015
  },
  'baleares': {
    baseITP: 0.08, // 8%
    progressiveTariff: [
      { threshold: 400000, rate: 0.08, accumulatedQuota: 0 },
      { threshold: 600000, rate: 0.09, accumulatedQuota: 32000 },
      { threshold: 1000000, rate: 0.10, accumulatedQuota: 50000 },
      { threshold: 2000000, rate: 0.12, accumulatedQuota: 90000 },
      { threshold: Infinity, rate: 0.13, accumulatedQuota: 210000 }
    ],
    ageReductions: [
      { maxAge: 36, reduction: 0.75, maxValue: 270151.20 } // 2% rate for under 36
    ],
    specialConditions: {
      firstHomeBonus: {
        maxValue: 270151.20,
        rate: 0.04,
        conditions: "Primera vivienda habitual"
      },
      familyReductions: {
        disability: 0.02 // 2% for disabled
      }
    },
    ajdRate: 0.015
  },
  'canarias': {
    baseITP: 0.065, // 6.5%
    ageReductions: [
      { maxAge: 35, reduction: 0.23, maxValue: 150000 } // 5% rate for first home up to 150k
    ],
    specialConditions: {
      firstHomeBonus: {
        maxValue: 150000,
        rate: 0.05,
        conditions: "Primera vivienda habitual"
      }
    },
    ajdRate: 0.015
  },
  'cantabria': {
    baseITP: 0.09, // 9%
    ageReductions: [
      { maxAge: 36, reduction: 0.56 } // 4% rate for under 36
    ],
    specialConditions: {
      firstHomeBonus: {
        maxValue: 200000,
        rate: 0.07,
        conditions: "Vivienda habitual menor 200k"
      },
      familyReductions: {
        largeFamily: 0.04,
        singleParent: 0.04,
        disability: 0.04
      }
    },
    ajdRate: 0.015
  },
  'castilla-leon': {
    baseITP: 0.08, // 8%
    highValueThreshold: 250000,
    highValueITP: 0.10, // 10% for properties over 250k
    ageReductions: [
      { maxAge: 36, reduction: 0.50 } // 4% rate for under 36
    ],
    specialConditions: {
      vpo: 0.04,
      familyReductions: {
        largeFamily: 0.04,
        disability: 0.04
      },
      ruralAreas: 0.0001 // 0.01% for rural areas under specific conditions
    },
    ajdRate: 0.015
  },
  'castilla-la-mancha': {
    baseITP: 0.09, // 9%
    ageReductions: [
      { maxAge: 36, reduction: 0.44, maxValue: 180000 } // 5% rate for under 36
    ],
    specialConditions: {
      firstHomeBonus: {
        maxValue: 180000,
        rate: 0.06,
        conditions: "Primera vivienda habitual"
      },
      ruralAreas: 0.03, // 3% for depopulation areas
      familyReductions: {
        largeFamily: 0.05,
        singleParent: 0.05,
        disability: 0.05
      }
    },
    ajdRate: 0.015
  },
  'cataluna': {
    baseITP: 0.10, // 10%
    progressiveTariff: [
      { threshold: 1000000, rate: 0.10, accumulatedQuota: 0 },
      { threshold: Infinity, rate: 0.11, accumulatedQuota: 100000 }
    ],
    ageReductions: [
      { maxAge: 32, reduction: 0.50 } // 5% rate for under 32
    ],
    specialConditions: {
      vpo: 0.07,
      familyReductions: {
        largeFamily: 0.05,
        singleParent: 0.05,
        disability: 0.05
      }
    },
    ajdRate: 0.015
  },
  'extremadura': {
    baseITP: 0.08, // 8%
    progressiveTariff: [
      { threshold: 360000, rate: 0.08, accumulatedQuota: 0 },
      { threshold: 600000, rate: 0.10, accumulatedQuota: 28800 },
      { threshold: Infinity, rate: 0.11, accumulatedQuota: 52800 }
    ],
    ageReductions: [
      { maxAge: 35, reduction: 0.125, maxValue: 122000 } // 7% rate up to 122k
    ],
    specialConditions: {
      vpo: 0.04,
      ruralAreas: 0.04
    },
    ajdRate: 0.015
  },
  'galicia': {
    baseITP: 0.08, // 8%
    ageReductions: [
      { maxAge: 36, reduction: 0.625, maxValue: 150000 } // 3% rate for under 36
    ],
    specialConditions: {
      firstHomeBonus: {
        maxValue: 150000,
        rate: 0.07,
        conditions: "Vivienda habitual con patrimonio limitado"
      },
      ruralAreas: 0.06,
      familyReductions: {
        largeFamily: 0.03,
        disability: 0.03
      }
    },
    ajdRate: 0.015
  },
  'madrid': {
    baseITP: 0.06, // 6%
    ageReductions: [
      { maxAge: 32, reduction: 0.33 } // 4% rate for large families
    ],
    specialConditions: {
      firstHomeBonus: {
        maxValue: 250000,
        rate: 0.054, // 10% bonus on 6% = 5.4%
        conditions: "Bonificación 10% hasta 250k"
      },
      familyReductions: {
        largeFamily: 0.04
      },
      ruralAreas: 0.00 // 100% bonus for rural municipalities
    },
    ajdRate: 0.015
  },
  'murcia': {
    baseITP: 0.08, // 8%
    ageReductions: [
      { maxAge: 40, reduction: 0.625 } // 3% rate for under 40
    ],
    specialConditions: {
      vpo: 0.04,
      familyReductions: {
        largeFamily: 0.03,
        disability: 0.03
      }
    },
    ajdRate: 0.015
  },
  'navarra': {
    baseITP: 0.06, // 6%
    ageReductions: [
      { maxAge: 35, reduction: 0.17 } // Aproximadamente 5%
    ],
    ajdRate: 0.015
  },
  'pais-vasco': {
    baseITP: 0.07, // 7% general rate
    ageReductions: [
      { maxAge: 30, reduction: 0.14 } // Aproximadamente 6%
    ],
    ajdRate: 0.015
  },
  'rioja': {
    baseITP: 0.07, // 7%
    ageReductions: [
      { maxAge: 40, reduction: 0.43 } // 4% rate for under 40 (new 2025)
    ],
    specialConditions: {
      vpo: 0.05,
      familyReductions: {
        largeFamily: 0.03, // Can go down to 3%
        disability: 0.05
      }
    },
    ajdRate: 0.015
  },
  'valencia': {
    baseITP: 0.10, // 10%
    highValueThreshold: 1000000,
    highValueITP: 0.11, // 11% for properties over 1M
    ageReductions: [
      { maxAge: 35, reduction: 0.40, maxValue: 180000 }, // 6% rate for under 35
      { maxAge: 40, reduction: 0.60 } // 4% rate for under 40 (new 2025)
    ],
    specialConditions: {
      vpo: 0.06, // 6% for VPO up to 180k, 8% above
      familyReductions: {
        largeFamily: 0.03,
        singleParent: 0.03,
        disability: 0.03
      }
    },
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

  // Calculate progressive tariff if applicable
  if (config.progressiveTariff) {
    let totalTax = 0;
    let remainingValue = propertyValue;
    let currentThreshold = 0;
    
    for (const bracket of config.progressiveTariff) {
      const bracketSize = bracket.threshold - currentThreshold;
      const taxableInBracket = Math.min(remainingValue, bracketSize);
      
      if (taxableInBracket > 0) {
        totalTax += bracket.accumulatedQuota + (taxableInBracket * bracket.rate);
        remainingValue -= taxableInBracket;
        
        if (remainingValue <= 0) {
          applicableRate = totalTax / propertyValue;
          explanation = `Tarifa progresiva aplicada: ${(applicableRate * 100).toFixed(2)}%`;
          break;
        }
      }
      currentThreshold = bracket.threshold;
    }
  } else {
    // Check for high value threshold
    if (config.highValueThreshold && config.highValueITP && propertyValue > config.highValueThreshold) {
      applicableRate = config.highValueITP;
      explanation = `Tarifa alta: ${(config.highValueITP * 100).toFixed(1)}% (inmueble > ${config.highValueThreshold.toLocaleString('es-ES')}€)`;
    }
  }

  // Apply age reductions
  if (buyerAge && config.ageReductions.length > 0) {
    for (const ageReduction of config.ageReductions) {
      if (buyerAge <= ageReduction.maxAge) {
        // Check if there's a maximum value condition
        if (!ageReduction.maxValue || propertyValue <= ageReduction.maxValue) {
          const originalRate = applicableRate;
          applicableRate = applicableRate * (1 - ageReduction.reduction);
          explanation += `. Reducción del ${(ageReduction.reduction * 100).toFixed(0)}% por edad (≤${ageReduction.maxAge} años)`;
          if (ageReduction.maxValue) {
            explanation += ` hasta ${ageReduction.maxValue.toLocaleString('es-ES')}€`;
          }
          explanation += `: ${(originalRate * 100).toFixed(1)}% → ${(applicableRate * 100).toFixed(1)}%`;
        }
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
