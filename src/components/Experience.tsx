import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Briefcase } from 'lucide-react';
import { resumeData } from '../data/resume';
import { useTheme } from '../hooks/useTheme';

interface ExperienceItem {
  title: string;
  company: string;
  date: string;
  description: string;
  icon: React.ReactNode;
}

const Experience: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { theme } = useTheme();

  const experienceItems: ExperienceItem[] = [
    ...resumeData.experience.map((exp) => ({
      title: exp.title,
      company: exp.company,
      date: exp.dates,
      description: exp.tasks ? exp.tasks.join(' ') : '',
      icon: <Briefcase />,
    })),
    ...resumeData.entrepreneurialProjects.map((proj) => ({
      title: proj.name,
      company: proj.role,
      date: proj.dates,
      description: proj.details.join(' '),
      icon: <Briefcase />,
    })),
  ];

  return (
    <section id="experience" className="py-20 bg-light dark:bg-darker relative px-6 md:px-10" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('experience.title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </motion.div>

        <VerticalTimeline lineColor={theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0,0,0,0.2)'} animate={inView}>
          {experienceItems.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              date={item.date}
              iconStyle={{ background: theme === 'dark' ? '#1a1a1a' : '#e5e7eb', color: theme === 'dark' ? '#fff' : '#000' }}
              icon={item.icon}
            >
              <h3 className="timeline-content-title">{item.title}</h3>
              <h4 className="timeline-content-subtitle text-gray-400">{item.company}</h4>
              <p className="timeline-content-desc">{item.description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default Experience;
