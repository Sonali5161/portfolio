import { motion } from 'framer-motion';
import { Download, FileText, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import SectionTitle from '@/components/SectionTitle';

const ResumePage = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Sonali_Patil_Resume (1).pdf';
    link.download = 'Sonali_Patil_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PageTransition>
      <section className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Resume"
            subtitle="Download my professional resume"
          />

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12"
            >
              {/* Resume Preview */}
              <div className="aspect-[8.5/11] bg-background rounded-lg sm:rounded-xl mb-6 sm:mb-8 relative overflow-hidden border border-border/50">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5" />

                <div className="p-4 sm:p-6 md:p-8 lg:p-12 h-full flex flex-col text-xs sm:text-sm">
                  {/* Header */}
                  <div className="text-center mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-border/30">
                    <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold gradient-text">
                      Sonali Patil
                    </h2>
                    <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
                      Innovative AI Engineer | Research-Oriented Technologist
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 sm:mt-2">
                      Kolhapur • +91 8856855161 • patilsonali5161@gmail.com
                    </p>
                  </div>

                  {/* Body */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 flex-1">
                    {/* Left */}
                    <div className="space-y-3 sm:space-y-4 md:space-y-5">
                      <div>
                        <h3 className="text-primary font-semibold uppercase mb-1 sm:mb-2 text-xs sm:text-sm">
                          Summary
                        </h3>
                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                          Innovative AI Engineer with strong observational and
                          research skills, driving problem-solving and solution
                          design. Passionate about intelligent systems, emerging
                          technologies, and deep-rooted sciences and biotechnology.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-primary font-semibold uppercase mb-1 sm:mb-2 text-xs sm:text-sm">
                          Skills
                        </h3>
                        <ul className="text-muted-foreground space-y-0.5 sm:space-y-1 text-xs sm:text-sm">
                          <li>• Machine Learning & Deep Learning</li>
                          <li>• Python, DSA & SQL</li>
                          <li>• AR/VR & Game Development</li>
                          <li>• Cloud (AWS, GCP, Azure)</li>
                          <li>• Leadership & Project Management</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-primary font-semibold uppercase mb-1 sm:mb-2 text-xs sm:text-sm">
                          Additional Info
                        </h3>
                        <p className="text-muted-foreground text-xs sm:text-sm">
                          Languages: Hindi, Marathi, English, Japanese (Elementary)
                        </p>
                        <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
                          Certifications: NVIDIA CUDA (Python & C++), AWS Gen AI,
                          Cisco Cyber Security
                        </p>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="space-y-3 sm:space-y-4 md:space-y-5">
                      <div>
                        <h3 className="text-primary font-semibold uppercase mb-1 sm:mb-2 text-xs sm:text-sm">
                          Education
                        </h3>
                        <p className="text-muted-foreground font-medium text-xs sm:text-sm">
                          B.Tech – CSE (AI & ML)
                        </p>
                        <p className="text-muted-foreground text-xs sm:text-sm">
                          D.Y. Patil College of Engineering & Technology, Kolhapur
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2023 – 2027
                        </p>
                      </div>

                      <div>
                        <h3 className="text-primary font-semibold uppercase mb-1 sm:mb-2 text-xs sm:text-sm">
                          Experience
                        </h3>
                        <p className="text-muted-foreground font-medium text-xs sm:text-sm">
                          AR/VR Club – DYPCET
                        </p>
                        <ul className="text-muted-foreground space-y-0.5 sm:space-y-1 text-xs sm:text-sm">
                          <li>• Unity & AR workshops</li>
                          <li>• Immersive 3D environments</li>
                          <li>• Education & gaming simulations</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-primary font-semibold uppercase mb-1 sm:mb-2 text-xs sm:text-sm">
                          Projects
                        </h3>
                        <ul className="text-muted-foreground space-y-0.5 sm:space-y-1 text-xs sm:text-sm">
                          <li>• Cheating Detection System</li>
                          <li>• Election Data Prediction</li>
                          <li>• AgriVani Platform</li>
                          <li>• 3D AR/VR Racing Game</li>
                          <li>• Ellora Caves Simulation</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto pt-3 sm:pt-4 border-t border-border/30 text-center">
                    <p className="text-xs text-muted-foreground">
                      Preview of resume • Download PDF for full details
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <FileText className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 text-primary" />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={handleDownload}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
                >
                  <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Download Resume
                </Button>
                <Button
                  variant="outline-glow"
                  size="lg"
                  onClick={() => window.open('/Sonali_Patil_Resume (1).pdf')}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
                >
                  <Eye className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> View Full Screen
                </Button>
              </div>

              <p className="text-center text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6">
                Available in PDF format • Last updated December 2024
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ResumePage;
