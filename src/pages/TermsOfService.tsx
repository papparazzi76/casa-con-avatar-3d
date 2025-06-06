
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const TermsOfService = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container py-12 md:py-16">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Términos de Servicio</h1>
            <p className="text-muted-foreground mb-6">Última actualización: 20 de mayo de 2025</p>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">1. Objeto</h2>
              <p className="mb-4">
                Estos Términos de Servicio (en adelante, los «Términos») regulan el acceso y uso de la plataforma Suite Inmobiliaria 
                (la «Plataforma») y de los servicios gratuitos ofrecidos a través de proptools.iadomus.com, así como las relaciones 
                entre la Plataforma y los usuarios particulares registrados (el «Usuario»).
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">2. Aceptación de los Términos</h2>
              <p className="mb-4">
                El registro y/o uso de la Plataforma implica la aceptación plena y sin reservas de estos Términos y de la Política de Privacidad. 
                Si no está de acuerdo, el Usuario debe abstenerse de utilizar la Plataforma.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">3. Descripción de los Servicios</h2>
              <p className="mb-4">La Plataforma ofrece, sin carácter limitativo, los siguientes servicios asistidos por IA:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Elaboración de anuncios.</li>
                <li>Editor de imágenes y home staging virtual.</li>
                <li>Redacción de contratos de venta y alquiler.</li>
                <li>Resolución de dudas sobre legislación inmobiliaria.</li>
                <li>Valoración de inmuebles.</li>
                <li>Creación de posts para redes sociales.</li>
                <li>Asesor inmobiliario virtual.</li>
              </ul>
              <p className="mb-4">La Plataforma podrá añadir, modificar o eliminar servicios en cualquier momento.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">4. Registro y Cuenta</h2>
              <p className="mb-4">
                El Usuario se compromete a facilitar datos veraces, completos y actualizados. El Usuario es responsable de la 
                confidencialidad de sus credenciales y de todas las actividades realizadas bajo su cuenta. Cualquier uso no 
                autorizado deberá comunicarse inmediatamente a la Plataforma.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">5. Uso Aceptable</h2>
              <p className="mb-4">Queda prohibido:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Utilizar la Plataforma con fines ilícitos, fraudulentos o lesivos.</li>
                <li>Infringir derechos de terceros.</li>
                <li>Realizar scraping automatizado fuera de los endpoints API documentados.</li>
                <li>Introducir malware, spam o contenido ofensivo.</li>
                <li>Burlar medidas de seguridad o límites de tasa.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">6. Propiedad Intelectual</h2>
              <p className="mb-4">
                El software, las marcas, logotipos, diseños, avatares, textos y demás contenidos propios de la Plataforma están 
                protegidos por derechos de propiedad intelectual e industrial titularidad de la Plataforma o de sus licenciantes. 
                Se concede al Usuario una licencia de uso limitada, no exclusiva e intransferible, exclusivamente para acceder y 
                utilizar los servicios conforme a estos Términos.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">7. Contenido del Usuario y Licencia</h2>
              <p className="mb-4">
                El Usuario conserva la titularidad del contenido que aporte, pero concede a la Plataforma una licencia mundial, 
                no exclusiva y gratuita para alojar, procesar, reproducir y transformar dicho contenido con el fin de prestar los 
                servicios contratados. El Usuario garantiza que dispone de los derechos necesarios sobre dicho contenido.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">8. Disponibilidad y Cambios</h2>
              <p className="mb-4">
                La Plataforma se presta «tal cual» y «según disponibilidad». Podemos suspender o interrumpir total o parcialmente 
                los servicios por motivos técnicos, mantenimiento o fuerza mayor, sin que ello genere indemnización alguna.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">9. Exención de Garantías</h2>
              <p className="mb-4">
                La Plataforma realiza esfuerzos razonables para que los resultados generados por la IA sean precisos, pero no 
                garantiza la veracidad, exhaustividad ni idoneidad de dichos resultados. Los servicios de valoración, asesoramiento 
                o redacción contractual tienen carácter informativo y no constituyen asesoramiento profesional legal o financiero.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">10. Limitación de Responsabilidad</h2>
              <p className="mb-4">
                La Plataforma no será responsable por daños indirectos, lucro cesante o pérdida de datos derivados del uso o 
                incapacidad de uso de los servicios, salvo en casos de dolo o culpa grave. En ningún caso la responsabilidad 
                total acumulada excederá de cien (100) euros.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">11. Indemnización</h2>
              <p className="mb-4">
                El Usuario se compromete a indemnizar y mantener indemne a la Plataforma frente a reclamaciones de terceros 
                derivadas del incumplimiento de estos Términos o de la legislación aplicable.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">12. Duración y Terminación</h2>
              <p className="mb-4">
                El contrato es de duración indefinida. El Usuario puede cancelar su cuenta en cualquier momento desde la 
                configuración o solicitándolo por correo. La Plataforma podrá suspender o eliminar la cuenta ante infracciones 
                graves o reiteradas.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">13. Fuerza Mayor</h2>
              <p className="mb-4">
                Ninguna de las partes será responsable de incumplimientos debidos a causas fuera de su control razonable, 
                incluyendo pero no limitado a desastres naturales, cortes de energía o fallos de proveedores de servicios cloud.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">14. Legislación Aplicable y Jurisdicción</h2>
              <p className="mb-4">
                Los presentes Términos se rigen por la legislación española. Para la resolución de controversias, las partes 
                se someten a los Juzgados y Tribunales de Valladolid, salvo que la normativa de consumo establezca otro fuero imperativo.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">15. Resolución Alternativa de Conflictos</h2>
              <p className="mb-4">
                En caso de conflicto, el Usuario puede acudir a la plataforma europea de resolución de litigios en línea: 
                <a href="https://ec.europa.eu/consumers/odr" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  https://ec.europa.eu/consumers/odr
                </a>.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">16. Modificaciones de los Términos</h2>
              <p className="mb-4">
                La Plataforma podrá modificar estos Términos. Los cambios se publicarán en la web y, si son sustanciales, 
                se notificarán por e‑mail con al menos 30 días de antelación. El uso continuado tras la entrada en vigor 
                implicará aceptación de las nuevas condiciones.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">17. Contacto</h2>
              <p className="mb-4">
                Para cualquier consulta relacionada con estos Términos, puede contactarnos en 
                <a href="mailto:proptools@iadomus.com" className="text-primary hover:underline ml-1">
                  proptools@iadomus.com
                </a>.
              </p>
            </section>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
