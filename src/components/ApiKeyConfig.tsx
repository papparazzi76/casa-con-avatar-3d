
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveApiKey, hasApiKey } from "@/services/legalAdvisorService";
import { motion } from "framer-motion";
import { KeyRound, Eye, EyeOff } from "lucide-react";

interface ApiKeyConfigProps {
  onConfigured: () => void;
}

export function ApiKeyConfig({ onConfigured }: ApiKeyConfigProps) {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;
    
    saveApiKey(apiKey.trim());
    onConfigured();
  };

  const toggleShowApiKey = () => {
    setShowApiKey(!showApiKey);
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
            <CardTitle className="text-xl flex items-center gap-2">
              <KeyRound className="h-5 w-5" />
              Configurar API Key de OpenAI
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="apiKey" className="block text-sm font-medium">
                API Key de OpenAI
              </label>
              <div className="relative">
                <Input
                  id="apiKey"
                  type={showApiKey ? "text" : "password"}
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="pr-10"
                  required
                />
                <button 
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={toggleShowApiKey}
                >
                  {showApiKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Tu API key es almacenada solo localmente en tu navegador y nunca se comparte.
              </p>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-md">
              <p className="text-sm">
                Necesitas una API key de OpenAI para utilizar este servicio. Puedes obtener una en{" "}
                <a 
                  href="https://platform.openai.com/api-keys" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium underline hover:text-amber-900"
                >
                  platform.openai.com/api-keys
                </a>
              </p>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
              disabled={!apiKey.trim()}
            >
              Guardar API Key
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}
