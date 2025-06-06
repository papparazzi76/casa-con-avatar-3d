
import { useState, useEffect } from "react";
import { ContractFormData, ContractType } from "@/types/contractTypes";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { CompraventaArrasForm } from "./contract-form/CompraventaArrasForm";
import { RentalForm } from "./contract-form/RentalForm";
import { ReservationForm } from "./contract-form/ReservationForm";
import { CommercialLeaseForm } from "./contract-form/CommercialLeaseForm";

interface ContractFormProps {
  onFormSubmit: (data: ContractFormData) => void;
  missingFields: string[] | null;
}

export function ContractForm({ onFormSubmit, missingFields }: ContractFormProps) {
  const form = useForm<ContractFormData>({
    defaultValues: {
      tipo_contrato: "contrato_compraventa_arras_penitenciales",
    },
  });

  const [contractType, setContractType] = useState<ContractType>("contrato_compraventa_arras_penitenciales");
  const watchContractType = form.watch("tipo_contrato");

  // Effect to update the contractType state when the form field changes
  useEffect(() => {
    if (watchContractType) {
      setContractType(watchContractType);
    }
  }, [watchContractType]);

  // Define friendly labels for the contract types
  const contractTypeLabels = {
    contrato_compraventa_arras_penitenciales: "Contrato de Compraventa de Inmueble con Arras Penitenciales",
    alquiler_particulares_amueblado: "Contrato de arrendamiento de vivienda amueblada",
    alquiler_particulares_sin_amueblar: "Contrato de arrendamiento de vivienda sin amueblar",
    contrato_senal_reserva: "Contrato de señal o reserva (con o sin oferta)",
    alquiler_comercial: "Contrato de arrendamiento para uso distinto al de vivienda"
  };

  const isRentalContract = contractType.includes("alquiler") && contractType !== "alquiler_comercial";

  return (
    <div className="space-y-8">
      <Card className="border-2 shadow">
        <CardContent className="pt-6">
          <Form {...form}>
            <FormField
              control={form.control}
              name="tipo_contrato"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Contrato</FormLabel>
                  <Select 
                    onValueChange={(value: ContractType) => {
                      field.onChange(value);
                      setContractType(value);
                    }} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo de contrato" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(contractTypeLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Selecciona el tipo de contrato que deseas generar
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        </CardContent>
      </Card>

      {/* Render the appropriate form based on contract type */}
      {contractType === "contrato_compraventa_arras_penitenciales" && (
        <CompraventaArrasForm 
          onFormSubmit={onFormSubmit}
          missingFields={missingFields}
        />
      )}

      {contractType === "contrato_senal_reserva" && (
        <ReservationForm 
          onFormSubmit={onFormSubmit}
          missingFields={missingFields}
        />
      )}

      {contractType === "alquiler_comercial" && (
        <CommercialLeaseForm 
          onFormSubmit={onFormSubmit}
          missingFields={missingFields}
        />
      )}

      {isRentalContract && (
        <RentalForm 
          contractType={contractType}
          onFormSubmit={onFormSubmit}
          missingFields={missingFields}
        />
      )}
    </div>
  );
}
