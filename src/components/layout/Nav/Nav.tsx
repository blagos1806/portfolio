import { useTranslation } from "react-i18next";
import "./Nav.css";

const navItems = [
  "about",
  "skills",
  "experience",
  "education",
  "projects",
  "contact",
];

interface NavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Nav({ isOpen, onClose }: NavProps) {
  const { t } = useTranslation();

  return (
    <nav
      className={`nav${isOpen ? " nav--open" : ""}`}
      aria-label="Main navigation"
    >
      <ul className="nav__list">
        {navItems.map((item) => (
          <li key={item} className="nav__item">
            <a href={`#${item}`} className="nav__link" onClick={onClose}>
              {t(`nav.${item}`)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
