
import React from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CookiePolicy() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Política de Cookies</h1>
          
          <section className="prose max-w-none">
            <p className="text-lg mb-6">
              En PropTools, utilizamos cookies y tecnologías similares para mejorar la experiencia
              del usuario en nuestra plataforma. Esta política explica cómo utilizamos las cookies
              y qué opciones tiene al respecto.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando
              visita nuestra web. Sirven para reconocer su dispositivo cuando vuelve a visitar nuestro
              sitio, recordar sus preferencias y proporcionarle una experiencia personalizada.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Tipos de cookies que utilizamos</h2>
            
            <h3 className="text-xl font-bold mt-6 mb-3">Cookies esenciales</h3>
            <p>
              Estas cookies son necesarias para el funcionamiento básico de nuestra web. Le permiten
              navegar por el sitio y utilizar sus funciones, como acceder a áreas seguras. Sin estas
              cookies, no podríamos proporcionar los servicios que usted solicita.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3">Cookies de rendimiento</h3>
            <p>
              Estas cookies recopilan información sobre cómo los visitantes utilizan nuestra web,
              por ejemplo, qué páginas visitan con más frecuencia y si reciben mensajes de error.
              Esta información se utiliza para mejorar el funcionamiento de nuestra web.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3">Cookies de funcionalidad</h3>
            <p>
              Estas cookies permiten que nuestra web recuerde las elecciones que hace (como su nombre
              de usuario, idioma o la región en la que se encuentra) y proporcione funciones mejoradas
              y más personales.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3">Cookies de publicidad y seguimiento</h3>
            <p>
              Estas cookies se utilizan para entregar anuncios más relevantes para usted y sus
              intereses. También se utilizan para limitar el número de veces que ve un anuncio,
              así como para ayudar a medir la efectividad de las campañas publicitarias.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Cookies de terceros</h2>
            <p>
              Algunos de nuestros socios, como Google Analytics y servicios de publicidad, pueden
              utilizar cookies en nuestra web. No tenemos acceso ni control sobre estas cookies. Esta
              política se aplica únicamente a las cookies utilizadas por PropTools.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Control de cookies</h2>
            <p>
              Puede controlar y/o eliminar las cookies según lo desee. Puede eliminar todas las cookies
              que ya están en su dispositivo y puede configurar la mayoría de los navegadores para
              evitar que se coloquen. Sin embargo, si hace esto, es posible que tenga que ajustar
              manualmente algunas preferencias cada vez que visite un sitio y que algunos servicios
              y funcionalidades no funcionen.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Cambios en nuestra política de cookies</h2>
            <p>
              Cualquier cambio que podamos hacer en nuestra política de cookies en el futuro se
              publicará en esta página. Por favor, compruebe con frecuencia para ver las
              actualizaciones o cambios en nuestra política de cookies.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Contacto</h2>
            <p>
              Si tiene alguna pregunta sobre nuestra política de cookies, por favor contáctenos en
              info@proptools.es.
            </p>
            
            <p className="mt-8 text-sm text-gray-500">
              Última actualización: Mayo 2025
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
