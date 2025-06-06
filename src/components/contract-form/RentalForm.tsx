
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ContractFormData, ContractType } from "@/types/contractTypes";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { format } from "date-fns";
import { RentalPartiesSection } from "./rental/RentalPartiesSection";
import { RentalPropertyFields } from "./rental/RentalPropertyFields";
import { RentalTermsFields } from "./rental/RentalTermsFields";
import { RentalContractPreview } from "./rental/RentalContractPreview";
import { TermsCheckboxField } from "@/components/TermsCheckboxField";

interface RentalParty {
  name: string;
  dni: string;
  address: string;
  phone: string;
  email?: string;
}

interface RentalFormProps {
  contractType: ContractType;
  onFormSubmit: (data: ContractFormData) => void;
  missingFields: string[] | null;
}

export function RentalForm({
  contractType,
  onFormSubmit,
  missingFields
}: RentalFormProps) {
  const emptyParty: RentalParty = {
    name: "",
    dni: "",
    address: "",
    phone: "",
    email: ""
  };

  const [landlords, setLandlords] = useState<RentalParty[]>([{
    ...emptyParty
  }]);
  const [tenants, setTenants] = useState<RentalParty[]>([{
    ...emptyParty
  }]);

  const form = useForm<ContractFormData>({
    defaultValues: {
      tipo_contrato: contractType,
      fecha_firma: format(new Date(), "yyyy-MM-dd"),
      gastos_luz: false,
      gastos_agua: false,
      gastos_gas: false,
      gastos_internet: false,
      acceptedTerms: false
    }
  });

  const handlePartyChange = (which: "landlord" | "tenant", idx: number, field: string, value: string) => {
    (which === "landlord" ? setLandlords : setTenants)(prev => {
      const updated = [...prev];
      updated[idx] = {
        ...updated[idx],
        [field]: value
      };
      return updated;
    });
  };

  const addParty = (which: "landlord" | "tenant") => {
    (which === "landlord" ? setLandlords : setTenants)(prev => [...prev, {
      ...emptyParty
    }]);
  };

  const removeParty = (which: "landlord" | "tenant", idx: number) => {
    (which === "landlord" ? setLandlords : setTenants)(prev => prev.length === 1 ? prev : prev.filter((_, i) => i !== idx));
  };

  const watchedValues = form.watch();

  function onSubmit(data: ContractFormData) {
    const formData: ContractFormData = {
      ...data,
      arrendadores: landlords,
      arrendatarios: tenants
    };
    onFormSubmit(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <RentalPartiesSection
          landlords={landlords}
          tenants={tenants}
          onPartyChange={handlePartyChange}
          onAddParty={addParty}
          onRemoveParty={removeParty}
        />

        <RentalPropertyFields
          control={form.control}
          missingFields={missingFields}
        />

        <RentalTermsFields
          control={form.control}
          contractType={contractType}
          missingFields={missingFields}
        />

        <RentalContractPreview
          contractType={contractType}
          landlords={landlords}
          tenants={tenants}
          watchedValues={watchedValues}
        />

        {missingFields && missingFields.length > 0 && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md border border-red-200">
            <h3 className="font-medium mb-2">Completa los campos requeridos:</h3>
            <ul className="list-disc list-inside space-y-1">
              {missingFields.map(field => (
                <li key={field}>{field}</li>
              ))}
            </ul>
          </div>
        )}

        <TermsCheckboxField control={form.control} />

        <div className="flex justify-end">
          <Button type="submit" className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90">
            Generar Contrato
          </Button>
        </div>
      </form>
    </Form>
  );
}
