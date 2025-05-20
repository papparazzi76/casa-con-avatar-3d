
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
          initial={{ y: 0 }}
          animate={{ 
            y: [0, -8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            delay: index * 0.08, // cada letra comienza un poco después que la anterior
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
