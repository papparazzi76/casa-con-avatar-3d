
import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { ContractFormData } from "@/types/contractTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { RentalPartyFields } from "./RentalPartyFields";

interface CommercialParty {
  name: string;
  dni: string;
  address: string;
  phone: string;
}

interface CommercialLeaseFormProps {
  onFormSubmit: (data: ContractFormData) => void;
  missingFields: string[] | null;
}

export function CommercialLeaseForm({
  onFormSubmit,
  missingFields
}: CommercialLeaseFormProps) {
  const emptyParty: CommercialParty = {
    name: "",
    dni: "",
    address: "",
    phone: ""
  };

  const [lessors, setLessors] = useState<CommercialParty[]>([{
    ...emptyParty
  }]);
  const [lessees, setLessees] = useState<CommercialParty[]>([{
    ...emptyParty
  }]);

  const form = useForm<ContractFormData>({
    defaultValues: {
      tipo_contrato: "alquiler_comercial",
      property_use: "Local comercial",
      payment_day: 1,
      expenses: "Suministros y comunidad a cargo del arrendatario",
      tax_clause: "IVA vigente a cargo del arrendatario",
      signing_year: "2025"
    }
  });

  const handlePartyChange = (which: "lessor" | "lessee", idx: number, field: string, value: string) => {
    (which === "lessor" ? setLessors : setLessees)(prev => {
      const updated = [...prev];
      updated[idx] = {
        ...updated[idx],
        [field]: value
      };
      return updated;
    });
  };

  const addParty = (which: "lessor" | "lessee") => {
    (which === "lessor" ? setLessors : setLessees)(prev => [...prev, {
      ...emptyParty
    }]);
  };

  const removeParty = (which: "lessor" | "lessee", idx: number) => {
    (which === "lessor" ? setLessors : setLessees)(prev => prev.length === 1 ? prev : prev.filter((_, i) => i !== idx));
  };

  // Contract preview generation
  const watchedValues = form.watch();
  
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

  const contractPreview = useMemo(() => {
    const d = watchedValues;
    const termDescr = d.term_years || d.term_months
      ? `${d.term_years || 0} año/s y ${d.term_months || 0} mes/es`
      : "_______";

    return `CONTRATO DE ARRENDAMIENTO PARA USO DISTINTO AL DE VIVIENDA
(Art. 3 LAU 29/1994)

REUNIDOS
De una parte, el/los ARRENDADOR/ES:
${lessorsBlock}

Y de otra, el/los ARRENDATARIO/S:
${lesseesBlock}

Ambas partes, en la condición que ostentan, se reconocen la capacidad legal necesaria y

EXPONEN
1. Que el/los Arrendador/es son propietarios del inmueble sito en ${d.property_location || "_______"}, inscrito en el Registro de la Propiedad nº ${d.property_registry || "_______"}.
2. Que el inmueble se destinará a ${d.property_use || "_______"}.
3. Que ambas partes desean formalizar el presente arrendamiento de conformidad con la LAU y demás normas aplicables.

PACTAN
1. Objeto y destino.- Arrendamiento del referido inmueble para el uso indicado. Queda prohibido cualquier otro uso sin consentimiento escrito del Arrendador.
2. Plazo.- El arrendamiento tendrá una duración de ${termDescr}, comenzando el ${d.fecha_inicio_posesion || "_______"}.
3. Renta.- El Arrendatario abonará una renta mensual de ${d.renta_mensual || "_______"} € más ${d.tax_clause || "_______"}, pagadera por adelantado dentro de los cinco primeros días — y preferentemente el día ${d.payment_day || "1"} — de cada mes mediante transferencia.
4. Fianza.- El Arrendatario entrega en este acto ${d.fianza || "_______"} € en concepto de fianza legal (art. 36 LAU), que será devuelta al finalizar el contrato tras comprobar el buen estado del local.
5. Gastos y servicios.- ${d.expenses || "_______"}.
6. Conservación y obras.- El Arrendatario realizará a su cargo las reparaciones menores derivadas del desgaste por el uso; las estructurales corresponden al Arrendador. Cualquier obra requerirá autorización escrita.
7. Actualización de renta.- La renta se actualizará anualmente conforme al índice que la ley permita (IPC u otro índice oficial).
8. Cesión y subarriendo.- Prohibidos salvo consentimiento expreso y escrito del Arrendador.
9. Resolución anticipada.- Las partes podrán resolver conforme a los arts. 27‑35 LAU. El preaviso mínimo será de **30 días**.
10. Legislación y fuero.- Se regirá por la LAU, el Código Civil y normativa autonómica. Para cualquier controversia, las partes se someten a los Juzgados del partido judicial donde radica el inmueble.

OTRAS CLÁUSULAS (opcional)
${d.optional_clauses || ""}

Y en prueba de conformidad, firman en ${d.poblacion_firma || "_______"}, a ${d.signing_day || "_______"} de ${d.signing_month || "_______"} de ${d.signing_year || "2025"}.

______________________________                     ______________________________
ARRENDADOR/ES                                       ARRENDATARIO/S`;
  }, [lessorsBlock, lesseesBlock, watchedValues]);

  function onSubmit(data: ContractFormData) {
    const formData: ContractFormData = {
      ...data,
      arrendadores: lessors,
      arrendatarios: lessees
    };
    onFormSubmit(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Arrendadores */}
        <Card className="border-2 shadow">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Arrendadores</h2>
              <Button type="button" variant="outline" size="sm" onClick={() => addParty("lessor")}>
                <Plus className="w-4 h-4 mr-2" />
                Añadir arrendador
              </Button>
            </div>
            <div className="space-y-4">
              {lessors.map((lessor, index) => (
                <RentalPartyFields
                  key={`lessor-${index}`}
                  which="landlord"
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
              <h2 className="text-lg font-semibold">Arrendatarios</h2>
              <Button type="button" variant="outline" size="sm" onClick={() => addParty("lessee")}>
                <Plus className="w-4 h-4 mr-2" />
                Añadir arrendatario
              </Button>
            </div>
            <div className="space-y-4">
              {lessees.map((lessee, index) => (
                <RentalPartyFields
                  key={`lessee-${index}`}
                  which="tenant"
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

        {/* Datos del inmueble */}
        <Card className="border-2 shadow">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Datos del inmueble</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="property_location"
                render={({ field }) => (
                  <FormItem className={missingFields?.includes("property_location") ? "border-red-500 border-l-2 pl-2" : ""}>
                    <FormLabel>Ubicación</FormLabel>
                    <FormControl>
                      <Input placeholder="Dirección completa del inmueble" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="property_registry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registro nº</FormLabel>
                    <FormControl>
                      <Input placeholder="Número de registro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="property_use"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Uso (p.ej. local, oficina)</FormLabel>
                    <FormControl>
                      <Input placeholder="Local comercial" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Plazo y renta */}
        <Card className="border-2 shadow">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Plazo y renta</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="fecha_inicio_posesion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha inicio</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="term_years"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Años</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="3"
                        {...field}
                        onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="term_months"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meses adicionales</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="6"
                        {...field}
                        onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="renta_mensual"
                render={({ field }) => (
                  <FormItem className={missingFields?.includes("renta_mensual") ? "border-red-500 border-l-2 pl-2" : ""}>
                    <FormLabel>Renta mensual (€)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1200"
                        {...field}
                        onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payment_day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Día de pago</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="31"
                        placeholder="1"
                        {...field}
                        onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fianza"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fianza (€)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="2400"
                        {...field}
                        onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Gastos y otras cláusulas */}
        <Card className="border-2 shadow">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Gastos y otras cláusulas</h2>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="expenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gastos a cargo del arrendatario</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={2}
                        placeholder="Suministros y comunidad a cargo del arrendatario"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tax_clause"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cláusula de impuestos</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={2}
                        placeholder="IVA vigente a cargo del arrendatario"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="optional_clauses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Otras cláusulas (opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Cláusulas adicionales del contrato..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Lugar y fecha de firma */}
        <Card className="border-2 shadow">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Lugar y fecha de firma</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="poblacion_firma"
                render={({ field }) => (
                  <FormItem className={missingFields?.includes("poblacion_firma") ? "border-red-500 border-l-2 pl-2" : ""}>
                    <FormLabel>Lugar</FormLabel>
                    <FormControl>
                      <Input placeholder="Madrid" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="signing_day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Día</FormLabel>
                    <FormControl>
                      <Input placeholder="15" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="signing_month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mes</FormLabel>
                    <FormControl>
                      <Input placeholder="enero" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="signing_year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Año</FormLabel>
                    <FormControl>
                      <Input placeholder="2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Vista previa del contrato */}
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
          <Button type="submit" className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90">
            Generar Contrato
          </Button>
        </div>
      </form>
    </Form>
  );
}
