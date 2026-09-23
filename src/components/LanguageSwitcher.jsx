import { useLanguage } from "../context/LanguageContext";
import { LANGUAGES } from "../data/translations";
import "./LanguageSwitcher.css";

export default function LanguageSwitcher({ className = "" }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`lang-switch ${className}`.trim()} role="group" aria-label="Language">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className={`lang-switch__option ${language === code ? "is-active" : ""}`}
          aria-pressed={language === code}
          onClick={() => setLanguage(code)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
