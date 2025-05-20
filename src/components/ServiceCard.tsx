import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  delay?: number;
  onClick: () => void;
}
export function ServiceCard({
  title,
  description,
  icon,
  delay = 0,
  onClick
}: ServiceCardProps) {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    delay: delay * 0.1
  }} whileHover={{
    scale: 1.03
  }} className="h-full">
      <Card className="h-full border-2 rounded-2xl overflow-hidden card-hover flex flex-col">
        <CardHeader className="pb-2">
          <div className="w-16 h-16 mb-4 rounded-xl bg-secondary flex items-center justify-center">
            <span className="text-3xl">{icon}</span>
          </div>
          <CardTitle className="text-xl text-center">{title}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {/* Content will be added as needed */}
        </CardContent>
        <CardFooter>
          <Button onClick={onClick} className="w-full bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90">
            Iniciar
          </Button>
        </CardFooter>
      </Card>
    </motion.div>;
}