
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiltersState } from "./types";

interface PropertyAdvancedFiltersProps {
  filtersState: FiltersState;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export function PropertyAdvancedFilters({ 
  filtersState, 
  onApplyFilters, 
  onClearFilters 
}: PropertyAdvancedFiltersProps) {
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

  // Destructure all filter state for easier access
  const { 
    priceRange, setPriceRange,
    areaRange, setAreaRange,
    minRooms, setMinRooms,
    minBathrooms, setMinBathrooms,
    postalCode, setPostalCode,
    features, setFeatures
  } = filtersState;

  // Handle feature selection changes
  const handleFeatureChange = (featureId: string, checked: boolean) => {
    if (checked) {
      setFeatures([...features, featureId]);
    } else {
      setFeatures(features.filter(id => id !== featureId));
    }
  };

  return (
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
                      <SelectItem value="cualquiera">Cualquier</SelectItem>
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
                      <SelectItem value="cualquiera">Cualquier</SelectItem>
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
            <Button variant="outline" onClick={onClearFilters}>
              Limpiar filtros
            </Button>
            <Button 
              onClick={onApplyFilters}
              className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
            >
              Aplicar filtros
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
