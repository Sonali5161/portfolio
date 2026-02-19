import { motion } from 'framer-motion';
import { Code2, Globe, Brain, Wrench } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import SectionTitle from '@/components/SectionTitle';

const skillCategories = [
  {
    title: 'Programming & Core',
    icon: Code2,
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'C / C++', level: 80 },
    ],
  },
  {
    title: 'Web Development',
    icon: Globe,
    skills: [
      { name: 'HTML & CSS', level: 90 },
      { name: 'React JS', level: 85 },
      { name: 'Responsive UI Design', level: 88 },
    ],
  },
  {
    title: 'AI / ML',
    icon: Brain,
    skills: [
      { name: 'Machine Learning', level: 88 },
      { name: 'Deep Learning', level: 82 },
      { name: 'Computer Vision (YOLO, OpenCV)', level: 85 },
      { name: 'Signal & Speech Processing', level: 78 },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: Wrench,
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'Linux / Ubuntu', level: 85 },
      { name: 'Cloud / DevOps', level: 80 },
      { name: 'CUDA (Python & C++)', level: 75 },
      { name: 'VS Code', level: 92 },
    ],
  },
];

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="mb-4"
    >
      <div className="flex justify-between mb-2">
        <span className="text-foreground font-medium">{name}</span>
        <span className="text-primary font-semibold">{level}%</span>
      </div>
      <div className="skill-bar">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.2, ease: 'easeOut' }}
          className="skill-bar-fill"
        />
      </div>
    </motion.div>
  );
};

const SkillsPage = () => {
  return (
    <PageTransition>
      <section className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Skills & Expertise" 
            subtitle="Technologies and tools I use to bring ideas to life"
          />

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
                className="glass rounded-2xl p-8 card-hover"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <category.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={catIndex * 0.1 + skillIndex * 0.05}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills Tags */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <h3 className="font-display text-2xl font-bold text-foreground mb-8">
              Additional Technologies
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'TensorFlow', 'PyTorch', 'scikit-learn', 'NumPy', 'Pandas',
                'OpenCV', 'YOLO', 'Unity', 'AR/VR', 'REST APIs',
                'Node.js', 'SQL', 'MongoDB', 'Docker', 'Jupyter'
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 glass rounded-full text-sm font-medium text-foreground glow-hover cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default SkillsPage;
