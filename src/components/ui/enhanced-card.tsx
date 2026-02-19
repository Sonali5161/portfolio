import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "glow" | "3d" | "magnetic" | "gradient";
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const EnhancedCard = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ variant = "glass", children, className, glowColor = "primary", ...props }, ref) => {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);
    const cardRef = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePosition({ x: 0.5, y: 0.5 });
    };

    const getVariantStyles = () => {
      switch (variant) {
        case "glass":
          return "glass backdrop-blur-xl border border-border/50";
        case "glow":
          return "glass border border-primary/30 shadow-lg shadow-primary/20";
        case "3d":
          return "glass border border-border/50 card-3d";
        case "magnetic":
          return "glass border border-border/50 magnetic-hover";
        case "gradient":
          return "interactive-border";
        default:
          return "glass";
      }
    };

    const get3DTransform = () => {
      if (variant !== "3d" || !isHovered) return {};
      
      const rotateX = (mousePosition.y - 0.5) * 20;
      const rotateY = (mousePosition.x - 0.5) * -20;
      
      return {
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`,
      };
    };

    const getMagneticTransform = () => {
      if (variant !== "magnetic" || !isHovered) return {};
      
      const moveX = (mousePosition.x - 0.5) * 20;
      const moveY = (mousePosition.y - 0.5) * 20;
      
      return {
        transform: `translate(${moveX}px, ${moveY}px)`,
      };
    };

    return (
      <motion.div
        ref={(node) => {
          cardRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          "relative rounded-2xl p-6 transition-all duration-500 ease-out",
          getVariantStyles(),
          className
        )}
        style={{
          ...get3DTransform(),
          ...getMagneticTransform(),
        }}
        whileHover={{ y: -8 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Glow effect for glow variant */}
        {variant === "glow" && isHovered && (
          <motion.div
            className={`absolute inset-0 rounded-2xl blur-xl bg-${glowColor}/20`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
        
        {/* Gradient overlay for 3D variant */}
        {variant === "3d" && (
          <div
            className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(var(--primary), 0.1) 0%, transparent 50%)`,
            }}
          />
        )}
        
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    );
  }
);

EnhancedCard.displayName = "EnhancedCard";

export { EnhancedCard };