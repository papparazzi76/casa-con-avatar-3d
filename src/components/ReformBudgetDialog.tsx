
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Tipos de estancias para obra integral
const integralRooms = [
  { id: "salon", name: "Salón / comedor", area: 20 },
  { id: "dormitorio1", name: "Dormitorio principal", area: 12 },
  { id: "dormitorio2", name: "Dormitorio 2", area: 10 },
  { id: "dormitorio3", name: "Dormitorio 3", area: 8 },
  { id: "bano", name: "Baño completo", area: 5 },
  { id: "cocina", name: "Cocina", area: 8 },
  { id: "pasillo", name: "Pasillo", area: 6 },
  { id: "recibidor", name: "Recibidor / hall", area: 4 },
];

// Tipos de estancias adicionales
const additionalRoomTypes = [
  { id: "dormitorio", name: "Dormitorio extra" },
  { id: "bano_completo", name: "Baño completo extra" },
  { id: "aseo", name: "Aseo (sin ducha/bañera)" },
  { id: "terraza", name: "Terraza o balcón" },
  { id: "lavadero", name: "Lavadero / cuarto de lavado" },
  { id: "vestidor", name: "Vestidor" },
  { id: "despacho", name: "Despacho / estudio" },
  { id: "trastero", name: "Trastero" },
  { id: "garaje", name: "Garaje" },
  { id: "patio", name: "Patio interior" },
  { id: "otras", name: "Otras" },
];

// Tipos de partidas para obra parcial
const partialItems = [
  { id: "cocina", name: "Cocina" },
  { id: "banos", name: "Baño(s)" },
  { id: "salon", name: "Salón / comedor" },
  { id: "dormitorios", name: "Dormitorio(s)" },
  { id: "electricidad", name: "Instalación eléctrica" },
  { id: "fontaneria", name: "Fontanería" },
  { id: "carpinteria_interior", name: "Carpintería interior" },
  { id: "carpinteria_exterior", name: "Carpintería exterior (ventanas / balconeras)" },
  { id: "pintura", name: "Pintura general" },
  { id: "suelos", name: "Suelos / pavimentos" },
  { id: "climatizacion", name: "Climatización" },
  { id: "fachada", name: "Fachada / envolvente" },
  { id: "cubierta", name: "Cubierta / tejado" },
  { id: "otra", name: "Otra" },
];

// Tipos de obra
const workTypes = [
  { id: "demolicion", name: "Demolición" },
  { id: "obra_nueva", name: "Obra nueva" },
  { id: "sustitucion", name: "Sustitución" },
  { id: "actualizacion", name: "Actualización ligera" },
];

// Tipos de calidades
const qualityTypes = [
  { id: "economica", name: "Económica" },
  { id: "estandar", name: "Estándar" },
  { id: "alta", name: "Alta" },
  { id: "premium", name: "Premium" },
];

// Capítulos de obra
const chapters = [
  { id: "albanileria", name: "Albañilería" },
  { id: "electricidad", name: "Electricidad" },
  { id: "fontaneria", name: "Fontanería" },
  { id: "carpinteria", name: "Carpintería" },
  { id: "climatizacion", name: "Climatización" },
  { id: "pintura", name: "Pintura" },
  { id: "otros", name: "Otros" },
];

type Room = {
  id: string;
  name: string;
  area: number;
  workType: string;
  quality: string;
  chapters: {
    id: string;
    name: string;
    amount: number;
  }[];
  subtotal: number;
};

interface ReformBudgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId?: string;
}

export function ReformBudgetDialog({ open, onOpenChange, userId }: ReformBudgetDialogProps) {
  const [step, setStep] = useState<"type" | "rooms" | "summary">("type");
  const [reformType, setReformType] = useState<"integral" | "partial">("integral");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedPartialItems, setSelectedPartialItems] = useState<string[]>([]);
  const [additionalRoomType, setAdditionalRoomType] = useState("");
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomArea, setNewRoomArea] = useState(10);
  const [currentEditingRoom, setCurrentEditingRoom] = useState<Room | null>(null);
  const [imprevistosPercent, setImprevistosPercent] = useState(10);
  const [honorariosPercent, setHonorariosPercent] = useState(8);
  const [ivaPercent, setIvaPercent] = useState(21);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Inicializar rooms cuando cambia el tipo de reforma
  useEffect(() => {
    if (reformType === "integral") {
      // Pre-cargar las habitaciones básicas para obra integral
      const baseRooms = integralRooms.map((room) => ({
        id: room.id,
        name: room.name,
        area: room.area,
        workType: "obra_nueva",
        quality: "estandar",
        chapters: chapters.map((chapter) => ({
          id: chapter.id,
          name: chapter.name,
          amount: calculateBasePrice(room.area, "obra_nueva", "estandar", chapter.id),
        })),
        subtotal: 0,
      }));

      // Calcular subtotales iniciales
      baseRooms.forEach((room) => {
        room.subtotal = room.chapters.reduce((sum, chapter) => sum + chapter.amount, 0);
      });

      setRooms(baseRooms);
    } else {
      setRooms([]);
      setSelectedPartialItems([]);
    }
    
    setIsDirty(true);
  }, [reformType]);

  // Guardar en localStorage cuando cambie el estado
  useEffect(() => {
    if (isDirty) {
      const budgetData = {
        reformType,
        rooms,
        selectedPartialItems,
        imprevistosPercent,
        honorariosPercent,
        ivaPercent,
      };
      localStorage.setItem("reformBudgetData", JSON.stringify(budgetData));
    }
  }, [reformType, rooms, selectedPartialItems, imprevistosPercent, honorariosPercent, ivaPercent, isDirty]);

  // Cargar desde localStorage al abrir
  useEffect(() => {
    if (open) {
      try {
        const savedData = localStorage.getItem("reformBudgetData");
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setReformType(parsedData.reformType);
          setRooms(parsedData.rooms);
          setSelectedPartialItems(parsedData.selectedPartialItems);
          setImprevistosPercent(parsedData.imprevistosPercent);
          setHonorariosPercent(parsedData.honorariosPercent);
          setIvaPercent(parsedData.ivaPercent);
          setIsDirty(false);
        }
      } catch (error) {
        console.error("Error loading saved data", error);
      }
    } else {
      // Reset form when dialog is closed
      setStep("type");
    }
  }, [open]);

  // Función para calcular precio base por m2 según tipo de obra y calidad
  function calculateBasePrice(area: number, workType: string, quality: string, chapterId: string): number {
    // Precios base por m2 según calidad
    const baseQualityPrices: Record<string, number> = {
      economica: 450,
      estandar: 650,
      alta: 900,
      premium: 1200,
    };

    // Modificadores según tipo de obra
    const workTypeModifiers: Record<string, number> = {
      demolicion: 0.4,
      obra_nueva: 1.0,
      sustitucion: 0.7,
      actualizacion: 0.5,
    };

    // Distribución aproximada por capítulos
    const chapterDistribution: Record<string, number> = {
      albanileria: 0.35,
      electricidad: 0.15,
      fontaneria: 0.15,
      carpinteria: 0.15,
      climatizacion: 0.1,
      pintura: 0.05,
      otros: 0.05,
    };

    // Obtener precio base según calidad
    const basePrice = baseQualityPrices[quality] || baseQualityPrices.estandar;
    
    // Aplicar modificador de tipo de obra
    const modifiedPrice = basePrice * (workTypeModifiers[workType] || 1);
    
    // Aplicar distribución por capítulo
    const chapterPrice = modifiedPrice * (chapterDistribution[chapterId] || 0.05);
    
    // Multiplicar por área y redondear
    return Math.round(chapterPrice * area);
  }

  // Añadir habitación para obra integral
  const addRoom = () => {
    if (!additionalRoomType) return;

    let roomName = "";
    if (additionalRoomType === "otras") {
      roomName = newRoomName || "Espacio personalizado";
    } else {
      const roomType = additionalRoomTypes.find((r) => r.id === additionalRoomType);
      roomName = roomType ? roomType.name : "Nueva estancia";
    }

    const area = newRoomArea || 10;
    
    const newRoom: Room = {
      id: `${additionalRoomType}_${Date.now()}`,
      name: roomName,
      area: area,
      workType: "obra_nueva",
      quality: "estandar",
      chapters: chapters.map((chapter) => ({
        id: chapter.id,
        name: chapter.name,
        amount: calculateBasePrice(area, "obra_nueva", "estandar", chapter.id),
      })),
      subtotal: 0,
    };

    // Calcular subtotal
    newRoom.subtotal = newRoom.chapters.reduce((sum, chapter) => sum + chapter.amount, 0);

    setRooms([...rooms, newRoom]);
    setAdditionalRoomType("");
    setNewRoomName("");
    setNewRoomArea(10);
    setIsDirty(true);
  };

  // Añadir partida para obra parcial
  const addPartialItem = (itemId: string) => {
    const isSelected = selectedPartialItems.includes(itemId);
    
    if (isSelected) {
      // Quitar la partida y la habitación correspondiente
      setSelectedPartialItems(selectedPartialItems.filter(id => id !== itemId));
      setRooms(rooms.filter(room => room.id !== `partial_${itemId}`));
    } else {
      // Añadir la partida
      setSelectedPartialItems([...selectedPartialItems, itemId]);
      
      // Encontrar la información de la partida
      const item = partialItems.find(item => item.id === itemId);
      if (!item) return;
      
      // Crear una nueva habitación para esta partida
      const newRoom: Room = {
        id: `partial_${itemId}`,
        name: item.name,
        area: 10, // Valor por defecto
        workType: "sustitucion",
        quality: "estandar",
        chapters: chapters.map((chapter) => ({
          id: chapter.id,
          name: chapter.name,
          amount: calculateBasePrice(10, "sustitucion", "estandar", chapter.id),
        })),
        subtotal: 0,
      };
      
      // Calcular subtotal
      newRoom.subtotal = newRoom.chapters.reduce((sum, chapter) => sum + chapter.amount, 0);
      
      setRooms([...rooms, newRoom]);
    }
    
    setIsDirty(true);
  };

  // Editar habitación
  const editRoom = (room: Room) => {
    setCurrentEditingRoom(room);
  };

  // Guardar cambios de habitación
  const saveRoomChanges = (updatedRoom: Room) => {
    const updatedRooms = rooms.map(room => 
      room.id === updatedRoom.id ? updatedRoom : room
    );
    setRooms(updatedRooms);
    setCurrentEditingRoom(null);
    setIsDirty(true);
  };

  // Eliminar habitación
  const deleteRoom = (roomId: string) => {
    // Si es una habitación de obra parcial, actualizar también selectedPartialItems
    if (roomId.startsWith("partial_")) {
      const partialItemId = roomId.replace("partial_", "");
      setSelectedPartialItems(selectedPartialItems.filter(id => id !== partialItemId));
    }
    
    setRooms(rooms.filter(room => room.id !== roomId));
    setIsDirty(true);
  };

  // Calcular totales
  const calculateTotals = () => {
    const subtotal = rooms.reduce((sum, room) => sum + room.subtotal, 0);
    const imprevistos = (subtotal * imprevistosPercent) / 100;
    const honorarios = (subtotal * honorariosPercent) / 100;
    const baseImponible = subtotal + imprevistos + honorarios;
    const iva = (baseImponible * ivaPercent) / 100;
    const total = baseImponible + iva;
    
    return {
      subtotal,
      imprevistos,
      honorarios,
      baseImponible,
      iva,
      total
    };
  };

  // Guardar datos en Supabase
  const saveBudgetToSupabase = async () => {
    if (!userId) {
      toast.error("Debes iniciar sesión para guardar el presupuesto");
      return;
    }

    setIsSaving(true);

    try {
      const totals = calculateTotals();
      
      const budgetData = {
        user_id: userId,
        reform_type: reformType,
        total_amount: totals.total,
        data: {
          rooms,
          selectedPartialItems,
          imprevistosPercent,
          honorariosPercent,
          ivaPercent,
          totals
        }
      };
      
      const { error } = await supabase
        .from('reform_budgets')
        .insert([budgetData]);
        
      if (error) throw error;
      
      toast.success("Presupuesto guardado correctamente");
      setIsDirty(false);
    } catch (error: any) {
      console.error("Error saving budget", error);
      toast.error(`Error al guardar: ${error.message || "Inténtalo de nuevo más tarde"}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Exportar a PDF (simulado)
  const exportToPDF = () => {
    toast.success("Generando PDF... Esta función estará disponible próximamente.");
  };

  // Exportar a Excel (simulado)
  const exportToExcel = () => {
    toast.success("Generando Excel... Esta función estará disponible próximamente.");
  };

  const totals = calculateTotals();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Calculadora de Presupuestos de Reforma
          </DialogTitle>
          <DialogDescription>
            Calcula el coste aproximado de la reforma de tu vivienda paso a paso
          </DialogDescription>
        </DialogHeader>

        {step === "type" && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium">¿Qué tipo de reforma quieres realizar?</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant={reformType === "integral" ? "default" : "outline"}
                className={`h-24 ${reformType === "integral" ? "bg-gradient-to-r from-realestate-purple to-realestate-turquoise" : ""}`}
                onClick={() => setReformType("integral")}
              >
                <div className="text-center">
                  <div className="text-xl mb-1">Obra integral</div>
                  <div className="text-sm opacity-80">Reforma completa de la vivienda</div>
                </div>
              </Button>
              
              <Button
                variant={reformType === "partial" ? "default" : "outline"}
                className={`h-24 ${reformType === "partial" ? "bg-gradient-to-r from-realestate-purple to-realestate-turquoise" : ""}`}
                onClick={() => setReformType("partial")}
              >
                <div className="text-center">
                  <div className="text-xl mb-1">Obra parcial</div>
                  <div className="text-sm opacity-80">Reforma de elementos específicos</div>
                </div>
              </Button>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button onClick={() => onOpenChange(false)} variant="outline">
                Cancelar
              </Button>
              <Button 
                onClick={() => setStep("rooms")}
                className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise"
              >
                Continuar
              </Button>
            </div>
          </div>
        )}

        {step === "rooms" && (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium">
                {reformType === "integral" 
                  ? "Configura los espacios de tu reforma integral" 
                  : "Selecciona las partidas a reformar"}
              </h3>
            </div>
            
            {reformType === "integral" ? (
              <>
                <div className="space-y-2">
                  <h4 className="font-medium">Espacios básicos incluidos:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {rooms.map((room) => (
                      <Card key={room.id} className="overflow-hidden">
                        <CardContent className="p-3 flex justify-between items-center">
                          <div>
                            <div className="font-medium">{room.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {room.area} m² - {totals ? (room.subtotal).toLocaleString('es-ES')} €
                            </div>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => editRoom(room)}>
                            Editar
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Añadir otros espacios:</h4>
                  <div className="flex flex-col md:flex-row gap-2">
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={additionalRoomType}
                      onChange={(e) => setAdditionalRoomType(e.target.value)}
                    >
                      <option value="">Selecciona un tipo de estancia</option>
                      {additionalRoomTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>

                    {additionalRoomType === "otras" && (
                      <Input
                        placeholder="Nombre del espacio"
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                        className="md:w-1/3"
                      />
                    )}

                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        placeholder="m²"
                        value={newRoomArea}
                        onChange={(e) => setNewRoomArea(Number(e.target.value))}
                        className="w-24"
                      />
                      <span className="text-sm">m²</span>
                    </div>

                    <Button 
                      type="button"
                      disabled={!additionalRoomType}
                      onClick={addRoom}
                    >
                      Añadir
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {partialItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2 border rounded-md p-2">
                      <Checkbox 
                        id={item.id}
                        checked={selectedPartialItems.includes(item.id)}
                        onCheckedChange={() => addPartialItem(item.id)}
                      />
                      <Label htmlFor={item.id} className="flex-grow cursor-pointer">
                        {item.name}
                      </Label>
                      
                      {selectedPartialItems.includes(item.id) && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => {
                            const room = rooms.find(r => r.id === `partial_${item.id}`);
                            if (room) editRoom(room);
                          }}
                        >
                          Detalles
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentEditingRoom && (
              <Dialog open={!!currentEditingRoom} onOpenChange={(open) => !open && setCurrentEditingRoom(null)}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Editar {currentEditingRoom.name}</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="room-name">Nombre</Label>
                      <Input
                        id="room-name"
                        value={currentEditingRoom.name}
                        onChange={(e) => setCurrentEditingRoom({...currentEditingRoom, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="room-area">Superficie (m²)</Label>
                      <Input
                        id="room-area"
                        type="number"
                        min="1"
                        value={currentEditingRoom.area}
                        onChange={(e) => {
                          const newArea = Number(e.target.value);
                          if (newArea > 0) {
                            // Actualizar area y recalcular importes
                            const updatedRoom = {...currentEditingRoom, area: newArea};
                            updatedRoom.chapters = updatedRoom.chapters.map(chapter => ({
                              ...chapter,
                              amount: calculateBasePrice(newArea, updatedRoom.workType, updatedRoom.quality, chapter.id)
                            }));
                            updatedRoom.subtotal = updatedRoom.chapters.reduce((sum, ch) => sum + ch.amount, 0);
                            setCurrentEditingRoom(updatedRoom);
                          }
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Tipo de obra</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {workTypes.map((type) => (
                          <Button
                            key={type.id}
                            type="button"
                            variant={currentEditingRoom.workType === type.id ? "default" : "outline"}
                            className={`h-auto py-2 ${
                              currentEditingRoom.workType === type.id 
                              ? "bg-gradient-to-r from-realestate-purple to-realestate-turquoise" 
                              : ""
                            }`}
                            onClick={() => {
                              // Actualizar tipo de obra y recalcular importes
                              const updatedRoom = {...currentEditingRoom, workType: type.id};
                              updatedRoom.chapters = updatedRoom.chapters.map(chapter => ({
                                ...chapter,
                                amount: calculateBasePrice(updatedRoom.area, type.id, updatedRoom.quality, chapter.id)
                              }));
                              updatedRoom.subtotal = updatedRoom.chapters.reduce((sum, ch) => sum + ch.amount, 0);
                              setCurrentEditingRoom(updatedRoom);
                            }}
                          >
                            {type.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Calidad de acabados</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {qualityTypes.map((type) => (
                          <Button
                            key={type.id}
                            type="button"
                            variant={currentEditingRoom.quality === type.id ? "default" : "outline"}
                            className={`h-auto py-2 ${
                              currentEditingRoom.quality === type.id 
                              ? "bg-gradient-to-r from-realestate-purple to-realestate-turquoise" 
                              : ""
                            }`}
                            onClick={() => {
                              // Actualizar calidad y recalcular importes
                              const updatedRoom = {...currentEditingRoom, quality: type.id};
                              updatedRoom.chapters = updatedRoom.chapters.map(chapter => ({
                                ...chapter,
                                amount: calculateBasePrice(updatedRoom.area, updatedRoom.workType, type.id, chapter.id)
                              }));
                              updatedRoom.subtotal = updatedRoom.chapters.reduce((sum, ch) => sum + ch.amount, 0);
                              setCurrentEditingRoom(updatedRoom);
                            }}
                          >
                            {type.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Desglose por capítulos</Label>
                      <div className="border rounded-md divide-y">
                        {currentEditingRoom.chapters.map((chapter) => (
                          <div key={chapter.id} className="flex justify-between items-center p-2">
                            <span>{chapter.name}</span>
                            <div className="flex items-center">
                              <Input
                                type="number"
                                min="0"
                                value={chapter.amount}
                                onChange={(e) => {
                                  const newAmount = Number(e.target.value);
                                  if (newAmount >= 0) {
                                    // Actualizar importe del capítulo
                                    const updatedChapters = currentEditingRoom.chapters.map(ch => 
                                      ch.id === chapter.id ? {...ch, amount: newAmount} : ch
                                    );
                                    
                                    // Recalcular subtotal
                                    const newSubtotal = updatedChapters.reduce((sum, ch) => sum + ch.amount, 0);
                                    
                                    setCurrentEditingRoom({
                                      ...currentEditingRoom, 
                                      chapters: updatedChapters,
                                      subtotal: newSubtotal
                                    });
                                  }
                                }}
                                className="w-24 text-right"
                              />
                              <span className="ml-2">€</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between font-medium border-t pt-2">
                        <span>Total estancia</span>
                        <span>
                          {currentEditingRoom.chapters.reduce((sum, ch) => sum + ch.amount, 0).toLocaleString('es-ES')} €
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      variant="destructive" 
                      onClick={() => {
                        deleteRoom(currentEditingRoom.id);
                        setCurrentEditingRoom(null);
                      }}
                    >
                      Eliminar
                    </Button>
                    <div className="space-x-2">
                      <Button variant="outline" onClick={() => setCurrentEditingRoom(null)}>
                        Cancelar
                      </Button>
                      <Button 
                        onClick={() => saveRoomChanges(currentEditingRoom)}
                        className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise"
                      >
                        Guardar cambios
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            
            <div className="flex justify-between pt-4 border-t">
              <Button onClick={() => setStep("type")} variant="outline">
                Anterior
              </Button>
              <Button 
                onClick={() => setStep("summary")}
                className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise"
                disabled={rooms.length === 0}
              >
                Ver resumen
              </Button>
            </div>
          </div>
        )}

        {step === "summary" && (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium">Resumen del presupuesto</h3>
            </div>
            
            <div className="border rounded-md p-4 space-y-4">
              <div>
                <h4 className="font-medium mb-2">Desglose por estancias</h4>
                <div className="divide-y border rounded-md">
                  {rooms.map((room) => (
                    <div key={room.id} className="flex justify-between items-center p-3">
                      <div>
                        <div>{room.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {room.area} m² - {workTypes.find(t => t.id === room.workType)?.name} - {qualityTypes.find(q => q.id === room.quality)?.name}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-medium">
                          {room.subtotal.toLocaleString('es-ES')} €
                        </span>
                        <Button size="sm" variant="ghost" onClick={() => editRoom(room)}>
                          Editar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3 pt-2">
                <h4 className="font-medium">Costes adicionales</h4>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="imprevistos">Imprevistos</Label>
                    <div className="flex items-center">
                      <Input
                        id="imprevistos"
                        type="number"
                        min="0"
                        max="100"
                        value={imprevistosPercent}
                        onChange={(e) => setImprevistosPercent(Number(e.target.value))}
                        className="w-16 text-right"
                      />
                      <span className="ml-1">%</span>
                    </div>
                  </div>
                  <span>{totals.imprevistos.toLocaleString('es-ES')} €</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="honorarios">Honorarios profesionales</Label>
                    <div className="flex items-center">
                      <Input
                        id="honorarios"
                        type="number"
                        min="0"
                        max="100"
                        value={honorariosPercent}
                        onChange={(e) => setHonorariosPercent(Number(e.target.value))}
                        className="w-16 text-right"
                      />
                      <span className="ml-1">%</span>
                    </div>
                  </div>
                  <span>{totals.honorarios.toLocaleString('es-ES')} €</span>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="font-medium">Base imponible</div>
                  <div className="font-medium">{totals.baseImponible.toLocaleString('es-ES')} €</div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="iva">IVA</Label>
                    <div className="flex items-center">
                      <Input
                        id="iva"
                        type="number"
                        min="0"
                        max="100"
                        value={ivaPercent}
                        onChange={(e) => setIvaPercent(Number(e.target.value))}
                        className="w-16 text-right"
                      />
                      <span className="ml-1">%</span>
                    </div>
                  </div>
                  <span>{totals.iva.toLocaleString('es-ES')} €</span>
                </div>
              </div>
              
              <div className="pt-4 border-t flex justify-between items-center">
                <div className="text-xl font-bold">TOTAL</div>
                <div className="text-xl font-bold">{totals.total.toLocaleString('es-ES')} €</div>
              </div>
            </div>
            
            <div className="flex justify-between pt-4 gap-2">
              <div className="flex space-x-2">
                <Button onClick={() => setStep("rooms")} variant="outline">
                  Anterior
                </Button>
                <Button onClick={() => onOpenChange(false)} variant="outline">
                  Cerrar
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={saveBudgetToSupabase} 
                  disabled={isSaving || !userId}
                  className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise"
                >
                  {isSaving ? "Guardando..." : "Guardar presupuesto"}
                </Button>
                <div className="dropdown">
                  <Button variant="outline">
                    Exportar
                  </Button>
                  <div className="dropdown-content">
                    <Button variant="ghost" onClick={exportToPDF} className="w-full justify-start">
                      Exportar a PDF
                    </Button>
                    <Button variant="ghost" onClick={exportToExcel} className="w-full justify-start">
                      Exportar a Excel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
