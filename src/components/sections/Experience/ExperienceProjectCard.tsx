import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import Card from "../../ui/Card/Card";
import Badge from "../../ui/Badge/Badge";
import Button from "../../ui/Button/Button";
import experienceProjects from "../../../data/experience_projects.json";

export type ExpProject = (typeof experienceProjects)[number];

type Lang = "en" | "pt";

interface ExperienceProjectCardProps {
  project: ExpProject;
  lang: Lang;
  onViewMore: () => void;
}

export default function ExperienceProjectCard({ project, lang, onViewMore }: ExperienceProjectCardProps) {
  const { t } = useTranslation();

  return (
    <Card hoverable className="experience__project-card">
      <div className="experience__project-card-header">
        <h4 className="experience__project-name">{project.name[lang]}</h4>
        <Button variant="ghost" size="sm" onClick={onViewMore}>
          {t("experience.view_more")} <ArrowUpRight size={14} aria-hidden="true" />
        </Button>
      </div>
      <p className="experience__project-overview">{project.overview[lang]}</p>
      <div className="experience__project-stack">
        {project.stack.map((tech) => (
          <Badge key={tech} text={tech} type="default" size="sm" />
        ))}
      </div>
    </Card>
  );
}
