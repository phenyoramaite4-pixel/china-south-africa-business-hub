import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  MessageCircleQuestion,
  RotateCcw,
  Search,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { providers } from "../data/demoData";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import Card from "../components/Card";
import "./INeedHelp.css";

const CATEGORY_RULES = [
  {
    category: "Logistics & Freight",
    keywords: [
      "move",
      "moving",
      "transport",
      "transportation",
      "equipment",
      "cargo",
      "freight",
      "warehouse",
      "warehousing",
      "delivery",
      "shipping",
      "搬运",
      "运输",
      "设备",
      "货物",
      "物流",
    ],
  },
  {
    category: "Import & Export",
    keywords: [
      "import",
      "export",
      "trade",
      "trading",
      "customs",
      "进口",
      "出口",
      "贸易",
      "海关",
    ],
  },
  {
    category: "Construction",
    keywords: [
      "construction",
      "building",
      "builder",
      "contractor",
      "renovation",
      "施工",
      "建筑",
      "承包商",
      "装修",
    ],
  },
  {
    category: "Renewable Energy",
    keywords: [
      "solar",
      "renewable",
      "energy",
      "battery",
      "power",
      "electricity",
      "太阳能",
      "可再生能源",
      "电力",
      "电池",
    ],
  },
  {
    category: "Legal & Compliance Consulting",
    keywords: [
      "lawyer",
      "legal",
      "law",
      "compliance",
      "contract",
      "regulation",
      "visa",
      "律师",
      "法律",
      "合规",
      "合同",
    ],
  },
  {
    category: "Supplier Sourcing",
    keywords: [
      "supplier",
      "suppliers",
      "source",
      "sourcing",
      "find a supplier",
      "找供应商",
      "供应商",
      "采购",
    ],
  },
  {
    category: "Manufacturing Sourcing",
    keywords: [
      "manufacturer",
      "manufacturing",
      "factory",
      "production",
      "manufacture",
      "制造商",
      "制造",
      "工厂",
      "生产",
    ],
  },
  {
    category: "Industrial Equipment",
    keywords: [
      "industrial equipment",
      "machinery",
      "machine",
      "machines",
      "industrial",
      "机械",
      "工业设备",
      "设备",
    ],
  },
  {
    category: "Agriculture",
    keywords: [
      "agriculture",
      "agricultural",
      "farming",
      "farm",
      "farmer",
      "农业",
      "农场",
      "种植",
    ],
  },
  {
    category: "Business Consulting",
    keywords: [
      "consulting",
      "consultant",
      "business advice",
      "strategy",
      "market research",
      "咨询",
      "顾问",
      "商业咨询",
      "市场研究",
    ],
  },
];

function detectCategory(text) {
  const normalized = text.trim().toLowerCase();

  if (!normalized) return null;

  let bestMatch = null;
  let bestScore = 0;

  for (const rule of CATEGORY_RULES) {
    const score = rule.keywords.reduce((total, keyword) => {
      return total + (normalized.includes(keyword.toLowerCase()) ? 1 : 0);
    }, 0);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = rule.category;
    }
  }

  return bestMatch;
}

function matchesRequest(provider, request) {
  const normalized = request.trim().toLowerCase();

  if (!normalized) return true;

  const searchableText = [
    provider.name,
    provider.category,
    provider.description,
    provider.location,
    ...(provider.services || []),
  ]
    .join(" ")
    .toLowerCase();

  const words = normalized
    .split(/\s+/)
    .map((word) => word.replace(/[^\p{L}\p{N}&-]/gu, ""))
    .filter((word) => word.length > 2);

  if (!words.length) return true;

  const directMatches = words.filter((word) =>
    searchableText.includes(word)
  ).length;

  return directMatches > 0;
}

export default function INeedHelp() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [request, setRequest] = useState("");
  const [providerType, setProviderType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const detectedCategory = useMemo(
    () => detectCategory(request),
    [request]
  );

  const matchingProviders = useMemo(() => {
    if (!submitted || !providerType) return [];

    return providers
      .filter((provider) => provider.type === providerType)
      .filter((provider) => {
        if (detectedCategory) {
          return (
            provider.category === detectedCategory ||
            provider.services?.some((service) =>
              service
                .toLowerCase()
                .includes(detectedCategory.toLowerCase())
            )
          );
        }

        return matchesRequest(provider, request);
      })
      .slice(0, 8);
  }, [submitted, providerType, detectedCategory, request]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!request.trim() || !providerType) return;

    setSubmitted(true);
  }

  function resetAssistant() {
    setRequest("");
    setProviderType("");
    setSubmitted(false);
  }

  const isChinese = language === "zh";

  return (
    <PageContainer width="lg" className="need-help-page">
      <section className="need-help-hero">
        <div className="need-help-hero__icon">
          <MessageCircleQuestion size={30} aria-hidden="true" />
        </div>

        <span className="need-help-hero__eyebrow">
          {isChinese ? "智能业务助手" : "Business Assistance"}
        </span>

        <h1 className="need-help-hero__title">
          {isChinese ? "我需要帮助" : "I Need Help"}
        </h1>

        <p className="need-help-hero__description">
          {isChinese
            ? "告诉我们您需要什么帮助，我们会根据您的需求帮助您找到合适的服务提供商。"
            : "Tell us what you need help with and we'll help you find relevant service providers."}
        </p>
      </section>

      <Card className="need-help-assistant">
        <form onSubmit={handleSubmit}>
          <label
            className="need-help-assistant__label"
            htmlFor="help-request"
          >
            {isChinese ? "您需要什么帮助？" : "What do you need help with?"}
          </label>

          <div className="need-help-assistant__input-wrap">
            <Search size={20} aria-hidden="true" />

            <textarea
              id="help-request"
              value={request}
              onChange={(event) => {
                setRequest(event.target.value);
                setSubmitted(false);
              }}
              placeholder={
                isChinese
                  ? "例如：我需要把建筑设备从约翰内斯堡运到德班。"
                  : "For example: I need to move construction equipment from Johannesburg to Durban."
              }
              rows={4}
            />
          </div>

          {detectedCategory ? (
            <div className="need-help-detected">
              <span>
                {isChinese ? "识别的服务：" : "Service identified:"}
              </span>
              <strong>
                {isChinese
                  ? t(
                      `findBusiness.categories.${detectedCategory}`
                    ) !== `findBusiness.categories.${detectedCategory}`
                    ? t(`findBusiness.categories.${detectedCategory}`)
                    : detectedCategory
                  : detectedCategory}
              </strong>
            </div>
          ) : null}

          <div className="need-help-type">
            <span className="need-help-type__label">
              {isChinese
                ? "您希望与哪类服务提供商合作？"
                : "Who would you like to work with?"}
            </span>

            <div className="need-help-type__options">
              <button
                type="button"
                className={`need-help-type__option ${
                  providerType === "company" ? "is-selected" : ""
                }`}
                onClick={() => {
                  setProviderType("company");
                  setSubmitted(false);
                }}
              >
                <Building2 size={22} aria-hidden="true" />

                <span>
                  <strong>{isChinese ? "企业" : "Companies"}</strong>
                  <small>
                    {isChinese
                      ? "注册的服务企业"
                      : "Registered service companies"}
                  </small>
                </span>
              </button>

              <button
                type="button"
                className={`need-help-type__option ${
                  providerType === "independent" ? "is-selected" : ""
                }`}
                onClick={() => {
                  setProviderType("independent");
                  setSubmitted(false);
                }}
              >
                <User size={22} aria-hidden="true" />

                <span>
                  <strong>
                    {isChinese
                      ? "独立专业人士"
                      : "Independent Professionals"}
                  </strong>
                  <small>
                    {isChinese
                      ? "独立服务专业人士"
                      : "Independent service professionals"}
                  </small>
                </span>
              </button>
            </div>
          </div>

          <div className="need-help-assistant__actions">
            <Button
              type="submit"
              variant="primary"
              disabled={!request.trim() || !providerType}
            >
              {isChinese ? "查找服务提供商" : "Find Service Providers"}
              <ArrowRight size={17} aria-hidden="true" />
            </Button>

            {(request || providerType || submitted) && (
              <Button
                type="button"
                variant="secondary"
                onClick={resetAssistant}
              >
                <RotateCcw size={16} aria-hidden="true" />
                {isChinese ? "重新开始" : "Start Over"}
              </Button>
            )}
          </div>
        </form>
      </Card>

      {submitted ? (
        <section className="need-help-results">
          <div className="need-help-results__header">
            <div>
              <span className="need-help-results__eyebrow">
                {isChinese ? "匹配结果" : "Matching Providers"}
              </span>

              <h2>
                {detectedCategory
                  ? isChinese
                    ? t(`providerCategories.${detectedCategory}`) !==
                      `providerCategories.${detectedCategory}`
                      ? t(`providerCategories.${detectedCategory}`)
                      : detectedCategory
                    : detectedCategory
                  : isChinese
                    ? "根据您的需求找到的结果"
                    : "Providers matching your request"}
              </h2>
            </div>

            <span className="need-help-results__count">
              {matchingProviders.length}{" "}
              {isChinese ? "个结果" : "results"}
            </span>
          </div>

          {matchingProviders.length > 0 ? (
            <div className="need-help-results__grid">
              {matchingProviders.map((provider) => {
                const dataKey = `data.providers.${provider.id}`;

                const providerName = t(`${dataKey}.name`);
                const providerCategory = t(`${dataKey}.category`);
                const providerDescription = t(`${dataKey}.description`);
                const providerLocation = t(`${dataKey}.location`);
                const providerExperience = t(`${dataKey}.experience`);
                const providerPricing = t(`${dataKey}.pricing`);

                return (
                  <Card
                    key={provider.id}
                    className="need-help-provider"
                    accent={provider.verified ? "gold" : null}
                  >
                    <div className="need-help-provider__top">
                      <span className="need-help-provider__type">
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
                        <span className="need-help-provider__verified">
                          <BadgeCheck size={14} aria-hidden="true" />
                          {isChinese ? "已验证" : "Verified"}
                        </span>
                      ) : null}
                    </div>

                    <h3>{providerName}</h3>

                    <p className="need-help-provider__category">
                      {providerCategory}
                    </p>

                    <p className="need-help-provider__description">
                      {providerDescription}
                    </p>

                    <div className="need-help-provider__meta">
                      <span>{providerLocation}</span>

                      <span>
                        {providerExperience}{" "}
                        {isChinese ? "经验" : "experience"}
                      </span>
                    </div>

                    <div className="need-help-provider__footer">
                      <span>{providerPricing}</span>

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
            <Card className="need-help-empty">
              <MessageCircleQuestion size={26} aria-hidden="true" />

              <h3>
                {isChinese
                  ? "暂时没有找到匹配的服务提供商"
                  : "No matching providers found"}
              </h3>

              <p>
                {isChinese
                  ? "尝试描述更多细节，或重新开始并选择其他服务提供商类型。"
                  : "Try describing your requirement in more detail, or start over and choose another provider type."}
              </p>

              <Button
                type="button"
                variant="secondary"
                onClick={resetAssistant}
              >
                {isChinese ? "重新开始" : "Start Over"}
              </Button>
            </Card>
          )}

          <p className="need-help-demo-note">
            {isChinese
              ? "演示说明：以上企业和专业人士均为原型演示用虚构示例数据，并非真实验证的服务提供商。"
              : "Demo notice: The businesses and professionals shown are fictional sample listings for prototype purposes and are not real verified providers."}
          </p>
        </section>
      ) : null}
    </PageContainer>
  );
}