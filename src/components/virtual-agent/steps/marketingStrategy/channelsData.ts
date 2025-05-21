
export interface MarketingChannel {
  id: string;
  name: string;
  category: string;
  cost: number;
  reach: number;
}

export const channels: MarketingChannel[] = [
  // --- Portales gratuitos -------------------------
  { id: "idealista_free", name: "Idealista Particular", category: "Portal gratuito", cost: 1, reach: 4 },
  { id: "fotocasa_free", name: "Fotocasa Particular", category: "Portal gratuito", cost: 1, reach: 3 },
  { id: "milanuncios", name: "Milanuncios", category: "Portal gratuito", cost: 1, reach: 2 },
  { id: "wallapop", name: "Wallapop", category: "Portal gratuito", cost: 1, reach: 2 },
  { id: "fb_marketplace", name: "Facebook Marketplace", category: "Portal gratuito", cost: 1, reach: 3 },

  // --- Portales de pago / pro ----------------------
  { id: "idealista_pro", name: "Idealista Pro", category: "Portal pro", cost: 3, reach: 4 },
  { id: "mls", name: "Portales MLS", category: "Portal pro", cost: 3, reach: 3 },
  { id: "google_lsa", name: "Google Local Services Ads", category: "SEM", cost: 4, reach: 3 },

  // --- Redes sociales ------------------------------
  { id: "ig_reels", name: "Instagram Reels (orgánico)", category: "Social", cost: 1, reach: 4 },
  { id: "yt_shorts", name: "YouTube Shorts (orgánico)", category: "Social", cost: 1, reach: 3 },
  { id: "meta_ads", name: "Meta Ads (FB+IG)", category: "Social Ads", cost: 3, reach: 4 },

  // --- Marketing local -----------------------------
  { id: "qr_sign", name: "Cartelería QR en fachada", category: "Local", cost: 2, reach: 2 },
  { id: "buzoneo", name: "Buzoneo con enlace rastreable", category: "Local", cost: 3, reach: 2 }
];

export const categoryColors: Record<string, string> = {
  "Portal gratuito": "#22c55e", 
  "Portal pro": "#0ea5e9",
  "SEM": "#6366f1", 
  "Social": "#f97316",
  "Social Ads": "#ef4444", 
  "Local": "#a855f7"
};

export interface BuyerPersona {
  age: number;
  techSavvy: boolean;
  urgency: "baja" | "media" | "alta";
}

export const defaultBuyerPersona: BuyerPersona = {
  age: 32,
  techSavvy: true,
  urgency: "media"
};

export function scoreFit(channel: MarketingChannel, persona: BuyerPersona): string {
  if (channel.id === "ig_reels" && persona.techSavvy) return "👍 Muy adecuado";
  if (channel.category === "Social" && persona.techSavvy) return "👌 Buena opción";
  if (channel.category === "Local" && persona.urgency === "alta") return "👌 Buena palanca rápida";
  if (channel.category === "Portal gratuito" && persona.urgency === "baja") return "👍 Muy adecuado";
  if (channel.category === "Portal pro" && persona.urgency === "alta") return "👍 Muy adecuado";
  return "🤔 Neutro";
}

export const costLevels = [
  { level: 1, description: "Muy bajo", range: "Gratis / orgánico / ≤ 50 €" },
  { level: 2, description: "Bajo", range: "50-300 €" },
  { level: 3, description: "Medio", range: "300-800 €" },
  { level: 4, description: "Alto", range: "> 800 € o > 3 €/lead" }
];

export const reachLevels = [
  { level: 1, description: "Muy bajo", range: "< 10k (nicho local)" },
  { level: 2, description: "Bajo", range: "10-50k" },
  { level: 3, description: "Medio", range: "50-250k" },
  { level: 4, description: "Alto", range: "> 250k" }
];
