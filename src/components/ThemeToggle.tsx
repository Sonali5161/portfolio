import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Palette } from 'lucide-react';
import { Button } from './ui/button';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);
  const [showPalette, setShowPalette] = useState(false);

  const themes = [
    { name: 'Dark', value: 'dark', icon: Moon, primary: 'hsl(183, 100%, 50%)', secondary: 'hsl(260, 60%, 60%)' },
    { name: 'Light', value: 'light', icon: Sun, primary: 'hsl(183, 100%, 35%)', secondary: 'hsl(260, 50%, 50%)' },
    { name: 'Cyberpunk', value: 'cyberpunk', icon: Palette, primary: 'hsl(300, 100%, 50%)', secondary: 'hsl(60, 100%, 50%)' },
    { name: 'Ocean', value: 'ocean', icon: Palette, primary: 'hsl(200, 100%, 50%)', secondary: 'hsl(220, 100%, 60%)' },
  ];

  const [currentTheme, setCurrentTheme] = useState(themes[0]);

  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDark);
    // Apply theme-specific CSS variables here if needed
  }, [isDark]);

  const handleThemeChange = (theme: typeof themes[0]) => {
    setCurrentTheme(theme);
    setIsDark(theme.value === 'dark');
    setShowPalette(false);
    
    // Apply custom theme colors
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--secondary', theme.secondary);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowPalette(!showPalette)}
        className="relative overflow-hidden"
      >
        <motion.div
          animate={{ rotate: showPalette ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <currentTheme.icon className="h-5 w-5" />
        </motion.div>
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ 
            boxShadow: showPalette 
              ? `0 0 20px ${currentTheme.primary}40` 
              : '0 0 0px transparent'
          }}
          transition={{ duration: 0.3 }}
        />
      </Button>

      <AnimatePresence>
        {showPalette && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            className="absolute top-12 right-0 glass-strong rounded-xl p-4 min-w-48 z-50"
          >
            <h3 className="text-sm font-semibold text-foreground mb-3">Choose Theme</h3>
            <div className="space-y-2">
              {themes.map((theme) => (
                <motion.button
                  key={theme.value}
                  onClick={() => handleThemeChange(theme)}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all ${
                    currentTheme.value === theme.value 
                      ? 'bg-primary/20 text-primary' 
                      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <theme.icon className="h-4 w-4" />
                  <span className="text-sm">{theme.name}</span>
                  <div className="ml-auto flex gap-1">
                    <div 
                      className="w-3 h-3 rounded-full border border-border/50"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <div 
                      className="w-3 h-3 rounded-full border border-border/50"
                      style={{ backgroundColor: theme.secondary }}
                    />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {showPalette && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/20 backdrop-blur-sm z-40"
            onClick={() => setShowPalette(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;