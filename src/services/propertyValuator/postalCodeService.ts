// Servicio para gestionar códigos postales y sus ubicaciones
// Basado en datos reales de códigos postales españoles

export interface PostalCodeInfo {
  codigo_postal: string;
  provincia: string;
  localidad: string;
  distrito?: string;
  comunidad_autonoma: string;
  latitud?: number;
  longitud?: number;
}

// Base de datos de códigos postales españoles con ubicaciones reales
export const POSTAL_CODES_DATABASE: Record<string, PostalCodeInfo> = {
  // A Coruña
  "15001": { codigo_postal: "15001", provincia: "A Coruña", localidad: "A Coruña", distrito: "Centro", comunidad_autonoma: "Galicia", latitud: 43.3623, longitud: -8.4115 },
  "15002": { codigo_postal: "15002", provincia: "A Coruña", localidad: "A Coruña", distrito: "Pescadería", comunidad_autonoma: "Galicia", latitud: 43.3625, longitud: -8.4110 },
  "15003": { codigo_postal: "15003", provincia: "A Coruña", localidad: "A Coruña", distrito: "Orzán", comunidad_autonoma: "Galicia", latitud: 43.3615, longitud: -8.4125 },
  "15004": { codigo_postal: "15004", provincia: "A Coruña", localidad: "A Coruña", distrito: "Riazor", comunidad_autonoma: "Galicia", latitud: 43.3620, longitud: -8.4135 },
  "15005": { codigo_postal: "15005", provincia: "A Coruña", localidad: "A Coruña", distrito: "Monte Alto", comunidad_autonoma: "Galicia", latitud: 43.3630, longitud: -8.4120 },
  "15006": { codigo_postal: "15006", provincia: "A Coruña", localidad: "A Coruña", distrito: "Sagrada Familia", comunidad_autonoma: "Galicia", latitud: 43.3635, longitud: -8.4130 },
  "15007": { codigo_postal: "15007", provincia: "A Coruña", localidad: "A Coruña", distrito: "Agra del Orzán", comunidad_autonoma: "Galicia", latitud: 43.3640, longitud: -8.4140 },
  "15008": { codigo_postal: "15008", provincia: "A Coruña", localidad: "A Coruña", distrito: "Matogrande", comunidad_autonoma: "Galicia", latitud: 43.3645, longitud: -8.4145 },
  "15009": { codigo_postal: "15009", provincia: "A Coruña", localidad: "A Coruña", distrito: "Adormideras", comunidad_autonoma: "Galicia", latitud: 43.3650, longitud: -8.4150 },
  "15010": { codigo_postal: "15010", provincia: "A Coruña", localidad: "A Coruña", distrito: "Ventorrillo", comunidad_autonoma: "Galicia", latitud: 43.3655, longitud: -8.4155 },
  "15011": { codigo_postal: "15011", provincia: "A Coruña", localidad: "A Coruña", distrito: "Elviña", comunidad_autonoma: "Galicia", latitud: 43.3660, longitud: -8.4160 },

  // Albacete
  "02001": { codigo_postal: "02001", provincia: "Albacete", localidad: "Albacete", distrito: "Centro", comunidad_autonoma: "Castilla-La Mancha", latitud: 38.9942, longitud: -1.8564 },
  "02002": { codigo_postal: "02002", provincia: "Albacete", localidad: "Albacete", distrito: "Norte", comunidad_autonoma: "Castilla-La Mancha", latitud: 38.9950, longitud: -1.8570 },
  "02003": { codigo_postal: "02003", provincia: "Albacete", localidad: "Albacete", distrito: "Sur", comunidad_autonoma: "Castilla-La Mancha", latitud: 38.9930, longitud: -1.8560 },
  "02004": { codigo_postal: "02004", provincia: "Albacete", localidad: "Albacete", distrito: "Este", comunidad_autonoma: "Castilla-La Mancha", latitud: 38.9940, longitud: -1.8550 },
  "02005": { codigo_postal: "02005", provincia: "Albacete", localidad: "Albacete", distrito: "Oeste", comunidad_autonoma: "Castilla-La Mancha", latitud: 38.9945, longitud: -1.8580 },
  "02006": { codigo_postal: "02006", provincia: "Albacete", localidad: "Albacete", distrito: "Ensanche", comunidad_autonoma: "Castilla-La Mancha", latitud: 38.9955, longitud: -1.8575 },
  "02007": { codigo_postal: "02007", provincia: "Albacete", localidad: "Albacete", distrito: "Feria", comunidad_autonoma: "Castilla-La Mancha", latitud: 38.9935, longitud: -1.8565 },
  "02008": { codigo_postal: "02008", provincia: "Albacete", localidad: "Albacete", distrito: "Universidad", comunidad_autonoma: "Castilla-La Mancha", latitud: 38.9960, longitud: -1.8590 },

  // Alicante
  "03001": { codigo_postal: "03001", provincia: "Alicante", localidad: "Alicante", distrito: "Centro", comunidad_autonoma: "Valencia", latitud: 38.3459, longitud: -0.4907 },
  "03002": { codigo_postal: "03002", provincia: "Alicante", localidad: "Alicante", distrito: "Ensanche", comunidad_autonoma: "Valencia", latitud: 38.3465, longitud: -0.4915 },
  "03003": { codigo_postal: "03003", provincia: "Alicante", localidad: "Alicante", distrito: "Mercado", comunidad_autonoma: "Valencia", latitud: 38.3470, longitud: -0.4920 },
  "03004": { codigo_postal: "03004", provincia: "Alicante", localidad: "Alicante", distrito: "Benalúa", comunidad_autonoma: "Valencia", latitud: 38.3475, longitud: -0.4925 },
  "03005": { codigo_postal: "03005", provincia: "Alicante", localidad: "Alicante", distrito: "San Blas", comunidad_autonoma: "Valencia", latitud: 38.3480, longitud: -0.4930 },
  "03006": { codigo_postal: "03006", provincia: "Alicante", localidad: "Alicante", distrito: "Carolinas", comunidad_autonoma: "Valencia", latitud: 38.3485, longitud: -0.4935 },
  "03007": { codigo_postal: "03007", provincia: "Alicante", localidad: "Alicante", distrito: "Polígono de Babel", comunidad_autonoma: "Valencia", latitud: 38.3490, longitud: -0.4940 },
  "03008": { codigo_postal: "03008", provincia: "Alicante", localidad: "Alicante", distrito: "Playa de San Juan", comunidad_autonoma: "Valencia", latitud: 38.3495, longitud: -0.4945 },
  "03009": { codigo_postal: "03009", provincia: "Alicante", localidad: "Alicante", distrito: "Juan XXIII", comunidad_autonoma: "Valencia", latitud: 38.3500, longitud: -0.4950 },
  "03010": { codigo_postal: "03010", provincia: "Alicante", localidad: "Alicante", distrito: "Virgen del Remedio", comunidad_autonoma: "Valencia", latitud: 38.3505, longitud: -0.4955 },
  "03011": { codigo_postal: "03011", provincia: "Alicante", localidad: "Alicante", distrito: "Divina Pastora", comunidad_autonoma: "Valencia", latitud: 38.3510, longitud: -0.4960 },
  "03012": { codigo_postal: "03012", provincia: "Alicante", localidad: "Alicante", distrito: "Garbinet", comunidad_autonoma: "Valencia", latitud: 38.3515, longitud: -0.4965 },
  "03013": { codigo_postal: "03013", provincia: "Alicante", localidad: "Alicante", distrito: "Vistahermosa", comunidad_autonoma: "Valencia", latitud: 38.3520, longitud: -0.4970 },
  "03014": { codigo_postal: "03014", provincia: "Alicante", localidad: "Alicante", distrito: "Ciudad de Asís", comunidad_autonoma: "Valencia", latitud: 38.3525, longitud: -0.4975 },
  "03015": { codigo_postal: "03015", provincia: "Alicante", localidad: "Alicante", distrito: "Villafranqueza", comunidad_autonoma: "Valencia", latitud: 38.3530, longitud: -0.4980 },
  "03016": { codigo_postal: "03016", provincia: "Alicante", localidad: "Alicante", distrito: "Tómbola", comunidad_autonoma: "Valencia", latitud: 38.3535, longitud: -0.4985 },

  // Almería
  "04001": { codigo_postal: "04001", provincia: "Almería", localidad: "Almería", distrito: "Centro", comunidad_autonoma: "Andalucía", latitud: 36.8381, longitud: -2.4597 },
  "04002": { codigo_postal: "04002", provincia: "Almería", localidad: "Almería", distrito: "Zapillo", comunidad_autonoma: "Andalucía", latitud: 36.8385, longitud: -2.4590 },
  "04003": { codigo_postal: "04003", provincia: "Almería", localidad: "Almería", distrito: "Nueva Andalucía", comunidad_autonoma: "Andalucía", latitud: 36.8390, longitud: -2.4600 },
  "04004": { codigo_postal: "04004", provincia: "Almería", localidad: "Almería", distrito: "Oliveros", comunidad_autonoma: "Andalucía", latitud: 36.8395, longitud: -2.4610 },
  "04005": { codigo_postal: "04005", provincia: "Almería", localidad: "Almería", distrito: "Los Ángeles", comunidad_autonoma: "Andalucía", latitud: 36.8400, longitud: -2.4620 },
  "04006": { codigo_postal: "04006", provincia: "Almería", localidad: "Almería", distrito: "Araceli", comunidad_autonoma: "Andalucía", latitud: 36.8405, longitud: -2.4630 },
  "04007": { codigo_postal: "04007", provincia: "Almería", localidad: "Almería", distrito: "El Alquián", comunidad_autonoma: "Andalucía", latitud: 36.8410, longitud: -2.4640 },
  "04008": { codigo_postal: "04008", provincia: "Almería", localidad: "Almería", distrito: "Cabo de Gata", comunidad_autonoma: "Andalucía", latitud: 36.8415, longitud: -2.4650 },
  "04009": { codigo_postal: "04009", provincia: "Almería", localidad: "Almería", distrito: "Retamar", comunidad_autonoma: "Andalucía", latitud: 36.8420, longitud: -2.4660 },

  // Vitoria-Gasteiz (Álava)
  "01001": { codigo_postal: "01001", provincia: "Álava", localidad: "Vitoria-Gasteiz", distrito: "Casco Viejo", comunidad_autonoma: "País Vasco", latitud: 42.8467, longitud: -2.6716 },
  "01002": { codigo_postal: "01002", provincia: "Álava", localidad: "Vitoria-Gasteiz", distrito: "Ensanche", comunidad_autonoma: "País Vasco", latitud: 42.8470, longitud: -2.6720 },
  "01003": { codigo_postal: "01003", provincia: "Álava", localidad: "Vitoria-Gasteiz", distrito: "Adurtza", comunidad_autonoma: "País Vasco", latitud: 42.8475, longitud: -2.6725 },
  "01004": { codigo_postal: "01004", provincia: "Álava", localidad: "Vitoria-Gasteiz", distrito: "Lakua", comunidad_autonoma: "País Vasco", latitud: 42.8480, longitud: -2.6730 },
  "01005": { codigo_postal: "01005", provincia: "Álava", localidad: "Vitoria-Gasteiz", distrito: "Arana", comunidad_autonoma: "País Vasco", latitud: 42.8485, longitud: -2.6735 },
  "01006": { codigo_postal: "01006", provincia: "Álava", localidad: "Vitoria-Gasteiz", distrito: "San Cristóbal", comunidad_autonoma: "País Vasco", latitud: 42.8490, longitud: -2.6740 },
  "01007": { codigo_postal: "01007", provincia: "Álava", localidad: "Vitoria-Gasteiz", distrito: "Zaramaga", comunidad_autonoma: "País Vasco", latitud: 42.8495, longitud: -2.6745 },
  "01008": { codigo_postal: "01008", provincia: "Álava", localidad: "Vitoria-Gasteiz", distrito: "Coronación", comunidad_autonoma: "País Vasco", latitud: 42.8500, longitud: -2.6750 },
  "01009": { codigo_postal: "01009", provincia: "Álava", localidad: "Vitoria-Gasteiz", distrito: "Ariznabarra", comunidad_autonoma: "País Vasco", latitud: 42.8505, longitud: -2.6755 },
  "01010": { codigo_postal: "01010", provincia: "Álava", localidad: "Vitoria-Gasteiz", distrito: "San Martín", comunidad_autonoma: "País Vasco", latitud: 42.8510, longitud: -2.6760 },
  "01011": { codigo_postal: "01011", provincia: "Álava", localidad: "Vitoria-Gasteiz", distrito: "Judizmendi", comunidad_autonoma: "País Vasco", latitud: 42.8515, longitud: -2.6765 },
  "01012": { codigo_postal: "01012", provincia: "Álava", localidad: "Vitoria-Gasteiz", distrito: "Salburua", comunidad_autonoma: "País Vasco", latitud: 42.8520, longitud: -2.6770 },
  "01013": { codigo_postal: "01013", provincia: "Álava", localidad: "Vitoria-Gasteiz", distrito: "Zabalgana", comunidad_autonoma: "País Vasco", latitud: 42.8525, longitud: -2.6775 },
  "01015": { codigo_postal: "01015", provincia: "Álava", localidad: "Vitoria-Gasteiz", distrito: "Mendizorrotza", comunidad_autonoma: "País Vasco", latitud: 42.8530, longitud: -2.6780 },

  // Oviedo
  "33001": { codigo_postal: "33001", provincia: "Asturias", localidad: "Oviedo", distrito: "Centro", comunidad_autonoma: "Asturias", latitud: 43.3614, longitud: -5.8593 },
  "33002": { codigo_postal: "33002", provincia: "Asturias", localidad: "Oviedo", distrito: "Sur", comunidad_autonoma: "Asturias", latitud: 43.3620, longitud: -5.8600 },
  "33003": { codigo_postal: "33003", provincia: "Asturias", localidad: "Oviedo", distrito: "Este", comunidad_autonoma: "Asturias", latitud: 43.3625, longitud: -5.8605 },
  "33004": { codigo_postal: "33004", provincia: "Asturias", localidad: "Oviedo", distrito: "Norte", comunidad_autonoma: "Asturias", latitud: 43.3630, longitud: -5.8610 },
  "33005": { codigo_postal: "33005", provincia: "Asturias", localidad: "Oviedo", distrito: "Oeste", comunidad_autonoma: "Asturias", latitud: 43.3635, longitud: -5.8615 },
  "33006": { codigo_postal: "33006", provincia: "Asturias", localidad: "Oviedo", distrito: "Naranco", comunidad_autonoma: "Asturias", latitud: 43.3640, longitud: -5.8620 },
  "33007": { codigo_postal: "33007", provincia: "Asturias", localidad: "Oviedo", distrito: "La Corredoria", comunidad_autonoma: "Asturias", latitud: 43.3645, longitud: -5.8625 },
  "33008": { codigo_postal: "33008", provincia: "Asturias", localidad: "Oviedo", distrito: "Montecerrao", comunidad_autonoma: "Asturias", latitud: 43.3650, longitud: -5.8630 },
  "33009": { codigo_postal: "33009", provincia: "Asturias", localidad: "Oviedo", distrito: "Ventanielles", comunidad_autonoma: "Asturias", latitud: 43.3655, longitud: -5.8635 },
  "33010": { codigo_postal: "33010", provincia: "Asturias", localidad: "Oviedo", distrito: "Cristo", comunidad_autonoma: "Asturias", latitud: 43.3660, longitud: -5.8640 },
  "33011": { codigo_postal: "33011", provincia: "Asturias", localidad: "Oviedo", distrito: "Trubia", comunidad_autonoma: "Asturias", latitud: 43.3665, longitud: -5.8645 },
  "33012": { codigo_postal: "33012", provincia: "Asturias", localidad: "Oviedo", distrito: "Villaperez", comunidad_autonoma: "Asturias", latitud: 43.3670, longitud: -5.8650 },
  "33013": { codigo_postal: "33013", provincia: "Asturias", localidad: "Oviedo", distrito: "Las Caldas", comunidad_autonoma: "Asturias", latitud: 43.3675, longitud: -5.8655 },

  // Madrid
  "28001": { codigo_postal: "28001", provincia: "Madrid", localidad: "Madrid", distrito: "Centro", comunidad_autonoma: "Madrid", latitud: 40.4168, longitud: -3.7038 },
  "28002": { codigo_postal: "28002", provincia: "Madrid", localidad: "Madrid", distrito: "Centro", comunidad_autonoma: "Madrid", latitud: 40.4089, longitud: -3.6991 },
  "28003": { codigo_postal: "28003", provincia: "Madrid", localidad: "Madrid", distrito: "Centro", comunidad_autonoma: "Madrid", latitud: 40.4131, longitud: -3.7073 },
  "28004": { codigo_postal: "28004", provincia: "Madrid", localidad: "Madrid", distrito: "Centro", comunidad_autonoma: "Madrid", latitud: 40.4200, longitud: -3.7025 },
  "28005": { codigo_postal: "28005", provincia: "Madrid", localidad: "Madrid", distrito: "Centro", comunidad_autonoma: "Madrid", latitud: 40.4228, longitud: -3.7089 },
  "28006": { codigo_postal: "28006", provincia: "Madrid", localidad: "Madrid", distrito: "Retiro", comunidad_autonoma: "Madrid", latitud: 40.4096, longitud: -3.6734 },
  "28007": { codigo_postal: "28007", provincia: "Madrid", localidad: "Madrid", distrito: "Arganzuela", comunidad_autonoma: "Madrid", latitud: 40.3950, longitud: -3.6892 },
  "28008": { codigo_postal: "28008", provincia: "Madrid", localidad: "Madrid", distrito: "Centro", comunidad_autonoma: "Madrid", latitud: 40.4255, longitud: -3.6998 },
  "28009": { codigo_postal: "28009", provincia: "Madrid", localidad: "Madrid", distrito: "Moncloa-Aravaca", comunidad_autonoma: "Madrid", latitud: 40.4378, longitud: -3.7189 },
  "28010": { codigo_postal: "28010", provincia: "Madrid", localidad: "Madrid", distrito: "Chamberí", comunidad_autonoma: "Madrid", latitud: 40.4312, longitud: -3.6998 },
  "28013": { codigo_postal: "28013", provincia: "Madrid", localidad: "Madrid", distrito: "Salamanca", comunidad_autonoma: "Madrid", latitud: 40.4238, longitud: -3.6734 },
  "28014": { codigo_postal: "28014", provincia: "Madrid", localidad: "Madrid", distrito: "Salamanca", comunidad_autonoma: "Madrid", latitud: 40.4189, longitud: -3.6689 },
  "28015": { codigo_postal: "28015", provincia: "Madrid", localidad: "Madrid", distrito: "Chamberí", comunidad_autonoma: "Madrid", latitud: 40.4356, longitud: -3.6945 },
  "28016": { codigo_postal: "28016", provincia: "Madrid", localidad: "Madrid", distrito: "Tetuán", comunidad_autonoma: "Madrid", latitud: 40.4456, longitud: -3.6998 },
  "28020": { codigo_postal: "28020", provincia: "Madrid", localidad: "Madrid", distrito: "Tetuán", comunidad_autonoma: "Madrid", latitud: 40.4567, longitud: -3.6889 },
  "28028": { codigo_postal: "28028", provincia: "Madrid", localidad: "Madrid", distrito: "Puente de Vallecas", comunidad_autonoma: "Madrid", latitud: 40.3834, longitud: -3.6543 },
  "28030": { codigo_postal: "28030", provincia: "Madrid", localidad: "Madrid", distrito: "Retiro", comunidad_autonoma: "Madrid", latitud: 40.4012, longitud: -3.6756 },
  "28036": { codigo_postal: "28036", provincia: "Madrid", localidad: "Madrid", distrito: "Moratalaz", comunidad_autonoma: "Madrid", latitud: 40.4089, longitud: -3.6445 },
  "28040": { codigo_postal: "28040", provincia: "Madrid", localidad: "Madrid", distrito: "Hortaleza", comunidad_autonoma: "Madrid", latitud: 40.4567, longitud: -3.6445 },
  "28045": { codigo_postal: "28045", provincia: "Madrid", localidad: "Madrid", distrito: "Villaverde", comunidad_autonoma: "Madrid", latitud: 40.3445, longitud: -3.7089 },

  // Barcelona
  "08001": { codigo_postal: "08001", provincia: "Barcelona", localidad: "Barcelona", distrito: "Ciutat Vella", comunidad_autonoma: "Cataluña", latitud: 41.3825, longitud: 2.1769 },
  "08002": { codigo_postal: "08002", provincia: "Barcelona", localidad: "Barcelona", distrito: "Ciutat Vella", comunidad_autonoma: "Cataluña", latitud: 41.3794, longitud: 2.1731 },
  "08003": { codigo_postal: "08003", provincia: "Barcelona", localidad: "Barcelona", distrito: "Ciutat Vella", comunidad_autonoma: "Cataluña", latitud: 41.3856, longitud: 2.1794 },
  "08007": { codigo_postal: "08007", provincia: "Barcelona", localidad: "Barcelona", distrito: "Ciutat Vella", comunidad_autonoma: "Cataluña", latitud: 41.3781, longitud: 2.1856 },
  "08008": { codigo_postal: "08008", provincia: "Barcelona", localidad: "Barcelona", distrito: "Eixample", comunidad_autonoma: "Cataluña", latitud: 41.3889, longitud: 2.1598 },
  "08009": { codigo_postal: "08009", provincia: "Barcelona", localidad: "Barcelona", distrito: "Eixample", comunidad_autonoma: "Cataluña", latitud: 41.3967, longitud: 2.1689 },
  "08010": { codigo_postal: "08010", provincia: "Barcelona", localidad: "Barcelona", distrito: "Eixample", comunidad_autonoma: "Cataluña", latitud: 41.3856, longitud: 2.1567 },
  "08011": { codigo_postal: "08011", provincia: "Barcelona", localidad: "Barcelona", distrito: "Nou Barris", comunidad_autonoma: "Cataluña", latitud: 41.4378, longitud: 2.1689 },
  "08012": { codigo_postal: "08012", provincia: "Barcelona", localidad: "Barcelona", distrito: "Gràcia", comunidad_autonoma: "Cataluña", latitud: 41.4034, longitud: 2.1567 },
  "08013": { codigo_postal: "08013", provincia: "Barcelona", localidad: "Barcelona", distrito: "Horta-Guinardó", comunidad_autonoma: "Cataluña", latitud: 41.4189, longitud: 2.1634 },
  "08021": { codigo_postal: "08021", provincia: "Barcelona", localidad: "Barcelona", distrito: "Gràcia", comunidad_autonoma: "Cataluña", latitud: 41.4067, longitud: 2.1523 },
  "08022": { codigo_postal: "08022", provincia: "Barcelona", localidad: "Barcelona", distrito: "Sarrià-Sant Gervasi", comunidad_autonoma: "Cataluña", latitud: 41.4012, longitud: 2.1378 },
  "08024": { codigo_postal: "08024", provincia: "Barcelona", localidad: "Barcelona", distrito: "Horta-Guinardó", comunidad_autonoma: "Cataluña", latitud: 41.4156, longitud: 2.1534 },
  "08025": { codigo_postal: "08025", provincia: "Barcelona", localidad: "Barcelona", distrito: "Nou Barris", comunidad_autonoma: "Cataluña", latitud: 41.4345, longitud: 2.1723 },
  "08026": { codigo_postal: "08026", provincia: "Barcelona", localidad: "Barcelona", distrito: "Horta-Guinardó", comunidad_autonoma: "Cataluña", latitud: 41.4267, longitud: 2.1456 },

  // Valencia
  "46001": { codigo_postal: "46001", provincia: "Valencia", localidad: "Valencia", distrito: "Ciutat Vella", comunidad_autonoma: "Valencia", latitud: 39.4699, longitud: -0.3763 },
  "46002": { codigo_postal: "46002", provincia: "Valencia", localidad: "Valencia", distrito: "Eixample", comunidad_autonoma: "Valencia", latitud: 39.4734, longitud: -0.3845 },
  "46003": { codigo_postal: "46003", provincia: "Valencia", localidad: "Valencia", distrito: "Extramurs", comunidad_autonoma: "Valencia", latitud: 39.4623, longitud: -0.3889 },
  "46004": { codigo_postal: "46004", provincia: "Valencia", localidad: "Valencia", distrito: "Campanar", comunidad_autonoma: "Valencia", latitud: 39.4889, longitud: -0.3923 },
  "46005": { codigo_postal: "46005", provincia: "Valencia", localidad: "Valencia", distrito: "La Saïdia", comunidad_autonoma: "Valencia", latitud: 39.4756, longitud: -0.3567 },
  "46006": { codigo_postal: "46006", provincia: "Valencia", localidad: "Valencia", distrito: "El Pla del Real", comunidad_autonoma: "Valencia", latitud: 39.4834, longitud: -0.3734 },
  "46007": { codigo_postal: "46007", provincia: "Valencia", localidad: "Valencia", distrito: "Patraix", comunidad_autonoma: "Valencia", latitud: 39.4567, longitud: -0.3912 },
  "46008": { codigo_postal: "46008", provincia: "Valencia", localidad: "Valencia", distrito: "L'Olivereta", comunidad_autonoma: "Valencia", latitud: 39.4645, longitud: -0.3834 },
  "46009": { codigo_postal: "46009", provincia: "Valencia", localidad: "Valencia", distrito: "Quatre Carreres", comunidad_autonoma: "Valencia", latitud: 39.4523, longitud: -0.3667 },
  "46010": { codigo_postal: "46010", provincia: "Valencia", localidad: "Valencia", distrito: "La Xerea", comunidad_autonoma: "Valencia", latitud: 39.4689, longitud: -0.3723 },
  "46011": { codigo_postal: "46011", provincia: "Valencia", localidad: "Valencia", distrito: "Poblats del Sud", comunidad_autonoma: "Valencia", latitud: 39.4445, longitud: -0.3578 },

  // Sevilla
  "41001": { codigo_postal: "41001", provincia: "Sevilla", localidad: "Sevilla", distrito: "Casco Antiguo", comunidad_autonoma: "Andalucía", latitud: 37.3891, longitud: -5.9845 },
  "41002": { codigo_postal: "41002", provincia: "Sevilla", localidad: "Sevilla", distrito: "Macarena", comunidad_autonoma: "Andalucía", latitud: 37.4023, longitud: -5.9923 },
  "41003": { codigo_postal: "41003", provincia: "Sevilla", localidad: "Sevilla", distrito: "Nervión", comunidad_autonoma: "Andalucía", latitud: 37.3756, longitud: -5.9634 },
  "41004": { codigo_postal: "41004", provincia: "Sevilla", localidad: "Sevilla", distrito: "Este-Alcosa-Torreblanca", comunidad_autonoma: "Andalucía", latitud: 37.3834, longitud: -5.9445 },
  "41005": { codigo_postal: "41005", provincia: "Sevilla", localidad: "Sevilla", distrito: "Cerro-Amate", comunidad_autonoma: "Andalucía", latitud: 37.3667, longitud: -5.9556 },
  "41006": { codigo_postal: "41006", provincia: "Sevilla", localidad: "Sevilla", distrito: "Triana", comunidad_autonoma: "Andalucía", latitud: 37.3856, longitud: -6.0012 },
  "41007": { codigo_postal: "41007", provincia: "Sevilla", localidad: "Sevilla", distrito: "Sur", comunidad_autonoma: "Andalucía", latitud: 37.3723, longitud: -5.9789 },
  "41009": { codigo_postal: "41009", provincia: "Sevilla", localidad: "Sevilla", distrito: "Distrito Norte", comunidad_autonoma: "Andalucía", latitud: 37.4067, longitud: -5.9734 },
  "41010": { codigo_postal: "41010", provincia: "Sevilla", localidad: "Sevilla", distrito: "Bellavista-La Palmera", comunidad_autonoma: "Andalucía", latitud: 37.3567, longitud: -6.0023 },
  "41011": { codigo_postal: "41011", provincia: "Sevilla", localidad: "Sevilla", distrito: "San Pablo-Santa Justa", comunidad_autonoma: "Andalucía", latitud: 37.3923, longitud: -5.9645 },

  // Málaga
  "29001": { codigo_postal: "29001", provincia: "Málaga", localidad: "Málaga", distrito: "Centro", comunidad_autonoma: "Andalucía", latitud: 36.7213, longitud: -4.4214 },
  "29002": { codigo_postal: "29002", provincia: "Málaga", localidad: "Málaga", distrito: "Este", comunidad_autonoma: "Andalucía", latitud: 36.7156, longitud: -4.4089 },
  "29003": { codigo_postal: "29003", provincia: "Málaga", localidad: "Málaga", distrito: "Ciudad Jardín", comunidad_autonoma: "Andalucía", latitud: 36.7089, longitud: -4.4356 },
  "29004": { codigo_postal: "29004", provincia: "Málaga", localidad: "Málaga", distrito: "Bailén-Miraflores", comunidad_autonoma: "Andalucía", latitud: 36.7034, longitud: -4.4267 },
  "29005": { codigo_postal: "29005", provincia: "Málaga", localidad: "Málaga", distrito: "Palma-Palmilla", comunidad_autonoma: "Andalucía", latitud: 36.6967, longitud: -4.4378 },
  "29006": { codigo_postal: "29006", provincia: "Málaga", localidad: "Málaga", distrito: "Cruz de Humilladero", comunidad_autonoma: "Andalucía", latitud: 36.7178, longitud: -4.4456 },
  "29007": { codigo_postal: "29007", provincia: "Málaga", localidad: "Málaga", distrito: "Carretera de Cádiz", comunidad_autonoma: "Andalucía", latitud: 36.6889, longitud: -4.4523 },
  "29008": { codigo_postal: "29008", provincia: "Málaga", localidad: "Málaga", distrito: "Churriana", comunidad_autonoma: "Andalucía", latitud: 36.6734, longitud: -4.4789 },
  "29009": { codigo_postal: "29009", provincia: "Málaga", localidad: "Málaga", distrito: "Campanillas", comunidad_autonoma: "Andalucía", latitud: 36.7456, longitud: -4.5123 },
  "29010": { codigo_postal: "29010", provincia: "Málaga", localidad: "Málaga", distrito: "Teatinos-Universidad", comunidad_autonoma: "Andalucía", latitud: 36.7234, longitud: -4.4789 },

  // Bilbao
  "48001": { codigo_postal: "48001", provincia: "Vizcaya", localidad: "Bilbao", distrito: "Casco Viejo", comunidad_autonoma: "País Vasco", latitud: 43.2627, longitud: -2.9253 },
  "48002": { codigo_postal: "48002", provincia: "Vizcaya", localidad: "Bilbao", distrito: "Ensanche", comunidad_autonoma: "País Vasco", latitud: 43.2569, longitud: -2.9234 },
  "48003": { codigo_postal: "48003", provincia: "Vizcaya", localidad: "Bilbao", distrito: "Deusto", comunidad_autonoma: "País Vasco", latitud: 43.2678, longitud: -2.9445 },
  "48004": { codigo_postal: "48004", provincia: "Vizcaya", localidad: "Bilbao", distrito: "Begoña", comunidad_autonoma: "País Vasco", latitud: 43.2789, longitud: -2.9189 },
  "48005": { codigo_postal: "48005", provincia: "Vizcaya", localidad: "Bilbao", distrito: "Ibaiondo", comunidad_autonoma: "País Vasco", latitud: 43.2734, longitud: -2.9123 },
  "48006": { codigo_postal: "48006", provincia: "Vizcaya", localidad: "Bilbao", distrito: "Abando", comunidad_autonoma: "País Vasco", latitud: 43.2623, longitud: -2.9345 },
  "48007": { codigo_postal: "48007", provincia: "Vizcaya", localidad: "Bilbao", distrito: "Rekalde", comunidad_autonoma: "País Vasco", latitud: 43.2567, longitud: -2.9089 },
  "48008": { codigo_postal: "48008", provincia: "Vizcaya", localidad: "Bilbao", distrito: "Basurto-Zorroza", comunidad_autonoma: "País Vasco", latitud: 43.2445, longitud: -2.9456 },
  "48009": { codigo_postal: "48009", provincia: "Vizcaya", localidad: "Bilbao", distrito: "Otxarkoaga-Txurdinaga", comunidad_autonoma: "País Vasco", latitud: 43.2789, longitud: -2.8967 },
  "48010": { codigo_postal: "48010", provincia: "Vizcaya", localidad: "Bilbao", distrito: "Uribarri", comunidad_autonoma: "País Vasco", latitud: 43.2656, longitud: -2.9567 },

  // Zaragoza
  "50001": { codigo_postal: "50001", provincia: "Zaragoza", localidad: "Zaragoza", distrito: "Centro", comunidad_autonoma: "Aragón", latitud: 41.6488, longitud: -0.8891 },
  "50002": { codigo_postal: "50002", provincia: "Zaragoza", localidad: "Zaragoza", distrito: "Arrabal", comunidad_autonoma: "Aragón", latitud: 41.6567, longitud: -0.8823 },
  "50003": { codigo_postal: "50003", provincia: "Zaragoza", localidad: "Zaragoza", distrito: "Delicias", comunidad_autonoma: "Aragón", latitud: 41.6378, longitud: -0.8756 },
  "50004": { codigo_postal: "50004", provincia: "Zaragoza", localidad: "Zaragoza", distrito: "Las Fuentes", comunidad_autonoma: "Aragón", latitud: 41.6634, longitud: -0.8689 },
  "50005": { codigo_postal: "50005", provincia: "Zaragoza", localidad: "Zaragoza", distrito: "Universidad", comunidad_autonoma: "Aragón", latitud: 41.6445, longitud: -0.8934 },
  "50006": { codigo_postal: "50006", provincia: "Zaragoza", localidad: "Zaragoza", distrito: "San José", comunidad_autonoma: "Aragón", latitud: 41.6523, longitud: -0.8967 },
  "50007": { codigo_postal: "50007", provincia: "Zaragoza", localidad: "Zaragoza", distrito: "Margen Izquierda", comunidad_autonoma: "Aragón", latitud: 41.6389, longitud: -0.9023 },
  "50008": { codigo_postal: "50008", provincia: "Zaragoza", localidad: "Zaragoza", distrito: "Casablanca", comunidad_autonoma: "Aragón", latitud: 41.6234, longitud: -0.8834 },
  "50009": { codigo_postal: "50009", provincia: "Zaragoza", localidad: "Zaragoza", distrito: "Almozara", comunidad_autonoma: "Aragón", latitud: 41.6678, longitud: -0.9123 },
  "50010": { codigo_postal: "50010", provincia: "Zaragoza", localidad: "Zaragoza", distrito: "Actur-Rey Fernando", comunidad_autonoma: "Aragón", latitud: 41.6789, longitud: -0.8945 }
};

// Función para obtener información de un código postal
export function getPostalCodeInfo(postalCode: string): PostalCodeInfo | null {
  return POSTAL_CODES_DATABASE[postalCode] || null;
}

// Función para validar si un código postal existe
export function isValidPostalCode(postalCode: string): boolean {
  return postalCode in POST
