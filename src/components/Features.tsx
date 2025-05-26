import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface FeatureProps {
  title: string;
  description: string;
  index: number;
}

function Feature({ title, description, index }: FeatureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex gap-4"
    >
      <div className="mt-1 bg-primary rounded-full p-1.5 text-primary-foreground">
        <Check className="h-4 w-4" />
      </div>
      <div>
        <h3 className="font-semibold leading-tight">Todo por sólo 99 €</h3>
        <p className="text-muted-foreground text-sm mt-1">{description}</p>
      </div>
    </motion.div>
  );
}

export function Features() {
  const features = [
    {
      title: "Todo por sólo 99 €",
      description: "Accede a herramientas profesionales y vende tu inmueble por un precio simbólico."
    },
    {
      title: "Potenciado por IA Avanzada",
      description: "Utilizamos modelos GPT-4o y DALL·E 3 para resultados excepcionales."
    },
    {
      title: "Enfoque DIY",
      description: "Herramientas diseñadas para ser utilizadas por cualquier persona."
    },
    {
      title: "Diseño Profesional",
      description: "Materiales y documentos con calidad de agencia inmobiliaria."
    },
    {
      title: "Conforme a la Legislación",
      description: "Todos los documentos cumplen con la normativa española vigente."
    },
    {
      title: "Sin Comisiones",
      description: "Ahorra miles de euros en comisiones de intermediación."
    },
  ];

  return (
    <section className="py-12 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter">¿Por Qué Elegir PropTools?</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-lg">
            Nuestra plataforma te ofrece todas las ventajas de una agencia sin sus inconvenientes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature 
              key={index}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
