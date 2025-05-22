
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Filter, 
  MapPin, 
  Home, 
  Bed, 
  Bath, 
  Maximize, 
  Euro, 
  ArrowRight 
} from "lucide-react";
import { PROPERTY_TYPES, OPERATION_TYPES } from "@/types/property";

export function PropertySearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Estados para los filtros
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [operation, setOperation] = useState(searchParams.get("operation") || "");
  const [propertyType, setPropertyType] = useState(searchParams.get("type") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [minArea, setMinArea] = useState(searchParams.get("minArea") || "");
  const [maxArea, setMaxArea] = useState(searchParams.get("maxArea") || "");
  const [minRooms, setMinRooms] = useState(searchParams.get("minRooms") || "");
  const [minBathrooms, setMinBathrooms] = useState(searchParams.get("minBathrooms") || "");
  const [postalCode, setPostalCode] = useState(searchParams.get("postalCode") || "");
  
  // Manejo del rango de precios
  const [priceRange, setPriceRange] = useState<[number, number]>([
    searchParams.get("minPrice") ? parseInt(searchParams.get("minPrice") || "0") : 0,
    searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice") || "1000000") : 1000000
  ]);
  
  // Manejo del rango de superficie
  const [areaRange, setAreaRange] = useState<[number, number]>([
    searchParams.get("minArea") ? parseInt(searchParams.get("minArea") || "0") : 0,
    searchParams.get("maxArea") ? parseInt(searchParams.get("maxArea") || "500") : 500
  ]);

  // Elementos destacados (características)
  const [features, setFeatures] = useState<string[]>(
    searchParams.get("features") ? searchParams.get("features")?.split(",") || [] : []
  );
  
  const availableFeatures = [
    { id: "terraza", label: "Terraza" },
    { id: "piscina", label: "Piscina" },
    { id: "garaje", label: "Garaje" },
    { id: "ascensor", label: "Ascensor" },
    { id: "amueblado", label: "Amueblado" },
    { id: "jardin", label: "Jardín" },
    { id: "aire_acondicionado", label: "Aire acondicionado" },
    { id: "calefaccion", label: "Calefacción" }
  ];

  // Aplicar los filtros
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

  // Limpiar los filtros
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

  // Manejar cambios en las características seleccionadas
  const handleFeatureChange = (featureId: string, checked: boolean) => {
    if (checked) {
      setFeatures([...features, featureId]);
    } else {
      setFeatures(features.filter(id => id !== featureId));
    }
  };

  return (
    <div className="mb-8">
      <Card className="p-4 md:p-6 shadow-sm">
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
                <SelectItem value="">Todos</SelectItem>
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
                <SelectItem value="">Todos</SelectItem>
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
        
        <Accordion type="single" collapsible>
          <AccordionItem value="filters">
            <AccordionTrigger id="advancedFilters" className="text-sm font-medium">
              Filtros avanzados
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                {/* Rango de precios */}
                <div>
                  <Label className="mb-2 block">Precio</Label>
                  <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                    <span>{priceRange[0].toLocaleString()}€</span>
                    <span>{priceRange[1].toLocaleString()}€</span>
                  </div>
                  <Slider
                    defaultValue={priceRange}
                    min={0}
                    max={1000000}
                    step={5000}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mb-6"
                  />
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0] || ""}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-1/2"
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1] || ""}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000000])}
                      className="w-1/2"
                    />
                  </div>
                </div>
                
                {/* Rango de superficie */}
                <div>
                  <Label className="mb-2 block">Superficie (m²)</Label>
                  <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                    <span>{areaRange[0]} m²</span>
                    <span>{areaRange[1]} m²</span>
                  </div>
                  <Slider
                    defaultValue={areaRange}
                    min={0}
                    max={500}
                    step={5}
                    value={areaRange}
                    onValueChange={(value) => setAreaRange(value as [number, number])}
                    className="mb-6"
                  />
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={areaRange[0] || ""}
                      onChange={(e) => setAreaRange([parseInt(e.target.value) || 0, areaRange[1]])}
                      className="w-1/2"
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={areaRange[1] || ""}
                      onChange={(e) => setAreaRange([areaRange[0], parseInt(e.target.value) || 500])}
                      className="w-1/2"
                    />
                  </div>
                </div>
                
                {/* Habitaciones y baños */}
                <div>
                  <Label className="mb-2 block">Habitaciones y baños</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Select value={minRooms} onValueChange={setMinRooms}>
                        <SelectTrigger>
                          <SelectValue placeholder="Hab." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Cualquier</SelectItem>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}+ hab.
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select value={minBathrooms} onValueChange={setMinBathrooms}>
                        <SelectTrigger>
                          <SelectValue placeholder="Baños" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Cualquier</SelectItem>
                          {[1, 2, 3, 4].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}+ baños
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* Código Postal */}
                  <div className="mt-4">
                    <Label htmlFor="postalCode" className="mb-2 block">Código Postal</Label>
                    <Input
                      id="postalCode"
                      placeholder="Ej: 28001"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Características */}
                <div>
                  <Label className="mb-4 block">Características</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableFeatures.map((feature) => (
                      <div key={feature.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature.id}
                          checked={features.includes(feature.id)}
                          onCheckedChange={(checked) => 
                            handleFeatureChange(feature.id, checked === true)
                          }
                        />
                        <Label htmlFor={feature.id} className="text-sm">
                          {feature.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={clearFilters}>
                  Limpiar filtros
                </Button>
                <Button 
                  onClick={applyFilters}
                  className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
                >
                  Aplicar filtros
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
}
