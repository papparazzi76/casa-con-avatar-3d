
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Política de Privacidad</h1>
            <p className="text-muted-foreground mb-6">Última actualización: 6 de junio de 2025</p>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Responsable del tratamiento</h2>
              <p className="mb-4">
                Arca Grupo Carranza S.L. (en adelante, «la Plataforma»), con domicilio social en Valladolid (España) 
                y correo de contacto inmo@arcasl.es, es el responsable del tratamiento de los datos personales que el 
                usuario facilita a través de la web y sus aplicaciones asociadas.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Datos que recopilamos</h2>
              <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4">Categoría</th>
                      <th className="text-left py-2 px-4">Detalles</th>
                      <th className="text-left py-2 px-4">Finalidad</th>
                      <th className="text-left py-2 px-4">Base jurídica</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4">Datos de registro</td>
                      <td className="py-2 px-4">Nombre, e‑mail, contraseña (hash)</td>
                      <td className="py-2 px-4">Crear y gestionar la cuenta de usuario</td>
                      <td className="py-2 px-4">Ejecución de contrato (art. 6.1.b RGPD)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Datos de perfil inmobiliario</td>
                      <td className="py-2 px-4">Dirección del inmueble, m², fotos, precio, características</td>
                      <td className="py-2 px-4">Prestación de servicios: anuncios, valoración, homestaging, asesoramiento</td>
                      <td className="py-2 px-4">Ejecución de contrato</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Contenido generado por el usuario</td>
                      <td className="py-2 px-4">Prompts, mensajes de chat, contratos, imágenes editadas</td>
                      <td className="py-2 px-4">Funcionamiento de los servicios respaldados por IA</td>
                      <td className="py-2 px-4">Ejecución de contrato</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Datos técnicos</td>
                      <td className="py-2 px-4">IP, tipo de dispositivo/navegador, logs, cookies</td>
                      <td className="py-2 px-4">Seguridad, prevención de fraude, analítica</td>
                      <td className="py-2 px-4">Interés legítimo (art. 6.1.f RGPD)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Datos para compartir/comercializar</td>
                      <td className="py-2 px-4">Nombre, e‑mail, datos demográficos básicos (ciudad, edad), preferencias de uso, historial de anuncios y visitas a inmuebles</td>
                      <td className="py-2 px-4">Compartir y comercializar datos con terceros (p. ej., socios de marketing, broker de datos)</td>
                      <td className="py-2 px-4">Consentimiento explícito del usuario (art. 6.1.a RGPD)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <h4 className="font-medium text-blue-800 mb-2">Cambios principales:</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Se ha añadido la fila "Datos para compartir/comercializar" para recoger la categoría de datos que, con el consentimiento expreso del usuario, podrán ser transmitidos a terceros con fines comerciales o de análisis.</li>
                  <li>• La base jurídica para esta nueva finalidad es el consentimiento explícito del usuario, tal como exige el art. 6.1.a del RGPD.</li>
                </ul>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Cómo obtenemos los datos</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Directamente del usuario a través de formularios y chats.</li>
                <li>De proveedores externos cuando se autorizan (por ejemplo, fotos o comparables de portales inmobiliarios).</li>
                <li>De terceros colaboradores (socios de marketing, brokers de datos), siempre que el usuario haya dado su consentimiento expreso para compartir o comercializar sus datos.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Finalidades del tratamiento</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Facilitar el uso de cada servicio (creación de anuncios, homestaging, contratación, etc.).</li>
                <li>Proporcionar asistencia y soporte al usuario.</li>
                <li>Mejorar y mantener la Plataforma (métricas, UX, seguridad).</li>
                <li>Enviar comunicaciones operativas y, previo consentimiento, comerciales.</li>
                <li>Compartir y comercializar datos con terceros colaboradores (socios de marketing, brokers de datos, agencias publicitarias, etc.), únicamente si el usuario ha concedido su consentimiento específico para ello.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Conservación de los datos</h2>
              <p className="mb-4">
                Conservamos los datos mientras la cuenta esté activa y, tras su cancelación, durante los plazos legales 
                para atender posibles responsabilidades (máximo 5 años).
              </p>
              <p className="mb-4">
                Las imágenes enviadas al editor se eliminan automáticamente tras 90 días salvo que el usuario las guarde en su biblioteca.
              </p>
              <p className="mb-4">
                Los datos compartidos/comercializados se conservarán mientras el usuario mantenga su consentimiento específico para la cesión. Si el usuario revoca ese consentimiento, procederemos a su supresión o anonimización en un plazo máximo de 30 días.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Destinatarios y transferencias internacionales</h2>
              <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4">Destinatario/Proveedor</th>
                      <th className="text-left py-2 px-4">Servicio</th>
                      <th className="text-left py-2 px-4">Ubicación</th>
                      <th className="text-left py-2 px-4">Garantías</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4">OpenAI, L.L.C.</td>
                      <td className="py-2 px-4">Procesamiento de IA (GPT‑4o, DALL·E 3)</td>
                      <td className="py-2 px-4">EE. UU.</td>
                      <td className="py-2 px-4">Cláusulas contractuales tipo (2021/914/UE)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Supabase Inc.</td>
                      <td className="py-2 px-4">Base de datos y almacenamiento</td>
                      <td className="py-2 px-4">UE (Irlanda)</td>
                      <td className="py-2 px-4">Adherido a Data Processing Addendum</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Vercel Inc.</td>
                      <td className="py-2 px-4">Hosting y Edge Functions</td>
                      <td className="py-2 px-4">EE. UU./UE</td>
                      <td className="py-2 px-4">SCC + medidas adicionales</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Agencias de marketing autorizadas</td>
                      <td className="py-2 px-4">Recepción de datos para campañas segmentadas</td>
                      <td className="py-2 px-4">UE (diferentes países) / EE. UU.</td>
                      <td className="py-2 px-4">Consentimiento del usuario + Cláusulas Contractuales Tipo (si procede)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Brokers de datos autorizados</td>
                      <td className="py-2 px-4">Procesamiento, agregación y venta de datos (anonimizados o pseudonimizados)</td>
                      <td className="py-2 px-4">UE / EE. UU.</td>
                      <td className="py-2 px-4">Consentimiento del usuario + Cláusulas Contractuales Tipo</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Socios publicitarios</td>
                      <td className="py-2 px-4">Elaboración de perfiles y segmentación publicitaria</td>
                      <td className="py-2 px-4">UE / EE. UU.</td>
                      <td className="py-2 px-4">Consentimiento del usuario + Cláusulas Contractuales Tipo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mb-4">
                Ninguna otra transferencia o cesión fuera del EEE se hará sin adoptar garantías adecuadas (por ejemplo, cláusulas contractuales tipo).
              </p>
              <p className="mb-4">
                Si el usuario autoriza compartir con un tercero ubicado fuera del EEE, se informará al usuario de ello y se facilitarán las garantías correspondientes (SCC, Binding Corporate Rules u otras medidas exigidas por la AEPD).
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Derechos de los usuarios</h2>
              <p className="mb-4">El usuario puede ejercer en cualquier momento:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Acceso a sus datos.</li>
                <li>Rectificación de datos inexactos.</li>
                <li>Supresión ("derecho al olvido").</li>
                <li>Limitación del tratamiento.</li>
                <li>Portabilidad de sus datos.</li>
                <li>Oposición al tratamiento.</li>
                <li>Revocar el consentimiento prestado para compartir o comercializar sus datos; en tal caso, procederemos a eliminar sus datos de las bases de los terceros receptores en un plazo máximo de 30 días.</li>
              </ul>
              <p>
                Para ello, basta con enviar una solicitud a privacy@suiteinmobiliaria.com acreditando la identidad. 
                Asimismo, puede presentar reclamación ante la AEPD (www.aepd.es).
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Seguridad</h2>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Aplicamos cifrado TLS/HTTPS en todas las comunicaciones.</li>
                <li>Almacenamiento cifrado en reposo.</li>
                <li>Control de acceso basado en roles.</li>
                <li>Auditorías internas periódicas y pruebas de penetración.</li>
                <li>Los terceros que reciban datos (agencias, brokers, etc.) deberán cumplir con estándares equivalentes de seguridad y firmar acuerdos de confidencialidad y protección de datos.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Cookies</h2>
              <p className="mb-4">
                Usamos cookies propias y de terceros para autenticación, preferencias y analítica. El banner de cookies 
                permite aceptar, rechazar o configurar las categorías. Para más detalle, véase nuestra Política de Cookies.
              </p>
              <p className="mb-4">
                Si el usuario no consiente el uso de cookies de marketing o analíticas, no se compartirá ninguna información de navegación con terceros.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Menores de edad</h2>
              <p>
                La Plataforma no está dirigida a menores de 18 años. Si detectamos registros de menores, eliminaremos 
                la cuenta y los datos asociados.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Cambios en la política</h2>
              <p className="mb-4">
                Publicaremos las modificaciones en esta página.
              </p>
              <p className="mb-4">
                Si los cambios afectan a la cesión o comercialización de datos (por ejemplo, nuevos destinatarios o finalidades), notificaremos a todos los usuarios con, al menos, 30 días de antelación.
              </p>
              <p className="mb-4">
                El usuario podrá revocar su consentimiento o ejercer cualquiera de sus derechos en cualquier momento, incluido el de exclusión de futuras cesiones.
              </p>
            </section>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
