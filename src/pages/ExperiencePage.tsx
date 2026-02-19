import { motion } from 'framer-motion';
import { Trophy, Users, Code, Lightbulb } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import SectionTitle from '@/components/SectionTitle';

const experiences = [
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

const ExperiencePage = () => {
  return (
    <PageTransition>
      <section className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Experience & Achievements" 
            subtitle="Milestones and accomplishments in my journey"
          />

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
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 bg-primary rounded-full glow z-10">
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30" />
                </div>

                {/* Content */}
                <div className={`ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="glass rounded-2xl p-6 card-hover"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <exp.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <span className="text-primary text-sm font-semibold">{exp.year}</span>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span className="text-muted-foreground text-sm">{exp.type}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
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
      </section>
    </PageTransition>
  );
};

export default ExperiencePage;
