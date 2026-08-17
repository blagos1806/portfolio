import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import educationData from '../../../data/education.json';
import Button from '../../ui/Button/Button';
import Modal from '../../ui/Modal/Modal';
import EducationCard from './EducationCard';
import ShowMore from '../../ui/ShowMore/ShowMore';
import { downloadFile } from '../../../utils/downloadFile';
import { fadeUp, staggerContainer, staggerItem, viewport } from '../../../utils/motionVariants';
import './Education.css';

const SECTION_TYPES = ['degree', 'long_course', 'certification'] as const;

interface CertPreview { url: string; title: string; sourceUrl: string | null; }

export default function Education() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith('pt') ? 'pt' : 'en';
  const [certPreview, setCertPreview] = useState<CertPreview | null>(null);

  const handleViewCert = useCallback((url: string, title: string, sourceUrl: string | null) => {
    setCertPreview({ url, title, sourceUrl });
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
        <motion.h2 className="education__title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          {t('education.title')}
        </motion.h2>

        <motion.div className="education__content" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport}>
          {SECTION_TYPES.map((type) => {
            const items = educationData.filter((item) => item.type === type);
            if (items.length === 0) return null;

            return (
              <motion.div key={type} className="education__section" variants={staggerItem}>
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
                  <ShowMore items={items} initialCount={3}>
                    {(initialItems, extraItems) => (
                      <div className="education__list">
                        {initialItems.map((item) => (
                          <EducationCard key={item.id} item={item} lang={lang} onViewCert={handleViewCert} />
                        ))}
                        <AnimatePresence>
                          {extraItems.map((item, i) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, y: 16 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.3, delay: i * 0.06 }}
                            >
                              <EducationCard item={item} lang={lang} onViewCert={handleViewCert} />
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                  </ShowMore>
                )}

                {type === 'certification' && (
                  <ShowMore items={items} initialCount={6}>
                    {(initialItems, extraItems) => (
                      <div className="education__cert-grid">
                        {initialItems.map((item) => (
                          <EducationCard key={item.id} item={item} lang={lang} className="education__card--cert" onViewCert={handleViewCert} />
                        ))}
                        <AnimatePresence>
                          {extraItems.map((item, i) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, y: 16 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.3, delay: i * 0.06 }}
                            >
                              <EducationCard item={item} lang={lang} className="education__card--cert" onViewCert={handleViewCert} />
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                  </ShowMore>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <Modal isOpen={certPreview !== null} onClose={handleCloseModal} title={certPreview?.title} size="lg">
        <div className="education__cert-preview">
          <iframe src={certPreview?.url} className="education__cert-iframe" title={certPreview?.title ?? 'Certificate'} />
          <div className="education__cert-actions">
            {certPreview?.sourceUrl && (
              <Button variant="secondary" size="md" href={certPreview.sourceUrl} target="_blank">
                {t('education.view_source')}
              </Button>
            )}
            <Button variant="primary" size="md" onClick={handleDownloadCert}>
              {t('education.download_cert')}
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
