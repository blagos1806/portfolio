import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import skillsData from "../../../data/skills.json";
import Badge from "../../ui/Badge/Badge";
import { fadeUp, viewport } from "../../../utils/motionVariants";
import "./Skills.css";

const FILTER_TYPES = ["all", "frontend", "backend", "database", "devops", "testing", "tools"] as const;
type FilterType = typeof FILTER_TYPES[number];

const LEVELS = ["advanced", "intermediate", "beginner"] as const;
type Level = typeof LEVELS[number];

export default function Skills() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filtered = activeFilter === "all"
    ? skillsData
    : skillsData.filter((s) => s.type === activeFilter);

  return (
    <section className="skills" id="skills">
      <div className="container skills__inner">
        <motion.h2 className="skills__title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          {t("skills.title")}
        </motion.h2>

        <motion.div className="skills__filters" role="group" aria-label={t("skills.title")}
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          {FILTER_TYPES.map((type) => (
            <button
              key={type}
              className={`skills__filter-btn${activeFilter === type ? " skills__filter-btn--active" : ""}`}
              onClick={() => setActiveFilter(type)}
              aria-pressed={activeFilter === type}
            >
              {t(`skills.filter.${type}`)}
            </button>
          ))}
        </motion.div>

        <motion.div className="skills__legend" aria-label="Level legend"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          {LEVELS.map((level) => (
            <span key={level} className="skills__legend-item">
              <span className={`skills__dot skills__dot--${level}`} aria-hidden="true" />
              <span className="skills__legend-label">{t(`skills.levels.${level}`)}</span>
            </span>
          ))}
        </motion.div>

        <motion.div className="skills__grid" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          {filtered.map((skill) => (
            <Badge
              key={skill.name}
              text={skill.name}
              type={skill.level as Level}
              size="md"
              dot
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}