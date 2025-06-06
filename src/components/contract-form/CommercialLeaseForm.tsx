import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CommercialPartyFields } from "./commercial/CommercialPartyFields";
import { ContractFormData } from "@/types/contractTypes";

interface CommercialLeaseFormProps {
  onFormSubmit: (data: ContractFormData) => void;
  missingFields: string[] | null;
}

export function CommercialLeaseForm({ onFormSubmit, missingFields }: CommercialLeaseFormProps) {
  const emptyParty = { name: "", dni: "", address: "", phone: "" };

  const [lessors, setLessors] = useState([{ ...emptyParty }]);
  const [lessees, setLessees] = useState([{ ...emptyParty }]);
  const [data, setData] = useState({
    propertyLocation: "",
    propertyRegistry: "",
    propertyUse: "Local comercial",
    startDate: "",
    termYears: "",
    termMonths: "",
    monthlyRent: "",
    paymentDay: "1",
    depositAmount: "",
    expenses: "Suministros y comunidad a cargo del arrendatario",
    taxClause: "IVA vigente a cargo del arrendatario",
    optionalClauses: "",
    place: "",
    signingDay: "",
    signingMonth: "",
    signingYear: "2025",
  });

  const handlePartyChange = (which: "lessor" | "lessee", idx: number, field: string, value: string) => {
    (which === "lessor" ? setLessors : setLessees)((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const addParty = (which: "lessor" | "lessee") => {
    (which === "lessor" ? setLessors : setLessees)((prev) => [...prev, { ...emptyParty }]);
  };

  const removeParty = (which: "lessor" | "lessee", idx: number) => {
    (which === "lessor" ? setLessors : setLessees)((prev) =>
      prev.length === 1 ? prev : prev.filter((_, i) => i !== idx)
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));

  const lessorsBlock = useMemo(
    () =>
      lessors
        .map(
          (p) =>
            `D./Dª ${p.name}, mayor de edad, con DNI/NIE nº ${p.dni}, domicilio en ${p.address}, y teléfono/e-mail ${p.phone}.`
        )
        .join("\n"),
    [lessors]
  );

  const lesseesBlock = useMemo(
    () =>
      lessees
        .map(
          (p) =>
            `D./Dª ${p.name}, mayor de edad, con DNI/NIE nº ${p.dni}, domicilio en ${p.address}, y teléfono/e-mail ${p.phone}.`
        )
        .join("\n"),
    [lessees]
  );

  const contract = useMemo(() => {
    const d = data;
    const termDescr = d.termYears || d.termMonths
      ? `${d.termYears || 0} año/s y ${d.termMonths || 0} mes/es`
      : "_______";

    return `CONTRATO DE ARRENDAMIENTO PARA USO DISTINTO AL DE VIVIENDA\n(Art. 3 LAU 29/1994)\n\nREUNIDOS\nDe una parte, el/los ARRENDADOR/ES:\n${lessorsBlock}\n\nY de otra, el/los ARRENDATARIO/S:\n${lesseesBlock}\n\nAmbas partes, en la condición que ostentan, se reconocen la capacidad legal necesaria y\n\nEXPONEN\n1. Que el/los Arrendador/es son propietarios del inmueble sito en ${d.propertyLocation}, inscrito en el Registro de la Propiedad nº ${d.propertyRegistry}.\n2. Que el inmueble se destinará a ${d.propertyUse}.\n3. Que ambas partes desean formalizar el presente arrendamiento de conformidad con la LAU y demás normas aplicables.\n\nPACTAN\n1. Objeto y destino.- Arrendamiento del referido inmueble para el uso indicado. Queda prohibido cualquier otro uso sin consentimiento escrito del Arrendador.\n2. Plazo.- El arrendamiento tendrá una duración de ${termDescr}, comenzando el ${d.startDate}.\n3. Renta.- El Arrendatario abonará una renta mensual de ${d.monthlyRent} € más ${d.taxClause}, pagadera por adelantado dentro de los cinco primeros días — y preferentemente el día ${d.paymentDay} — de cada mes mediante transferencia.\n4. Fianza.- El Arrendatario entrega en este acto ${d.depositAmount} € en concepto de fianza legal (art. 36 LAU), que será devuelta al finalizar el contrato tras comprobar el buen estado del local.\n5. Gastos y servicios.- ${d.expenses}.\n6. Conservación y obras.- El Arrendatario realizará a su cargo las reparaciones menores derivadas del desgaste por el uso; las estructurales corresponden al Arrendador. Cualquier obra requerirá autorización escrita.\n7. Actualización de renta.- La renta se actualizará anualmente conforme al índice que la ley permita (IPC u otro índice oficial).\n8. Cesión y subarriendo.- Prohibidos salvo consentimiento expreso y escrito del Arrendador.\n9. Resolución anticipada.- Las partes podrán resolver conforme a los arts. 27‑35 LAU. El preaviso mínimo será de **30 días**.\n10. Legislación y fuero.- Se regirá por la LAU, el Código Civil y normativa autonómica. Para cualquier controversia, las partes se someten a los Juzgados del partido judicial donde radica el inmueble.\n\nOTRAS CLÁUSULAS (opcional)\n${d.optionalClauses}\n\nY en prueba de conformidad, firman en ${d.place}, a ${d.signingDay} de ${d.signingMonth} de ${d.signingYear}.\n\n______________________________                     ______________________________\nARRENDADOR/ES                                       ARRENDATARIO/S`;
  }, [lessorsBlock, lesseesBlock, data]);

  const onSubmit = () => {
    const formData: ContractFormData = {
      tipo_contrato: "alquiler_comercial",
      arrendadores: lessors,
      arrendatarios: lessees,
      inmueble: data.propertyLocation,
      // ... map other fields as needed
    };
    onFormSubmit(formData);
  };

  const Field = ({ label, name, type = "text" }: { label: string; name: string; type?: string }) => (
    <div className="flex flex-col gap-1">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} value={data[name as keyof typeof data]} onChange={handleChange} />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Arrendadores */}
      <Card className="border-2 shadow">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Arrendador/es</h2>
            <Button type="button" variant="outline" size="sm" onClick={() => addParty("lessor")}>
              <Plus className="w-4 h-4 mr-2" />
              Añadir arrendador
            </Button>
          </div>
          <div className="space-y-4">
            {lessors.map((lessor, index) => (
              <CommercialPartyFields
                key={`lessor-${index}`}
                which="lessor"
                party={lessor}
                index={index}
                parties={lessors}
                onPartyChange={handlePartyChange}
                onRemoveParty={removeParty}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Arrendatarios */}
      <Card className="border-2 shadow">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Arrendatario/s</h2>
            <Button type="button" variant="outline" size="sm" onClick={() => addParty("lessee")}>
              <Plus className="w-4 h-4 mr-2" />
              Añadir arrendatario
            </Button>
          </div>
          <div className="space-y-4">
            {lessees.map((lessee, index) => (
              <CommercialPartyFields
                key={`lessee-${index}`}
                which="lessee"
                party={lessee}
                index={index}
                parties={lessees}
                onPartyChange={handlePartyChange}
                onRemoveParty={removeParty}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Inmueble y uso */}
      <Card className="border-2 shadow">
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Datos del inmueble</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            <Field label="Ubicación" name="propertyLocation" />
            <Field label="Registro nº" name="propertyRegistry" />
            <Field label="Uso (p.ej. local, oficina)" name="propertyUse" />
          </div>
        </CardContent>
      </Card>

      {/* Plazo y renta */}
      <Card className="border-2 shadow">
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Plazo y renta</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            <Field label="Fecha inicio (dd/mm/aaaa)" name="startDate" />
            <Field label="Años" name="termYears" type="number" />
            <Field label="Meses adicionales" name="termMonths" type="number" />
            <Field label="Renta mensual (€)" name="monthlyRent" type="number" />
            <Field label="Día de pago" name="paymentDay" type="number" />
            <Field label="Fianza (€)" name="depositAmount" type="number" />
          </div>
        </CardContent>
      </Card>

      {/* Gastos y cláusulas */}
      <Card className="border-2 shadow">
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Gastos y otras cláusulas</h2>
          <div className="space-y-3">
            <Label htmlFor="expenses">Gastos a cargo del arrendatario</Label>
            <Textarea id="expenses" name="expenses" rows={2} value={data.expenses} onChange={handleChange} />
            <Label htmlFor="taxClause">Cláusula de impuestos</Label>
            <Textarea id="taxClause" name="taxClause" rows={2} value={data.taxClause} onChange={handleChange} />
            <Label htmlFor="optionalClauses">Otras cláusulas</Label>
            <Textarea id="optionalClauses" name="optionalClauses" rows={4} value={data.optionalClauses} onChange={handleChange} />
          </div>
        </CardContent>
      </Card>

      {/* Lugar y fecha */}
      <Card className="border-2 shadow">
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Lugar y fecha de firma</h2>
          <div className="grid lg:grid-cols-4 gap-6">
            <Field label="Lugar" name="place" />
            <Field label="Día" name="signingDay" />
            <Field label="Mes" name="signingMonth" />
            <Field label="Año" name="signingYear" />
          </div>
        </CardContent>
      </Card>

      {/* Vista previa */}
      <Card className="border-2 shadow">
        <CardHeader>
          <h2 className="text-xl font-semibold">Vista previa del contrato</h2>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg max-h-96 overflow-y-auto text-xs">
            {contract}
          </pre>
          <Button 
            className="mt-4" 
            onClick={() => { 
              navigator.clipboard.writeText(contract); 
              alert("Contrato copiado"); 
            }}
          >
            Copiar contrato
          </Button>
        </CardContent>
      </Card>

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

      <div className="flex justify-end">
        <Button 
          onClick={onSubmit} 
          className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
        >
          Generar Contrato
        </Button>
      </div>
    </div>
  );
}
