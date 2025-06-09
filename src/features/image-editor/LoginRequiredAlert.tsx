
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const LoginRequiredAlert = () => {
  const navigate = useNavigate();
  
  // Component no longer needed - return null to hide it
  return null;
};
