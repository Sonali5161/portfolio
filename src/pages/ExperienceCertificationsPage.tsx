import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, Code, Lightbulb, Award, ExternalLink, Calendar, MapPin, Building, CheckCircle, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import PageTransition from '@/components/PageTransition';
import SectionTitle from '@/components/SectionTitle';

interface Experience {
  id: number;
  year: string;
  title: string;
  description: string;
  icon: any;
  type: string;
}

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  credentialId?: string;
  link?: string;
  image: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    year: '2024',
    title: 'National Level Hackathon',
    description: 'Participated in a national-level hackathon, developing an AI-powered solution for smart traffic management. Collaborated with a cross-functional team to deliver a working prototype within 36 hours.',
    icon: Trophy,
    type: 'Hackathon',
  },
  {
    id: 2,
    year: '2024',
    title: 'AI/ML Workshop Lead',
    description: 'Led technical workshops on machine learning and computer vision for fellow developers. Covered topics including neural networks, image processing, and practical implementations.',
    icon: Users,
    type: 'Workshop',
  },
  {
    id: 3,
    year: '2023',
    title: 'Coding Competition Winner',
    description: 'Secured top position in a regional coding competition, demonstrating strong algorithmic problem-solving skills and efficient code optimization techniques.',
    icon: Code,
    type: 'Competition',
  },
  {
    id: 4,
    year: '2023',
    title: 'Tech Innovation Challenge',
    description: 'Developed an innovative accessibility solution using AI and signal processing. The project focused on silent speech recognition for individuals with speech impairments.',
    icon: Lightbulb,
    type: 'Innovation',
  },
  {
    id: 5,
    year: '2023',
    title: 'Open Source Contribution',
    description: 'Active contributor to open-source AI/ML projects, focusing on computer vision libraries and educational resources for the developer community.',
    icon: Code,
    type: 'Open Source',
  },
  {
    id: 6,
    year: '2022',
    title: 'Team Leadership Experience',
    description: 'Led a team of developers in building a comprehensive agricultural platform, coordinating tasks, conducting code reviews, and ensuring timely project delivery.',
    icon: Users,
    type: 'Leadership',
  },
  {
    id: 7,
    year: '2024',
    title: 'Cloud / DevOps Projects',
    description: 'Designed and implemented CI/CD pipelines, containerized applications with Docker, orchestrated deployments using Kubernetes, and provisioned infrastructure using Terraform on AWS/GCP to ensure scalable, reliable production systems.',
    icon: Code,
    type: 'Cloud / DevOps',
  },
];

const certifications: Certification[] = [
  {
    id: 1,
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: 'March 2024',
    description: 'Comprehensive certification covering AWS cloud architecture, security, scalability, and cost optimization. Demonstrated expertise in designing distributed systems on AWS.',
    skills: ['AWS', 'Cloud Architecture', 'Security', 'Scalability', 'Cost Optimization'],
    credentialId: 'AWS-CSA-2024-001',
    link: 'https://aws.amazon.com/certification/',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    title: 'Google Cloud Professional Data Engineer',
    issuer: 'Google Cloud',
    date: 'February 2024',
    description: 'Advanced certification in data engineering, machine learning pipelines, and big data solutions on Google Cloud Platform.',
    skills: ['GCP', 'Data Engineering', 'BigQuery', 'Machine Learning', 'Data Pipelines'],
    credentialId: 'GCP-PDE-2024-002',
    link: 'https://cloud.google.com/certification/',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    title: 'Microsoft Azure AI Engineer Associate',
    issuer: 'Microsoft',
    date: 'January 2024',
    description: 'Specialized certification in AI and machine learning solutions using Microsoft Azure cognitive services and ML frameworks.',
    skills: ['Azure', 'AI/ML', 'Cognitive Services', 'Python', 'TensorFlow'],
    credentialId: 'MS-AI-102-2024-003',
    link: 'https://docs.microsoft.com/en-us/learn/certifications/',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
  },
  {
    id: 4,
    title: 'Ideathon Winner',
    issuer: 'Arjun Innovation Incubation and Entrepreneurship Foundation',
    date: 'December 2023',
    description: 'First place winner in a national-level ideathon competition, presenting innovative solutions for sustainable technology and social impact.',
    skills: ['Innovation', 'Entrepreneurship', 'Sustainability', 'Presentation', 'Problem Solving'],
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
  },
  {
    id: 5,
    title: 'Geo-data Sharing and Cyber Security',
    issuer: 'ISRO IIRS',
    date: 'November 2023',
    description: 'Specialized training in geospatial data management, satellite imagery analysis, and cybersecurity protocols for space-based applications.',
    skills: ['GIS', 'Remote Sensing', 'Cybersecurity', 'Satellite Data', 'Geospatial Analysis'],
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop',
  },
  {
    id: 6,
    title: 'Cyber Security and Networking',
    issuer: 'Cisco',
    date: 'October 2023',
    description: 'Comprehensive certification covering network security, threat detection, incident response, and secure network architecture design.',
    skills: ['Network Security', 'Threat Detection', 'Incident Response', 'Cisco Technologies', 'Security Protocols'],
    credentialId: 'CISCO-SEC-2023-006',
    link: 'https://www.cisco.com/c/en/us/training-events/training-certifications.html',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
  },
];

const CertificationCard = ({ cert }: { cert: Certification }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative h-80 sm:h-96 perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={{ y: -8 }}
    >
      <motion.div
        className="relative w-full h-full preserve-3d transition-transform duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden">
          <EnhancedCard variant="glow" className="h-full overflow-hidden">
            <div className="relative h-32 sm:h-40 -m-4 sm:-m-6 mb-4">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 -mt-2">
              <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2 line-clamp-2">
                {cert.title}
              </h3>
              
              <div className="flex items-center gap-2 mb-3">
                <Building className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{cert.issuer}</span>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{cert.date}</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {cert.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                  >
                    {skill}
                  </span>
                ))}
                {cert.skills.length > 3 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                    +{cert.skills.length - 3}
                  </span>
                )}
              </div>

              <p className="text-xs text-center text-muted-foreground">
                Click to flip for details
              </p>
            </div>
          </EnhancedCard>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <EnhancedCard variant="glass" className="h-full">
            <div className="p-4 sm:p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {cert.description}
              </p>

              <div className="mb-4">
                <h4 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">
                  Skills Covered
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {cert.credentialId && (
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground">
                    <strong>Credential ID:</strong> {cert.credentialId}
                  </p>
                </div>
              )}

              {cert.link && (
                <Button variant="outline-glow" size="sm" asChild className="w-full">
                  <a href={cert.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Verify Certificate
                  </a>
                </Button>
              )}
            </div>
          </EnhancedCard>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExperienceCertificationsPage = () => {
  return (
    <PageTransition>
      <section className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Experience & Certifications" 
            subtitle="Professional journey and achievements"
          />

          {/* Experience Section */}
          <div className="mb-16 sm:mb-20 md:mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-8 sm:mb-12 text-center"
            >
              Professional Experience
            </motion.h2>

            <div className="max-w-4xl mx-auto relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary" />

              {/* Timeline Items */}
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center mb-8 sm:mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 bg-primary rounded-full glow z-10">
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30" />
                  </div>

                  {/* Content */}
                  <div className={`ml-16 sm:ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 lg:pr-12' : 'md:pl-8 lg:pl-12'}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 card-hover"
                    >
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <exp.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        </div>
                        <div>
                          <span className="text-primary text-sm font-semibold">{exp.year}</span>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <span className="text-muted-foreground text-sm">{exp.type}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Professional Certifications
              </h2>
              
              {/* Stats */}
              <div className="flex justify-center gap-6 sm:gap-8 mb-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">{certifications.length}</div>
                  <div className="text-sm text-muted-foreground">Certifications</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-secondary">3</div>
                  <div className="text-sm text-muted-foreground">Cloud Platforms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">2024</div>
                  <div className="text-sm text-muted-foreground">Latest Year</div>
                </div>
              </div>

              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Continuously expanding expertise through industry-recognized certifications and specialized training programs.
                Click on any certificate to see detailed information.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CertificationCard cert={cert} />
                </motion.div>
              ))}
            </div>

            {/* Continuous Learning Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 sm:mt-16 text-center"
            >
              <EnhancedCard variant="gradient" className="max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                    Continuous Learning
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Committed to staying at the forefront of technology through ongoing education and professional development.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    AI/ML Advancement
                  </span>
                  <span className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full">
                    Cloud Technologies
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    Cybersecurity
                  </span>
                </div>
              </EnhancedCard>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ExperienceCertificationsPage;