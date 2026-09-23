import { useLanguage } from "../context/LanguageContext";
import PageContainer from "./PageContainer";
import Button from "./Button";
import "./PlaceholderSection.css";

/**
 * Shared "coming soon" content for routes that exist in the
 * navigation/route map but are not yet built out.
 */
export default function PlaceholderSection({ title, description, icon: Icon }) {
  const { t } = useLanguage();

  return (
    <PageContainer width="md" className="placeholder-section">
      {Icon ? (
        <div className="placeholder-section__icon">
          <Icon size={28} aria-hidden="true" />
        </div>
      ) : null}
      <span className="placeholder-section__eyebrow">{t("placeholder.comingSoon")}</span>
      <h1 className="placeholder-section__title">{title}</h1>
      <p className="placeholder-section__body">
        {description || t("placeholder.body")}
      </p>
      <Button to="/" variant="secondary">
        {t("placeholder.backHome")}
      </Button>
    </PageContainer>
  );
}
