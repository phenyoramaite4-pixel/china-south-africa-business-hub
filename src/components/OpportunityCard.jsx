import { MapPin, Tag } from "lucide-react";
import Card from "./Card";
import { useLanguage } from "../context/LanguageContext";
import "./OpportunityCard.css";

const ACCENT_BY_TYPE = {
  Partnership: "navy",
  Investment: "gold",
  Supplier: "green",
  "Joint Venture": "red",
};

export default function OpportunityCard({ opportunity }) {
  const { t } = useLanguage();
  const accent = ACCENT_BY_TYPE[opportunity.type] || "navy";

  const dataKey = `data.opportunities.${opportunity.id}`;

  return (
    <Card accent={accent} className="opportunity-card">
      <span className="opportunity-card__type">
        {t(`${dataKey}.type`)}
      </span>

      <h3 className="opportunity-card__title">
        {t(`${dataKey}.title`)}
      </h3>

      <p className="opportunity-card__description">
        {t(`${dataKey}.description`)}
      </p>

      <div className="opportunity-card__meta">
        <span>
          <MapPin size={14} aria-hidden="true" />{" "}
          {t(`${dataKey}.location`)}
        </span>

        <span>
          <Tag size={14} aria-hidden="true" />{" "}
          {t(`${dataKey}.category`)}
        </span>
      </div>
    </Card>
  );
}