import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Handshake,
  MapPin,
  RotateCcw,
  Search,
  TrendingUp,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { providers } from "../data/demoData";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import Card from "../components/Card";
import "./FindPartner.css";

const PARTNER_TYPES = [
  {
    id: "chinese-distributor",
    labelEn: "Chinese Distributor",
    labelZh: "中国分销商",
    descriptionEn: "Find South African businesses looking for Chinese distribution relationships.",
    descriptionZh: "寻找希望建立中国市场分销合作关系的南非企业。",
    categories: [
      "Import & Export",
      "Manufacturing",
      "Electronics Manufacturing",
      "Packaging",
      "Agriculture",
    ],
  },
  {
    id: "chinese-investor",
    labelEn: "Chinese Investor",
    labelZh: "中国投资者",
    descriptionEn: "Find businesses seeking Chinese investment and growth partnerships.",
    descriptionZh: "寻找寻求中国投资和业务增长合作的企业。",
    categories: [
      "Renewable Energy",
      "Manufacturing",
      "Agriculture",
      "Technology",
      "Mining & Industrial Services",
    ],
  },
  {
    id: "chinese-supplier",
    labelEn: "Chinese Supplier",
    labelZh: "中国供应商",
    descriptionEn: "Connect with South African businesses seeking products, equipment or supply relationships.",
    descriptionZh: "连接正在寻找产品、设备或供应链合作关系的南非企业。",
    categories: [
      "Industrial Equipment",
      "Construction Materials Sourcing",
      "Electronics Manufacturing",
      "Packaging",
      "Manufacturing Sourcing",
    ],
  },
  {
    id: "chinese-business-partner",
    labelEn: "Chinese Business Partner",
    labelZh: "中国商业合作伙伴",
    descriptionEn: "Find businesses interested in long-term China–South Africa commercial partnerships.",
    descriptionZh: "寻找有兴趣建立长期中南商业合作关系的企业。",
    categories: [
      "Business Consulting",
      "Market Entry Consulting",
      "Import & Export",
      "Manufacturing",
      "Agriculture",
    ],
  },
  {
    id: "south-african-partner",
    labelEn: "Local South African Partner",
    labelZh: "南非本地合作伙伴",
    descriptionEn: "Find local South African businesses and professionals who can support your market entry.",
    descriptionZh: "寻找可以支持您进入南非市场的本地企业和专业人士。",
    categories: [
      "Business Consulting",
      "Legal & Compliance Consulting",
      "Logistics & Freight",
      "Construction",
      "Agriculture",
    ],
  },
  {
    id: "joint-venture",
    labelEn: "Joint Venture / Strategic Partner",
    labelZh: "合资企业 / 战略合作伙伴",
    descriptionEn: "Find businesses open to joint ventures, strategic alliances and shared growth.",
    descriptionZh: "寻找愿意开展合资、战略联盟和共同发展的企业。",
    categories: [
      "Manufacturing",
      "Renewable Energy",
      "Construction",
      "Mining & Industrial Services",
      "Technology",
    ],
  },
];

function getPartnerType(id) {
  return PARTNER_TYPES.find((type) => type.id === id);
}

function getPartnerMatches(partnerType) {
  if (!partnerType) return [];

  const type = getPartnerType(partnerType);

  if (!type) return [];

  return providers
    .filter((provider) => type.categories.includes(provider.category))
    .sort((a, b) => {
      if (a.verified !== b.verified) {
        return a.verified ? -1 : 1;
      }

      return b.projectsWorkedOn - a.projectsWorkedOn;
    })
    .slice(0, 8);
}

export default function FindPartner() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState("");
  const [search, setSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isChinese = language === "zh";

  const selectedPartnerType = useMemo(
    () => getPartnerType(selectedType),
    [selectedType]
  );

  const matchingProviders = useMemo(() => {
    if (!submitted || !selectedPartnerType) return [];

    const query = search.trim().toLowerCase();

    return getPartnerMatches(selectedType)
      .filter((provider) => {
        if (!query) return true;

        const searchableText = [
          provider.name,
          provider.category,
          provider.description,
          provider.location,
          ...(provider.services || []),
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      })
      .slice(0, 8);
  }, [submitted, selectedType, selectedPartnerType, search]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!selectedType) return;

    setSubmitted(true);
  }

  function resetSearch() {
    setSelectedType("");
    setSearch("");
    setSubmitted(false);
  }

  return (
    <PageContainer width="lg" className="find-partner-page">
      <section className="find-partner-hero">
        <div className="find-partner-hero__icon">
          <Handshake size={30} aria-hidden="true" />
        </div>

        <span className="find-partner-hero__eyebrow">
          {isChinese ? "合作伙伴匹配" : "Partner Matching"}
        </span>

        <h1 className="find-partner-hero__title">
          {isChinese ? "寻找合作伙伴" : "Find a Partner"}
        </h1>

        <p className="find-partner-hero__description">
          {isChinese
            ? "选择您正在寻找的合作关系，我们将帮助您发现符合需求的南非企业和专业人士。"
            : "Choose the type of partnership you are looking for and discover South African businesses and professionals that may match your needs."}
        </p>
      </section>

      <Card className="find-partner-selector">
        <form onSubmit={handleSubmit}>
          <div className="find-partner-selector__heading">
            <div>
              <span className="find-partner-selector__eyebrow">
                {isChinese ? "第一步" : "Step 1"}
              </span>

              <h2>
                {isChinese
                  ? "您正在寻找什么类型的合作伙伴？"
                  : "What type of partner are you looking for?"}
              </h2>
            </div>
          </div>

          <div className="find-partner-types">
            {PARTNER_TYPES.map((type) => {
              const isSelected = selectedType === type.id;

              return (
                <button
                  key={type.id}
                  type="button"
                  className={`find-partner-type ${
                    isSelected ? "is-selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedType(type.id);
                    setSubmitted(false);
                  }}
                >
                  <span className="find-partner-type__icon">
                    {type.id === "chinese-investor" ? (
                      <TrendingUp size={21} aria-hidden="true" />
                    ) : type.id === "south-african-partner" ? (
                      <User size={21} aria-hidden="true" />
                    ) : (
                      <Building2 size={21} aria-hidden="true" />
                    )}
                  </span>

                  <span className="find-partner-type__content">
                    <strong>
                      {isChinese ? type.labelZh : type.labelEn}
                    </strong>

                    <small>
                      {isChinese
                        ? type.descriptionZh
                        : type.descriptionEn}
                    </small>
                  </span>

                  <ArrowRight
                    className="find-partner-type__arrow"
                    size={17}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          {selectedPartnerType ? (
            <div className="find-partner-search">
              <label htmlFor="partner-search">
                {isChinese
                  ? "可选：添加关键词"
                  : "Optional: Add a keyword"}
              </label>

              <div className="find-partner-search__input">
                <Search size={19} aria-hidden="true" />

                <input
                  id="partner-search"
                  type="text"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setSubmitted(false);
                  }}
                  placeholder={
                    isChinese
                      ? "例如：建筑、物流、太阳能、制造"
                      : "For example: construction, logistics, solar, manufacturing"
                  }
                />
              </div>
            </div>
          ) : null}

          <div className="find-partner-selector__actions">
            <Button
              type="submit"
              variant="primary"
              disabled={!selectedType}
            >
              {isChinese ? "寻找合作伙伴" : "Find Partners"}
              <ArrowRight size={17} aria-hidden="true" />
            </Button>

            {(selectedType || search || submitted) && (
              <Button
                type="button"
                variant="secondary"
                onClick={resetSearch}
              >
                <RotateCcw size={16} aria-hidden="true" />
                {isChinese ? "重新开始" : "Start Over"}
              </Button>
            )}
          </div>
        </form>
      </Card>

      {submitted ? (
        <section className="find-partner-results">
          <div className="find-partner-results__header">
            <div>
              <span className="find-partner-results__eyebrow">
                {isChinese ? "合作伙伴结果" : "Partner Results"}
              </span>

              <h2>
                {selectedPartnerType
                  ? isChinese
                    ? selectedPartnerType.labelZh
                    : selectedPartnerType.labelEn
                  : ""}
              </h2>

              <p>
                {isChinese
                  ? "以下结果根据您选择的合作类型和关键词筛选。"
                  : "These results are filtered according to your selected partnership type and keyword."}
              </p>
            </div>

            <span className="find-partner-results__count">
              {matchingProviders.length}{" "}
              {isChinese ? "个结果" : "results"}
            </span>
          </div>

          {matchingProviders.length > 0 ? (
            <div className="find-partner-results__grid">
              {matchingProviders.map((provider) => {
                const dataKey = `data.providers.${provider.id}`;

                const providerName = t(`${dataKey}.name`);
                const providerCategory = t(`${dataKey}.category`);
                const providerDescription = t(
                  `${dataKey}.description`
                );
                const providerLocation = t(`${dataKey}.location`);
                const providerExperience = t(
                  `${dataKey}.experience`
                );

                return (
                  <Card
                    key={provider.id}
                    className="find-partner-card"
                    accent={provider.verified ? "gold" : null}
                  >
                    <div className="find-partner-card__top">
                      <span className="find-partner-card__type">
                        {provider.type === "company" ? (
                          <Building2 size={15} aria-hidden="true" />
                        ) : (
                          <User size={15} aria-hidden="true" />
                        )}

                        {provider.type === "company"
                          ? isChinese
                            ? "企业"
                            : "Company"
                          : isChinese
                            ? "独立专业人士"
                            : "Independent Professional"}
                      </span>

                      {provider.verified ? (
                        <span className="find-partner-card__verified">
                          <BadgeCheck size={14} aria-hidden="true" />
                          {isChinese ? "已验证" : "Verified"}
                        </span>
                      ) : null}
                    </div>

                    <h3>{providerName}</h3>

                    <p className="find-partner-card__category">
                      {providerCategory}
                    </p>

                    <p className="find-partner-card__description">
                      {providerDescription}
                    </p>

                    <div className="find-partner-card__meta">
                      <span>
                        <MapPin size={14} aria-hidden="true" />
                        {providerLocation}
                      </span>

                      <span>
                        {providerExperience}{" "}
                        {isChinese ? "经验" : "experience"}
                      </span>
                    </div>

                    <div className="find-partner-card__footer">
                      <span>
                        {provider.projectsWorkedOn}{" "}
                        {isChinese
                          ? "个项目"
                          : "projects completed"}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/provider/${provider.id}`)
                        }
                      >
                        {isChinese ? "查看资料" : "View Profile"}
                        <ArrowRight size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="find-partner-empty">
              <Handshake size={28} aria-hidden="true" />

              <h3>
                {isChinese
                  ? "暂时没有找到匹配的合作伙伴"
                  : "No matching partners found"}
              </h3>

              <p>
                {isChinese
                  ? "尝试删除关键词，或选择其他合作类型。"
                  : "Try removing the keyword or selecting another partnership type."}
              </p>

              <Button
                type="button"
                variant="secondary"
                onClick={resetSearch}
              >
                {isChinese ? "重新开始" : "Start Over"}
              </Button>
            </Card>
          )}

          <p className="find-partner-demo-note">
            {isChinese
              ? "演示说明：以上企业和专业人士均为原型演示用虚构示例数据，并非真实验证的合作伙伴。"
              : "Demo notice: The businesses and professionals shown are fictional sample listings for prototype purposes and are not real verified partners."}
          </p>
        </section>
      ) : null}
    </PageContainer>
  );
}