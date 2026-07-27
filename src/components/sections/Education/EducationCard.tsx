import { useTranslation } from 'react-i18next';
import { MapPin, Calendar, Clock } from 'lucide-react';
import Card from '../../ui/Card/Card';
import Button from '../../ui/Button/Button';

import educationData from '../../../data/education.json';
export type EducationItem = (typeof educationData)[number];

type Lang = 'en' | 'pt';

interface EducationCardProps {
  item: EducationItem;
  lang: Lang;
  className?: string;
  onViewCert: (url: string, title: string) => void;
}

export default function EducationCard({ item, lang, className = '', onViewCert }: EducationCardProps) {
  const { t } = useTranslation();

  const title = item.title[lang];
  const institution = item.institution[lang];
  const description = item.description[lang].filter(Boolean);

  return (
    <Card hoverable className={['education__card', className].filter(Boolean).join(' ')}>
      <div className="education__card-header">
        {item.logo && (
          <img
            src={`${import.meta.env.BASE_URL}${item.logo}`}
            alt=""
            className="education__logo"
            loading="lazy"
          />
        )}
        <div className="education__card-meta">
          <h4 className="education__item-title">{title}</h4>
          <span className="education__institution">{institution}</span>
          <div className="education__details">
            {item.timeframe && (
              <span className="education__detail">
                <Calendar size={12} aria-hidden="true" />
                {item.inprogress ? t('education.in_progress') : item.timeframe[lang as keyof typeof item.timeframe]}
              </span>
            )}
            {item.location && (
              <span className="education__detail">
                <MapPin size={12} aria-hidden="true" />
                {item.location}
              </span>
            )}
            {item.duration && (
              <span className="education__detail">
                <Clock size={12} aria-hidden="true" />
                {item.duration}
              </span>
            )}
          </div>
        </div>
      </div>

      {description.length > 0 && (
        <ul className="education__description">
          {description.map((line, i) => (
            <li key={i} className="education__description-item">{line}</li>
          ))}
        </ul>
      )}

      {item.certification && (
        <div className="education__actions">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onViewCert(`${import.meta.env.BASE_URL}${item.certification}`, title)}
          >
            {t('education.view_cert')}
          </Button>
        </div>
      )}
    </Card>
  );
}
