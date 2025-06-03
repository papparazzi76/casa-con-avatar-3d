
import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PartyFields } from "./PartyFields";
import { ContractFormData } from "@/types/contractTypes";

interface Party {
  name: string;
  dni: string;
  address: string;
  phone: string;
}

interface CompraventaArrasFormProps {
  onFormSubmit: (data: ContractFormData) => void;
  missingFields: string[] | null;
}

export function CompraventaArrasForm({ onFormSubmit, missingFields }: CompraventaArrasFormProps) {
  const emptyParty = { name: "", dni: "", address: "", phone: "" };
  const [sellers, setSellers] = useState([{ ...emptyParty }]);
  const [buyers, setBuyers] = useState([{ ...emptyParty }]);
  const [compraventaData, setCompraventaData] = useState({
    propertyLocation: "",
    propertyRegistry: "",
    propertyTomo: "",
    propertyLibro: "",
    propertyFolio: "",
    propertyFinca: "",
    propertyCharges: "Sin cargas",
    arrasAmount: "",
    arrasPercent: "",
    paymentMethod: "Transferencia",
    totalPrice: "",
    escrituraDate: "",
    daysFromMortgage: "",
    mortgageDeadline: "",
    optionalClauses: "",
    place: "",
    signingDay: "",
    signingMonth: "",
    signingYear: "2025",
  });

  const handlePartyChange = (which: "seller" | "buyer", idx: number, field: string, value: string) => {
    (which === "seller" ? setSellers : setBuyers)((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const addParty = (which: "seller" | "buyer") => {
    (which === "seller" ? setSellers : setBuyers)((prev) => [...prev, { ...emptyParty }]);
  };

  const removeParty = (which: "seller" | "buyer", idx: number) => {
    (which === "seller" ? setSellers : setBuyers)((prev) =>
      prev.length === 1 ? prev : prev.filter((_, i) => i !== idx)
    );
  };

  const handleCompraventaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setCompraventaData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const sellersBlock = useMemo(
    () =>
      sellers
        .map(
          (s) =>
            `D./Dª ${s.name}, mayor de edad, con DNI/NIE nº ${s.dni}, domicilio en ${s.address}, y teléfono/e-mail ${s.phone}.`
        )
        .join("\n"),
    [sellers]
  );

  const buyersBlock = useMemo(
    () =>
      buyers
        .map(
          (b) =>
            `D./Dª ${b.name}, mayor de edad, con DNI/NIE nº ${b.dni}, domicilio en ${b.address}, y teléfono/e-mail ${b.phone}.`
        )
        .join("\n"),
    [buyers]
  );

  const contract = useMemo(() => {
    const d = compraventaData;
    return `MODELO DE CONTRATO PRIVADO DE COMPRAVENTA DE INMUEBLE
(adaptar antes de firmar: datos personales, cantidades, plazos y legislación autonómica específica)

REUNIDOS
De una parte, los/las VENDEDOR/AS
${sellersBlock}

Y de otra, los/las COMPRADOR/AS
${buyersBlock}

Ambas partes se reconocen capacidad legal suficiente y

EXPONEN
1.  Que los/las VENDEDOR/AS son plenos propietarios del inmueble sito en ${d.propertyLocation}, inscrito en el Registro de la Propiedad nº ${d.propertyRegistry}, tomo ${d.propertyTomo}, libro ${d.propertyLibro}, folio ${d.propertyFolio}, finca nº ${d.propertyFinca}, libre de cargas y gravámenes salvo las siguientes: ${d.propertyCharges}.
2.  Que los/las COMPRADOR/AS manifiestan su firme interés en adquirir dicho inmueble.
3.  Que ambas partes desean formalizar el presente Contrato de Compraventa con entrega de arras penitenciales al amparo del art. 1454 del Código Civil, la reciente jurisprudencia (STS 270/2025, de 19-II-2025) y la normativa estatal/autonómica vigente.

PACTAN
1. Objeto – El/la VENDEDOR/A reserva en exclusiva al/a la COMPRADOR/A el inmueble descrito, retirándolo del mercado hasta la fecha límite indicada en la cláusula 4.
2. Arras penitenciales – Los/las COMPRADOR/AS entregan en este acto la suma de ${d.arrasAmount} € (${d.arrasPercent}% del precio) mediante ${d.paymentMethod}, que los/las VENDEDOR/AS reciben y firman. Si los/las COMPRADOR/AS desisten, perderán la cantidad entregada; si desisten los/las VENDEDOR/AS, devolverán el doble (art. 1454 CC).
3. Precio total y forma de pago – Se fija un precio de compraventa de ${d.totalPrice} €, del que las arras aquí entregadas se deducirán. El resto se satisfará en la escritura pública.
4. Plazo para otorgar escritura – Las partes se obligan a firmar escritura de compraventa antes del ${d.escrituraDate} (o dentro de ${d.daysFromMortgage} días hábiles desde la obtención de la hipoteca, si procede). Transcurrido dicho plazo sin causa justificada:
   • Incumplimiento de los/las COMPRADOR/AS ⇒ pierden las arras.
   • Incumplimiento de los/las VENDEDOR/AS ⇒ devuelven el doble.
5. Gastos e impuestos – Conforme al art. 1455 CC y la Ley 58/2003 (LGT):
   • Escritura matriz a cargo del vendedor.
   • Copia de comprador, ITP/AJD o IVA y plusvalía municipal a cargo del comprador, salvo pacto o norma autonómica distinta.
6. Cargas, certificaciones y saneamiento – Los/las VENDEDOR/AS garantizan:
   • Que el inmueble se transmitirá libre de cargas, arrendamientos y ocupantes.
   • Entregar antes de la firma: Nota simple actual, Certificado de Eficiencia Energética, ITE/IBI al corriente y, en caso de VPO, autorizaciones administrativas necesarias.
7. Financiación – Si la compra está condicionada a la concesión de hipoteca, los/las COMPRADOR/AS deberán comunicar la denegación documental antes del ${d.mortgageDeadline}. No hacerlo supondrá incumplimiento.
8. Protección de datos – Ambas partes se informan mutuamente de que los datos personales facilitados serán tratados solo para la gestión de esta operación, pudiendo ejercitar los derechos previstos en el RGPD (UE) 2016/679.
9. Ley aplicable y fuero – Este contrato se rige por la legislación civil española, la Ley 12/2023 por el Derecho a la Vivienda en lo que resulte de aplicación y demás normas complementarias. Para toda controversia, las partes se someten a los Juzgados y Tribunales del partido judicial donde radica el inmueble, salvo fuero imperativo del consumidor.
10. Notificaciones – Se practicarán válidamente en los domicilios/e-mail indicados arriba, salvo notificación escrita de cambio.

OTROS PACTOS (opcional)
${d.optionalClauses}

Y en prueba de conformidad, firman ambas partes el presente contrato, por duplicado ejemplar y a un solo efecto, en ${d.place}, a ${d.signingDay} de ${d.signingMonth} de ${d.signingYear}.

______________________________                     ______________________________
VENDEDOR/ES                                         COMPRADOR/AS

(Se recomienda añadir como anexo la nota simple, plano y justificante del pago de arras. Consulte a un abogado o asesor fiscal para adaptar este modelo a su comunidad autónoma y circunstancias concretas).`;
  }, [sellersBlock, buyersBlock, compraventaData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData: ContractFormData = {
      tipo_contrato: "contrato_compraventa_arras_penitenciales",
      vendedores: sellers,
      compradores: buyers,
      property_location: compraventaData.propertyLocation,
      property_registry: compraventaData.propertyRegistry,
      property_tomo: compraventaData.propertyTomo,
      property_libro: compraventaData.propertyLibro,
      property_folio: compraventaData.propertyFolio,
      property_finca: compraventaData.propertyFinca,
      property_charges: compraventaData.propertyCharges,
      arras_amount: Number(compraventaData.arrasAmount),
      arras_percent: Number(compraventaData.arrasPercent),
      payment_method: compraventaData.paymentMethod,
      precio_total: Number(compraventaData.totalPrice),
      escritura_date: compraventaData.escrituraDate,
      days_from_mortgage: Number(compraventaData.daysFromMortgage),
      mortgage_deadline: compraventaData.mortgageDeadline,
      optional_clauses: compraventaData.optionalClauses,
      poblacion_firma: compraventaData.place,
      signing_day: compraventaData.signingDay,
      signing_month: compraventaData.signingMonth,
      signing_year: compraventaData.signingYear,
    };

    onFormSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Vendedores */}
      <Card className="border-2 shadow">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Vendedores</h2>
            <Button type="button" variant="outline" size="sm" onClick={() => addParty("seller")}>
              <Plus className="w-4 h-4 mr-2" />
              Añadir vendedor
            </Button>
          </div>
          <div className="space-y-4">
            {sellers.map((seller, index) => (
              <PartyFields 
                key={`seller-${index}`} 
                which="seller" 
                party={seller} 
                index={index}
                parties={sellers}
                onPartyChange={handlePartyChange}
                onRemoveParty={removeParty}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compradores */}
      <Card className="border-2 shadow">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Compradores</h2>
            <Button type="button" variant="outline" size="sm" onClick={() => addParty("buyer")}>
              <Plus className="w-4 h-4 mr-2" />
              Añadir comprador
            </Button>
          </div>
          <div className="space-y-4">
            {buyers.map((buyer, index) => (
              <PartyFields 
                key={`buyer-${index}`} 
                which="buyer" 
                party={buyer} 
                index={index}
                parties={buyers}
                onPartyChange={handlePartyChange}
                onRemoveParty={removeParty}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Datos del Inmueble */}
      <Card className="border-2 shadow">
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Datos del Inmueble</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="propertyLocation">Ubicación del inmueble</Label>
              <Input 
                id="propertyLocation" 
                name="propertyLocation" 
                value={compraventaData.propertyLocation} 
                onChange={handleCompraventaChange} 
              />
            </div>
            <div>
              <Label htmlFor="propertyRegistry">Registro de la Propiedad nº</Label>
              <Input 
                id="propertyRegistry" 
                name="propertyRegistry" 
                value={compraventaData.propertyRegistry} 
                onChange={handleCompraventaChange} 
              />
            </div>
            <div>
              <Label htmlFor="propertyTomo">Tomo</Label>
              <Input 
                id="propertyTomo" 
                name="propertyTomo" 
                value={compraventaData.propertyTomo} 
                onChange={handleCompraventaChange} 
              />
            </div>
            <div>
              <Label htmlFor="propertyLibro">Libro</Label>
              <Input 
                id="propertyLibro" 
                name="propertyLibro" 
                value={compraventaData.propertyLibro} 
                onChange={handleCompraventaChange} 
              />
            </div>
            <div>
              <Label htmlFor="propertyFolio">Folio</Label>
              <Input 
                id="propertyFolio" 
                name="propertyFolio" 
                value={compraventaData.propertyFolio} 
                onChange={handleCompraventaChange} 
              />
            </div>
            <div>
              <Label htmlFor="propertyFinca">Finca nº</Label>
              <Input 
                id="propertyFinca" 
                name="propertyFinca" 
                value={compraventaData.propertyFinca} 
                onChange={handleCompraventaChange} 
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="propertyCharges">Cargas y gravámenes</Label>
              <Textarea 
                id="propertyCharges" 
                name="propertyCharges" 
                value={compraventaData.propertyCharges} 
                onChange={handleCompraventaChange}
                placeholder="Sin cargas"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Condiciones Económicas */}
      <Card className="border-2 shadow">
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Condiciones Económicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="totalPrice">Precio total (€)</Label>
              <Input 
                id="totalPrice" 
                name="totalPrice" 
                type="number"
                value={compraventaData.totalPrice} 
                onChange={handleCompraventaChange} 
              />
            </div>
            <div>
              <Label htmlFor="arrasAmount">Importe de arras (€)</Label>
              <Input 
                id="arrasAmount" 
                name="arrasAmount" 
                type="number"
                value={compraventaData.arrasAmount} 
                onChange={handleCompraventaChange} 
              />
            </div>
            <div>
              <Label htmlFor="arrasPercent">Porcentaje de arras (%)</Label>
              <Input 
                id="arrasPercent" 
                name="arrasPercent" 
                type="number"
                step="0.01"
                value={compraventaData.arrasPercent} 
                onChange={handleCompraventaChange} 
              />
            </div>
            <div>
              <Label htmlFor="paymentMethod">Forma de pago</Label>
              <Input 
                id="paymentMethod" 
                name="paymentMethod" 
                value={compraventaData.paymentMethod} 
                onChange={handleCompraventaChange} 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plazos */}
      <Card className="border-2 shadow">
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Plazos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="escrituraDate">Fecha límite para escritura</Label>
              <Input 
                id="escrituraDate" 
                name="escrituraDate" 
                type="date"
                value={compraventaData.escrituraDate} 
                onChange={handleCompraventaChange} 
              />
            </div>
            <div>
              <Label htmlFor="daysFromMortgage">Días desde hipoteca</Label>
              <Input 
                id="daysFromMortgage" 
                name="daysFromMortgage" 
                type="number"
                value={compraventaData.daysFromMortgage} 
                onChange={handleCompraventaChange} 
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="mortgageDeadline">Fecha límite hipoteca</Label>
              <Input 
                id="mortgageDeadline" 
                name="mortgageDeadline" 
                type="date"
                value={compraventaData.mortgageDeadline} 
                onChange={handleCompraventaChange} 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Otros datos */}
      <Card className="border-2 shadow">
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Otros datos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="place">Lugar de firma</Label>
              <Input 
                id="place" 
                name="place" 
                value={compraventaData.place} 
                onChange={handleCompraventaChange} 
              />
            </div>
            <div>
              <Label htmlFor="signingDay">Día</Label>
              <Input 
                id="signingDay" 
                name="signingDay" 
                value={compraventaData.signingDay} 
                onChange={handleCompraventaChange} 
              />
            </div>
            <div>
              <Label htmlFor="signingMonth">Mes</Label>
              <Input 
                id="signingMonth" 
                name="signingMonth" 
                value={compraventaData.signingMonth} 
                onChange={handleCompraventaChange} 
              />
            </div>
            <div>
              <Label htmlFor="signingYear">Año</Label>
              <Input 
                id="signingYear" 
                name="signingYear" 
                value={compraventaData.signingYear} 
                onChange={handleCompraventaChange} 
              />
            </div>
            <div className="md:col-span-3">
              <Label htmlFor="optionalClauses">Cláusulas opcionales</Label>
              <Textarea 
                id="optionalClauses" 
                name="optionalClauses" 
                rows={4}
                value={compraventaData.optionalClauses} 
                onChange={handleCompraventaChange} 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vista previa del contrato */}
      <Card className="border-2 shadow">
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Vista previa del contrato</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap text-sm max-h-96 overflow-y-auto">
              {contract}
            </pre>
          </div>
          <div className="mt-4 flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigator.clipboard.writeText(contract)}
            >
              Copiar contrato
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          type="submit"
          className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
        >
          Generar Contrato
        </Button>
      </div>
    </form>
  );
}
