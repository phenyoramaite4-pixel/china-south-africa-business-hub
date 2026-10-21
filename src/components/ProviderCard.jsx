
import {
  Building2,
  User,
  MapPin,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import Card from "./Card";
import "./ProviderCard.css";

export default function ProviderCard({ provider }) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const TypeIcon = provider.type === "company" ? Building2 : User;

  // Use the translation when available; otherwise use the actual data.
  function getText(key, fallback) {
    const translated = t(key);

    if (
      typeof translated === "string" &&
      translated.trim() !== "" &&
      translated !== key
    ) {
      return translated;
    }

    return fallback ?? "";
  }

  const dataKey = `data.providers.${provider.id}`;

  const typeLabel = getText(
    provider.type === "company"
      ? "home.providers.typeCompany"
      : "home.providers.typeIndependent",
    provider.type === "company" ? "Company" : "Independent Professional"
  );

  const providerName = getText(
    `${dataKey}.name`,
    provider.name
  );

  const providerCategory = getText(
    `${dataKey}.category`,
    provider.category
  );

  const providerDescription = getText(
    `${dataKey}.description`,
    provider.description
  );

  const providerLocation = getText(
    `${dataKey}.location`,
    provider.location
  );

  const providerExperience = getText(
    `${dataKey}.experience`,
    provider.experience
  );

  const verifiedLabel = getText(
    "home.providers.verified",
    "Verified"
  );

  const unverifiedLabel = getText(
    "home.providers.unverified",
    "Unverified"
  );

  const viewProfileLabel = getText(
    "providerCard.viewProfile",
    "View profile"
  );

  function openProfile() {
    navigate(`/provider/${provider.id}`);
  }

  return (
    <Card
      accent={provider.verified ? "gold" : null}
      className="provider-card"
    >
      <button
        type="button"
        onClick={openProfile}
        className="provider-card__click-area"
        aria-label={`${viewProfileLabel}: ${providerName}`}
      >
        <div className="provider-card__top">
          <span className="provider-card__type">
            <TypeIcon size={16} aria-hidden="true" />
            {typeLabel}
          </span>

          {provider.verified ? (
            <span className="provider-card__verified">
              <BadgeCheck size={14} aria-hidden="true" />
              {verifiedLabel}
            </span>
          ) : (
            <span className="provider-card__unverified">
              {unverifiedLabel}
            </span>
          )}
        </div>

        <h3 className="provider-card__name">
          {providerName}
        </h3>

        <p className="provider-card__category">
          {providerCategory}
        </p>

        <p className="provider-card__description">
          {providerDescription}
        </p>

        <div className="provider-card__meta">
          <span>
            <MapPin size={14} aria-hidden="true" />{" "}
            {providerLocation}
          </span>

          <span>{providerExperience}</span>
        </div>

        <div className="provider-card__profile-link">
          <span>{viewProfileLabel}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </div>
      </button>
    </Card>
  );
}
