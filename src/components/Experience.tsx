import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  VerticalTimeline, 
  VerticalTimelineElement 
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { 
  Code, 
  Recycle, 
  BookOpen, 
  Package, 
  Wrench, 
  Utensils 
} from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  date: string;
  description: string;
  icon: React.ReactNode;
  technologies?: string[];
}

const Experience: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experienceItems: ExperienceItem[] = [
    {
      title: "Développeur Web",
      company: "Le Wagon Paris",
      date: "2023",
      description: "Formation intensive au développement web full-stack. Projets pratiques et travail d'équipe sur des applications web complètes.",
      icon: <Code />,
      technologies: ["Ruby on Rails", "JavaScript", "HTML/CSS", "SQL"]
    },
    {
      title: "Responsable Opérationnel",
      company: "Rino Recycling - Brisbane",
      date: "Nov. 2024 - Avril 2025",
      description: "Gestion des opérations de recyclage et développement de nouveaux processus d'optimisation.",
      icon: <Recycle />
    },
    {
      title: "Bibliothécaire & Livreur",
      company: "France",
      date: "2020 - 2024",
      description: "Organisation et gestion du fond documentaire. Service de livraison avec gestion autonome des tournées.",
      icon: <BookOpen />
    },
    {
      title: "Électricien",
      company: "SNCF / Maintenance Bouygues",
      date: "2017 - 2020",
      description: "Installation et maintenance de systèmes électriques. Résolution de problèmes techniques et respect des normes de sécurité.",
      icon: <Wrench />
    },
    {
      title: "Service Restauration",
      company: "Sofitel",
      date: "2016 - 2017",
      description: "Service client haut de gamme dans un environnement international.",
      icon: <Utensils />
    },
    {
      title: "Technicien environnemental",
      company: "Cœur d'Essonne",
      date: "2015 - 2016",
      description: "Analyse et suivi des indicateurs environnementaux. Sensibilisation du public aux questions écologiques.",
      icon: <Package />
    }
  ];

  return (
    <section id="experience" className="py-20 bg-darker relative px-6 md:px-10" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Expériences Professionnelles</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Mon parcours professionnel diversifié qui témoigne de ma polyvalence et de ma capacité d'adaptation.
          </p>
        </motion.div>

        <VerticalTimeline lineColor="rgba(255, 255, 255, 0.2)" animate={inView}>
          {experienceItems.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{ 
                background: '#111111', 
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              contentArrowStyle={{ borderRight: '7px solid #111111' }}
              date={item.date}
              iconStyle={{ background: '#1a1a1a', color: '#fff' }}
              icon={item.icon}
            >
              <h3 className="timeline-content-title">{item.title}</h3>
              <h4 className="timeline-content-subtitle text-gray-400">{item.company}</h4>
              <p className="timeline-content-desc">
                {item.description}
              </p>
              {item.technologies && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="px-2 py-1 text-xs border border-gray-700 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default Experience;