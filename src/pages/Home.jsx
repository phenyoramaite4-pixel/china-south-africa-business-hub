
import { Search, Handshake, MessageCircleQuestion, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { providers, opportunities, DEMO_DATA_NOTICE } from "../data/demoData";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import ProviderCard from "../components/ProviderCard";
import OpportunityCard from "../components/OpportunityCard";
import "./Home.css";

const STEP_ICONS_ORDER = ["step1", "step2", "step3", "step4"];

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <PageContainer className="hero__inner">
          <div className="hero__copy">
            <h1 className="hero__headline">{t("home.hero.headline")}</h1>
            <p className="hero__subhead">{t("home.hero.subhead")}</p>

            <div className="hero__actions">
              <Button to="/find-business" variant="primary" icon={Search}>
                {t("home.hero.ctaFindBusiness")}
              </Button>

              <Button to="/find-partner" variant="secondary" icon={Handshake}>
                {t("home.hero.ctaFindPartner")}
              </Button>

              <Button to="/need-help" variant="secondary" icon={MessageCircleQuestion}>
                {t("home.hero.ctaNeedHelp")}
              </Button>
            </div>
          </div>

          <div className="hero__graphic" aria-hidden="true">
            <svg viewBox="0 0 360 320" width="100%" height="100%">
              <path
                d="M40 220 C 120 60, 240 60, 320 220"
                fill="none"
                stroke="var(--color-gold-500)"
                strokeWidth="1.6"
                strokeDasharray="2 8"
                strokeLinecap="round"
              />

              <circle cx="40" cy="220" r="6" fill="var(--color-red-600)" />
              <circle cx="320" cy="220" r="6" fill="var(--color-green-600)" />

              <text x="18" y="250" className="hero__graphic-label">
                {t("home.hero.tagChina")}
              </text>

              <text x="266" y="250" className="hero__graphic-label">
                {t("home.hero.tagSouthAfrica")}
              </text>

              <rect x="0" y="0" width="360" height="320" fill="none" />
            </svg>
          </div>
        </PageContainer>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="how-it-works">
        <PageContainer>
          <div className="section-heading">
            <h2>{t("home.howItWorks.title")}</h2>
            <p>{t("home.howItWorks.subhead")}</p>
          </div>

          <ol className="how-it-works__list">
            {STEP_ICONS_ORDER.map((step, index) => (
              <li key={step} className="how-it-works__item">
                <span className="how-it-works__index">{index + 1}</span>
                <h3>{t(`home.howItWorks.${step}.title`)}</h3>
                <p>{t(`home.howItWorks.${step}.body`)}</p>
              </li>
            ))}
          </ol>
        </PageContainer>
      </section>

      {/* ---------- Business Opportunities ---------- */}
      <section className="home-section">
        <PageContainer>
          <div className="section-heading section-heading--split">
            <div>
              <h2>{t("home.opportunities.title")}</h2>
              <p>{t("home.opportunities.subhead")}</p>
            </div>

            <Button to="/opportunities" variant="secondary" icon={ArrowRight}>
              {t("home.opportunities.viewAll")}
            </Button>
          </div>

          <div className="card-grid">
            {opportunities.slice(0, 6).map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
              />
            ))}
          </div>

          <p className="demo-notice">{DEMO_DATA_NOTICE}</p>
        </PageContainer>
      </section>

      {/* ---------- Featured Businesses & Professionals ---------- */}
      <section className="home-section home-section--alt">
        <PageContainer>
          <div className="section-heading section-heading--split">
            <div>
              <h2>{t("home.providers.title")}</h2>
              <p>{t("home.providers.subhead")}</p>
            </div>

            <Button to="/find-business" variant="secondary" icon={ArrowRight}>
              {t("home.providers.viewAll")}
            </Button>
          </div>

          <div className="card-grid">
            {providers.slice(0, 6).map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>

          <p className="demo-notice">{DEMO_DATA_NOTICE}</p>
        </PageContainer>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <section className="closing-cta">
        <PageContainer width="md" className="closing-cta__inner">
          <h2>{t("home.cta.title")}</h2>
          <p>{t("home.cta.subhead")}</p>

          <Button to="/find-business" variant="primary" size="md">
            {t("home.cta.button")}
          </Button>
        </PageContainer>
      </section>
    </>
  );
}
