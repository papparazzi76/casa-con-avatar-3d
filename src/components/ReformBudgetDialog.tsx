
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { FilePenLine, FileSpreadsheet, FileText, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Tipos para los datos del presupuesto
interface Room {
  id: string;
  name: string;
  area: number;
  workType: "demolición" | "obra nueva" | "sustitución" | "actualización ligera";
  quality: "económica" | "estándar" | "alta" | "premium";
  chapters: {
    albañilería: number;
    electricidad: number;
    fontanería: number;
    carpintería: number;
    climatización: number;
    pintura: number;
    otros: number;
  };
}

interface BudgetState {
  reformType: "integral" | "parcial" | null;
  rooms: Room[];
  partialSelections: string[];
  contingency: number;
  fees: number;
  vat: number;
}

// Opciones predefinidas
const STANDARD_ROOMS = [
  "Salón / comedor", 
  "Dormitorio 1", 
  "Dormitorio 2", 
  "Dormitorio 3", 
  "Baño completo", 
  "Cocina", 
  "Pasillo", 
  "Recibidor / hall"
];

const EXTRA_ROOM_OPTIONS = [
  "Dormitorio extra",
  "Baño completo extra",
  "Aseo (sin ducha/bañera)",
  "Terraza o balcón",
  "Lavadero / cuarto de lavado",
  "Vestidor",
  "Despacho / estudio",
  "Trastero",
  "Garaje",
  "Patio interior",
  "Otras"
];

const PARTIAL_REFORM_OPTIONS = [
  "Cocina",
  "Baño(s)",
  "Salón / comedor",
  "Dormitorio(s)",
  "Instalación eléctrica",
  "Fontanería",
  "Carpintería interior",
  "Carpintería exterior (ventanas / balconeras)",
  "Pintura general",
  "Suelos / pavimentos",
  "Climatización",
  "Fachada / envolvente",
  "Cubierta / tejado",
  "Otra"
];

export function ReformBudgetDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { toast } = useToast();
  const [step, setStep] = useState<number>(1);
  const [budget, setBudget] = useState<BudgetState>({
    reformType: null,
    rooms: [],
    partialSelections: [],
    contingency: 5,
    fees: 10,
    vat: 21
  });
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [extraRoomType, setExtraRoomType] = useState<string>("");
  const [extraRoomName, setExtraRoomName] = useState<string>("");
  const [otherPartialSelection, setOtherPartialSelection] = useState<string>("");

  // Guardar el estado en localStorage cuando cambia
  useEffect(() => {
    if (budget.reformType) {
      localStorage.setItem("reformBudget", JSON.stringify(budget));
    }
  }, [budget]);

  // Cargar el estado desde localStorage al inicio
  useEffect(() => {
    const savedBudget = localStorage.getItem("reformBudget");
    if (savedBudget) {
      try {
        setBudget(JSON.parse(savedBudget));
        if (JSON.parse(savedBudget).rooms.length > 0) {
          setStep(3); // Ir directamente al resumen si hay datos
        }
      } catch (e) {
        console.error("Error parsing saved budget:", e);
      }
    }
  }, []);

  // Generar habitaciones estándar para obra integral
  const generateStandardRooms = () => {
    const standardRooms: Room[] = STANDARD_ROOMS.map((name) => ({
      id: `room-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name,
      area: 0,
      workType: "sustitución",
      quality: "estándar",
      chapters: {
        albañilería: 0,
        electricidad: 0,
        fontanería: 0,
        carpintería: 0,
        climatización: 0,
        pintura: 0,
        otros: 0
      }
    }));
    
    setBudget(prev => ({
      ...prev,
      rooms: standardRooms
    }));
    setStep(2);
  };

  // Manejar la selección del tipo de reforma
  const handleReformTypeSelect = (type: "integral" | "parcial") => {
    setBudget(prev => ({
      ...prev,
      reformType: type
    }));
    
    if (type === "integral") {
      generateStandardRooms();
    } else {
      setStep(2);
    }
  };

  // Añadir una habitación extra
  const handleAddExtraRoom = () => {
    if (!extraRoomType) {
      toast({
        title: "Error",
        description: "Debes seleccionar un tipo de estancia",
        variant: "destructive",
      });
      return;
    }

    const name = extraRoomType === "Otras" ? extraRoomName : extraRoomType;
    
    if (extraRoomType === "Otras" && !extraRoomName.trim()) {
      toast({
        title: "Error",
        description: "Debes especificar un nombre para la estancia",
        variant: "destructive",
      });
      return;
    }

    const newRoom: Room = {
      id: `room-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name,
      area: 0,
      workType: "sustitución",
      quality: "estándar",
      chapters: {
        albañilería: 0,
        electricidad: 0,
        fontanería: 0,
        carpintería: 0,
        climatización: 0,
        pintura: 0,
        otros: 0
      }
    };

    setBudget(prev => ({
      ...prev,
      rooms: [...prev.rooms, newRoom]
    }));

    setExtraRoomType("");
    setExtraRoomName("");

    toast({
      title: "Estancia añadida",
      description: `Se ha añadido ${name} a la lista de estancias`,
    });
  };

  // Manejar las selecciones para reforma parcial
  const handlePartialSelectionChange = (checked: boolean, option: string) => {
    setBudget(prev => {
      if (checked) {
        return {
          ...prev,
          partialSelections: [...prev.partialSelections, option]
        };
      } else {
        return {
          ...prev,
          partialSelections: prev.partialSelections.filter(item => item !== option)
        };
      }
    });
  };

  // Añadir una selección personalizada para reforma parcial
  const handleAddOtherPartialSelection = () => {
    if (!otherPartialSelection.trim()) {
      toast({
        title: "Error",
        description: "Debes especificar un nombre para la partida",
        variant: "destructive",
      });
      return;
    }

    setBudget(prev => ({
      ...prev,
      partialSelections: [...prev.partialSelections, `Otra: ${otherPartialSelection}`]
    }));

    setOtherPartialSelection("");

    toast({
      title: "Partida añadida",
      description: `Se ha añadido ${otherPartialSelection} a la lista de partidas`,
    });
  };

  // Continuar al siguiente paso después de seleccionar las partidas para reforma parcial
  const handlePartialSelectionsComplete = () => {
    if (budget.partialSelections.length === 0) {
      toast({
        title: "Error",
        description: "Debes seleccionar al menos una partida",
        variant: "destructive",
      });
      return;
    }

    // Convertir las selecciones parciales en habitaciones para mantener un formato uniforme
    const partialRooms: Room[] = budget.partialSelections.map(selection => ({
      id: `room-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: selection,
      area: 0,
      workType: "sustitución",
      quality: "estándar",
      chapters: {
        albañilería: 0,
        electricidad: 0,
        fontanería: 0,
        carpintería: 0,
        climatización: 0,
        pintura: 0,
        otros: 0
      }
    }));

    setBudget(prev => ({
      ...prev,
      rooms: partialRooms
    }));

    setStep(3);
  };

  // Editar una habitación
  const handleEditRoom = (room: Room) => {
    setCurrentRoom(room);
    setStep(4);
  };

  // Eliminar una habitación
  const handleDeleteRoom = (roomId: string) => {
    setBudget(prev => ({
      ...prev,
      rooms: prev.rooms.filter(room => room.id !== roomId)
    }));

    toast({
      title: "Estancia eliminada",
      description: "Se ha eliminado la estancia del presupuesto",
    });
  };

  // Guardar los cambios en una habitación
  const handleSaveRoom = () => {
    if (!currentRoom) return;

    if (currentRoom.area <= 0) {
      toast({
        title: "Error",
        description: "La superficie debe ser un número positivo",
        variant: "destructive",
      });
      return;
    }

    setBudget(prev => ({
      ...prev,
      rooms: prev.rooms.map(room => 
        room.id === currentRoom.id ? currentRoom : room
      )
    }));

    setCurrentRoom(null);
    setStep(3);

    toast({
      title: "Cambios guardados",
      description: "Se han guardado los cambios en la estancia",
    });
  };

  // Actualizar un campo de la habitación actual
  const updateRoomField = (field: keyof Room, value: any) => {
    if (!currentRoom) return;

    setCurrentRoom({
      ...currentRoom,
      [field]: value
    });
  };

  // Actualizar un capítulo de la habitación actual
  const updateRoomChapter = (chapter: keyof Room["chapters"], value: number) => {
    if (!currentRoom) return;

    setCurrentRoom({
      ...currentRoom,
      chapters: {
        ...currentRoom.chapters,
        [chapter]: value
      }
    });
  };

  // Calcular subtotal para una habitación
  const calculateRoomSubtotal = (room: Room): number => {
    return Object.values(room.chapters).reduce((sum, value) => sum + value, 0);
  };

  // Calcular el total base (suma de subtotales)
  const calculateBaseTotal = (): number => {
    return budget.rooms.reduce((sum, room) => sum + calculateRoomSubtotal(room), 0);
  };

  // Calcular el total con contingencia y honorarios
  const calculateTotalWithExtras = (): number => {
    const baseTotal = calculateBaseTotal();
    const contingencyAmount = (baseTotal * budget.contingency) / 100;
    const feesAmount = (baseTotal * budget.fees) / 100;
    return baseTotal + contingencyAmount + feesAmount;
  };

  // Calcular el total con IVA
  const calculateFinalTotal = (): number => {
    const totalWithExtras = calculateTotalWithExtras();
    const vatAmount = (totalWithExtras * budget.vat) / 100;
    return totalWithExtras + vatAmount;
  };

  // Exportar a PDF (simulación)
  const handleExportPDF = () => {
    toast({
      title: "Exportando a PDF",
      description: "Tu presupuesto se está exportando a PDF",
    });
  };

  // Exportar a Excel (simulación)
  const handleExportExcel = () => {
    toast({
      title: "Exportando a Excel",
      description: "Tu presupuesto se está exportando a Excel",
    });
  };

  // Limpiar el presupuesto y empezar de nuevo
  const handleReset = () => {
    localStorage.removeItem("reformBudget");
    setBudget({
      reformType: null,
      rooms: [],
      partialSelections: [],
      contingency: 5,
      fees: 10,
      vat: 21
    });
    setStep(1);
    
    toast({
      title: "Presupuesto reiniciado",
      description: "Se ha reiniciado el presupuesto desde cero",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <span className="text-3xl">📋</span> Calculadora de Presupuestos de Reforma
          </DialogTitle>
          <DialogDescription>
            Calcula el coste aproximado de la reforma de tu vivienda
          </DialogDescription>
        </DialogHeader>

        {/* Paso 1: Selección del tipo de reforma */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Tipo de reforma</h3>
            <RadioGroup 
              defaultValue={budget.reformType || undefined}
              onValueChange={(value) => handleReformTypeSelect(value as "integral" | "parcial")}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="integral" id="integral" />
                <Label htmlFor="integral" className="font-medium">
                  Obra integral
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="parcial" id="parcial" />
                <Label htmlFor="parcial" className="font-medium">
                  Obra parcial
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Paso 2: Configuración según el tipo de reforma */}
        {step === 2 && budget.reformType === "integral" && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Estancias</h3>
            <div className="space-y-2">
              {budget.rooms.map((room) => (
                <div key={room.id} className="flex items-center justify-between border p-2 rounded-md">
                  <span>{room.name}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Añadir estancia adicional</h4>
              <div className="flex flex-col md:flex-row gap-2">
                <Select
                  value={extraRoomType}
                  onValueChange={setExtraRoomType}
                >
                  <SelectTrigger className="w-full md:w-[300px]">
                    <SelectValue placeholder="Selecciona tipo de estancia" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXTRA_ROOM_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {extraRoomType === "Otras" && (
                  <Input 
                    placeholder="Nombre de la estancia"
                    value={extraRoomName}
                    onChange={(e) => setExtraRoomName(e.target.value)}
                    className="flex-1"
                  />
                )}
                
                <Button onClick={handleAddExtraRoom} className="shrink-0">
                  <Plus className="h-4 w-4 mr-1" /> Añadir
                </Button>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button onClick={() => setStep(3)}>
                Continuar
              </Button>
            </div>
          </div>
        )}

        {step === 2 && budget.reformType === "parcial" && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Selecciona las partes a reformar</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {PARTIAL_REFORM_OPTIONS.filter(option => option !== "Otra").map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`option-${option}`} 
                    checked={budget.partialSelections.includes(option)}
                    onCheckedChange={(checked: boolean) => 
                      handlePartialSelectionChange(checked, option)
                    }
                  />
                  <Label htmlFor={`option-${option}`}>{option}</Label>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Añadir otra partida</h4>
              <div className="flex flex-col md:flex-row gap-2">
                <Input
                  placeholder="Especifica otra partida"
                  value={otherPartialSelection}
                  onChange={(e) => setOtherPartialSelection(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddOtherPartialSelection} className="shrink-0">
                  <Plus className="h-4 w-4 mr-1" /> Añadir
                </Button>
              </div>
            </div>

            {budget.partialSelections.filter(item => item.startsWith("Otra:")).length > 0 && (
              <div className="border p-3 rounded-md bg-muted/30">
                <h4 className="font-medium mb-2">Partidas personalizadas añadidas:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {budget.partialSelections
                    .filter(item => item.startsWith("Otra:"))
                    .map((item, index) => (
                      <li key={index}>{item.replace("Otra: ", "")}</li>
                    ))
                  }
                </ul>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <Button onClick={handlePartialSelectionsComplete}>
                Continuar
              </Button>
            </div>
          </div>
        )}

        {/* Paso 3: Resumen y tabla */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Resumen del presupuesto</h3>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleReset}>
                  Reiniciar
                </Button>
                <Button variant="outline" onClick={handleExportExcel}>
                  <FileSpreadsheet className="h-4 w-4 mr-1" /> Excel
                </Button>
                <Button variant="outline" onClick={handleExportPDF}>
                  <FileText className="h-4 w-4 mr-1" /> PDF
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estancia/Partida</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                      <TableHead className="w-[100px]">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {budget.rooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell>{room.name}</TableCell>
                        <TableCell className="text-right">
                          {calculateRoomSubtotal(room).toLocaleString('es-ES')} €
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleEditRoom(room)}
                            >
                              <FilePenLine className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteRoom(room.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contingency">% Imprevistos</Label>
                <div className="flex items-center">
                  <Input
                    id="contingency"
                    type="number"
                    min="0"
                    max="100"
                    value={budget.contingency}
                    onChange={(e) => setBudget(prev => ({
                      ...prev,
                      contingency: Number(e.target.value)
                    }))}
                    className="w-24"
                  />
                  <span className="ml-2">%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fees">% Honorarios</Label>
                <div className="flex items-center">
                  <Input
                    id="fees"
                    type="number"
                    min="0"
                    max="100"
                    value={budget.fees}
                    onChange={(e) => setBudget(prev => ({
                      ...prev,
                      fees: Number(e.target.value)
                    }))}
                    className="w-24"
                  />
                  <span className="ml-2">%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vat">% IVA</Label>
                <div className="flex items-center">
                  <Input
                    id="vat"
                    type="number"
                    min="0"
                    max="100"
                    value={budget.vat}
                    onChange={(e) => setBudget(prev => ({
                      ...prev,
                      vat: Number(e.target.value)
                    }))}
                    className="w-24"
                  />
                  <span className="ml-2">%</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-md space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Subtotal base:</span>
                <span>{calculateBaseTotal().toLocaleString('es-ES')} €</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Imprevistos ({budget.contingency}%):</span>
                <span>{((calculateBaseTotal() * budget.contingency) / 100).toLocaleString('es-ES')} €</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Honorarios ({budget.fees}%):</span>
                <span>{((calculateBaseTotal() * budget.fees) / 100).toLocaleString('es-ES')} €</span>
              </div>
              <div className="flex justify-between border-t border-gray-300 pt-2">
                <span className="font-medium">Total sin IVA:</span>
                <span>{calculateTotalWithExtras().toLocaleString('es-ES')} €</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">IVA ({budget.vat}%):</span>
                <span>{((calculateTotalWithExtras() * budget.vat) / 100).toLocaleString('es-ES')} €</span>
              </div>
              <div className="flex justify-between border-t border-gray-300 pt-2">
                <span className="font-medium text-lg">TOTAL:</span>
                <span className="font-bold text-lg">{calculateFinalTotal().toLocaleString('es-ES')} €</span>
              </div>
            </div>
          </div>
        )}

        {/* Paso 4: Editar estancia/partida */}
        {step === 4 && currentRoom && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Editar {currentRoom.name}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="room-name">Nombre</Label>
                <Input
                  id="room-name"
                  value={currentRoom.name}
                  onChange={(e) => updateRoomField("name", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="room-area">Superficie útil (m²)</Label>
                <Input
                  id="room-area"
                  type="number"
                  min="0"
                  value={currentRoom.area}
                  onChange={(e) => updateRoomField("area", Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="room-work-type">Tipo de obra</Label>
                <Select
                  value={currentRoom.workType}
                  onValueChange={(value) => updateRoomField("workType", value)}
                >
                  <SelectTrigger id="room-work-type">
                    <SelectValue placeholder="Selecciona tipo de obra" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="demolición">Demolición</SelectItem>
                    <SelectItem value="obra nueva">Obra nueva</SelectItem>
                    <SelectItem value="sustitución">Sustitución</SelectItem>
                    <SelectItem value="actualización ligera">Actualización ligera</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="room-quality">Calidades</Label>
                <Select
                  value={currentRoom.quality}
                  onValueChange={(value) => updateRoomField("quality", value)}
                >
                  <SelectTrigger id="room-quality">
                    <SelectValue placeholder="Selecciona calidades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="económica">Económica</SelectItem>
                    <SelectItem value="estándar">Estándar</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <h4 className="font-medium mt-4">Desglose por capítulos</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="chapter-albañilería">Albañilería (€)</Label>
                <Input
                  id="chapter-albañilería"
                  type="number"
                  min="0"
                  value={currentRoom.chapters.albañilería}
                  onChange={(e) => updateRoomChapter("albañilería", Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="chapter-electricidad">Electricidad (€)</Label>
                <Input
                  id="chapter-electricidad"
                  type="number"
                  min="0"
                  value={currentRoom.chapters.electricidad}
                  onChange={(e) => updateRoomChapter("electricidad", Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="chapter-fontanería">Fontanería (€)</Label>
                <Input
                  id="chapter-fontanería"
                  type="number"
                  min="0"
                  value={currentRoom.chapters.fontanería}
                  onChange={(e) => updateRoomChapter("fontanería", Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="chapter-carpintería">Carpintería (€)</Label>
                <Input
                  id="chapter-carpintería"
                  type="number"
                  min="0"
                  value={currentRoom.chapters.carpintería}
                  onChange={(e) => updateRoomChapter("carpintería", Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="chapter-climatización">Climatización (€)</Label>
                <Input
                  id="chapter-climatización"
                  type="number"
                  min="0"
                  value={currentRoom.chapters.climatización}
                  onChange={(e) => updateRoomChapter("climatización", Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="chapter-pintura">Pintura (€)</Label>
                <Input
                  id="chapter-pintura"
                  type="number"
                  min="0"
                  value={currentRoom.chapters.pintura}
                  onChange={(e) => updateRoomChapter("pintura", Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="chapter-otros">Otros (€)</Label>
                <Input
                  id="chapter-otros"
                  type="number"
                  min="0"
                  value={currentRoom.chapters.otros}
                  onChange={(e) => updateRoomChapter("otros", Number(e.target.value))}
                />
              </div>
              
              <div className="flex items-end">
                <div className="bg-muted/30 p-3 rounded-md w-full">
                  <span className="block text-sm">Subtotal estancia:</span>
                  <span className="text-lg font-bold">
                    {calculateRoomSubtotal(currentRoom).toLocaleString('es-ES')} €
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => {
                setCurrentRoom(null);
                setStep(3);
              }}>
                Cancelar
              </Button>
              <Button onClick={handleSaveRoom}>
                Guardar cambios
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
