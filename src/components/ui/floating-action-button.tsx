import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: string;
}

interface FloatingActionButtonProps {
  actions: FloatingAction[];
  className?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  actions,
  className,
  position = "bottom-right"
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const getPositionStyles = () => {
    switch (position) {
      case "bottom-right":
        return "fixed bottom-8 right-8";
      case "bottom-left":
        return "fixed bottom-8 left-8";
      case "top-right":
        return "fixed top-24 right-8";
      case "top-left":
        return "fixed top-24 left-8";
      default:
        return "fixed bottom-8 right-8";
    }
  };

  const getActionPosition = (index: number) => {
    const spacing = 70;
    switch (position) {
      case "bottom-right":
      case "bottom-left":
        return { y: -(index + 1) * spacing };
      case "top-right":
      case "top-left":
        return { y: (index + 1) * spacing };
      default:
        return { y: -(index + 1) * spacing };
    }
  };

  return (
    <div className={cn(getPositionStyles(), "z-50", className)}>
      {/* Action Buttons */}
      <AnimatePresence>
        {isOpen && actions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              ...getActionPosition(index)
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            className="absolute bottom-0 right-0"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={action.onClick}
              className={cn(
                "w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300",
                action.color || "bg-primary hover:bg-primary/90"
              )}
              title={action.label}
            >
              {action.icon}
            </motion.button>
            
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="absolute right-16 top-1/2 -translate-y-1/2 bg-card/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-lg text-sm whitespace-nowrap shadow-lg border border-border/50"
            >
              {action.label}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-primary hover:bg-primary/90 rounded-full shadow-xl flex items-center justify-center text-primary-foreground transition-all duration-300 neon-glow"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Plus className="w-6 h-6" />
        </motion.div>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/20 backdrop-blur-sm -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export { FloatingActionButton };