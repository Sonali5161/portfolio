import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, BookOpen, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InteractiveButton } from '@/components/ui/interactive-button';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import TypewriterText from '@/components/TypewriterText';
import PageTransition from '@/components/PageTransition';
import AnimatedEmojis from '@/components/AnimatedEmojis';
import MarqueeGallery from '@/components/MarqueeGallery';
import sonaliProfile from '@/assets/sonali-profile.jpg';
import AboutPage from './AboutPage';
import SkillsPage from './SkillsPage';
const roles = [
  'AI / ML Engineer',
  'Intelligent Systems Developer',
  'Research-Oriented Technologist',
  'Software Engineer',
];

// Placeholder images - replace with your actual images
const galleryImages = [
  sonaliProfile,
  // Add more images here when you provide them
];

const HomePage = () => {
  const floatingActions = [
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub Profile",
      onClick: () => window.open("https://github.com/Sonali5161", "_blank"),
      color: "bg-gray-800 hover:bg-gray-700"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn Profile", 
      onClick: () => window.open("https://linkedin.com/in/sonali-patil", "_blank"),
      color: "bg-blue-600 hover:bg-blue-500"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Send Email",
      onClick: () => window.location.href = "mailto:sonali@example.com",
      color: "bg-green-600 hover:bg-green-500"
    }
  ];

  return (
    <PageTransition>
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 mobile-hero-spacing">
        {/* Enhanced Gradient Orbs - Hidden on mobile for performance */}
        <motion.div 
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow morphing-blob hidden md:block" 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow morphing-blob hidden md:block" 
          style={{ animationDelay: '1s' }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="container mx-auto px-4 z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Enhanced Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center lg:text-left order-2 lg:order-1"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-primary text-xs sm:text-sm md:text-base font-medium tracking-wider uppercase mb-3 md:mb-4 text-shimmer"
              >
                Welcome to my portfolio
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 leading-tight"
              >
                <span className="text-foreground">Hi, I'm</span>
                <br />
                <span className="gradient-text text-glow animate-shimmer">Sonali Patil</span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 md:mb-8 h-6 sm:h-7 md:h-8"
              >
                <TypewriterText texts={roles} className="text-foreground" />
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mb-8 md:mb-10 mx-auto lg:mx-0 px-4 lg:px-0"
              >
                Building intelligent systems that bridge the gap between cutting-edge research and real-world applications.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start px-4 lg:px-0"
              >
                <InteractiveButton variant="magnetic" className="bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto">
                  <Link to="/projects" className="flex items-center justify-center">
                    View Projects <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </InteractiveButton>
                
                <InteractiveButton variant="glow" className="bg-transparent border-2 border-primary text-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto">
                  <Link to="/projects" className="flex items-center justify-center">
                    <BookOpen className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> View Research
                  </Link>
                </InteractiveButton>
                
                <InteractiveButton variant="neon" className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto">
                  <Link to="/resume" className="flex items-center justify-center">
                    <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Download Resume
                  </Link>
                </InteractiveButton>
              </motion.div>
            </motion.div>

            {/* Enhanced Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex-1 flex justify-center lg:justify-end order-1 lg:order-2 mb-8 lg:mb-0"
            >
              <div className="relative">
                {/* Enhanced Glow Effect - Reduced on mobile */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary/30 md:from-primary/50 to-secondary/30 md:to-secondary/50 rounded-full blur-2xl md:blur-3xl scale-110"
                  animate={{ 
                    scale: [1.1, 1.2, 1.1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Image Container with 3D effect */}
                <EnhancedCard 
                  variant="3d" 
                  className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden p-0 border-2 md:border-4 border-primary/30 cursor-pointer"
                >
                  <img
                    src={sonaliProfile}
                    alt="Sonali Patil - AI/ML Engineer"
                    className="w-full h-full object-cover object-top"
                  />
                </EnhancedCard>

                {/* Animated emoji bubbles - Hidden on small screens */}
                <div className="hidden sm:block">
                  <AnimatedEmojis />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator - Hidden on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary/50 rounded-full p-1 neon-glow"
          >
            <motion.div 
              className="w-1.5 h-3 bg-primary rounded-full mx-auto"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>
      
      {/* Floating Action Button - Hidden on small screens */}
      <div className="hidden sm:block">
        <FloatingActionButton actions={floatingActions} />
      </div>
      
      <AboutPage />
      <SkillsPage />
      
      {/* Marquee Gallery */}
      <MarqueeGallery images={galleryImages} speed={40} />
    </PageTransition>
  );
};

export default HomePage;
