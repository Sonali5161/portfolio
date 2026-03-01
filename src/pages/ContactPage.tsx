import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PageTransition from '@/components/PageTransition';
import SectionTitle from '@/components/SectionTitle';

const ContactPage = () => {
  const [userEmail, setUserEmail] = useState('');

  const handleSayHello = () => {
    const subject = encodeURIComponent('Hello from Portfolio');
    const body = encodeURIComponent(`Hi Sonali,\n\nI visited your portfolio and would like to connect.\n\nBest regards,\n${userEmail || 'Visitor'}`);
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=patilsonali5161@gmail.com&su=${subject}&body=${body}`, '_blank');
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'patilsonali5161@gmail.com', href: 'mailto:patilsonali5161@gmail.com' },
    { icon: Github, label: 'GitHub', value: 'github.com/Sonali5161', href: 'https://github.com/Sonali5161'},
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/sonali', href: 'https://linkedin.com' },
    { icon: MapPin, label: 'Location', value: 'Kolhapur, India', href: null },
  ];

  return (
    <PageTransition>
      <section className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Get In Touch" 
            subtitle="Let's connect and discuss opportunities"
          />

          <div className="max-w-3xl mx-auto">
            {/* Main CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-center mb-8 sm:mb-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow"
              >
                <Mail className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
              </motion.div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 gradient-text">
                Let's Work Together
              </h2>
              
              <p className="text-muted-foreground text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>

              {/* Email Input */}
              <div className="max-w-md mx-auto mb-6">
                <Input
                  type="email"
                  placeholder="Enter your email (optional)"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-primary h-12 sm:h-14 text-sm sm:text-base text-center"
                />
              </div>

              <button
                onClick={handleSayHello}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 sm:px-12 py-6 sm:py-7 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl hover:scale-105 transition-transform glow-hover cursor-pointer"
              >
                <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                Say Hello
              </button>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass rounded-xl sm:rounded-2xl p-6 sm:p-8"
            >
              <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-6 text-center">
                Contact Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-4 p-4 rounded-xl bg-background/30 hover:bg-primary/10 transition-all group touch-target hover:scale-105"
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm text-muted-foreground">{item.label}</p>
                          <p className="text-sm sm:text-base text-foreground font-medium group-hover:text-primary transition-colors truncate">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-background/30">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm text-muted-foreground">{item.label}</p>
                          <p className="text-sm sm:text-base text-foreground font-medium truncate">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 sm:mt-12 text-center"
            >
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                Open to AI/ML engineering roles, research positions, and exciting collaborations
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://github.com/Sonali5161"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 glass rounded-full glow-hover transition-transform hover:scale-110 touch-target"
                >
                  <Github className="h-6 w-6 text-foreground" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 glass rounded-full glow-hover transition-transform hover:scale-110 touch-target"
                >
                  <Linkedin className="h-6 w-6 text-foreground" />
                </a>
                <a
                  href="mailto:patilsonali5161@gmail.com"
                  className="p-4 glass rounded-full glow-hover transition-transform hover:scale-110 touch-target"
                >
                  <Mail className="h-6 w-6 text-foreground" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ContactPage;
