
import { useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";
import { motion } from "framer-motion";
import { saveApiKey } from "@/services/legalAdvisorService";

interface ApiKeyConfigProps {
  onConfigured: () => void;
}

export function ApiKeyConfig({ onConfigured }: ApiKeyConfigProps) {
  // Usar la API key permanente actualizada
  const OPENAI_API_KEY = "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";

  useEffect(() => {
    // Configurar automáticamente la API key
    saveApiKey(OPENAI_API_KEY);
    setTimeout(onConfigured, 1000);
  }, [onConfigured]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-2 shadow">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            Conectando con OpenAI
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm">Configurando automáticamente la API Key de OpenAI...</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-realestate-purple h-2.5 rounded-full w-3/4"></div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            type="button" 
            className="w-full bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
            disabled
          >
            Configurando...
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
