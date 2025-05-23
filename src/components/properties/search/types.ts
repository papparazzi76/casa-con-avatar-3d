
export interface FiltersState {
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  areaRange: [number, number];
  setAreaRange: (value: [number, number]) => void;
  minRooms: string;
  setMinRooms: (value: string) => void;
  minBathrooms: string;
  setMinBathrooms: (value: string) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  features: string[];
  setFeatures: (value: string[]) => void;
}
