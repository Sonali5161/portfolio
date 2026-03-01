import { motion } from 'framer-motion';
import { useState } from 'react';

interface MarqueeGalleryProps {
  images: string[];
  speed?: number;
}

const MarqueeGallery = ({ images, speed = 30 }: MarqueeGalleryProps) => {
  const [isPaused, setIsPaused] = useState(false);
  
  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

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
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-4 md:gap-6"
          animate={{
            x: isPaused ? 0 : [0, -50 + '%'],
          }}
          transition={{
            x: {
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
              key={index}
              className="relative flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden glass cursor-pointer group"
              whileHover={{ scale: 1.05, zIndex: 20 }}
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

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-muted-foreground text-xs md:text-sm mt-8"
      >
        Hover to pause • Scroll to explore
      </motion.p>
    </section>
  );
};

export default MarqueeGallery;
