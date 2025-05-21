
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PropertyFormData, CalculationResult } from "@/types/calculatorTypes";
import { calculateExpenses } from "@/services/calculatorService";
import { toast } from "@/hooks/use-toast";
import { Calendar } from "lucide-react";

interface ExpensesCalculatorFormProps {
  onCalculationComplete: (result: CalculationResult) => void;
}

export function ExpensesCalculatorForm({ onCalculationComplete }: ExpensesCalculatorFormProps) {
  const [formData, setFormData] = useState<PropertyFormData>({
    region: "",
    municipality: "",
    price: 0,
    propertyType: "used",
    specialRegime: "",
    hasLoan: false,
    loanAmount: "",
    bank: "",
    deedDate: "",
    acquisitionDate: "",
    acquisitionValue: "",
    improvements: "",
    adjustmentCoefficient: "",
    yearsOfResidence: "",
    remainingLoan: "",
    municipalCapitalGainsTax: "",
    financingPercentage: ""
  });

  const regions = [
    "Andalucía", "Aragón", "Asturias", "Baleares", "Canarias", "Cantabria", 
    "Castilla-La Mancha", "Castilla y León", "Cataluña", "Extremadura", "Galicia", 
    "Madrid", "Murcia", "La Rioja", "Comunidad Valenciana", "País Vasco", "Navarra"
  ];

  // Manejar cambios en los campos de texto
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    // Convertir a número si es un campo numérico
    const processedValue = type === "number" ? (value === "" ? "" : Number(value)) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  // Manejar cambios en los selectores
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar cambios en switches
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.region || !formData.price) {
      toast({
        title: "Datos incompletos",
        description: "Por favor, complete al menos la comunidad autónoma y el precio de la vivienda.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Realizar el cálculo
      const result = calculateExpenses(formData);
      onCalculationComplete(result);
      
      toast({
        title: "Cálculo completado",
        description: "El cálculo de gastos e impuestos se ha realizado correctamente."
      });
    } catch (error) {
      toast({
        title: "Error en el cálculo",
        description: "Ha ocurrido un error al realizar el cálculo. Revise los datos introducidos.",
        variant: "destructive"
      });
      console.error("Error en el cálculo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-6 bg-white rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium mb-4">Datos Básicos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="region">Comunidad Autónoma *</Label>
            <Select 
              value={formData.region}
              onValueChange={(value) => handleSelectChange("region", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione comunidad" />
              </SelectTrigger>
              <SelectContent>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="municipality">Municipio</Label>
            <Input
              id="municipality"
              name="municipality"
              value={formData.municipality}
              onChange={handleChange}
              placeholder="Ej: Madrid"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Precio de compraventa (€) *</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price || ""}
              onChange={handleChange}
              placeholder="Ej: 250000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="propertyType">Tipo de vivienda *</Label>
            <Select
              value={formData.propertyType}
              onValueChange={(value) => handleSelectChange("propertyType", value as 'new' | 'used')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Nueva (primera transmisión)</SelectItem>
                <SelectItem value="used">Segunda mano</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRegime">Régimen fiscal especial</Label>
            <Input
              id="specialRegime"
              name="specialRegime"
              value={formData.specialRegime}
              onChange={handleChange}
              placeholder="VPO, menor 35 años, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deedDate">Fecha prevista escritura</Label>
            <div className="relative">
              <Input
                id="deedDate"
                name="deedDate"
                type="date"
                value={formData.deedDate}
                onChange={handleChange}
                className="pl-10"
              />
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <Switch 
            id="hasLoan"
            checked={formData.hasLoan}
            onCheckedChange={(checked) => handleSwitchChange("hasLoan", checked)}
          />
          <Label htmlFor="hasLoan">¿Existe hipoteca?</Label>
        </div>

        {formData.hasLoan && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="loanAmount">Importe a financiar (€)</Label>
              <Input
                id="loanAmount"
                name="loanAmount"
                type="number"
                value={formData.loanAmount || ""}
                onChange={handleChange}
                placeholder="Ej: 200000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bank">Entidad bancaria</Label>
              <Input
                id="bank"
                name="bank"
                value={formData.bank}
                onChange={handleChange}
                placeholder="Ej: Banco Santander"
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Datos del vendedor */}
      <div className="p-6 bg-white rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium mb-4">Datos del Vendedor</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="acquisitionDate">Fecha de adquisición</Label>
            <div className="relative">
              <Input
                id="acquisitionDate"
                name="acquisitionDate"
                type="date"
                value={formData.acquisitionDate}
                onChange={handleChange}
                className="pl-10"
              />
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="acquisitionValue">Valor de adquisición (€)</Label>
            <Input
              id="acquisitionValue"
              name="acquisitionValue"
              type="number"
              value={formData.acquisitionValue || ""}
              onChange={handleChange}
              placeholder="Ej: 150000"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="improvements">Inversiones/mejoras (€)</Label>
            <Input
              id="improvements"
              name="improvements"
              type="number"
              value={formData.improvements || ""}
              onChange={handleChange}
              placeholder="Ej: 20000"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="yearsOfResidence">Años de residencia</Label>
            <Input
              id="yearsOfResidence"
              name="yearsOfResidence"
              type="number"
              value={formData.yearsOfResidence || ""}
              onChange={handleChange}
              placeholder="Ej: 5"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="remainingLoan">Hipoteca pendiente (€)</Label>
            <Input
              id="remainingLoan"
              name="remainingLoan"
              type="number"
              value={formData.remainingLoan || ""}
              onChange={handleChange}
              placeholder="Ej: 50000"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="municipalCapitalGainsTax">Plusvalía municipal (€)</Label>
            <Input
              id="municipalCapitalGainsTax"
              name="municipalCapitalGainsTax"
              type="number"
              value={formData.municipalCapitalGainsTax || ""}
              onChange={handleChange}
              placeholder="Ej: 2000"
            />
          </div>
        </div>
      </div>
      
      {/* Datos del comprador */}
      <div className="p-6 bg-white rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium mb-4">Datos del Comprador</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="financingPercentage">Porcentaje de financiación (%)</Label>
            <Input
              id="financingPercentage"
              name="financingPercentage"
              type="number"
              value={formData.financingPercentage || ""}
              onChange={handleChange}
              placeholder="Ej: 80"
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>
      
      <Button type="submit" className="w-full bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90">
        Calcular Gastos e Impuestos
      </Button>
      
      <p className="text-xs text-gray-500 mt-2">
        * Los campos marcados son obligatorios. Los resultados son estimativos y deben ser verificados con un profesional.
      </p>
    </form>
  );
}
