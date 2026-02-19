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
      <section className="min-h-screen pt-32 pb-20">
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
              className="glass rounded-2xl p-8 md:p-12"
            >
              {/* Resume Preview */}
              <div className="aspect-[8.5/11] bg-background rounded-xl mb-8 relative overflow-hidden border border-border/50">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5" />

                <div className="p-8 md:p-12 h-full flex flex-col text-sm">
                  {/* Header */}
                  <div className="text-center mb-6 pb-4 border-b border-border/30">
                    <h2 className="font-display text-3xl font-bold gradient-text">
                      Sonali Patil
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      Innovative AI Engineer | Research-Oriented Technologist
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Kolhapur • +91 8856855161 • patilsonali5161@gmail.com
                    </p>
                  </div>

                  {/* Body */}
                  <div className="grid md:grid-cols-2 gap-6 flex-1">
                    {/* Left */}
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-primary font-semibold uppercase mb-2">
                          Summary
                        </h3>
                        <p className="text-muted-foreground">
                          Innovative AI Engineer with strong observational and
                          research skills, driving problem-solving and solution
                          design. Passionate about intelligent systems, emerging
                          technologies, and deep-rooted sciences and biotechnology.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-primary font-semibold uppercase mb-2">
                          Skills
                        </h3>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• Machine Learning & Deep Learning</li>
                          <li>• Python, DSA & SQL</li>
                          <li>• AR/VR & Game Development</li>
                          <li>• Cloud (AWS, GCP, Azure)</li>
                          <li>• Leadership & Project Management</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-primary font-semibold uppercase mb-2">
                          Additional Info
                        </h3>
                        <p className="text-muted-foreground">
                          Languages: Hindi, Marathi, English, Japanese (Elementary)
                        </p>
                        <p className="text-muted-foreground mt-1">
                          Certifications: NVIDIA CUDA (Python & C++), AWS Gen AI,
                          Cisco Cyber Security
                        </p>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-primary font-semibold uppercase mb-2">
                          Education
                        </h3>
                        <p className="text-muted-foreground font-medium">
                          B.Tech – CSE (AI & ML)
                        </p>
                        <p className="text-muted-foreground">
                          D.Y. Patil College of Engineering & Technology, Kolhapur
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2023 – 2027
                        </p>
                      </div>

                      <div>
                        <h3 className="text-primary font-semibold uppercase mb-2">
                          Experience
                        </h3>
                        <p className="text-muted-foreground font-medium">
                          AR/VR Club – DYPCET
                        </p>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• Unity & AR workshops</li>
                          <li>• Immersive 3D environments</li>
                          <li>• Education & gaming simulations</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-primary font-semibold uppercase mb-2">
                          Projects
                        </h3>
                        <ul className="text-muted-foreground space-y-1">
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
                  <div className="mt-auto pt-4 border-t border-border/30 text-center">
                    <p className="text-xs text-muted-foreground">
                      Preview of resume • Download PDF for full details
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <FileText className="w-48 h-48 text-primary" />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 justify-center">
                <Button variant="hero" size="xl" onClick={handleDownload}>
                  <Download className="mr-2 h-5 w-5" /> Download Resume
                </Button>
                <Button
                  variant="outline-glow"
                  size="xl"
                  onClick={() => window.open('/Sonali_Patil_Resume (1).pdf')}
                >
                  <Eye className="mr-2 h-5 w-5" /> View Full Screen
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-6">
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
