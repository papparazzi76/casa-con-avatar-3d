
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";
import { ReformBudgetDialog } from "./ReformBudgetDialog";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  delay?: number;
  onClick: () => void;
  imageSrc?: string;
  avatarSrc?: string;
}

export function ServiceCard({
  title,
  description,
  icon,
  delay = 0,
  onClick,
  imageSrc,
  avatarSrc
}: ServiceCardProps) {
  const [isReformBudgetOpen, setIsReformBudgetOpen] = useState(false);

  // Helper function to render calculator icon for the calculator service
  const renderIcon = () => {
    if (icon === "🧮") {
      return <Calculator className="w-8 h-8" />;
    }
    return;
  };

  // Handler for the click event
  const handleClick = () => {
    if (icon === "📋") {
      setIsReformBudgetOpen(true);
    } else {
      onClick();
    }
  };

  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.5,
          delay: delay * 0.1
        }}
        whileHover={{
          scale: 1.03
        }}
        className="h-full"
      >
        <Card className="h-full border-2 rounded-2xl overflow-hidden card-hover flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-center">
              {icon === "📋" ? "Presupuestos de Reforma" : title}
            </CardTitle>
            <CardDescription className="text-base">
              {icon === "📋" ? "Calcula el coste aproximado de la reforma de tu vivienda." : description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            {imageSrc || avatarSrc || icon === "📋" ? (
              <div className="w-[90%] mx-auto">
                <AspectRatio ratio={1 / 1} className="bg-muted rounded-lg overflow-hidden">
                  {icon === "📋" ? (
                    <img src="/lovable-uploads/d6d1386c-bbf3-439f-9e00-fdb8be9d2b8f.png" alt={title} className="object-contain w-full h-full" />
                  ) : avatarSrc ? (
                    <img src={avatarSrc} alt={title} className="object-contain w-full h-full" />
                  ) : (
                    <img src={imageSrc} alt={title} className="object-contain w-full h-full" />
                  )}
                </AspectRatio>
              </div>
            ) : (
              <div className="flex justify-center items-center h-32">
                {renderIcon()}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleClick}
              className="w-full bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
            >
              Iniciar
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Diálogo de presupuestos de reforma */}
      {icon === "📋" && (
        <ReformBudgetDialog
          open={isReformBudgetOpen}
          onOpenChange={setIsReformBudgetOpen}
        />
      )}
    </>
  );
}
