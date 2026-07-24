import { useTranslation } from "react-i18next";
import personalData from "../../../data/personal.json";
import Badge from "../../ui/Badge/Badge";
import "./About.css";

export default function About() {
  const { t, i18n } = useTranslation();

  const lang = i18n.language.startsWith("pt") ? "pt" : "en";

  const aboutPhoto = personalData.photos[1]?.image as string | null;
  const aboutPhotoCaption = personalData.photos[1]?.caption?.[lang] ?? "About Me photo";

  const summary = t("about.summary", { returnObjects: true }) as string[];
  const hobbies = (personalData.hobbies[lang as keyof typeof personalData.hobbies]
    ?? personalData.hobbies.en) as string[];

  return (
    <section className="about" id="about">
      <div className="container about__inner">
        <h2 className="about__title">{t("about.title")}</h2>

        <div className="about__body">
          <div className="about__photo-wrapper">
            {aboutPhoto ? (
              <img src={aboutPhoto} alt={aboutPhotoCaption} className="about__photo" loading="lazy" />
            ) : (
              <div className="about__photo-placeholder" aria-hidden="true" />
            )}
            <div className="about__photo-ring" aria-hidden="true" />
          </div>

          <div className="about__content">
            {summary.filter(Boolean).map((paragraph, i) => (
              <p key={i} className="about__description">{paragraph}</p>
            ))}

            <div className="about__languages">
              <span className="about__label">{t("about.languages_label")}</span>
              <ul className="about__language-list">
                {personalData.languages.map((language) => (
                  <li key={language.icon} className="about__language-item">
                  <img
                    src={`https://flagcdn.com/20x15/${language.icon}.png`}
                    srcSet={`https://flagcdn.com/40x30/${language.icon}.png 2x`}
                    width={20}
                    height={15}
                    alt=""
                    className="about__language-flag"
                    aria-hidden="true"
                  />
                    <span className="about__language-name">
                      {language.name[lang as keyof typeof language.name]}
                    </span>
                    <span className="about__language-proficiency">
                      {language.proficiency[lang as keyof typeof language.proficiency]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="about__hobbies">
              <span className="about__label">{t("about.hobbies_label")}</span>
              <div className="about__hobby-list">
                {hobbies.map((hobby) => (
                  <Badge className="about__hobby-item" key={hobby} text={hobby} type="default" size="md" />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
