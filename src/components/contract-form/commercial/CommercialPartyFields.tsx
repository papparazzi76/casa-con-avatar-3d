
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus } from "lucide-react";

interface CommercialParty {
  name: string;
  dni: string;
  address: string;
  phone: string;
}

interface CommercialPartyFieldsProps {
  which: "lessor" | "lessee";
  party: CommercialParty;
  index: number;
  parties: CommercialParty[];
  onPartyChange: (which: "lessor" | "lessee", idx: number, field: string, value: string) => void;
  onRemoveParty: (which: "lessor" | "lessee", idx: number) => void;
}

export function CommercialPartyFields({
  which,
  party,
  index,
  parties,
  onPartyChange,
  onRemoveParty
}: CommercialPartyFieldsProps) {
  const isLessor = which === "lessor";
  const h = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => 
    onPartyChange(which, index, field, e.target.value);

  return (
    <div className="space-y-2 border rounded-xl p-4 shadow-inner">        
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-lg">
          {isLessor ? "Arrendador/a" : "Arrendatario/a"} {index + 1}
        </h3>
        {parties.length > 1 && (
          <Button variant="ghost" size="icon" onClick={() => onRemoveParty(which, index)}>
            <Minus className="w-4 h-4" />
          </Button>
        )}
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <Label>Nombre</Label>
          <Input value={party.name} onChange={h("name")} />
        </div>
        <div className="flex flex-col gap-1">
          <Label>DNI/NIE</Label>
          <Input value={party.dni} onChange={h("dni")} />
        </div>
        <div className="flex flex-col gap-1 lg:col-span-2">
          <Label>Domicilio</Label>
          <Input value={party.address} onChange={h("address")} />
        </div>
        <div className="flex flex-col gap-1 lg:col-span-2">
          <Label>Teléfono / e-mail</Label>
          <Input value={party.phone} onChange={h("phone")} />
        </div>
      </div>
    </div>
  );
}
