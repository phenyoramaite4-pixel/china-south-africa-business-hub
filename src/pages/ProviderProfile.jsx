import { useEffect, useMemo, useState } from "react";
import {
ArrowLeft,
BadgeCheck,
Building2,
CalendarDays,
CheckCircle2,
ChevronRight,
FileText,
Handshake,
MapPin,
MessageCircle,
PlayCircle,
Send,
User,
Users,
X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";
import { providers } from "../data/demoData";
import Button from "../components/Button";
import PageContainer from "../components/PageContainer";
import "./ProviderProfile.css";

function DetailModal({ title, icon: Icon, items, onClose }) {
const { t } = useLanguage();

return ( <div className="provider-profile__modal-overlay" role="presentation"> <div
     className="provider-profile__modal"
     role="dialog"
     aria-modal="true"
     aria-label={title}
   >
<button
type="button"
className="provider-profile__modal-close"
onClick={onClose}
aria-label={t("providerProfile.close")}
> <X size={20} /> </button>

    <div className="provider-profile__modal-heading">
      <div className="provider-profile__modal-icon">
        <Icon size={22} />
      </div>

      <div>
        <span className="provider-profile__eyebrow">
          {t("providerProfile.detailsDemo")}
        </span>
        <h2>{title}</h2>
      </div>
    </div>

    <div className="provider-profile__detail-items">
      {items.map((item, index) => {
        const isDetailObject = item && typeof item === "object";

        return (
          <div
            className="provider-profile__detail-item"
            key={`${isDetailObject ? item.name : item}-${index}`}
          >
            <CheckCircle2 size={18} aria-hidden="true" />

            {isDetailObject ? (
              <span className="provider-profile__detail-item-body">
                <strong>{item.name}</strong>

                {item.description && (
                  <span className="provider-profile__detail-item-meta">
                    {item.description}
                  </span>
                )}

                <span className="provider-profile__detail-item-meta">
                  {[
                    item.type,
                    item.relationship,
                    item.location,
                    item.period,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </span>
            ) : (
              <span>{item}</span>
            )}
          </div>
        );
      })}
    </div>

    <Button variant="secondary" onClick={onClose}>
      {t("providerProfile.close")}
    </Button>
  </div>
</div>

);
}

function ReferenceModal({ reference, onClose }) {
const { t } = useLanguage();

return ( <div className="provider-profile__modal-overlay" role="presentation">
<div
className="provider-profile__modal"
role="dialog"
aria-modal="true"
aria-label={t("providerProfile.referenceDemo")}
>
<button
type="button"
className="provider-profile__modal-close"
onClick={onClose}
aria-label={t("providerProfile.close")}
> <X size={20} /> </button>

    <div className="provider-profile__modal-heading">
      <div className="provider-profile__modal-icon">
        <Users size={22} />
      </div>

      <div>
        <span className="provider-profile__eyebrow">
          {t("providerProfile.referencesEyebrow")}
        </span>

        <h2>{t("providerProfile.referenceDemo")}</h2>
      </div>
    </div>

    <div className="provider-profile__reference-modal">
      <div>
        <strong>{reference.name}</strong>
        <span>{reference.company}</span>
      </div>

      <div className="provider-profile__reference-modal-row">
        <span>{t("providerProfile.referenceRelationship")}</span>
        <strong>{reference.relationship}</strong>
      </div>

      <div className="provider-profile__reference-modal-row">
        <span>{t("providerProfile.referenceProject")}</span>
        <strong>{reference.project}</strong>
      </div>

      <div className="provider-profile__reference-modal-row">
        <span>{t("providerProfile.referencePeriod")}</span>
        <strong>{reference.period}</strong>
      </div>

      <blockquote>“{reference.statement}”</blockquote>

      <div className="provider-profile__reference-contact">
        <BadgeCheck size={18} />

        <div>
          <strong>
            {t("providerProfile.contactableReference")}
          </strong>

          <span>
            {t("providerProfile.contactableReferenceText")}
          </span>
        </div>
      </div>
    </div>

    <Button variant="secondary" onClick={onClose}>
      {t("providerProfile.close")}
    </Button>
  </div>
</div>

);
}

function ActionForm({ mode, provider, onClose }) {
const { t } = useLanguage();
const navigate = useNavigate();

const [submitted, setSubmitted] = useState(false);

const isQuote = mode === "quote";
const isContact = mode === "contact";

const title = isQuote
? t("providerProfile.quoteTitle")
: isContact
? t("providerProfile.contactTitle")
: t("providerProfile.enquiryTitle");

const description = isContact
? t("providerProfile.contactDescription")
: t("providerProfile.formMessage");

function handleSubmit(event) {
event.preventDefault();

const formData = new FormData(event.currentTarget);

const subject =
  formData.get("subject") ||
  (isQuote
    ? t("providerProfile.requestQuote")
    : t("providerProfile.sendEnquiry"));

const message = formData.get("message") || "";

const conversation = {
  id: `provider-${provider.id}`,
  providerId: provider.id,
  providerName: provider.name,
  providerType: provider.type,
  providerCategory: provider.category,
  providerLocation: provider.location,
  contextType: isQuote ? "Quote Request" : "Enquiry",
  subject,
  message,
  senderName: formData.get("name") || "",
  senderEmail: formData.get("email") || "",
  createdAt: new Date().toISOString(),
};

sessionStorage.setItem(
  "chinaHubPendingConversation",
  JSON.stringify(conversation)
);

if (isContact) {
  setSubmitted(true);
  return;
}

navigate("/messages");

}

if (submitted) {
return ( <div className="provider-profile__modal-overlay" role="presentation"> <div
       className="provider-profile__modal provider-profile__modal--success"
       role="dialog"
       aria-modal="true"
     > <div className="provider-profile__success-icon"> <CheckCircle2 size={34} /> </div>

      <h2>{t("providerProfile.successTitle")}</h2>

      <p>{t("providerProfile.successDescription")}</p>

      <Button variant="primary" onClick={onClose}>
        {t("providerProfile.close")}
      </Button>
    </div>
  </div>
);

}

return ( <div className="provider-profile__modal-overlay" role="presentation"> <div
     className="provider-profile__modal"
     role="dialog"
     aria-modal="true"
     aria-label={title}
   >
<button
type="button"
className="provider-profile__modal-close"
onClick={onClose}
aria-label={t("providerProfile.close")}
> <X size={20} /> </button>

    <div className="provider-profile__modal-heading">
      <div className="provider-profile__modal-icon">
        {isQuote ? (
          <FileText size={22} />
        ) : (
          <MessageCircle size={22} />
        )}
      </div>

      <div>
        <span className="provider-profile__eyebrow">
          {provider.name}
        </span>

        <h2>{title}</h2>
      </div>
    </div>

    <p className="provider-profile__modal-description">
      {description}
    </p>

    <form
      className="provider-profile__form"
      onSubmit={handleSubmit}
    >
      <label>
        <span>{t("providerProfile.formName")}</span>

        <input
          type="text"
          name="name"
          placeholder={t("providerProfile.formName")}
          required
        />
      </label>

      <label>
        <span>{t("providerProfile.formEmail")}</span>

        <input
          type="email"
          name="email"
          placeholder={t("providerProfile.formEmail")}
          required
        />
      </label>

      {!isContact && (
        <label>
          <span>{t("providerProfile.formSubject")}</span>

          <input
            type="text"
            name="subject"
            placeholder={t("providerProfile.formSubject")}
            required
          />
        </label>
      )}

      <label>
        <span>{t("providerProfile.formMessage")}</span>

        <textarea
          name="message"
          rows="5"
          placeholder={t("providerProfile.formMessage")}
          required
        />
      </label>

      <button
        type="submit"
        className="provider-profile__submit-button"
      >
        <Send size={17} />
        {t("providerProfile.submit")}
      </button>
    </form>
  </div>
</div>

);
}

export default function ProviderProfile() {
const { id } = useParams();
const navigate = useNavigate();
const { t } = useLanguage();

const [activeModal, setActiveModal] = useState(null);

const provider = useMemo(
() => providers.find((item) => item.id === id),
[id]
);

useEffect(() => {
window.scrollTo({ top: 0, behavior: "smooth" });
}, [id]);

if (!provider) {
return ( <PageContainer
     width="md"
     className="provider-profile provider-profile--not-found"
   > <div className="provider-profile__not-found"> <div className="provider-profile__not-found-icon"> <Building2 size={32} /> </div>

      <span className="provider-profile__eyebrow">
        {t("providerProfile.notFoundTitle")}
      </span>

      <h1>{t("providerProfile.notFoundTitle")}</h1>

      <p>{t("providerProfile.notFoundDescription")}</p>

      <Button
        variant="secondary"
        onClick={() => navigate("/find-business")}
      >
        {t("providerProfile.backToDirectory")}
      </Button>
    </div>
  </PageContainer>
);

}

const dataKey = `data.providers.${provider.id}`;
const TypeIcon =
provider.type === "company" ? Building2 : User;

const translatedCategory = t(`${dataKey}.category`);
const translatedLocation = t(`${dataKey}.location`);
const translatedExperience = t(`${dataKey}.experience`);
const translatedDescription = t(`${dataKey}.description`);

const references = provider.references?.length
? provider.references
: [
{
name: "Sample Business Contact",
company: "Prototype Partner",
relationship: "Business Partner",
project: "Sample Project",
period: "2025–2026",
statement:
"Sample reference information for the prototype.",
contactable: true,
},
];

const projectItems = provider.projectsWorkedOnDetails?.length
? provider.projectsWorkedOnDetails
: [t("providerProfile.detailItemDescription")];

const partnerItems = provider.partneredCompaniesDetails?.length
? provider.partneredCompaniesDetails
: [t("providerProfile.detailItemDescription")];

const previousProjectItems =
provider.previousProjectsDetails?.length
? provider.previousProjectsDetails
: [t("providerProfile.detailItemDescription")];

return ( <PageContainer width="xl" className="provider-profile">
<button
type="button"
className="provider-profile__back"
onClick={() => navigate(-1)}
> <ArrowLeft size={17} />
{t("providerProfile.back")} </button>

  <section className="provider-profile__hero">
    <div className="provider-profile__hero-main">
      <div className="provider-profile__provider-icon">
        <TypeIcon size={34} />
      </div>

      <div className="provider-profile__hero-content">
        <div className="provider-profile__badges">
          <span className="provider-profile__type-badge">
            <TypeIcon size={14} />

            {provider.type === "company"
              ? t("home.providers.typeCompany")
              : t("home.providers.typeIndependent")}
          </span>

          {provider.verified && (
            <span className="provider-profile__verified-badge">
              <BadgeCheck size={14} />
              {t("home.providers.verified")}
            </span>
          )}
        </div>

        <h1>{t(`${dataKey}.name`)}</h1>

        <p className="provider-profile__category">
          {translatedCategory}
        </p>

        <div className="provider-profile__meta">
          <span>
            <MapPin size={16} />
            {translatedLocation}
          </span>

          <span>
            <CalendarDays size={16} />
            {translatedExperience}
          </span>
        </div>
      </div>
    </div>

    <div className="provider-profile__hero-actions">
      <Button
        variant="secondary"
        onClick={() => setActiveModal("enquiry")}
      >
        <MessageCircle size={17} />
        {t("providerProfile.sendEnquiry")}
      </Button>

      <Button
        variant="primary"
        onClick={() => setActiveModal("quote")}
      >
        <FileText size={17} />
        {t("providerProfile.requestQuote")}
      </Button>
    </div>
  </section>

  <div className="provider-profile__layout">
    <main className="provider-profile__main">
      <section className="provider-profile__card">
        <div className="provider-profile__section-heading">
          <div>
            <span className="provider-profile__eyebrow">
              {t("providerProfile.aboutEyebrow")}
            </span>

            <h2>{t("providerProfile.aboutTitle")}</h2>
          </div>
        </div>

        <p className="provider-profile__description">
          {translatedDescription}
        </p>

        <div className="provider-profile__services">
          <span className="provider-profile__service">
            {translatedCategory}
          </span>
        </div>
      </section>

      <section className="provider-profile__card">
        <div className="provider-profile__section-heading">
          <div>
            <span className="provider-profile__eyebrow">
              {t("providerProfile.verificationEyebrow")}
            </span>

            <h2>{t("providerProfile.verificationTitle")}</h2>
          </div>

          {provider.verified && (
            <span className="provider-profile__verified-large">
              <BadgeCheck size={17} />
              {t("home.providers.verified")}
            </span>
          )}
        </div>

        <div className="provider-profile__verification-grid">
          <div className="provider-profile__verification-item">
            <BadgeCheck size={21} />

            <div>
              <strong>
                {t("providerProfile.verifiedIdentity")}
              </strong>

              <span>
                {t("providerProfile.verifiedIdentityText")}
              </span>
            </div>
          </div>

          <div className="provider-profile__verification-item">
            <CheckCircle2 size={21} />

            <div>
              <strong>
                {t("providerProfile.businessReviewed")}
              </strong>

              <span>
                {t("providerProfile.businessReviewedText")}
              </span>
            </div>
          </div>

          <div className="provider-profile__verification-item">
            <PlayCircle size={21} />

            <div>
              <strong>
                {t("providerProfile.videoAvailable")}
              </strong>

              <span>
                {t("providerProfile.videoLanguage")}:{" "}
                {provider.videoLanguage}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="provider-profile__card">
        <div className="provider-profile__section-heading">
          <div>
            <span className="provider-profile__eyebrow">
              {t("providerProfile.providerVideo")}
            </span>

            <h2>{t("providerProfile.videoDemo")}</h2>
          </div>
        </div>

        <button
          type="button"
          className="provider-profile__video-card"
          onClick={() => setActiveModal("video")}
        >
          <div className="provider-profile__video-content">
            <PlayCircle
              className="provider-profile__video-play"
              size={46}
            />

            <div>
              <strong>
                {t("providerProfile.providerVideo")}
              </strong>

              <span>
                {t("providerProfile.videoLanguage")}:{" "}
                {provider.videoLanguage}
              </span>
            </div>
          </div>

          <span className="provider-profile__video-button">
            {t("providerProfile.watchVideo")}
            <ChevronRight size={17} />
          </span>
        </button>
      </section>

      <section className="provider-profile__card">
        <div className="provider-profile__section-heading">
          <div>
            <span className="provider-profile__eyebrow">
              {t("providerProfile.trackRecordEyebrow")}
            </span>

            <h2>{t("providerProfile.trackRecordTitle")}</h2>
          </div>
        </div>

        <div className="provider-profile__stats">
          <button
            type="button"
            className="provider-profile__stat"
            onClick={() =>
              setActiveModal({
                type: "projects",
                title: t(
                  "providerProfile.projectsWorkedOn"
                ),
                icon: FileText,
                items: projectItems,
              })
            }
          >
            <span className="provider-profile__stat-number">
              {provider.projectsWorkedOn}
            </span>

            <span className="provider-profile__stat-label">
              {t("providerProfile.projectsWorkedOn")}
            </span>

            <ChevronRight size={17} />
          </button>

          <button
            type="button"
            className="provider-profile__stat"
            onClick={() =>
              setActiveModal({
                type: "partners",
                title: t(
                  "providerProfile.partneredCompanies"
                ),
                icon: Handshake,
                items: partnerItems,
              })
            }
          >
            <span className="provider-profile__stat-number">
              {provider.partneredCompanies}
            </span>

            <span className="provider-profile__stat-label">
              {t("providerProfile.partneredCompanies")}
            </span>

            <ChevronRight size={17} />
          </button>

          <button
            type="button"
            className="provider-profile__stat"
            onClick={() =>
              setActiveModal({
                type: "previousProjects",
                title: t(
                  "providerProfile.previousProjects"
                ),
                icon: FileText,
                items: previousProjectItems,
              })
            }
          >
            <span className="provider-profile__stat-number">
              {provider.previousProjects}
            </span>

            <span className="provider-profile__stat-label">
              {t("providerProfile.previousProjects")}
            </span>

            <ChevronRight size={17} />
          </button>
        </div>
      </section>

      <section className="provider-profile__card">
        <div className="provider-profile__section-heading">
          <div>
            <span className="provider-profile__eyebrow">
              {t("providerProfile.referencesEyebrow")}
            </span>

            <h2>{t("providerProfile.referencesTitle")}</h2>
          </div>
        </div>

        <div className="provider-profile__references">
          {references.map((reference, index) => (
            <div
              className="provider-profile__reference"
              key={`${reference.name}-${index}`}
            >
              <div>
                <strong>{reference.name}</strong>
                <span>{reference.company}</span>
              </div>

              <button
                type="button"
                className="provider-profile__reference-button"
                onClick={() =>
                  setActiveModal({
                    type: "reference",
                    reference,
                  })
                }
              >
                {t("providerProfile.viewReference")}
                <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>

    <aside className="provider-profile__sidebar">
      <section className="provider-profile__side-card provider-profile__snapshot-card">
        <div className="provider-profile__snapshot-top">
          <div className="provider-profile__snapshot-icon">
            <TypeIcon size={22} />
          </div>

          <div className="provider-profile__snapshot-heading">
            <span className="provider-profile__eyebrow">
              {t("providerProfile.quickDetails")}
            </span>

            <h3>{t(`${dataKey}.name`)}</h3>
          </div>
        </div>

        {provider.verified && (
          <div className="provider-profile__snapshot-verified">
            <BadgeCheck size={17} />

            <div>
              <strong>
                {t("home.providers.verified")}
              </strong>

              <span>
                {t("providerProfile.verification")}
              </span>
            </div>
          </div>
        )}

        <div className="provider-profile__snapshot-list">
          <div className="provider-profile__snapshot-row">
            <span className="provider-profile__snapshot-label">
              <MapPin size={17} />
              {t("providerProfile.location")}
            </span>

            <strong>{translatedLocation}</strong>
          </div>

          <div className="provider-profile__snapshot-row">
            <span className="provider-profile__snapshot-label">
              <Building2 size={17} />
              {t("providerProfile.providerType")}
            </span>

            <strong>
              {provider.type === "company"
                ? t("home.providers.typeCompany")
                : t("home.providers.typeIndependent")}
            </strong>
          </div>

          <div className="provider-profile__snapshot-row">
            <span className="provider-profile__snapshot-label">
              <CalendarDays size={17} />
              {t("providerProfile.experience")}
            </span>

            <strong>{translatedExperience}</strong>
          </div>

          <div className="provider-profile__snapshot-row">
            <span className="provider-profile__snapshot-label">
              <BriefcaseIcon />
              {t("providerProfile.category")}
            </span>

            <strong>{translatedCategory}</strong>
          </div>
        </div>
      </section>

      <section className="provider-profile__side-card">
        <span className="provider-profile__eyebrow">
          {t("providerProfile.pricingTitle")}
        </span>

        <h3>{provider.pricing}</h3>

        <Button
          variant="primary"
          onClick={() => setActiveModal("quote")}
          className="provider-profile__full-button"
        >
          <FileText size={17} />
          {t("providerProfile.requestQuote")}
        </Button>
      </section>

      <section className="provider-profile__contact-card">
        <div className="provider-profile__contact-icon">
          <MessageCircle size={22} />
        </div>

        <div>
          <span className="provider-profile__eyebrow">
            {t("providerProfile.contactTitle")}
          </span>

          <h3>
            {t("providerProfile.contactProvider")}
          </h3>

          <p>
            {t("providerProfile.contactDescription")}
          </p>
        </div>

        <Button
          variant="secondary"
          onClick={() => setActiveModal("contact")}
          className="provider-profile__full-button"
        >
          <Send size={17} />
          {t("providerProfile.contactProvider")}
        </Button>
      </section>
    </aside>
  </div>

  {activeModal === "enquiry" && (
    <ActionForm
      mode="enquiry"
      provider={provider}
      onClose={() => setActiveModal(null)}
    />
  )}

  {activeModal === "quote" && (
    <ActionForm
      mode="quote"
      provider={provider}
      onClose={() => setActiveModal(null)}
    />
  )}

  {activeModal === "contact" && (
    <ActionForm
      mode="contact"
      provider={provider}
      onClose={() => setActiveModal(null)}
    />
  )}

  {activeModal === "video" && (
    <DetailModal
      title={t("providerProfile.videoDemo")}
      icon={PlayCircle}
      items={[
        t("providerProfile.videoDemoDescription"),
        `${t("providerProfile.videoLanguage")}: ${provider.videoLanguage}`,
      ]}
      onClose={() => setActiveModal(null)}
    />
  )}

  {activeModal?.type === "projects" && (
    <DetailModal
      title={activeModal.title}
      icon={activeModal.icon}
      items={activeModal.items}
      onClose={() => setActiveModal(null)}
    />
  )}

  {activeModal?.type === "partners" && (
    <DetailModal
      title={activeModal.title}
      icon={activeModal.icon}
      items={activeModal.items}
      onClose={() => setActiveModal(null)}
    />
  )}

  {activeModal?.type === "previousProjects" && (
    <DetailModal
      title={activeModal.title}
      icon={activeModal.icon}
      items={activeModal.items}
      onClose={() => setActiveModal(null)}
    />
  )}

  {activeModal?.type === "reference" && (
    <ReferenceModal
      reference={activeModal.reference}
      onClose={() => setActiveModal(null)}
    />
  )}
</PageContainer>

);
}

function BriefcaseIcon(props) {
return <FileText {...props} />;
}
