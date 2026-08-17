import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import experienceData from "../../../data/experience.json";
import experienceProjects from "../../../data/experience_projects.json";

import "./Experience.css";
import Modal from "../../ui/Modal/Modal";
import ExperienceCard from "./ExperienceCard";
import ExperienceProjectCard, { type ExpProject } from "./ExperienceProjectCard";
import { fadeUp, staggerContainer, staggerItem, viewport } from "../../../utils/motionVariants";

export default function Experience() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("pt") ? "pt" : "en";

  const [selectedProjects, setSelectedProjects] = useState<null | { id: number; company: string }>(null);
  const [selectedProject, setSelectedProject] = useState<ExpProject | null>(null);

  // const handleViewProjects = (id: number, company: string) => {
  //   setSelectedProjects({ id, company });
  // };

  const handleCloseProjectsModal = () => {
    setSelectedProjects(null);
    setSelectedProject(null);
  };

  return (
    <section className="experience" id="experience">
      <div className="container experience__inner">
        <motion.h2 className="experience__title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          {t("experience.title")}
        </motion.h2>

        <motion.div className="experience__timeline" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport}>
          {[...experienceData].sort((a, b) => b.id - a.id).map((item) => {
            // const hasProjects = experienceProjects.some((p) => p.id_experience === item.id);
            return (
              <motion.div key={item.id} className="experience__entry" variants={staggerItem}>
                <div className="experience__dot" aria-hidden="true" />
                <ExperienceCard
                  item={item}
                  lang={lang}
                  // hasProjects={hasProjects}
                  // onViewProjects={() => handleViewProjects(item.id, item.company)}
                />
              </motion.div>
            );
          })}

          {/* Projects grid modal */}
          <Modal
            isOpen={selectedProjects !== null}
            onClose={handleCloseProjectsModal}
            title={t("experience.projects_at", { company: selectedProjects?.company })}
            size="xl"
          >
            <div className="experience__projects-grid">
              {selectedProjects && experienceProjects
                .filter((p) => p.id_experience === selectedProjects.id)
                .map((project) => (
                  <ExperienceProjectCard
                    key={project.id}
                    project={project}
                    lang={lang}
                    onViewMore={() => setSelectedProject(project)}
                  />
                ))}
            </div>
          </Modal>

          {/* Project detail modal */}
          <Modal
            isOpen={selectedProject !== null}
            onClose={() => setSelectedProject(null)}
            title={selectedProject?.name[lang]}
            size="lg"
          >
            {selectedProject && (
              <div className="experience__project-detail">
                <div className="experience__project-description">
                  {selectedProject.description[lang].map((para, i) => (
                    <p key={i} className="experience__project-para">{para}</p>
                  ))}
                </div>
                {selectedProject.gallery.some((g) => g.image) && (
                  <div className="experience__project-gallery">
                    <h5 className="experience__project-gallery-title">{t("experience.gallery")}</h5>
                    <div className="experience__project-gallery-grid">
                      {selectedProject.gallery.filter((g) => g.image).map((item) => (
                        <figure key={item.id} className="experience__project-gallery-item">
                          <img src={item.image!} alt={item.caption[lang]} loading="lazy" />
                          {item.caption[lang] && <figcaption>{item.caption[lang]}</figcaption>}
                        </figure>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Modal>
        </motion.div>
      </div>
    </section>
  );
}