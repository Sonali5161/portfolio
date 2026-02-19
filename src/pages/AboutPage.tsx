import { motion } from 'framer-motion';
import { Sparkles, Target, Lightbulb, Users } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import SectionTitle from '@/components/SectionTitle';
import sonaliProfile from '@/assets/sonuu.jpeg';

const highlights = [
  {
    icon: Sparkles,
    title: 'AI/ML Expertise',
    description: 'Building intelligent systems with machine learning, deep learning, and computer vision technologies.',
  },
  {
    icon: Target,
    title: 'Research Focus',
    description: 'Passionate about applying AI to education, smart infrastructure, accessibility, and agriculture.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Driven',
    description: 'Committed to developing impactful technology solutions that solve real-world problems.',
  },
  {
    icon: Users,
    title: 'Collaborative Spirit',
    description: 'Experienced in working with cross-functional teams to deliver production-ready applications.',
  },
];

const AboutPage = () => {
  return (
    <PageTransition>
      <section className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="About Me" 
            subtitle="Passionate about building intelligent systems that make a difference"
          />

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden gradient-border glow">
                <img
                  src={sonaliProfile}
                  alt="Sonali Patil"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-primary/30 rounded-2xl" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-secondary/20 rounded-2xl blur-xl" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="font-display text-3xl font-bold text-foreground">
                AI/ML Professional & Technologist
              </h3>
              
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  I'm an AI/ML professional with extensive experience in building intelligent, 
                  real-world systems. My work spans across machine learning, computer vision, 
                  and web technologies, where I focus on creating solutions that bridge the 
                  gap between research and practical applications.
                </p>
                <p>
                  My interests lie in applying AI to transformative domains including 
                  education, smart infrastructure, accessibility, and agriculture. I believe 
                  technology should serve humanity, and I'm dedicated to developing solutions 
                  that have meaningful, positive impacts.
                </p>
                <p>
                  With a strong foundation in both theoretical concepts and hands-on 
                  implementation, I bring a research-oriented approach to every project, 
                  ensuring that solutions are not only innovative but also robust and scalable.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                {[
                  { value: '5+', label: 'Projects' },
                  { value: '3+', label: 'Research Papers' },
                  { value: '3+', label: 'Certifications' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 glass rounded-xl"
                  >
                    <div className="font-display text-3xl font-bold gradient-text mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Highlights Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 card-hover group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h4 className="font-display text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default AboutPage;
