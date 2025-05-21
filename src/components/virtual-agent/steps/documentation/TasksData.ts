
export interface Task {
  id: string;
  title: string;
  mandatory: boolean;
  expires: boolean;
  validity_days?: number;
  validity_years?: number;
  status: "pending" | "in_progress" | "done" | "n_a";
  upload: boolean;
  notes: string;
}

export const tasks: Task[] = [
  {
    id: "dni",
    title: "DNI / NIE vigente de todos los propietarios",
    mandatory: true,
    expires: false,
    status: "pending",
    upload: true,
    notes: ""
  },
  {
    id: "escritura",
    title: "Título de propiedad (escritura)",
    mandatory: true,
    expires: false,
    status: "pending",
    upload: true,
    notes: ""
  },
  {
    id: "nota_simple",
    title: "Nota simple registral < 90 días",
    mandatory: true,
    expires: true,
    validity_days: 90,
    status: "pending",
    upload: true,
    notes: "Solicítala online en el Colegio de Registradores"
  },
  {
    id: "ibi",
    title: "Último recibo del IBI",
    mandatory: true,
    expires: true,
    validity_days: 365,
    status: "pending",
    upload: true,
    notes: ""
  },
  {
    id: "comunidad",
    title: "Certificado de deuda con la comunidad",
    mandatory: true,
    expires: true,
    validity_days: 30,
    status: "pending",
    upload: true,
    notes: "Pídelo al administrador de fincas"
  },
  {
    id: "cee",
    title: "Certificado de Eficiencia Energética (CEE)",
    mandatory: true,
    expires: true,
    validity_years: 10,
    status: "pending",
    upload: true,
    notes: "Adjunta etiqueta y registro autonómico"
  },
  {
    id: "ite",
    title: "Inspección Técnica de Edificios (ITE) si > 45 años",
    mandatory: false,
    expires: true,
    validity_years: 10,
    status: "n_a",
    upload: true,
    notes: ""
  },
  {
    id: "cedula",
    title: "Cédula de habitabilidad (según CCAA)",
    mandatory: false,
    expires: true,
    validity_years: 15,
    status: "n_a",
    upload: true,
    notes: ""
  }
];
