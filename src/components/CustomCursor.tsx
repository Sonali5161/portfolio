import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CursorTrail {
  x: number;
  y: number;
  id: number;
}

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [trails, setTrails] = useState<CursorTrail[]>([]);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; id: number; velocity: { x: number; y: number } }>>([]);
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailIdRef = useRef(0);
  const particleIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);

      // Add trail point
      setTrails(prev => {
        const newTrail = { x: newPosition.x, y: newPosition.y, id: trailIdRef.current++ };
        const updatedTrails = [newTrail, ...prev.slice(0, 8)]; // Keep last 8 trail points
        return updatedTrails;
      });
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      
      // Create click particles
      const particleCount = 6;
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        x: e.clientX,
        y: e.clientY,
        id: particleIdRef.current++,
        velocity: {
          x: (Math.random() - 0.5) * 8,
          y: (Math.random() - 0.5) * 8,
        }
      }));
      
      setParticles(prev => [...prev, ...newParticles]);
      
      // Remove particles after animation
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
      }, 1000);
    };

    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.matches('button, a, [role="button"], .cursor-pointer, .interactive-button')) {
        setIsHovering(true);
        setCursorVariant('hover');
      } else if (target.matches('input, textarea, [contenteditable]')) {
        setCursorVariant('text');
        setIsHovering(true);
      } else if (target.matches('.cursor-grab, .draggable')) {
        setCursorVariant('grab');
        setIsHovering(true);
      } else if (target.matches('img, video, .media')) {
        setCursorVariant('media');
        setIsHovering(true);
      } else if (target.matches('.nav-link, .project-card, .enhanced-card')) {
        setCursorVariant('explore');
        setIsHovering(true);
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
    document.documentElement.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.body.style.cursor = 'auto';
      document.documentElement.style.cursor = 'auto';
    };
  }, []);

  const getCursorVariants = () => {
    switch (cursorVariant) {
      case 'hover':
        return {
          scale: 2,
          backgroundColor: 'transparent',
          border: '2px solid hsl(var(--primary))',
          boxShadow: '0 0 20px hsl(var(--primary) / 0.5), inset 0 0 20px hsl(var(--primary) / 0.2)',
        };
      case 'text':
        return {
          scale: 0.8,
          backgroundColor: 'hsl(var(--primary))',
          borderRadius: '2px',
          width: '2px',
          height: '20px',
          boxShadow: '0 0 10px hsl(var(--primary))',
        };
      case 'grab':
        return {
          scale: 1.5,
          backgroundColor: 'transparent',
          border: '2px solid hsl(var(--secondary))',
          boxShadow: '0 0 15px hsl(var(--secondary) / 0.5)',
        };
      case 'media':
        return {
          scale: 2.5,
          backgroundColor: 'transparent',
          border: '2px solid hsl(var(--primary))',
          borderRadius: '50%',
          boxShadow: '0 0 25px hsl(var(--primary) / 0.6)',
        };
      case 'explore':
        return {
          scale: 1.8,
          backgroundColor: 'hsl(var(--primary) / 0.1)',
          border: '1px solid hsl(var(--primary))',
          boxShadow: '0 0 15px hsl(var(--primary) / 0.4)',
        };
      default:
        return {
          scale: 1,
          backgroundColor: 'hsl(var(--primary))',
          boxShadow: '0 0 10px hsl(var(--primary) / 0.3)',
        };
    }
  };

  return (
    <div className="hidden md:block">
      {/* Click Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed w-1 h-1 bg-primary rounded-full pointer-events-none z-[10001]"
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              x: particle.x + particle.velocity.x * 50,
              y: particle.y + particle.velocity.y * 50,
              scale: 0,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Cursor Trails */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="fixed w-2 h-2 bg-primary/20 rounded-full pointer-events-none z-[9997]"
          style={{
            x: trail.x - 4,
            y: trail.y - 4,
          }}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ 
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.8,
            delay: index * 0.05,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9998] rounded-full border border-primary/20"
        style={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.8 : 0.3,
          rotate: isHovering ? 180 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.2,
        }}
      />

      {/* Middle Ring */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] rounded-full border border-primary/40"
        style={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.6 : 0.4,
          rotate: isHovering ? -90 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          mass: 0.3,
        }}
      />
      
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[10000] rounded-full"
        style={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        animate={{
          ...getCursorVariants(),
          scale: isClicking ? (getCursorVariants().scale || 1) * 0.8 : getCursorVariants().scale,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 30,
          mass: 0.4,
        }}
      />

      {/* Glow Effect */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9996] rounded-full"
        style={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: isHovering ? 3 : 1.5,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          mass: 0.1,
        }}
      />

      {/* Cursor Text for Interactive Elements */}
      <AnimatePresence>
        {cursorVariant === 'hover' && (
          <motion.div
            className="fixed pointer-events-none z-[10002] text-xs font-medium text-primary bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-primary/20"
            style={{
              x: mousePosition.x + 20,
              y: mousePosition.y - 10,
            }}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            Click
          </motion.div>
        )}
        {cursorVariant === 'explore' && (
          <motion.div
            className="fixed pointer-events-none z-[10002] text-xs font-medium text-primary bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-primary/20"
            style={{
              x: mousePosition.x + 20,
              y: mousePosition.y - 10,
            }}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            Explore
          </motion.div>
        )}
        {cursorVariant === 'media' && (
          <motion.div
            className="fixed pointer-events-none z-[10002] text-xs font-medium text-primary bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-primary/20"
            style={{
              x: mousePosition.x + 20,
              y: mousePosition.y - 10,
            }}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            View
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCursor;