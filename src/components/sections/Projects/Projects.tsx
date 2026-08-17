import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import projectsData from '../../../data/projects.json';
import './Projects.css';
import Card from '../../ui/Card/Card';
import Badge from '../../ui/Badge/Badge';
import ShowMore from '../../ui/ShowMore/ShowMore';
import type { Project } from '../../../types';
import { fadeUp, staggerContainer, staggerItem, viewport } from '../../../utils/motionVariants';

const projects = projectsData as unknown as Project[];

export default function Projects() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith('pt') ? 'pt' : 'en';

  const ProjectCard = ({ project }: { project: Project }) => (
    <Card hoverable className="projects__card">
      <div className="projects__card-body">
        <div className="projects__card-content">
          <div className="projects__card-header">
            <h3 className="projects__name">
              {project.name[lang as keyof typeof project.name]}
            </h3>
            <div className="projects__links">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="projects__link">
                  GitHub Repo <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="projects__link">
                  Demo <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
          <div className="projects__description">
            {project.description[lang as keyof typeof project.description].map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className="projects__stack">
            {project.stack.map((tech) => (
              <Badge key={tech} text={tech} size="sm" />
            ))}
          </div>
        </div>
        {project.logo && (
          <div className="projects__logo-wrapper">
            <img src={project.logo} alt={project.name[lang as keyof typeof project.name]} className="projects__logo" />
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <section className="projects" id="projects">
      <div className="container projects__inner">
        <motion.h2 className="projects__title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          {t('projects.title')}
        </motion.h2>
        <ShowMore items={projects} initialCount={5}>
          {(initialProjects, extraProjects) => (
            <motion.div className="projects__list" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport}>
              {initialProjects.map((project) => (
                <motion.div key={project.id} variants={staggerItem}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
              <AnimatePresence>
                {extraProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </ShowMore>
      </div>
    </section>
  );
}
