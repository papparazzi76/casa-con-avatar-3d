
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LegalAnswer } from "@/services/legalAdvisorService";
import { useState } from "react";
import { motion } from "framer-motion";

interface LegalAdvisorResultProps {
  result: LegalAnswer;
}

export function LegalAdvisorResult({ result }: LegalAdvisorResultProps) {
  const { toast } = useToast();
  const [expandedSection, setExpandedSection] = useState<string | null>("resumen");

  const handleDownload = () => {
    try {
      // Format the content for download
      const content = formatContentForDownload(result);
      
      // Create a blob with the content
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      
      // Create a download link
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = `consulta-legal-${new Date().toISOString().split('T')[0]}.txt`;
      
      // Trigger download
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      toast({
        title: "Consulta descargada",
        description: "El archivo ha sido descargado correctamente.",
      });
    } catch (error) {
      console.error("Error downloading legal consultation:", error);
      toast({
        title: "Error al descargar",
        description: "No se pudo descargar la consulta. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const formatContentForDownload = (data: LegalAnswer): string => {
    if (data.status !== "ok" || !data.answer) {
      return `CONSULTA: ${data.question}\n\nFaltan datos: ${data.faltan_datos?.join(", ")}\n\n${data.disclaimer}`;
    }

    let content = `CONSULTA LEGAL INMOBILIARIA\n`;
    content += `Fecha: ${data.fecha_actualizacion}\n\n`;
    content += `PREGUNTA: ${data.question}\n\n`;
    content += `RESUMEN: ${data.answer.resumen}\n\n`;
    content += `ANÁLISIS DETALLADO:\n${data.answer.analisis_detallado}\n\n`;
    
    content += `NORMATIVA APLICABLE:\n`;
    data.answer.normativa_aplicable.forEach(norm => {
      content += `- ${norm.norma}, ${norm.articulo}\n  ${norm.publicacion}\n`;
      if (norm.enlace_boe) content += `  ${norm.enlace_boe}\n`;
    });
    content += `\n`;

    if (data.answer.jurisprudencia_destacada && data.answer.jurisprudencia_destacada.length > 0) {
      content += `JURISPRUDENCIA DESTACADA:\n`;
      data.answer.jurisprudencia_destacada.forEach(jurisprudence => {
        content += `- ${jurisprudence.sentencia}\n  Fecha: ${jurisprudence.fecha}\n`;
        content += `  Fallo: ${jurisprudence.resumen_fallo}\n`;
        if (jurisprudence.enlace_cendoj) content += `  ${jurisprudence.enlace_cendoj}\n`;
      });
      content += `\n`;
    }

    content += `PASOS PRÁCTICOS:\n`;
    data.answer.pasos_practicos.forEach((step, index) => {
      content += `${index + 1}. ${step}\n`;
    });
    content += `\n\n${data.disclaimer}`;

    return content;
  };

  if (!result || result.status !== "ok" || !result.answer) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6"
    >
      <Card className="border-2 shadow h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl">Respuesta a tu consulta</CardTitle>
          <Button 
            onClick={handleDownload}
            variant="outline"
            className="flex items-center gap-2"
            size="sm"
          >
            <Download className="h-4 w-4" />
            Descargar
          </Button>
        </CardHeader>
        
        <CardContent className="divide-y">
          <div className="pb-4">
            <h3 className="font-medium text-gray-800 mb-2">Pregunta</h3>
            <p className="text-gray-700">{result.question}</p>
          </div>
          
          <div className="py-4">
            <div 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => toggleSection("resumen")}
            >
              <h3 className="font-medium text-gray-800">Resumen</h3>
              {expandedSection === "resumen" ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </div>
            {expandedSection === "resumen" && (
              <p className="mt-2 text-gray-700">{result.answer.resumen}</p>
            )}
          </div>
          
          <div className="py-4">
            <div 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => toggleSection("analisis")}
            >
              <h3 className="font-medium text-gray-800">Análisis detallado</h3>
              {expandedSection === "analisis" ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </div>
            {expandedSection === "analisis" && (
              <div className="mt-2 text-gray-700 whitespace-pre-line">
                {result.answer.analisis_detallado}
              </div>
            )}
          </div>
          
          <div className="py-4">
            <div 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => toggleSection("normativa")}
            >
              <h3 className="font-medium text-gray-800">Normativa aplicable</h3>
              {expandedSection === "normativa" ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </div>
            {expandedSection === "normativa" && (
              <ul className="mt-2 space-y-3">
                {result.answer.normativa_aplicable.map((norm, index) => (
                  <li key={index} className="text-gray-700">
                    <div className="font-medium">{norm.norma}, {norm.articulo}</div>
                    <div className="text-sm">{norm.publicacion}</div>
                    {norm.enlace_boe && (
                      <a 
                        href={norm.enlace_boe} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        Ver en BOE <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {result.answer.jurisprudencia_destacada && (
            <div className="py-4">
              <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => toggleSection("jurisprudencia")}
              >
                <h3 className="font-medium text-gray-800">Jurisprudencia destacada</h3>
                {expandedSection === "jurisprudencia" ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
              {expandedSection === "jurisprudencia" && (
                <ul className="mt-2 space-y-4">
                  {result.answer.jurisprudencia_destacada.map((jurisprudence, index) => (
                    <li key={index} className="text-gray-700">
                      <div className="font-medium">{jurisprudence.sentencia}</div>
                      <div className="text-sm">Fecha: {jurisprudence.fecha}</div>
                      <div className="mt-1">{jurisprudence.resumen_fallo}</div>
                      {jurisprudence.enlace_cendoj && (
                        <a 
                          href={jurisprudence.enlace_cendoj} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                        >
                          Ver sentencia <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          
          <div className="py-4">
            <div 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => toggleSection("pasos")}
            >
              <h3 className="font-medium text-gray-800">Pasos prácticos</h3>
              {expandedSection === "pasos" ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </div>
            {expandedSection === "pasos" && (
              <ol className="mt-2 list-decimal list-inside space-y-1">
                {result.answer.pasos_practicos.map((step, index) => (
                  <li key={index} className="text-gray-700">{step}</li>
                ))}
              </ol>
            )}
          </div>
          
          <div className="pt-4 text-sm text-gray-500 italic">
            <p>Actualizado: {result.fecha_actualizacion}</p>
            <p className="mt-1">{result.disclaimer}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
