import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Copy, Check, Send, Phone } from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import Button from "../../ui/Button/Button";
import personalData from "../../../data/personal.json";
import "./Contact.css";

export default function Contact() {
  const { t } = useTranslation();
  const { github, linkedin } = personalData.socials;
  const { phone, email } = personalData.contact;

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `From: ${form.name} (${form.email})\n\n${form.message}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="contact" id="contact">
      <div className="container contact__inner">
        <h2 className="contact__title">{t("contact.title")}</h2>

        <div className="contact__body">
          <div className="contact__info">
            <h4 className="contact__heading">{t("contact.heading")}</h4>
            <p className="contact__description">{t("contact.description")}</p>

            <div className="contact__email-card">
              <span className="contact__email-label">{t("contact.email_label")}</span>
              <div className="contact__email-row">
                <a href={`mailto:${email}`} className="contact__email-link">
                  <Mail size={15} aria-hidden="true" />
                  {email}
                </a>
                <button
                  type="button"
                  className="contact__copy-btn"
                  onClick={handleCopyEmail}
                  aria-label={copied ? t("contact.copied") : t("contact.copy")}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? t("contact.copied") : t("contact.copy")}</span>
                </button>
              </div>
            </div>

            <div className="contact__socials">
              <Button href={linkedin} target="_blank" variant="secondary" icon={<FaLinkedinIn size={16} />}>
                {t("hero.cta_linkedin")}
              </Button>
              <Button href={github} target="_blank" variant="secondary" icon={<FaGithub size={16} />}>
                {t("hero.cta_github")}
              </Button>
              <Button variant="secondary" icon={<Phone size={16} />}>
                {phone}
              </Button>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="contact__form-row">
              <div className="contact__field">
                <label className="contact__field-label" htmlFor="contact-name">
                  {t("contact.form.name_label")}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={t("contact.form.name_placeholder")}
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="contact__input"
                />
              </div>
              <div className="contact__field">
                <label className="contact__field-label" htmlFor="contact-email">
                  {t("contact.form.email_label")}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t("contact.form.email_placeholder")}
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="contact__input"
                />
              </div>
            </div>

            <div className="contact__field">
              <label className="contact__field-label" htmlFor="contact-subject">
                {t("contact.form.subject_label")}
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder={t("contact.form.subject_placeholder")}
                value={form.subject}
                onChange={handleChange}
                required
                className="contact__input"
              />
            </div>

            <div className="contact__field">
              <label className="contact__field-label" htmlFor="contact-message">
                {t("contact.form.message_label")}
              </label>
              <textarea
                id="contact-message"
                name="message"
                placeholder={t("contact.form.message_placeholder")}
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                className="contact__textarea"
              />
            </div>

            <Button variant="primary" icon={<Send size={15} />} size="md">
              {t("contact.form.submit")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}