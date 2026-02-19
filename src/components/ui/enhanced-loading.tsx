import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EnhancedLoadingProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'wave' | 'orbit';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
}

const EnhancedLoading = ({ 
  variant = 'spinner', 
  size = 'md', 
  className,
  text 
}: EnhancedLoadingProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-4 h-4';
      case 'md': return 'w-8 h-8';
      case 'lg': return 'w-12 h-12';
      case 'xl': return 'w-16 h-16';
      default: return 'w-8 h-8';
    }
  };

  const renderSpinner = () => (
    <motion.div
      className={cn('border-2 border-primary/20 border-t-primary rounded-full', getSizeClasses())}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );

  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn('bg-primary rounded-full', size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-4 h-4' : 'w-3 h-3')}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <motion.div
      className={cn('bg-primary rounded-full', getSizeClasses())}
      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  );

  const renderWave = () => (
    <div className="flex space-x-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className={cn('bg-primary', size === 'sm' ? 'w-1 h-4' : size === 'lg' ? 'w-2 h-8' : 'w-1.5 h-6')}
          animate={{ scaleY: [1, 2, 1] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );

  const renderOrbit = () => (
    <div className={cn('relative', getSizeClasses())}>
      <motion.div
        className="absolute inset-0 border-2 border-primary/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className={cn('absolute bg-primary rounded-full', size === 'sm' ? 'w-1 h-1 top-0 left-1/2' : 'w-2 h-2 top-0 left-1/2')}
        style={{ marginLeft: '-2px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case 'dots': return renderDots();
      case 'pulse': return renderPulse();
      case 'wave': return renderWave();
      case 'orbit': return renderOrbit();
      default: return renderSpinner();
    }
  };

  return (
    <div className={cn('flex flex-col items-center justify-center space-y-4', className)}>
      {renderVariant()}
      {text && (
        <motion.p
          className="text-sm text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export { EnhancedLoading };