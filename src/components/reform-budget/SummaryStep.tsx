
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Room, workTypes, qualityTypes, ReformBudgetTotals } from "./types";
import { calculateTotals } from "./utils";
import { motion } from "framer-motion";

interface SummaryStepProps {
  rooms: Room[];
  imprevistosPercent: number;
  honorariosPercent: number;
  ivaPercent: number;
  onImprevistosPercentChange: (value: number) => void;
  onHonorariosPercentChange: (value: number) => void;
  onIvaPercentChange: (value: number) => void;
  onEditRoom: (room: Room) => void;
  onPrevious: () => void;
  onClose: () => void;
  onSave: () => void;
  userId?: string;
  isSaving: boolean;
}

export function SummaryStep({
  rooms,
  imprevistosPercent,
  honorariosPercent,
  ivaPercent,
  onImprevistosPercentChange,
  onHonorariosPercentChange,
  onIvaPercentChange,
  onEditRoom,
  onPrevious,
  onClose,
  onSave,
  userId,
  isSaving
}: SummaryStepProps) {
  const totals = calculateTotals(rooms, imprevistosPercent, honorariosPercent, ivaPercent);
  
  // Exportar a PDF (simulado)
  const exportToPDF = () => {
    // This functionality would be implemented later
    // Mock implementation for now
    alert("Esta función estará disponible próximamente.");
  };

  // Exportar a Excel (simulado)
  const exportToExcel = () => {
    // This functionality would be implemented later
    // Mock implementation for now
    alert("Esta función estará disponible próximamente.");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="text-center mb-4"
        variants={itemVariants}
      >
        <h3 className="text-lg font-medium">Resumen del presupuesto</h3>
      </motion.div>
      
      <motion.div 
        className="border rounded-md p-4 space-y-4"
        variants={itemVariants}
      >
        <div>
          <h4 className="font-medium mb-2">Desglose por estancias</h4>
          <div className="divide-y border rounded-md">
            {rooms.map((room, index) => (
              <motion.div 
                key={room.id} 
                className="flex justify-between items-center p-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
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
                  <Button size="sm" variant="ghost" onClick={() => onEditRoom(room)}>
                    Editar
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="space-y-3 pt-2"
          variants={itemVariants}
        >
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
                  onChange={(e) => onImprevistosPercentChange(Number(e.target.value))}
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
                  onChange={(e) => onHonorariosPercentChange(Number(e.target.value))}
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
                  onChange={(e) => onIvaPercentChange(Number(e.target.value))}
                  className="w-16 text-right"
                />
                <span className="ml-1">%</span>
              </div>
            </div>
            <span>{totals.iva.toLocaleString('es-ES')} €</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="pt-4 border-t flex justify-between items-center"
          variants={itemVariants}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-xl font-bold">TOTAL</div>
          <div className="text-xl font-bold">{totals.total.toLocaleString('es-ES')} €</div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="flex justify-between pt-4 gap-2"
        variants={itemVariants}
      >
        <div className="flex space-x-2">
          <Button onClick={onPrevious} variant="outline">
            Anterior
          </Button>
          <Button onClick={onClose} variant="outline">
            Cerrar
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={onSave} 
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
      </motion.div>
    </motion.div>
  );
}
