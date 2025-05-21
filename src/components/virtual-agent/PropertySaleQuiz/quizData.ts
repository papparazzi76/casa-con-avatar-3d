
export interface QuizOption {
  label: string;
  value: number;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
  dimension: string;
}

export interface NextStep {
  text: string;
  url: string;
}

export interface QuizResult {
  result: string;
  score: number;
  highlights: string[];
  next_steps: NextStep[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    text: "¿Cuánto tiempo puedes dedicar cada semana a la venta?",
    options: [
      { label: "Menos de 1 h", value: 0 },
      { label: "1-3 h", value: 1 },
      { label: "3-5 h", value: 2 },
      { label: "Más de 5 h", value: 3 }
    ],
    dimension: "tiempo"
  },
  {
    id: "q2",
    text: "¿Qué nivel de experiencia tienes en trámites legales y fiscales inmobiliarios?",
    options: [
      { label: "Ninguno", value: 0 },
      { label: "Básico", value: 1 },
      { label: "Intermedio", value: 2 },
      { label: "Avanzado", value: 3 }
    ],
    dimension: "conocimientos"
  },
  {
    id: "q3",
    text: "¿Cuentas con presupuesto para contratar fotografía, vídeo y tour virtual?",
    options: [
      { label: "No", value: 0 },
      { label: "≤ 100 €", value: 1 },
      { label: "100-300 €", value: 2 },
      { label: "> 300 €", value: 3 }
    ],
    dimension: "recursos"
  },
  {
    id: "q4",
    text: "¿Qué tan cómoda/o te sientes negociando precio y condiciones directamente?",
    options: [
      { label: "Nada", value: 0 },
      { label: "Algo", value: 1 },
      { label: "Bastante", value: 2 },
      { label: "Totalmente", value: 3 }
    ],
    dimension: "negociación"
  },
  {
    id: "q5",
    text: "¿Dispones de base de datos o canales propios para encontrar compradores?",
    options: [
      { label: "No", value: 0 },
      { label: "Pocos", value: 1 },
      { label: "Algunos", value: 2 },
      { label: "Sí, extensa", value: 3 }
    ],
    dimension: "marketing"
  },
  {
    id: "q6",
    text: "¿Con qué urgencia necesitas vender?",
    options: [
      { label: "> 6 meses", value: 3 },
      { label: "3-6 meses", value: 2 },
      { label: "1-3 meses", value: 1 },
      { label: "< 1 mes", value: 0 }
    ],
    dimension: "urgencia"
  },
  {
    id: "q7",
    text: "¿Estás dispuesto a pagar honorarios si eso acelera o facilita la venta?",
    options: [
      { label: "No", value: 3 },
      { label: "Solo bajos (<3 %)", value: 2 },
      { label: "Hasta 5 %", value: 1 },
      { label: "Sí, lo que sea", value: 0 }
    ],
    dimension: "costes"
  },
  {
    id: "q8",
    text: "¿Cuál es tu tolerancia al estrés de gestionar visitas y llamadas?",
    options: [
      { label: "Muy baja", value: 0 },
      { label: "Baja", value: 1 },
      { label: "Media", value: 2 },
      { label: "Alta", value: 3 }
    ],
    dimension: "estrés"
  }
];

export const getRecommendation = (totalScore: number): string => {
  if (totalScore >= 18) return "FSBO (Venta por propietario)";
  if (totalScore >= 12) return "Inmobiliaria en exclusiva";
  return "Multimandato o agencia tradicional";
};

export const generateHighlights = (answers: Record<string, number>): string[] => {
  const highlights: string[] = [];
  
  // Ejemplos de lógica para generar highlights basados en las respuestas
  if (answers.q2 === 2) {
    highlights.push("Tienes experiencia intermedia en trámites legales.");
  }
  
  if (answers.q6 === 1) {
    highlights.push("Tu urgencia es media-alta (<3 meses).");
  }
  
  if (answers.q7 === 1) {
    highlights.push("Estás dispuesto a pagar honorarios razonables.");
  }
  
  if (answers.q1 >= 2) {
    highlights.push("Puedes dedicar tiempo suficiente al proceso de venta.");
  }
  
  if (answers.q4 >= 2) {
    highlights.push("Te sientes cómodo/a negociando directamente.");
  }
  
  if (answers.q8 <= 1) {
    highlights.push("Prefieres evitar el estrés de gestionar el proceso por tu cuenta.");
  }
  
  return highlights.slice(0, 3); // Limitamos a 3 highlights principales
};

export const getNextSteps = (result: string): NextStep[] => {
  switch (result) {
    case "FSBO (Venta por propietario)":
      return [
        { text: "Descarga guía de autogestión de venta", url: "/valorador-inmuebles" },
        { text: "Solicita valoración gratuita", url: "/valorador-inmuebles" }
      ];
    case "Inmobiliaria en exclusiva":
      return [
        { text: "Descarga checklist de selección de agencia", url: "/valorador-inmuebles" },
        { text: "Solicita valoración gratuita", url: "/valorador-inmuebles" }
      ];
    default:
      return [
        { text: "Compara servicios de inmobiliarias", url: "/valorador-inmuebles" },
        { text: "Solicita valoración gratuita", url: "/valorador-inmuebles" }
      ];
  }
};
