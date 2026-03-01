import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MarqueeGalleryProps {
  images: string[];
  speed?: number;
}

const MarqueeGallery = ({ images, speed = 40 }: MarqueeGalleryProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  // Double the images for seamless loop
  const duplicatedImages = [...images, ...images];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-advance functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, speed * 100); // Convert speed to milliseconds
      
      return () => clearInterval(interval);
    }
  }, [isPaused, images.length, speed]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    setTimeout(() => setIsPaused(false), 1000); // Resume auto-advance after 1 second
  };

  return (
    <section className="py-12 md:py-20 overflow-hidden bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center gradient-text mb-4"
        >
          Gallery
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-muted-foreground text-sm md:text-base max-w-2xl mx-auto"
        >
          A glimpse into my journey and experiences
        </motion.p>
      </div>

      <div className="relative">
        {/* Mobile Gallery with Touch Support */}
        <div className="block md:hidden">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-4"
              animate={{
                x: `-${currentIndex * (280)}px`, // 256px width + 24px gap
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Triple images for smooth loop on mobile too */}
              {[...images, ...images, ...images].map((image, index) => (
                <motion.div
                  key={`mobile-${index}`}
                  className="relative flex-shrink-0 w-64 h-64 rounded-2xl overflow-hidden glass cursor-pointer group"
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={image}
                    alt={`Gallery image ${(index % images.length) + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-active:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Overlay on tap for mobile */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-active:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-foreground font-medium text-sm">
                        Image {(index % images.length) + 1}
                      </p>
                    </div>
                  </div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/0 group-active:ring-primary/50 transition-all duration-300" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Marquee animation for desktop with manual controls */}
        <div className="hidden md:block">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-4 md:gap-6"
              animate={{
                x: isPaused 
                  ? `-${currentIndex * (320 + 24)}px`
                  : [
                      `-${currentIndex * (320 + 24)}px`,
                      `-${((currentIndex + images.length) * (320 + 24))}px`
                    ],
              }}
              transition={{
                x: isPaused 
                  ? { duration: 0.5, ease: "easeInOut" }
                  : {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: speed,
                      ease: "linear",
                    },
              }}
              onHoverStart={() => setIsPaused(true)}
              onHoverEnd={() => setIsPaused(false)}
            >
              {duplicatedImages.map((image, index) => (
                <motion.div
                  key={`marquee-${index}`}
                  className="relative flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden glass cursor-pointer group"
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={image}
                    alt={`Gallery image ${(index % images.length) + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-foreground font-medium text-sm md:text-base">
                        Image {(index % images.length) + 1}
                      </p>
                    </div>
                  </motion.div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/0 group-hover:ring-primary/50 transition-all duration-300" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary w-8' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom Scroll Bar with Arrows - Responsive */}
        <div className="flex justify-center mt-6 md:mt-8">
          <div className="relative w-full max-w-xs md:max-w-md">
            {/* Background bar */}
            <div className="h-10 md:h-12 lg:h-16 bg-background/80 backdrop-blur-sm border-2 border-primary/30 rounded-full flex items-center justify-between px-3 md:px-4 overflow-hidden">
              {/* Left arrows */}
              <button
                onClick={prevSlide}
                className="flex items-center gap-0.5 md:gap-1 hover:scale-110 active:scale-95 transition-transform touch-target"
                aria-label="Previous images"
              >
                {[...Array(isMobile ? 3 : 4)].map((_, i) => (
                  <motion.div
                    key={`left-${i}`}
                    animate={{
                      x: [-3, 3, -3],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut",
                    }}
                  >
                    <ChevronLeft className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-primary" />
                  </motion.div>
                ))}
              </button>

              {/* Center scroll indicator */}
              <div className="flex-1 mx-2 md:mx-4 relative">
                <div className="h-0.5 md:h-1 bg-muted-foreground/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    style={{
                      width: `${((currentIndex + 1) / images.length) * 100}%`,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                {/* Moving indicator */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 md:w-3 md:h-3 bg-primary rounded-full shadow-lg"
                  animate={{
                    left: `${(currentIndex / (images.length - 1)) * 100}%`,
                    x: '-50%',
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Right arrows */}
              <button
                onClick={nextSlide}
                className="flex items-center gap-0.5 md:gap-1 hover:scale-110 active:scale-95 transition-transform touch-target"
                aria-label="Next images"
              >
                {[...Array(isMobile ? 3 : 4)].map((_, i) => (
                  <motion.div
                    key={`right-${i}`}
                    animate={{
                      x: [-3, 3, -3],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut",
                    }}
                  >
                    <ChevronRight className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-primary" />
                  </motion.div>
                ))}
              </button>
            </div>

            {/* Progress text */}
            <div className="text-center mt-1 md:mt-2">
              <span className="text-xs md:text-sm text-muted-foreground">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-muted-foreground text-xs md:text-sm mt-8"
      >
        <span className="hidden md:inline">Hover to pause • Click arrows to navigate • </span>
        <span className="md:hidden">Swipe to explore • </span>
        Scroll to explore
      </motion.p>
    </section>
  );
};

export default MarqueeGallery;
