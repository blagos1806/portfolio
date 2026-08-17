import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MessageSquare, Download, ChevronDown } from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import Button from "../../ui/Button/Button";
import { useTypewriter } from "../../../hooks/useTypewriter";
import { downloadFile } from "../../../utils/downloadFile";
import personalData from "../../../data/personal.json";
import "./Hero.css";

const ease: Easing = "easeOut";

const contentContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const contentItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const visualVariant = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease, delay: 0.25 } },
};

const scrollVariant = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: 1.1 } },
};

export default function Hero() {
  const { t } = useTranslation();

  const roles = t("hero.headline.line_3", { returnObjects: true }) as string[];
  const typewriterText = useTypewriter(Array.isArray(roles) ? roles : [String(roles)]);

  const heroPhoto = personalData.photos[0]?.image as string | null;
  const heroPhotoCaption = personalData.photos[0]?.caption?.en ?? "Profile photo";
  const { github, linkedin } = personalData.socials;
  const { yearsOfExperience, projectsInvolved, clientsServed } = personalData.statistics;
  const caption = t("hero.caption");
  const cvPath = `${import.meta.env.BASE_URL}${personalData.resume}`;
  const cvFilename = personalData.resume.split("/").pop() ?? "cv.pdf";
  const handleCVDownload = () => downloadFile(cvPath, cvFilename, "application/pdf");

  return (
    <section className="hero" id="hero">
      <div className="container hero__inner">

        <motion.div className="hero__content" variants={contentContainer} initial="hidden" animate="show">
          <motion.div className="hero__headline" variants={contentItem}>
            <span className="hero__line-hi">{t("hero.headline.line_1")}</span>
            <h1 className="hero__name">{t("hero.headline.line_2")}</h1>
            <div className="hero__role-row" aria-live="polite" aria-label={typewriterText}>
              <span className="hero__typewriter">{typewriterText}</span>
              <span className="hero__cursor" aria-hidden="true">|</span>
            </div>
          </motion.div>

          <motion.p className="hero__caption" variants={contentItem}>{caption}</motion.p>

          <motion.div className="hero__availability" variants={contentItem}>
            <span className="hero__availability-dot" aria-hidden="true" />
            <span>{t("hero.availability")}</span>
          </motion.div>

          <motion.div className="hero__actions" variants={contentItem}>
            <Button href={linkedin} target="_blank" variant="secondary" icon={<FaLinkedinIn size={16} />}>
              {t("hero.cta_linkedin")}
            </Button>
            <Button href={github} target="_blank" variant="secondary" icon={<FaGithub size={16} />}>
              {t("hero.cta_github")}
            </Button>
            <Button href="#contact" variant="primary" icon={<MessageSquare size={16} />}>
              {t("hero.cta_contact")}
            </Button>
            <Button onClick={handleCVDownload} variant="ghost" icon={<Download size={16} />}>
              {t("hero.cta_cv")}
            </Button>
          </motion.div>

          <motion.div className="hero__stats" aria-label="Quick stats" variants={contentItem}>
            <div className="hero__stat">
              <span className="hero__stat-value">{yearsOfExperience}</span>
              <span className="hero__stat-label">{t("hero.stats.years")}</span>
            </div>
            <span className="hero__stat-sep" aria-hidden="true">·</span>
            <div className="hero__stat">
              <span className="hero__stat-value">{projectsInvolved}</span>
              <span className="hero__stat-label">{t("hero.stats.projects")}</span>
            </div>
            <span className="hero__stat-sep" aria-hidden="true">·</span>
            <div className="hero__stat">
              <span className="hero__stat-value">{clientsServed}</span>
              <span className="hero__stat-label">{t("hero.stats.company")}</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="hero__visual" variants={visualVariant} initial="hidden" animate="show">
          <div className="hero__image-wrapper">
            {heroPhoto ? (
              <img src={heroPhoto} alt={heroPhotoCaption} className="hero__image" loading="eager" />
            ) : (
              <div className="hero__image-placeholder" aria-hidden="true" />
            )}
            <div className="hero__image-ring" aria-hidden="true" />
          </div>
        </motion.div>

      </div>

      <motion.a href="#about" className="hero__scroll-indicator" aria-label={t("hero.scroll_down")}
        variants={scrollVariant} initial="hidden" animate="show">
        <span className="hero__scroll-label">{t("hero.scroll_down")}</span>
        <span className="hero__scroll-arrow">
          <ChevronDown size={22} />
        </span>
      </motion.a>
    </section>
  );
}