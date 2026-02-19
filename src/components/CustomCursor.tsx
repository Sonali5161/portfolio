import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.matches('button, a, [role="button"], .cursor-pointer')) {
        setIsHovering(true);
        setCursorVariant('hover');
      } else if (target.matches('input, textarea, [contenteditable]')) {
        setCursorVariant('text');
      } else if (target.matches('.cursor-grab')) {
        setCursorVariant('grab');
      } else {
        setIsHovering(false);
        setCursorVariant('default');
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorVariant('default');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.body.style.cursor = 'auto';
    };
  }, []);

  const getCursorVariants = () => {
    switch (cursorVariant) {
      case 'hover':
        return {
          scale: 1.5,
          backgroundColor: 'hsl(var(--primary))',
          mixBlendMode: 'difference' as const,
        };
      case 'text':
        return {
          scale: 0.8,
          backgroundColor: 'hsl(var(--primary))',
          borderRadius: '2px',
        };
      case 'grab':
        return {
          scale: 1.2,
          backgroundColor: 'hsl(var(--secondary))',
        };
      default:
        return {
          scale: 1,
          backgroundColor: 'hsl(var(--primary))',
        };
    }
  };

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9999] rounded-full"
        style={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        animate={{
          ...getCursorVariants(),
          scale: isClicking ? 0.8 : getCursorVariants().scale,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      
      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9998] rounded-full border border-primary/30"
        style={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />
    </>
  );
};

export default CustomCursor;