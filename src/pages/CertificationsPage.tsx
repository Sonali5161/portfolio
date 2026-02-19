import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import PageTransition from '@/components/PageTransition';
import SectionTitle from '@/components/SectionTitle';

const certifications = [
  {
    id: 1,
    title: 'NVIDIA CUDA Python Certification',
    issuer: 'NVIDIA',
    description: 'Advanced certification in GPU computing using CUDA with Python, covering parallel programming, memory optimization, and high-performance computing techniques.',
    skills: ['CUDA', 'Python', 'GPU Computing', 'Parallel Programming'],
    link: 'https://nvidia.com',
    icon: '🟢',
  },
  {
    id: 2,
    title: 'NVIDIA CUDA C++ Certification',
    issuer: 'NVIDIA',
    description: 'Comprehensive certification in CUDA C++ programming, including kernel optimization, shared memory usage, and performance profiling for GPU-accelerated applications.',
    skills: ['CUDA', 'C++', 'Performance Optimization', 'Memory Management'],
    link: 'https://nvidia.com',
    icon: '🟢',
  },
  {
    id: 3,
    title: 'Linux & Open-Source Training',
    issuer: 'Linux Foundation',
    description: 'Extensive training in Linux system administration, shell scripting, and open-source development practices, enabling efficient development and deployment workflows.',
    skills: ['Linux', 'Shell Scripting', 'System Administration', 'Open Source'],
    link: 'https://linuxfoundation.org',
    icon: '🐧',
  },
  {
    id: 4,
    title: 'Ideathon Winner',
    issuer: 'Arjun Innovation Incubation and Entrepreneurship Foundation',
    description: 'Recognition for innovative solution development in ideathon competition, demonstrating creative problem-solving skills and entrepreneurial thinking in technology innovation.',
    skills: ['Innovation', 'Entrepreneurship', 'Problem Solving', 'Technology'],
    link: '#',
    icon: '💡',
  },
  {
    id: 5,
    title: 'Geo-data Sharing and Cyber Security',
    issuer: 'ISRO IIRS',
    description: 'Specialized certification in geospatial data management and cybersecurity protocols, covering satellite data processing, secure data sharing, and space technology applications.',
    skills: ['Geospatial Data', 'Cyber Security', 'Satellite Technology', 'Data Management'],
    link: 'https://iirs.gov.in',
    icon: '🛰️',
  },
  {
    id: 6,
    title: 'Cyber Security and Networking',
    issuer: 'Cisco',
    description: 'Comprehensive certification in network security, covering threat detection, network infrastructure protection, security protocols, and incident response strategies.',
    skills: ['Network Security', 'Threat Detection', 'Security Protocols', 'Incident Response'],
    link: 'https://cisco.com',
    icon: '🔒',
  },
];

const CertificationsPage = () => {
  return (
    <PageTransition>
      <section className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Certifications" 
            subtitle="Professional certifications and credentials showcasing expertise across multiple domains"
          />

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
          >
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{certifications.length}</div>
              <div className="text-sm text-muted-foreground">Certifications</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">5</div>
              <div className="text-sm text-muted-foreground">Organizations</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">20+</div>
              <div className="text-sm text-muted-foreground">Skills</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Verified</div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {certifications.map((cert, index) => (
              <EnhancedCard
                key={cert.id}
                variant="3d"
                className="p-8 group relative overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Badge Glow Effect */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Flip card (replaces emoji icon) */}
                  <div className="w-24 h-24 mb-6 relative z-10 flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front rounded-2xl bg-primary/10 w-full h-full flex items-center justify-center text-4xl transition-colors group-hover:bg-primary/20 overflow-hidden">
                        <Award className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flip-card-back rounded-2xl bg-primary/20 w-full h-full text-sm p-2 text-center overflow-hidden">
                        <div className="text-xs font-semibold text-foreground break-words line-clamp-2">{cert.issuer}</div>
                        <div className="text-[10px] text-muted-foreground">Click to view</div>
                      </div>
                    </div>
                  </div>

                  {/* Badge Icon (top-right) */}
                  <div className="absolute top-4 right-4">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors"
                    >
                      <Award className="h-4 w-4 text-primary" />
                    </motion.div>
                  </div>

                  {/* Verified Badge (inline to avoid overlap) */}
                  <div className="mb-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className="flex items-center gap-2 text-green-500 text-sm"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-xs text-green-500">Verified</span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 relative z-10 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-4 relative z-10 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {cert.issuer}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 relative z-10">
                    {cert.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                    {cert.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md hover:bg-primary/20 transition-colors cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Action */}
                  <Button 
                    variant="outline-glow" 
                    size="sm" 
                    className="relative z-10 w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all" 
                    asChild
                  >
                    <a href={cert.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> 
                      {cert.link === '#' ? 'Certificate Pending' : 'View Certificate'}
                    </a>
                  </Button>
                </motion.div>
              </EnhancedCard>
            ))}
          </div>

          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Continuous Learning Journey
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                These certifications represent my commitment to staying current with emerging technologies 
                and industry best practices. From GPU computing and cybersecurity to innovation and 
                entrepreneurship, each certification has contributed to my comprehensive skill set in 
                AI/ML engineering and technology leadership.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>All certificates verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="h-4 w-4 text-primary" />
                  <span>Industry recognized</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-secondary" />
                  <span>Continuously updated</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default CertificationsPage;
