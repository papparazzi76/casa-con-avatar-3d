
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Search, Filter } from "lucide-react";
import { PROPERTY_TYPES, OPERATION_TYPES } from "@/types/property";
import { PropertyAdvancedFilters } from "./PropertyAdvancedFilters";
import { FiltersState } from "./types";

export function PropertySearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Base search states
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [operation, setOperation] = useState(searchParams.get("operation") || "");
  const [propertyType, setPropertyType] = useState(searchParams.get("type") || "");
  
  // Advanced filter states
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [minArea, setMinArea] = useState(searchParams.get("minArea") || "");
  const [maxArea, setMaxArea] = useState(searchParams.get("maxArea") || "");
  const [minRooms, setMinRooms] = useState(searchParams.get("minRooms") || "");
  const [minBathrooms, setMinBathrooms] = useState(searchParams.get("minBathrooms") || "");
  const [postalCode, setPostalCode] = useState(searchParams.get("postalCode") || "");
  
  // Range slider states
  const [priceRange, setPriceRange] = useState<[number, number]>([
    searchParams.get("minPrice") ? parseInt(searchParams.get("minPrice") || "0") : 0,
    searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice") || "1000000") : 1000000
  ]);
  
  const [areaRange, setAreaRange] = useState<[number, number]>([
    searchParams.get("minArea") ? parseInt(searchParams.get("minArea") || "0") : 0,
    searchParams.get("maxArea") ? parseInt(searchParams.get("maxArea") || "500") : 500
  ]);

  // Features state
  const [features, setFeatures] = useState<string[]>(
    searchParams.get("features") ? searchParams.get("features")?.split(",") || [] : []
  );
  
  // Collect all filter states in one object for the child component
  const filtersState: FiltersState = {
    priceRange,
    setPriceRange,
    areaRange,
    setAreaRange,
    minRooms,
    setMinRooms,
    minBathrooms,
    setMinBathrooms,
    postalCode,
    setPostalCode,
    features,
    setFeatures
  };

  // Apply the filters
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (location) params.set("location", location);
    if (operation) params.set("operation", operation);
    if (propertyType) params.set("type", propertyType);
    if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString());
    if (priceRange[1] < 1000000) params.set("maxPrice", priceRange[1].toString());
    if (areaRange[0] > 0) params.set("minArea", areaRange[0].toString());
    if (areaRange[1] < 500) params.set("maxArea", areaRange[1].toString());
    if (minRooms) params.set("minRooms", minRooms);
    if (minBathrooms) params.set("minBathrooms", minBathrooms);
    if (postalCode) params.set("postalCode", postalCode);
    if (features.length > 0) params.set("features", features.join(","));
    
    setSearchParams(params);
    navigate(`/propiedades?${params.toString()}`);
  };

  // Clear all filters
  const clearFilters = () => {
    setLocation("");
    setOperation("");
    setPropertyType("");
    setPriceRange([0, 1000000]);
    setAreaRange([0, 500]);
    setMinRooms("");
    setMinBathrooms("");
    setPostalCode("");
    setFeatures([]);
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="mb-8">
      <div className="p-4 md:p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
          {/* Ubicación - Campo principal */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Ciudad, zona o código postal"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          {/* Tipo de operación */}
          <div className="md:col-span-3 lg:col-span-2">
            <Select value={operation} onValueChange={setOperation}>
              <SelectTrigger>
                <SelectValue placeholder="Comprar o alquilar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                {OPERATION_TYPES.map((op) => (
                  <SelectItem key={op.value} value={op.value}>
                    {op.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Tipo de propiedad */}
          <div className="md:col-span-3 lg:col-span-2">
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de inmueble" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                {PROPERTY_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Botón buscar y filtros avanzados */}
          <div className="md:col-span-2 lg:col-span-5 flex justify-end gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => document.getElementById('advancedFilters')?.click()}
              className="h-10 w-10"
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Button 
              onClick={applyFilters}
              className="flex-grow lg:flex-grow-0 bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
            >
              <Search className="mr-2 h-4 w-4" />
              Buscar
            </Button>
          </div>
        </div>
        
        <PropertyAdvancedFilters 
          filtersState={filtersState}
          onApplyFilters={applyFilters}
          onClearFilters={clearFilters}
        />
      </div>
    </div>
  );
}
