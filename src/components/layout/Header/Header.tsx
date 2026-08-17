import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Sun, Moon } from 'lucide-react'
import Nav from '../Nav/Nav'
import Button from '../../ui/Button/Button'
import { useDarkMode } from '../../../hooks/useDarkMode'
import { useLanguage } from '../../../hooks/useLanguage'
import personalData from '../../../data/personal.json'
import './Header.css'

export default function Header() {
  const { t } = useTranslation()
  const { isDark, toggle } = useDarkMode()
  const { language, setLanguage } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {menuOpen && (
        <div className="header__overlay" onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}

      <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
        <div className="header__container container">

          <a href="#hero" className="header__logo" aria-label="Go to top">
            {personalData.initials}<span>.</span>
          </a>

          <Nav isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

          <div className="header__actions">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
              aria-label={t('nav.toggle_language')}
            >
              {language === 'en' ? 'PT' : 'EN'}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              iconOnly
              icon={isDark ? <Sun size={16} /> : <Moon size={16} />}
              onClick={toggle}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            />

            <button
              className={`header__hamburger${menuOpen ? ' header__hamburger--open' : ''}`}
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>

        </div>
      </header>
    </>
  )
}