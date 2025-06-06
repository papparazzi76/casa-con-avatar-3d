
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContractFormData, ContractType } from "@/types/contractTypes";

interface RentalParty {
  name: string;
  dni: string;
  address: string;
  phone: string;
  email?: string;
}

interface RentalContractPreviewProps {
  contractType: ContractType;
  landlords: RentalParty[];
  tenants: RentalParty[];
  watchedValues: ContractFormData;
}

export function RentalContractPreview({
  contractType,
  landlords,
  tenants,
  watchedValues
}: RentalContractPreviewProps) {
  const landlordsBlock = useMemo(
    () =>
      landlords
        .map(
          (l) =>
            `D./Dª ${l.name}, mayor de edad, con DNI/NIE nº ${l.dni}, domicilio en ${l.address}, teléfono ${l.phone}${l.email ? ` y e-mail ${l.email}` : ""}.`
        )
        .join("\n"),
    [landlords]
  );

  const tenantsBlock = useMemo(
    () =>
      tenants
        .map(
          (t) =>
            `D./Dª ${t.name}, mayor de edad, con DNI/NIE nº ${t.dni}, domicilio en ${t.address}, teléfono ${t.phone}${t.email ? ` y e-mail ${t.email}` : ""}.`
        )
        .join("\n"),
    [tenants]
  );

  const contractPreview = useMemo(() => {
    const d = watchedValues;
    const isAmueblado = contractType.includes("amueblado");
    
    return `CONTRATO DE ARRENDAMIENTO DE VIVIENDA ${isAmueblado ? "AMUEBLADA" : "SIN AMUEBLAR"}

REUNIDOS
De una parte, como ARRENDADOR/ES:
${landlordsBlock}

Y de otra parte, como ARRENDATARIO/S:
${tenantsBlock}

Ambas partes se reconocen la capacidad legal necesaria para contratar y

EXPONEN
1. Que el/los arrendador/es son propietarios de la vivienda sita en ${d.inmueble || "_______"}.
2. Que el/los arrendatario/s tienen interés en arrendar dicha vivienda para destinarla a vivienda habitual.
3. Que ambas partes desean formalizar el presente contrato de arrendamiento.

PACTAN
1. OBJETO: El arrendamiento de la vivienda descrita para uso de vivienda habitual.
2. DURACIÓN: ${d.duracion || "_______"} años, desde el ${d.fecha_inicio_posesion || "_______"} hasta el ${d.fecha_fin_posesion || "_______"}.
3. RENTA: ${d.renta_mensual || "_______"} €/mes, pagadera por adelantado dentro de los primeros cinco días de cada mes.
4. FIANZA: ${d.fianza || "_______"} mensualidades (${(d.renta_mensual && d.fianza) ? d.renta_mensual * d.fianza : "_______"} €).
5. GASTOS: ${d.gastos_luz ? "Luz" : ""}${d.gastos_agua ? ", Agua" : ""}${d.gastos_gas ? ", Gas" : ""}${d.gastos_internet ? ", Internet" : ""} a cargo del arrendatario.
${d.otros_gastos ? `Otros gastos: ${d.otros_gastos}` : ""}
${isAmueblado && d.inventario_muebles ? `\n6. INVENTARIO: Ver Anexo I adjunto.\n${d.inventario_muebles}` : ""}
${!isAmueblado && d.obs_pintura ? `\n6. ESTADO INICIAL: Ver Anexo I adjunto.` : ""}
${d.clausulas_adicionales ? `\nCLÁUSULAS ADICIONALES:\n${d.clausulas_adicionales}` : ""}

Y en prueba de conformidad, firman en ${d.poblacion_firma || "_______"}, a fecha de ${d.fecha_firma || "_______"}.

______________________________                     ______________________________
ARRENDADOR/ES                                       ARRENDATARIO/S`;
  }, [landlordsBlock, tenantsBlock, watchedValues, contractType]);

  return (
    <Card className="border-2 shadow">
      <CardHeader>
        <h2 className="text-xl font-semibold">Vista previa del contrato</h2>
      </CardHeader>
      <CardContent>
        <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg max-h-96 overflow-y-auto text-xs">
          {contractPreview}
        </pre>
        <Button
          type="button"
          className="mt-4"
          onClick={() => {
            navigator.clipboard.writeText(contractPreview);
            alert("Contrato copiado al portapapeles");
          }}
        >
          Copiar contrato
        </Button>
      </CardContent>
    </Card>
  );
}
