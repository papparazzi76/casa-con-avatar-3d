
import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  isGenerating: boolean;
};

export function SubmitButton({ isGenerating }: SubmitButtonProps) {
  return (
    <Button 
      type="submit" 
      className="w-full bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
      disabled={isGenerating}
      size="lg"
    >
      {isGenerating ? "Generando posts..." : "Generar Posts para Redes Sociales"}
    </Button>
  );
}
