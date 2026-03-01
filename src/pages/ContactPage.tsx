import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Github, Linkedin, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { EnhancedLoading } from '@/components/ui/enhanced-loading';
import PageTransition from '@/components/PageTransition';
import SectionTitle from '@/components/SectionTitle';
import { contactApi, ApiError } from '@/services/api';
import type { ContactFormData } from '@/services/api';

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setError(null);
    setFieldErrors({});

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await contactApi.sendMessage(formData);
      
      if (response.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success state after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        
        // Handle field-specific errors
        if (err.errors) {
          const errors: Record<string, string> = {};
          err.errors.forEach(error => {
            errors[error.field] = error.message;
          });
          setFieldErrors(errors);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
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

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 order-2 lg:order-1"
            >
              <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
                Send a Message
              </h3>

              {/* Error Alert */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 sm:mb-6 p-3 sm:p-4 bg-destructive/10 border border-destructive/50 rounded-lg flex items-start gap-3"
                >
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-destructive font-medium text-sm sm:text-base">Error</p>
                    <p className="text-destructive/80 text-xs sm:text-sm">{error}</p>
                  </div>
                </motion.div>
              )}

              {/* Success Alert */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 sm:mb-6 p-3 sm:p-4 bg-primary/10 border border-primary/50 rounded-lg flex items-start gap-3"
                >
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-primary font-medium text-sm sm:text-base">Message Sent!</p>
                    <p className="text-primary/80 text-xs sm:text-sm">Thank you for reaching out. I'll get back to you soon.</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      setFieldErrors({ ...fieldErrors, name: '' });
                    }}
                    className={`bg-background/50 border-border/50 focus:border-primary h-10 sm:h-11 text-sm sm:text-base ${
                      fieldErrors.name ? 'border-destructive' : ''
                    }`}
                    disabled={isSubmitting}
                  />
                  {fieldErrors.name && (
                    <p className="text-destructive text-xs sm:text-sm mt-1">{fieldErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setFieldErrors({ ...fieldErrors, email: '' });
                    }}
                    className={`bg-background/50 border-border/50 focus:border-primary h-10 sm:h-11 text-sm sm:text-base ${
                      fieldErrors.email ? 'border-destructive' : ''
                    }`}
                    disabled={isSubmitting}
                  />
                  {fieldErrors.email && (
                    <p className="text-destructive text-xs sm:text-sm mt-1">{fieldErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project or opportunity..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      setFieldErrors({ ...fieldErrors, message: '' });
                    }}
                    className={`bg-background/50 border-border/50 focus:border-primary resize-none text-sm sm:text-base ${
                      fieldErrors.message ? 'border-destructive' : ''
                    }`}
                    disabled={isSubmitting}
                  />
                  {fieldErrors.message && (
                    <p className="text-destructive text-xs sm:text-sm mt-1">{fieldErrors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full h-11 sm:h-12 text-sm sm:text-base"
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <EnhancedLoading variant="spinner" size="sm" />
                      <span>Sending...</span>
                    </div>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6 order-1 lg:order-2"
            >
              <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
                  Contact Information
                </h3>

                <div className="space-y-3 sm:space-y-4">
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
                          className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-background/30 hover:bg-primary/10 transition-colors group touch-target"
                        >
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm text-muted-foreground">{item.label}</p>
                            <p className="text-sm sm:text-base text-foreground font-medium group-hover:text-primary transition-colors truncate">
                              {item.value}
                            </p>
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-background/30">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center">
                            <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
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
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center"
              >
                <h4 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2">
                  Open to Opportunities
                </h4>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                  Looking for AI/ML engineering roles, research positions, and exciting collaborations.
                </p>
                <div className="flex justify-center gap-3 sm:gap-4">
                  <a
                    href="https://github.com/Sonali5161"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 glass rounded-full glow-hover transition-transform hover:scale-110 touch-target"
                  >
                    <Github className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 glass rounded-full glow-hover transition-transform hover:scale-110 touch-target"
                  >
                    <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
                  </a>
                  <a
                    href="mailto:patilsonali5161@gmail.com"
                    className="p-2.5 sm:p-3 glass rounded-full glow-hover transition-transform hover:scale-110 touch-target"
                  >
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ContactPage;
