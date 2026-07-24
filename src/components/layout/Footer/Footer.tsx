import { useTranslation } from 'react-i18next'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import Button from '../../ui/Button/Button'
import personalData from '../../../data/personal.json'
import './Footer.css'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="footer__container container">
        <p className="footer__copy">{t('footer.text')}</p>

        <div className="footer__socials">
          <Button
            variant="ghost"
            size="sm"
            icon={<FaGithub size={16} />}
            href={personalData.socials.github}
            target="_blank"
          >
            GitHub
          </Button>

          <Button
            variant="ghost"
            size="sm"
            icon={<FaLinkedin size={16} />}
            href={personalData.socials.linkedin}
            target="_blank"
          >
            LinkedIn
          </Button>
        </div>
      </div>
    </footer>
  )
}