
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from "lucide-react";

interface RentalParty {
  name: string;
  dni: string;
  address: string;
  phone: string;
  email?: string;
}

interface RentalPartyFieldsProps {
  which: "landlord" | "tenant";
  party: RentalParty;
  index: number;
  parties: RentalParty[];
  onPartyChange: (which: "landlord" | "tenant", idx: number, field: string, value: string) => void;
  onRemoveParty: (which: "landlord" | "tenant", idx: number) => void;
}

export function RentalPartyFields({ which, party, index, parties, onPartyChange, onRemoveParty }: RentalPartyFieldsProps) {
  const isLandlord = which === "landlord";
  const handleFieldChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => 
    onPartyChange(which, index, field, e.target.value);

  return (
    <div className="space-y-2 border rounded-xl p-4 shadow-inner">        
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-lg">{isLandlord ? "Arrendador/a" : "Arrendatario/a"} {index + 1}</h3>
        {parties.length > 1 && (
          <Button variant="ghost" size="icon" onClick={() => onRemoveParty(which, index)}>
            <Minus className="w-4 h-4" />
          </Button>
        )}
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <Label>Nombre Completo</Label>
          <Input value={party.name} onChange={handleFieldChange("name")} placeholder="Nombre y apellidos" />
        </div>
        <div className="flex flex-col gap-1">
          <Label>DNI/NIE</Label>
          <Input value={party.dni} onChange={handleFieldChange("dni")} placeholder="00000000X" />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Domicilio</Label>
          <Input value={party.address} onChange={handleFieldChange("address")} placeholder="Dirección completa" />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Teléfono</Label>
          <Input value={party.phone} onChange={handleFieldChange("phone")} placeholder="+34 600 000 000" />
        </div>
        <div className="flex flex-col gap-1 lg:col-span-2">
          <Label>Email</Label>
          <Input 
            type="email" 
            value={party.email || ""} 
            onChange={handleFieldChange("email")} 
            placeholder="email@ejemplo.com" 
          />
        </div>
      </div>
    </div>
  );
}
