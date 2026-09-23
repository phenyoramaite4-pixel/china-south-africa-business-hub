import { useLanguage } from "../context/LanguageContext";
import PageContainer from "./PageContainer";
import "./Footer.css";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <PageContainer>
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <span className="site-footer__title">China–South Africa Business Hub</span>
            <p className="site-footer__tagline">{t("footer.tagline")}</p>
          </div>

          <div className="site-footer__column">
            <h3>{t("footer.platform")}</h3>
            <ul>
              <li>{t("nav.findBusiness")}</li>
              <li>{t("nav.findPartner")}</li>
              <li>{t("nav.opportunities")}</li>
            </ul>
          </div>

          <div className="site-footer__column">
            <h3>{t("footer.company")}</h3>
            <ul>
              <li>{t("nav.needHelp")}</li>
              <li>{t("nav.signIn")}</li>
              <li>{t("nav.register")}</li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>
            &copy; {year} China–South Africa Business Hub. {t("footer.rights")}
          </span>
        </div>

        <p className="site-footer__notice">{t("footer.demoNotice")}</p>
      </PageContainer>
    </footer>
  );
}
