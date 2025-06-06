
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { LegalQuestion } from "@/services/legalAdvisorService";
import { motion } from "framer-motion";
import { TermsAcceptanceField } from "./TermsAcceptanceField";

const legalAdvisorSchema = z.object({
  question: z.string().min(1, "La consulta es obligatoria"),
  context: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "Debe aceptar los términos y condiciones"
  })
});

type LegalAdvisorFormData = z.infer<typeof legalAdvisorSchema>;

interface LegalAdvisorFormProps {
  onSubmit: (question: LegalQuestion) => void;
  isLoading: boolean;
  missingFields?: string[];
}

export function LegalAdvisorForm({ onSubmit, isLoading, missingFields }: LegalAdvisorFormProps) {
  const form = useForm<LegalAdvisorFormData>({
    resolver: zodResolver(legalAdvisorSchema),
    defaultValues: {
      question: "",
      context: "",
      acceptTerms: false
    }
  });

  const handleSubmit = (data: LegalAdvisorFormData) => {
    onSubmit({
      question: data.question.trim(),
      context: data.context?.trim() || undefined
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-2 shadow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <CardHeader>
              <CardTitle className="text-xl">Consulta jurídica inmobiliaria</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>¿Cuál es tu consulta sobre legislación inmobiliaria?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ej: ¿Cuál es el plazo para reclamar vicios ocultos en una vivienda de segunda mano?"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="context"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contexto adicional (opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Añade cualquier información que pueda ser relevante: comunidad autónoma, fechas, valores, etc."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <TermsAcceptanceField 
                control={form.control} 
                name="acceptTerms" 
                className="pt-4"
              />
              
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
                disabled={isLoading}
              >
                {isLoading ? "Consultando..." : "Consultar"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </motion.div>
  );
}
