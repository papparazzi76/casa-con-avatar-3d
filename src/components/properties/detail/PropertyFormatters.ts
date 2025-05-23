
import { PROPERTY_TYPES, OPERATION_TYPES } from "@/types/property";

export function formatPropertyType(type: string) {
  const found = PROPERTY_TYPES.find(t => t.value === type);
  return found ? found.label : type;
}

export function formatOperationType(type: string) {
  const found = OPERATION_TYPES.find(t => t.value === type);
  return found ? found.label : type;
}

export function formatPrice(price: number, currency: string) {
  const formatter = new Intl.NumberFormat("es-ES");
  const symbol = currency === "EUR" ? "€" : currency === "USD" ? "$" : currency === "GBP" ? "£" : currency;
  return `${formatter.format(price)} ${symbol}`;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-ES", { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(date);
}

// Add the missing function
export function getFormattedLocation(property: { location?: string; address?: string; postal_code?: string }) {
  const parts = [];
  
  if (property.address) parts.push(property.address);
  if (property.location) parts.push(property.location);
  if (property.postal_code) parts.push(property.postal_code);
  
  return parts.join(", ");
}
