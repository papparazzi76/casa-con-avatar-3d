
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Import refactored components
import { TypeSelectionStep } from "./reform-budget/TypeSelectionStep";
import { RoomsConfigurationStep } from "./reform-budget/RoomsConfigurationStep";
import { SummaryStep } from "./reform-budget/SummaryStep";
import { RoomEditDialog } from "./reform-budget/RoomEditDialog";

// Import types and utilities
import { 
  Room, 
  ReformType, 
  integralRooms, 
  partialItems,
  chapters
} from "./reform-budget/types";
import { calculateBasePrice, createNewRoom } from "./reform-budget/utils";

interface ReformBudgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId?: string;
}

export function ReformBudgetDialog({ open, onOpenChange, userId }: ReformBudgetDialogProps) {
  const [step, setStep] = useState<"type" | "rooms" | "summary">("type");
  const [reformType, setReformType] = useState<ReformType>("integral");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedPartialItems, setSelectedPartialItems] = useState<string[]>([]);
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
      const baseRooms = integralRooms.map((room) => createNewRoom(
        room.id,
        room.name,
        room.area,
        "obra_nueva",
        "estandar"
      ));

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

  // Añadir habitación para obra integral
  const addRoom = (roomName: string, area: number, roomType: string) => {
    const newRoom = createNewRoom(
      `${roomType}_${Date.now()}`,
      roomName,
      area
    );

    setRooms([...rooms, newRoom]);
    setIsDirty(true);
  };

  // Añadir partida para obra parcial
  const handlePartialItemToggle = (itemId: string) => {
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
      const newRoom = createNewRoom(
        `partial_${itemId}`,
        item.name,
        10,
        "sustitucion",
        "estandar"
      );
      
      setRooms([...rooms, newRoom]);
    }
    
    setIsDirty(true);
  };

  // Guardar datos en Supabase
  const saveBudgetToSupabase = async () => {
    if (!userId) {
      toast.error("Debes iniciar sesión para guardar el presupuesto");
      return;
    }

    setIsSaving(true);

    try {
      const totals = calculateTotals(rooms, imprevistosPercent, honorariosPercent, ivaPercent);
      
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
          <TypeSelectionStep 
            reformType={reformType} 
            setReformType={setReformType} 
            onNext={() => setStep("rooms")} 
            onCancel={() => onOpenChange(false)} 
          />
        )}

        {step === "rooms" && (
          <RoomsConfigurationStep
            reformType={reformType}
            rooms={rooms}
            selectedPartialItems={selectedPartialItems}
            onRoomsChange={setRooms}
            onSelectedPartialItemsChange={setSelectedPartialItems}
            onPrevious={() => setStep("type")}
            onNext={() => setStep("summary")}
          />
        )}

        {step === "summary" && (
          <SummaryStep
            rooms={rooms}
            imprevistosPercent={imprevistosPercent}
            honorariosPercent={honorariosPercent}
            ivaPercent={ivaPercent}
            onImprevistosPercentChange={setImprevistosPercent}
            onHonorariosPercentChange={setHonorariosPercent}
            onIvaPercentChange={setIvaPercent}
            onEditRoom={setCurrentEditingRoom}
            onPrevious={() => setStep("rooms")}
            onClose={() => onOpenChange(false)}
            onSave={saveBudgetToSupabase}
            userId={userId}
            isSaving={isSaving}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
