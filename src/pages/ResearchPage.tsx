import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import SectionTitle from '@/components/SectionTitle';

interface ResearchPaper {
  id: number;
  title: string;
  abstract: string;
  keywords: string[];
  technologies: string[];
  status: string;
  link?: string;
}

const papers: ResearchPaper[] = [
  {
    id: 1,
    title: 'EduChain Sentinel – AI-Based Cheating Detection System',
    abstract: 'This research presents an intelligent cheating detection framework designed for secure digital examinations. Leveraging advanced AI and computer vision techniques, the system monitors examination environments in real-time to detect and flag suspicious behaviors. The framework incorporates multi-modal analysis including gaze tracking, posture detection, and device recognition to ensure comprehensive coverage. Results demonstrate significant improvements in detection accuracy compared to traditional proctoring methods, while maintaining minimal false positive rates.',
    keywords: ['AI', 'Computer Vision', 'Education Technology', 'Security', 'Deep Learning'],
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'YOLO', 'Flask'],
    status: 'Published',
    link: 'https://example.com/paper1',
  },
  {
    id: 2,
    title: 'Ellora Caves AR/VR Experience',
    abstract: 'This project presents an immersive AR/VR cultural heritage experience focused on the historic Ellora Caves. By leveraging extended reality technologies, we create a virtual exploration environment that allows users to experience and learn about this UNESCO World Heritage Site regardless of their physical location. The system combines high-fidelity 3D reconstructions with interactive educational content, providing an engaging platform for cultural preservation and education. User studies demonstrate significant improvements in learning outcomes and engagement compared to traditional educational methods.',
    keywords: ['AR/VR', 'Cultural Heritage', 'Digital Preservation', 'Education', 'Extended Reality'],
    technologies: ['Unity', 'ARCore', 'Blender', 'C#', 'Photogrammetry'],
    status: 'In Progress',
  },
  {
    id: 3,
    title: 'Persona – Intelligent Digital Identity System',
    abstract: 'Persona introduces an AI-driven personalized digital identity framework with a focus on security, adaptability, and user-centric design. The system creates dynamic digital identities that evolve with user behavior while maintaining robust security measures. Applications span educational platforms, digital services, and personalized content delivery. The framework emphasizes privacy-preserving techniques while enabling rich personalization features, addressing the growing need for secure yet flexible digital identity solutions in an increasingly connected world.',
    keywords: ['Digital Identity', 'AI', 'Security', 'Personalization', 'Privacy'],
    technologies: ['Python', 'Machine Learning', 'Cryptography', 'React', 'Node.js'],
    status: 'Under Review',
    link: 'https://example.com/paper3',
  },
];

const ResearchCard = ({ paper }: { paper: ResearchPaper }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColors: Record<string, string> = {
    'Published': 'bg-green-500/20 text-green-400 border-green-500/30',
    'In Progress': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Under Review': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl overflow-hidden card-hover"
    >
      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[paper.status]}`}>
              {paper.status}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl font-bold text-foreground mb-4">
          {paper.title}
        </h3>

        {/* Abstract */}
        <div className="mb-4">
          <AnimatePresence initial={false}>
            <motion.p
              className={`text-muted-foreground leading-relaxed ${
                isExpanded ? '' : 'line-clamp-3'
              }`}
            >
              {paper.abstract}
            </motion.p>
          </AnimatePresence>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary text-sm font-medium mt-2 flex items-center gap-1 hover:underline"
          >
            {isExpanded ? (
              <>Show Less <ChevronUp className="h-4 w-4" /></>
            ) : (
              <>Read More <ChevronDown className="h-4 w-4" /></>
            )}
          </button>
        </div>

        {/* Keywords */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
            Keywords
          </h4>
          <div className="flex flex-wrap gap-2">
            {paper.keywords.map((keyword) => (
              <span
                key={keyword}
                className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-md"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {paper.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action */}
        {paper.link && (
          <Button variant="outline-glow" size="lg" asChild>
            <a href={paper.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> View Publication
            </a>
          </Button>
        )}
      </div>
    </motion.div>
  );
};

const ResearchPage = () => {
  return (
    <PageTransition>
      <section className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Research Papers" 
            subtitle="Exploring the frontiers of AI and technology"
          />

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {papers.map((paper) => (
              <ResearchCard key={paper.id} paper={paper} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ResearchPage;
