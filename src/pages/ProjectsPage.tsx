import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Eye, Star, GitFork } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { InteractiveButton } from '@/components/ui/interactive-button';
import PageTransition from '@/components/PageTransition';
import SectionTitle from '@/components/SectionTitle';

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  github: string;
  demo?: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Exam Cheating Detection System',
    description: 'AI-based exam monitoring system that detects suspicious behavior using computer vision.',
    fullDescription: 'An advanced AI-powered exam monitoring system designed to detect and prevent cheating in both online and offline examination environments. The system uses state-of-the-art computer vision algorithms to analyze student behavior in real-time, identifying suspicious activities such as unauthorized device usage, communication attempts, and abnormal eye movements. This solution significantly improves academic integrity while maintaining a non-intrusive examination experience.',
    technologies: ['Python', 'OpenCV', 'YOLO', 'Deep Learning', 'Flask'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    title: 'AI-Driven Smart Traffic Signal Optimization',
    description: 'Intelligent traffic signal control system that adjusts timing based on real-time vehicle density.',
    fullDescription: 'A cutting-edge intelligent traffic management system that leverages AI and computer vision to optimize traffic flow at intersections. The system analyzes real-time vehicle density from multiple camera feeds, dynamically adjusting signal timing to minimize congestion and waiting times. By reducing idle time at intersections, this solution contributes to lower emissions and improved urban mobility.',
    technologies: ['Python', 'TensorFlow', 'YOLO', 'Computer Vision', 'IoT'],
    github: 'https://github.com/Sonali5161/Traffic_monitor_cv',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    title: 'Silent Speech AI',
    description: 'AI system that interprets speech without sound using visual and signal-based inputs.',
    fullDescription: 'An innovative accessibility-focused AI system that enables communication without audible speech. Using advanced signal processing and visual input analysis, the system interprets lip movements and other visual cues to understand speech intent. This technology has significant applications in assistive technology for individuals with speech impairments, as well as in noisy environments or situations requiring silent communication.',
    technologies: ['Python', 'Deep Learning', 'Signal Processing', 'OpenCV', 'TensorFlow'],
    github: 'https://github.com/Sonali5161/Silent_Speech_Ai',
    demo: 'https://demo.com',
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=600&fit=crop',
  },
  {
    id: 4,
    title: 'AgriConnect',
    description: 'Digital platform connecting farmers and consumers for improved agricultural transparency.',
    fullDescription: 'A comprehensive digital platform designed to bridge the gap between agricultural producers and consumers. AgriConnect provides farmers with tools for market access, pricing insights, and direct consumer connections, while consumers benefit from transparency in sourcing and quality. The platform incorporates data-driven insights to support smart decision-making in agricultural operations, promoting sustainable farming practices.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Python', 'Machine Learning'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop',
  },
  {
    id: 5,
    title: 'Unity Games',
    description: 'Collection of games developed using Unity Engine with focus on gameplay mechanics and UI.',
    fullDescription: 'A portfolio of interactive games developed using the Unity Engine, showcasing expertise in game development, 3D environment design, and interactive user experiences. Each game demonstrates proficiency in gameplay mechanics, physics systems, UI/UX design, and logic scripting. Projects range from puzzle games to action-adventure experiences, all built with clean, maintainable code architecture.',
    technologies: ['Unity', 'C#', '3D Modeling', 'Game Design', 'UI/UX'],
    github: 'https://github.com',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
  },
];

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  return (
    <EnhancedCard
      variant="3d"
      className="overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden -m-6 mb-4">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <motion.div 
          className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center"
          whileHover={{ backgroundColor: "rgba(var(--primary), 0.1)" }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Eye className="h-12 w-12 text-foreground" />
          </motion.div>
        </motion.div>
        
        {/* Floating badges */}
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs flex items-center gap-1"
          >
            <Star className="w-3 h-3" />
            {Math.floor(Math.random() * 50) + 10}
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-secondary/90 text-secondary-foreground px-2 py-1 rounded-full text-xs flex items-center gap-1"
          >
            <GitFork className="w-3 h-3" />
            {Math.floor(Math.random() * 20) + 5}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 -mt-2">
        <motion.h3 
          className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors"
          whileHover={{ x: 5 }}
        >
          {project.title}
        </motion.h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md hover:bg-primary/20 transition-colors"
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Actions: show GitHub for all; only AgriConnect shows Live link */}
        <div className="flex gap-2">
          <InteractiveButton
            variant="magnetic"
            className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-4 py-2 text-sm"
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.github, '_blank');
            }}
          >
            <Github className="h-4 w-4 mr-2" /> GitHub
          </InteractiveButton>
          {project.title === 'AgriConnect' && project.demo && (
            <InteractiveButton
              variant="glow"
              className="bg-primary text-primary-foreground px-4 py-2 text-sm"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.demo, '_blank');
              }}
            >
              <ExternalLink className="h-4 w-4 mr-2" /> Live
            </InteractiveButton>
          )}
        </div>
      </div>
    </EnhancedCard>
  );
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-strong rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Image */}
        <div className="relative h-64 md:h-80">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-8 -mt-20 relative">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            {project.title}
          </h2>
          
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            {project.fullDescription}
          </p>

          {/* Technologies */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button variant="outline-glow" size="lg" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" /> View on GitHub
              </a>
            </Button>
              {project.title === 'AgriConnect' && project.demo && (
                <Button variant="hero" size="lg" asChild>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-5 w-5" /> Live
                  </a>
                </Button>
              )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <PageTransition>
      <section className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Projects" 
            subtitle="Innovative solutions built with cutting-edge technologies"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </section>
    </PageTransition>
  );
};

export default ProjectsPage;
