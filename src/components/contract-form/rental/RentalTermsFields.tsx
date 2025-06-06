
import React from "react";
import { Control } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { ContractFormData, ContractType } from "@/types/contractTypes";
import { BasicTermsFields } from "./BasicTermsFields";
import { ExpensesSection } from "./ExpensesSection";
import { InventorySection } from "./InventorySection";
import { StateInspectionSection } from "./StateInspectionSection";
import { AdditionalClausesField } from "./AdditionalClausesField";

interface RentalTermsFieldsProps {
  control: Control<ContractFormData>;
  contractType: ContractType;
  missingFields: string[] | null;
}

export function RentalTermsFields({ control, contractType, missingFields }: RentalTermsFieldsProps) {
  return (
    <Card className="border-2 shadow">
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold mb-4">
          Datos Específicos del Arrendamiento
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BasicTermsFields 
            control={control} 
            contractType={contractType} 
            missingFields={missingFields} 
          />

          <ExpensesSection control={control} />

          {/* Inventario para viviendas amuebladas */}
          {contractType.includes("amueblado") && (
            <InventorySection control={control} />
          )}

          {/* Acta de estado inicial para viviendas sin amueblar */}
          {contractType.includes("sin_amueblar") && (
            <StateInspectionSection control={control} />
          )}

          <AdditionalClausesField control={control} />
        </div>
      </CardContent>
    </Card>
  );
}
