import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  isLowPerformance: boolean;
}

export const usePerformanceMonitor = (callback?: (metrics: PerformanceMetrics) => void) => {
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const fpsRef = useRef(60);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const measurePerformance = () => {
      const now = performance.now();
      const delta = now - lastTimeRef.current;
      
      frameCountRef.current++;
      
      // Calculate FPS every second
      if (delta >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / delta);
        const frameTime = delta / frameCountRef.current;
        const isLowPerformance = fps < 30;
        
        fpsRef.current = fps;
        
        if (callback) {
          callback({ fps, frameTime, isLowPerformance });
        }
        
        // Adjust animation quality based on performance
        if (isLowPerformance) {
          document.documentElement.style.setProperty('--animation-duration-multiplier', '0.5');
          document.documentElement.classList.add('low-performance');
        } else {
          document.documentElement.style.setProperty('--animation-duration-multiplier', '1');
          document.documentElement.classList.remove('low-performance');
        }
        
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }
      
      animationFrameRef.current = requestAnimationFrame(measurePerformance);
    };

    measurePerformance();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [callback]);

  return fpsRef.current;
};

export default usePerformanceMonitor;