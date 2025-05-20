
import { motion } from "framer-motion";

interface AvatarPlaceholderProps {
  icon: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function AvatarPlaceholder({ icon, size = "md" }: AvatarPlaceholderProps) {
  const sizeClasses = {
    sm: "w-24 h-24 text-3xl",
    md: "w-32 h-32 text-4xl",
    lg: "w-48 h-48 text-5xl",
    xl: "w-64 h-64 text-6xl",
  };

  return (
    <motion.div 
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-realestate-purple to-realestate-turquoise flex items-center justify-center animate-float`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full bg-background">
        <span className={sizeClasses[size].split(' ').slice(-1)[0]}>
          {icon}
        </span>
      </div>
    </motion.div>
  );
}
