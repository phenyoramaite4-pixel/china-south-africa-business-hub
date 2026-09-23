import { Building2, User, MapPin, BadgeCheck, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import Card from "./Card";
import "./ProviderCard.css";

export default function ProviderCard({ provider }) {
const { t } = useLanguage();
const navigate = useNavigate();

const TypeIcon = provider.type === "company" ? Building2 : User;

const typeLabel =
provider.type === "company"
? t("home.providers.typeCompany")
: t("home.providers.typeIndependent");

const dataKey = "data.providers." + provider.id;
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
aria-label={`${t("providerCard.viewProfile")}: ${t(
          `${dataKey}.name`
        )}`}
> <div className="provider-card__top"> <span className="provider-card__type"> <TypeIcon size={16} aria-hidden="true" />
{typeLabel} </span>

      {provider.verified ? (
        <span className="provider-card__verified">
          <BadgeCheck size={14} aria-hidden="true" />
          {t("home.providers.verified")}
        </span>
      ) : (
        <span className="provider-card__unverified">
          {t("home.providers.unverified")}
        </span>
      )}
    </div>

    <h3 className="provider-card__name">
      {t(`${dataKey}.name`)}
    </h3>

    <p className="provider-card__category">
      {t(`${dataKey}.category`)}
    </p>

    <p className="provider-card__description">
      {t(`${dataKey}.description`)}
    </p>

    <div className="provider-card__meta">
      <span>
        <MapPin size={14} aria-hidden="true" />{" "}
        {t(`${dataKey}.location`)}
      </span>

      <span>{t(`${dataKey}.experience`)}</span>
    </div>

    <div className="provider-card__profile-link">
      <span>{t("providerCard.viewProfile")}</span>
      <ArrowRight size={16} aria-hidden="true" />
    </div>
  </button>
</Card>

);
}
