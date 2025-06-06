
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
            <p className="text-muted-foreground mb-6">Última actualización: 20 de mayo de 2025</p>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">1. Responsable del tratamiento</h2>
              <p className="mb-4">
                Arca Grupo Carranza S.L. (en adelante, «la Plataforma»), con domicilio social en Valladolid (España) 
                y correo de contacto inmo@arcasl.es, es el responsable del tratamiento de los datos personales que el 
                usuario facilita a través de la web y sus aplicaciones asociadas.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">2. Datos que recopilamos</h2>
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
                  </tbody>
                </table>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">3. Cómo obtenemos los datos</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Directamente del usuario a través de formularios y chats.</li>
                <li>De proveedores externos cuando se autorizan (por ejemplo, fotos o comparables de portales inmobiliarios).</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">4. Finalidades del tratamiento</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Facilitar el uso de cada servicio (creación de anuncios, homestaging, contratación, etc.).</li>
                <li>Proporcionar asistencia y soporte al usuario.</li>
                <li>Mejorar y mantener la Plataforma (métricas, UX, seguridad).</li>
                <li>Enviar comunicaciones operativas y, previo consentimiento, comerciales.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">5. Conservación de los datos</h2>
              <p>
                Conservamos los datos mientras la cuenta esté activa y, tras su cancelación, durante los plazos legales 
                para atender posibles responsabilidades (máximo 5 años). Las imágenes enviadas al editor se eliminan 
                automáticamente tras 90 días salvo que el usuario las guarde en su biblioteca.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">6. Destinatarios y transferencias internacionales</h2>
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
                  </tbody>
                </table>
              </div>
              <p>No se realizan transferencias fuera del EEE sin garantías adecuadas.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">7. Derechos de los usuarios</h2>
              <p className="mb-4">El usuario puede ejercer en cualquier momento:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Acceso a sus datos.</li>
                <li>Rectificación de datos inexactos.</li>
                <li>Supresión («derecho al olvido»).</li>
                <li>Limitación del tratamiento.</li>
                <li>Portabilidad de sus datos.</li>
                <li>Oposición al tratamiento.</li>
              </ul>
              <p>
                Para ello, basta con enviar una solicitud a privacy@suiteinmobiliaria.com acreditando la identidad. 
                Asimismo, puede presentar reclamación ante la AEPD (www.aepd.es).
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">8. Seguridad</h2>
              <p>
                Aplicamos cifrado TLS/HTTPS, almacenamiento cifrado en reposo, control de acceso basado en roles, 
                auditorías internas y pruebas de penetración periódicas.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">9. Cookies</h2>
              <p>
                Usamos cookies propias y de terceros para autenticación, preferencias y analítica. El banner de cookies 
                permite aceptar, rechazar o configurar las categorías. Para más detalle, véase nuestra Política de Cookies.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">10. Menores de edad</h2>
              <p>
                La Plataforma no está dirigida a menores de 18 años. Si detectamos registros de menores, eliminaremos 
                la cuenta y los datos asociados.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">11. Cambios en la política</h2>
              <p>
                Publicaremos las modificaciones en esta página y, si son relevantes, las notificaremos por e‑mail 
                con al menos 30 días de antelación.
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
