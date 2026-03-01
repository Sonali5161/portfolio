import { motion } from 'framer-motion';
import { Trophy, Users, Code, Lightbulb, Calendar, MapPin, ExternalLink, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import PageTransition from '@/components/PageTransition';
import SectionTitle from '@/components/SectionTitle';

const experiences = [
  {
    id: 1,
    year: '2024',
    duration: '36 Hours',
    title: 'National Level Hackathon',
    company: 'TechFest India',
    location: 'Mumbai, India',
    description: 'Participated in a national-level hackathon, developing an AI-powered solution for smart traffic management. Collaborated with a cross-functional team to deliver a working prototype within 36 hours.',
    achievements: ['Top 10 Finalist', 'Best AI Implementation', 'Team Leadership'],
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'React'],
    icon: Trophy,
    type: 'Hackathon',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    id: 2,
    year: '2024',
    duration: '3 Months',
    title: 'AI/ML Workshop Lead',
    company: 'D.Y. Patil College',
    location: 'Kolhapur, India',
    description: 'Led technical workshops on machine learning and computer vision for fellow developers. Covered topics including neural networks, image processing, and practical implementations.',
    achievements: ['50+ Students Trained', 'Workshop Series Lead', 'Curriculum Design'],
    technologies: ['Python', 'Scikit-learn', 'Keras', 'Jupyter'],
    icon: Users,
    type: 'Workshop',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: 3,
    year: '2023',
    duration: '1 Day',
    title: 'Coding Competition Winner',
    company: 'CodeChef Regional',
    location: 'Pune, India',
    description: 'Secured top position in a regional coding competition, demonstrating strong algorithmic problem-solving skills and efficient code optimization techniques.',
    achievements: ['1st Place Winner', 'Fastest Solution', 'Algorithm Excellence'],
    technologies: ['C++', 'Data Structures', 'Algorithms', 'Problem Solving'],
    icon: Code,
    type: 'Competition',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
  },
  {
    id: 4,
    year: '2023',
    duration: '6 Months',
    title: 'Tech Innovation Challenge',
    company: 'Innovation Hub',
    location: 'Kolhapur, India',
    description: 'Developed an innovative accessibility solution using AI and signal processing. The project focused on silent speech recognition for individuals with speech impairments.',
    achievements: ['Innovation Award', 'Patent Filed', 'Social Impact Recognition'],
    technologies: ['Python', 'Signal Processing', 'ML', 'Arduino'],
    icon: Lightbulb,
    type: 'Innovation',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    id: 5,
    year: '2023',
    duration: 'Ongoing',
    title: 'Open Source Contribution',
    company: 'GitHub Community',
    location: 'Remote',
    description: 'Active contributor to open-source AI/ML projects, focusing on computer vision libraries and educational resources for the developer community.',
    achievements: ['100+ Contributions', 'Community Recognition', 'Maintainer Status'],
    technologies: ['Python', 'OpenCV', 'Git', 'Documentation'],
    icon: Code,
    type: 'Open Source',
    color: 'from-indigo-500 to-blue-500',
    bgColor: 'bg-indigo-500/10',
  },
  {
    id: 6,
    year: '2022',
    duration: '4 Months',
    title: 'Team Leadership Experience',
    company: 'AgriVani Project',
    location: 'Kolhapur, India',
    description: 'Led a team of developers in building a comprehensive agricultural platform, coordinating tasks, conducting code reviews, and ensuring timely project delivery.',
    achievements: ['Team of 8 Members', 'On-time Delivery', 'Agile Implementation'],
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
    icon: Users,
    type: 'Leadership',
    color: 'from-teal-500 to-green-500',
    bgColor: 'bg-teal-500/10',
  },
  {
    id: 7,
    year: '2024',
    duration: '2 Months',
    title: 'Cloud / DevOps Projects',
    company: 'Personal Projects',
    location: 'Remote',
    description: 'Designed and implemented CI/CD pipelines, containerized applications with Docker, orchestrated deployments using Kubernetes, and provisioned infrastructure using Terraform on AWS/GCP.',
    achievements: ['99.9% Uptime', 'Cost Optimization', 'Automated Deployments'],
    technologies: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
    icon: Code,
    type: 'Cloud / DevOps',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
  },
];

const ExperiencePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedExp, setSelectedExp] = useState(experiences[0]);

  const nextExperience = () => {
    const newIndex = (currentIndex + 1) % experiences.length;
    setCurrentIndex(newIndex);
    setSelectedExp(experiences[newIndex]);
  };

  const prevExperience = () => {
    const newIndex = (currentIndex - 1 + experiences.length) % experiences.length;
    setCurrentIndex(newIndex);
    setSelectedExp(experiences[newIndex]);
  };

  const selectExperience = (index: number) => {
    setCurrentIndex(index);
    setSelectedExp(experiences[index]);
  };

  return (
    <PageTransition>
      <section className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Experience & Achievements" 
            subtitle="My professional journey through time"
          />

          <div className="max-w-7xl mx-auto">
            {/* Stats Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 md:mb-16"
            >
              {[
                { label: 'Projects', value: '15+', icon: Code },
                { label: 'Hackathons', value: '8', icon: Trophy },
                { label: 'Workshops', value: '12', icon: Users },
                { label: 'Awards', value: '6', icon: Star },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass rounded-xl p-4 text-center group cursor-pointer"
                >
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Horizontal Roadmap */}
            <div className="relative mb-12">
              {/* Navigation Arrows */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevExperience}
                  className="w-12 h-12 rounded-full glass hover:bg-primary/10"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextExperience}
                  className="w-12 h-12 rounded-full glass hover:bg-primary/10"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              {/* Horizontal Timeline Container */}
              <div className="mx-20 py-8">
                {/* Timeline Line */}
                <div className="relative mb-16">
                  <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full">
                    {/* Progress Indicator */}
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-lg glow"
                      animate={{
                        left: `${(currentIndex / (experiences.length - 1)) * 100}%`,
                        x: '-50%',
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </div>

                  {/* Timeline Nodes - Horizontal Layout */}
                  <div className="absolute top-1/2 -translate-y-1/2 w-full">
                    <div className="flex justify-between items-center">
                      {experiences.map((exp, index) => (
                        <motion.div
                          key={exp.id}
                          className="relative flex flex-col items-center cursor-pointer group"
                          onClick={() => selectExperience(index)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {/* Node Circle */}
                          <motion.div
                            className={`w-16 h-16 rounded-full ${exp.bgColor} flex items-center justify-center border-4 transition-all duration-300 ${
                              currentIndex === index 
                                ? 'border-primary shadow-lg shadow-primary/25 scale-110' 
                                : 'border-border/30 group-hover:border-primary/50'
                            }`}
                            animate={{
                              scale: currentIndex === index ? 1.2 : 1,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <exp.icon className={`h-8 w-8 transition-colors ${
                              currentIndex === index ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                            }`} />
                          </motion.div>

                          {/* Labels Below Node */}
                          <div className="absolute top-20 flex flex-col items-center min-w-max">
                            <span className={`text-sm font-semibold transition-colors mb-1 ${
                              currentIndex === index ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                            }`}>
                              {exp.year}
                            </span>
                            <span className="text-xs text-muted-foreground text-center px-2">
                              {exp.type}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Experience Details */}
            <motion.div
              key={selectedExp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                <selectedExp.icon className="w-full h-full text-primary" />
              </div>

              {/* Gradient Border */}
              <div className={`absolute inset-0 bg-gradient-to-r ${selectedExp.color} opacity-10 rounded-2xl`} />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div className="flex items-start gap-4 mb-4 md:mb-0">
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-20 h-20 rounded-2xl ${selectedExp.bgColor} flex items-center justify-center flex-shrink-0`}
                    >
                      <selectedExp.icon className="h-10 w-10 text-primary" />
                    </motion.div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-4 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${selectedExp.color} text-white`}>
                          {selectedExp.type}
                        </span>
                        <span className="text-muted-foreground text-sm">{selectedExp.year}</span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                        {selectedExp.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {selectedExp.company}
                        </div>
                        <span className="hidden sm:inline">•</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {selectedExp.location}
                        </div>
                        <span className="hidden sm:inline">•</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {selectedExp.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                  {selectedExp.description}
                </p>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Key Achievements</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExp.achievements.map((achievement, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                      >
                        {achievement}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExp.technologies.map((tech, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1 bg-background/50 text-foreground text-sm rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ExperiencePage;
