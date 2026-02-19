import { motion } from 'framer-motion';
import React from 'react';

const floatAnim = (y: number, x = 0, rotate = 0) => ({
  y: [0, y, 0],
  x: [0, x, 0],
  rotate: [0, rotate, 0]
});

const AnimatedEmojis: React.FC = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={floatAnim(-16, 6, 8)}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
        whileHover={{ scale: 1.06 }}
        className="absolute -top-4 -right-4 p-4 glass rounded-xl"
      >
        <span className="text-2xl">🤖</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={floatAnim(18, -8, -6)}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror', delay: 0.3 }}
        whileHover={{ scale: 1.06 }}
        className="absolute -bottom-4 -left-4 p-4 glass rounded-xl"
      >
        <span className="text-2xl">💻</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={floatAnim(-8, -10, 4)}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror', delay: 0.6 }}
        whileHover={{ scale: 1.06 }}
        className="absolute top-1/2 -left-8 p-3 glass rounded-xl"
      >
        <span className="text-xl">⚡</span>
      </motion.div>
    </>
  );
};

export default AnimatedEmojis;
