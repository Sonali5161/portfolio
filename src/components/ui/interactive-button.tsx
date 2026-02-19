import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InteractiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "magnetic" | "ripple" | "glow" | "morph" | "neon";
  children: React.ReactNode;
  className?: string;
}

const InteractiveButton = React.forwardRef<HTMLButtonElement, InteractiveButtonProps>(
  ({ variant = "magnetic", children, className, ...props }, ref) => {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePosition({ x: 0, y: 0 });
    };

    const getVariantStyles = () => {
      switch (variant) {
        case "magnetic":
          return "relative overflow-hidden bg-primary text-primary-foreground hover:shadow-xl transition-all duration-300";
        case "ripple":
          return "relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-primary-foreground";
        case "glow":
          return "relative bg-primary text-primary-foreground neon-glow";
        case "morph":
          return "relative bg-primary text-primary-foreground morphing-blob";
        case "neon":
          return "relative bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground neon-glow";
        default:
          return "relative bg-primary text-primary-foreground";
      }
    };

    const magneticTransform = variant === "magnetic" && isHovered 
      ? { x: mousePosition.x * 0.3, y: mousePosition.y * 0.3 }
      : { x: 0, y: 0 };

    return (
      <motion.button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          "px-6 py-3 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          getVariantStyles(),
          className
        )}
        animate={magneticTransform}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {variant === "ripple" && isHovered && (
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-full"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              left: mousePosition.x + buttonRef.current?.offsetWidth! / 2,
              top: mousePosition.y + buttonRef.current?.offsetHeight! / 2,
            }}
          />
        )}
        
        {variant === "glow" && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-lg blur-xl"
            animate={{ opacity: isHovered ? 0.7 : 0.3 }}
            transition={{ duration: 0.3 }}
          />
        )}
        
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

InteractiveButton.displayName = "InteractiveButton";

export { InteractiveButton };