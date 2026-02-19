import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface MouseParticle extends Particle {
  targetX: number;
  targetY: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseParticlesRef = useRef<MouseParticle[]>([]);

  const colors = [
    'hsla(183, 100%, 50%, 0.8)', // Primary cyan
    'hsla(260, 60%, 60%, 0.8)',  // Secondary purple
    'hsla(183, 80%, 40%, 0.6)',  // Accent cyan
    'hsla(200, 100%, 70%, 0.5)', // Light blue
  ];

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  const createParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const count = Math.min(100, Math.floor((canvas.width * canvas.height) / 12000));
    particlesRef.current = [];
    
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 100,
      });
    }
  }, [colors]);

  const createMouseParticle = useCallback((x: number, y: number) => {
    const particle: MouseParticle = {
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      radius: Math.random() * 4 + 2,
      opacity: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: 60,
      targetX: x,
      targetY: y,
    };
    
    mouseParticlesRef.current.push(particle);
    
    // Limit mouse particles
    if (mouseParticlesRef.current.length > 50) {
      mouseParticlesRef.current.shift();
    }
  }, [colors]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    
    // Create mouse trail particles occasionally
    if (Math.random() < 0.3) {
      createMouseParticle(e.clientX, e.clientY);
    }
  }, [createMouseParticle]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw main particles
    particlesRef.current.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life++;

      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      // Mouse interaction
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const force = (100 - distance) / 100;
        particle.vx += (dx / distance) * force * 0.01;
        particle.vy += (dy / distance) * force * 0.01;
        particle.opacity = Math.min(1, particle.opacity + force * 0.02);
      } else {
        particle.opacity = Math.max(0.2, particle.opacity - 0.01);
      }

      // Apply friction
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Respawn particle if it's too old
      if (particle.life > particle.maxLife) {
        particle.x = Math.random() * canvas.width;
        particle.y = Math.random() * canvas.height;
        particle.life = 0;
        particle.vx = (Math.random() - 0.5) * 0.8;
        particle.vy = (Math.random() - 0.5) * 0.8;
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color.replace('0.8', particle.opacity.toString());
      ctx.fill();

      // Add glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = particle.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Update and draw mouse particles
    mouseParticlesRef.current.forEach((particle, index) => {
      particle.life++;
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Fade out
      particle.opacity = 1 - (particle.life / particle.maxLife);
      
      // Remove dead particles
      if (particle.life >= particle.maxLife) {
        mouseParticlesRef.current.splice(index, 1);
        return;
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color.replace('0.8', particle.opacity.toString());
      ctx.fill();
    });

    // Draw connections between nearby particles
    const maxDistance = 120;
    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const dx = particlesRef.current[i].x - particlesRef.current[j].x;
        const dy = particlesRef.current[i].y - particlesRef.current[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.2;
          ctx.beginPath();
          ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
          ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
          ctx.strokeStyle = `hsla(183, 100%, 50%, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animationFrameRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    resize();
    createParticles();
    
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [resize, createParticles, handleMouseMove, draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
};

export default ParticleBackground;
