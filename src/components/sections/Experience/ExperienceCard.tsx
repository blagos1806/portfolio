// import { useTranslation } from "react-i18next";
import { MapPin, Calendar } from "lucide-react";
import Card from "../../ui/Card/Card";
import Badge from "../../ui/Badge/Badge";
// import Button from "../../ui/Button/Button";
import experienceData from "../../../data/experience.json";

export type ExperienceItem = (typeof experienceData)[number];

type Lang = "en" | "pt";

interface ExperienceCardProps {
  item: ExperienceItem;
  lang: Lang;
  // hasProjects: boolean;
  // onViewProjects: () => void;
}

export default function ExperienceCard({ item, lang /*, hasProjects, onViewProjects*/ }: ExperienceCardProps) {
  // const { t } = useTranslation();

  return (
    <Card hoverable className="experience__card">
      <div className="experience__card-header">
        {item.logo && (
          <img
            src={`${import.meta.env.BASE_URL}${item.logo}`}
            alt={`${item.company} logo`}
            className="experience__logo"
            loading="lazy"
          />
        )}
        <div className="experience__card-meta">
          <h3 className="experience__role">{item.role}</h3>
          <span className="experience__company">{item.company}</span>
          <div className="experience__details">
            <span className="experience__detail">
              <Calendar size={12} aria-hidden="true" />
              {item.timeframe[lang]}
            </span>
            <span className="experience__detail">
              <MapPin size={12} aria-hidden="true" />
              {item.location}
            </span>
          </div>
        </div>
      </div>

      <ul className="experience__description">
        {item.description[lang].map((line, i) => (
          <li key={i} className="experience__description-item">{line}</li>
        ))}
      </ul>

      <div className="experience__stack">
        {item.stack.map((tech) => (
          <Badge key={tech} text={tech} type="default" size="sm" />
        ))}
      </div>

      {/* {hasProjects && (
        <div className="experience__actions">
          <Button variant="secondary" size="sm" onClick={onViewProjects}>
            {t("experience.view_projects")}
          </Button>
        </div>
      )} */}
    </Card>
  );
}
