
// Data extraction utilities for property processing

// Function to extract numeric value from price string
export function extractPrice(priceString: string): number {
  console.log(`💰 Procesando precio: "${priceString}"`);
  const cleanPrice = priceString.replace(/[^\d.,]/g, '');
  const normalizedPrice = cleanPrice.replace(',', '.');
  const price = parseFloat(normalizedPrice) || 0;
  console.log(`💰 Precio extraído: ${price}`);
  return price;
}

// Function to extract surface area from characteristics
export function extractSurfaceArea(characteristics: string[]): number {
  console.log(`📏 Buscando superficie en: ${JSON.stringify(characteristics)}`);
  for (const char of characteristics) {
    const match = char.match(/(\d+)\s*m²/i);
    if (match) {
      const surface = parseInt(match[1], 10);
      console.log(`📏 Superficie encontrada: ${surface}m²`);
      return surface;
    }
  }
  console.log(`📏 No se encontró superficie`);
  return 0;
}

// Function to extract number of rooms from characteristics
export function extractRooms(characteristics: string[]): number {
  for (const char of characteristics) {
    const match = char.match(/(\d+)\s*(habitación|dormitorio|hab\.)/i);
    if (match) {
      return parseInt(match[1], 10);
    }
  }
  return 0;
}

// Function to determine if property has elevator from characteristics
export function hasElevator(characteristics: string[]): boolean {
  return characteristics.some(char => 
    char.toLowerCase().includes('ascensor') || 
    char.toLowerCase().includes('elevador')
  );
}

// Function to determine if property is exterior from characteristics
export function isExterior(characteristics: string[]): boolean {
  return characteristics.some(char => 
    char.toLowerCase().includes('exterior') || 
    char.toLowerCase().includes('luminoso')
  );
}
