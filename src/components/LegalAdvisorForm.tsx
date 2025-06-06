
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LegalQuestion } from "@/services/legalAdvisorService";
import { motion } from "framer-motion";

interface LegalAdvisorFormProps {
  onSubmit: (question: LegalQuestion) => void;
  isLoading: boolean;
  missingFields?: string[];
}

export function LegalAdvisorForm({ onSubmit, isLoading, missingFields }: LegalAdvisorFormProps) {
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    onSubmit({
      question: question.trim(),
      context: context.trim() || undefined
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-2 shadow">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-xl">Consulta jurídica inmobiliaria</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="question" className="block text-sm font-medium">
                ¿Cuál es tu consulta sobre legislación inmobiliaria?
              </label>
              <Textarea
                id="question"
                placeholder="Ej: ¿Cuál es el plazo para reclamar vicios ocultos en una vivienda de segunda mano?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="min-h-[120px]"
                required
              />
            </div>

            <div className="flex items-start space-x-2 border p-4 rounded-md">
              <input
                type="checkbox"
                id="legal-terms"
                className="mt-1"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <label htmlFor="legal-terms" className="text-sm">
                He leído y acepto los <a href="/terminos" className="underline">Términos y Condiciones</a> y la{' '}
                <a href="/privacidad" className="underline">Política de Privacidad</a>
              </label>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="context" className="block text-sm font-medium">
                Contexto adicional (opcional)
              </label>
              <Textarea
                id="context"
                placeholder="Añade cualquier información que pueda ser relevante: comunidad autónoma, fechas, valores, etc."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            {missingFields && missingFields.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-md">
                <p className="font-medium mb-1">Se necesita más información:</p>
                <ul className="list-disc list-inside">
                  {missingFields.map((field, index) => (
                    <li key={index}>{field}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
              disabled={isLoading || !question.trim() || !acceptedTerms}
            >
              {isLoading ? "Consultando..." : "Consultar"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}
