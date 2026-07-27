import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import educationData from '../../../data/education.json';
import Button from '../../ui/Button/Button';
import Modal from '../../ui/Modal/Modal';
import EducationCard from './EducationCard';
import { downloadFile } from '../../../utils/downloadFile';
import './Education.css';

const SECTION_TYPES = ['degree', 'long_course', 'certification'] as const;

interface CertPreview { url: string; title: string; }

export default function Education() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith('pt') ? 'pt' : 'en';
  const [certPreview, setCertPreview] = useState<CertPreview | null>(null);

  const handleViewCert = useCallback((url: string, title: string) => {
    setCertPreview({ url, title });
  }, []);

  const handleCloseModal = useCallback(() => setCertPreview(null), []);

  const handleDownloadCert = useCallback(() => {
    if (!certPreview) return;
    const filename = certPreview.url.split('/').pop() ?? 'certificate.pdf';
    downloadFile(certPreview.url, filename, 'application/pdf');
  }, [certPreview]);

  return (
    <section className="education" id="education">
      <div className="container education__inner">
        <h2 className="education__title">{t('education.title')}</h2>

        <div className="education__content">
          {SECTION_TYPES.map((type) => {
            const items = educationData.filter((item) => item.type === type);
            if (items.length === 0) return null;

            return (
              <div key={type} className="education__section">
                <h3 className="education__section-title">{t(`education.types.${type}`)}</h3>

                {type === 'degree' && (
                  <div className="education__timeline">
                    {items.map((item) => (
                      <div key={item.id} className="education__entry">
                        <div className="education__dot" aria-hidden="true" />
                        <EducationCard item={item} lang={lang} onViewCert={handleViewCert} />
                      </div>
                    ))}
                  </div>
                )}

                {type === 'long_course' && (
                  <div className="education__list">
                    {items.map((item) => (
                      <EducationCard key={item.id} item={item} lang={lang} onViewCert={handleViewCert} />
                    ))}
                  </div>
                )}

                {type === 'certification' && (
                  <div className="education__cert-grid">
                    {items.map((item) => (
                      <EducationCard key={item.id} item={item} lang={lang} className="education__card--cert" onViewCert={handleViewCert} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Modal isOpen={certPreview !== null} onClose={handleCloseModal} title={certPreview?.title} size="lg">
        <div className="education__cert-preview">
          <iframe src={certPreview?.url} className="education__cert-iframe" title={certPreview?.title ?? 'Certificate'} />
          <div className="education__cert-actions">
            <Button variant="primary" size="md" onClick={handleDownloadCert}>
              {t('education.download_cert')}
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
