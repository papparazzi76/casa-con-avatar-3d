
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { RentalPartyFields } from "../RentalPartyFields";

interface RentalParty {
  name: string;
  dni: string;
  address: string;
  phone: string;
  email?: string;
}

interface RentalPartiesSectionProps {
  landlords: RentalParty[];
  tenants: RentalParty[];
  onPartyChange: (which: "landlord" | "tenant", idx: number, field: string, value: string) => void;
  onAddParty: (which: "landlord" | "tenant") => void;
  onRemoveParty: (which: "landlord" | "tenant", idx: number) => void;
}

export function RentalPartiesSection({
  landlords,
  tenants,
  onPartyChange,
  onAddParty,
  onRemoveParty
}: RentalPartiesSectionProps) {
  return (
    <>
      {/* Arrendadores */}
      <Card className="border-2 shadow">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Arrendadores</h2>
            <Button type="button" variant="outline" size="sm" onClick={() => onAddParty("landlord")}>
              <Plus className="w-4 h-4 mr-2" />
              Añadir arrendador
            </Button>
          </div>
          <div className="space-y-4">
            {landlords.map((landlord, index) => (
              <RentalPartyFields
                key={`landlord-${index}`}
                which="landlord"
                party={landlord}
                index={index}
                parties={landlords}
                onPartyChange={onPartyChange}
                onRemoveParty={onRemoveParty}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Arrendatarios */}
      <Card className="border-2 shadow">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Arrendatarios</h2>
            <Button type="button" variant="outline" size="sm" onClick={() => onAddParty("tenant")}>
              <Plus className="w-4 h-4 mr-2" />
              Añadir arrendatario
            </Button>
          </div>
          <div className="space-y-4">
            {tenants.map((tenant, index) => (
              <RentalPartyFields
                key={`tenant-${index}`}
                which="tenant"
                party={tenant}
                index={index}
                parties={tenants}
                onPartyChange={onPartyChange}
                onRemoveParty={onRemoveParty}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
