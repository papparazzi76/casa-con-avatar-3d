
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from "lucide-react";

interface Party {
  name: string;
  dni: string;
  address: string;
  phone: string;
}

interface PartyFieldsProps {
  which: "seller" | "buyer";
  party: Party;
  index: number;
  parties: Party[];
  onPartyChange: (which: "seller" | "buyer", idx: number, field: string, value: string) => void;
  onRemoveParty: (which: "seller" | "buyer", idx: number) => void;
}

export function PartyFields({ which, party, index, parties, onPartyChange, onRemoveParty }: PartyFieldsProps) {
  const isSeller = which === "seller";
  const handleFieldChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => 
    onPartyChange(which, index, field, e.target.value);

  return (
    <div className="space-y-2 border rounded-xl p-4 shadow-inner">        
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-lg">{isSeller ? "Vendedor/a" : "Comprador/a"} {index + 1}</h3>
        {parties.length > 1 && (
          <Button variant="ghost" size="icon" onClick={() => onRemoveParty(which, index)}>
            <Minus className="w-4 h-4" />
          </Button>
        )}
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <Label>Nombre</Label>
          <Input value={party.name} onChange={handleFieldChange("name")} />
        </div>
        <div className="flex flex-col gap-1">
          <Label>DNI/NIE</Label>
          <Input value={party.dni} onChange={handleFieldChange("dni")} />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Domicilio</Label>
          <Input value={party.address} onChange={handleFieldChange("address")} />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Teléfono/Email</Label>
          <Input value={party.phone} onChange={handleFieldChange("phone")} />
        </div>
      </div>
    </div>
  );
}
