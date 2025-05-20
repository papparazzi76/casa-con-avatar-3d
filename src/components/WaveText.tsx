
import React from 'react';
import { motion } from 'framer-motion';

interface WaveTextProps {
  text: string;
  className?: string;
}

export const WaveText: React.FC<WaveTextProps> = ({ text, className = "" }) => {
  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ scale: 1 }}
          animate={{ 
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
            delay: index * 0.1, // cada letra comienza un poco después que la anterior
            ease: "easeInOut"
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};
